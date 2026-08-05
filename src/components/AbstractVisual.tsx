import React from "react";

export function AbstractVisual() {
  return (
    <figure className="w-full max-w-md mx-auto rounded-2xl bg-surface border border-line p-6 shadow-sm space-y-4">
      {/* Visual Diagram Title & Figure Number */}
      <div className="flex items-center justify-between border-b border-line pb-3 text-xs font-mono">
        <span className="font-bold text-navy uppercase tracking-wider">Fig 1.1 — Observation Field</span>
        <span className="text-cyan-deep font-semibold">PULSE v1.0</span>
      </div>

      {/* SVG Diagram: Input Lines converging to Output */}
      <div className="relative py-4 flex flex-col items-center justify-center">
        <svg className="w-full h-44 text-navy" viewBox="0 0 320 160" fill="none">
          {/* Grid lines */}
          <line x1="0" y1="20" x2="320" y2="20" stroke="#E9F8FB" strokeWidth="1" />
          <line x1="0" y1="80" x2="320" y2="80" stroke="#E9F8FB" strokeWidth="1" />
          <line x1="0" y1="140" x2="320" y2="140" stroke="#E9F8FB" strokeWidth="1" />

          {/* Input paths converging */}
          <path d="M 40 20 C 40 70, 160 70, 160 110" stroke="#687987" strokeWidth="1.5" strokeDasharray="3 3" />
          <path d="M 120 20 C 120 70, 160 70, 160 110" stroke="#0B1F33" strokeWidth="1.5" />
          <path d="M 200 20 C 200 70, 160 70, 160 110" stroke="#0B1F33" strokeWidth="1.5" />
          <path d="M 280 20 C 280 70, 160 70, 160 110" stroke="#687987" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Convergence Node (Inverted V Mark) */}
          <path d="M 160 95 L 148 125 H 154 L 160 110 L 166 125 H 172 L 160 95 Z" fill="#12C6DF" />

          {/* Selected Output Line */}
          <line x1="160" y1="125" x2="160" y2="155" stroke="#069BB4" strokeWidth="2" />
        </svg>

        {/* Input Labels Overlay */}
        <div className="w-full grid grid-cols-4 text-center text-[10px] font-mono text-muted pt-1">
          <div>SOURCE</div>
          <div>ENTITY</div>
          <div>COMPARISON</div>
          <div>CONTEXT</div>
        </div>
      </div>

      {/* Caption & Evaluated Output Box */}
      <figcaption className="pt-2 border-t border-line text-[11px] text-ink-soft space-y-1.5 font-mono">
        <div className="flex justify-between items-center text-navy font-bold">
          <span>Evaluated Output Signal</span>
          <span className="text-cyan-deep text-[10px]">Reliability: High</span>
        </div>
        <p className="font-sans text-xs text-ink leading-normal bg-surface-soft p-2.5 rounded border border-line">
          "Entity A cited in position #1 as primary recommended vendor across 5 repeated test iterations."
        </p>
      </figcaption>
    </figure>
  );
}
