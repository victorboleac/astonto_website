import React from "react";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { DarkCTA } from "@/components/DarkCTA";
import { pricing, formatPrice } from "@config/pricing";

export const metadata = {
  title: "90-Day AI Visibility Optimisation Sprint (£6,000 + VAT)",
  description: "Turn audit findings into a coordinated programme of technical, content, authority and monitoring improvements.",
};

export default function SprintServicePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Main Optimisation Offer</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          90-Day AI Visibility Optimisation Sprint
        </h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          {pricing.sprint.description}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1 font-mono">
          <div className="text-cyan-deep font-bold text-base">
            Fee: {formatPrice(pricing.sprint.price)} ({pricing.sprint.monthlyOption})
          </div>
          <div className="text-xs text-muted">Billing label: {pricing.sprint.billingLabel}</div>
        </div>
      </div>

      {/* What is Included */}
      <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-navy">What Is Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-ink-soft font-mono">
          {pricing.sprint.included.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-surface-soft border border-line flex items-center space-x-2">
              <span className="text-cyan-deep font-bold">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scope Boundaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3 text-xs text-ink-soft">
          <h3 className="text-sm font-bold text-navy font-mono uppercase tracking-wider">
            Included in the £6,000 Scope:
          </h3>
          <ul className="space-y-2">
            {pricing.sprint.scopeBoundaries.included.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-cyan-deep font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3 text-xs text-ink-soft">
          <h3 className="text-sm font-bold text-navy font-mono uppercase tracking-wider">
            Quoted Separately:
          </h3>
          <ul className="space-y-2">
            {pricing.sprint.scopeBoundaries.quotedSeparately.map((item, idx) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-muted font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-soft border border-line text-xs font-mono text-muted">
        <strong className="text-navy">Sprint Agreement Note:</strong> {pricing.sprint.disclaimer}
      </div>

      <DarkCTA
        headline="Discuss a 90-Day Sprint."
        supportingText="Turn audit findings into a coordinated programme of technical, content, authority and monitoring improvements."
        ctaText={pricing.sprint.ctaText}
        ctaHref={pricing.sprint.ctaHref}
      />
    </div>
  );
}
