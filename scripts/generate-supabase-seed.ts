import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { faqItems } from "../content/faqData.js";
import { siteConfig } from "../config/site.js";
import { pricing } from "../config/pricing.js";

const supabaseUrl = "https://qkhulwmdyffvpggerxhx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFraHVsd21keWZmdnBnZ2VyeGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU5MzI2ODUsImV4cCI6MjEwMTUwODY4NX0.2w5Ic__4u9R97Q9yd2DGXR0VdDln4QXjIE7CrEDDKh4";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

function escapeSql(text: string): string {
  if (text === null || text === undefined) return "NULL";
  return `'${text.replace(/'/g, "''")}'`;
}

function generateSeedSqlFile() {
  let sql = `-- ====================================================================\n`;
  sql += `-- ASTONTO Website — Supabase Seed Data Migration Script\n`;
  sql += `-- Run this script in your Supabase SQL Editor after running docs/supabase_schema.sql\n`;
  sql += `-- ====================================================================\n\n`;

  // 1. Site Config Seed
  sql += `-- 1. Site Config\n`;
  sql += `INSERT INTO site_config (key, value) VALUES\n`;
  sql += `('name', ${escapeSql(JSON.stringify(siteConfig.name))}),\n`;
  sql += `('legalName', ${escapeSql(JSON.stringify(siteConfig.legalName))}),\n`;
  sql += `('url', ${escapeSql(JSON.stringify(siteConfig.url))}),\n`;
  sql += `('description', ${escapeSql(JSON.stringify(siteConfig.description))}),\n`;
  sql += `('address', ${escapeSql(JSON.stringify(siteConfig.address))}),\n`;
  sql += `('contact', ${escapeSql(JSON.stringify(siteConfig.contact))}),\n`;
  sql += `('social', ${escapeSql(JSON.stringify(siteConfig.social))})\n`;
  sql += `ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW();\n\n`;

  // 2. Pricing Tiers Seed
  sql += `-- 2. Pricing Tiers\n`;
  const tiers = [
    {
      id: "check",
      name: pricing.check.name,
      price: pricing.check.price,
      price_prefix: "",
      price_label: pricing.check.priceLabel,
      monthly_option: null,
      billing_label: "Free entry check",
      best_fit: "UK & EU SMEs evaluating AI visibility",
      description: pricing.check.description,
      included: JSON.stringify(pricing.check.included),
      credit_policy: null,
      disclaimer: null,
      commercial_terms: JSON.stringify([]),
      scope_boundaries: JSON.stringify({}),
      cta_text: pricing.check.ctaText,
      cta_href: pricing.check.ctaHref,
      highlighted: false,
      sort_order: 1,
    },
    {
      id: "audit",
      name: pricing.audit.name,
      price: pricing.audit.price,
      price_prefix: "",
      price_label: pricing.audit.priceLabel,
      monthly_option: null,
      billing_label: pricing.audit.billingLabel,
      best_fit: "Organisations requiring multi-platform baseline evidence",
      description: pricing.audit.description,
      included: JSON.stringify(pricing.audit.included),
      credit_policy: pricing.audit.creditPolicy,
      disclaimer: pricing.audit.disclaimer,
      commercial_terms: JSON.stringify(pricing.audit.commercialTerms),
      scope_boundaries: JSON.stringify({}),
      cta_text: pricing.audit.ctaText,
      cta_href: pricing.audit.ctaHref,
      highlighted: false,
      sort_order: 2,
    },
    {
      id: "sprint",
      name: pricing.sprint.name,
      price: pricing.sprint.price,
      price_prefix: "",
      price_label: pricing.sprint.priceLabel,
      monthly_option: pricing.sprint.monthlyOption,
      billing_label: pricing.sprint.billingLabel,
      best_fit: "Organisations turning audit findings into active visibility",
      description: pricing.sprint.description,
      included: JSON.stringify(pricing.sprint.included),
      credit_policy: null,
      disclaimer: pricing.sprint.disclaimer,
      commercial_terms: JSON.stringify(pricing.sprint.commercialTerms),
      scope_boundaries: JSON.stringify(pricing.sprint.scopeBoundaries),
      cta_text: pricing.sprint.ctaText,
      cta_href: pricing.sprint.ctaHref,
      highlighted: true,
      sort_order: 3,
    },
    {
      id: "monitoring",
      name: pricing.monitoring.name,
      price: pricing.monitoring.priceFrom,
      price_prefix: "From",
      price_label: pricing.monitoring.priceLabel,
      monthly_option: null,
      billing_label: pricing.monitoring.billingLabel,
      best_fit: pricing.monitoring.positioning,
      description: pricing.monitoring.description,
      included: JSON.stringify(pricing.monitoring.included),
      credit_policy: null,
      disclaimer: null,
      commercial_terms: JSON.stringify([]),
      scope_boundaries: JSON.stringify({}),
      cta_text: pricing.monitoring.ctaText,
      cta_href: pricing.monitoring.ctaHref,
      highlighted: false,
      sort_order: 4,
    },
  ];

  sql += `INSERT INTO pricing_tiers (id, name, price, price_prefix, price_label, monthly_option, billing_label, best_fit, description, included, credit_policy, disclaimer, commercial_terms, scope_boundaries, cta_text, cta_href, highlighted, sort_order) VALUES\n`;
  sql += tiers
    .map(
      (t) =>
        `(${escapeSql(t.id)}, ${escapeSql(t.name)}, ${t.price}, ${escapeSql(t.price_prefix)}, ${escapeSql(
          t.price_label
        )}, ${escapeSql(t.monthly_option || "")}, ${escapeSql(t.billing_label)}, ${escapeSql(t.best_fit)}, ${escapeSql(
          t.description
        )}, ${escapeSql(t.included)}::jsonb, ${escapeSql(t.credit_policy || "")}, ${escapeSql(
          t.disclaimer || ""
        )}, ${escapeSql(t.commercial_terms)}::jsonb, ${escapeSql(t.scope_boundaries)}::jsonb, ${escapeSql(
          t.cta_text
        )}, ${escapeSql(t.cta_href)}, ${t.highlighted ? "TRUE" : "FALSE"}, ${t.sort_order})`
    )
    .join(",\n");
  sql += `\nON CONFLICT (id) DO UPDATE SET name = EXCLUDED.name, price = EXCLUDED.price, price_label = EXCLUDED.price_label, description = EXCLUDED.description, included = EXCLUDED.included, updated_at = NOW();\n\n`;

  // 3. FAQs Seed
  sql += `-- 3. FAQs\n`;
  sql += `INSERT INTO faqs (id, question, answer, category, sort_order, is_published) VALUES\n`;
  sql += faqItems
    .map(
      (f, i) =>
        `(${escapeSql(f.id)}, ${escapeSql(f.question)}, ${escapeSql(f.answer)}, ${escapeSql(
          f.category
        )}, ${i + 1}, TRUE)`
    )
    .join(",\n");
  sql += `\nON CONFLICT (id) DO UPDATE SET question = EXCLUDED.question, answer = EXCLUDED.answer, category = EXCLUDED.category, updated_at = NOW();\n\n`;

  // 4. Articles Seed
  sql += `-- 4. Content Articles (Research, Resources, Industries, Comparisons)\n`;
  const categories = ["research", "resources", "industries", "comparisons"] as const;
  const articleInserts: string[] = [];

  for (const cat of categories) {
    const catDir = path.join(process.cwd(), "content", cat);
    if (!fs.existsSync(catDir)) continue;
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(catDir, file);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContent);

      const title = data.title || slug;
      const description = data.description || "";
      const author = data.author || "ASTONTO Research Team";
      const reviewer = data.reviewer || "Victor Boleac";
      const rawStatus = (data.status || "").toLowerCase();
      const status = rawStatus === "draft" || rawStatus === "archived" ? rawStatus : "published";
      const publishedAt = data.publishedAt || "2026-08-01";
      const readingTime = data.readingTime || "5 min read";
      const reliability = data.reliability || "High";
      const noindex = data.noindex ? "TRUE" : "FALSE";
      const categoryLabel = data.category || cat;
      const evidenceRefs = JSON.stringify(data.evidenceRefs || []);

      articleInserts.push(
        `(${escapeSql(slug)}, ${escapeSql(cat)}, ${escapeSql(title)}, ${escapeSql(description)}, ${escapeSql(
          content.trim()
        )}, ${escapeSql(author)}, ${escapeSql(reviewer)}, ${escapeSql(status)}, ${escapeSql(
          publishedAt
        )}, ${escapeSql(readingTime)}, ${escapeSql(reliability)}, ${escapeSql(
          evidenceRefs
        )}::jsonb, ${noindex}, ${escapeSql(categoryLabel)})`
      );
    }
  }

  sql += `INSERT INTO content_articles (slug, category_type, title, description, content_markdown, author, reviewer, status, published_at, reading_time, reliability, evidence_refs, noindex, category_label) VALUES\n`;
  sql += articleInserts.join(",\n");
  sql += `\nON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, description = EXCLUDED.description, content_markdown = EXCLUDED.content_markdown, status = EXCLUDED.status, updated_at = NOW();\n`;

  const outputPath = path.join(process.cwd(), "docs", "supabase_seed.sql");
  fs.writeFileSync(outputPath, sql, "utf8");
  console.log(`Generated docs/supabase_seed.sql (${sql.length} bytes)`);
}

