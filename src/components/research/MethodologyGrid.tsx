import React from "react";
import { ResearchReportData } from "@/data/research/managed-it-greater-manchester-2026";

interface MethodologyGridProps {
  data: ResearchReportData;
}

export function MethodologyGrid({ data }: MethodologyGridProps) {
  return (
    <div className="space-y-6">
      <div className="border-b border-line pb-4">
        <h2 className="text-2xl font-bold text-navy">How ASTONTO tested the market</h2>
        <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mt-1">
          Controlled observational evaluation protocol executed under the PULSE Method v1.0.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Market</span>
          <span className="text-navy font-bold text-sm block">{data.market}</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Geography & Language</span>
          <span className="text-navy font-bold text-sm block">{data.location}</span>
          <span className="text-cyan-deep text-xs block">{data.language}</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Testing Window</span>
          <span className="text-navy font-bold text-sm block">{data.testingPeriod}</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Methodology Specification</span>
          <span className="text-navy font-bold text-sm block">{data.methodologyVersion}</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Prompts Evaluated</span>
          <span className="text-navy font-bold text-sm block">{data.promptCount} Unique Prompts</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">AI Platforms</span>
          <span className="text-navy font-bold text-sm block">{data.platformCount} Platforms</span>
          <span className="text-muted text-[11px] block">{data.platforms.join(", ")}</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Repeated Runs</span>
          <span className="text-navy font-bold text-sm block">{data.runsPerPlatform}× per Prompt</span>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-line space-y-1">
          <span className="text-muted block text-[11px]">Observed Responses</span>
          <span className="text-navy font-bold text-sm block">{data.responseCount} Total Answers</span>
        </div>
      </div>

      <div className="p-5 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
        <h3 className="text-sm font-bold text-navy">Calculation & Weighting Parameters</h3>
        <p className="text-xs text-ink-soft leading-relaxed">
          Each platform was assigned equal weight (25% per platform) within the PULSE Benchmark Score calculation.
          12 buyer questions × 4 platforms × 3 runs = 144 total observed responses.
          Under PULSE Method v1.0, studies containing fewer than 50 unique prompts are classified as <strong>Indicative</strong> rather than definitive.
        </p>
      </div>
    </div>
  );
}
