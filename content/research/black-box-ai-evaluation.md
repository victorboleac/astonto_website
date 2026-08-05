---
title: "Black-Box Evaluation of Observable AI Recommendation Behaviours"
description: "An overview of ASTONTO's methodology for measuring how large language models and AI engines generate entity recommendations from public outputs."
status: "approved"
author: "ASTONTO Research Team"
reviewer: "Victor Boleac"
publishedAt: "2026-08-01"
modifiedAt: "2026-08-05"
methodologyVersion: "PULSE Method v1.0"
reliability: "High"
evidenceRefs:
  - "ASTONTO Research Protocol v1.0"
category: "Methodology"
readingTime: "6 min read"
---

# Black-Box Evaluation of Observable AI Recommendation Behaviours

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
- All scores reflect empirical data observed within a documented testing window and prompt set.
