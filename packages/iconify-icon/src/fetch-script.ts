import { fetchIcon } from "./fetch";

if (process.argv.length < 4) {
  throw new Error(`Usage: node fetch-script <downloadDir> <iconName>`);
}

const [iconDir, iconPath] = process.argv.slice(2);

(async () => {
  const icon = await fetchIcon(iconPath, iconDir);
  process.stdout.write(JSON.stringify(icon));
})();
