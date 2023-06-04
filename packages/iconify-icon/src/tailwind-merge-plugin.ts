import { Config, mergeConfigs, validators } from "tailwind-merge";

export type IconifyIconPluginOptions = {
  prefix?: string;
};

export default function IconifyIconPlugin({
  prefix = "i",
}: IconifyIconPluginOptions = {}) {
  return (config: Config): Config => {
    return mergeConfigs(config, {
      classGroups: {
        [prefix]: [{ [prefix]: [validators.isArbitraryValue] }],
      },
    });
  };
}
