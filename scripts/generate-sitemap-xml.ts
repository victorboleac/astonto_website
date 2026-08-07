import fs from "fs";
import path from "path";
import matter from "gray-matter";

const baseUrl = "https://astonto.com";

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
];

function getIndexableUrls(category: string, prefix: string) {
  const dirPath = path.join(process.cwd(), "content", category);
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".md"));

  const urls: string[] = [];
  for (const file of files) {
    const slug = file.replace(/\.md$/, "");
    const fileContent = fs.readFileSync(path.join(dirPath, file), "utf8");
    const { data } = matter(fileContent);
    if (!data.noindex) {
      urls.push(`${baseUrl}${prefix}/${slug}`);
    }
  }
  return urls;
}

const allUrls = [
  ...staticRoutes.map((r) => `${baseUrl}${r}`),
  ...getIndexableUrls("research", "/research"),
  ...getIndexableUrls("resources", "/resources"),
  ...getIndexableUrls("industries", "/industries"),
  ...getIndexableUrls("comparisons", "/compare"),
];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (url) => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === baseUrl ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

const publicPath = path.join(process.cwd(), "public", "sitemap.xml");
fs.writeFileSync(publicPath, sitemapXml, "utf8");
console.log(`Successfully generated public/sitemap.xml with ${allUrls.length} URLs (${sitemapXml.length} bytes)`);
