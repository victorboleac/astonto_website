export const pricing = {
  currency: "GBP",
  vatNotice: "+ VAT",
  check: {
    name: "20-Minute AI Visibility Check",
    price: 0,
    priceLabel: "Free",
    description: "See one verified example of how your business appears—or fails to appear—in an AI-generated buyer answer.",
    included: [
      "One commercially relevant buyer question",
      "One observed AI visibility finding",
      "Initial competitor context",
      "Assessment of whether a full audit is appropriate",
    ],
    ctaText: "Book your free visibility check",
    ctaHref: "/contact?service=check",
  },
  audit: {
    name: "24-Hour AI Visibility Audit",
    price: 950,
    vat: true,
    priceLabel: "£950 + VAT",
    billingLabel: "fixed fee",
    description: "Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business compared with four competitors.",
    included: [
      "Commercially relevant buyer-question testing",
      "Four AI platforms (ChatGPT, Perplexity, Gemini, AI Overviews)",
      "Your company and four competitors",
      "PULSE Benchmark and Platform Scores",
      "Appearance, recommendation strength and sentiment",
      "Competitor and source analysis",
      "Reputation Risks and factual inaccuracies",
      "Prioritised 90-day actions",
      "Live presentation of the findings",
    ],
    creditPolicy: "The £950 audit fee is credited in full when you begin a 90-Day Optimisation Sprint within 72 hours of the audit presentation.",
    disclaimer: "The PULSE Score reflects observed performance during the documented testing period. AI-generated answers change, and future visibility cannot be guaranteed.",
    commercialTerms: [
      "100% payment before testing begins.",
      "Delivered within 24 hours after required company, market and competitor information is provided.",
      "One location, one language and four agreed competitors.",
      "Presented live.",
      "Audit credit expires 72 hours after presentation.",
    ],
    ctaText: "Book your AI Visibility Audit",
    ctaHref: "/contact?service=audit",
  },
  sprint: {
    name: "90-Day AI Visibility Optimisation Sprint",
    price: 6000,
    vat: true,
    priceLabel: "£6,000 + VAT",
    monthlyOption: "or three monthly payments of £2,000 + VAT",
    billingLabel: "project or £2,000/mo payment plan",
    description: "Turn the audit findings into a coordinated programme of technical, content, authority and monitoring improvements.",
    included: [
      "Agreed PULSE baseline",
      "Entity and technical clarity improvements",
      "Structured data and factual consistency",
      "Answer-ready service and comparison content",
      "Evidence, expertise and case-study improvements",
      "Third-party authority and citation actions",
      "Competitor-gap actions",
      "Priority prompt retesting",
      "Day-30, day-60 and final reviews",
      "Final PULSE retest and handover plan",
    ],
    disclaimer: "The exact scope, client dependencies and implementation responsibilities are agreed before the sprint begins. Outcomes are measured through repeat testing, but rankings, citations and PULSE Score improvements are not guaranteed.",
    commercialTerms: [
      "£6,000 + VAT total (or 3 monthly payments of £2,000 + VAT).",
      "Either £2,000 before commencement and £2,000 at start of months 2 and 3, or 50% upfront, 25% day 30, 25% day 60.",
      "Work begins after payment, access and named client owners are confirmed.",
      "Unused work does not roll into unrelated services.",
      "External media, development, paid placements and third-party software excluded unless quoted separately.",
    ],
    scopeBoundaries: {
      included: [
        "One business entity",
        "One principal market or location",
        "One language",
        "Up to four competitors",
        "Agreed number of priority services",
        "Agreed website and content actions",
        "Reasonable implementation support",
      ],
      quotedSeparately: [
        "Multiple countries or languages",
        "Several brands or websites",
        "Extensive development work",
        "Large content production requirements",
        "PR campaigns or paid placements",
        "Ecommerce catalogues",
        "Regulated or legally sensitive sectors requiring specialist review",
      ],
    },
    ctaText: "Discuss a 90-Day Sprint",
    ctaHref: "/contact?service=sprint",
  },
  monitoring: {
    name: "AI Visibility Monitoring",
    priceFrom: 350,
    vat: true,
    priceLabel: "From £350 + VAT per month",
    billingLabel: "per month",
    positioning: "Available following an audit or sprint as an optional continuation.",
    description: "Ongoing monthly tracking of priority prompts, competitor movements, and AI model update impacts.",
    included: [
      "Scheduled priority-prompt retesting",
      "Platform-level visibility tracking",
      "Competitor movement checks",
      "Recommendation and sentiment alerts",
      "Factual-error and Reputation Risk alerts",
      "Concise monthly findings and next actions",
    ],
    ctaText: "Enquire about Monitoring",
    ctaHref: "/contact?service=monitoring",
  },
};

export function formatPrice(amount: number | null, prefix = ""): string {
  if (amount === 0) return "Free";
  if (amount === null || amount === undefined) {
    return "Price confirmed after scope";
  }
  const formatted = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: pricing.currency,
    maximumFractionDigits: 0,
  }).format(amount);
  const withVat = `${formatted} + VAT`;
  return prefix ? `${prefix} ${withVat}` : withVat;
}
