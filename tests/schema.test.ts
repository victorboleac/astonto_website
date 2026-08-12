import { describe, it, expect } from "vitest";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getAISearchVisibilityServiceSchema,
  getWebPageSchema,
  getServiceSchema,
  getFAQSchema,
  getContactPageSchema,
  getReportSchema,
  getDatasetSchema,
} from "../lib/schema";

describe("JSON-LD Structured Data Generators", () => {
  it("should generate valid Organization schema with required fields", () => {
    const schema = getOrganizationSchema();
    const jsonStr = JSON.stringify(schema);
    expect(() => JSON.parse(jsonStr)).not.toThrow();
    expect(schema["@type"]).toBe("Organization");
    expect(schema.name).toBe("ASTONTO");
    expect(schema.address.streetAddress).toBe("66 Paul Street");
    expect(schema.telephone).toBe("+44 7845 580266");
    expect(schema.sameAs).toContain("https://www.linkedin.com/company/astonto/");
  });

  it("should generate valid WebSite schema", () => {
    const schema = getWebSiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toContain("astonto");
  });

  it("should generate valid AISearchVisibilityService schema", () => {
    const schema = getAISearchVisibilityServiceSchema();
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("ASTONTO AI Search Visibility");
    expect(schema.url).toContain("/ai-search-visibility");
  });

  it("should generate valid Service schema", () => {
    const schema = getServiceSchema(
      "24-Hour AI Visibility Audit",
      "Fixed-scope empirical audit",
      "/services/ai-visibility-audit"
    );
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("24-Hour AI Visibility Audit");
  });

  it("should generate valid FAQPage schema", () => {
    const faqs = [{ question: "What is ASTONTO?", answer: "An AI research company." }];
    const schema = getFAQSchema(faqs);
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].name).toBe("What is ASTONTO?");
  });

  it("should generate valid Report schema", () => {
    const schema = getReportSchema({
      title: "How AI Recommends Managed IT Providers in Greater Manchester",
      description: "ASTONTO research analysing 144 AI-generated buyer answers",
      url: "/research/ai-visibility-managed-it-greater-manchester",
      publishedAt: "2026-08-01",
      author: "ASTONTO Research",
      spatialCoverage: "Greater Manchester, United Kingdom",
      inLanguage: "en-GB",
    });
    expect(schema["@type"]).toBe("Report");
    expect(schema.headline).toBe("How AI Recommends Managed IT Providers in Greater Manchester");
    expect(schema.publisher["@id"]).toContain("#organization");
  });

  it("should generate valid Dataset schema", () => {
    const schema = getDatasetSchema({
      name: "ASTONTO Managed IT Greater Manchester AI Visibility Study 2026",
      description: "144 observed AI responses",
      temporalCoverage: "2026-07-31/2026-08-01",
      spatialCoverage: "Greater Manchester, United Kingdom",
      creator: "ASTONTO Research",
      variableMeasured: ["PULSE Score", "Appearance Rate"],
      measurementTechnique: "PULSE Method v1.0",
    });
    expect(schema["@type"]).toBe("Dataset");
    expect(schema.name).toContain("ASTONTO Managed IT");
  });
});

