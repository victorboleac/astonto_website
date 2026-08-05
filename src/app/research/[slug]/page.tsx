import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentBySlug, getAllContent } from "@lib/content";
import { siteConfig } from "@config/site";
import { marked } from "marked";

export async function generateStaticParams() {
  const articles = getAllContent("research");
  return articles.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getContentBySlug("research", params.slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default function ResearchArticlePage({ params }: { params: { slug: string } }) {
  const item = getContentBySlug("research", params.slug);
  if (!item) notFound();

  const htmlContent = marked(item.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-4 border-b border-line pb-8">
        <Link href="/research" className="text-xs font-mono text-cyan-deep hover:underline">
          ← Back to Research Overview
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">{item.meta.title}</h1>
        <p className="text-sm text-ink-soft leading-relaxed italic">{item.meta.description}</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-muted pt-4">
          <div>
            <span className="block text-muted">Author</span>
            <span className="text-navy font-semibold">{item.meta.author}</span>
          </div>
          <div>
            <span className="block text-muted">Reviewer</span>
            <span className="text-navy font-semibold">{item.meta.reviewer || "Victor Boleac"}</span>
          </div>
          <div>
            <span className="block text-muted">Methodology</span>
            <span className="text-cyan-deep font-semibold">{item.meta.methodologyVersion || "PULSE v1.0"}</span>
          </div>
          <div>
            <span className="block text-muted">Reliability</span>
            <span className="text-navy font-semibold">{item.meta.reliability || "High"}</span>
          </div>
        </div>
      </div>

      <div
        className="prose prose-navy max-w-none text-ink text-sm leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      {/* Citation Block */}
      <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
        <h3 className="text-xs font-mono text-cyan-deep uppercase tracking-wider font-bold">Citation Block</h3>
        <p className="text-xs font-mono text-navy bg-surface-soft p-3 rounded border border-line select-all">
          {`ASTONTO Research. (${item.meta.publishedAt || "2026"}). "${item.meta.title}". ASTONTO Independent AI Research. ${siteConfig.url}/research/${item.meta.slug}`}
        </p>
      </div>
    </article>
  );
}
