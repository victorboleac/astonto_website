import React from "react";
import { AlertCircle } from "lucide-react";

interface ResearchCaveatProps {
  note: string;
  className?: string;
}

export function ResearchCaveat({ note, className = "" }: ResearchCaveatProps) {
  return (
    <div className={`p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-ink space-y-2 ${className}`}>
      <div className="flex items-center space-x-2 text-amber-700 font-mono font-bold text-xs uppercase tracking-wider">
        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
        <span>Reliability Qualification: Indicative</span>
      </div>
      <p className="text-xs text-ink-soft leading-relaxed">
        {note}
      </p>
    </div>
  );
}
