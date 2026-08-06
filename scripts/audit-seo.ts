import fs from "fs";
import path from "path";

let hasErrors = false;

function logPass(msg: string) {
  console.log(`  ✅ [PASS] ${msg}`);
}

function logFail(msg: string) {
  console.error(`  ❌ [FAIL] ${msg}`);
  hasErrors = true;
}

function logWarn(msg: string) {
  console.warn(`  ⚠️ [WARN] ${msg}`);
}

async function runSeoAudit() {
  console.log("==================================================");
  console.log("🔍 ASTONTO Automated Technical SEO & Brand Audit");
  console.log("==================================================\n");

  const cwd = process.cwd();

  // 1. Audit Forbidden Brand & Obsolete References (AnswerSignal, Miami, PRISM, AVI, Estate Agents)
  console.log("1. Checking for Forbidden & Obsolete References (AnswerSignal, Miami, PRISM, AVI, Estate Agents)...");
  const forbiddenPatterns = [
    /\bAnswerSignal\b/i,
    /\bAnswer Signal\b/i,
    /\bMiami\b/i,
    /\bPRISM™?\b/,
    /\bAVI™?\b/,
    /\bestate agent\b/i,
    /\breal-estate agent\b/i,
  ];

  function searchFilesRecursively(dir: string): { file: string; match: string }[] {
    const results: { file: string; match: string }[] = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".next") continue;

      if (entry.isDirectory()) {
        results.push(...searchFilesRecursively(fullPath));
      } else if (entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx") || entry.name.endsWith(".json") || entry.name.endsWith(".md") || entry.name.endsWith(".html"))) {
        const content = fs.readFileSync(fullPath, "utf-8");
        for (const pattern of forbiddenPatterns) {
          if (pattern.test(content)) {
            // Exclude false positives in audit-seo.ts, migration sql, or docs migration logs if intentional
            if (
              fullPath.includes("scripts/audit-seo.ts") ||
              fullPath.includes("supabase/migrations/") ||
              fullPath.includes("docs/brand-migration-astonto.md")
            ) {
              continue;
            }
            results.push({ file: fullPath.replace(cwd, ""), match: pattern.toString() });
          }
        }
      }
    }
    return results;
  }

  const forbiddenMatches = searchFilesRecursively(path.join(cwd, "src"))
    .concat(searchFilesRecursively(path.join(cwd, "public")))
    .concat(searchFilesRecursively(path.join(cwd, "content")))
    .concat(searchFilesRecursively(path.join(cwd, "config")))
    .concat(searchFilesRecursively(path.join(cwd, "lib")));

  if (forbiddenMatches.length === 0) {
    logPass("No forbidden terms (AnswerSignal, Miami, PRISM, AVI, Estate Agents) found in customer-facing source code/content.");
  } else {
    for (const match of forbiddenMatches) {
      logFail(`Forbidden term match found in ${match.file} (pattern: ${match.match})`);
    }
  }

  // 2. Check Static Files Availability
  console.log("\n2. Checking Production Public Infrastructure Files...");
  const requiredPublicFiles = [
    "public/robots.txt",
    "public/sitemap.xml",
    "public/llms.txt",
    "public/llms-full.txt",
    "public/dc8fd8bb334f4634b011991fbe8db121.txt",
    "public/_redirects",
  ];

  for (const relFile of requiredPublicFiles) {
    const fullPath = path.join(cwd, relFile);
    if (fs.existsSync(fullPath)) {
      logPass(`Found ${relFile}`);
    } else {
      logFail(`Missing required production file: ${relFile}`);
    }
  }

  // 3. Audit Robots.txt Content
  console.log("\n3. Auditing public/robots.txt Directives...");
  const robotsPath = path.join(cwd, "public/robots.txt");
  if (fs.existsSync(robotsPath)) {
    const robotsText = fs.readFileSync(robotsPath, "utf-8");
    const requiredCrawlers = ["Googlebot", "Bingbot", "OAI-SearchBot", "PerplexityBot", "Claude-SearchBot", "Applebot"];
    let missingCrawler = false;
    for (const crawler of requiredCrawlers) {
      if (!robotsText.includes(crawler)) {
        logFail(`robots.txt missing directive for ${crawler}`);
        missingCrawler = true;
      }
    }
    if (!missingCrawler) {
      logPass("robots.txt contains directives for all key Search & AI crawlers.");
    }
    if (robotsText.includes("Sitemap: https://astonto.com/sitemap.xml")) {
      logPass("robots.txt correctly points to canonical sitemap.xml");
    } else {
      logFail("robots.txt does not contain canonical Sitemap URL.");
    }
  }

  // 4. Audit UTM Hidden Fields in Contact Form Component
  console.log("\n4. Auditing Lead & UTM Attribution Form Integration...");
  const contactFormPath = path.join(cwd, "src/components/NetlifyContactForm.tsx");
  if (fs.existsSync(contactFormPath)) {
    const formCode = fs.readFileSync(contactFormPath, "utf-8");
    const requiredUtmFields = [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
      "original_landing_page",
      "current_landing_page",
      "referrer",
      "first_visit_timestamp",
    ];

    let missingUtm = false;
    for (const field of requiredUtmFields) {
      if (!formCode.includes(`name="${field}"`)) {
        logFail(`Contact Form missing hidden input for UTM field: ${field}`);
        missingUtm = true;
      }
    }
    if (!missingUtm) {
      logPass("NetlifyContactForm contains all 9 hidden UTM lead attribution fields.");
    }
  } else {
    logFail("Missing NetlifyContactForm component.");
  }

  // 5. Audit JSON-LD Schemas in Codebase
  console.log("\n5. Auditing JSON-LD Schemas & Graph IDs...");
  const schemaPath = path.join(cwd, "lib/schema/index.ts");
  if (fs.existsSync(schemaPath)) {
    const schemaCode = fs.readFileSync(schemaPath, "utf-8");
    if (
      schemaCode.includes("getOrganizationSchema") &&
      schemaCode.includes("getWebSiteSchema") &&
      schemaCode.includes("getAISearchVisibilityServiceSchema") &&
      schemaCode.includes("getServiceSchema") &&
      schemaCode.includes("getFAQSchema") &&
      schemaCode.includes("getArticleSchema")
    ) {
      logPass("lib/schema/index.ts exports all required structured data schemas under ASTONTO architecture.");
    } else {
      logFail("lib/schema/index.ts is missing required JSON-LD schema functions.");
    }
  }

  // 6. Audit Netlify 301 Canonical & Route Redirects
  console.log("\n6. Auditing Netlify Canonical & Route Redirect Rules...");
  const redirectsPath = path.join(cwd, "public/_redirects");
  if (fs.existsSync(redirectsPath)) {
    const redirectsText = fs.readFileSync(redirectsPath, "utf-8");
    if (
      redirectsText.includes("http://astonto.com/*") &&
      redirectsText.includes("http://www.astonto.com/*") &&
      redirectsText.includes("https://www.astonto.com/*") &&
      redirectsText.includes("/answer-signal")
    ) {
      logPass("public/_redirects correctly enforces 301 canonical and AnswerSignal route redirects.");
    } else {
      logFail("public/_redirects missing canonical or route 301 rules.");
    }
  }

  console.log("\n==================================================");
  if (hasErrors) {
    console.error("❌ SEO AUDIT FAILED — Fix the technical errors listed above.");
    process.exit(1);
  } else {
    console.log("🎉 ALL TECHNICAL SEO & BRAND AUDIT CHECKS PASSED!");
    process.exit(0);
  }
}

runSeoAudit();
