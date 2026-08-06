import React from "react";
import { siteConfig } from "@config/site";

export const metadata = {
  title: "Terms of Use | ASTONTO",
  description: "ASTONTO Terms of Use governing website access, research content citations, intellectual property, and liability limits.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="space-y-4 border-b border-line pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">Terms of Use</h1>
        <p className="text-xs font-mono text-muted">Last updated: August 2026</p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-ink leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">1. Agreement to Terms</h2>
          <p>
            By accessing or using the website of <strong>{siteConfig.legalName}</strong> (trading as <strong>{siteConfig.name}</strong>), you agree to be bound by these Terms of Use and our <a href="/privacy" className="text-cyan-deep font-semibold hover:underline">Privacy Notice</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">2. Observational AI Research &amp; Scope</h2>
          <p>
            ASTONTO provides independent observational research, benchmarks, and AI Search Visibility services (including AnswerSignal, the PULSE Method, and 24-Hour AI Visibility Audits).
          </p>
          <p>
            Our findings are based on black-box evaluation of observable output behavior across third-party artificial intelligence engines (such as ChatGPT, Perplexity, Gemini, Claude, and Google AI Overviews). Because third-party AI models undergo independent updates, ASTONTO does not guarantee specific rankings, citations, or placement outcomes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">3. Intellectual Property Rights</h2>
          <p>
            All content, research methodology explanations, white papers, layout designs, trademarks, and logos on this site are the intellectual property of {siteConfig.legalName}. You may cite or quote published research provided appropriate attribution and a canonical backlink to ASTONTO are maintained.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">4. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, {siteConfig.legalName} shall not be liable for any indirect, incidental, or consequential damages arising out of your access to or use of information contained on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">5. Governing Law</h2>
          <p>
            These Terms of Use are governed by and construed in accordance with the laws of England and Wales, and any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.
          </p>
        </section>
      </div>
    </div>
  );
}
