import { Ruleset, Zone } from "@alchemy.run/cloudflare";
import { adopt } from "alchemy/AdoptPolicy";
import { Effect } from "effect";
import { SITE_ZONE } from "#www/deploy/stage";
import { CASE_SLUGS } from "#www/src/lib/case-slugs";

/** The pages whose Markdown document sits at the same path with `.md` added. */
const MARKDOWN_PAGES = [
  "/case-studies",
  "/collaborate",
  "/privacy",
  "/work",
  ...Object.values(CASE_SLUGS).map((slug) => `/work/${slug}`),
];

/** A request whose Accept header asks for Markdown. */
const ACCEPTS_MARKDOWN =
  'any(http.request.headers["accept"][*] contains "text/markdown")';

/**
 * The nabilfatih.com zone, deployed from production only. The zone is adopted,
 * because Cloudflare keeps no ownership marker on a zone. Its records stay as
 * they are: Alchemy leaves a record it does not declare, and the custom domain
 * writes its own.
 *
 * Plain HTTP moves to HTTPS. Email obfuscation stays off, because it rewrites the
 * contact links of the static HTML, which React then fails to hydrate.
 *
 * The transform rules answer a page with its Markdown document when the request
 * asks for Markdown. They run before the asset layer, so the static site keeps
 * its content negotiation without a Worker.
 */
export const deploySiteZone = Effect.fn("deploy.siteZone")(function* () {
  const zone = yield* Zone.Zone("SiteZone", {
    name: SITE_ZONE,
  }).pipe(adopt(true));

  yield* Zone.Setting("AlwaysUseHttps", {
    settingId: "always_use_https",
    value: "on",
    zoneId: zone.zoneId,
  });
  yield* Zone.Setting("EmailObfuscation", {
    settingId: "email_obfuscation",
    value: "off",
    zoneId: zone.zoneId,
  });

  yield* Ruleset.Ruleset("MarkdownRewrites", {
    phase: "http_request_transform",
    rules: [
      {
        action: "rewrite",
        actionParameters: { uri: { path: { value: "/index.md" } } },
        description: "The home page as Markdown",
        enabled: true,
        expression: `${ACCEPTS_MARKDOWN} and http.request.uri.path eq "/"`,
      },
      {
        action: "rewrite",
        actionParameters: {
          uri: {
            path: { expression: 'concat(http.request.uri.path, ".md")' },
          },
        },
        description: "A page as Markdown",
        enabled: true,
        expression: `${ACCEPTS_MARKDOWN} and http.request.uri.path in {${MARKDOWN_PAGES.map((page) => `"${page}"`).join(" ")}}`,
      },
    ],
    zone,
  });
});
