import type { Metadata } from "next";
import Link from "next/link";
import { SectionLabel } from "@/components/SectionLabel";
import { getAllContentAsync } from "@lib/content";

export const metadata: Metadata = {
  title: "Resource Centre & Educational Guides",
  description: "Articles, technical notes, and guides on AI Search Visibility and LLM entity representation.",
  alternates: {
    canonical: "/resources",
  },
  openGraph: {
    title: "Resource Centre & Educational Guides",
    description: "Articles, technical notes, and guides on AI Search Visibility and LLM entity representation.",
    url: "/resources",
    siteName: "ASTONTO",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Resource Centre & Educational Guides",
    description: "Articles, technical notes, and guides on AI Search Visibility and LLM entity representation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function ResourcesPage() {
  const articles = await getAllContentAsync("resources");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-12">
      <div className="max-w-3xl space-y-4">
        <SectionLabel>Resource Centre</SectionLabel>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-navy">
          Educational Guides & Research Notes
        </h1>
        <p className="text-base text-ink-soft leading-relaxed">
          Clear, evidence-backed explanations covering AI search, entity resolution, structured data, and PULSE scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((item) => (
          <div key={item.meta.slug} className="p-6 rounded-2xl bg-surface border border-line shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              {item.meta.imageUrl && (
                <div className="overflow-hidden rounded-xl h-40 bg-surface-soft">
                  <img
                    src={item.meta.imageUrl}
                    alt={item.meta.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              )}
              <div className="flex justify-between text-xs text-muted font-mono">
                <span className="text-cyan-deep font-semibold">{item.meta.category || "Guide"}</span>
                <span>{item.meta.readingTime}</span>
              </div>
              <h2 className="text-lg font-bold text-navy hover:text-cyan-deep transition-colors">
                <Link href={`/resources/${item.meta.slug}`}>{item.meta.title}</Link>
              </h2>
              <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">{item.meta.description}</p>
            </div>
            <div className="pt-2">
              <Link href={`/resources/${item.meta.slug}`} className="text-xs font-bold text-cyan-deep hover:underline">
                Read Guide →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
