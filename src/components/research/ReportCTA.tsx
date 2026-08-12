import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ReportCTA() {
  return (
    <div className="p-8 sm:p-12 rounded-3xl bg-navy text-white shadow-xl relative overflow-hidden space-y-6">
      <div className="max-w-2xl space-y-4">
        <span className="text-xs font-mono font-bold text-cyan uppercase tracking-wider">
          Managed IT Provider AI Visibility Audit
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
          Is your managed IT business visible for the questions buyers actually ask?
        </h2>
        <p className="text-sm text-cyan-soft leading-relaxed">
          ASTONTO can test your company against four selected competitors using commercially relevant buyer questions across ChatGPT, Perplexity, Gemini, and Google AI Overviews.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        <Link
          href="/contact?service=check"
          className="inline-flex justify-center items-center space-x-2 px-6 py-3.5 rounded-xl bg-cyan text-navy font-extrabold text-xs transition-all hover:bg-white shadow-md"
        >
          <span>Book a 20-minute AI visibility check</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link
          href="/services/ai-visibility-audit"
          className="inline-flex justify-center items-center space-x-2 px-6 py-3.5 rounded-xl bg-navy-deep border border-line-strong text-white font-bold text-xs hover:bg-surface/10 transition-all"
        >
          <span>See the 24-Hour AI Visibility Audit</span>
        </Link>
      </div>
    </div>
  );
}
