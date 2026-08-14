import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  oxc: {
    jsx: {
      runtime: "automatic",
    },
  },
  plugins: [mdx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    exclude: ["agent-docs.test.ts", ...configDefaults.exclude],
  },
});
