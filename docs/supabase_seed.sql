-- ====================================================================
-- ASTONTO Website — Supabase Seed Data Migration Script
-- Run this script in your Supabase SQL Editor after running docs/supabase_schema.sql
-- ====================================================================

-- 1. Site Config
INSERT INTO site_config (key, value) VALUES
('name', '"ASTONTO"'),
('legalName', '"ASTONTO LTD"'),
('url', '"https://astonto.com"'),
('description', '"Independent AI research company studying the observable behaviour of large language models and AI recommendation systems. Creator of AnswerSignal."'),
('address', '{"street":"66 Paul Street","city":"London","postcode":"EC2A 4NA","country":"England","countryCode":"GB","fullAddress":"66 Paul Street, London, EC2A 4NA, England"}'),
('contact', '{"telephone":"+44 7845 580266","telephoneClean":"+447845580266","notificationEmail":"hello@astonto.com"}'),
('social', '{"linkedin":"https://www.linkedin.com/company/astonto/"}')
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();

-- 2. Pricing Tiers
INSERT INTO pricing_tiers (id, name, price, price_prefix, price_label, monthly_option, billing_label, best_fit, description, included, credit_policy, disclaimer, commercial_terms, scope_boundaries, cta_text, cta_href, highlighted, sort_order) VALUES
('check', '20-Minute AI Visibility Check', 0, '', 'Free', '', 'Free entry check', 'UK & EU SMEs evaluating AI visibility', 'See one verified example of how your business appears—or fails to appear—in an AI-generated buyer answer.', '["One commercially relevant buyer question","One observed AI visibility finding","Initial competitor context","Assessment of whether a full audit is appropriate"]'::jsonb, '', '', '[]'::jsonb, '{}'::jsonb, 'Book your free visibility check', '/contact?service=check', FALSE, 1),
('audit', '24-Hour AI Visibility Audit', 950, '', '£950 + VAT', '', 'fixed fee', 'Organisations requiring multi-platform baseline evidence', 'Understand how ChatGPT, Perplexity, Gemini and Google AI Overviews recommend your business compared with four competitors.', '["Commercially relevant buyer-question testing","Four AI platforms (ChatGPT, Perplexity, Gemini, AI Overviews)","Your company and four competitors","PULSE Benchmark and Platform Scores","Appearance, recommendation strength and sentiment","Competitor and source analysis","Reputation Risks and factual inaccuracies","Prioritised 90-day actions","Live presentation of the findings"]'::jsonb, 'The £950 audit fee is credited in full when you begin a 90-Day Optimisation Sprint within 72 hours of the audit presentation.', 'The PULSE Score reflects observed performance during the documented testing period. AI-generated answers change, and future visibility cannot be guaranteed.', '["100% payment before testing begins.","Delivered within 24 hours after required company, market and competitor information is provided.","One location, one language and four agreed competitors.","Presented live.","Audit credit expires 72 hours after presentation."]'::jsonb, '{}'::jsonb, 'Book your AI Visibility Audit', '/contact?service=audit', FALSE, 2),
('sprint', '90-Day AI Visibility Optimisation Sprint', 6000, '', '£6,000 + VAT', 'or three monthly payments of £2,000 + VAT', 'project or £2,000/mo payment plan', 'Organisations turning audit findings into active visibility', 'Turn the audit findings into a coordinated programme of technical, content, authority and monitoring improvements.', '["Agreed PULSE baseline","Entity and technical clarity improvements","Structured data and factual consistency","Answer-ready service and comparison content","Evidence, expertise and case-study improvements","Third-party authority and citation actions","Competitor-gap actions","Priority prompt retesting","Day-30, day-60 and final reviews","Final PULSE retest and handover plan"]'::jsonb, '', 'The exact scope, client dependencies and implementation responsibilities are agreed before the sprint begins. Outcomes are measured through repeat testing, but rankings, citations and PULSE Score improvements are not guaranteed.', '["£6,000 + VAT total (or 3 monthly payments of £2,000 + VAT).","Either £2,000 before commencement and £2,000 at start of months 2 and 3, or 50% upfront, 25% day 30, 25% day 60.","Work begins after payment, access and named client owners are confirmed.","Unused work does not roll into unrelated services.","External media, development, paid placements and third-party software excluded unless quoted separately."]'::jsonb, '{"included":["One business entity","One principal market or location","One language","Up to four competitors","Agreed number of priority services","Agreed website and content actions","Reasonable implementation support"],"quotedSeparately":["Multiple countries or languages","Several brands or websites","Extensive development work","Large content production requirements","PR campaigns or paid placements","Ecommerce catalogues","Regulated or legally sensitive sectors requiring specialist review"]}'::jsonb, 'Discuss a 90-Day Sprint', '/contact?service=sprint', TRUE, 3),
('monitoring', 'AI Visibility Monitoring', 350, 'From', 'From £350 + VAT per month', '', 'per month', 'Available following an audit or sprint as an optional continuation.', 'Ongoing monthly tracking of priority prompts, competitor movements, and AI model update impacts.', '["Scheduled priority-prompt retesting","Platform-level visibility tracking","Competitor movement checks","Recommendation and sentiment alerts","Factual-error and Reputation Risk alerts","Concise monthly findings and next actions"]'::jsonb, '', '', '[]'::jsonb, '{}'::jsonb, 'Enquire about Monitoring', '/contact?service=monitoring', FALSE, 4)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  price_prefix = EXCLUDED.price_prefix,
  price_label = EXCLUDED.price_label,
  monthly_option = EXCLUDED.monthly_option,
  billing_label = EXCLUDED.billing_label,
  best_fit = EXCLUDED.best_fit,
  description = EXCLUDED.description,
  included = EXCLUDED.included,
  credit_policy = EXCLUDED.credit_policy,
  disclaimer = EXCLUDED.disclaimer,
  commercial_terms = EXCLUDED.commercial_terms,
  scope_boundaries = EXCLUDED.scope_boundaries,
  cta_text = EXCLUDED.cta_text,
  cta_href = EXCLUDED.cta_href,
  highlighted = EXCLUDED.highlighted,
  updated_at = NOW();

