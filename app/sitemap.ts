import type { MetadataRoute } from "next"

const pathnames = ["", "/", "/work"]

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.nabilfatih.com"
  const paths: MetadataRoute.Sitemap = pathnames.map(pathname => {
    return {
      url: `${baseUrl}${pathname}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly",
      priority: 1
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "daily",
      priority: 1
    },
    ...paths
  ]
}
