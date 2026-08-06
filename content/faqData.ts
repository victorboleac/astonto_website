export interface FAQItem {
  id: string;
  category: "ASTONTO" | "AI Search Visibility" | "PULSE" | "Services and pricing";
  question: string;
  answer: string;
}

export const faqItems: FAQItem[] = [
  // ASTONTO
  {
    id: "q1",
    category: "ASTONTO",
    question: "What is ASTONTO?",
    answer: "ASTONTO is an independent AI research company that studies the observable behaviour of large language models and AI recommendation systems."
  },
  {
    id: "q2",
    category: "ASTONTO",
    question: "What does ASTONTO research?",
    answer: "ASTONTO researches how AI platforms interpret corporate information, resolve entity identity, select citation sources, compare alternatives, and generate brand recommendations across platforms, locations, and languages."
  },
  {
    id: "q3",
    category: "ASTONTO",
    question: "Is ASTONTO an AI Search Visibility agency?",
    answer: "ASTONTO is an independent research company. ASTONTO AI Search Visibility is our applied commercial service that provides empirical AI Search Visibility audits, optimisation sprints and monitoring for corporate clients."
  },
  {
    id: "q4",
    category: "ASTONTO",
    question: "What is black-box AI evaluation?",
    answer: "Black-box AI evaluation is the scientific observation of publicly accessible AI outputs under controlled prompt conditions, measuring real-world model responses without claiming internal access to proprietary code or weights."
  },
  {
    id: "q5",
    category: "ASTONTO",
    question: "Does ASTONTO have access to AI model source code or weights?",
    answer: "No. ASTONTO evaluates observable outputs from public and enterprise interfaces. We do not claim access to proprietary model weights, hidden ranking algorithms, or undisclosed vendor update schedules."
  },
  {
    id: "q6",
    category: "ASTONTO",
    question: "How does ASTONTO preserve research independence?",
    answer: "ASTONTO enforces strict methodology controls, preserves verbatim output logs, and refuses commercial arrangements that mandate specific research findings or ranking outcomes."
  },

  // AI Search Visibility
  {
    id: "q7",
    category: "AI Search Visibility",
    question: "What is ASTONTO AI Search Visibility?",
    answer: "ASTONTO AI Search Visibility is our evidence-based audit, optimisation and monitoring service. It measures how businesses are recommended across ChatGPT, Perplexity, Gemini and Google AI Overviews using the PULSE Method."
  },
  {
    id: "q8",
    category: "AI Search Visibility",
    question: "What is AI Search Visibility?",
    answer: "AI Search Visibility is the degree to which an organisation is accurately cited, prominently positioned, and positively recommended by generative AI engines when prospects ask commercial buyer queries."
  },
  {
    id: "q9",
    category: "AI Search Visibility",
    question: "Which AI platforms are evaluated?",
    answer: "ASTONTO evaluates ChatGPT (OpenAI), Perplexity, Gemini (Google), and Google AI Overviews."
  },
  {
    id: "q10",
    category: "AI Search Visibility",
    question: "What is the difference between an AI mention and an AI recommendation?",
    answer: "An AI mention occurs whenever a brand name appears in an answer. An AI recommendation occurs when the AI engine explicitly endorses the company as a preferred solution for a specific buyer context."
  },
  {
    id: "q11",
    category: "AI Search Visibility",
    question: "Why might a market-leading company be absent from AI recommendations?",
    answer: "AI engines rely on clear entity resolution, structured data, and third-party citation density. Market leaders with weak digital entity signals or fragmented third-party references are often omitted by LLMs."
  },
  {
    id: "q12",
    category: "AI Search Visibility",
    question: "Can ASTONTO guarantee that an AI platform will recommend my company?",
    answer: "No. Commercial AI engines operate non-deterministically. ASTONTO identifies visibility gaps and implements evidence-based improvements, but does not guarantee future AI recommendation outcomes."
  },
  {
    id: "q13",
    category: "AI Search Visibility",
    question: "How are competitors chosen for evaluation?",
    answer: "Competitors are selected during audit scoping based on direct commercial overlap, geographic market rivalry, and buyer evaluation context."
  },
  {
    id: "q14",
    category: "AI Search Visibility",
    question: "Why do results vary by platform, location and language?",
    answer: "AI platforms draw from different index sources, user IP geolocations, and linguistic models, resulting in distinct vendor recommendations across geographic markets."
  },
  {
    id: "q15",
    category: "AI Search Visibility",
    question: "How often should AI visibility be tested?",
    answer: "Because commercial LLMs update continuously, baseline benchmarking should be performed quarterly, supported by ongoing monthly monitoring for high-value buyer prompts."
  },

  // PULSE
  {
    id: "q16",
    category: "PULSE",
    question: "What is the PULSE Method?",
    answer: "The PULSE Method is ASTONTO's proprietary framework for calculating multi-platform AI recommendation visibility, prominence, sentiment, and competitor performance."
  },
  {
    id: "q17",
    category: "PULSE",
    question: "What does a PULSE Score measure?",
    answer: "A PULSE Score measures observed AI recommendation strength across position, endorsement classification, sentiment, and prompt importance."
  },
  {
    id: "q18",
    category: "PULSE",
    question: "What is PULSE Reliability?",
    answer: "PULSE Reliability indicates statistical confidence based on prompt volume, repeat test runs, platform coverage, and testing duration (High, Medium, or Indicative)."
  },
  {
    id: "q19",
    category: "PULSE",
    question: "What is a PULSE Benchmark Score?",
    answer: "A PULSE Benchmark Score establishes an organisation's baseline AI visibility score at the start of an audit or optimisation sprint."
  },
  {
    id: "q20",
    category: "PULSE",
    question: "What is a PULSE Market Score?",
    answer: "A PULSE Market Score measures visibility across a defined geographic or sector market segment."
  },
  {
    id: "q21",
    category: "PULSE",
    question: "What is PULSE Share of Voice?",
    answer: "PULSE Share of Voice measures your company's relative visibility and recommendation win rate compared with four selected competitors."
  },
  {
    id: "q22",
    category: "PULSE",
    question: "How are negative recommendations handled?",
    answer: "Negative sentiment, hallucinated errors, or cautionary disclaimers reduce the Sentiment Factor in the PULSE formula and are flagged as Reputation Risks."
  },
  {
    id: "q23",
    category: "PULSE",
    question: "Why are repeated runs required?",
    answer: "LLM outputs are stochastic. Running 5–10 iterations per prompt ensures reliable measurement of true underlying recommendation consistency."
  },

  // Services and pricing
  {
    id: "q24",
    category: "Services and pricing",
    question: "What is included in the 24-Hour AI Visibility Audit?",
    answer: "The audit evaluates your company plus four competitors across four AI platforms, delivering a PULSE Score, preserved evidence log, Reputation Risk analysis, and live presentation."
  },
  {
    id: "q25",
    category: "Services and pricing",
    question: "What is included in the 90-Day Optimisation Sprint?",
    answer: "The 90-day sprint includes entity and technical clarity fixes, answer-ready content expansion, third-party authority building, gap closure, and final retesting."
  },
  {
    id: "q26",
    category: "Services and pricing",
    question: "What can be improved during an AI visibility sprint?",
    answer: "Key improvements target entity schema resolution, answer-ready site content structure, third-party profile consistency, and authoritative industry citations."
  },
  {
    id: "q27",
    category: "Services and pricing",
    question: "How is pricing determined?",
    answer: "Pricing is calculated based on market scope, language requirements, prompt volume, and implementation depth. Live scope confirmation is provided before agreement."
  },
  {
    id: "q28",
    category: "Services and pricing",
    question: "Is the audit fee credited to the sprint?",
    answer: "Yes. The 24-Hour AI Visibility Audit fee is credited toward the 90-Day Optimisation Sprint when agreed within the approved timeframe."
  },
  {
    id: "q29",
    category: "Services and pricing",
    question: "What does monitoring include?",
    answer: "AI Visibility Monitoring tracks monthly PULSE Score movements, competitor overtakes, prompt changes, negative sentiment alerts, and LLM model updates."
  },
  {
    id: "q30",
    category: "Services and pricing",
    question: "What information is needed to begin?",
    answer: "To begin an audit, we require your corporate domain, primary geographic markets, key service offerings, and four selected market competitors."
  }
];
