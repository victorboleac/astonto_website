import React from "react";
import Link from "next/link";
import { AbstractVisual } from "@/components/AbstractVisual";
import { ResearchIndex } from "@/components/ResearchIndex";
import { EvidencePanel } from "@/components/EvidencePanel";
import { DarkCTA } from "@/components/DarkCTA";
import { SectionLabel } from "@/components/SectionLabel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { faqItems as defaultFaqItems } from "@content/faqData";
import { pricing as defaultPricing, formatPrice } from "@config/pricing";
import { fetchFaqsFromSupabase, fetchPricingFromSupabase } from "@lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const supabaseFaqs = await fetchFaqsFromSupabase();
  const faqItems = supabaseFaqs && supabaseFaqs.length > 0
    ? supabaseFaqs.map((f: any) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
      }))
    : defaultFaqItems;
  const previewFaqs = faqItems.slice(0, 6);

  const supabaseTiers = await fetchPricingFromSupabase();
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
      highlighted: match.highlighted ?? fallback.highlighted ?? false,
    };
  };

  const checkOffer = getTier("check", defaultPricing.check);
  const auditOffer = getTier("audit", defaultPricing.audit);
  const sprintOffer = getTier("sprint", defaultPricing.sprint);
  const monitoringOffer = getTier("monitoring", defaultPricing.monitoring);

  const researchIndexItems = [
    {
      number: "01",
      title: "Information Interpretation",
      description: "How models parse complex buyer queries, implicit intent, and structured entity attributes.",
    },
    {
      number: "02",
      title: "Source Selection",
      description: "Which third-party web domains, trade media, and directories are retrieved, cited, and trusted.",
    },
    {
      number: "03",
      title: "Recommendation Behaviour",
      description: "How corporate alternatives are compared, ranked, and endorsed across buyer evaluation scenarios.",
    },
    {
      number: "04",
      title: "Variation Over Time",
      description: "Observing changes in output consistency across platforms, IP geolocations, languages, and model updates.",
    },
  ];

  return (
    <div className="space-y-24 py-12 sm:py-20">
      {/* 1. Hero Section — Editorial 2-Column */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <SectionLabel>INDEPENDENT AI RESEARCH</SectionLabel>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-navy leading-[1.1] tracking-tight">
              We study how AI systems interpret, source and recommend.
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed max-w-2xl">
              ASTONTO investigates the observable behaviour of large language models and applies that research through AnswerSignal, our AI Search Visibility product.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Link
                href="/contact?service=check"
                className="px-6 py-3.5 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-sm text-center transition-all shadow-sm"
              >
                {checkOffer.ctaText}
              </Link>
              <Link
                href="/answer-signal"
                className="px-6 py-3.5 rounded-lg bg-surface hover:bg-surface-soft text-navy border border-line text-sm font-semibold text-center transition-all"
              >
                Explore AnswerSignal
              </Link>
            </div>
            <div className="pt-2 text-xs font-mono text-muted flex items-center space-x-4">
              <span>Framework: PULSE v1.0</span>
              <span>•</span>
              <span>Controlled Black-Box Testing</span>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AbstractVisual />
          </div>
        </div>
      </section>

      {/* 2. Numbered Editorial Research Index */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="space-y-2">
          <SectionLabel>Research Scope</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-bold text-navy">Four Primary Observational Dimensions</h2>
        </div>
        <ResearchIndex items={researchIndexItems} />
      </section>

      {/* 3. AnswerSignal Product Introduction & Offers */}
      <section className="bg-surface-tint border-y border-line py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-3xl space-y-4">
            <SectionLabel>Applied Commercial Service</SectionLabel>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-navy">Be the business AI recommends.</h2>
            <p className="text-base text-ink-soft leading-relaxed">
              AnswerSignal measures how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your company versus four selected competitors—and builds an evidence-based plan to improve your AI Search Visibility.
            </p>
            <div className="p-4 rounded-xl bg-surface border border-line text-xs text-muted font-mono">
              <strong className="text-navy font-bold">Methodology Notice:</strong> The PULSE Score reflects observed performance during the documented testing period. AI-generated answers change, and future visibility cannot be guaranteed.
            </div>
          </div>

          {/* 3 Offers Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* 24-Hour Audit (Entry Offer) */}
            <div className="lg:col-span-6 p-8 rounded-2xl bg-surface border-2 border-cyan-deep shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded bg-cyan-soft text-cyan-deep inline-block">
                  Entry Audit Offer
                </span>
                <h3 className="text-2xl font-bold text-navy">{auditOffer.name}</h3>
                <div className="text-xl font-bold font-mono text-cyan-deep">
                  {auditOffer.priceLabel || formatPrice(auditOffer.price)}
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  {auditOffer.description}
                </p>
                <ul className="text-xs text-ink-soft space-y-1.5 pt-2">
                  {auditOffer.included.slice(0, 5).map((item: string, i: number) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="text-cyan-deep font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-3 rounded-lg bg-surface-tint border border-cyan/20 text-xs text-navy">
                  {auditOffer.creditPolicy}
                </div>
              </div>

              <div>
                <Link
                  href="/services/ai-visibility-audit"
                  className="block text-center w-full py-3.5 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-xs transition-all shadow-sm"
                >
                  {auditOffer.ctaText} →
                </Link>
              </div>
            </div>

            {/* Sprint & Monitoring Secondary Rows */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-6">
              <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-surface-soft text-navy">
                  90-Day Sprint
                </span>
                <h3 className="text-lg font-bold text-navy">{sprintOffer.name}</h3>
                <div className="text-sm font-mono text-cyan-deep font-bold">
                  {sprintOffer.priceLabel || formatPrice(sprintOffer.price)} ({sprintOffer.monthlyOption})
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  {sprintOffer.description}
                </p>
                <Link href="/services/90-day-optimisation-sprint" className="inline-block text-xs font-bold text-cyan-deep hover:underline pt-1">
                  {sprintOffer.ctaText} →
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2 py-0.5 rounded bg-surface-soft text-navy">
                  Monthly Tracking
                </span>
                <h3 className="text-lg font-bold text-navy">{monitoringOffer.name}</h3>
                <div className="text-sm font-mono text-cyan-deep font-bold">
                  {monitoringOffer.priceLabel || formatPrice(monitoringOffer.priceFrom, "From")}
                </div>
                <p className="text-xs text-ink-soft leading-relaxed">
                  {monitoringOffer.description}
                </p>
                <Link href="/services/monitoring" className="inline-block text-xs font-bold text-cyan-deep hover:underline pt-1">
                  {monitoringOffer.ctaText} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Evidence Standards & Audit Record Panel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <EvidencePanel />
      </section>

      {/* 5. Frequently Asked Questions Preview */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <SectionLabel>FAQ Preview</SectionLabel>
          <h2 className="text-3xl font-bold text-navy">Frequently Asked Questions</h2>
        </div>
        <FAQAccordion items={previewFaqs} />
        <div className="text-center pt-4">
          <Link
            href="/faq"
            className="inline-block px-6 py-3 rounded-lg bg-surface hover:bg-surface-soft text-navy border border-line font-bold text-xs"
          >
            View All {faqItems.length} FAQs →
          </Link>
        </div>
      </section>

      {/* 6. Primary Dark CTA Banner */}
      <DarkCTA
        headline="See how AI recommendations evaluate your business."
        supportingText="Book a 20-Minute AI Visibility Check or full 24-Hour Audit for your company."
        ctaText={auditOffer.ctaText}
        ctaHref={auditOffer.ctaHref}
      />
    </div>
  );
}
