import React from "react";
import { PricingCard } from "@/components/PricingCard";
import { SectionLabel } from "@/components/SectionLabel";
import { pricing } from "@config/pricing";
import Link from "next/link";

export const metadata = {
  title: "Services & Pricing Overview — ASTONTO & AnswerSignal",
  description: "Official public pricing for 20-Minute Check (Free), 24-Hour Audit (£950+VAT), 90-Day Sprint (£6,000+VAT), and Monitoring (From £350/mo+VAT).",
};

export default function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Public Commercial Pricing</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">Services & Pricing Overview</h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Transparent, evidence-led AI Search Visibility services for UK and EU organisations.
        </p>
      </div>

      {/* 4 Commercial Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Offer 1: Free Check */}
        <PricingCard
          name={pricing.check.name}
          price={pricing.check.price}
          billingLabel="Free entry check"
          bestFit="UK & EU SMEs evaluating AI visibility"
          scopeSummary={pricing.check.description}
          deliverables={pricing.check.included}
          ctaText={pricing.check.ctaText}
          ctaHref={pricing.check.ctaHref}
        />

        {/* Offer 2: 24-Hour Audit */}
        <PricingCard
          name={pricing.audit.name}
          price={pricing.audit.price}
          billingLabel={pricing.audit.billingLabel}
          bestFit="Organisations requiring multi-platform baseline evidence"
          scopeSummary={pricing.audit.description}
          deliverables={pricing.audit.included}
          creditPolicy={pricing.audit.creditPolicy}
          disclaimer={pricing.audit.disclaimer}
          turnaround="24 Hours after info provided"
          ctaText={pricing.audit.ctaText}
          ctaHref={pricing.audit.ctaHref}
        />

        {/* Offer 3: 90-Day Sprint (Primary Offer) */}
        <PricingCard
          name={pricing.sprint.name}
          price={pricing.sprint.price}
          monthlyOption={pricing.sprint.monthlyOption}
          billingLabel={pricing.sprint.billingLabel}
          bestFit="Organisations turning audit findings into active visibility"
          scopeSummary={pricing.sprint.description}
          deliverables={pricing.sprint.included}
          disclaimer={pricing.sprint.disclaimer}
          turnaround="90 Days structured execution"
          ctaText={pricing.sprint.ctaText}
          ctaHref={pricing.sprint.ctaHref}
          highlighted
        />

        {/* Offer 4: Monitoring (Optional Continuation) */}
        <PricingCard
          name={pricing.monitoring.name}
          price={pricing.monitoring.priceFrom}
          pricePrefix="From"
          billingLabel={pricing.monitoring.billingLabel}
          bestFit={pricing.monitoring.positioning}
          scopeSummary={pricing.monitoring.description}
          deliverables={pricing.monitoring.included}
          turnaround="Ongoing Monthly"
          ctaText={pricing.monitoring.ctaText}
          ctaHref={pricing.monitoring.ctaHref}
        />
      </div>

      {/* Scope Boundaries Section */}
      <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6">
        <div className="space-y-2">
          <SectionLabel>Scope Boundaries</SectionLabel>
          <h2 className="text-2xl font-bold text-navy">What the £6,000 + VAT Sprint Price Covers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-ink-soft">
          <div className="p-6 rounded-2xl bg-surface-soft border border-line space-y-3">
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

          <div className="p-6 rounded-2xl bg-surface-soft border border-line space-y-3">
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
      </div>

      {/* Commercial Terms Section */}
      <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6">
        <div className="space-y-2">
          <SectionLabel>Commercial Terms</SectionLabel>
          <h2 className="text-2xl font-bold text-navy">Payment & Service Terms</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs text-ink-soft">
          <div className="p-6 rounded-2xl bg-surface-tint border border-cyan/20 space-y-3">
            <h3 className="text-sm font-bold text-navy font-mono">
              Audit Commercial Terms
            </h3>
            <ul className="space-y-2">
              {pricing.audit.commercialTerms.map((term, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-cyan-deep font-bold">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-surface-tint border border-cyan/20 space-y-3">
            <h3 className="text-sm font-bold text-navy font-mono">
              Sprint Commercial Terms
            </h3>
            <ul className="space-y-2">
              {pricing.sprint.commercialTerms.map((term, i) => (
                <li key={i} className="flex items-start space-x-2">
                  <span className="text-cyan-deep font-bold">•</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Final Outcome Disclaimer */}
      <div className="p-4 rounded-xl bg-surface-soft border border-line text-xs font-mono text-muted text-center">
        <strong className="text-navy">Outcome Disclaimer:</strong> The PULSE Score reflects observed performance during the documented testing period. AI-generated answers change, and future visibility cannot be guaranteed.
      </div>
    </div>
  );
}
