import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    background_color: "#ffffff",
    description: siteConfig.description,
    display: "standalone",
    icons: [
      {
        sizes: "192x192",
        src: "/android-chrome-192x192.png",
        type: "image/png",
      },
      {
        sizes: "512x512",
        src: "/android-chrome-512x512.png",
        type: "image/png",
      },
    ],
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    start_url: "/",
    theme_color: "#ffffff",
  };
}
