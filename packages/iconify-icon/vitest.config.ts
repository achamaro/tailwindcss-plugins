import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    includeSource: ["src/**/*.{test,spec}.{js,ts}"],
    globals: true,
  },
});