-- 3. FAQs
INSERT INTO faqs (id, question, answer, category, sort_order, is_published) VALUES
('q1', 'What is ASTONTO?', 'ASTONTO is an independent AI research company that studies the observable behaviour of large language models and AI recommendation systems.', 'ASTONTO', 1, TRUE),
('q2', 'What does ASTONTO research?', 'ASTONTO researches how AI platforms interpret corporate information, resolve entity identity, select citation sources, compare alternatives, and generate brand recommendations across platforms, locations, and languages.', 'ASTONTO', 2, TRUE),
('q3', 'Is ASTONTO an AI Search Visibility agency?', 'ASTONTO is an independent research company. ASTONTO AI Search Visibility is our applied commercial service that provides empirical AI Search Visibility audits, optimisation sprints and monitoring for corporate clients.', 'ASTONTO', 3, TRUE),
('q4', 'What is black-box AI evaluation?', 'Black-box AI evaluation is the scientific observation of publicly accessible AI outputs under controlled prompt conditions, measuring real-world model responses without claiming internal access to proprietary code or weights.', 'ASTONTO', 4, TRUE),
('q5', 'Does ASTONTO have access to AI model source code or weights?', 'No. ASTONTO evaluates observable outputs from public and enterprise interfaces. We do not claim access to proprietary model weights, hidden ranking algorithms, or undisclosed vendor update schedules.', 'ASTONTO', 5, TRUE),
('q6', 'How does ASTONTO preserve research independence?', 'ASTONTO enforces strict methodology controls, preserves verbatim output logs, and refuses commercial arrangements that mandate specific research findings or ranking outcomes.', 'ASTONTO', 6, TRUE),
('q7', 'What is ASTONTO AI Search Visibility?', 'ASTONTO AI Search Visibility is our evidence-based audit, optimisation and monitoring service. It measures how businesses are recommended across ChatGPT, Perplexity, Gemini and Google AI Overviews using the PULSE Method.', 'AI Search Visibility', 7, TRUE),
('q8', 'What is AI Search Visibility?', 'AI Search Visibility is the degree to which an organisation is accurately cited, prominently positioned, and positively recommended by generative AI engines when prospects ask commercial buyer queries.', 'AI Search Visibility', 8, TRUE),
('q9', 'Which AI platforms are evaluated?', 'ASTONTO evaluates ChatGPT (OpenAI), Perplexity, Gemini (Google), and Google AI Overviews.', 'AI Search Visibility', 9, TRUE),
('q10', 'What is the difference between an AI mention and an AI recommendation?', 'An AI mention occurs whenever a brand name appears in an answer. An AI recommendation occurs when the AI engine explicitly endorses the company as a preferred solution for a specific buyer context.', 'AI Search Visibility', 10, TRUE),
('q11', 'Why might a market-leading company be absent from AI recommendations?', 'AI engines rely on clear entity resolution, structured data, and third-party citation density. Market leaders with weak digital entity signals or fragmented third-party references are often omitted by LLMs.', 'AI Search Visibility', 11, TRUE),
('q12', 'Can ASTONTO guarantee that an AI platform will recommend my company?', 'No. Commercial AI engines operate non-deterministically. ASTONTO identifies visibility gaps and implements evidence-based improvements, but does not guarantee future AI recommendation outcomes.', 'AI Search Visibility', 12, TRUE),
('q13', 'How are competitors chosen for evaluation?', 'Competitors are selected during audit scoping based on direct commercial overlap, geographic market rivalry, and buyer evaluation context.', 'AI Search Visibility', 13, TRUE),
('q14', 'Why do results vary by platform, location and language?', 'AI platforms draw from different index sources, user IP geolocations, and linguistic models, resulting in distinct vendor recommendations across geographic markets.', 'AI Search Visibility', 14, TRUE),
('q15', 'How often should AI visibility be tested?', 'Because commercial LLMs update continuously, baseline benchmarking should be performed quarterly, supported by ongoing monthly monitoring for high-value buyer prompts.', 'AI Search Visibility', 15, TRUE),
('q16', 'What is the PULSE Method?', 'The PULSE Method is ASTONTO''s proprietary framework for calculating multi-platform AI recommendation visibility, prominence, sentiment, and competitor performance.', 'PULSE', 16, TRUE),
('q17', 'What does a PULSE Score measure?', 'A PULSE Score measures observed AI recommendation strength across position, endorsement classification, sentiment, and prompt importance.', 'PULSE', 17, TRUE),
('q18', 'What is PULSE Reliability?', 'PULSE Reliability indicates statistical confidence based on prompt volume, repeat test runs, platform coverage, and testing duration (High, Medium, or Indicative).', 'PULSE', 18, TRUE),
('q19', 'What is a PULSE Benchmark Score?', 'A PULSE Benchmark Score establishes an organisation''s baseline AI visibility score at the start of an audit or optimisation sprint.', 'PULSE', 19, TRUE),
('q20', 'What is a PULSE Market Score?', 'A PULSE Market Score measures visibility across a defined geographic or sector market segment.', 'PULSE', 20, TRUE),
('q21', 'What is PULSE Share of Voice?', 'PULSE Share of Voice measures your company''s relative visibility and recommendation win rate compared with four selected competitors.', 'PULSE', 21, TRUE),
('q22', 'How are negative recommendations handled?', 'Negative sentiment, hallucinated errors, or cautionary disclaimers reduce the Sentiment Factor in the PULSE formula and are flagged as Reputation Risks.', 'PULSE', 22, TRUE),
('q23', 'Why are repeated runs required?', 'LLM outputs are stochastic. Running 5–10 iterations per prompt ensures reliable measurement of true underlying recommendation consistency.', 'PULSE', 23, TRUE),
('q24', 'What is included in the 24-Hour AI Visibility Audit?', 'The audit evaluates your company plus four competitors across four AI platforms, delivering a PULSE Score, preserved evidence log, Reputation Risk analysis, and live presentation.', 'Services and pricing', 24, TRUE),
('q25', 'What is included in the 90-Day Optimisation Sprint?', 'The 90-day sprint includes entity and technical clarity fixes, answer-ready content expansion, third-party authority building, gap closure, and final retesting.', 'Services and pricing', 25, TRUE),
('q26', 'What can be improved during an AI visibility sprint?', 'Key improvements target entity schema resolution, answer-ready site content structure, third-party profile consistency, and authoritative industry citations.', 'Services and pricing', 26, TRUE),
('q27', 'How is pricing determined?', 'Pricing is calculated based on market scope, language requirements, prompt volume, and implementation depth. Live scope confirmation is provided before agreement.', 'Services and pricing', 27, TRUE),
('q28', 'Is the audit fee credited to the sprint?', 'Yes. The 24-Hour AI Visibility Audit fee is credited toward the 90-Day Optimisation Sprint when agreed within the approved timeframe.', 'Services and pricing', 28, TRUE),
('q29', 'What does monitoring include?', 'AI Visibility Monitoring tracks monthly PULSE Score movements, competitor overtakes, prompt changes, negative sentiment alerts, and LLM model updates.', 'Services and pricing', 29, TRUE),
('q30', 'What information is needed to begin?', 'To begin an audit, we require your corporate domain, primary geographic markets, key service offerings, and four selected market competitors.', 'Services and pricing', 30, TRUE)
ON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, category = EXCLUDED.category, updated_at = NOW();

