import type { Metadata } from "next";
import { siteConfig } from "@config/site";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description: "ASTONTO Accessibility Statement detailing WCAG 2.2 AA alignment and keyboard navigation support.",
  alternates: {
    canonical: "/accessibility",
  },
  openGraph: {
    title: "Accessibility Statement",
    description: "ASTONTO Accessibility Statement detailing WCAG 2.2 AA alignment and keyboard navigation support.",
    url: "/accessibility",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Accessibility Statement",
    description: "ASTONTO Accessibility Statement detailing WCAG 2.2 AA alignment and keyboard navigation support.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="space-y-4 border-b border-line pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">Accessibility Statement</h1>
        <p className="text-xs font-mono text-muted">Last updated: August 2026</p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-ink leading-relaxed">
        <section className="space-y-3">
          <p>
            ASTONTO is committed to ensuring digital accessibility for people of all abilities. We strive to conform to Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Measures Implemented</h2>
          <ul className="list-disc list-inside space-y-2 pl-2 text-ink-soft">
            <li>Keyboard-operable navigation with visible focus indicators.</li>
            <li>Semantic HTML5 page structure and single H1 headings per page.</li>
            <li>High-contrast typography aligned with WCAG AA contrast standards.</li>
            <li>Visible HTML accordions requiring no JavaScript to access FAQ answers.</li>
            <li>Skip-to-main-content bypass link for screen reader accessibility.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">Feedback Route</h2>
          <p>
            If you experience accessibility barriers on this website, please contact us at{" "}
            <a href={`mailto:${siteConfig.contact.notificationEmail}`} className="text-cyan-deep font-semibold hover:underline">
              {siteConfig.contact.notificationEmail}
            </a>{" "}
            or telephone {siteConfig.contact.telephone}.
          </p>
        </section>
      </div>
    </div>
  );
}
