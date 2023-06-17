import { optimize } from "svgo";

type IconData = {
  body: string;
  width?: number;
  height?: number;
};

export function generateSvgDataUri(icon: IconData) {
  return generateDataUri(generateSvg(icon));
}

export function parseSvg(svg: string) {
  const { data } = optimize(svg, {
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            removeViewBox: false,
          },
        },
      },
      {
        name: "removeDimensions",
      },
    ],
  });

  const viewBox = data.match(/viewBox=['"]([0-9 ,]+)/i)?.[1] ?? "0 0 1 1";
  const [, , width, height] = viewBox.split(/[ ,]+/).map(Number);

  return {
    data: generateDataUri(data),
    width,
    height,
  };
}

function generateDataUri(svg: string) {
  return `data:image/svg+xml;utf8,${encodeSvg(svg)}`;
}

function generateSvg({ width = 16, height = 16, body }: IconData) {
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
