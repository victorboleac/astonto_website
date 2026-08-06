import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@config/site";
import { getOrganizationSchema, getWebSiteSchema } from "@lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  title: {
    default: "ASTONTO | Independent AI Research and AI Search Visibility",
    template: "%s | ASTONTO",
  },
  description:
    "ASTONTO researches how AI systems interpret, compare and recommend organisations. AnswerSignal measures and improves AI Search Visibility across major AI platforms.",
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    title: "ASTONTO | Independent AI Research and AI Search Visibility",
    description:
      "ASTONTO researches how AI systems interpret, compare and recommend organisations. AnswerSignal measures and improves AI Search Visibility across major AI platforms.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
  },
  alternates: {
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = getOrganizationSchema();
  const websiteSchema = getWebSiteSchema();

  return (
    <html lang="en-GB" className={`${inter.variable} ${jetbrains.variable}`}>
      <head>
        <link rel="alternate" type="application/rss+xml" title="ASTONTO Research & Insights Feed" href={`${siteConfig.url}/feed.xml`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-canvas text-ink antialiased">
        <a href="#main-content" className="skip-to-content">
          Skip to main content
        </a>
        <Header />
        <main id="main-content" className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
