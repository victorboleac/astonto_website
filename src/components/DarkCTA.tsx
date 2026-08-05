import React from "react";
import Link from "next/link";

export function DarkCTA({
  headline = "See how AI platforms recommend your company.",
  supportingText = "Book a 20-minute AI visibility check to review your current representation across ChatGPT, Perplexity, Gemini, and Google AI Overviews.",
  ctaText = "Book a 20-minute AI visibility check",
  ctaHref = "/contact?service=check",
}: {
  headline?: string;
  supportingText?: string;
  ctaText?: string;
  ctaHref?: string;
}) {
  return (
    <section className="relative bg-navy-deep text-white rounded-3xl p-10 sm:p-16 overflow-hidden my-16 shadow-2xl">
      {/* Subtle Background Mark */}
      <div className="absolute -right-12 -bottom-12 opacity-10 pointer-events-none" aria-hidden="true">
        <svg className="w-96 h-96" viewBox="0 0 32 32" fill="none">
          <path d="M16 7L7.5 23.5H12L16 15.5L20 23.5H24.5L16 7Z" fill="#12C6DF" />
        </svg>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          {headline}
        </h2>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl mx-auto">
          {supportingText}
        </p>
        <div className="pt-2">
          <Link
            href={ctaHref}
            className="inline-block px-8 py-4 rounded-xl bg-cyan hover:bg-cyan-deep text-navy-deep font-bold text-sm transition-all shadow-lg shadow-cyan/20"
          >
            {ctaText}
          </Link>
        </div>
      </div>
    </section>
  );
}
