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

## 2. AnswerSignal Product & Methodology

AnswerSignal is ASTONTO's applied AI Search Visibility service. It measures how AI platforms recommend a company compared with four selected competitors using the PULSE Method v1.0.

Core Formula:
Prompt Result Score = Position Factor × Recommendation Factor × Sentiment Factor

Reliability Levels: High, Medium, Indicative.

---

## 3. Official Services & Public Pricing Structure

- 20-Minute AI Visibility Check: Free
- 24-Hour AI Visibility Audit: ${formatPrice(pricing.audit.price)} (${pricing.audit.billingLabel})
- 90-Day AI Visibility Optimisation Sprint: ${formatPrice(pricing.sprint.price)} (${pricing.sprint.monthlyOption})
- AI Visibility Monitoring: ${formatPrice(pricing.monitoring.priceFrom, "From")} (${pricing.monitoring.billingLabel})

---

## 4. Approved FAQ Knowledge Base

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

## 5. Official Canonical Links

- Home: ${siteConfig.url}/
- Research: ${siteConfig.url}/research
- AnswerSignal: ${siteConfig.url}/answer-signal
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
