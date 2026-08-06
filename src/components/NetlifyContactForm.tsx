"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { initUTMAttribution, UTMData } from "@lib/analytics/utm";

function FormContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get("service");

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [utmData, setUtmData] = useState<UTMData>({
    utm_source: "",
    utm_medium: "",
    utm_campaign: "",
    utm_content: "",
    utm_term: "",
    original_landing_page: "",
    current_landing_page: "",
    referrer: "",
    first_visit_timestamp: "",
  });

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    company: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    serviceInterest: "20-minute AI visibility check",
    mainQuestion: "",
    telephone: "",
    preferredContact: "Email",
    consent: false,
    botField: "",
  });

  useEffect(() => {
    const utm = initUTMAttribution();
    setUtmData(utm);

    if (serviceParam === "audit") {
      setFormData((prev) => ({ ...prev, serviceInterest: "24-Hour AI Visibility Audit" }));
    } else if (serviceParam === "sprint") {
      setFormData((prev) => ({ ...prev, serviceInterest: "90-Day AI Visibility Optimisation Sprint" }));
    } else if (serviceParam === "monitoring") {
      setFormData((prev) => ({ ...prev, serviceInterest: "Monitoring" }));
    } else if (serviceParam === "check") {
      setFormData((prev) => ({ ...prev, serviceInterest: "20-minute AI visibility check" }));
    }
  }, [serviceParam]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.botField) {
      setSubmitted(true);
      return;
    }

    if (
      !formData.fullName ||
      !formData.workEmail ||
      !formData.company ||
      !formData.companyWebsite ||
      !formData.country ||
      !formData.mainQuestion ||
      !formData.consent
    ) {
      setError("Please complete all required fields and accept the privacy notice consent.");
      return;
    }

    setError(null);

    const form = e.target as HTMLFormElement;
    const body = new URLSearchParams(new FormData(form) as any).toString();

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    })
      .then(() => setSubmitted(true))
      .catch((err) => {
        console.error("Form submission error:", err);
        setError("An error occurred submitting the form. Please try again or call +44 7845 580266.");
      });
  };

  if (submitted) {
    return (
      <div className="p-8 rounded-2xl bg-surface border border-cyan/40 text-center space-y-4 shadow-md">
        <div className="w-12 h-12 rounded-full bg-cyan-soft text-cyan-deep mx-auto flex items-center justify-center font-bold text-xl">
          ✓
        </div>
        <h3 className="text-2xl font-bold text-navy">Enquiry Received</h3>
        <p className="text-sm text-ink-soft max-w-md mx-auto leading-relaxed">
          Thank you for reaching out to ASTONTO. Our research team will review your commercial AI visibility enquiry and get in touch within 24 hours.
        </p>
        <div className="pt-4">
          <button
            onClick={() => setSubmitted(false)}
            className="px-5 py-2.5 rounded-md bg-surface-soft text-navy border border-line text-xs font-semibold hover:bg-line transition-colors"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      name="astonto-contact"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-surface border border-line rounded-2xl p-6 sm:p-8 space-y-6 shadow-md"
    >
      <input type="hidden" name="form-name" value="astonto-contact" />
      <input type="hidden" name="utm_source" value={utmData.utm_source} />
      <input type="hidden" name="utm_medium" value={utmData.utm_medium} />
      <input type="hidden" name="utm_campaign" value={utmData.utm_campaign} />
      <input type="hidden" name="utm_content" value={utmData.utm_content} />
      <input type="hidden" name="utm_term" value={utmData.utm_term} />
      <input type="hidden" name="original_landing_page" value={utmData.original_landing_page} />
      <input type="hidden" name="current_landing_page" value={utmData.current_landing_page} />
      <input type="hidden" name="referrer" value={utmData.referrer} />
      <input type="hidden" name="first_visit_timestamp" value={utmData.first_visit_timestamp} />
      
      {/* Honeypot Spam Prevention */}
      <p className="hidden">
        <label>
          Don’t fill this out if you’re human:{" "}
          <input name="bot-field" value={formData.botField} onChange={handleChange} />
        </label>
      </p>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-700 text-xs font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-navy mb-1">
            Full Name <span className="text-cyan-deep">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            required
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>

        <div>
          <label htmlFor="workEmail" className="block text-xs font-semibold text-navy mb-1">
            Work Email <span className="text-cyan-deep">*</span>
          </label>
          <input
            type="email"
            id="workEmail"
            name="workEmail"
            required
            value={formData.workEmail}
            onChange={handleChange}
            placeholder="jane@company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-xs font-semibold text-navy mb-1">
            Company Name <span className="text-cyan-deep">*</span>
          </label>
          <input
            type="text"
            id="company"
            name="company"
            required
            value={formData.company}
            onChange={handleChange}
            placeholder="Company Ltd"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>

        <div>
          <label htmlFor="companyWebsite" className="block text-xs font-semibold text-navy mb-1">
            Company Website <span className="text-cyan-deep">*</span>
          </label>
          <input
            type="url"
            id="companyWebsite"
            name="companyWebsite"
            required
            value={formData.companyWebsite}
            onChange={handleChange}
            placeholder="https://company.com"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>

        <div>
          <label htmlFor="jobTitle" className="block text-xs font-semibold text-navy mb-1">
            Job Title (Optional)
          </label>
          <input
            type="text"
            id="jobTitle"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            placeholder="Head of Marketing / Managing Director"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-xs font-semibold text-navy mb-1">
            Country / Target Market <span className="text-cyan-deep">*</span>
          </label>
          <input
            type="text"
            id="country"
            name="country"
            required
            value={formData.country}
            onChange={handleChange}
            placeholder="United Kingdom / Germany / EU"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>
      </div>

      <div>
        <label htmlFor="serviceInterest" className="block text-xs font-semibold text-navy mb-1">
          Primary Service of Interest <span className="text-cyan-deep">*</span>
        </label>
        <select
          id="serviceInterest"
          name="serviceInterest"
          required
          value={formData.serviceInterest}
          onChange={handleChange}
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
        >
          <option value="20-minute AI visibility check">20-minute AI visibility check</option>
          <option value="24-Hour AI Visibility Audit">24-Hour AI Visibility Audit</option>
          <option value="90-Day AI Visibility Optimisation Sprint">90-Day AI Visibility Optimisation Sprint</option>
          <option value="Monitoring">AI Visibility Monitoring</option>
          <option value="Research enquiry">Research enquiry</option>
          <option value="Partnership or media enquiry">Partnership or media enquiry</option>
        </select>
      </div>

      <div>
        <label htmlFor="mainQuestion" className="block text-xs font-semibold text-navy mb-1">
          Main AI Visibility Question or Challenge <span className="text-cyan-deep">*</span>
        </label>
        <textarea
          id="mainQuestion"
          name="mainQuestion"
          required
          rows={4}
          value={formData.mainQuestion}
          onChange={handleChange}
          placeholder="Describe how your company is currently represented in ChatGPT/Perplexity, or list your target competitors..."
          className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="telephone" className="block text-xs font-semibold text-navy mb-1">
            Telephone (Optional)
          </label>
          <input
            type="tel"
            id="telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            placeholder="+44 7000 000000"
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink placeholder-muted text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          />
        </div>

        <div>
          <label htmlFor="preferredContact" className="block text-xs font-semibold text-navy mb-1">
            Preferred Contact Method
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line text-ink text-sm focus:outline-none focus:border-cyan-deep focus:bg-surface"
          >
            <option value="Email">Email</option>
            <option value="Telephone">Telephone</option>
            <option value="Video Call">Video Call</option>
          </select>
        </div>
      </div>

      <div className="flex items-start space-x-3 pt-2">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          checked={formData.consent}
          onChange={handleChange}
          className="mt-1 h-4 w-4 rounded border-line bg-surface-soft text-cyan-deep focus:ring-cyan-deep"
        />
        <label htmlFor="consent" className="text-xs text-muted leading-normal">
          I consent to ASTONTO processing my contact details to respond to this commercial enquiry per the{" "}
          <Link href="/privacy" className="text-cyan-deep underline">
            Privacy Notice
          </Link>
          .
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-sm transition-all shadow-sm"
      >
        Submit Enquiry
      </button>
    </form>
  );
}

export function NetlifyContactForm({ defaultService }: { defaultService?: string }) {
  return (
    <Suspense fallback={<div className="p-8 rounded-2xl bg-surface border border-line text-muted">Loading form...</div>}>
      <FormContent />
    </Suspense>
  );
}
