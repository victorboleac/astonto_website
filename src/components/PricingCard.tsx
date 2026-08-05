import React from "react";
import Link from "next/link";
import { formatPrice } from "@config/pricing";

interface PricingCardProps {
  name: string;
  price: number | null;
  pricePrefix?: string;
  priceLabel?: string;
  monthlyOption?: string;
  billingLabel: string;
  bestFit: string;
  scopeSummary: string;
  deliverables: string[];
  creditPolicy?: string;
  disclaimer?: string;
  turnaround?: string;
  exclusions?: string;
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
}

export function PricingCard({
  name,
  price,
  pricePrefix = "",
  priceLabel,
  monthlyOption,
  billingLabel,
  bestFit,
  scopeSummary,
  deliverables,
  creditPolicy,
  disclaimer,
  turnaround,
  exclusions,
  ctaText,
  ctaHref,
  highlighted = false,
}: PricingCardProps) {
  const displayPrice = priceLabel || formatPrice(price, pricePrefix);

  return (
    <div
      className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
        highlighted
          ? "bg-surface border-2 border-cyan-deep shadow-md"
          : "bg-surface border border-line shadow-sm"
      }`}
    >
      <div className="space-y-6">
        <div>
          {highlighted && (
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold px-2.5 py-0.5 rounded bg-cyan-soft text-cyan-deep inline-block mb-2">
              Primary Commercial Offer
            </span>
          )}
          <h3 className="text-xl font-bold text-navy">{name}</h3>
          <p className="text-xs text-muted mt-1">{bestFit}</p>
        </div>

        {/* Pricing Display Box */}
        <div className="p-4 rounded-xl bg-surface-soft border border-line space-y-1">
          <div className="text-xl font-bold text-navy font-mono">{displayPrice}</div>
          {monthlyOption && (
            <div className="text-xs text-cyan-deep font-mono font-semibold">{monthlyOption}</div>
          )}
          <div className="text-[11px] text-muted">{billingLabel}</div>
        </div>

        <div className="space-y-1.5 text-xs text-ink">
          <div className="font-semibold text-navy">Scope Summary:</div>
          <p className="text-ink-soft leading-relaxed">{scopeSummary}</p>
        </div>

        <div className="space-y-2 text-xs">
          <div className="font-semibold text-navy">Included:</div>
          <ul className="space-y-1.5 text-ink-soft">
            {deliverables.map((d, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-cyan-deep font-bold">•</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>

        {creditPolicy && (
          <div className="p-3 rounded-lg bg-surface-tint border border-cyan/20 text-xs text-navy leading-normal">
            <strong className="font-semibold text-cyan-deep">Audit Credit Policy: </strong>
            {creditPolicy}
          </div>
        )}

        {(turnaround || exclusions) && (
          <div className="pt-2 text-[11px] text-muted space-y-1 border-t border-line font-mono">
            {turnaround && (
              <div>
                <span className="font-semibold text-navy">Turnaround:</span> {turnaround}
              </div>
            )}
            {exclusions && (
              <div>
                <span className="font-semibold text-navy">Exclusions:</span> {exclusions}
              </div>
            )}
          </div>
        )}

        {disclaimer && (
          <p className="text-[11px] text-muted italic font-mono pt-1">
            {disclaimer}
          </p>
        )}
      </div>

      <div className="pt-6">
        <Link
          href={ctaHref}
          className={`block text-center w-full py-3.5 rounded-lg text-xs font-bold transition-all ${
            highlighted
              ? "bg-navy hover:bg-navy-deep text-white shadow-sm"
              : "bg-surface-soft hover:bg-line text-navy border border-line"
          }`}
        >
          {ctaText}
        </Link>
      </div>
    </div>
  );
}
