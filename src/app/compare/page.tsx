import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { getAllContentAsync } from "@lib/content";

export const metadata = {
  title: "Educational Comparisons Hub | ASTONTO",
  description: "Comparing ASTONTO AI Search Visibility and the PULSE Method with conventional SEO tools and mention-tracking utilities.",
};

export default async function CompareHubPage() {
  const allComps = await getAllContentAsync("comparisons");
  const comparisons = allComps.filter((c) => !c.meta.noindex);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Educational Comparisons</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          Comparing Evaluation Approaches
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Objective analyses comparing empirical AI visibility benchmarking with traditional SEO rank tracking and mention counting.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {comparisons.map((comp) => (
          <div key={comp.meta.slug} className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
            <span className="text-xs font-mono text-cyan-deep font-bold">Methodology Comparison</span>
            <h2 className="text-xl font-bold text-navy hover:text-cyan-deep transition-colors">
              <Link href={`/compare/${comp.meta.slug}`}>{comp.meta.title}</Link>
            </h2>
            <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">{comp.meta.description}</p>
            <div className="pt-2">
              <Link href={`/compare/${comp.meta.slug}`} className="text-xs font-bold text-cyan-deep hover:underline">
                Read Detailed Comparison →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
