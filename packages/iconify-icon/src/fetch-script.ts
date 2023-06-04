import { fetchIcon } from "./fetch";

if (process.argv.length < 4) {
  throw new Error(`Usage: node fetch-script <downloadDir> <iconName>`);
}

const [downloadDir, iconPath] = process.argv.slice(2);

(async () => {
  const icon = await fetchIcon(iconPath, downloadDir);
  process.stdout.write(JSON.stringify(icon));
})();
