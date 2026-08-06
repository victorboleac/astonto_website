import type { Metadata } from "next";
import { siteConfig } from "@config/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "ASTONTO Cookie Policy outlining default essential-only cookie usage and privacy-first web practices.",
  alternates: {
    canonical: "/cookies",
  },
  openGraph: {
    title: "Cookie Policy",
    description: "ASTONTO Cookie Policy outlining default essential-only cookie usage and privacy-first web practices.",
    url: "/cookies",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Cookie Policy",
    description: "ASTONTO Cookie Policy outlining default essential-only cookie usage and privacy-first web practices.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="space-y-4 border-b border-line pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">Cookie Policy</h1>
        <p className="text-xs font-mono text-muted">Last updated: August 2026</p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-ink leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">1. Privacy-First Cookie Approach</h2>
          <p>
            ASTONTO operates a privacy-first web experience. We do not use non-essential advertising, cross-site profiling, or invasive third-party tracking cookies on this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">2. Essential &amp; Functional Cookies</h2>
          <p>
            Essential cookies are strictly necessary for core functionality and website security:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-ink-soft">
            <li><strong>Session &amp; Security Cookies:</strong> Maintain secure authentication states for authorized admin users and mitigate CSRF/security risks.</li>
            <li><strong>First-Party Local Storage:</strong> Preserves campaign attribution data (such as UTM parameters) locally in your browser to accurately attribute commercial enquiries.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">3. Managing Cookie Preferences</h2>
          <p>
            You can control or block cookies at any time through your web browser settings. Disabling essential session cookies may affect access to secure areas of the site.
          </p>
          <p>
            For questions regarding our cookie practices, please contact{" "}
            <a href={`mailto:${siteConfig.contact.notificationEmail}`} className="text-cyan-deep font-semibold hover:underline">
              {siteConfig.contact.notificationEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
