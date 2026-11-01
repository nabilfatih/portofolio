/** The Alchemy stage that serves nabilfatih.com. */
export const PRODUCTION_DEPLOY_STAGE = "prod";

/** The zone that holds the portfolio's hostnames. */
export const SITE_ZONE = "nabilfatih.com";

/** The Cloudflare name of the site's Worker in one stage. */
export function workerName(stage: string) {
  if (stage === PRODUCTION_DEPLOY_STAGE) {
    return "nabilfatih-www";
  }
  return `nabilfatih-www-${stage}`;
}

/**
 * Who reaches the site. Production owns the apex as a custom domain, and www
 * answers with a 301 to the apex from a zone rule, before any Worker. Every other
 * stage gets only workers.dev, so it never touches the zone.
 */
export function siteExposure(stage: string) {
  if (stage === PRODUCTION_DEPLOY_STAGE) {
    return {
      domain: {
        name: SITE_ZONE,
        redirects: [`www.${SITE_ZONE}`],
        zoneName: SITE_ZONE,
      },
      workersDev: false,
    };
  }
  return { workersDev: true };
}
