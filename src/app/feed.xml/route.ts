import { NextResponse } from "next/server";
import { siteConfig } from "@config/site";
import { getAllContentAsync } from "@lib/content";

export async function GET() {
  const baseUrl = siteConfig.url;
  const research = await getAllContentAsync("research");
  const resources = await getAllContentAsync("resources");

  const allArticles = [...research, ...resources]
    .filter((item) => !item.meta.noindex)
    .sort((a, b) => {
      const dateA = new Date(a.meta.publishedAt || 0).getTime();
      const dateB = new Date(b.meta.publishedAt || 0).getTime();
      return dateB - dateA;
    });

  const rssItems = allArticles
    .map((item) => {
      const type = item.meta.category === "Research" ? "research" : "resources";
      const itemUrl = `${baseUrl}/${type}/${item.meta.slug}`;
      const pubDate = new Date(item.meta.publishedAt || Date.now()).toUTCString();

      return `    <item>
      <title><![CDATA[${item.meta.title}]]></title>
      <link>${itemUrl}</link>
      <guid isPermaLink="true">${itemUrl}</guid>
      <description><![CDATA[${item.meta.description || ""}]]></description>
      <pubDate>${pubDate}</pubDate>
    </item>`;
    })
    .join("\n");

  const rssFeed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>ASTONTO — Independent AI Research &amp; AnswerSignal Insights</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-gb</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

  return new NextResponse(rssFeed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
