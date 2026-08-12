import React from "react";
import { BenchmarkCompany } from "@/data/research/managed-it-greater-manchester-2026";

interface PlatformComparisonProps {
  companies: BenchmarkCompany[];
}

export function PlatformComparison({ companies }: PlatformComparisonProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-navy">
          The same company can look very different across AI platforms
        </h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
          AI systems draw on different index sources, citation models, and retrieval methods. Within this test set, brand recommendations varied significantly depending on the platform queried.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {companies.map((company) => (
          <div
            key={company.name}
            className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="border-b border-line pb-3">
                <h3 className="text-base font-bold text-navy">{company.name}</h3>
                <span className="text-xs font-mono text-cyan-deep font-semibold">
                  Benchmark: {company.pulseBenchmark.toFixed(2)}
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center bg-surface-soft px-3 py-1.5 rounded">
                  <span className="text-muted">ChatGPT</span>
                  <span className="font-bold text-navy">{company.chatgpt.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-surface-soft px-3 py-1.5 rounded">
                  <span className="text-muted">Perplexity</span>
                  <span className="font-bold text-navy">{company.perplexity.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-surface-soft px-3 py-1.5 rounded">
                  <span className="text-muted">Gemini</span>
                  <span className="font-bold text-navy">{company.gemini.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center bg-surface-soft px-3 py-1.5 rounded">
                  <span className="text-muted">Google AI Overviews</span>
                  <span className="font-bold text-navy">{company.googleAIOverviews.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-line">
              <span className="block text-[11px] font-mono text-muted uppercase tracking-wider mb-1">
                Observed Pattern
              </span>
              <p className="text-xs text-ink-soft leading-relaxed">
                {company.interpretation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