async function runTestAndSeed() {
  generateSeedSqlFile();

  console.log("Connecting to Supabase project:", supabaseUrl);

  const { data: testData, error: testError } = await supabase.from("content_articles").select("count", { count: "exact" });

  if (testError) {
    console.error("Supabase tables not found or permission error:", testError.message);
    return;
  }

  console.log("✓ Connection verified! Database tables exist.");
  console.log("Starting data seeding to Supabase via API...");

  // Seed Site Config
  await supabase.from("site_config").upsert([
    { key: "name", value: siteConfig.name },
    { key: "legalName", value: siteConfig.legalName },
    { key: "url", value: siteConfig.url },
    { key: "description", value: siteConfig.description },
    { key: "address", value: siteConfig.address },
    { key: "contact", value: siteConfig.contact },
    { key: "social", value: siteConfig.social },
  ], { onConflict: "key" });

  // Seed Pricing Tiers
  const tiers = [
    {
      id: "check",
      name: pricing.check.name,
      price: pricing.check.price,
      price_prefix: "",
      price_label: pricing.check.priceLabel,
      monthly_option: null,
      billing_label: "Free entry check",
      best_fit: "UK & EU SMEs evaluating AI visibility",
      description: pricing.check.description,
      included: pricing.check.included,
      credit_policy: null,
      disclaimer: null,
      commercial_terms: [],
      scope_boundaries: {},
      cta_text: pricing.check.ctaText,
      cta_href: pricing.check.ctaHref,
      highlighted: false,
      sort_order: 1,
    },
    {
      id: "audit",
      name: pricing.audit.name,
      price: pricing.audit.price,
      price_prefix: "",
      price_label: pricing.audit.priceLabel,
      monthly_option: null,
      billing_label: pricing.audit.billingLabel,
      best_fit: "Organisations requiring multi-platform baseline evidence",
      description: pricing.audit.description,
      included: pricing.audit.included,
      credit_policy: pricing.audit.creditPolicy,
      disclaimer: pricing.audit.disclaimer,
      commercial_terms: pricing.audit.commercialTerms,
      scope_boundaries: {},
      cta_text: pricing.audit.ctaText,
      cta_href: pricing.audit.ctaHref,
      highlighted: false,
      sort_order: 2,
    },
    {
      id: "sprint",
      name: pricing.sprint.name,
      price: pricing.sprint.price,
      price_prefix: "",
      price_label: pricing.sprint.priceLabel,
      monthly_option: pricing.sprint.monthlyOption,
      billing_label: pricing.sprint.billingLabel,
      best_fit: "Organisations turning audit findings into active visibility",
      description: pricing.sprint.description,
      included: pricing.sprint.included,
      credit_policy: null,
      disclaimer: pricing.sprint.disclaimer,
      commercial_terms: pricing.sprint.commercialTerms,
      scope_boundaries: pricing.sprint.scopeBoundaries,
      cta_text: pricing.sprint.ctaText,
      cta_href: pricing.sprint.ctaHref,
      highlighted: true,
      sort_order: 3,
    },
    {
      id: "monitoring",
      name: pricing.monitoring.name,
      price: pricing.monitoring.priceFrom,
      price_prefix: "From",
      price_label: pricing.monitoring.priceLabel,
      monthly_option: null,
      billing_label: pricing.monitoring.billingLabel,
      best_fit: pricing.monitoring.positioning,
      description: pricing.monitoring.description,
      included: pricing.monitoring.included,
      credit_policy: null,
      disclaimer: null,
      commercial_terms: [],
      scope_boundaries: {},
      cta_text: pricing.monitoring.ctaText,
      cta_href: pricing.monitoring.ctaHref,
      highlighted: false,
      sort_order: 4,
    },
  ];
  await supabase.from("pricing_tiers").upsert(tiers, { onConflict: "id" });

  // Seed FAQs
  const formattedFaqs = faqItems.map((f, i) => ({
    id: f.id,
    question: f.question,
    answer: f.answer,
    category: f.category,
    sort_order: i + 1,
    is_published: true,
  }));
  await supabase.from("faqs").upsert(formattedFaqs, { onConflict: "id" });

  // Seed Articles
  const categories = ["research", "resources", "industries", "comparisons"] as const;
  let count = 0;

  for (const cat of categories) {
    const catDir = path.join(process.cwd(), "content", cat);
    if (!fs.existsSync(catDir)) continue;
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".md"));

    for (const file of files) {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(catDir, file);
      const fileContent = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContent);

      const rawStatus = (data.status || "").toLowerCase();
      const status = rawStatus === "draft" || rawStatus === "archived" ? rawStatus : "published";

      const articleObj = {
        slug,
        category_type: cat,
        title: data.title || slug,
        description: data.description || "",
        content_markdown: content.trim(),
        author: data.author || "ASTONTO Research Team",
        reviewer: data.reviewer || "Victor Boleac",
        status: status,
        published_at: data.publishedAt || new Date().toISOString(),
        reading_time: data.readingTime || "5 min read",
        reliability: data.reliability || "High",
        evidence_refs: data.evidenceRefs || [],
        noindex: Boolean(data.noindex),
        category_label: data.category || cat,
      };

      const { error: artErr } = await supabase.from("content_articles").upsert(articleObj, { onConflict: "slug" });
      if (artErr) {
        console.error(`Error seeding article ${slug}:`, artErr.message);
      } else {
        count++;
      }
    }
  }

  console.log(`\n🎉 SEED SUCCESSFUL! ${count} articles, ${faqItems.length} FAQs, and ${tiers.length} pricing tiers inserted/updated in Supabase!`);
}

runTestAndSeed();
