import React from "react";
import { FAQItem } from "@content/faqData";

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details
          key={item.id}
          className="group bg-surface border border-line rounded-xl p-4 sm:p-5 shadow-sm [&_summary::-webkit-details-marker]:hidden"
        >
          <summary className="flex items-center justify-between cursor-pointer list-none text-sm sm:text-base font-semibold text-navy group-hover:text-cyan-deep transition-colors">
            <span>{item.question}</span>
            <span className="ml-4 text-cyan-deep font-bold transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <div className="mt-3 text-xs sm:text-sm text-ink-soft leading-relaxed pt-3 border-t border-line">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
