import React from "react";
import { BenchmarkCompany } from "@/data/research/managed-it-greater-manchester-2026";

interface ShareOfVoiceChartProps {
  companies: BenchmarkCompany[];
}

export function ShareOfVoiceChart({ companies }: ShareOfVoiceChartProps) {
  // Sort descending by share of voice
  const sorted = [...companies].sort(
    (a, b) => parseFloat(b.pulseShareOfVoice) - parseFloat(a.pulseShareOfVoice)
  );

  const colors = [
    "bg-navy",
    "bg-cyan-deep",
    "bg-cyan",
    "bg-slate-400",
    "bg-slate-300",
  ];

  return (
    <div className="space-y-6 p-6 rounded-2xl bg-surface border border-line shadow-sm">
      <div>
        <h3 className="text-base font-bold text-navy">PULSE Share of Voice Breakdown</h3>
        <p className="text-xs text-ink-soft leading-relaxed mt-1">
          Proportion of total measured PULSE points <strong>within this specific five-company set only</strong>. It does not represent total market share or overall brand awareness.
        </p>
      </div>

      {/* Segmented Horizontal Bar */}
      <div className="w-full h-8 rounded-lg overflow-hidden border border-line flex" role="img" aria-label="PULSE Share of Voice segmented bar chart">
        {sorted.map((company, idx) => {
          const pct = parseFloat(company.pulseShareOfVoice);
          return (
            <div
              key={company.name}
              className={`${colors[idx % colors.length]} h-full transition-all`}
              style={{ width: `${pct}%` }}
              title={`${company.name}: ${company.pulseShareOfVoice}`}
            />
          );
        })}
      </div>

      {/* Legend & Table */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
        {sorted.map((company, idx) => (
          <div key={company.name} className="p-3 rounded-xl bg-surface-soft border border-line flex flex-col justify-between">
            <div className="flex items-center space-x-2">
              <span className={`w-3 h-3 rounded-full ${colors[idx % colors.length]}`} />
              <span className="text-xs font-bold text-navy truncate">{company.name}</span>
            </div>
            <div className="mt-2 text-right">
              <span className="text-sm font-mono font-bold text-cyan-deep">{company.pulseShareOfVoice}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
