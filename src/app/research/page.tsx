import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { getAllContentAsync } from "@lib/content";

export const metadata = {
  title: "Independent AI Research & Observational Methodology",
  description: "ASTONTO studies the observable behaviour of commercial LLMs and generative recommendation engines.",
};

export default async function ResearchPage() {
  const articles = await getAllContentAsync("research");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Independent Research</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          Observational LLM & Generative Engine Research
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          ASTONTO studies outputs that users can observe. We do not claim access to proprietary model internals or unreleased vendor algorithms.
        </p>
      </div>

      <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
        <h2 className="text-lg font-bold text-navy">Black-Box Evaluation Framework</h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          Because commercial AI platform vendors do not publish real-time internal weights, empirical evaluation relies on controlled black-box testing. We isolate observable input signals, prompt variations, and output consistency across ChatGPT, Perplexity, Gemini, and Google AI Overviews.
        </p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-navy">Published Studies & Methodology Notes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.map((item) => (
            <div key={item.meta.slug} className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                {item.meta.imageUrl && (
                  <div className="overflow-hidden rounded-xl h-44 bg-surface-soft">
                    <img
                      src={item.meta.imageUrl}
                      alt={item.meta.title}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                )}
                <div className="flex justify-between items-center text-xs text-muted font-mono">
                  <span>{item.meta.category || "Methodology"}</span>
                  <span>{item.meta.publishedAt}</span>
                </div>
                <h3 className="text-lg font-bold text-navy hover:text-cyan-deep transition-colors">
                  <Link href={`/research/${item.meta.slug}`}>{item.meta.title}</Link>
                </h3>
                <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">{item.meta.description}</p>
              </div>
              <div className="pt-2 flex justify-between items-center text-xs font-mono">
                <span className="text-cyan-deep font-semibold">Reliability: {item.meta.reliability || "High"}</span>
                <Link href={`/research/${item.meta.slug}`} className="text-navy hover:text-cyan-deep font-bold">
                  Read Study →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
