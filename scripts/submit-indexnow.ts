import fs from "fs";
import path from "path";

const KEY = "dc8fd8bb334f4634b011991fbe8db121";

const staticPaths = [
  "",
  "/research",
  "/answer-signal",
  "/pulse-method",
  "/services/ai-visibility-audit",
  "/services/90-day-optimisation-sprint",
  "/services/monitoring",
  "/pricing",
  "/industries",
  "/compare",
  "/resources",
  "/faq",
  "/about",
  "/contact",
  "/privacy",
  "/cookies",
  "/terms",
  "/accessibility",
];

// Helper to collect markdown content slugs
function getSlugsFromDir(type: string): string[] {
  const dirPath = path.join(process.cwd(), "content", type);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

async function submitForHost(host: string) {
  console.log(`\n--------------------------------------------------`);
  console.log(`🔍 Preparing IndexNow submission for host: ${host}`);

  const researchSlugs = getSlugsFromDir("research");
  const resourceSlugs = getSlugsFromDir("resources");
  const compareSlugs = getSlugsFromDir("comparisons");
  const industrySlugs = getSlugsFromDir("industries");

  const articlePaths = [
    ...researchSlugs.map((s) => `/research/${s}`),
    ...resourceSlugs.map((s) => `/resources/${s}`),
    ...compareSlugs.map((s) => `/compare/${s}`),
    ...industrySlugs.map((s) => `/industries/${s}`),
  ];

  const allPaths = Array.from(new Set([...staticPaths, ...articlePaths]));
  const urlList = allPaths.map((p) => `https://${host}${p}`);

  console.log(`📌 Found ${urlList.length} total URLs for ${host}.`);

  const payload = {
    host,
    key: KEY,
    keyLocation: `https://${host}/${KEY}.txt`,
    urlList,
  };

  const endpoints = [
    "https://api.indexnow.org/indexnow",
    "https://www.bing.com/indexnow",
    "https://yandex.com/indexnow",
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`🚀 Submitting ${host} to ${endpoint}...`);
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok || response.status === 200 || response.status === 202) {
        console.log(`✅ Success! [${response.status} ${response.statusText}] for ${host} at ${endpoint}`);
      } else {
        const text = await response.text();
        console.warn(`⚠️ Warning from ${endpoint} for ${host}: Status ${response.status} - ${text}`);
      }
    } catch (err: any) {
      console.error(`❌ Error submitting ${host} to ${endpoint}:`, err.message);
    }
  }
}

async function runAllSubmissions() {
  await submitForHost("astonto.com");
  await submitForHost("www.astonto.com");
  console.log(`\n🎉 IndexNow submission cycle completed for both astonto.com and www.astonto.com!`);
}

runAllSubmissions();
