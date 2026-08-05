import React from "react";

interface ResearchIndexItem {
  number: string;
  title: string;
  description: string;
}

export function ResearchIndex({ items }: { items: ResearchIndexItem[] }) {
  return (
    <div className="border-t border-line divide-y divide-line">
      {items.map((item) => (
        <div key={item.number} className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-baseline group hover:bg-surface-soft/50 transition-colors px-2 rounded-lg">
          <div className="md:col-span-2 font-mono text-sm text-cyan-deep font-bold">
            {item.number}
          </div>
          <div className="md:col-span-4 text-lg font-bold text-navy group-hover:text-cyan-deep transition-colors">
            {item.title}
          </div>
          <div className="md:col-span-6 text-sm text-ink-soft leading-relaxed">
            {item.description}
          </div>
        </div>
      ))}
    </div>
  );
}
