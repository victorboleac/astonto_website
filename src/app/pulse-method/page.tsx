import type { Metadata } from "next";
import { PULSEDiagram } from "@/components/PULSEDiagram";
import { SectionLabel } from "@/components/SectionLabel";

export const metadata: Metadata = {
  title: "PULSE Method v1.0 — Methodology Specification",
  description: "PULSE Method v1.0 is ASTONTO's transparent evaluation framework for calculating AI search recommendation visibility.",
  alternates: {
    canonical: "/pulse-method",
  },
  openGraph: {
    title: "PULSE Method v1.0 — Methodology Specification",
    description: "PULSE Method v1.0 is ASTONTO's transparent evaluation framework for calculating AI search recommendation visibility.",
    url: "/pulse-method",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "PULSE Method v1.0 — Methodology Specification",
    description: "PULSE Method v1.0 is ASTONTO's transparent evaluation framework for calculating AI search recommendation visibility.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PULSEMethodPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-16">
      <div className="space-y-4">
        <SectionLabel>Public Methodology Specification</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">PULSE Method v1.0</h1>
        <p className="text-base text-ink-soft leading-relaxed">
          PULSE (Position, Endorsement, Sentiment & Entity Performance) is a client-readable, evidence-based methodology for scoring corporate visibility across commercial AI engines.
        </p>
      </div>

      <PULSEDiagram />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">Recommendation Classes</h2>
          <ul className="space-y-2.5 text-xs text-ink-soft">
            <li>
              <strong className="text-cyan-deep">Strong Recommendation:</strong> The AI engine explicitly names the entity as a top-recommended solution.
            </li>
            <li>
              <strong className="text-navy font-semibold">Neutral Mention:</strong> The entity is listed among alternatives without explicit commercial endorsement.
            </li>
            <li>
              <strong className="text-warning font-semibold">Conditional Endorsement:</strong> Recommended only for niche sub-contexts or under specific caveats.
            </li>
            <li>
              <strong className="text-danger font-semibold">Negative / Risk Mention:</strong> Listed alongside complaints, regulatory warnings, or hallucinated defects.
            </li>
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-navy">Reliability Ratings</h2>
          <ul className="space-y-2.5 text-xs text-ink-soft">
            <li>
              <strong className="text-success">High Reliability:</strong> Evaluated across 20+ prompts, 5+ repeat runs per prompt, and 4 platforms over 7+ days.
            </li>
            <li>
              <strong className="text-warning font-semibold">Medium Reliability:</strong> Evaluated across 10–19 prompts with 3+ repeat runs.
            </li>
            <li>
              <strong className="text-muted">Indicative Reliability:</strong> Initial snapshot evaluation. Never presented as definitive.
            </li>
          </ul>
        </div>
      </div>

      {/* Scoring Matrix Table */}
      <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-navy">Illustrative Scoring Matrix</h2>
          <span className="text-[10px] font-mono text-cyan-deep bg-cyan-soft px-2.5 py-0.5 rounded font-bold">
            Illustrative Example — Not Client Data
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-ink">
            <thead className="text-navy uppercase font-mono bg-surface-soft border-b border-line">
              <tr>
                <th className="p-3">Prompt Scope</th>
                <th className="p-3">Position</th>
                <th className="p-3">Endorsement</th>
                <th className="p-3">Sentiment</th>
                <th className="p-3">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line font-mono text-[11px]">
              <tr>
                <td className="p-3 font-sans font-medium">"Best MSP in London"</td>
                <td className="p-3">1st Choice (1.0)</td>
                <td className="p-3 text-success font-bold">Strong (1.0)</td>
                <td className="p-3 text-cyan-deep">Positive (1.0)</td>
                <td className="p-3 font-bold text-navy">1.00</td>
              </tr>
              <tr>
                <td className="p-3 font-sans font-medium">"Compare London MSP vendors"</td>
                <td className="p-3">2nd Choice (0.8)</td>
                <td className="p-3 text-ink-soft">Neutral (0.6)</td>
                <td className="p-3 text-cyan-deep">Positive (1.0)</td>
                <td className="p-3 font-bold text-ink-soft">0.48</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
