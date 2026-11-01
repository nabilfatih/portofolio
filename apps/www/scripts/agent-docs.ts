import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem, Path, Schema } from "effect";
import {
  loadModule,
  MdxServer,
  scriptError,
  webRoot,
} from "#www/scripts/mdx-server";
import type * as AgentDocs from "#www/src/lib/agent-docs";
import type * as GitHub from "#www/src/lib/github";
import type * as Sitemap from "#www/src/lib/sitemap";

/**
 * Writes the Markdown, text, and sitemap files of `public`, and the GitHub
 * contribution data that the home page imports. A failed read keeps the last good
 * data, so a GitHub outage never empties a build.
 */
const generateAgentDocs = Effect.gen(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const publicRoot = path.resolve(webRoot, "public");
  const contributionsPath = path.resolve(
    webRoot,
    "src/content/contributions.json"
  );

  const server = yield* MdxServer;
  const { renderAgentDocuments } = yield* loadModule<typeof AgentDocs>(
    server,
    "/src/lib/agent-docs.ts"
  );
  const { GitHubContributionSummarySchema, loadGitHubContributionSummary } =
    yield* loadModule<typeof GitHub>(server, "/src/lib/github.ts");
  const { renderSitemap } = yield* loadModule<typeof Sitemap>(
    server,
    "/src/lib/sitemap.ts"
  );

  const currentSummary = yield* Effect.tryPromise(
    loadGitHubContributionSummary
  ).pipe(Effect.orElseSucceed(() => null));
  const ContributionsJson = Schema.fromJsonString(
    Schema.NullOr(GitHubContributionSummarySchema)
  );
  const lastSummary = yield* fileSystem.readFileString(contributionsPath).pipe(
    Effect.flatMap(Schema.decodeEffect(ContributionsJson)),
    Effect.orElseSucceed(() => null)
  );
  const summary = currentSummary ?? lastSummary;
  const contributions = yield* Schema.encodeEffect(ContributionsJson)(summary);

  yield* fileSystem.writeFileString(
    contributionsPath,
    `${contributions}
`
  );

  const documents = [
    ...renderAgentDocuments(summary),
    { content: renderSitemap(), outputPath: "sitemap.xml" },
  ];

  yield* Effect.forEach(
    documents,
    ({ content, outputPath }) =>
      Effect.gen(function* () {
        const destination = path.resolve(publicRoot, outputPath);

        yield* fileSystem.makeDirectory(path.dirname(destination), {
          recursive: true,
        });
        yield* fileSystem.writeFileString(destination, content);
      }).pipe(Effect.mapError(scriptError(`Could not write ${outputPath}.`))),
    { concurrency: 4, discard: true }
  );
});

generateAgentDocs.pipe(
  Effect.scoped,
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain
);
