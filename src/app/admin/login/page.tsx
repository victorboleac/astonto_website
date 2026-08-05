"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";
import { SectionLabel } from "@/components/SectionLabel";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      if (!supabaseUrl || !supabaseKey) {
        throw new Error("Supabase credentials are not configured in environment variables.");
      }

      const supabase = createBrowserClient(supabaseUrl, supabaseKey);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Invalid credentials or authorization error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-surface p-8 sm:p-10 rounded-3xl border border-line shadow-xl">
        <div className="text-center space-y-2">
          <SectionLabel>CMS ACCESS</SectionLabel>
          <h1 className="text-2xl font-extrabold text-navy tracking-tight">Admin Portal Sign In</h1>
          <p className="text-xs text-ink-soft">
            Authorized ASTONTO research and content team members only.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-xs font-semibold leading-relaxed">
            ⚠️ {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5 text-xs font-semibold text-navy">
          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">Admin Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@astonto.com"
              className="w-full px-4 py-3 rounded-xl bg-surface-soft border border-line text-sm text-navy placeholder:text-muted focus:outline-none focus:border-cyan-deep transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-navy mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full px-4 py-3 rounded-xl bg-surface-soft border border-line text-sm text-navy placeholder:text-muted focus:outline-none focus:border-cyan-deep transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 rounded-xl bg-navy hover:bg-navy-deep text-white font-bold text-sm transition-all shadow-md flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            <span>{loading ? "Authenticating..." : "Sign In to Admin Dashboard →"}</span>
          </button>
        </form>

        <div className="pt-4 border-t border-line text-center">
          <p className="text-[11px] text-muted font-mono">
            Powered by Supabase Auth & Next.js Server Security
          </p>
        </div>
      </div>
    </div>
  );
}
