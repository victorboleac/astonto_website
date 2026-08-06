"use client";

export interface UTMData {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_content: string;
  utm_term: string;
  original_landing_page: string;
  current_landing_page: string;
  referrer: string;
  first_visit_timestamp: string;
}

const FIRST_TOUCH_KEY = "astonto_utm_first_touch";
const LAST_TOUCH_KEY = "astonto_utm_last_touch";

export function initUTMAttribution(): UTMData {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      original_landing_page: "",
      current_landing_page: "",
      referrer: "",
      first_visit_timestamp: "",
    };
  }

  const searchParams = new URLSearchParams(window.location.search);
  const currentUrl = window.location.href.split("?")[0];
  const referrer = document.referrer || "direct";
  const nowISO = new Date().toISOString();

  const currentTouch: UTMData = {
    utm_source: searchParams.get("utm_source") || "",
    utm_medium: searchParams.get("utm_medium") || "",
    utm_campaign: searchParams.get("utm_campaign") || "",
    utm_content: searchParams.get("utm_content") || "",
    utm_term: searchParams.get("utm_term") || "",
    original_landing_page: currentUrl,
    current_landing_page: currentUrl,
    referrer: referrer,
    first_visit_timestamp: nowISO,
  };

  // 1. Capture First Touch (only set if not previously saved)
  let firstTouch: UTMData | null = null;
  try {
    const stored = localStorage.getItem(FIRST_TOUCH_KEY);
    if (stored) {
      firstTouch = JSON.parse(stored);
    }
  } catch (e) {
    console.warn("Failed to read first-touch UTM storage:", e);
  }

  if (!firstTouch) {
    firstTouch = currentTouch;
    try {
      localStorage.setItem(FIRST_TOUCH_KEY, JSON.stringify(firstTouch));
    } catch (e) {
      console.warn("Failed to write first-touch UTM storage:", e);
    }
  }

  // 2. Capture Last Touch if UTM params are present in current URL
  if (
    currentTouch.utm_source ||
    currentTouch.utm_medium ||
    currentTouch.utm_campaign
  ) {
    try {
      localStorage.setItem(LAST_TOUCH_KEY, JSON.stringify(currentTouch));
    } catch (e) {
      console.warn("Failed to write last-touch UTM storage:", e);
    }
  }

  // Combine first-touch with current landing page info
  return {
    ...firstTouch,
    current_landing_page: currentUrl,
  };
}

export function getStoredUTMAttribution(): UTMData {
  if (typeof window === "undefined") {
    return {
      utm_source: "",
      utm_medium: "",
      utm_campaign: "",
      utm_content: "",
      utm_term: "",
      original_landing_page: "",
      current_landing_page: "",
      referrer: "",
      first_visit_timestamp: "",
    };
  }

  try {
    const stored = localStorage.getItem(FIRST_TOUCH_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        ...parsed,
        current_landing_page: window.location.href.split("?")[0],
      };
    }
  } catch (e) {
    console.warn("Error reading stored UTM data:", e);
  }

  return initUTMAttribution();
}
