import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentBySlugAsync, getAllContentAsync } from "@lib/content";
import { getArticleSchema } from "@lib/schema";
import { siteConfig } from "@config/site";
import { marked } from "marked";

export async function generateStaticParams() {
  const items = await getAllContentAsync("resources");
  return items.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getContentBySlugAsync("resources", params.slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function ResourceArticleDetail({ params }: { params: { slug: string } }) {
  const item = await getContentBySlugAsync("resources", params.slug);
  if (!item) notFound();

  const htmlContent = marked(item.content);
  const articleSchema = getArticleSchema({
    title: item.meta.title,
    description: item.meta.description,
    url: `${siteConfig.url}/resources/${item.meta.slug}`,
    publishedAt: item.meta.publishedAt || "2026-08-01",
    author: item.meta.author,
  });

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
      </head>

      <div className="space-y-4 border-b border-line pb-8">
        <Link href="/resources" className="text-xs font-mono text-cyan-deep hover:underline">
          ← Back to Resource Centre
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">{item.meta.title}</h1>
        <p className="text-sm text-ink-soft leading-relaxed italic">{item.meta.description}</p>
        <div className="flex items-center space-x-4 text-xs font-mono text-muted pt-2">
          <span>By {item.meta.author}</span>
          <span>•</span>
          <span>{item.meta.publishedAt}</span>
          <span>•</span>
          <span className="text-cyan-deep font-bold">{item.meta.readingTime}</span>
        </div>

        {item.meta.imageUrl && (
          <div className="pt-4">
            <img
              src={item.meta.imageUrl}
              alt={item.meta.title}
              className="w-full max-h-96 object-cover rounded-2xl border border-line shadow-sm"
            />
          </div>
        )}
      </div>

      <div
        className="prose prose-navy max-w-none text-ink text-sm leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />
    </article>
  );
}
