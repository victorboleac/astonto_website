import { MetadataRoute } from "next";
import { siteConfig } from "@config/site";
import { getAllContent } from "@lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/research",
    "/answer-signal",
    "/pulse-method",
    "/services/ai-visibility-audit",
    "/services/90-day-optimisation-sprint",
    "/services/monitoring",
    "/pricing",
    "/industries",
    "/compare",
    "/resources",
    "/faq",
    "/about",
    "/contact",
    "/privacy",
    "/cookies",
    "/terms",
    "/accessibility",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const researchRoutes = getAllContent("research")
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/research/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const resourceRoutes = getAllContent("resources")
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/resources/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const industryRoutes = getAllContent("industries")
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/industries/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const comparisonRoutes = getAllContent("comparisons")
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/compare/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [
    ...staticRoutes,
    ...researchRoutes,
    ...resourceRoutes,
    ...industryRoutes,
    ...comparisonRoutes,
  ];
}
