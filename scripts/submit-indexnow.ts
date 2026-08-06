import fs from "fs";
import path from "path";

const KEY = "dc8fd8bb334f4634b011991fbe8db121";
const isDryRun = process.argv.includes("--dry-run");

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

function getSlugsFromDir(type: string): string[] {
  const dirPath = path.join(process.cwd(), "content", type);
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function isValidProductionUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    if (url.protocol !== "https:") return false;
    if (url.hostname !== "astonto.com" && url.hostname !== "www.astonto.com") return false;
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api")) return false;
    return true;
  } catch {
    return false;
  }
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
  const rawUrls = allPaths.map((p) => `https://${host}${p}`);
  const urlList = rawUrls.filter(isValidProductionUrl);

  console.log(`📌 Validated ${urlList.length} canonical URLs for ${host}.`);

  const payload = {
    host,
    key: KEY,
    keyLocation: `https://${host}/${KEY}.txt`,
    urlList,
  };

  if (isDryRun) {
    console.log(`🧪 [DRY RUN] Would submit payload to IndexNow endpoints:`);
    console.log(JSON.stringify(payload, null, 2));
    return;
  }

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
  if (isDryRun) {
    console.log("🧪 DRY RUN MODE ENABLED — No network requests will be dispatched.");
  }
  await submitForHost("astonto.com");
  await submitForHost("www.astonto.com");
  console.log(`\n🎉 IndexNow submission process completed.`);
}

runAllSubmissions();
