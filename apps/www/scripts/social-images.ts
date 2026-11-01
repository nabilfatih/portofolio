import { NodeRuntime, NodeServices } from "@effect/platform-node";
import { Effect, FileSystem, Path } from "effect";
import { loadModule, MdxServer, webRoot } from "#www/scripts/mdx-server";
import type * as Cases from "#www/src/lib/cases";
import type * as Social from "#www/src/lib/social";
import type * as Og from "../src/lib/og.tsx";

/** Writes the social image of every page to `public/og`. */
const generateSocialImages = Effect.gen(function* () {
  const fileSystem = yield* FileSystem.FileSystem;
  const path = yield* Path.Path;

  const server = yield* MdxServer;
  const { caseStudies } = yield* loadModule<typeof Cases>(
    server,
    "/src/lib/cases.ts"
  );
  const { renderSocialImage } = yield* loadModule<typeof Og>(
    server,
    "/src/lib/og.tsx"
  );
  const { createCaseSocialCard, socialCards } = yield* loadModule<
    typeof Social
  >(server, "/src/lib/social.ts");

  yield* Effect.forEach(
    [...socialCards, ...caseStudies.map(createCaseSocialCard)],
    (card) =>
      Effect.gen(function* () {
        const destination = path.resolve(
          webRoot,
          "public/og",
          ...card.path,
          "image.png"
        );
        const image = yield* renderSocialImage(card);

        yield* fileSystem.makeDirectory(path.dirname(destination), {
          recursive: true,
        });
        yield* fileSystem.writeFile(destination, image);
      }),
    { concurrency: 4, discard: true }
  );
});

generateSocialImages.pipe(
  Effect.scoped,
  Effect.provide(NodeServices.layer),
  NodeRuntime.runMain
);
