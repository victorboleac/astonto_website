import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentBySlug, getAllContent } from "@lib/content";
import { marked } from "marked";

export async function generateStaticParams() {
  const items = getAllContent("comparisons");
  return items.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = getContentBySlug("comparisons", params.slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.description,
    robots: item.meta.noindex ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export default function ComparisonDetailPage({ params }: { params: { slug: string } }) {
  const item = getContentBySlug("comparisons", params.slug);
  if (!item) notFound();

  const htmlContent = marked(item.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-4 border-b border-line pb-8">
        <Link href="/compare" className="text-xs font-mono text-cyan-deep hover:underline">
          ← Back to Comparisons Hub
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">{item.meta.title}</h1>
        <p className="text-base text-ink-soft leading-relaxed">{item.meta.description}</p>
        {item.meta.noindex && (
          <div className="p-3 rounded bg-warning/10 border border-warning/30 text-warning text-xs font-mono">
            Draft Template — Noindex Enabled
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
