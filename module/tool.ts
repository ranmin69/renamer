import type { FileInfo } from "./fs.ts";

export type SortType =
  | "BTAscending"
  | "BTDescending"
  | "MTAscending"
  | "MTDescending"
  | "ATAscending"
  | "ATDescending"
  | "NAscending"
  | "NDescending"
  | "";

export interface ToolModule {
  readonly fileSort: (arr: FileInfo[], type: SortType) => FileInfo[];
}

type CompareFn = (a: FileInfo, b: FileInfo) => number;

const sortStrategies: Record<SortType, CompareFn> = {
  BTAscending: (a: FileInfo, b: FileInfo): number => a.birthtime - b.birthtime,
  BTDescending: (a: FileInfo, b: FileInfo): number =>
    b.birthtime - a.birthtime,
  MTAscending: (a: FileInfo, b: FileInfo): number => a.mtime - b.mtime,
  MTDescending: (a: FileInfo, b: FileInfo): number => b.mtime - a.mtime,
  ATAscending: (a: FileInfo, b: FileInfo): number => a.atime - b.atime,
  ATDescending: (a: FileInfo, b: FileInfo): number => b.atime - a.atime,
  NAscending: (a: FileInfo, b: FileInfo): number =>
    Number(a.fileName) - Number(b.fileName),
  NDescending: (a: FileInfo, b: FileInfo): number =>
    Number(b.fileName) - Number(a.fileName),
  "": (_a: FileInfo, _b: FileInfo): number => 0,
};

/**
 * 排序方法
 */
const fileSort = (arr: FileInfo[], type: SortType): FileInfo[] => {
  const compareFn: CompareFn = sortStrategies[type] ?? sortStrategies[""];
  return [...arr].sort(compareFn);
};

const tool: ToolModule = {
  fileSort,
};

export { tool as default, fileSort };
