/**
 * ASTONTO Industry Research Data Store
 * Study: How AI Recommends Managed IT Providers in Greater Manchester
 *
 * PUBLICATION GATE — VICTOR APPROVAL REQUIRED
 * The workbook contains automated first-pass findings pending final manual review.
 * Set `publicationStatus: "published"` once Victor approves the final findings.
 */

export type PublicationStatus = "draft" | "published";

export interface BenchmarkCompany {
  name: string;
  chatgpt: number;
  perplexity: number;
  gemini: number;
  googleAIOverviews: number;
  pulseBenchmark: number;
  appearanceRate: string;
  pulseShareOfVoice: string;
  interpretation: string;
}

export interface ExtractedCompany {
  name: string;
  pulseScore: number;
  mentions: string;
  distinctPrompts: string;
  platformCoverage: string;
  observedPlatforms: string[];
  observation: string;
}

export interface BuyerPrompt {
  id: number;
  prompt: string;
  category: "HIGH-INTENT RECOMMENDATION" | "SERVICE SELECTION" | "PROBLEM SOLVING";
  focus: string;
}

export interface ReportFAQ {
  question: string;
  answer: string;
}

export interface ResearchReportData {
  slug: string;
  title: string;
  subtitle: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle: string;
  ogDescription: string;
  reportVersion: string;
  methodologyVersion: string;
  dataStatus: string;
  publicationStatus: PublicationStatus;
  publishedAt: string;
  modifiedAt: string;
  author: string;
  reviewer: string;
  market: string;
  location: string;
  language: string;
  testingPeriod: string;
  promptCount: number;
  platformCount: number;
  runsPerPlatform: number;
  responseCount: number;
  platforms: string[];
  reliability: "Indicative" | "Medium" | "High";
  reliabilityNote: string;
  fiveCompanyBenchmark: BenchmarkCompany[];
  extractedCompanies: ExtractedCompany[];
  prompts: BuyerPrompt[];
  faqs: ReportFAQ[];
  citation: string;
  disclaimer: string;
}

// PUBLICATION GATE — VICTOR APPROVAL REQUIRED
// Default is "draft". Change to "published" after Victor approves public release.
export const PUBLICATION_STATUS: PublicationStatus = "draft";

