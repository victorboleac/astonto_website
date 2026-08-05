import React from "react";
import { siteConfig } from "@config/site";

export const metadata = {
  title: "Terms of Use (Draft for Legal Review)",
  description: "ASTONTO Terms of Use governing site access, research content citations, and liability limits.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono">
        DRAFT FOR LEGAL REVIEW — Pre-launch website terms.
      </div>

      <div className="space-y-4 border-b border-navy-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Terms of Use</h1>
        <p className="text-xs font-mono text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          Welcome to the website of {siteConfig.name}. By accessing or using this website, you agree to comply with these terms.
        </p>
        <h2 className="text-lg font-bold text-white">No Guaranteed Outcomes</h2>
        <p>
          ASTONTO provides observational research and visibility benchmarking based on black-box evaluation of public AI outputs. We make no warranty or guarantee regarding future search engine or AI model placement.
        </p>
      </div>
    </div>
  );
}
