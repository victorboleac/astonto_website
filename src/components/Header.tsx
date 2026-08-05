"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { headerNav, primaryCTA } from "@config/navigation";
import { Menu, X } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 bg-surface/95 backdrop-blur-md border-b border-line ${
        scrolled ? "py-3 shadow-sm" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-8 h-8 rounded bg-navy flex items-center justify-center group-hover:bg-navy-deep transition-colors">
              <svg className="w-4 h-4" viewBox="0 0 32 32" fill="none">
                <path d="M16 7L7.5 23.5H12L16 15.5L20 23.5H24.5L16 7Z" fill="#12C6DF" />
              </svg>
            </div>
            <span className="text-lg font-extrabold tracking-widest text-navy">ASTONTO</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-7">
            {headerNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs font-semibold text-ink-soft hover:text-navy transition-colors relative group py-1"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Navy Button CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={primaryCTA.href}
              className="px-5 py-2.5 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-xs transition-all shadow-sm"
            >
              {primaryCTA.label}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-navy hover:bg-surface-soft focus:outline-none"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-line px-4 pt-4 pb-6 space-y-3 mt-3">
          {headerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-semibold text-ink hover:text-cyan-deep px-3 py-2 rounded-md hover:bg-surface-soft"
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-line">
            <Link
              href={primaryCTA.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full px-5 py-3 rounded-lg bg-navy text-white font-bold text-sm"
            >
              {primaryCTA.label}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
