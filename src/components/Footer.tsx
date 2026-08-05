import React from "react";
import Link from "next/link";
import { footerNav } from "@config/navigation";
import { siteConfig } from "@config/site";

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line text-ink-soft py-16 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Company & Contact */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded bg-navy flex items-center justify-center">
                <svg className="w-3.5 h-3.5" viewBox="0 0 32 32" fill="none">
                  <path d="M16 7L7.5 23.5H12L16 15.5L20 23.5H24.5L16 7Z" fill="#12C6DF" />
                </svg>
              </div>
              <span className="text-base font-extrabold tracking-widest text-navy">ASTONTO</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Independent AI research company studying the observable behaviour of LLMs and generative recommendation engines.
            </p>
            <div className="pt-2 text-xs space-y-1 text-ink">
              <p className="font-bold text-navy">ASTONTO</p>
              <p>{siteConfig.address.street}</p>
              <p>{siteConfig.address.city}</p>
              <p>{siteConfig.address.postcode}</p>
              <p>{siteConfig.address.country}</p>
              <p className="pt-1">
                <a
                  href={`tel:${siteConfig.contact.telephoneClean}`}
                  className="text-cyan-deep hover:underline font-semibold"
                >
                  {siteConfig.contact.telephone}
                </a>
              </p>
              <p className="pt-1">
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-cyan-deep hover:underline font-semibold"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.72a1.4 1.4 0 1 0 1.4 1.4 1.4 1.4 0 0 0-1.4-1.4z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Research */}
          <div>
            <h3 className="text-xs font-mono font-bold text-navy uppercase tracking-wider mb-4">Research</h3>
            <ul className="space-y-2.5">
              {footerNav.research.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cyan-deep transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: AnswerSignal & Services */}
          <div>
            <h3 className="text-xs font-mono font-bold text-navy uppercase tracking-wider mb-4">AnswerSignal</h3>
            <ul className="space-y-2.5">
              {footerNav.answerSignal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cyan-deep transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
              {footerNav.services.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cyan-deep transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Resources */}
          <div>
            <h3 className="text-xs font-mono font-bold text-navy uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2.5">
              {footerNav.resources.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cyan-deep transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div>
            <h3 className="text-xs font-mono font-bold text-navy uppercase tracking-wider mb-4">Legal & Trust</h3>
            <ul className="space-y-2.5">
              {footerNav.legal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="hover:text-cyan-deep transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-line flex flex-col md:flex-row justify-between items-center text-xs text-muted">
          <p>© {new Date().getFullYear()} ASTONTO. All rights reserved.</p>
          <p className="mt-2 md:mt-0 font-mono text-[11px]">
            Black-box evaluation framework powered by PULSE Method v1.0.
          </p>
        </div>
      </div>
    </footer>
  );
}
