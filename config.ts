export interface Config {
  /** 当前工具版本号 */
  readonly version: string;
  readonly argArr: readonly string[];
}

const config: Config = {
  version: "0.4.0",
  argArr: ["--name", "--start", "--sort", "--ext"],
};

export default config;
