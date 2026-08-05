import React from "react";
import { siteConfig } from "@config/site";

export const metadata = {
  title: "Accessibility Statement",
  description: "ASTONTO Accessibility Statement detailing WCAG 2.2 AA alignment and keyboard navigation support.",
};

export default function AccessibilityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="space-y-4 border-b border-navy-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Accessibility Statement</h1>
        <p className="text-xs font-mono text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          ASTONTO is committed to ensuring digital accessibility for people of all abilities. We strive to conform to Web Content Accessibility Guidelines (WCAG) 2.2 Level AA.
        </p>

        <h2 className="text-lg font-bold text-white">Measures Implemented</h2>
        <ul className="space-y-2 list-disc list-inside">
          <li>Keyboard-operable navigation with visible focus indicators.</li>
          <li>Semantic HTML5 page structure and single H1 headings per page.</li>
          <li>High-contrast text design over dark background tokens.</li>
          <li>Visible HTML accordions requiring no JavaScript to access FAQ answers.</li>
          <li>Skip-to-main-content bypass link for screen readers.</li>
        </ul>

        <h2 className="text-lg font-bold text-white">Feedback Route</h2>
        <p>
          If you experience accessibility barriers on this website, please contact us at {siteConfig.contact.notificationEmail} or telephone {siteConfig.contact.telephone}.
        </p>
      </div>
    </div>
  );
}
