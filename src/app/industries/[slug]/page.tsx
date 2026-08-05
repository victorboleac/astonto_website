import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getContentBySlugAsync, getAllContentAsync } from "@lib/content";
import { marked } from "marked";

export async function generateStaticParams() {
  const items = await getAllContentAsync("industries");
  return items.map((a) => ({ slug: a.meta.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const item = await getContentBySlugAsync("industries", params.slug);
  if (!item) return {};
  return {
    title: item.meta.title,
    description: item.meta.description,
  };
}

export default async function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const item = await getContentBySlugAsync("industries", params.slug);
  if (!item) notFound();

  const htmlContent = marked(item.content);

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-10">
      <div className="space-y-4 border-b border-line pb-8">
        <Link href="/industries" className="text-xs font-mono text-cyan-deep hover:underline">
          ← Back to Industry Hub
        </Link>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">{item.meta.title}</h1>
        <p className="text-base text-ink-soft leading-relaxed">{item.meta.description}</p>
      </div>

      <div
        className="prose prose-navy max-w-none text-ink text-sm leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: htmlContent }}
      />

      <div className="p-8 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-navy">What an AnswerSignal Audit Measures in This Category</h2>
        <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
          <li>• Category buyer prompt coverage across 4 AI platforms.</li>
          <li>• Entity resolution clarity and canonical address/office verification.</li>
          <li>• Direct comparative benchmark against 4 key sector competitors.</li>
          <li>• PULSE Share of Voice and recommendation win rate.</li>
        </ul>
        <div className="pt-2">
          <Link
            href="/contact?service=check"
            className="inline-block px-6 py-3 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-xs"
          >
            Book an AI Visibility Check for Your Firm
          </Link>
        </div>
      </div>
    </article>
  );
}
