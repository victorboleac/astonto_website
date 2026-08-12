import React from "react";
import { BenchmarkCompany } from "@/data/research/managed-it-greater-manchester-2026";

interface HorizontalScoreChartProps {
  companies: BenchmarkCompany[];
}

export function HorizontalScoreChart({ companies }: HorizontalScoreChartProps) {
  const maxScore = Math.max(...companies.map((c) => c.pulseBenchmark), 40);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end border-b border-line pb-3">
        <div>
          <h3 className="text-sm font-bold text-navy">Visual Ranking — PULSE Benchmark Score</h3>
          <p className="text-xs text-muted">Indicative 5-company comparison set (0 – 100 scale)</p>
        </div>
        <span className="text-[11px] font-mono font-semibold text-amber-700 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          Reliability: Indicative
        </span>
      </div>

      <div className="space-y-4" role="region" aria-label="Visual Ranking Bar Chart">
        {companies.map((company) => {
          const widthPct = Math.max((company.pulseBenchmark / maxScore) * 100, 2);
          const isHighest = company.pulseBenchmark === maxScore;

          return (
            <div key={company.name} className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-navy">
                <span className="truncate pr-2 font-mono">{company.name}</span>
                <span className="font-mono text-cyan-deep font-bold">{company.pulseBenchmark.toFixed(2)}</span>
              </div>

              <div className="w-full bg-surface-soft h-6 rounded-md overflow-hidden border border-line relative flex items-center">
                <div
                  className={`h-full transition-all duration-500 ${
                    isHighest ? "bg-navy" : "bg-cyan-deep"
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
                <span className="absolute right-2 text-[11px] font-mono text-muted">
                  Appearance: {company.appearanceRate}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Accessible Table Equivalent for Screen Readers */}
      <div className="sr-only">
        <h4>Text equivalent for Visual Ranking Bar Chart</h4>
        <table>
          <thead>
            <tr>
              <th>Provider</th>
              <th>PULSE Benchmark Score</th>
              <th>Appearance Rate</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c.name}>
                <td>{c.name}</td>
                <td>{c.pulseBenchmark.toFixed(2)}</td>
                <td>{c.appearanceRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
