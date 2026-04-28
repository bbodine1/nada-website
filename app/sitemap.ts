import type { MetadataRoute } from "next";

import { cropApplicatorServiceAreas } from "@/lib/service-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.northaldroneapplicators.com";
  const lastModified = new Date();

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/herbicide-application`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/crop-applicators`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    ...cropApplicatorServiceAreas.map((area) => ({
      url: `${baseUrl}/crop-applicators/${area.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
