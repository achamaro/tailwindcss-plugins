import { defineConfig } from "tsup";

export default defineConfig({
  entry: [
    "src/index.ts",
    "src/fetch-script.ts",
    "src/tailwind-merge-plugin.ts",
  ],
  format: ["cjs", "esm"],
  shims: true,
  dts: {
    resolve: true,
  },
  splitting: false,
  clean: true,
  sourcemap: false,
  esbuildOptions(options) {
    options.define!.PACKAGE_NAME = JSON.stringify(process.env.npm_package_name);
  },
});
