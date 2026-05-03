import type { MetadataRoute } from "next";

import { getAllArticles } from "@/lib/articles";
import { cropApplicatorServiceAreas, localDroneServicePages } from "@/lib/service-areas";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.northaldroneapplicators.com";
  const lastModified = new Date();
  const articles = getAllArticles();

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
    {
      url: `${baseUrl}/local-services`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/news`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...articles.map((article) => ({
      url: `${baseUrl}/news/${article.slug}`,
      lastModified: new Date(`${article.date}T00:00:00`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...cropApplicatorServiceAreas.map((area) => ({
      url: `${baseUrl}/crop-applicators/${area.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...localDroneServicePages.map((page) => ({
      url: `${baseUrl}/local-services/${page.slug}`,
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
