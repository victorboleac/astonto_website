import React from "react";
import { FAQAccordion } from "@/components/FAQAccordion";
import { SectionLabel } from "@/components/SectionLabel";
import { faqItems as defaultFaqItems } from "@content/faqData";
import { getFAQSchema } from "@lib/schema";
import { fetchFaqsFromSupabase } from "@lib/supabase/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Frequently Asked Questions",
  description: "Direct, answer-ready explanations of ASTONTO research, AnswerSignal audits, PULSE Method, services, and pricing.",
};

export default async function FAQPage() {
  const supabaseFaqs = await fetchFaqsFromSupabase();
  const faqItems = supabaseFaqs && supabaseFaqs.length > 0
    ? supabaseFaqs.map((f: any) => ({
        id: f.id,
        question: f.question,
        answer: f.answer,
        category: f.category,
      }))
    : defaultFaqItems;

  const faqSchema = getFAQSchema(
    faqItems.map((f: any) => ({ question: f.question, answer: f.answer }))
  );

  const categories = ["ASTONTO", "AnswerSignal", "PULSE", "Services and pricing"] as const;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>

      <div className="max-w-3xl space-y-4">
        <SectionLabel>Knowledge Base</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">Frequently Asked Questions</h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Comprehensive, answer-ready explanations written for corporate buyers and technical evaluators.
        </p>
      </div>

      <div className="space-y-10">
        {categories.map((cat) => {
          const categoryItems = faqItems.filter((i: any) => i.category === cat);
          if (categoryItems.length === 0) return null;
          return (
            <div key={cat} className="space-y-4">
              <h2 className="text-xl font-bold text-navy font-mono border-b border-line pb-2">
                {cat}
              </h2>
              <FAQAccordion items={categoryItems} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
