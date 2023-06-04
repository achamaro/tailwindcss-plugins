import { sync as glob } from "fast-glob";
import path from "path";

export default function iconNames(downloadDir: string) {
  const files = glob(path.resolve(downloadDir, "**/*.json"));
  return files.map((v) => {
    return path.relative(downloadDir, v).replace(/\.json$/, "");
  });
}
