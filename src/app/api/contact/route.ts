import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    let bodyData: Record<string, any> = {};

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const text = await request.text();
      const params = new URLSearchParams(text);
      for (const [key, val] of params.entries()) {
        bodyData[key] = val;
      }
    } else if (contentType.includes("application/json")) {
      bodyData = await request.json();
    } else {
      const formData = await request.formData();
      formData.forEach((value, key) => {
        bodyData[key] = value.toString();
      });
    }

    // Honeypot check for spam bots
    if (bodyData["bot-field"]) {
      console.warn("[Contact API] Spam submission caught by bot-field honeypot.");
      return NextResponse.json({ success: true, message: "Enquiry received." });
    }

    // Validation for required fields
    const fullName = bodyData.fullName?.toString().trim();
    const workEmail = bodyData.workEmail?.toString().trim();
    const company = bodyData.company?.toString().trim();
    const companyWebsite = bodyData.companyWebsite?.toString().trim();
    const country = bodyData.country?.toString().trim();
    const mainQuestion = bodyData.mainQuestion?.toString().trim();
    const consent = bodyData.consent === true || bodyData.consent === "true" || bodyData.consent === "on";

    if (!fullName || !workEmail || !company || !companyWebsite || !country || !mainQuestion || !consent) {
      return NextResponse.json(
        { error: "Please complete all required fields and accept the privacy notice consent." },
        { status: 400 }
      );
    }

    // Log submitted enquiry details for monitoring
    console.log("[Contact API] Enquiry received:", {
      fullName,
      workEmail,
      company,
      companyWebsite,
      country,
      serviceInterest: bodyData.serviceInterest || "20-minute AI visibility check",
      telephone: bodyData.telephone || "N/A",
      preferredContact: bodyData.preferredContact || "Email",
      utm_source: bodyData.utm_source || "",
      utm_campaign: bodyData.utm_campaign || "",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you for reaching out to ASTONTO. Our research team will review your commercial AI visibility enquiry and get in touch within 24 hours.",
    });
  } catch (error: any) {
    console.error("[Contact API] Submission processing error:", error);
    return NextResponse.json(
      { error: "An error occurred submitting the enquiry. Please try again or call +44 7845 580266." },
      { status: 500 }
    );
  }
}
