import { siteConfig } from "@config/site";
import { pricing, formatPrice } from "@config/pricing";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postcode,
      addressCountry: siteConfig.address.countryCode,
    },
    telephone: siteConfig.contact.telephone,
    sameAs: [siteConfig.social.linkedin].filter(Boolean),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.telephone,
      contactType: "customer service",
      availableLanguage: ["English"],
    },
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}

export function getWebPageSchema(name: string, description: string, path: string) {
  const url = `${siteConfig.url}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}/#webpage`,
    url: url,
    name: name,
    description: description,
    isPartOf: {
      "@id": `${siteConfig.url}/#website`,
    },
  };
}

export function getBreadcrumbSchema(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item.startsWith("http") ? it.item : `${siteConfig.url}${it.item}`,
    })),
  };
}

export function getServiceSchema(
  serviceName: string,
  serviceDescription: string,
  path: string,
  priceAmount: number | null = null
) {
  const url = `${siteConfig.url}${path}`;
  const schema: Record<string, any> = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}/#service`,
    name: serviceName,
    serviceType: "AI Search Visibility",
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    description: serviceDescription,
    areaServed: {
      "@type": "AdministrativeArea",
      name: "United Kingdom & European Union",
    },
  };

  if (priceAmount !== null) {
    schema.offers = {
      "@type": "Offer",
      price: priceAmount.toString(),
      priceCurrency: pricing.currency,
      availability: "https://schema.org/InStock",
    };
  }

  return schema;
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getArticleSchema(article: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  modifiedAt?: string;
  author: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": article.url,
    },
    author: {
      "@type": "Organization",
      name: article.author || siteConfig.name,
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    datePublished: article.publishedAt,
    dateModified: article.modifiedAt || article.publishedAt,
  };
}

export function getContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": `${siteConfig.url}/contact/#contactpage`,
    url: `${siteConfig.url}/contact`,
    name: "Contact ASTONTO",
    description: "Book an AI visibility check or submit a research inquiry to ASTONTO.",
    mainEntity: {
      "@id": `${siteConfig.url}/#organization`,
    },
  };
}
