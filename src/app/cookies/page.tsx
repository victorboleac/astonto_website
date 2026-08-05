import React from "react";

export const metadata = {
  title: "Cookie Policy (Draft for Legal Review)",
  description: "ASTONTO Cookie Policy outlining default essential-only cookie usage.",
};

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-mono">
        DRAFT FOR LEGAL REVIEW — Essential cookies only by default.
      </div>

      <div className="space-y-4 border-b border-navy-800 pb-6">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Cookie Policy</h1>
        <p className="text-xs font-mono text-slate-400">Last updated: August 2026</p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-slate-300 leading-relaxed">
        <p>
          ASTONTO uses no non-essential tracking cookies by default. We do not run third-party advertising or invasive analytics scripts on this website.
        </p>
      </div>
    </div>
  );
}
