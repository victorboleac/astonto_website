import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { siteConfig } from "@config/site";

export const metadata: Metadata = {
  title: "About ASTONTO — Independent AI Research Company",
  description: "ASTONTO studies the observable behaviour of large language models and AI recommendation systems.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About ASTONTO — Independent AI Research Company",
    description: "ASTONTO studies the observable behaviour of large language models and AI recommendation systems.",
    url: "/about",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "About ASTONTO — Independent AI Research Company",
    description: "ASTONTO studies the observable behaviour of large language models and AI recommendation systems.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>About ASTONTO</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          Independent AI Research & Black-Box Evaluation
        </h1>
        <p className="text-base sm:text-lg text-ink-soft leading-relaxed">
          ASTONTO is an independent AI research company. We study how commercial large language models and AI recommendation systems interpret information, represent entities, select citation sources, and form corporate recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">Our Research Scope</h2>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            We evaluate publicly accessible model outputs under controlled prompt conditions across ChatGPT, Perplexity, Gemini, and Google AI Overviews.
          </p>
          <ul className="space-y-2 text-xs text-ink-soft">
            <li>• Information interpretation under implicit vs explicit intent.</li>
            <li>• Corporate entity identification and canonical resolution.</li>
            <li>• Source selection and domain citation weighting.</li>
            <li>• Geographic and linguistic output variations across UK/EU markets.</li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">Observational Boundaries</h2>
          <p className="text-xs sm:text-sm text-ink-soft leading-relaxed">
            ASTONTO operates strictly through empirical black-box testing. We do not claim access to proprietary model source code, neural weights, or unreleased algorithm updates.
          </p>
          <div className="p-4 rounded-xl bg-surface-soft border border-line text-xs font-mono text-muted">
            <strong className="text-navy font-bold">Independence Principle:</strong> We accept no commercial agreements that restrict objective empirical reporting or mandate artificial research results.
          </div>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-navy">Contact & Headquarters</h2>
        <div className="text-xs text-ink-soft space-y-1">
          <p className="font-bold text-navy">{siteConfig.name}</p>
          <p>{siteConfig.address.fullAddress}</p>
          <p className="pt-2">
            Telephone:{" "}
            <a href={`tel:${siteConfig.contact.telephoneClean}`} className="text-cyan-deep underline font-semibold">
              {siteConfig.contact.telephone}
            </a>
          </p>
          <p className="pt-1">
            LinkedIn:{" "}
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-deep underline font-semibold"
            >
              linkedin.com/company/astonto
            </a>
          </p>
        </div>
        <div className="pt-2">
          <Link
            href="/contact"
            className="inline-block px-6 py-3 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-xs"
          >
            Contact ASTONTO Research Team
          </Link>
        </div>
      </div>
    </div>
  );
}
