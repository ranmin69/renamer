import config from "./config.ts";
import { readDirFile, reName } from "./module/fs.ts";
import { fileSort } from "./module/tool.ts";
import { isHelpRequest, showHelp } from "./module/help.ts";
import type { FileInfo } from "./module/fs.ts";
import type { SortType } from "./module/tool.ts";

const args: readonly string[] = Deno.args;
const argArr: readonly string[] = config.argArr;

/**
 * 无参数或命令行包含 --help / -h 时，输出帮助信息并退出
 */
if (args.length === 0 || isHelpRequest(args)) {
  showHelp();
  Deno.exit(0);
}

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
  fileStart = "1",
  sortType = "",
]: (string | undefined)[] = getArg();

/** 是否为 dry-run 预览模式（布尔标志，无值） */
const dryRun: boolean = args.includes("--dry-run");

/**
 * 主程序
 */
try {
  console.log("开始读取文件夹中的所有文件", "⌛");

  const fileInfoArr: FileInfo[] = await readDirFile();
  const fileInfoArrNew: FileInfo[] = fileSort(fileInfoArr, sortType as SortType);

  console.log("所有文件读取完成", "⌛");

  await reName(fileInfoArrNew, fileName, fileStart, dryRun);

  if (!dryRun) {
    console.log("\u001b[32m完成批量改名\u001b[0m", "👄👙👠");
  }
} catch (err: unknown) {
  const errMsg: string = err instanceof Error ? err.message : String(err);
  console.log(`❌：\u001b[31m ${errMsg} \u001b[0m`);
}
