import fs from "fs";
import path from "path";
import { faqItems } from "../content/faqData";
import { siteConfig } from "../config/site";
import { pricing, formatPrice } from "../config/pricing";

function generateLlmsFull() {
  const timestamp = new Date().toISOString();

  const content = `# ASTONTO — Consolidated AI Discovery Documentation

*Generated at: ${timestamp}*
*Canonical Site URL: ${siteConfig.url}*

---

## 1. Company Overview

${siteConfig.description}

ASTONTO studies the observable behaviour of large language models and AI recommendation systems through controlled black-box evaluation of publicly accessible outputs across ChatGPT, Perplexity, Gemini, and Google AI Overviews.

Address: ${siteConfig.address.fullAddress}
Telephone: ${siteConfig.contact.telephone}
LinkedIn: ${siteConfig.social.linkedin}

---

## 2. ASTONTO AI Search Visibility Services & Methodology

ASTONTO AI Search Visibility measures how AI platforms recommend a company compared with four selected competitors using the PULSE Method v1.0.

Core Formula:
Prompt Result Score = Position Factor × Recommendation Factor × Sentiment Factor

Reliability Levels: High, Medium, Indicative.

---

## 3. Industry Research Studies

### How AI Recommends Managed IT Providers in Greater Manchester
- URL: ${siteConfig.url}/research/ai-visibility-managed-it-greater-manchester
- Executive Summary: ASTONTO study analysing 144 observed AI answers across ChatGPT, Perplexity, Gemini and Google AI Overviews for 12 commercial buyer questions. The study revealed that AI recommendation visibility in Greater Manchester is highly concentrated and platform-dependent.
- Methodology: PULSE Method v1.0 (12 buyer prompts × 4 platforms × 3 repeated runs).
- Reliability: Indicative (fewer than 50 unique prompts).
- Selected 5-Company Benchmark Results:
  1. Apex Computing Services: Benchmark 33.56 | Share of Voice 43.47% | Appearance 50.00%
  2. BCN Group: Benchmark 16.48 | Share of Voice 21.34% | Appearance 29.17%
  3. Foresight IT Services: Benchmark 15.16 | Share of Voice 19.64% | Appearance 27.08%
  4. NetMonkeys: Benchmark 7.21 | Share of Voice 9.34% | Appearance 15.97%
  5. Manchester IT: Benchmark 4.80 | Share of Voice 6.21% | Appearance 9.03%
- Limitations: Measures observed AI recommendation behaviour within tested parameters; does not measure real-world service quality, customer satisfaction, or internal model weights.

---

## 4. Official Services & Public Pricing Structure

- 20-Minute AI Visibility Check: Free
- 24-Hour AI Visibility Audit: ${formatPrice(pricing.audit.price)} (${pricing.audit.billingLabel})
- 90-Day AI Visibility Optimisation Sprint: ${formatPrice(pricing.sprint.price)} (${pricing.sprint.monthlyOption})
- AI Visibility Monitoring: ${formatPrice(pricing.monitoring.priceFrom, "From")} (${pricing.monitoring.billingLabel})

---

## 5. Approved FAQ Knowledge Base

${faqItems
  .map(
    (item, idx) => `
### Q${idx + 1}: ${item.question}
Category: ${item.category}
Answer: ${item.answer}
`
  )
  .join("\n")}

---

## 6. Official Canonical Links

- Home: ${siteConfig.url}/
- Research: ${siteConfig.url}/research
- AI Search Visibility: ${siteConfig.url}/ai-search-visibility
- PULSE Method: ${siteConfig.url}/pulse-method
- Audit Service: ${siteConfig.url}/services/ai-visibility-audit
- Sprint Service: ${siteConfig.url}/services/90-day-optimisation-sprint
- Monitoring: ${siteConfig.url}/services/monitoring
- Pricing: ${siteConfig.url}/pricing
- FAQ: ${siteConfig.url}/faq
- About: ${siteConfig.url}/about
- Contact: ${siteConfig.url}/contact
- Privacy Notice: ${siteConfig.url}/privacy
- Cookie Policy: ${siteConfig.url}/cookies
- Terms of Use: ${siteConfig.url}/terms
- Accessibility Statement: ${siteConfig.url}/accessibility
`;

  const outputPath = path.join(process.cwd(), "public", "llms-full.txt");
  fs.writeFileSync(outputPath, content.trim(), "utf8");
  console.log(`Successfully generated public/llms-full.txt (${content.length} bytes)`);
}

generateLlmsFull();