-- 4. Content Articles (Research, Resources, Industries, Comparisons)
INSERT INTO content_articles (slug, category_type, title, description, content_markdown, author, reviewer, status, published_at, reading_time, reliability, evidence_refs, noindex, category_label) VALUES
('black-box-ai-evaluation', 'research', 'Black-Box Evaluation of Observable AI Recommendation Behaviours', 'An overview of ASTONTO''s methodology for measuring how large language models and AI engines generate entity recommendations from public outputs.', '# Black-Box Evaluation of Observable AI Recommendation Behaviours

## Abstract

ASTONTO studies the observable behaviour of commercial large language models (LLMs) and generative search systems. Because commercial AI platform vendors do not publish real-time internal weights or ranking algorithms, empirical evaluation must rely on controlled black-box testing. This paper outlines our observational framework for evaluating entity citations, recommendation prominence, and comparative brand positioning across platforms.

## Research Question

How do public commercial AI engines (ChatGPT, Perplexity, Gemini, Google AI Overviews) select, describe, and recommend corporate entities when presented with explicit buyer evaluation queries?

## Methodology Scope

Our observational methodology (PULSE Method v1.0) isolates seven distinct dimensions of AI output behaviour:

1. **Information Interpretation:** How queries with implicit vs explicit buyer intent are parsed.
2. **Entity Representation:** Whether a company is recognized as a primary option, secondary option, or omitted entirely.
3. **Source Selection:** Which third-party domain citations ground the AI response.
4. **Comparison Behaviour:** How entities are pitted against four direct market competitors.
5. **Recommendation Formation:** The degree of endorsement (Strong, Neutral, Conditional, Negative).
6. **Geographic & Language Control:** Variations in response depending on query origin and language context.
7. **Temporal Consistency:** Stability of output across repeated evaluations (minimum 5-10 runs per prompt).

## Observational Limits & Ethics

- ASTONTO evaluates only publicly accessible outputs generated through standard consumer and enterprise interfaces.
- We make no claims of access to internal model weights, training corpora, or unreleased algorithm updates.
- All scores reflect empirical data observed within a documented testing window and prompt set.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '6 min read', 'High', '["ASTONTO Research Protocol v1.0"]'::jsonb, FALSE, 'Methodology'),
('ai-search-visibility-vs-seo', 'resources', 'AI Search Visibility vs SEO: What is Different and What Still Matters?', 'Comparing traditional search engine optimization with generative AI visibility.', '# AI Search Visibility vs SEO: What is Different and What Still Matters?

While traditional SEO focuses on keyword rankings and organic click-through rates on search result pages, AI Search Visibility evaluates synthesized model recommendations across multi-step buyer prompts.

## Key Differences

| Factor | Traditional SEO | AI Search Visibility |
| --- | --- | --- |
| Primary Goal | Rank #1 on SERP links | Be recommended in generative answers |
| Evaluation Unit | Individual keywords | Complex buyer intent prompts |
| Metrics | Organic Traffic, Impressions | PULSE Score, Share of Voice, Sentiment |', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-03', '6 min read', 'High', '[]'::jsonb, FALSE, 'Analysis'),
('how-structured-data-supports-machine-understanding', 'resources', 'How Structured Data Supports Machine Understanding Without Guaranteeing Visibility', 'The role of Schema.org JSON-LD in AI entity disambiguation.', '# How Structured Data Supports Machine Understanding

Structured data (JSON-LD) acts as a machine-readable blueprint for search crawlers and AI web scrapers.

## What JSON-LD Does

- Clarifies entity identity (`@id`, `@type: Organization`).
- Links corporate attributes (official address, telephone, canonical site).
- Reduces entity ambiguity across platforms.

## What JSON-LD Does Not Guarantee

Structured data alone does not guarantee AI recommendation or rich snippet inclusion. It ensures model comprehension, but recommendation algorithms evaluate broader authority signals.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '6 min read', 'High', '[]'::jsonb, FALSE, 'Technical'),
('how-to-audit-chatgpt-ai-recommendations', 'resources', 'How to Audit How ChatGPT and Other AI Platforms Recommend Your Business', 'Step-by-step auditing framework for commercial AI outputs.', '# How to Audit How ChatGPT and Other AI Platforms Recommend Your Business

Conducting a controlled audit of your company''s representation in ChatGPT, Perplexity, Gemini, and Google AI Overviews requires structured testing parameters.

## Audit Steps

1. **Define High-Intent Buyer Prompts:** Formulate 10–20 queries your prospects ask when evaluating vendors.
2. **Select 4 Direct Competitors:** Benchmark performance against four immediate market alternatives.
3. **Execute Repeated Runs:** Test each prompt 5+ times to account for model variability.
4. **Preserve Raw Evidence:** Log verbatim responses, position orders, and cited URLs.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '6 min read', 'High', '[]'::jsonb, FALSE, 'Auditing'),
('how-to-choose-an-ai-search-visibility-company', 'resources', 'How to Choose an AI Search Visibility Company', 'Key evaluation criteria for selecting an evidence-based AI visibility partner.', '# How to Choose an AI Search Visibility Company

Selecting a partner to audit and optimize your brand''s representation across AI engines requires distinguishing evidence-led evaluation from speculative SEO tactics.

## Red Flags to Avoid

- **Guaranteed AI Rankings:** No company has access to proprietary model weights or internal ranking factors. Any claim of guaranteed placement is unfounded.
- **Single-Run Testing:** AI outputs vary across repeated runs. Evaluators must test multiple iterations to measure consistency.
- **Generic Mention Counts:** Simply counting how many times your brand appears ignores recommendation strength and sentiment.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-02', '5 min read', 'High', '[]'::jsonb, FALSE, 'Buyer Guide'),
('how-to-compare-ai-visibility-with-competitors', 'resources', 'How to Compare Your AI Visibility with Competitors', 'Benchmarking PULSE Share of Voice against four market competitors.', '# How to Compare Your AI Visibility with Competitors

Measuring your company in isolation provides an incomplete picture. Comparative evaluation piting your brand against 4 direct competitors calculates your **PULSE Share of Voice**.

## Share of Voice Metrics

- **Appearance Rate:** Percentage of test runs in which your entity appears vs competitors.
- **Competitor Win Rate:** How often your entity occupies the #1 recommended position relative to rival brands.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '5 min read', 'High', '[]'::jsonb, FALSE, 'Benchmarking'),
('how-to-create-answer-ready-service-and-comparison-pages', 'resources', 'How to Create Answer-Ready Service and Comparison Pages', 'Designing corporate web pages for direct AI parsing and citation.', '# How to Create Answer-Ready Service and Comparison Pages

Creating "answer-ready" web pages involves structuring text so LLMs can quickly extract concise definitions and comparison facts.

## Design Rules

1. **Top-Line Definitions:** Place a clear 1-2 sentence summary immediately under the H1 heading.
2. **Tabular Comparisons:** Use markdown/HTML tables for features, pricing models, and service parameters.
3. **Transparent Limitations:** Disclose scope limits explicitly; models favor balanced, objective content over hyperbolic sales pitch copy.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '5 min read', 'High', '[]'::jsonb, FALSE, 'Content Strategy'),
('how-to-improve-company-visibility-in-ai-search', 'resources', 'How to Improve Your Company''s Visibility in AI Search', 'A guide for UK and EU business leaders on how large language models discover, parse, and recommend companies.', '# How to Improve Your Company''s Visibility in AI Search

AI search platforms like ChatGPT, Perplexity, Gemini, and Google AI Overviews do not rank web pages using traditional link-graph algorithms alone. Instead, they synthesize information from across structured data, verified directory profiles, industry publications, and third-party reviews to recommend solutions.

## 1. Establish Clear Entity Signals

AI systems rely on entity resolution to distinguish your company from similarly named entities. Ensure your corporate name, primary location, official website, and core services are consistent across:
- Structured JSON-LD schema on your official domain.
- Official corporate registry filings.
- Established industry listings and knowledge bases.

## 2. Publish Answer-Ready Content

Provide direct, unambiguous answers to common buyer questions. Use concise definitions near the top of pages and clear section headings (H2/H3) that address specific evaluation criteria.

## 3. Build Independent Third-Party Authority

LLMs heavily weight verified independent sources. Citations in trade media, accredited reviews, and peer comparisons significantly increase the probability of recommendation.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-02', '7 min read', 'High', '[]'::jsonb, FALSE, 'AI Visibility'),
('what-is-a-pulse-score', 'resources', 'What is a PULSE Score?', 'An overview of the PULSE Method scoring framework for AI Search Visibility.', '# What is a PULSE Score?

A PULSE Score is ASTONTO''s composite metric measuring observed AI recommendation visibility across platforms, prompts, competitors, locations, and languages.

## The Core Formula

```text
Prompt Result Score = Position Factor × Recommendation Factor × Sentiment Factor
```

Scores are aggregated to form Platform Scores, PULSE Benchmark Scores, and PULSE Market Scores.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '5 min read', 'High', '[]'::jsonb, FALSE, 'Methodology'),
('what-makes-a-company-citable-by-ai-systems', 'resources', 'What Makes a Company Citable by AI Systems?', 'Understanding citation patterns and source selection in LLMs.', '# What Makes a Company Citable by AI Systems?

AI models select citation sources based on factual clarity, domain authority, and structured entity alignment.

## Core Factors

1. **Information Density:** High ratio of verifiable facts per paragraph.
2. **Entity Consistency:** Consistent naming conventions across independent web domains.
3. **Structured Data Implementation:** Valid JSON-LD schema matching visible text.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-03', '6 min read', 'High', '[]'::jsonb, FALSE, 'Technical Research'),
('what-should-an-ai-visibility-audit-include', 'resources', 'What Should an AI Visibility Audit Include?', 'Core deliverables and findings expected in a professional AI visibility assessment.', '# What Should an AI Visibility Audit Include?

A rigorous AI visibility audit delivers empirical evidence, benchmarking, and actionable priorities.

## Key Audit Deliverables

1. **PULSE Benchmark Score:** Multi-platform baseline score.
2. **Platform Breakdown:** Performance across ChatGPT, Perplexity, Gemini, and Google AI Overviews.
3. **Competitor Comparison:** PULSE Share of Voice against 4 selected competitors.
4. **Reputation Risks:** Identification of hallucinated errors or negative sentiment.
5. **Preserved Evidence Log:** Full raw outputs and citation sources.
6. **Prioritised Action Plan:** 90-day roadmap targeting identified gaps.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '5 min read', 'High', '[]'::jsonb, FALSE, 'Auditing'),
('why-ai-mentions-are-not-recommendations', 'resources', 'Why AI Mentions Are Not the Same as Recommendations', 'Distinguishing brand presence from positive commercial endorsement in generative answers.', '# Why AI Mentions Are Not the Same as Recommendations

A company may appear in an AI platform''s response without receiving a recommendation.

## Recommendation Classes

- **Strong Recommendation:** Explicitly endorsed as a primary solution.
- **Neutral Mention:** Listed alongside competitors without distinction.
- **Conditional Endorsement:** Recommended only under specific constraints.
- **Negative / Risk Mention:** Cited with warnings, historical complaints, or caveats.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '5 min read', 'High', '[]'::jsonb, FALSE, 'Methodology'),
('why-ai-recommendations-vary-by-location-and-language', 'resources', 'Why AI Recommendations Vary by Location and Language', 'Analyzing geographic and linguistic bias in generative engine responses.', '# Why AI Recommendations Vary by Location and Language

AI platforms dynamically tailor answers based on user IP geolocation, language context, and localized search index references.

## Key Observations

- A London-based prompt yields different vendor choices than a Frankfurt-based prompt for identical English language queries.
- Language nuances change the entities selected; queries in German or French prioritize regional entity authority over global brands.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-04', '5 min read', 'High', '[]'::jsonb, FALSE, 'Research'),
('accountancy-firms', 'industries', 'AI Search Visibility for Accountancy & Tax Advisory', 'Measuring firm recommendations across corporate accounting prompts.', '# AI Search Visibility for Accountancy Firms

Corporate finance leaders use generative engines to research regional audit, tax advisory, and M&A accounting capabilities.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Industry'),
('b2b-consultancies', 'industries', 'AI Search Visibility for B2B Consultancies', 'Optimizing AI recommendation strength for management consultancies.', '# AI Search Visibility for B2B Consultancies

Management and strategy consultancies are evaluated by AI models based on published research, client tier alignment, and verified methodology citations.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Industry'),
('legal-services', 'industries', 'AI Search Visibility for Legal Services', 'How corporate clients research law firms using generative AI search.', '# AI Search Visibility for Legal Services

Generative AI platforms evaluate legal service entities based on practice area clarity, partner credentials, and regulatory jurisdiction matching.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Industry'),
('managed-it-services', 'industries', 'AI Search Visibility for Managed IT Services', 'How B2B buyers discover and evaluate MSPs through AI engines.', '# AI Search Visibility for Managed IT Services

Managed Service Providers (MSPs) rely on clear certification signals, security compliance facts, and localized response capabilities for AI discovery.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Industry'),
('professional-services', 'industries', 'AI Search Visibility for Professional Services', 'How buyers use AI platforms when evaluating UK and EU professional services firms.', '# AI Search Visibility for Professional Services

Buyers in professional services increasingly consult ChatGPT and Perplexity to generate vendor shortlists.

## How Buyers Prompt AI

Corporate buyers inquire about firm specialization, sector expertise, client size fit, and regional coverage. An AI visibility audit measures how your firm is cited across these evaluation parameters against 4 primary sector rivals.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Industry'),
('property-and-real-estate', 'industries', 'AI Search Visibility for Property & Real Estate Services', 'How commercial real estate advisory firms are parsed by AI models.', '# AI Search Visibility for Property & Real Estate Services

Commercial real estate brokerages and valuation consultancies require clear geographic entity mapping to ensure recommendations in regional market queries.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Industry'),
('ai-visibility-audit-vs-website-audit', 'comparisons', 'AI Search Visibility Audit vs Conventional Website Audit', 'Understanding the difference between technical site audits and LLM entity visibility audits.', '# AI Search Visibility Audit vs Conventional Website Audit

A conventional website audit checks technical site health, page speed, meta tags, and broken links. An AI Search Visibility Audit evaluates how AI platforms interpret, source, and recommend your company relative to direct market competitors.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Comparison'),
('ai-search-visibility-vs-traditional-seo-reporting', 'comparisons', 'AI Search Visibility vs Traditional SEO Reporting', 'Why traditional keyword rank tracking fails to measure AI search recommendations.', '# AI Search Visibility vs Traditional SEO Reporting

Traditional SEO reporting tools track rank position for static keywords on blue-link search engine result pages. ASTONTO AI Search Visibility measures multi-platform AI recommendations across complex buyer queries.

## Key Operational Differences

| Feature | Traditional SEO Reporting | ASTONTO AI Search Visibility |
| --- | --- | --- |
| Target Interface | Google / Bing SERP links | ChatGPT, Perplexity, Gemini, Google AI Overviews |
| Primary Metric | Organic Rank Position | PULSE Score, Share of Voice |
| Competitor Set | Top 10 SERP URLs | 4 Selected Strategic Competitors |
| Multi-Run Testing | Single page snapshot | Repeated run consistency testing |', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Comparison'),
('independent-research-vs-generic-ai-ranking-claims', 'comparisons', 'Independent Research Evaluation vs Generic AI Ranking Claims', 'Differentiating empirical black-box methodology from unverified agency promises.', '# Independent Research Evaluation vs Generic AI Ranking Claims

ASTONTO evaluates observable outputs without claiming access to proprietary model internals or guaranteeing future search outcomes.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Comparison'),
('managed-optimisation-sprint-vs-one-off-recommendations', 'comparisons', 'Managed Optimisation Sprint vs One-off Recommendations', 'Why structured 90-day implementation outperforms unexecuted audit reports.', '# Managed Optimisation Sprint vs One-off Recommendations

A 90-Day Optimisation Sprint pairs audit findings with hands-on execution across entity clarity, answer-ready content, and third-party authority building.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Comparison'),
('named-competitor-template', 'comparisons', 'ASTONTO AI Search Visibility vs [Competitor Name] (Template)', 'Neutral comparison template for evaluated AI search reporting tools.', '# ASTONTO AI Search Visibility vs [Competitor Name]

*Template under methodology review. Excluded from public sitemaps.*

## Neutral Offer Overview

- **ASTONTO AI Search Visibility:** Independent AI Search Visibility benchmarking based on empirical black-box testing (PULSE Method).
- **[Competitor Name]:** [Neutral summary derived exclusively from published sources].

## Comparison Date & Criteria

Comparison date: [Date]. Criteria evaluated include multi-platform coverage, prompt volume, competitor benchmarking, and evidence preservation.', 'ASTONTO Research Team', 'Victor Boleac', 'draft', '2026-08-01', '5 min read', 'High', '[]'::jsonb, TRUE, 'Comparison'),
('pulse-method-vs-mention-count-tracking', 'comparisons', 'PULSE Method vs Mention-Count Tracking', 'Why raw mention volume is insufficient for measuring AI recommendation strength.', '# PULSE Method vs Mention-Count Tracking

Mention-count tracking treats all brand appearances equally regardless of sentiment or position. The PULSE Method evaluates position prominence, endorsement strength, sentiment, and competitor performance.', 'ASTONTO Research Team', 'Victor Boleac', 'published', '2026-08-01', '5 min read', 'High', '[]'::jsonb, FALSE, 'Comparison')
ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, content_markdown = EXCLUDED.content_markdown, status = EXCLUDED.status, updated_at = NOW();
