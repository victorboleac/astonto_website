import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { DarkCTA } from "@/components/DarkCTA";
import { pricing, formatPrice } from "@config/pricing";

export const metadata = {
  title: "24-Hour AI Visibility Audit (£950 + VAT)",
  description: "Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business compared with four competitors.",
};

export default function AuditServicePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Entry Audit Offer</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">24-Hour AI Visibility Audit</h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          {pricing.audit.description}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm inline-block font-mono text-cyan-deep font-bold text-sm">
          Fee: {formatPrice(pricing.audit.price)} ({pricing.audit.billingLabel})
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">What Is Included</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
            {pricing.audit.included.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-cyan-deep font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">Audit Commercial Terms</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
            {pricing.audit.commercialTerms.map((term, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-cyan-deep font-bold">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-tint border border-cyan/20 text-xs text-navy space-y-2 font-mono">
        <p><strong className="text-cyan-deep font-bold">Credit Policy:</strong> {pricing.audit.creditPolicy}</p>
        <p className="text-muted italic">{pricing.audit.disclaimer}</p>
      </div>

      <DarkCTA
        headline="Book your AI Visibility Audit."
        supportingText="Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business vs four competitors."
        ctaText={pricing.audit.ctaText}
        ctaHref={pricing.audit.ctaHref}
      />
    </div>
  );
}
