import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import { Data, Effect } from "effect";
import { createServer } from "vite";
import type { RenderedAgentDocument } from "../lib/agent-docs";
import type { GitHubContributionSummary } from "../lib/github";
import { mdxOptions } from "../mdx.config.ts";

const webRoot = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = resolve(webRoot, "public");

type AgentDocumentModule = Readonly<Record<string, unknown>>;
type GitHubContributionModule = Readonly<{
  loadGitHubContributionSummary?: unknown;
}>;

class AgentDocumentError extends Data.TaggedError("AgentDocumentError")<{
  readonly cause: unknown;
  readonly message: string;
}> {}

const agentDocumentError = (message: string) => (cause: unknown) =>
  new AgentDocumentError({ cause, message });

const createMdxServer = Effect.acquireRelease(
  Effect.tryPromise({
    catch: agentDocumentError("Could not start the MDX compiler."),
    try: () =>
      createServer({
        appType: "custom",
        configFile: false,
        optimizeDeps: {
          noDiscovery: true,
        },
        oxc: {
          jsx: {
            runtime: "automatic",
          },
        },
        plugins: [mdx(mdxOptions)],
        resolve: {
          alias: {
            "@": webRoot,
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

const generateAgentDocs = Effect.scoped(
  Effect.gen(function* () {
    const server = yield* createMdxServer;
    const agentDocs = yield* Effect.tryPromise({
      catch: agentDocumentError(
        "Could not compile the agent document renderers."
      ),
      try: async () =>
        (await server.ssrLoadModule(
          "/lib/agent-docs.ts"
        )) as AgentDocumentModule,
    });
    const github = yield* Effect.tryPromise({
      catch: agentDocumentError(
        "Could not compile the GitHub contribution loader."
      ),
      try: async () =>
        (await server.ssrLoadModule(
          "/lib/github.ts"
        )) as GitHubContributionModule,
    });
    const githubSummary = yield* Effect.tryPromise({
      catch: agentDocumentError(
        "Could not load the current GitHub contributions."
      ),
      try: async () => {
        const loadSummary = github.loadGitHubContributionSummary;

        if (typeof loadSummary !== "function") {
          return null;
        }

        return (await loadSummary()) as GitHubContributionSummary | null;
      },
    }).pipe(Effect.orElseSucceed(() => null));

    const renderDocuments = yield* Effect.try({
      catch: agentDocumentError("Could not load the agent document renderer."),
      try: () => {
        const renderer = agentDocs.renderAgentDocuments;

        if (typeof renderer !== "function") {
          throw new TypeError("Missing renderAgentDocuments renderer.");
        }

        return renderer as (
          summary: GitHubContributionSummary | null
        ) => unknown;
      },
    });
    const documents = yield* Effect.try({
      catch: agentDocumentError("Could not render the agent documents."),
      try: () => {
        const rendered = renderDocuments(githubSummary);

        if (!Array.isArray(rendered)) {
          throw new TypeError("The agent document renderer returned no list.");
        }

        return rendered.map((document) => {
          if (
            typeof document?.content !== "string" ||
            typeof document.outputPath !== "string"
          ) {
            throw new TypeError("An agent document is invalid.");
          }

          return document as RenderedAgentDocument;
        });
      },
    });

    yield* Effect.all(
      documents.map(({ content, outputPath }) =>
        Effect.gen(function* () {
          const destination = resolve(publicRoot, outputPath);

          yield* Effect.tryPromise({
            catch: agentDocumentError(`Could not write ${destination}.`),
            try: async () => {
              await mkdir(dirname(destination), { recursive: true });
              await writeFile(destination, content, "utf8");
            },
          });
        })
      ),
      { concurrency: 4 }
    );
  })
);

await Effect.runPromise(generateAgentDocs);
