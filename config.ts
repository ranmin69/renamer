export interface Config {
  readonly argArr: readonly string[];
}

const config: Config = {
  argArr: ["--name", "--start", "--sort", "--type"],
};

export default config;
