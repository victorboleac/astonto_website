import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { getAllContentAsync } from "@lib/content";

export const metadata = {
  title: "Industry AI Visibility Guides",
  description: "Educational insights into how buyers in professional services, IT, law, and consulting evaluate vendors using AI search.",
};

export default async function IndustriesPage() {
  const industries = await getAllContentAsync("industries");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Industry Sector Hub</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          AI Visibility Across Business Sectors
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Educational analyses exploring how B2B buyers use ChatGPT, Perplexity, and Gemini to evaluate companies in specific sectors.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {industries.map((ind) => (
          <div key={ind.meta.slug} className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
            <span className="text-xs font-mono text-cyan-deep font-bold">Sector Guide</span>
            <h2 className="text-xl font-bold text-navy hover:text-cyan-deep transition-colors">
              <Link href={`/industries/${ind.meta.slug}`}>{ind.meta.title}</Link>
            </h2>
            <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">{ind.meta.description}</p>
            <div className="pt-2">
              <Link href={`/industries/${ind.meta.slug}`} className="text-xs font-bold text-cyan-deep hover:underline">
                Read Industry Analysis →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
