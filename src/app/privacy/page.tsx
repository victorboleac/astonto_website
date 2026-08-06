import React from "react";
import { siteConfig } from "@config/site";

export const metadata = {
  title: "Privacy Notice | ASTONTO",
  description: "ASTONTO Privacy Notice describing data processing, UK/EU GDPR compliance, Netlify Form data handling, and data subject rights.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="space-y-4 border-b border-line pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-navy">Privacy Notice</h1>
        <p className="text-xs font-mono text-muted">Last updated: August 2026</p>
      </div>

      <div className="space-y-8 text-sm sm:text-base text-ink leading-relaxed">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">1. Data Controller</h2>
          <p>
            {siteConfig.legalName} (trading as <strong>{siteConfig.name}</strong>), registered in England and Wales.
          </p>
          <p>
            <strong>Registered Address:</strong> {siteConfig.address.fullAddress}
          </p>
          <p>
            <strong>Data Enquiries:</strong> {siteConfig.contact.notificationEmail} | {siteConfig.contact.telephone}
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">2. Personal Data We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide when submitting an enquiry through our website forms or contacting us directly:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-ink-soft">
            <li>Full Name</li>
            <li>Work Email Address</li>
            <li>Company Name &amp; Website URL</li>
            <li>Job Title (Optional)</li>
            <li>Country / Target Market</li>
            <li>Telephone Number (Optional)</li>
            <li>Enquiry details and primary service of interest</li>
            <li>Campaign attribution data (UTM parameters, landing URL, referrer)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">3. Purpose and Legal Basis for Processing</h2>
          <p>
            We process your personal data under the following legal bases pursuant to UK GDPR and EU GDPR Article 6:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-ink-soft">
            <li><strong>Legitimate Interests:</strong> To respond to commercial enquiries, provide AI Search Visibility checks, audits, and research communications requested by your organisation.</li>
            <li><strong>Consent:</strong> Where you explicitly consent to communications or specific data processing routes.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">4. Third-Party Processors &amp; Infrastructure</h2>
          <p>
            We process data using secure, reputable third-party infrastructure providers:
          </p>
          <ul className="list-disc list-inside space-y-2 pl-2 text-ink-soft">
            <li><strong>Netlify Inc.:</strong> Web hosting and Netlify Forms processing. Form data is transmitted securely via TLS encryption.</li>
            <li><strong>Supabase Inc.:</strong> Cloud database storage for authorized content management.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">5. Data Retention</h2>
          <p>
            Commercial enquiry data is retained only for as long as necessary to fulfill the commercial request or business relationship, after which it is securely archived or erased.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-navy">6. Your Data Subject Rights</h2>
          <p>
            Under UK GDPR and EU GDPR, you have the right to request access to, rectification of, or erasure of your personal data, as well as the right to restrict or object to processing. To exercise your rights, please email{" "}
            <a href={`mailto:${siteConfig.contact.notificationEmail}`} className="text-cyan-deep font-semibold hover:underline">
              {siteConfig.contact.notificationEmail}
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
