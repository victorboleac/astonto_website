import type { Metadata } from "next";
import { SectionLabel } from "@/components/SectionLabel";
import { DarkCTA } from "@/components/DarkCTA";
import { pricing as defaultPricing, formatPrice } from "@config/pricing";
import { fetchPricingFromSupabase } from "@lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  title: "24-Hour AI Visibility Audit (£950 + VAT)",
  description: "Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business compared with four competitors.",
  alternates: {
    canonical: "/services/ai-visibility-audit",
  },
  openGraph: {
    title: "24-Hour AI Visibility Audit (£950 + VAT)",
    description: "Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business compared with four competitors.",
    url: "/services/ai-visibility-audit",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "24-Hour AI Visibility Audit (£950 + VAT)",
    description: "Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business compared with four competitors.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function AuditServicePage() {
  const supabaseTiers = await fetchPricingFromSupabase();
  const dbMatch = supabaseTiers?.find((t: any) => t.id === "audit");

  const auditTier = {
    name: dbMatch?.name || defaultPricing.audit.name,
    price: dbMatch?.price ?? defaultPricing.audit.price,
    priceLabel: dbMatch?.price_label || defaultPricing.audit.priceLabel,
    billingLabel: dbMatch?.billing_label || defaultPricing.audit.billingLabel,
    description: dbMatch?.description || defaultPricing.audit.description,
    included: dbMatch?.included || defaultPricing.audit.included,
    commercialTerms: dbMatch?.commercial_terms || defaultPricing.audit.commercialTerms || [],
    creditPolicy: dbMatch?.credit_policy || defaultPricing.audit.creditPolicy,
    disclaimer: dbMatch?.disclaimer || defaultPricing.audit.disclaimer,
    ctaText: dbMatch?.cta_text || defaultPricing.audit.ctaText,
    ctaHref: dbMatch?.cta_href || defaultPricing.audit.ctaHref,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Entry Audit Offer</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">{auditTier.name}</h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          {auditTier.description}
        </p>
        <div className="p-4 rounded-xl bg-surface border border-line shadow-sm inline-block font-mono text-cyan-deep font-bold text-sm">
          Fee: {auditTier.priceLabel || formatPrice(auditTier.price)} ({auditTier.billingLabel})
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">What Is Included</h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-ink-soft">
            {auditTier.included.map((item: string, idx: number) => (
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
            {auditTier.commercialTerms.map((term: string, idx: number) => (
              <li key={idx} className="flex items-start space-x-2">
                <span className="text-cyan-deep font-bold">•</span>
                <span>{term}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-surface-tint border border-cyan/20 text-xs text-navy space-y-2 font-mono">
        <p><strong className="text-cyan-deep font-bold">Credit Policy:</strong> {auditTier.creditPolicy}</p>
        <p className="text-muted italic">{auditTier.disclaimer}</p>
      </div>

      <DarkCTA
        headline="Book your AI Visibility Audit."
        supportingText="Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business vs four competitors."
        ctaText={auditTier.ctaText}
        ctaHref={auditTier.ctaHref}
      />
    </div>
  );
}
