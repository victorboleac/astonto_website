import type { Metadata } from "next";
import { PricingCard } from "@/components/PricingCard";
import { SectionLabel } from "@/components/SectionLabel";
import { pricing as defaultPricing } from "@config/pricing";
import { fetchPricingFromSupabase } from "@lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "Services & Pricing Overview",
  description:
    "Official public pricing for 20-Minute Check (Free), 24-Hour Audit (£950+VAT), 90-Day Sprint (£6,000+VAT), and Monitoring (From £350/mo+VAT).",
  alternates: {
    canonical: "/pricing",
  },
  openGraph: {
    title: "Services & Pricing Overview",
    description:
      "Official public pricing for 20-Minute Check (Free), 24-Hour Audit (£950+VAT), 90-Day Sprint (£6,000+VAT), and Monitoring (From £350/mo+VAT).",
    url: "/pricing",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Services & Pricing Overview",
    description:
      "Official public pricing for 20-Minute Check (Free), 24-Hour Audit (£950+VAT), 90-Day Sprint (£6,000+VAT), and Monitoring (From £350/mo+VAT).",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function PricingPage() {
  const supabaseTiers = await fetchPricingFromSupabase();

  // If Supabase tiers exist, map tier by id, otherwise fallback to local config
  const getTier = (id: string, fallback: any) => {
    if (!supabaseTiers || supabaseTiers.length === 0) return fallback;
    const match = supabaseTiers.find((t: any) => t.id === id);
    if (!match) return fallback;
    return {
      name: match.name || fallback.name,
      price: match.price ?? fallback.price,
      pricePrefix: match.price_prefix || fallback.pricePrefix,
      priceLabel: match.price_label || fallback.priceLabel,
      monthlyOption: match.monthly_option || fallback.monthlyOption,
      billingLabel: match.billing_label || fallback.billingLabel,
      bestFit: match.best_fit || fallback.bestFit,
      description: match.description || fallback.description,
      included: match.included || fallback.included,
      creditPolicy: match.credit_policy || fallback.creditPolicy,
      disclaimer: match.disclaimer || fallback.disclaimer,
      commercialTerms: match.commercial_terms || fallback.commercialTerms || [],
      scopeBoundaries: match.scope_boundaries || fallback.scopeBoundaries || { included: [], quotedSeparately: [] },
      ctaText: match.cta_text || fallback.ctaText,
      ctaHref: match.cta_href || fallback.ctaHref,
      highlighted: match.highlighted ?? fallback.highlighted,
    };
  };

  const checkOffer = getTier("check", defaultPricing.check);
  const auditOffer = getTier("audit", defaultPricing.audit);
  const sprintOffer = getTier("sprint", defaultPricing.sprint);
  const monitoringOffer = getTier("monitoring", defaultPricing.monitoring);

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
          name={checkOffer.name}
          price={checkOffer.price}
          priceLabel={checkOffer.priceLabel}
          billingLabel={checkOffer.billingLabel || "Free entry check"}
          bestFit={checkOffer.bestFit || "UK & EU SMEs evaluating AI visibility"}
          scopeSummary={checkOffer.description}
          deliverables={checkOffer.included}
          ctaText={checkOffer.ctaText}
          ctaHref={checkOffer.ctaHref}
          highlighted={checkOffer.highlighted ?? false}
        />

        {/* Offer 2: 24-Hour Audit */}
        <PricingCard
          name={auditOffer.name}
          price={auditOffer.price}
          priceLabel={auditOffer.priceLabel}
          billingLabel={auditOffer.billingLabel}
          bestFit={auditOffer.bestFit || "Organisations requiring multi-platform baseline evidence"}
          scopeSummary={auditOffer.description}
          deliverables={auditOffer.included}
          creditPolicy={auditOffer.creditPolicy}
          disclaimer={auditOffer.disclaimer}
          turnaround="24 Hours after info provided"
          ctaText={auditOffer.ctaText}
          ctaHref={auditOffer.ctaHref}
          highlighted={auditOffer.highlighted ?? false}
        />

        {/* Offer 3: 90-Day Sprint (Primary Offer) */}
        <PricingCard
          name={sprintOffer.name}
          price={sprintOffer.price}
          priceLabel={sprintOffer.priceLabel}
          monthlyOption={sprintOffer.monthlyOption}
          billingLabel={sprintOffer.billingLabel}
          bestFit={sprintOffer.bestFit || "Organisations turning audit findings into active visibility"}
          scopeSummary={sprintOffer.description}
          deliverables={sprintOffer.included}
          disclaimer={sprintOffer.disclaimer}
          turnaround="90 Days structured execution"
          ctaText={sprintOffer.ctaText}
          ctaHref={sprintOffer.ctaHref}
          highlighted={sprintOffer.highlighted ?? true}
        />

        {/* Offer 4: Monitoring (Optional Continuation) */}
        <PricingCard
          name={monitoringOffer.name}
          price={monitoringOffer.price}
          pricePrefix={monitoringOffer.pricePrefix || "From"}
          priceLabel={monitoringOffer.priceLabel}
          billingLabel={monitoringOffer.billingLabel}
          bestFit={monitoringOffer.bestFit || defaultPricing.monitoring.positioning}
          scopeSummary={monitoringOffer.description}
          deliverables={monitoringOffer.included}
          turnaround="Ongoing Monthly"
          ctaText={monitoringOffer.ctaText}
          ctaHref={monitoringOffer.ctaHref}
          highlighted={monitoringOffer.highlighted ?? false}
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
              Included in the {sprintOffer.priceLabel || "Sprint"} Scope:
            </h3>
            <ul className="space-y-2">
              {(sprintOffer.scopeBoundaries?.included || []).map((item: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-cyan-deep font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-surface-soft border border-line space-y-3">
            <h3 className="text-sm font-bold text-navy font-mono uppercase tracking-wider">
              Quoted Separately / Out of Scope:
            </h3>
            <ul className="space-y-2">
              {(sprintOffer.scopeBoundaries?.quotedSeparately || []).map((item: string, idx: number) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-muted font-bold">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
