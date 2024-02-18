import { Config, mergeConfigs, validators } from "tailwind-merge";

export type IconifyIconPluginOptions = {
  prefix?: string;
};

export default function IconifyIconPlugin({
  prefix = "i",
}: IconifyIconPluginOptions = {}) {
  return (config: Config<string, string>): Config<string, string> => {
    return mergeConfigs(config, {
      extend: {
        classGroups: {
          [prefix]: [{ [prefix]: [validators.isArbitraryValue] }],
        },
      },
    });
  };
}
