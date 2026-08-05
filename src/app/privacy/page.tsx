import React from "react";
import { siteConfig } from "@config/site";

export const metadata = {
  title: "Privacy Notice (Draft for Legal Review)",
  description: "ASTONTO Privacy Notice describing data collection, legal basis, Netlify Form processing, and data rights.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono">
        DRAFT FOR LEGAL REVIEW — Pre-launch policy requiring final legal approval before production release.
      </div>

      <div className="space-y-4 border-b border-navy-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Privacy Notice</h1>
        <p className="text-xs font-mono text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Data Controller</h2>
          <p>
            {siteConfig.legalName}, trading as {siteConfig.name}, located at {siteConfig.address.fullAddress}.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Information Collected</h2>
          <p>
            We collect personal information voluntarily submitted via our website contact form (full name, work email, company name, website URL, job title, country/market, telephone, enquiry text).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. Third-Party Data Processors</h2>
          <p>
            Contact submissions are processed through Netlify Forms (Netlify Inc.). Optional Supabase integration remains disabled at launch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Data Subject Rights</h2>
          <p>
            Under UK GDPR and EU GDPR, you have the right to request access to, rectification of, or deletion of your personal data. Contact privacy enquiries to {siteConfig.contact.notificationEmail} or telephone {siteConfig.contact.telephone}.
          </p>
        </section>
      </div>
    </div>
  );
}
