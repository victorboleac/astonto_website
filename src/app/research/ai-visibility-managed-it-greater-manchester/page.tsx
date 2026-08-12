import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { reportData } from "@/data/research/managed-it-greater-manchester-2026";
import { SectionLabel } from "@/components/SectionLabel";
import { ResearchCaveat } from "@/components/research/ResearchCaveat";
import { HorizontalScoreChart } from "@/components/research/HorizontalScoreChart";
import { ShareOfVoiceChart } from "@/components/research/ShareOfVoiceChart";
import { PlatformComparison } from "@/components/research/PlatformComparison";
import { MethodologyGrid } from "@/components/research/MethodologyGrid";
import { CitationBox } from "@/components/research/CitationBox";
import { ReportCTA } from "@/components/research/ReportCTA";
import {
  getReportSchema,
  getDatasetSchema,
  getFAQSchema,
  getBreadcrumbSchema,
} from "@lib/schema";

export const metadata: Metadata = {
  title: reportData.metaTitle,
  description: reportData.metaDescription,
  alternates: {
    canonical: `/research/${reportData.slug}`,
  },
  openGraph: {
    title: reportData.ogTitle,
    description: reportData.ogDescription,
    url: `/research/${reportData.slug}`,
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: reportData.ogTitle,
    description: reportData.ogDescription,
  },
  // PUBLICATION GATE CONTROL
  robots: reportData.publicationStatus === "draft"
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function ManagedITResearchReportPage() {
  const reportSchema = getReportSchema({
    title: reportData.title,
    description: reportData.metaDescription,
    url: `/research/${reportData.slug}`,
    publishedAt: reportData.publishedAt,
    modifiedAt: reportData.modifiedAt,
    author: reportData.author,
    spatialCoverage: reportData.location,
    inLanguage: reportData.language,
  });

  const datasetSchema = getDatasetSchema({
    name: `ASTONTO Managed IT Greater Manchester AI Visibility Study 2026`,
    description: `144 observed AI responses generated from 12 commercially relevant managed IT buyer questions across four AI platforms and three repeated runs.`,
    creator: reportData.author,
    temporalCoverage: "2026-07-31/2026-08-01",
    spatialCoverage: reportData.location,
    variableMeasured: ["PULSE Score", "Appearance Rate", "Platform Score", "PULSE Share of Voice"],
    measurementTechnique: reportData.methodologyVersion,
  });

  const faqSchema = getFAQSchema(reportData.faqs);

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Research", item: "/research" },
    { name: reportData.title, item: `/research/${reportData.slug}` },
  ]);

  return (
    <>
      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reportSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center space-x-2 text-xs font-mono text-muted">
          <Link href="/research" className="hover:text-cyan-deep transition-colors">
            ← Back to Research Library
          </Link>
          <span>/</span>
          <span className="text-navy font-semibold">Industry Research</span>
        </div>

        {/* 1. HERO SECTION */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start border-b border-line pb-12">
          <div className="lg:col-span-8 space-y-6">
            <SectionLabel>ASTONTO INDUSTRY RESEARCH</SectionLabel>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-navy leading-tight tracking-tight">
              {reportData.title}
            </h1>
            <p className="text-base sm:text-lg text-ink-soft leading-relaxed font-medium">
              {reportData.subtitle}
            </p>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              ASTONTO tested commercially relevant questions that SME buyers might ask AI systems when choosing managed IT support in Greater Manchester. Across 144 responses, the research reveals which providers appeared most prominently, how results differed between AI platforms, and how uneven AI recommendation visibility can be even within the same local market.
            </p>

            {/* Research Metadata Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono text-muted pt-4 border-t border-line">
              <div>
                <span className="block text-muted text-[11px]">Geography</span>
                <span className="text-navy font-semibold">{reportData.location}</span>
              </div>
              <div>
                <span className="block text-muted text-[11px]">Testing Window</span>
                <span className="text-navy font-semibold">{reportData.testingPeriod}</span>
              </div>
              <div>
                <span className="block text-muted text-[11px]">Methodology</span>
                <span className="text-cyan-deep font-semibold">{reportData.methodologyVersion}</span>
              </div>
              <div>
                <span className="block text-muted text-[11px]">Reliability</span>
                <span className="text-amber-700 font-bold bg-amber-500/10 px-2 py-0.5 rounded inline-block mt-0.5">
                  {reportData.reliability}
                </span>
              </div>
            </div>
          </div>

          {/* Research Stat Block */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-navy text-white shadow-lg space-y-6">
            <h3 className="text-xs font-mono text-cyan uppercase tracking-wider font-bold">
              Test Parameters
            </h3>
            <div className="grid grid-cols-2 gap-6 font-mono">
              <div className="border-b border-navy-deep pb-3">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{reportData.promptCount}</div>
                <div className="text-xs text-cyan-soft">Buyer questions</div>
              </div>
              <div className="border-b border-navy-deep pb-3">
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{reportData.platformCount}</div>
                <div className="text-xs text-cyan-soft">AI platforms</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{reportData.runsPerPlatform}×</div>
                <div className="text-xs text-cyan-soft">Repeated runs</div>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white">{reportData.responseCount}</div>
                <div className="text-xs text-cyan-soft">Observed answers</div>
              </div>
            </div>
          </div>
        </header>

        {/* 2. EXECUTIVE FINDING */}
        <section className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-4">
          <SectionLabel>Executive Finding</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
            AI recommendation visibility in Greater Manchester is highly uneven.
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed max-w-4xl">
            The study found material differences between providers and between individual AI platforms. A company visible on one system could be weak or absent on another. The result suggests that &quot;being known in the market&quot; and &quot;being represented consistently in AI-generated buyer answers&quot; are not necessarily the same thing.
          </p>
        </section>

        {/* 3. RELIABILITY CAVEAT BOX */}
        <section>
          <ResearchCaveat note={reportData.reliabilityNote} />
        </section>

        {/* 4. FIVE-COMPANY BENCHMARK */}
        <section className="space-y-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
                Selected five-company PULSE benchmark
              </h2>
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-500/10 px-2.5 py-1 rounded border border-amber-500/30">
                INDICATIVE — NOT A DEFINITIVE COMPANY AUDIT
              </span>
            </div>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed max-w-4xl">
              ASTONTO froze a five-company comparison set before repeated testing. Each company was tested under the same prompts, platforms, location, language, runs, weights and methodology. These are Indicative automated first-pass classifications from PULSE Method v1.0 and are pending final manual interpretation where applicable.
            </p>
          </div>

          {/* Benchmark Table */}
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-sm">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surface-soft border-b border-line text-navy font-bold uppercase tracking-wider">
                <tr>
                  <th scope="col" className="p-4">Provider</th>
                  <th scope="col" className="p-4 text-right">ChatGPT</th>
                  <th scope="col" className="p-4 text-right">Perplexity</th>
                  <th scope="col" className="p-4 text-right">Gemini</th>
                  <th scope="col" className="p-4 text-right">Google AI Overviews</th>
                  <th scope="col" className="p-4 text-right bg-surface-tint text-navy">PULSE Benchmark</th>
                  <th scope="col" className="p-4 text-right">Appearance Rate</th>
                  <th scope="col" className="p-4 text-right">PULSE Share of Voice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line text-ink">
                {reportData.fiveCompanyBenchmark.map((comp) => (
                  <tr key={comp.name} className="hover:bg-surface-soft/50 transition-colors">
                    <td className="p-4 font-bold text-navy font-sans text-sm">{comp.name}</td>
                    <td className="p-4 text-right">{comp.chatgpt.toFixed(2)}</td>
                    <td className="p-4 text-right">{comp.perplexity.toFixed(2)}</td>
                    <td className="p-4 text-right">{comp.gemini.toFixed(2)}</td>
                    <td className="p-4 text-right">{comp.googleAIOverviews.toFixed(2)}</td>
                    <td className="p-4 text-right bg-surface-tint font-bold text-cyan-deep text-sm">
                      {comp.pulseBenchmark.toFixed(2)}
                    </td>
                    <td className="p-4 text-right">{comp.appearanceRate}</td>
                    <td className="p-4 text-right font-bold text-navy">{comp.pulseShareOfVoice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-ink-soft italic">
            Within this controlled test set, Apex Computing Services recorded the highest Indicative PULSE Benchmark Score among the selected five-company comparison group.
          </p>

          {/* Visual Bar Ranking */}
          <HorizontalScoreChart companies={reportData.fiveCompanyBenchmark} />

          {/* PULSE Share of Voice Breakdown */}
          <ShareOfVoiceChart companies={reportData.fiveCompanyBenchmark} />
        </section>

        {/* 5. PLATFORM DIFFERENCES */}
        <section>
          <PlatformComparison companies={reportData.fiveCompanyBenchmark.slice(0, 3)} />
        </section>

        {/* 6. ALL-COMPANY DISCOVERY */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-navy">Which other providers appeared?</h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              The five-company benchmark is intentionally frozen for comparison, but ASTONTO also extracted other organisations named by AI systems during the 144 responses. These organisations were <strong>not part of the frozen five-company Share of Voice benchmark</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportData.extractedCompanies.map((comp) => (
              <div key={comp.name} className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
                <div className="flex justify-between items-start border-b border-line pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-navy">{comp.name}</h3>
                    <span className="text-xs text-muted font-mono">Discovered Provider (Outside Benchmark Set)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-muted font-mono block">Indicative Score</span>
                    <span className="text-base font-mono font-bold text-cyan-deep">{comp.pulseScore.toFixed(2)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs text-ink-soft">
                  <div className="bg-surface-soft p-2 rounded">
                    <span className="text-muted block text-[11px]">Mentions</span>
                    <span className="font-bold text-navy">{comp.mentions}</span>
                  </div>
                  <div className="bg-surface-soft p-2 rounded">
                    <span className="text-muted block text-[11px]">Distinct Prompts</span>
                    <span className="font-bold text-navy">{comp.distinctPrompts}</span>
                  </div>
                  <div className="bg-surface-soft p-2 rounded">
                    <span className="text-muted block text-[11px]">Platform Coverage</span>
                    <span className="font-bold text-navy">{comp.platformCoverage}</span>
                  </div>
                  <div className="bg-surface-soft p-2 rounded">
                    <span className="text-muted block text-[11px]">Observed Platforms</span>
                    <span className="font-bold text-navy text-[11px]">{comp.observedPlatforms.join(", ")}</span>
                  </div>
                </div>

                <p className="text-xs text-ink-soft leading-relaxed pt-1">
                  <strong>Observation:</strong> {comp.observation}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. WHAT BUYERS WERE ASKING */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-navy">The 12 buyer questions</h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              These commercially relevant questions reflect what SME decision-makers ask AI platforms when researching managed IT support, migration, and security in Greater Manchester.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(["HIGH-INTENT RECOMMENDATION", "SERVICE SELECTION", "PROBLEM SOLVING"] as const).map((cat) => {
              const catPrompts = reportData.prompts.filter((p) => p.category === cat);
              return (
                <div key={cat} className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
                  <div className="border-b border-line pb-3">
                    <span className="text-[11px] font-mono font-bold text-cyan-deep uppercase tracking-wider block">
                      {cat}
                    </span>
                    <span className="text-xs text-muted font-mono">{catPrompts.length} Prompts Evaluated</span>
                  </div>
                  <ul className="space-y-3">
                    {catPrompts.map((item) => (
                      <li key={item.id} className="text-xs text-ink space-y-1 bg-surface-soft p-3 rounded-lg border border-line">
                        <div className="flex justify-between text-[11px] font-mono text-muted">
                          <span>Prompt #{item.id}</span>
                          <span className="text-cyan-deep font-semibold">{item.focus}</span>
                        </div>
                        <p className="font-medium text-navy leading-snug">
                          &quot;{item.prompt}&quot;
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* 8. METHODOLOGY */}
        <section>
          <MethodologyGrid data={reportData} />
        </section>

        {/* 9. EXPLAIN PULSE SCORE */}
        <section className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-navy">What the PULSE Score measures</h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              PULSE measures observable AI recommendation performance. For every brand, prompt, platform and run, ASTONTO records whether the organisation appears, its position or prominence, recommendation strength, sentiment, repeated-run consistency, competitor performance, query importance, location, and language.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-surface-tint border border-line text-center">
            <span className="block text-xs font-mono text-muted uppercase tracking-wider mb-1">
              Public Core Formula
            </span>
            <code className="text-xs sm:text-sm font-mono font-bold text-navy">
              Prompt Result Score = Position Factor × Recommendation Factor × Sentiment Factor
            </code>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-ink-soft leading-relaxed">
            <div className="p-4 rounded-xl bg-surface-soft border border-line space-y-1">
              <h4 className="font-bold text-navy">Mentions vs. Recommendations</h4>
              <p>A mention is not automatically a recommendation. Being listed first does not automatically mean receiving the strongest endorsement.</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-soft border border-line space-y-1">
              <h4 className="font-bold text-navy">Zero-Score Baseline</h4>
              <p>A business that is not mentioned receives zero for that result within the tested prompt parameters.</p>
            </div>
            <div className="p-4 rounded-xl bg-surface-soft border border-line space-y-1">
              <h4 className="font-bold text-navy">Reputation Risk Handling</h4>
              <p>Explicitly negative visibility or cautionary disclaimers are flagged and treated as Reputation Risks in the formula.</p>
            </div>
          </div>
        </section>

        {/* 10. WHAT THIS RESEARCH DOES & DOES NOT TELL US */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-navy">What this research does — and does not — tell us</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-3">
              <h3 className="text-sm font-mono font-bold text-emerald-800 uppercase tracking-wider">
                What it tells us
              </h3>
              <ul className="space-y-2 text-xs text-ink-soft leading-relaxed list-disc list-inside">
                <li>Which organisations appeared in these buyer answers</li>
                <li>Relative recommendation strength within the controlled test set</li>
                <li>Platform differences across ChatGPT, Perplexity, Gemini, and Google AI Overviews</li>
                <li>Consistency across repeated runs under identical prompts</li>
                <li>Competitor visibility within the frozen comparison set</li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-3">
              <h3 className="text-sm font-mono font-bold text-rose-800 uppercase tracking-wider">
                What it does not tell us
              </h3>
              <ul className="space-y-2 text-xs text-ink-soft leading-relaxed list-disc list-inside">
                <li>Why a proprietary AI model internally selected a provider</li>
                <li>The provider&apos;s real-world service quality or technical capabilities</li>
                <li>Commercial market share or financial revenue</li>
                <li>Customer satisfaction or client retention rates</li>
                <li>Future recommendation performance across unobserved prompts</li>
              </ul>
            </div>
          </div>

          <p className="text-xs text-muted italic">
            ASTONTO studies observable behaviour. We do not claim access to proprietary model weights, ranking algorithms or internal decision systems.
          </p>
        </section>

        {/* 11. RESEARCH OBSERVATIONS */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-navy">Key Research Observations</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-2">
              <h3 className="text-base font-bold text-navy">
                Observation 1 — Visibility was concentrated
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Within the frozen five-company set, Apex Computing Services accounted for approximately 43.47% of measured PULSE Share of Voice. This concentration applies specifically to this benchmark set under the 12 tested buyer prompts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-2">
              <h3 className="text-base font-bold text-navy">
                Observation 2 — Platform performance differed materially
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                Several providers showed significant differences between ChatGPT, Perplexity, Gemini, and Google AI Overviews. Strong representation on one engine did not guarantee visibility on another.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-2">
              <h3 className="text-base font-bold text-navy">
                Observation 3 — Visibility was not binary
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                The study distinguishes being mentioned from being recommended. A provider can appear in an answer without receiving a strong endorsement or preferred placement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-2">
              <h3 className="text-base font-bold text-navy">
                Observation 4 — Specialist questions broadened the field
              </h3>
              <p className="text-xs text-ink-soft leading-relaxed">
                The 12 questions cover several commercial needs — from Microsoft 365 migration and Cyber Essentials to backup and professional-services support. Different prompt framing surfaced different organisations.
              </p>
            </div>
          </div>
        </section>

        {/* 12. WHY THIS MATTERS FOR MSPs */}
        <section className="p-8 rounded-3xl bg-surface-soft border border-line space-y-4">
          <SectionLabel>Market Context</SectionLabel>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy">
            Why this matters for managed IT providers
          </h2>
          <p className="text-sm text-ink-soft leading-relaxed max-w-4xl">
            A potential buyer no longer has to begin with Google, review sites or a recommendation from their network. They may ask: <em>&quot;Which managed IT providers are best for a 50-person company in Manchester?&quot;</em> or <em>&quot;Who can help us achieve Cyber Essentials?&quot;</em> An AI system can produce a shortlist before the buyer visits a provider&apos;s website.
          </p>
          <blockquote className="p-4 rounded-xl bg-surface border-l-4 border-cyan-deep text-navy font-semibold text-sm italic">
            &quot;When a buyer describes a problem you solve, does AI recognise, understand and recommend your business?&quot;
          </blockquote>
          <p className="text-xs text-ink-soft leading-relaxed">
            ASTONTO examines this transition through empirical evidence rather than assumptions.
          </p>
        </section>

        {/* 13. PROVIDER SELF-CHECK CTA */}
        <section>
          <ReportCTA />
        </section>

        {/* 14. ASTONTO OFFER CONTEXT */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-navy">ASTONTO AI Search Visibility Services</h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
              Empirical evaluation, optimisation sprints, and monitoring for corporate decision-makers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-surface border border-line shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-navy text-sm">20-Minute AI Visibility Check</h3>
                <span className="text-base font-mono font-bold text-cyan-deep block mt-1">Free</span>
                <p className="text-ink-soft mt-2 leading-relaxed">
                  One verified query-level observation and an assessment of whether a full audit is appropriate.
                </p>
              </div>
              <Link href="/contact?service=check" className="text-cyan-deep font-bold hover:underline pt-2 block">
                Book Check →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-line shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-navy text-sm">24-Hour AI Visibility Audit</h3>
                <span className="text-base font-mono font-bold text-navy block mt-1">£950 + VAT</span>
                <p className="text-ink-soft mt-2 leading-relaxed">
                  Client plus 4 competitors, buyer questions, platform findings, PULSE Scores, evidence log, Reputation Risks, and live presentation.
                </p>
              </div>
              <Link href="/services/ai-visibility-audit" className="text-navy font-bold hover:underline pt-2 block">
                View Audit Details →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-line shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-navy text-sm">90-Day Optimisation Sprint</h3>
                <span className="text-base font-mono font-bold text-navy block mt-1">£6,000 + VAT</span>
                <p className="text-ink-soft mt-2 leading-relaxed">
                  Or 3 × £2,000 + VAT. The £950 audit fee is credited in full when a sprint begins within 72 hours of audit presentation.
                </p>
              </div>
              <Link href="/services/90-day-optimisation-sprint" className="text-navy font-bold hover:underline pt-2 block">
                View Sprint Scope →
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-surface border border-line shadow-sm space-y-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-navy text-sm">AI Visibility Monitoring</h3>
                <span className="text-base font-mono font-bold text-navy block mt-1">From £350 + VAT/mo</span>
                <p className="text-ink-soft mt-2 leading-relaxed">
                  Ongoing tracking of monthly PULSE score movements, competitor overtakes, and model update alerts.
                </p>
              </div>
              <Link href="/services/monitoring" className="text-navy font-bold hover:underline pt-2 block">
                View Monitoring →
              </Link>
            </div>
          </div>

          <p className="text-[11px] text-muted italic">
            ASTONTO does not guarantee PULSE Score improvement, recommendations, rankings or citations.
          </p>
        </section>

        {/* 15. FAQ SECTION */}
        <section className="space-y-6">
          <div className="border-b border-line pb-4">
            <h2 className="text-2xl font-bold text-navy">Frequently Asked Questions</h2>
            <p className="text-xs sm:text-sm text-ink-soft leading-relaxed mt-1">
              Direct answers regarding research scope, methodology, and findings.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {reportData.faqs.map((faq, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-surface border border-line shadow-sm space-y-2">
                <h3 className="font-bold text-navy text-sm leading-snug">{faq.question}</h3>
                <p className="text-ink-soft leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 16. RESEARCH EVIDENCE */}
        <section className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
          <h3 className="text-sm font-bold text-navy">Research evidence &amp; auditability</h3>
          <p className="text-xs text-ink-soft leading-relaxed">
            ASTONTO preserves exact tested prompts, AI platform outputs, test runs, timestamped logs, location parameters, language, full response text, displayed citations, brand position, recommendation classification, sentiment scores, confidence ratings, and review status. Detailed evidence is retained internally to preserve auditability and methodology integrity. Where legally and practically appropriate, cited external sources are linked in individual research examples.
          </p>
        </section>

        {/* 17. CITE THIS RESEARCH */}
        <section>
          <CitationBox citation={reportData.citation} />
        </section>

        {/* 18. DISCLAIMERS */}
        <footer className="pt-8 border-t border-line text-[11px] text-muted space-y-3">
          <p>
            <strong>Research limitation:</strong> This report measures observed AI recommendation behaviour within a controlled set of prompts, platforms, runs, geography, language and testing dates. It does not measure every possible AI-generated answer and should not be treated as a definitive ranking of service quality. AI-generated results are variable and may change. ASTONTO does not guarantee future rankings, citations, recommendations or PULSE Score improvements. The PULSE Share of Voice shown in this report applies only to the selected five-company benchmark set.
          </p>
          <p>
            {reportData.disclaimer}
          </p>
        </footer>

      </article>
    </>
  );
}
