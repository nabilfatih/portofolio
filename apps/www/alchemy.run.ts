import { providers, state, Website } from "@alchemy.run/cloudflare";
import { RemovalPolicy, Stack, Stage } from "alchemy";
import { Effect } from "effect";
import {
  PRODUCTION_DEPLOY_STAGE,
  siteExposure,
  workerName,
} from "#www/deploy/stage";
import { deploySiteZone } from "#www/deploy/zone";

/**
 * The portfolio stack. The site is an assets-only Worker: with no `main` and no
 * `script`, Alchemy uploads no Worker code and Cloudflare's asset layer answers
 * every request itself, so a request never invokes a Worker and traffic costs
 * nothing on any plan. `Website.Vite` would deploy the TanStack Start server
 * bundle as a Worker instead, so this stack builds with `StaticSite`.
 *
 * Production owns the zone settings and rules, and serves nabilfatih.com. Any
 * other stage gets only its workers.dev URL. The production Worker is retained: a
 * stack change that drops it leaves it in place.
 *
 * The stack keeps its own state store, so a deploy here can never upgrade the
 * default store that the Nakafa stacks share in this account.
 */
export default Stack(
  "Portfolio",
  {
    providers: providers(),
    state: state({ name: "portfolio" }),
  },
  Effect.gen(function* () {
    const stage = yield* Stage;
    const isProduction = stage === PRODUCTION_DEPLOY_STAGE;

    if (isProduction) {
      yield* deploySiteZone().pipe(RemovalPolicy.retain());
    }

    const site = yield* Website.StaticSite("Web", {
      assets: {
        // A prerendered page is `work.html`, and its URL has no trailing slash.
        htmlHandling: "drop-trailing-slash",
        // A path with no asset answers the prerendered `404.html`.
        notFoundHandling: "404-page",
      },
      command: "pnpm build",
      dev: { port: 3100, strictPort: true },
      // Every deploy rebuilds, which also refreshes the GitHub contribution data.
      memo: false,
      name: workerName(stage),
      outdir: "dist/client",
      ...siteExposure(stage),
    }).pipe(RemovalPolicy.retain(isProduction));

    return { url: site.url.as<string>() };
  })
);
