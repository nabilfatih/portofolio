import { BunRuntime, BunServices } from "@effect/platform-bun";
import { Effect, FileSystem, Path, Schema } from "effect";
import { webRoot } from "#www/scripts/mdx-server";
import { staticPages } from "#www/src/lib/pages";

const MINIMUM_PAGE_BYTES = 10_000;

/** The marker that React writes where a Suspense boundary failed on the server. */
const SERVER_FAILURE_MARKER = "<!--$!-->";

const REQUIRED_FILES = [
  "_headers",
  "llms.txt",
  "og/home/image.png",
  "robots.txt",
  "sitemap.xml",
];

class StaticOutputIncomplete extends Schema.TaggedError<StaticOutputIncomplete>()(
  "StaticOutputIncomplete",
  {
    problems: Schema.Array(Schema.String),
  }
) {}

function pageFile(page: string) {
  return page === "/" ? "index.html" : `${page.slice(1)}.html`;
}

/**
 * TanStack writes each page in a queue, so a page that fails can leave a build
 * that still exits 0. This check fails the build unless every listed page and
 * required file is in the output, each page rendered whole.
 */
const verifyPages = Effect.gen(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;
  const clientRoot = path.resolve(webRoot, "dist/client");

  const pageProblems = yield* Effect.forEach(staticPages, (page) =>
    Effect.gen(function* () {
      const file = path.resolve(clientRoot, pageFile(page));

      if (!(yield* fileSystem.exists(file))) {
        return [`${page}: no page at ${file}`];
      }

      const html = yield* fileSystem.readFileString(file);

      return [
        ...(html.length < MINIMUM_PAGE_BYTES ? [`${page}: too small`] : []),
        ...(html.includes(SERVER_FAILURE_MARKER)
          ? [`${page}: failed on the server`]
          : []),
        ...(html.includes("<main") ? [] : [`${page}: no main content`]),
      ];
    })
  );
  const fileProblems = yield* Effect.forEach(REQUIRED_FILES, (file) =>
    fileSystem
      .exists(path.resolve(clientRoot, file))
      .pipe(Effect.map((exists) => (exists ? [] : [`missing ${file}`])))
  );
  const problems = [...pageProblems.flat(), ...fileProblems.flat()];

  if (problems.length > 0) {
    return yield* new StaticOutputIncomplete({ problems });
  }

  yield* Effect.log(`Verified ${staticPages.length} static pages.`);
});

verifyPages.pipe(Effect.provide(BunServices.layer), BunRuntime.runMain);
