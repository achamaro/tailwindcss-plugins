import fs from "fs";
import { resolve } from "path";
import plugin from "tailwindcss/plugin";
import { CSSRuleObject } from "tailwindcss/types/config";
import { node } from "utility/node-sync";

import iconNames from "./icon-names";
import { generateSvgDataUri, parseSvg } from "./svg";

export { generateSvgDataUri, parseSvg };

// skip writing file when running in VSCode.
const SKIP_WRITE_FILE = process.env.VSCODE_PID != null;

export type IconifyIconPluginOptions = {
  iconDir?: string;
  downloadDir?: string;
  prefix?: string;
  extraProperties?: Record<string, string>;
  customSvg?: Record<string, string>;
  enableSuggestion?: boolean;
};

export default function IconifyIconPlugin({
  iconDir,
  downloadDir,
  prefix = "i",
  extraProperties = { display: "inline-block" },
  customSvg = {},
  enableSuggestion = false,
}: IconifyIconPluginOptions = {}) {
  const dir = resolve(iconDir ?? downloadDir ?? "src/assets/icons");
  Object.entries(customSvg).forEach(([k, v]) => (customSvg[k] = resolve(v)));

  if (!SKIP_WRITE_FILE && !fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  return plugin(({ addBase, matchUtilities }) => {
    const values = !enableSuggestion
      ? undefined
      : Object.fromEntries(iconNames(dir).map((v) => [`[${v}]`, v]));

    addBase({
      [`:where([class^="${prefix}-["],[class*=" ${prefix}-["],[class*=":${prefix}-["])`]:
        {
          "background-size": "100% 100%",
          "background-repeat": "no-repeat",
          "mask-size": "100% 100%",
          "mask-repeat": "no-repeat",
          height: "1em",
          ...extraProperties,
        },
    });

    matchUtilities(
      {
        [prefix]: (path, { modifier }) => {
          if (!path.includes("/")) {
            return {};
          }

          const [iconSet, iconName] = path.split("/");

          const rule: CSSRuleObject = {};

          let mask = true;
          let data = "";

          if (SKIP_WRITE_FILE) {
            // prevent VSCode extensions from sending request.
            data = `${path}.svg`;
          } else if (customSvg[iconSet]) {
            // read SVG file from local directory.
            const svgPath = resolve(customSvg[iconSet], `${iconName}.svg`);
            const svg = fs.readFileSync(svgPath, "utf8");
            const parsed = parseSvg(svg);
            data = parsed.data;

            const { width, height } = parsed;
            rule["aspect-ratio"] = `${width}/${height}`;

            mask = svg.includes("currentColor");
          } else if (fs.existsSync(resolve(dir, `${path}.svg`))) {
            // read SVG file from local directory.
            const svgPath = resolve(dir, `${path}.svg`);
            const svg = fs.readFileSync(svgPath, "utf8");
            const parsed = parseSvg(svg);
            data = parsed.data;

            const { width, height } = parsed;
            rule["aspect-ratio"] = `${width}/${height}`;

            mask = svg.includes("currentColor");
          } else {
            // fetch the Iconify icon JSON.
            const icon = node(resolve(__dirname, "fetch-script"), [dir, path]);

            // generate SVG data URI from icon JSON.
            data = generateSvgDataUri(icon);

            const { width = 16, height = 16 } = icon;
            rule["aspect-ratio"] = `${width}/${height}`;

            mask = icon.body.includes("currentColor");
          }

          if (modifier === "mask") {
            mask = true;
          } else if (modifier === "bg") {
            mask = false;
          }

          if (mask) {
            rule["background-image"] = "none";
            rule["mask-image"] = `url("${data}")`;
            rule["background-color"] = "currentColor";
          } else {
            rule["background-image"] = `url("${data}")`;
            rule["mask-image"] = "none";
            rule["background-color"] = "transparent";
          }

          return rule;
        },
      },
      {
        values,
        modifiers: {
          mask: "mask",
          bg: "bg",
        },
      },
    );
  });
}