export const reportData: ResearchReportData = {
  slug: "ai-visibility-managed-it-greater-manchester",
  title: "How AI Recommends Managed IT Providers in Greater Manchester",
  subtitle: "An ASTONTO study of 12 commercial buyer questions across ChatGPT, Perplexity, Gemini and Google AI Overviews",
  metaTitle: "AI Visibility of Managed IT Providers in Greater Manchester | ASTONTO Research",
  metaDescription: "ASTONTO analysed 144 AI answers across ChatGPT, Perplexity, Gemini and Google AI Overviews to see how managed IT providers in Greater Manchester are recommended.",
  ogTitle: "How AI Recommends Managed IT Providers in Greater Manchester",
  ogDescription: "12 buyer questions. Four AI platforms. Three repeated runs. See ASTONTO's Indicative PULSE benchmark for managed IT providers in Greater Manchester.",
  reportVersion: "1.0",
  methodologyVersion: "PULSE Method v1.0",
  dataStatus: "Automated first pass / Pending final review",
  publicationStatus: PUBLICATION_STATUS,
  publishedAt: "2026-08-01",
  modifiedAt: "2026-08-01",
  author: "ASTONTO Research",
  reviewer: "Victor Boleac",
  market: "Managed IT providers",
  location: "Greater Manchester, United Kingdom",
  language: "English",
  testingPeriod: "1 August 2026",
  promptCount: 12,
  platformCount: 4,
  runsPerPlatform: 3,
  responseCount: 144,
  platforms: ["ChatGPT", "Perplexity", "Gemini", "Google AI Overviews"],
  reliability: "Indicative",
  reliabilityNote: "This study used 12 unique buyer questions, three repeated runs and all four target AI platforms. Under PULSE Method v1.0, studies containing fewer than 50 unique prompts are classified as Indicative. The findings therefore describe the observed test set and testing period. They should not be interpreted as a definitive assessment of any provider's overall AI visibility.",
  fiveCompanyBenchmark: [
    {
      name: "Apex Computing Services",
      chatgpt: 36.88,
      perplexity: 31.80,
      gemini: 24.57,
      googleAIOverviews: 40.97,
      pulseBenchmark: 33.56,
      appearanceRate: "50.00%",
      pulseShareOfVoice: "43.47%",
      interpretation: "Apex showed relatively broad visibility across all four tested platforms in this study, achieving its highest score on Google AI Overviews."
    },
    {
      name: "BCN Group",
      chatgpt: 7.77,
      perplexity: 21.74,
      gemini: 8.13,
      googleAIOverviews: 28.27,
      pulseBenchmark: 16.48,
      appearanceRate: "29.17%",
      pulseShareOfVoice: "21.34%",
      interpretation: "BCN's visibility was substantially stronger on Perplexity and Google AI Overviews than on ChatGPT or Gemini within this test."
    },
    {
      name: "Foresight IT Services",
      chatgpt: 27.10,
      perplexity: 10.92,
      gemini: 4.18,
      googleAIOverviews: 18.45,
      pulseBenchmark: 15.16,
      appearanceRate: "27.08%",
      pulseShareOfVoice: "19.64%",
      interpretation: "Foresight IT Services recorded strong representation on ChatGPT and Google AI Overviews, but comparatively lower presence on Gemini."
    },
    {
      name: "NetMonkeys",
      chatgpt: 5.92,
      perplexity: 7.40,
      gemini: 3.44,
      googleAIOverviews: 12.09,
      pulseBenchmark: 7.21,
      appearanceRate: "15.97%",
      pulseShareOfVoice: "9.34%",
      interpretation: "NetMonkeys registered moderate recommendations on Google AI Overviews and Perplexity, but lower overall visibility across the prompt set."
    },
    {
      name: "Manchester IT",
      chatgpt: 16.87,
      perplexity: 0.00,
      gemini: 2.32,
      googleAIOverviews: 0.00,
      pulseBenchmark: 4.80,
      appearanceRate: "9.03%",
      pulseShareOfVoice: "6.21%",
      interpretation: "Manchester IT appeared materially stronger on ChatGPT than on the other tested systems and recorded no measured PULSE points on Perplexity or Google AI Overviews within this prompt set."
    }
  ],
  extractedCompanies: [
    {
      name: "Everything Tech",
      pulseScore: 14.87,
      mentions: "33 of 144 responses",
      distinctPrompts: "8 of 12",
      platformCoverage: "3 of 4",
      observedPlatforms: ["Perplexity", "Gemini", "Google AI Overviews"],
      observation: "Demonstrated consistent presence across Perplexity, Gemini, and Google AI Overviews, but recorded no direct appearances on ChatGPT in the extracted first-pass results."
    },
    {
      name: "AAG IT Services",
      pulseScore: 10.95,
      mentions: "28 of 144 responses",
      distinctPrompts: "9 of 12",
      platformCoverage: "4 of 4",
      observedPlatforms: ["ChatGPT", "Perplexity", "Gemini", "Google AI Overviews"],
      observation: "Achieved broad four-platform coverage across distinct service prompts, demonstrating balanced entity recognition."
    }
  ],
  prompts: [
    {
      id: 1,
      prompt: "What are the best managed IT providers for SMEs in Greater Manchester?",
      category: "HIGH-INTENT RECOMMENDATION",
      focus: "General MSP selection"
    },
    {
      id: 2,
      prompt: "Which outsourced IT support companies in Greater Manchester are best for a business with 20 to 100 employees?",
      category: "HIGH-INTENT RECOMMENDATION",
      focus: "Outsourced IT support"
    },
    {
      id: 3,
      prompt: "Who are the best Microsoft 365 migration partners for SMEs in Greater Manchester?",
      category: "HIGH-INTENT RECOMMENDATION",
      focus: "Microsoft 365 migration"
    },
    {
      id: 4,
      prompt: "Which Greater Manchester IT support providers are strongest for cyber security as well as day-to-day IT support?",
      category: "HIGH-INTENT RECOMMENDATION",
      focus: "Cyber security + IT support"
    },
    {
      id: 5,
      prompt: "Who can help an SME in Greater Manchester prepare for and achieve Cyber Essentials certification?",
      category: "SERVICE SELECTION",
      focus: "Cyber Essentials"
    },
    {
      id: 6,
      prompt: "Which managed IT providers in Greater Manchester offer 24/7 monitoring and a responsive helpdesk for SMEs?",
      category: "SERVICE SELECTION",
      focus: "24/7 monitoring / helpdesk"
    },
    {
      id: 7,
      prompt: "What are the best IT support companies in Greater Manchester for professional services firms?",
      category: "HIGH-INTENT RECOMMENDATION",
      focus: "Professional services IT support"
    },
    {
      id: 8,
      prompt: "Which Greater Manchester IT providers can secure and support a hybrid workforce using Microsoft 365?",
      category: "SERVICE SELECTION",
      focus: "Hybrid workforce"
    },
    {
      id: 9,
      prompt: "Who can migrate a Greater Manchester SME from on-premise servers to the cloud with minimal disruption?",
      category: "SERVICE SELECTION",
      focus: "Cloud migration"
    },
    {
      id: 10,
      prompt: "Which IT support providers in Greater Manchester offer managed backup and disaster recovery for SMEs?",
      category: "SERVICE SELECTION",
      focus: "Backup & disaster recovery"
    },
    {
      id: 11,
      prompt: "How much should a 50-person business in Greater Manchester expect to pay for outsourced IT support?",
      category: "PROBLEM SOLVING",
      focus: "Pricing & budgeting"
    },
    {
      id: 12,
      prompt: "What should an SME look for when choosing a managed IT provider in Greater Manchester?",
      category: "PROBLEM SOLVING",
      focus: "Provider selection criteria"
    }
  ],
  faqs: [
    {
      question: "What is AI Search Visibility?",
      answer: "AI Search Visibility describes how an organisation appears, is represented and is recommended within AI-powered search and answer systems."
    },
    {
      question: "Which AI platforms did ASTONTO test?",
      answer: "This study tested ChatGPT, Perplexity, Gemini and Google AI Overviews."
    },
    {
      question: "How many AI answers were analysed?",
      answer: "ASTONTO captured 144 responses: 12 buyer questions × four platforms × three repeated runs."
    },
    {
      question: "Which managed IT provider ranked highest in the study?",
      answer: "Within the selected five-company set, Apex Computing Services recorded the highest Indicative PULSE Benchmark Score at 33.56. This is an indicative benchmark of observable recommendation visibility within this specific test set, not a definitive market ranking."
    },
    {
      question: "Does this mean Apex is the best IT provider in Greater Manchester?",
      answer: "No. The study measures observed AI recommendation visibility, not service quality, customer satisfaction or real-world market performance."
    },
    {
      question: "Why is the study labelled Indicative?",
      answer: "PULSE Method v1.0 classifies a study with fewer than 50 unique prompts as Indicative. This study used 12 prompts."
    },
    {
      question: "Can AI recommendations change?",
      answer: "Yes. AI-generated answers vary and can change between runs, platforms and time periods."
    },
    {
      question: "Does ASTONTO know how ChatGPT or Gemini internally ranks companies?",
      answer: "No. ASTONTO analyses observable outputs. It does not claim access to proprietary algorithms, source code or model weights."
    },
    {
      question: "What is the PULSE Score?",
      answer: "PULSE is ASTONTO's evidence-based framework for measuring how organisations appear and are recommended across AI platforms."
    },
    {
      question: "Can a company improve its AI Search Visibility?",
      answer: "ASTONTO can identify gaps in entity clarity, content, evidence, authority, citations and other observable signals, then test changes over time. Improvement cannot be guaranteed because AI systems are controlled by third parties and change continuously."
    }
  ],
  citation: 'ASTONTO (2026), "How AI Recommends Managed IT Providers in Greater Manchester", ASTONTO Industry Research, PULSE Method v1.0, testing completed 1 August 2026.',
  disclaimer: "Company and product names are the property of their respective owners. Inclusion in this research does not imply endorsement, affiliation or partnership."
};
