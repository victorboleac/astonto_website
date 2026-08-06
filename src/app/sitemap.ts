import { MetadataRoute } from "next";
import { siteConfig } from "@config/site";
import { getAllContentAsync } from "@lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = siteConfig.url;

  const staticRoutes = [
    "",
    "/research",
    "/ai-search-visibility",
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

  const research = await getAllContentAsync("research");
  const researchRoutes = research
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/research/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const resources = await getAllContentAsync("resources");
  const resourceRoutes = resources
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/resources/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));

  const industries = await getAllContentAsync("industries");
  const industryRoutes = industries
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/industries/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  const comparisons = await getAllContentAsync("comparisons");
  const comparisonRoutes = comparisons
    .filter((item) => !item.meta.noindex)
    .map((item) => ({
      url: `${baseUrl}/compare/${item.meta.slug}`,
      lastModified: new Date(item.meta.modifiedAt || item.meta.publishedAt || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...staticRoutes, ...researchRoutes, ...resourceRoutes, ...industryRoutes, ...comparisonRoutes];
}
