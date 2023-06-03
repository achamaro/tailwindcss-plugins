import { spawnSync, SpawnSyncOptions } from "child_process";

export function node(
  filename: string,
  args: string[] | SpawnSyncOptions = [],
  options?: SpawnSyncOptions
) {
  if (!Array.isArray(args)) {
    options = args;
    args = [];
  }

  const { status, stdout, stderr } = spawnSync(
    "node",
    [filename, ...args],
    options
  );

  if (status !== 0) {
    throw new Error(String(stderr));
  }

  const result = String(stdout);

  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}
