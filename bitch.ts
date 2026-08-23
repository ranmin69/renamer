import config from "./config.ts";
import { readDirFile, reName } from "./module/fs.ts";
import { fileSort } from "./module/tool.ts";
import type { FileInfo } from "./module/fs.ts";
import type { SortType } from "./module/tool.ts";

const args: readonly string[] = Deno.args;
const argArr: readonly string[] = config.argArr;

/**
 * 获取命令行中的参数
 */
function getArg(): (string | undefined)[] {
  return argArr.map((item: string): string | undefined => {
    const index: number = args.indexOf(item);
    return index < 0 ? undefined : args[index + 1];
  });
}

const [
  fileName = "",
  fileStart = 1,
  sortType = "",
  type,
]: (string | undefined)[] = getArg();

/**
 * 主程序
 */
try {
  console.log("开始读取文件夹中的所有文件", "⌛");

  const fileInfoArr: FileInfo[] = await readDirFile();
  const fileInfoArrNew: FileInfo[] = fileSort(fileInfoArr, sortType as SortType);

  console.log("所有文件读取完成，开始批量改名", "⌛");

  await reName(fileInfoArrNew, fileName, fileStart, type);

  console.log("\u001b[33m完成批量改名\u001b[0m", "👄👙👠");
} catch (err: unknown) {
  const errMsg: string = err instanceof Error ? err.message : String(err);
  console.log(`❌：\u001b[31m ${errMsg} \u001b[0m`);
}
