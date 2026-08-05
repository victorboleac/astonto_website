import React from "react";

export function PULSEDiagram() {
  return (
    <div className="bg-surface border border-line rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="text-center space-y-1">
        <span className="text-[11px] font-mono font-bold text-cyan-deep uppercase tracking-widest">
          Core Mathematical Formula
        </span>
        <h3 className="text-xl sm:text-2xl font-bold text-navy">PULSE Method v1.0 Specification</h3>
      </div>

      {/* Understated Formula Block */}
      <div className="p-4 sm:p-6 rounded-xl bg-surface-soft border border-line text-center font-mono text-xs sm:text-sm text-navy">
        <span className="font-bold text-cyan-deep">Prompt Result Score</span> = Position Factor × Recommendation Factor × Sentiment Factor
      </div>

      {/* Factors Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-canvas border border-line space-y-2">
          <div className="text-xs font-mono text-cyan-deep font-bold">1. Position Factor</div>
          <p className="text-xs text-ink-soft leading-relaxed">
            Evaluates presence and prominence rank order (e.g. 1st choice vs secondary mention).
          </p>
        </div>
        <div className="p-4 rounded-xl bg-canvas border border-line space-y-2">
          <div className="text-xs font-mono text-cyan-deep font-bold">2. Recommendation Factor</div>
          <p className="text-xs text-ink-soft leading-relaxed">
            Measures endorsement strength (Strong Recommendation, Neutral, Conditional, or Negative).
          </p>
        </div>
        <div className="p-4 rounded-xl bg-canvas border border-line space-y-2">
          <div className="text-xs font-mono text-cyan-deep font-bold">3. Sentiment Factor</div>
          <p className="text-xs text-ink-soft leading-relaxed">
            Assesses tonal sentiment, factual accuracy, and absence of hallucinated complaints.
          </p>
        </div>
      </div>

      {/* Reliability Ratings & Notice */}
      <div className="pt-4 border-t border-line flex flex-col sm:flex-row justify-between items-center text-xs text-muted gap-3">
        <div className="flex items-center space-x-2">
          <span className="font-semibold text-navy">Reliability Ratings:</span>
          <span className="px-2 py-0.5 rounded bg-success/10 border border-success/30 text-success font-mono text-[11px] font-bold">
            High
          </span>
          <span className="px-2 py-0.5 rounded bg-warning/10 border border-warning/30 text-warning font-mono text-[11px] font-bold">
            Medium
          </span>
          <span className="px-2 py-0.5 rounded bg-surface-soft border border-line text-muted font-mono text-[11px]">
            Indicative
          </span>
        </div>
      </div>

      <p className="text-[11px] font-mono text-muted text-center italic bg-surface-tint p-3 rounded border border-cyan/20">
        The PULSE Score reflects observed AI recommendation performance within a controlled prompt set and testing period. It does not measure every possible answer or guarantee future visibility.
      </p>
    </div>
  );
}
