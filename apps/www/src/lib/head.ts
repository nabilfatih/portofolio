import { SITE_URL, siteConfig } from "@/lib/site";
import type { createSocialImage } from "@/lib/social";

interface PageHeadOptions {
  description: string;
  image: ReturnType<typeof createSocialImage>;
  markdownPath: string;
  path: string;
  socialTitle: string;
  title?: string;
  type?: "article" | "website";
}

/** Builds the title, canonical link, Open Graph, and Twitter tags of one page. */
export function pageHead({
  description,
  image,
  markdownPath,
  path,
  socialTitle,
  title,
  type = "website",
}: PageHeadOptions) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const imageUrl = `${SITE_URL}${image.url}`;

  return {
    links: [
      { href: url, rel: "canonical" },
      { href: markdownPath, rel: "alternate", type: "text/markdown" },
    ],
    meta: [
      {
        title: title ? `${title} | ${siteConfig.shortName}` : siteConfig.title,
      },
      { content: description, name: "description" },
      { content: description, property: "og:description" },
      { content: imageUrl, property: "og:image" },
      { content: image.alt, property: "og:image:alt" },
      { content: String(image.height), property: "og:image:height" },
      { content: image.type, property: "og:image:type" },
      { content: String(image.width), property: "og:image:width" },
      { content: "en_US", property: "og:locale" },
      { content: siteConfig.shortName, property: "og:site_name" },
      { content: socialTitle, property: "og:title" },
      { content: type, property: "og:type" },
      { content: url, property: "og:url" },
      { content: "summary_large_image", name: "twitter:card" },
      { content: "@nabilfatih_", name: "twitter:creator" },
      { content: description, name: "twitter:description" },
      { content: imageUrl, name: "twitter:image" },
      { content: socialTitle, name: "twitter:title" },
    ],
  };
}
