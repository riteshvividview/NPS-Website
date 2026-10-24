import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...[
      "/nps-programs/pre-primary-school",
      "/nps-programs/primary-school",
      "/nps-programs/middle-school",
      "/nps-programs/high-school",
      "/nps-programs/special-section",
      "/nps-programs/cca-department",
      "/isc",
      "/careers",
      "/routes",
    ].map((path) => ({
      url: `${siteConfig.url}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
