export interface Config {
  readonly argArr: readonly string[];
}

const config: Config = {
  argArr: ["--name", "--start", "--sort"],
};

export default config;
