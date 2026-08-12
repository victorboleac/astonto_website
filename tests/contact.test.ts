import { describe, it, expect } from "vitest";
import { POST } from "../src/app/api/contact/route";

describe("Contact Form API Route (/api/contact)", () => {
  it("should process valid urlencoded form submissions successfully", async () => {
    const params = new URLSearchParams({
      "form-name": "astonto-contact",
      fullName: "Test User",
      workEmail: "test@example.com",
      company: "Acme Corp",
      companyWebsite: "https://example.com",
      country: "United Kingdom",
      serviceInterest: "20-minute AI visibility check",
      mainQuestion: "How do we rank in ChatGPT?",
      consent: "true",
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
    expect(json.message).toContain("ASTONTO");
  });

  it("should return HTTP 400 error when required fields are missing", async () => {
    const params = new URLSearchParams({
      fullName: "Test User",
      // workEmail missing
      company: "Acme Corp",
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const response = await POST(request);
    expect(response.status).toBe(400);

    const json = await response.json();
    expect(json.error).toContain("Please complete all required fields");
  });

  it("should silently handle honeypot spam bot submissions", async () => {
    const params = new URLSearchParams({
      fullName: "Spam Bot",
      workEmail: "bot@spam.com",
      company: "Spam LLC",
      companyWebsite: "https://spam.com",
      country: "Unknown",
      mainQuestion: "Spam question",
      consent: "true",
      "bot-field": "I am a bot",
    });

    const request = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const response = await POST(request);
    expect(response.status).toBe(200);

    const json = await response.json();
    expect(json.success).toBe(true);
  });
});
