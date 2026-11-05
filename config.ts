export interface Config {
  /** 当前工具版本号 */
  readonly version: string;
  readonly argArr: readonly string[];
}

const config: Config = {
  version: "0.3.9",
  argArr: ["--name", "--start", "--sort"],
};

export default config;
