import fs from "fs";
import type { IconifyIcon, IconifyJSON } from "iconify-icon";
import { resolve } from "path";
import { get } from "utility/request";

const iconUrl = (prefix: string, icon: string) =>
  `https://api.iconify.design/${prefix}.json?icons=${icon}`;

/**
 * iconifyから取得したJSONデータをパースする
 * @param data - iconifyから取得したJSONデータ
 * @returns
 */
export function parseIconifyJSON(
  data: IconifyJSON
): Record<string, IconifyIcon> {
  const { width, height } = data;
  return Object.fromEntries(
    Object.entries(data.icons).map(([name, iconData]) => {
      return [
        name,
        {
          width,
          height,
          ...iconData,
        },
      ];
    })
  );
}

/**
 * アイコンデータを取得する
 * @param pathname アイコン名
 * @param downloadDir アイコンデータダウンロードディレクトリ
 * @returns アイコンデータ
 */
export async function fetchIcon(
  pathname: string,
  downloadDir = "src/assets/icons"
): Promise<IconifyIcon | undefined> {
  const [prefix, icon] = pathname.split("/");
  if (!prefix || !icon) {
    return;
  }

  // ファイルが存在する場合はファイルを読み込んで返す
  const dirname = resolve(downloadDir, prefix);
  const filename = resolve(dirname, `${icon}.json`);
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename, "utf-8"));
  }

  // アイコンを取得する
  const url = iconUrl(prefix, icon);
  const data = await get(url);

  // アイコンデータをパースしてファイルに保存する
  const iconData = parseIconifyJSON(data as IconifyJSON)[icon];
  if (!iconData) {
    throw new Error(`[${PACKAGE_NAME}] '${pathname}' not found.`);
  }

  if (!fs.existsSync(dirname)) {
    await fs.promises.mkdir(dirname, { recursive: true });
  }

  fs.writeFileSync(filename, JSON.stringify(iconData));

  return iconData;
}
