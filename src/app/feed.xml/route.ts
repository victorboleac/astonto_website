import { siteConfig } from "@config/site";
import { getAllContentAsync } from "@lib/content";

export async function GET() {
  const research = await getAllContentAsync("research");
  const resources = await getAllContentAsync("resources");
  const articles = [...research, ...resources];

  const itemsXml = articles
    .map(
      (item) => `
    <item>
      <title><![CDATA[${item.meta.title}]]></title>
      <link>${siteConfig.url}/resources/${item.meta.slug}</link>
      <description><![CDATA[${item.meta.description}]]></description>
      <pubDate>${new Date(item.meta.publishedAt || Date.now()).toUTCString()}</pubDate>
      <guid>${siteConfig.url}/resources/${item.meta.slug}</guid>
    </item>`
    )
    .join("");

  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteConfig.name} Research & Resources</title>
    <link>${siteConfig.url}</link>
    <description>${siteConfig.description}</description>
    <language>en-gb</language>
    <atom:link href="${siteConfig.url}/feed.xml" rel="self" type="application/rss+xml" />
    ${itemsXml}
  </channel>
</rss>`;

  return new Response(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
