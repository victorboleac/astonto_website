"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Copy, Check } from "lucide-react";

interface CitationBoxProps {
  citation: string;
}

export function CitationBox({ citation }: CitationBoxProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(citation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
      <div className="flex justify-between items-center border-b border-line pb-3">
        <h3 className="text-xs font-mono font-bold text-navy uppercase tracking-wider">
          Cite this research
        </h3>
        <Link
          href="/pulse-method"
          className="text-xs font-mono text-cyan-deep hover:underline font-semibold"
        >
          Research Methodology Specification →
        </Link>
      </div>

      <div className="p-4 rounded-xl bg-surface-soft border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <p className="text-xs font-mono text-navy leading-relaxed select-all">
          {citation}
        </p>

        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg bg-navy hover:bg-navy-deep text-white text-xs font-mono font-bold transition-all shadow-sm flex-shrink-0"
          aria-label="Copy citation to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-cyan" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Citation</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
