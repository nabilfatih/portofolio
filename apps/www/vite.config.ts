import { resolve } from "node:path";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { mdxOptions } from "#www/mdx.config";
import { staticPages } from "#www/src/lib/pages";

const webRoot = import.meta.dirname;

export default defineConfig({
  plugins: [
    {
      enforce: "pre",
      ...mdx({
        ...mdxOptions,
        providerImportSource: "@/components/mdx/registry",
      }),
    },
    tailwindcss(),
    tanstackStart({
      pages: staticPages.map((path) => ({ path })),
      prerender: {
        autoStaticPathsDiscovery: false,
        autoSubfolderIndex: false,
        // Set, so the build machine's core count never changes the output.
        concurrency: 4,
        crawlLinks: false,
        enabled: true,
        failOnError: true,
        retryCount: 3,
      },
    }),
    react({ include: /\.(mdx|tsx?)$/ }),
  ],
  preview: {
    port: 3100,
    strictPort: true,
  },
  resolve: {
    alias: {
      "@/": `${resolve(webRoot, "src")}/`,
      "@repo/design-system": resolve(webRoot, "../../packages/design-system"),
    },
  },
  server: {
    port: 3100,
    strictPort: true,
  },
});
