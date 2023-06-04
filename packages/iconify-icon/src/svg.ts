import type { IconifyIcon } from "iconify-icon";

export default function generateSvgDataUri(icon: IconifyIcon) {
  return `data:image/svg+xml;utf8,${encodeSvg(generateSvg(icon))}`;
}

function generateSvg({ width = 16, height = 16, body }: IconifyIcon) {
  return `<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
}

function encodeSvg(svg: string) {
  return svg
    .replace(/"/g, "'")
    .replace(/%/g, "%25")
    .replace(/#/g, "%23")
    .replace(/{/g, "%7B")
    .replace(/}/g, "%7D")
    .replace(/</g, "%3C")
    .replace(/>/g, "%3E");
}
