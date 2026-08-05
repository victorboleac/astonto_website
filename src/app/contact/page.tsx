import React from "react";
import { NetlifyContactForm } from "@/components/NetlifyContactForm";
import { SectionLabel } from "@/components/SectionLabel";
import { siteConfig } from "@config/site";
import { getContactPageSchema } from "@lib/schema";

export const metadata = {
  title: "Contact ASTONTO — Book a 20-Minute AI Visibility Check",
  description: "Book an AI visibility check or submit a research inquiry to ASTONTO.",
};

export default function ContactPage() {
  const contactSchema = getContactPageSchema();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
        />
      </head>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-5 space-y-6">
          <SectionLabel>Contact & Scoping</SectionLabel>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-navy leading-tight">
            Book an AI Visibility Check
          </h1>
          <p className="text-base text-ink-soft leading-relaxed">
            Speak with an ASTONTO research specialist to review how your company is currently cited and recommended in ChatGPT, Perplexity, Gemini, and Google AI Overviews.
          </p>

          <div className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3">
            <h2 className="text-sm font-bold text-navy uppercase font-mono tracking-wider">
              ASTONTO Headquarters
            </h2>
            <div className="text-xs text-ink-soft space-y-1">
              <p className="font-bold text-navy">{siteConfig.name}</p>
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.city}</p>
              <p>{siteConfig.address.postcode}</p>
              <p>{siteConfig.address.country}</p>
              <p className="pt-2">
                Telephone:{" "}
                <a
                  href={`tel:${siteConfig.contact.telephoneClean}`}
                  className="text-cyan-deep underline font-semibold"
                >
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
          </div>

          <div className="p-4 rounded-xl bg-surface-soft border border-line text-xs text-muted font-mono space-y-1">
            <p className="font-bold text-navy">Response Time Expectations:</p>
            <p>Commercial enquiries are reviewed by our research team within 24 hours.</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <NetlifyContactForm />
        </div>
      </div>
    </div>
  );
}
