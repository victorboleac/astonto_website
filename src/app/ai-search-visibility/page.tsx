import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { DarkCTA } from "@/components/DarkCTA";
import { pricing, formatPrice } from "@config/pricing";

export const metadata: Metadata = {
  title: "AI Search Visibility — Audit, Optimisation & Monitoring",
  description:
    "Measure how ChatGPT, Gemini, Perplexity and Google AI Overviews recommend your business. Benchmark competitors and improve AI search visibility with ASTONTO.",
  alternates: {
    canonical: "/ai-search-visibility",
  },
  openGraph: {
    title: "ASTONTO AI Search Visibility — Audit, Optimisation & Monitoring",
    description:
      "Measure how ChatGPT, Gemini, Perplexity and Google AI Overviews recommend your business. Benchmark competitors and improve AI search visibility with ASTONTO.",
    url: "/ai-search-visibility",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ASTONTO AI Search Visibility",
    description:
      "Measure and improve how ChatGPT, Gemini, Perplexity and Google AI Overviews recommend your business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AISearchVisibilityPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      {/* 1. Service Hero */}
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Commercial Service</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy leading-tight">
          AI Search Visibility, measured with evidence.
        </h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          ASTONTO measures how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your company compared with four selected competitors—and builds an evidence-based plan to close visibility gaps.
        </p>
      </div>

      {/* 2. The Problem Statement */}
      <div className="p-8 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-navy">The AI Recommendation Paradox</h2>
        <p className="text-sm text-ink-soft leading-relaxed">
          Market leaders in traditional search often remain invisible in AI platform recommendations. LLMs do not read sales volume—they evaluate entity clarity, structured schema, and third-party citation density. ASTONTO identifies why your company is omitted or secondary in AI answers and closes the gap.
        </p>
      </div>

      {/* 3. Core Measurement Dimensions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-navy">Mentions vs Recommendations</h3>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            Simply appearing in an AI-generated answer does not guarantee buyer conversion. ASTONTO evaluates whether an AI engine explicitly endorses your company as a preferred solution, presents it neutrally, or cites negative disclaimers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-navy">4-Competitor Strategic Benchmarking</h3>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            AI recommendations are relative. Every audit compares your brand against four direct market competitors across identical prompt sets to calculate your comparative PULSE Share of Voice.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-navy">Multi-Run Consistency Testing</h3>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            Commercial LLMs are non-deterministic. Running 5 to 10 repeat test iterations per query ensures that reported scores reflect true underlying recommendation patterns rather than single-run anomalies.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
          <h3 className="text-lg font-bold text-navy">Geographic & Language Dynamics</h3>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            AI recommendation outputs vary across UK, EU, and international markets. Our AI Search Visibility audits isolate regional IP geolocations and language contexts to deliver market-specific intelligence.
          </p>
        </div>
      </div>

      {/* 4. What You Receive Deliverables */}
      <div className="p-8 rounded-3xl bg-surface-tint border border-cyan/30 space-y-6">
        <div className="space-y-2">
          <SectionLabel>Audit Deliverables</SectionLabel>
          <h2 className="text-2xl font-bold text-navy">What You Receive in ASTONTO Audit Reports</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs font-mono">
          {[
            "PULSE Benchmark Score",
            "PULSE Market Score",
            "Platform Scores (ChatGPT, Perplexity, Gemini, AI Overviews)",
            "PULSE Share of Voice (vs 4 Competitors)",
            "Appearance Rate Percentage",
            "Strong Recommendation Rate",
            "Competitor Win Rate",
            "Reputation Risks & Hallucinated Error Logs",
            "Preserved Verbatim Evidence Database",
            "Prioritised 90-Day Implementation Action Plan",
          ].map((item, i) => (
            <div key={i} className="p-3.5 rounded-xl bg-surface border border-line text-navy flex items-center space-x-2 shadow-2xs">
              <span className="text-cyan-deep font-bold">•</span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Required Disclaimer */}
      <div className="p-4 rounded-xl bg-surface-soft border border-line text-xs font-mono text-muted text-center">
        <strong className="text-navy">Methodology Disclaimer:</strong> Results reflect observed performance within the documented prompt set and testing period. They do not represent every possible AI answer and do not guarantee future visibility.
      </div>

      <DarkCTA
        headline="Request an ASTONTO AI Visibility Audit."
        supportingText="Get an empirical evaluation of your brand representation across ChatGPT, Perplexity, Gemini, and Google AI Overviews."
        ctaText="Book 24-Hour AI Visibility Audit"
        ctaHref="/contact?service=audit"
      />
    </div>
  );
}
