import { MetadataRoute } from "next";
import { siteConfig } from "@config/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/", "/_next/"],
      },
      // Editable AI crawler directives
      {
        userAgent: ["GPTBot", "ChatGPT-User", "PerplexityBot", "Google-Extended", "AnthropicBot"],
        allow: "/",
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
