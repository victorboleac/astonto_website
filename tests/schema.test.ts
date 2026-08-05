import { describe, it, expect } from "vitest";
import {
  getOrganizationSchema,
  getWebSiteSchema,
  getWebPageSchema,
  getServiceSchema,
  getFAQSchema,
  getContactPageSchema,
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
});
