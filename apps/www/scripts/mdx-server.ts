import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import { Effect, Schema } from "effect";
import { createServer, type ViteDevServer } from "vite";
import { mdxOptions } from "#www/mdx.config";

export const webRoot = fileURLToPath(new URL("..", import.meta.url));

/** A build script could not read, render, or write what the site needs. */
export class ScriptError extends Schema.TaggedError<ScriptError>()(
  "ScriptError",
  {
    cause: Schema.Unknown,
    message: Schema.String,
  }
) {}

export const scriptError = (message: string) => (cause: unknown) =>
  new ScriptError({ cause, message });

/** A Vite server that loads app modules, MDX included, into a build script. */
export const MdxServer = Effect.acquireRelease(
  Effect.tryPromise({
    catch: scriptError("Could not start the MDX compiler."),
    try: () =>
      createServer({
        appType: "custom",
        configFile: false,
        optimizeDeps: {
          noDiscovery: true,
        },
        oxc: {
          jsx: {
            development: false,
            runtime: "automatic",
          },
        },
        // Plain JSX renders under any NODE_ENV: Alchemy builds with `production`,
        // where the React runtime has no development entry.
        plugins: [mdx({ ...mdxOptions, development: false })],
        resolve: {
          alias: {
            "@": `${webRoot}src`,
          },
        },
        root: webRoot,
        server: {
          middlewareMode: true,
          watch: {
            ignored: ["**/public/**"],
          },
        },
      }),
  }),
  (server) => Effect.promise(() => server.close())
);

/** Loads one app module through the server. */
export const loadModule = <Module>(server: ViteDevServer, path: string) =>
  Effect.tryPromise({
    catch: scriptError(`Could not load ${path}.`),
    try: async () => (await server.ssrLoadModule(path)) as Module,
  });
