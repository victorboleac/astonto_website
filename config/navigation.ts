export interface NavItem {
  label: string;
  href: string;
}

export const headerNav: NavItem[] = [
  { label: "Research", href: "/research" },
  { label: "AnswerSignal", href: "/answer-signal" },
  { label: "PULSE Method", href: "/pulse-method" },
  { label: "Services", href: "/services/ai-visibility-audit" },
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const primaryCTA = {
  label: "Book a 20-minute check",
  href: "/contact?service=check",
};

export const footerNav = {
  astonto: [
    { label: "About ASTONTO", href: "/about" },
    { label: "Research Focus", href: "/research" },
    { label: "Ethics & Independence", href: "/research#ethics" },
    { label: "Contact Us", href: "/contact" },
  ],
  research: [
    { label: "Research Overview", href: "/research" },
    { label: "PULSE Methodology", href: "/pulse-method" },
    { label: "Educational Notes", href: "/resources" },
    { label: "Citation Policy", href: "/research#citation" },
  ],
  answerSignal: [
    { label: "AnswerSignal Overview", href: "/answer-signal" },
    { label: "PULSE Score", href: "/pulse-method" },
    { label: "Supported AI Platforms", href: "/answer-signal#platforms" },
    { label: "Competitor Benchmarking", href: "/answer-signal#competitors" },
  ],
  services: [
    { label: "24-Hour AI Visibility Audit", href: "/services/ai-visibility-audit" },
    { label: "90-Day Optimisation Sprint", href: "/services/90-day-optimisation-sprint" },
    { label: "AI Visibility Monitoring", href: "/services/monitoring" },
    { label: "Pricing", href: "/pricing" },
  ],
  resources: [
    { label: "Resource Centre", href: "/resources" },
    { label: "Industry Guides", href: "/industries" },
    { label: "Comparisons Hub", href: "/compare" },
    { label: "FAQ", href: "/faq" },
  ],
  legal: [
    { label: "Privacy Notice", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Terms of Use", href: "/terms" },
    { label: "Accessibility Statement", href: "/accessibility" },
  ],
};
