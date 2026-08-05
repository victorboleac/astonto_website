import React from "react";
import { SectionLabel } from "@/components/SectionLabel";
import { DarkCTA } from "@/components/DarkCTA";
import { pricing as defaultPricing, formatPrice } from "@config/pricing";
import { fetchPricingFromSupabase } from "@lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "AI Visibility Monitoring (From £350 + VAT per month)",
  description: "Scheduled priority-prompt retesting, competitor movement checks, and Reputation Risk alerts following an audit or sprint.",
};

export default async function MonitoringServicePage() {
  const supabaseTiers = await fetchPricingFromSupabase();
  const dbMatch = supabaseTiers?.find((t: any) => t.id === "monitoring");

  const monitoringTier = {
    name: dbMatch?.name || defaultPricing.monitoring.name,
    priceFrom: dbMatch?.price ?? defaultPricing.monitoring.priceFrom,
    priceLabel: dbMatch?.price_label || defaultPricing.monitoring.priceLabel,
    billingLabel: dbMatch?.billing_label || defaultPricing.monitoring.billingLabel,
    positioning: dbMatch?.best_fit || defaultPricing.monitoring.positioning,
    description: dbMatch?.description || defaultPricing.monitoring.description,
    included: dbMatch?.included || defaultPricing.monitoring.included,
    ctaText: dbMatch?.cta_text || defaultPricing.monitoring.ctaText,
    ctaHref: dbMatch?.cta_href || defaultPricing.monitoring.ctaHref,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Optional Continuation Service</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">{monitoringTier.name}</h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          {monitoringTier.description}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1 font-mono text-xs">
          <div className="text-cyan-deep font-bold text-base">
            Fee: {monitoringTier.priceLabel || formatPrice(monitoringTier.priceFrom, "From")}
          </div>
          <div className="text-muted">{monitoringTier.positioning}</div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-navy">What Is Included</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          {monitoringTier.included.map((item: string, i: number) => (
            <div key={i} className="p-4 rounded-xl bg-surface-soft border border-line text-navy flex items-center space-x-2">
              <span className="text-cyan-deep font-bold">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <DarkCTA
        headline="Enquire about Monitoring."
        supportingText="Maintain visibility tracking, competitor checks, and sentiment alerts following an audit or sprint."
        ctaText={monitoringTier.ctaText}
        ctaHref={monitoringTier.ctaHref}
      />
    </div>
  );
}
