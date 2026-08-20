import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import mdx from "@mdx-js/rollup";
import { Data, Effect } from "effect";
import { createServer } from "vite";
import type { GitHubContributionSummary } from "../lib/github";

const webRoot = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = resolve(webRoot, "public");

const staticDocuments = [
  ["index.md", "renderHomeMarkdown"],
  ["work.md", "renderWorkMarkdown"],
  ["collaborate.md", "renderCollaborateMarkdown"],
  ["privacy.md", "renderPrivacyMarkdown"],
  ["llms.txt", "renderLlmsText"],
  ["llms-full.txt", "renderLlmsFullText"],
] as const;

type AgentDocumentRenderer = (
  summary: GitHubContributionSummary | null
) => string;
type AgentDocumentModule = Readonly<Record<string, unknown>>;
type GitHubContributionModule = Readonly<{
  loadGitHubContributionSummary?: unknown;
}>;
type GrowthEvidenceModule = Readonly<{
  NAKAFA_GROWTH_MARKDOWN_HREF?: unknown;
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
        oxc: {
          jsx: {
            runtime: "automatic",
          },
        },
        plugins: [mdx()],
        resolve: {
          alias: {
            "@": webRoot,
          },
        },
        root: webRoot,
        server: {
          middlewareMode: true,
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
    const growthEvidence = yield* Effect.tryPromise({
      catch: agentDocumentError("Could not load the growth document route."),
      try: async () =>
        (await server.ssrLoadModule(
          "/lib/nakafa-growth.ts"
        )) as GrowthEvidenceModule,
    });
    const growthMarkdownHref = yield* Effect.try({
      catch: agentDocumentError("Could not resolve the growth document route."),
      try: () => {
        const href = growthEvidence.NAKAFA_GROWTH_MARKDOWN_HREF;

        if (typeof href !== "string" || !href.startsWith("/")) {
          throw new TypeError("The growth Markdown route is invalid.");
        }

        return href;
      },
    });
    const documents = [
      ...staticDocuments,
      [growthMarkdownHref.slice(1), "renderNakafaGrowthMarkdown"],
    ] as const;
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

    yield* Effect.all(
      documents.map(([outputPath, rendererName]) =>
        Effect.gen(function* () {
          const renderDocument = yield* Effect.try({
            catch: agentDocumentError(`Could not load ${rendererName}.`),
            try: () => {
              const renderer = agentDocs[rendererName];

              if (typeof renderer !== "function") {
                throw new TypeError(`Missing ${rendererName} renderer.`);
              }

              return renderer as AgentDocumentRenderer;
            },
          });

          const content = yield* Effect.try({
            catch: agentDocumentError(`Could not render ${outputPath}.`),
            try: () => renderDocument(githubSummary),
          });
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
