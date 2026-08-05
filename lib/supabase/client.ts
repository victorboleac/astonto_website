// Supabase integration adapter (Disabled by default per ASTONTO Master Prompt Section 4)

export interface ContactEnquiryPayload {
  fullName: string;
  workEmail: string;
  company: string;
  companyWebsite: string;
  jobTitle?: string;
  country: string;
  serviceInterest: string;
  mainQuestion: string;
  telephone?: string;
  preferredContact?: string;
}

export function isSupabaseEnabled(): boolean {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);
}

export async function storeContactEnquiry(payload: ContactEnquiryPayload): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseEnabled()) {
    // Disabled at launch - Netlify Forms is used instead
    return { success: true };
  }

  try {
    // Placeholder adapter for future Supabase RLS insertion
    console.log("Supabase insertion triggered (Adapter ready)", payload);
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
