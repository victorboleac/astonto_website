import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

export function getSupabaseClient(): SupabaseClient | null {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey);
}

export function isSupabaseConnected(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

// Fetch all articles by category type from Supabase
export async function fetchArticlesFromSupabase(categoryType?: string) {
  noStore();
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    let query = client
      .from("content_articles")
      .select("*")
      .order("published_at", { ascending: false });

    if (categoryType) {
      query = query.eq("category_type", categoryType);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Supabase fetch error for articles, falling back to local files:", err);
    return null;
  }
}

// Fetch single article by slug
export async function fetchArticleBySlugFromSupabase(slug: string) {
  noStore();
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("content_articles")
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn(`Supabase fetch error for slug ${slug}, falling back to local file:`, err);
    return null;
  }
}

// Fetch FAQs from Supabase — opt out of Next.js cache so CMS changes are live immediately
export async function fetchFaqsFromSupabase() {
  noStore();
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("faqs")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Supabase fetch error for FAQs, falling back to local data:", err);
    return null;
  }
}

// Fetch Pricing Tiers from Supabase — opt out of Next.js cache so CMS changes are live immediately
export async function fetchPricingFromSupabase() {
  noStore();
  const client = getSupabaseClient();
  if (!client) return null;

  try {
    const { data, error } = await client
      .from("pricing_tiers")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error) throw error;
    return data;
  } catch (err) {
    console.warn("Supabase fetch error for Pricing, falling back to local config:", err);
    return null;
  }
}

// Admin Upsert Operations
export async function upsertArticleInSupabase(articleData: Record<string, any>) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase client is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.");

  const payload = { ...articleData };
  if (!payload.id) {
    delete payload.id;
  }

  const { data, error } = await client
    .from("content_articles")
    .upsert(payload, { onConflict: "slug" })
    .select();

  if (error) throw error;
  return data;
}

export async function upsertFaqInSupabase(faqData: Record<string, any>) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase client is not configured.");

  const { data, error } = await client
    .from("faqs")
    .upsert(faqData, { onConflict: "id" })
    .select();

  if (error) throw error;
  return data;
}

export async function upsertPricingTierInSupabase(tierData: Record<string, any>) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase client is not configured.");

  const { data, error } = await client
    .from("pricing_tiers")
    .upsert(tierData, { onConflict: "id" })
    .select();

  if (error) throw error;
  return data;
}

// Delete Operations
export async function deleteArticleFromSupabase(slug: string) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase client is not configured.");

  const { error } = await client
    .from("content_articles")
    .delete()
    .eq("slug", slug);

  if (error) throw error;
  return true;
}

export async function deleteFaqFromSupabase(id: string) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase client is not configured.");

  const { error } = await client
    .from("faqs")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}

export async function deletePricingTierFromSupabase(id: string) {
  const client = getSupabaseClient();
  if (!client) throw new Error("Supabase client is not configured.");

  const { error } = await client
    .from("pricing_tiers")
    .delete()
    .eq("id", id);

  if (error) throw error;
  return true;
}
