import React from "react";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center space-x-2 text-[11px] font-mono uppercase tracking-widest font-semibold text-cyan-deep bg-cyan-soft/80 px-2.5 py-1 rounded border border-cyan/20">
      <span className="w-1.5 h-1.5 rounded-full bg-cyan-deep" />
      <span>{children}</span>
    </div>
  );
}
