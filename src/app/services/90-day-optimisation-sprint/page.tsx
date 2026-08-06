import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { DarkCTA } from "@/components/DarkCTA";
import { pricing as defaultPricing, formatPrice } from "@config/pricing";
import { fetchPricingFromSupabase } from "@lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "90-Day AI Visibility Optimisation Sprint (£6,000 + VAT)",
  description: "Turn audit findings into a coordinated programme of technical, content, authority and monitoring improvements.",
  alternates: {
    canonical: "/services/90-day-optimisation-sprint",
  },
  openGraph: {
    title: "90-Day AI Visibility Optimisation Sprint (£6,000 + VAT)",
    description: "Turn audit findings into a coordinated programme of technical, content, authority and monitoring improvements.",
    url: "/services/90-day-optimisation-sprint",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "90-Day AI Visibility Optimisation Sprint (£6,000 + VAT)",
    description: "Turn audit findings into a coordinated programme of technical, content, authority and monitoring improvements.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function SprintServicePage() {
  const supabaseTiers = await fetchPricingFromSupabase();
  const dbMatch = supabaseTiers?.find((t: any) => t.id === "sprint");

  const sprintTier = {
    name: dbMatch?.name || defaultPricing.sprint.name,
    price: dbMatch?.price ?? defaultPricing.sprint.price,
    priceLabel: dbMatch?.price_label || defaultPricing.sprint.priceLabel,
    monthlyOption: dbMatch?.monthly_option || defaultPricing.sprint.monthlyOption,
    billingLabel: dbMatch?.billing_label || defaultPricing.sprint.billingLabel,
    description: dbMatch?.description || defaultPricing.sprint.description,
    included: dbMatch?.included || defaultPricing.sprint.included,
    disclaimer: dbMatch?.disclaimer || defaultPricing.sprint.disclaimer,
    commercialTerms: dbMatch?.commercial_terms || defaultPricing.sprint.commercialTerms || [],
    scopeBoundaries: dbMatch?.scope_boundaries || defaultPricing.sprint.scopeBoundaries || { included: [], quotedSeparately: [] },
    ctaText: dbMatch?.cta_text || defaultPricing.sprint.ctaText,
    ctaHref: dbMatch?.cta_href || defaultPricing.sprint.ctaHref,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Main Optimisation Offer</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          {sprintTier.name}
        </h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          {sprintTier.description}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm space-y-1 font-mono">
          <div className="text-cyan-deep font-bold text-base">
            Fee: {sprintTier.priceLabel || formatPrice(sprintTier.price)} ({sprintTier.monthlyOption})
          </div>
          <div className="text-xs text-muted">Billing label: {sprintTier.billingLabel}</div>
        </div>
      </div>

      {/* What is Included */}
      <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6">
        <h2 className="text-2xl font-bold text-navy">What Is Included</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-ink-soft font-mono">
          {sprintTier.included.map((item: string, idx: number) => (
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
            Included in the Scope:
          </h3>
          <ul className="space-y-2">
            {(sprintTier.scopeBoundaries?.included || []).map((item: string, idx: number) => (
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
            {(sprintTier.scopeBoundaries?.quotedSeparately || []).map((item: string, idx: number) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-muted font-bold">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-soft border border-line text-xs font-mono text-muted">
        <strong className="text-navy">Sprint Agreement Note:</strong> {sprintTier.disclaimer}
      </div>

      <DarkCTA
        headline="Discuss a 90-Day Sprint."
        supportingText="Turn audit findings into a coordinated programme of technical, content, authority and monitoring improvements."
        ctaText={sprintTier.ctaText}
        ctaHref={sprintTier.ctaHref}
      />
    </div>
  );
}
