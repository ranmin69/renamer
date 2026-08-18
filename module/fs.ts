export interface FileInfo {
  readonly name: string;
  readonly fileName: string | number;
  readonly fileType: string;
  readonly atime: number;
  readonly mtime: number;
  readonly birthtime: number;
}

export interface FsModule {
  readonly readDirFile: () => Promise<FileInfo[]>;
  readonly reName: (
    fileArr: FileInfo[],
    baseName: string,
    start: number | string,
    type?: string,
  ) => Promise<void>;
}

const { readDir, cwd, rename } = Deno;

/**
 * 读取文件夹所有子文件，并返回子文件信息。
 */
const readDirFile = async (): Promise<FileInfo[]> => {
  const fileInfoArr: FileInfo[] = [];
  const currentDir: string = cwd();

  for await (const dirEntry of readDir(currentDir)) {
    const { name, isFile }: { name: string; isFile: boolean } = dirEntry;
    if (!isFile) continue;

    const nameArr: string[] = name.split(".");
    const fileType: string = nameArr.at(-1) ?? "";
    const fileName: string = nameArr.slice(0, -1).join(".");

    const file: Deno.FsFile = await Deno.open(`${currentDir}/${name}`, {
      read: true,
    });

    try {
      const fileInfo: Deno.FileInfo = await file.stat();

      const atime: number = fileInfo.atime
        ? new Date(fileInfo.atime).getTime()
        : 0;
      const mtime: number = fileInfo.mtime
        ? new Date(fileInfo.mtime).getTime()
        : 0;
      const birthtime: number = fileInfo.birthtime
        ? new Date(fileInfo.birthtime).getTime()
        : 0;

      fileInfoArr.push({
        name,
        fileName: isNaN(Number(fileName)) ? fileName : Number(fileName),
        fileType,
        atime,
        mtime,
        birthtime,
      });
    } finally {
      file.close();
    }
  }

  return fileInfoArr;
};

/**
 * 重命名方法（两阶段：先改为临时名，再改为最终名，避免文件名冲突覆盖）
 */
const reName = async (
  fileArr: FileInfo[],
  baseName: string,
  start: number | string,
  type?: string,
): Promise<void> => {
  const currentDir: string = cwd();
  const TEMP_PREFIX: string = "__rename_tmp_";

  interface RenameTask {
    readonly oldName: string;
    readonly newName: string;
    readonly tempName: string;
  }

  const tasks: RenameTask[] = fileArr.map(
    (file: FileInfo, index: number): RenameTask => {
      const extension: string = file.fileType === "jpg" ? "jpeg" : file.fileType;
      const newName: string = `${baseName}${Number(start) + index}.${extension}`;
      const tempName: string = `${TEMP_PREFIX}${index}_${Date.now()}.${extension}`;
      return { oldName: file.name, newName, tempName };
    },
  );

  // 第一阶段：旧文件名 => 临时文件名
  if (type !== "test") {
    for (const task of tasks) {
      await rename(
        `${currentDir}/${task.oldName}`,
        `${currentDir}/${task.tempName}`,
      );
    }
  }

  // 第二阶段：临时文件名 => 最终文件名
  for (const task of tasks) {
    console.log(
      `📄：\u001b[33m${task.oldName}\u001b[0m => \u001b[33m${task.newName}\u001b[0m`,
      "✅",
    );

    if (type !== "test") {
      await rename(
        `${currentDir}/${task.tempName}`,
        `${currentDir}/${task.newName}`,
      );
    }
  }
};

const fs: FsModule = {
  readDirFile,
  reName,
};

export { fs as default, readDirFile, reName };
