import { execFileSync } from "child_process";

export function execFile(...args: Parameters<typeof execFileSync>) {
  const result = execFileSync(...args);

  return JSON.parse(String(result));
}
