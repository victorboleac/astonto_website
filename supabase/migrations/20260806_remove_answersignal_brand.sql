-- Migration: Remove AnswerSignal Brand & Replace with ASTONTO AI Search Visibility
-- Created: 2026-08-06

BEGIN;

-- 1. Update FAQ Categories and Questions/Answers
UPDATE faqs
SET category = 'AI Search Visibility'
WHERE category = 'AnswerSignal';

UPDATE faqs
SET question = 'What is ASTONTO AI Search Visibility?',
    answer = 'ASTONTO AI Search Visibility is our evidence-based audit, optimisation and monitoring service. It measures how businesses are recommended across ChatGPT, Perplexity, Gemini and Google AI Overviews using the PULSE Method.'
WHERE id = 'q7' OR question LIKE '%AnswerSignal%';

UPDATE faqs
SET answer = REPLACE(answer, 'AnswerSignal', 'ASTONTO AI Search Visibility')
WHERE answer LIKE '%AnswerSignal%';

-- 2. Update Content Articles / Slugs
UPDATE content_articles
SET slug = 'ai-search-visibility-vs-traditional-seo-reporting',
    title = 'AI Search Visibility vs Traditional SEO Reporting',
    description = REPLACE(description, 'AnswerSignal', 'ASTONTO AI Search Visibility'),
    body = REPLACE(body, 'AnswerSignal', 'ASTONTO AI Search Visibility')
WHERE slug = 'answersignal-vs-traditional-seo-reporting';

UPDATE content_articles
SET title = REPLACE(title, 'AnswerSignal', 'ASTONTO AI Search Visibility'),
    description = REPLACE(description, 'AnswerSignal', 'ASTONTO AI Search Visibility'),
    body = REPLACE(body, 'AnswerSignal', 'ASTONTO AI Search Visibility')
WHERE body LIKE '%AnswerSignal%' OR title LIKE '%AnswerSignal%' OR description LIKE '%AnswerSignal%';

-- 3. Update Site Config Records
UPDATE site_config
SET value = jsonb_set(
    value,
    '{description}',
    '"Independent AI research company studying how large language models and AI recommendation systems interpret information, select sources, compare alternatives and form recommendations."'
)
WHERE key = 'site_metadata';

COMMIT;
