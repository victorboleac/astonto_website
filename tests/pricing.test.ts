import { describe, it, expect } from "vitest";
import { pricing, formatPrice } from "../config/pricing";

describe("Pricing Configuration & Formatter", () => {
  it("should contain approved launch prices", () => {
    expect(pricing.check.price).toBe(0);
    expect(pricing.audit.price).toBe(950);
    expect(pricing.sprint.price).toBe(6000);
    expect(pricing.monitoring.priceFrom).toBe(350);
  });

  it("should format Free price correctly", () => {
    expect(formatPrice(0)).toBe("Free");
  });

  it("should format valid prices in GBP currency with VAT notice", () => {
    expect(formatPrice(950)).toContain("£950 + VAT");
    expect(formatPrice(6000)).toContain("£6,000 + VAT");
    expect(formatPrice(350, "From")).toContain("From £350 + VAT");
  });
});
