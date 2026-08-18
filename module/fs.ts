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
    if (!isFile) break;

    const nameArr: string[] = name.split(".");
    const fileType: string = nameArr.at(-1) ?? "";
    const fileName: string = nameArr.slice(0, -1).join(".");

    const file: Deno.FsFile = await Deno.open(`${currentDir}/${name}`, {
      read: true,
    });
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

    file.close();
  }

  return fileInfoArr;
};

/**
 * 重命名方法
 */
const reName = async (
  fileArr: FileInfo[],
  baseName: string,
  start: number | string,
  type?: string,
): Promise<void> => {
  const currentDir: string = cwd();

  for (const [index, file] of fileArr.entries()) {
    const { fileType, name }: FileInfo = file;
    const extension: string = fileType === "jpg" ? "jpeg" : fileType;
    const oldPath: string = `${currentDir}/${name}`;
    const newName: string = `${baseName}${Number(start) + index}.${extension}`;
    const newPath: string = `${currentDir}/${newName}`;

    console.log(
      `📄：\u001b[33m${name}\u001b[0m => \u001b[33m${newName}\u001b[0m`,
      "✅",
    );

    if (type !== "test") {
      await rename(oldPath, newPath);
    }
  }
};

const fs: FsModule = {
  readDirFile,
  reName,
};

export { fs as default, readDirFile, reName };
