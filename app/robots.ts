import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*"
      }
    ],
    sitemap: "https://www.nabilfatih.com/sitemap.xml",
    host: "https://www.nabilfatih.com"
  }
}
