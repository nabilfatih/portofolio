import { CASE_SLUGS } from "#www/src/lib/case-slugs";

/** Every public page. The build writes each one to a file, and no server runs. */
export const staticPages = [
  "/",
  "/404",
  "/case-studies",
  "/collaborate",
  "/privacy",
  "/work",
  ...Object.values(CASE_SLUGS).map((slug) => `/work/${slug}`),
];
