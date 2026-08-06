"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SectionLabel } from "@/components/SectionLabel";
import { createBrowserClient } from "@supabase/ssr";

type Tab = "articles" | "faqs" | "pricing" | "config";

export default function AdminPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>("articles");
  const [supabaseUrl, setSupabaseUrl] = useState<string>("");
  const [supabaseKey, setSupabaseKey] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [authChecking, setAuthChecking] = useState<boolean>(true);

  // Initialize Supabase configuration from env or localStorage
  useEffect(() => {
    const envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || localStorage.getItem("ASTONTO_SUPABASE_URL") || "";
    const envKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || localStorage.getItem("ASTONTO_SUPABASE_ANON_KEY") || "";

    setSupabaseUrl(envUrl);
    setSupabaseKey(envKey);

    if (envUrl && envKey) {
      testConnectionAndAuth(envUrl, envKey);
    } else {
      setAuthChecking(false);
      router.push("/admin/login");
    }
  }, []);

  const getClient = (url = supabaseUrl, key = supabaseKey) => {
    if (!url || !key) return null;
    return createBrowserClient(url, key);
  };

  const testConnectionAndAuth = async (url: string, key: string) => {
    try {
      const client = createBrowserClient(url, key);
      
      // Check auth user
      const { data: { user } } = await client.auth.getUser();
      if (!user) {
        router.push("/admin/login");
        return;
      }
      setCurrentUser(user);

      const { error } = await client.from("content_articles").select("count", { count: "exact" });
      if (error && error.code !== "PGRST116") {
        setIsConnected(false);
      } else {
        setIsConnected(true);
        loadAllData(client);
      }
    } catch {
      setIsConnected(false);
      router.push("/admin/login");
    } finally {
      setAuthChecking(false);
    }
  };

  const handleSignOut = async () => {
    const client = getClient();
    if (client) {
      await client.auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  };

  // Articles state
  const [articles, setArticles] = useState<any[]>([]);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("research");
  const [uploadingImage, setUploadingImage] = useState<boolean>(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedArticle) return;

    setUploadingImage(true);
    try {
      const client = getClient();
      let uploadedUrl = "";

      // 1. Try uploading to Supabase Storage if connected
      if (client) {
        const ext = file.name.split(".").pop();
        const fileName = `article_${Date.now()}.${ext}`;
        const { data, error } = await client.storage
          .from("article-images")
          .upload(fileName, file, { cacheControl: "3600", upsert: true });

        if (!error && data) {
          const { data: publicData } = client.storage.from("article-images").getPublicUrl(fileName);
          uploadedUrl = publicData.publicUrl;
        }
      }

      // 2. If Supabase Storage upload is not configured or failed, use local /api/upload
      if (!uploadedUrl) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (!res.ok || data.error) {
          throw new Error(data.error || "Failed to upload image.");
        }
        uploadedUrl = data.url;
      }

      setSelectedArticle((prev: any) => ({ ...prev, image_url: uploadedUrl }));
      setMessage({ text: "Article image uploaded successfully!", type: "success" });
    } catch (err: any) {
      setMessage({ text: `Image upload failed: ${err.message}`, type: "error" });
    } finally {
      setUploadingImage(false);
    }
  };

  // FAQs state
  const [faqs, setFaqs] = useState<any[]>([]);
  const [selectedFaq, setSelectedFaq] = useState<any | null>(null);

  // Pricing state
  const [pricingTiers, setPricingTiers] = useState<any[]>([]);
  const [selectedTier, setSelectedTier] = useState<any | null>(null);

  // Initialize Supabase configuration from env or localStorage


  const saveConfig = () => {
    localStorage.setItem("ASTONTO_SUPABASE_URL", supabaseUrl);
    localStorage.setItem("ASTONTO_SUPABASE_ANON_KEY", supabaseKey);
    testConnectionAndAuth(supabaseUrl, supabaseKey);
    setMessage({ text: "Supabase configuration saved to browser cache.", type: "success" });
  };

  const loadAllData = async (client: any) => {
    if (!client) return;

    // Load articles
    const { data: artData } = await client.from("content_articles").select("*").order("updated_at", { ascending: false });
    if (artData) setArticles(artData);

    // Load FAQs
    const { data: faqData } = await client.from("faqs").select("*").order("sort_order", { ascending: true });
    if (faqData) setFaqs(faqData);

    // Load Pricing
    const { data: priceData } = await client.from("pricing_tiers").select("*").order("sort_order", { ascending: true });
    if (priceData) setPricingTiers(priceData);
  };

  // Article handlers
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getClient();
    if (!client || !selectedArticle) return;

    try {
      const payload: Record<string, any> = {
        ...selectedArticle,
        updated_at: new Date().toISOString(),
      };

      // Strip empty or falsy id so Postgres auto-generates gen_random_uuid() for new articles
      if (!payload.id) {
        delete payload.id;
      }

      const { error } = await client.from("content_articles").upsert(payload, { onConflict: "slug" });
      if (error) throw error;

      setMessage({ text: `Article "${selectedArticle.title}" saved successfully to Supabase!`, type: "success" });
      loadAllData(client);
    } catch (err: any) {
      setMessage({ text: `Error saving article: ${err.message}`, type: "error" });
    }
  };

  const handleDeleteArticle = async (slug: string) => {
    if (!confirm(`Are you sure you want to delete article "${slug}"? This action cannot be undone.`)) return;

    const client = getClient();
    if (!client) return;

    try {
      const { error } = await client.from("content_articles").delete().eq("slug", slug);
      if (error) throw error;

      setMessage({ text: `Article "${slug}" deleted successfully.`, type: "success" });
      setSelectedArticle(null);
      loadAllData(client);
    } catch (err: any) {
      setMessage({ text: `Error deleting article: ${err.message}`, type: "error" });
    }
  };

  // FAQ handlers
  const handleSaveFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getClient();
    if (!client || !selectedFaq) return;

    try {
      const payload = {
        ...selectedFaq,
        updated_at: new Date().toISOString(),
      };
      const { error } = await client.from("faqs").upsert(payload, { onConflict: "id" });
      if (error) throw error;

      setMessage({ text: `FAQ saved successfully!`, type: "success" });
      loadAllData(client);
    } catch (err: any) {
      setMessage({ text: `Error saving FAQ: ${err.message}`, type: "error" });
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (!confirm(`Are you sure you want to delete FAQ "${id}"?`)) return;

    const client = getClient();
    if (!client) return;

    try {
      const { error } = await client.from("faqs").delete().eq("id", id);
      if (error) throw error;

      setMessage({ text: `FAQ "${id}" deleted successfully.`, type: "success" });
      setSelectedFaq(null);
      loadAllData(client);
    } catch (err: any) {
      setMessage({ text: `Error deleting FAQ: ${err.message}`, type: "error" });
    }
  };

  // Pricing handlers
  const handleSaveTier = async (e: React.FormEvent) => {
    e.preventDefault();
    const client = getClient();
    if (!client || !selectedTier) return;

    try {
      const payload = {
        ...selectedTier,
        updated_at: new Date().toISOString(),
      };
      const { error } = await client.from("pricing_tiers").upsert(payload, { onConflict: "id" });
      if (error) throw error;

      setMessage({ text: `Pricing Tier "${selectedTier.name}" saved successfully!`, type: "success" });
      loadAllData(client);
    } catch (err: any) {
      setMessage({ text: `Error saving tier: ${err.message}`, type: "error" });
    }
  };

  const handleDeleteTier = async (id: string) => {
    if (!confirm(`Are you sure you want to delete service tier "${id}"?`)) return;

    const client = getClient();
    if (!client) return;

    try {
      const { error } = await client.from("pricing_tiers").delete().eq("id", id);
      if (error) throw error;

      setMessage({ text: `Pricing Tier "${id}" deleted successfully.`, type: "success" });
      setSelectedTier(null);
      loadAllData(client);
    } catch (err: any) {
      setMessage({ text: `Error deleting tier: ${err.message}`, type: "error" });
    }
  };

  if (authChecking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <div className="text-sm font-mono text-cyan-deep font-bold animate-pulse">
          🔒 Verifying Admin Authorization...
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-8">
      {/* Header & Status Banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-line pb-6 gap-4">
        <div>
          <SectionLabel>Custom Admin CMS</SectionLabel>
          <h1 className="text-3xl font-extrabold text-navy">ASTONTO Content Dashboard</h1>
          {currentUser && (
            <p className="text-xs text-muted font-mono mt-1">
              Signed in as <strong className="text-navy">{currentUser.email}</strong>
            </p>
          )}
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <span
            className={`px-3 py-1 rounded-full font-bold ${
              isConnected
                ? "bg-success/10 text-success border border-success/30"
                : "bg-warning/10 text-warning border border-warning/30"
            }`}
          >
            {isConnected ? "✓ Supabase Connected" : "⚠ Local Mode (Disconnected)"}
          </span>
          <button
            onClick={() => setActiveTab("config")}
            className="px-3 py-1 rounded bg-surface-soft hover:bg-line text-navy border border-line"
          >
            Configure Keys
          </button>
          <button
            onClick={handleSignOut}
            className="px-3 py-1 rounded bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/30 font-bold"
          >
            🔒 Sign Out
          </button>
        </div>
      </div>

      {/* Global Toast Notification */}
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-mono flex justify-between items-center ${
            message.type === "success"
              ? "bg-success/10 border border-success/30 text-success"
              : "bg-red-500/10 border border-red-500/30 text-red-700"
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="font-bold">
            ✕
          </button>
        </div>
      )}

      {/* Admin Module Navigation Tabs */}
      <div className="flex space-x-2 border-b border-line pb-2 font-mono text-xs overflow-x-auto">
        <button
          onClick={() => setActiveTab("articles")}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === "articles" ? "bg-navy text-white" : "text-ink-soft hover:bg-surface-soft"
          }`}
        >
          📝 Articles & Research ({articles.length})
        </button>
        <button
          onClick={() => setActiveTab("faqs")}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === "faqs" ? "bg-navy text-white" : "text-ink-soft hover:bg-surface-soft"
          }`}
        >
          💡 FAQs Manager ({faqs.length})
        </button>
        <button
          onClick={() => setActiveTab("pricing")}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === "pricing" ? "bg-navy text-white" : "text-ink-soft hover:bg-surface-soft"
          }`}
        >
          🏷️ Pricing & Services ({pricingTiers.length})
        </button>
        <button
          onClick={() => setActiveTab("config")}
          className={`px-4 py-2 rounded-lg font-bold transition-colors ${
            activeTab === "config" ? "bg-navy text-white" : "text-ink-soft hover:bg-surface-soft"
          }`}
        >
          ⚙️ Connection & SQL Migration
        </button>
      </div>

      {/* TAB 1: ARTICLES MANAGER */}
      {activeTab === "articles" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Article Selector List */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex justify-between items-center">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 rounded-lg bg-surface border border-line text-xs font-mono text-navy"
              >
                <option value="research">Research ({articles.filter((a) => a.category_type === "research").length})</option>
                <option value="resources">Resources ({articles.filter((a) => a.category_type === "resources").length})</option>
                <option value="industries">Industries ({articles.filter((a) => a.category_type === "industries").length})</option>
                <option value="comparisons">Comparisons ({articles.filter((a) => a.category_type === "comparisons").length})</option>
              </select>

              <button
                onClick={() =>
                  setSelectedArticle({
                    slug: `new-${categoryFilter}-article-${Date.now().toString().slice(-4)}`,
                    category_type: categoryFilter,
                    title: "New Article Title",
                    description: "Short description summary...",
                    content_markdown: "## Section Heading\n\nContent markdown body...",
                    author: "ASTONTO Research Team",
                    reviewer: "Victor Boleac",
                    status: "published",
                    reading_time: "5 min read",
                    reliability: "High",
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-cyan-deep text-white font-bold text-xs hover:bg-cyan-deep/90"
              >
                + New Article
              </button>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {articles
                .filter((a) => a.category_type === categoryFilter)
                .map((art) => (
                  <div
                    key={art.slug}
                    onClick={() => setSelectedArticle(art)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      selectedArticle?.slug === art.slug
                        ? "bg-surface-tint border-cyan-deep shadow-sm"
                        : "bg-surface border-line hover:border-cyan/50"
                    }`}
                  >
                    <div className="text-xs font-bold text-navy truncate">{art.title}</div>
                    <div className="text-[11px] font-mono text-muted flex justify-between mt-1">
                      <span>/{art.slug}</span>
                      <span className="text-cyan-deep font-semibold">{art.status || "published"}</span>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Article Editor Form */}
          <div className="lg:col-span-8">
            {selectedArticle ? (
              <form onSubmit={handleSaveArticle} className="bg-surface border border-line rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-line pb-3">
                  <h3 className="text-lg font-bold text-navy">Editing: {selectedArticle.title}</h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono text-cyan-deep bg-cyan-soft px-2.5 py-0.5 rounded font-bold">
                      {selectedArticle.category_type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteArticle(selectedArticle.slug)}
                      className="px-3 py-1 rounded bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 font-bold text-xs"
                    >
                      🗑️ Delete Article
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold text-navy">
                  <div>
                    <label className="block mb-1">Title</label>
                    <input
                      type="text"
                      value={selectedArticle.title}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-sans text-ink"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Slug URL</label>
                    <input
                      type="text"
                      value={selectedArticle.slug}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, slug: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono text-ink"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-semibold text-navy">
                  <div>
                    <label className="block mb-1">Status</label>
                    <select
                      value={selectedArticle.status || "published"}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, status: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-1">Author</label>
                    <input
                      type="text"
                      value={selectedArticle.author || "ASTONTO Research Team"}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, author: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    />
                  </div>

                  <div>
                    <label className="block mb-1">Reviewer</label>
                    <input
                      type="text"
                      value={selectedArticle.reviewer || "Victor Boleac"}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, reviewer: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    />
                  </div>
                </div>

                <div className="text-xs font-semibold text-navy space-y-2">
                  <label className="block">Cover / Hero Image (Optional)</label>

                  {selectedArticle.image_url && (
                    <div className="relative group w-full max-h-52 overflow-hidden rounded-xl border border-line bg-surface-soft flex items-center justify-center">
                      <img
                        src={selectedArticle.image_url}
                        alt="Article Cover Preview"
                        className="w-full h-52 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        onClick={() => setSelectedArticle({ ...selectedArticle, image_url: "" })}
                        className="absolute top-2 right-2 px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] shadow transition-colors"
                      >
                        ✕ Remove Image
                      </button>
                    </div>
                  )}

                  <div className="flex items-center space-x-3">
                    <label className="cursor-pointer px-4 py-2 rounded-lg bg-cyan-deep hover:bg-cyan-deep/90 text-white font-bold text-xs inline-flex items-center space-x-2 transition-all">
                      <span>{uploadingImage ? "⏳ Uploading Image..." : "📷 Choose & Upload Image File"}</span>
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingImage}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-[11px] text-muted font-normal">Supports PNG, JPG, WebP, SVG, GIF</span>
                  </div>

                  <div>
                    <label className="block text-[11px] text-muted mb-1">Image URL (Auto-populated on file upload or enter custom URL)</label>
                    <input
                      type="text"
                      value={selectedArticle.image_url || ""}
                      onChange={(e) => setSelectedArticle({ ...selectedArticle, image_url: e.target.value })}
                      placeholder="https://... or /uploads/article_123.png"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono text-ink text-xs"
                    />
                  </div>
                </div>

                <div className="text-xs font-semibold text-navy">
                  <label className="block mb-1">Description Summary</label>
                  <textarea
                    rows={2}
                    value={selectedArticle.description}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-sans text-ink text-xs"
                  />
                </div>

                <div className="text-xs font-semibold text-navy">
                  <label className="block mb-1">Content Markdown Body</label>
                  <textarea
                    rows={12}
                    value={selectedArticle.content_markdown}
                    onChange={(e) => setSelectedArticle({ ...selectedArticle, content_markdown: e.target.value })}
                    className="w-full p-3.5 rounded-lg bg-surface-soft border border-line font-mono text-xs leading-relaxed text-ink"
                  />
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => handleDeleteArticle(selectedArticle.slug)}
                    className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/30 text-xs font-bold"
                  >
                    Delete Article
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-xs"
                  >
                    Save Article to Supabase
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-12 text-center text-muted border border-line rounded-2xl bg-surface">
                Select an article from the left list or click "+ New Article" to edit or delete.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: FAQ MANAGER */}
      {activeTab === "faqs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-muted">Total FAQs: {faqs.length}</span>
              <button
                onClick={() =>
                  setSelectedFaq({
                    id: `q_${Date.now()}`,
                    question: "New FAQ Question?",
                    answer: "Comprehensive answer description...",
                    category: "AI Search Visibility",
                    sort_order: faqs.length + 1,
                    is_published: true,
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-cyan-deep text-white font-bold text-xs hover:bg-cyan-deep/90"
              >
                + New FAQ
              </button>
            </div>

            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {faqs.map((faq) => (
                <div
                  key={faq.id}
                  onClick={() => setSelectedFaq(faq)}
                  className={`p-3.5 rounded-xl border cursor-pointer ${
                    selectedFaq?.id === faq.id ? "bg-surface-tint border-cyan-deep" : "bg-surface border-line"
                  }`}
                >
                  <div className="text-xs font-bold text-navy truncate">{faq.question}</div>
                  <div className="text-[11px] font-mono text-muted mt-1 flex justify-between">
                    <span>{faq.category}</span>
                    <span className="text-cyan-deep">ID: {faq.id}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            {selectedFaq ? (
              <form onSubmit={handleSaveFaq} className="bg-surface border border-line rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-line pb-3">
                  <h3 className="text-lg font-bold text-navy">Edit FAQ ({selectedFaq.id})</h3>
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(selectedFaq.id)}
                    className="px-3 py-1 rounded bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 font-bold text-xs"
                  >
                    🗑️ Delete FAQ
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-navy">
                  <div>
                    <label className="block mb-1">FAQ Identifier ID</label>
                    <input
                      type="text"
                      value={selectedFaq.id}
                      onChange={(e) => setSelectedFaq({ ...selectedFaq, id: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Category</label>
                    <select
                      value={selectedFaq.category || "AI Search Visibility"}
                      onChange={(e) => setSelectedFaq({ ...selectedFaq, category: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    >
                      <option value="ASTONTO">ASTONTO</option>
                      <option value="AI Search Visibility">AI Search Visibility</option>
                      <option value="PULSE">PULSE Method</option>
                      <option value="Services and pricing">Services and pricing</option>
                      <option value="General">General</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Question</label>
                  <input
                    type="text"
                    value={selectedFaq.question}
                    onChange={(e) => setSelectedFaq({ ...selectedFaq, question: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line text-xs font-semibold text-navy"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-navy mb-1">Answer</label>
                  <textarea
                    rows={6}
                    value={selectedFaq.answer}
                    onChange={(e) => setSelectedFaq({ ...selectedFaq, answer: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line text-xs leading-relaxed text-ink"
                  />
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => handleDeleteFaq(selectedFaq.id)}
                    className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/30 text-xs font-bold"
                  >
                    Delete FAQ
                  </button>

                  <button type="submit" className="px-6 py-2.5 rounded-lg bg-navy text-white text-xs font-bold">
                    Save FAQ to Supabase
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-12 text-center text-muted border border-line rounded-2xl bg-surface">
                Select an FAQ to edit or click "+ New FAQ".
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 3: PRICING & SERVICES MANAGER */}
      {activeTab === "pricing" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-mono text-muted">Offers: {pricingTiers.length}</span>
              <button
                onClick={() =>
                  setSelectedTier({
                    id: `service_${Date.now()}`,
                    name: "New Service Tier",
                    price: 1500,
                    price_prefix: "",
                    price_label: "£1,500 + VAT",
                    monthly_option: "",
                    billing_label: "fixed fee",
                    best_fit: "Target Client Profile",
                    description: "Detailed service tier description summary...",
                    included: ["Service Feature 1", "Service Feature 2"],
                    cta_text: "Enquire Now",
                    cta_href: "/contact",
                    highlighted: false,
                    sort_order: pricingTiers.length + 1,
                  })
                }
                className="px-3 py-1.5 rounded-lg bg-cyan-deep text-white font-bold text-xs hover:bg-cyan-deep/90"
              >
                + New Service Offer
              </button>
            </div>

            <div className="space-y-2">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  onClick={() => setSelectedTier(tier)}
                  className={`p-4 rounded-xl border cursor-pointer ${
                    selectedTier?.id === tier.id ? "bg-surface-tint border-cyan-deep" : "bg-surface border-line"
                  }`}
                >
                  <div className="text-sm font-bold text-navy">{tier.name}</div>
                  <div className="text-xs font-mono text-cyan-deep font-bold mt-1">{tier.price_label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8">
            {selectedTier ? (
              <form onSubmit={handleSaveTier} className="bg-surface border border-line rounded-2xl p-6 space-y-4 shadow-sm">
                <div className="flex justify-between items-center border-b border-line pb-3">
                  <h3 className="text-lg font-bold text-navy">Editing Service Offer: {selectedTier.name}</h3>
                  <button
                    type="button"
                    onClick={() => handleDeleteTier(selectedTier.id)}
                    className="px-3 py-1 rounded bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-500/20 font-bold text-xs"
                  >
                    🗑️ Delete Service Offer
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-navy">
                  <div>
                    <label className="block mb-1">Tier Unique ID</label>
                    <input
                      type="text"
                      value={selectedTier.id}
                      onChange={(e) => setSelectedTier({ ...selectedTier, id: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Offer Name</label>
                    <input
                      type="text"
                      value={selectedTier.name}
                      onChange={(e) => setSelectedTier({ ...selectedTier, name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-4 text-xs font-semibold text-navy">
                  <div>
                    <label className="block mb-1">Numeric Price (£)</label>
                    <input
                      type="number"
                      value={selectedTier.price ?? ""}
                      onChange={(e) =>
                        setSelectedTier({
                          ...selectedTier,
                          price: e.target.value !== "" ? Number(e.target.value) : null,
                        })
                      }
                      placeholder="e.g. 950"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Price Label</label>
                    <input
                      type="text"
                      value={selectedTier.price_label || ""}
                      onChange={(e) => setSelectedTier({ ...selectedTier, price_label: e.target.value })}
                      placeholder="e.g. £950 + VAT"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Price Prefix</label>
                    <input
                      type="text"
                      value={selectedTier.price_prefix || ""}
                      onChange={(e) => setSelectedTier({ ...selectedTier, price_prefix: e.target.value })}
                      placeholder="e.g. From"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">Billing Label</label>
                    <input
                      type="text"
                      value={selectedTier.billing_label || ""}
                      onChange={(e) => setSelectedTier({ ...selectedTier, billing_label: e.target.value })}
                      placeholder="e.g. fixed fee"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    />
                  </div>
                </div>

                <div className="text-xs font-semibold text-navy">
                  <label className="block mb-1">Target Client Profile (Best Fit)</label>
                  <input
                    type="text"
                    value={selectedTier.best_fit || ""}
                    onChange={(e) => setSelectedTier({ ...selectedTier, best_fit: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                  />
                </div>

                <div className="text-xs font-semibold text-navy">
                  <label className="block mb-1">Description Summary</label>
                  <textarea
                    rows={3}
                    value={selectedTier.description}
                    onChange={(e) => setSelectedTier({ ...selectedTier, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line text-xs"
                  />
                </div>

                {/* CTA Button */}
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-navy">
                  <div>
                    <label className="block mb-1">CTA Button Text</label>
                    <input
                      type="text"
                      value={selectedTier.cta_text || ""}
                      onChange={(e) => setSelectedTier({ ...selectedTier, cta_text: e.target.value })}
                      placeholder="e.g. Book 24-Hour Audit"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line"
                    />
                  </div>
                  <div>
                    <label className="block mb-1">CTA Button URL</label>
                    <input
                      type="text"
                      value={selectedTier.cta_href || ""}
                      onChange={(e) => setSelectedTier({ ...selectedTier, cta_href: e.target.value })}
                      placeholder="e.g. /contact?service=audit"
                      className="w-full px-3 py-2 rounded-lg bg-surface-soft border border-line font-mono"
                    />
                  </div>
                </div>

                {/* Featured / Highlighted Toggle */}
                <div className="p-4 rounded-xl border border-line bg-surface-soft flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-navy">Featured / Primary Offer</p>
                    <p className="text-[11px] text-muted mt-0.5">
                      Marks this tier as the default highlighted service on the pricing page (e.g. the 90-Day Sprint badge).
                      Only one tier should be featured at a time.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedTier({ ...selectedTier, highlighted: !selectedTier.highlighted })}
                    className={`ml-6 px-4 py-2 rounded-lg text-xs font-bold border transition-colors ${
                      selectedTier.highlighted
                        ? "bg-cyan-soft text-cyan-deep border-cyan-deep/40"
                        : "bg-surface text-muted border-line"
                    }`}
                  >
                    {selectedTier.highlighted ? "★ Featured ON" : "☆ Featured OFF"}
                  </button>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-line">
                  <button
                    type="button"
                    onClick={() => handleDeleteTier(selectedTier.id)}
                    className="px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 border border-red-500/30 text-xs font-bold"
                  >
                    Delete Service Offer
                  </button>

                  <button type="submit" className="px-6 py-2.5 rounded-lg bg-navy text-white text-xs font-bold">
                    Save Service Offer to Supabase
                  </button>
                </div>
              </form>

            ) : (
              <div className="p-12 text-center text-muted border border-line rounded-2xl bg-surface">
                Select a pricing service offer tier to edit or click "+ New Service Offer".
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: CONFIG & MIGRATION */}
      {activeTab === "config" && (
        <div className="p-8 rounded-3xl bg-surface border border-line shadow-sm space-y-6 max-w-3xl">
          <h2 className="text-xl font-bold text-navy">Supabase Connection & SQL Migration Scripts</h2>
          <p className="text-xs text-ink-soft leading-relaxed">
            Connect your Supabase project using your credentials. If you haven't created the database tables yet, copy and execute the SQL migration scripts in your Supabase SQL Editor.
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-navy mb-1">Supabase Project URL</label>
              <input
                type="text"
                value={supabaseUrl}
                onChange={(e) => setSupabaseUrl(e.target.value)}
                placeholder="https://xyz.supabase.co"
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line font-mono text-xs text-ink"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy mb-1">Supabase Anon Key</label>
              <input
                type="password"
                value={supabaseKey}
                onChange={(e) => setSupabaseKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR..."
                className="w-full px-3.5 py-2.5 rounded-lg bg-surface-soft border border-line font-mono text-xs text-ink"
              />
            </div>

            <button
              onClick={saveConfig}
              className="px-6 py-3 rounded-lg bg-navy hover:bg-navy-deep text-white font-bold text-xs"
            >
              Test & Save Supabase Keys
            </button>
          </div>

          <div className="pt-6 border-t border-line space-y-4 text-xs">
            <h3 className="font-bold text-navy">Ready-to-Execute Migration SQL Files:</h3>
            <div className="space-y-2">
              <p className="text-ink-soft">
                1. <strong>Schema Script:</strong>{" "}
                <Link href="/docs/supabase_schema.sql" target="_blank" className="text-cyan-deep underline font-mono">
                  docs/supabase_schema.sql
                </Link>
              </p>
              <p className="text-ink-soft">
                2. <strong>Data Seed Script:</strong>{" "}
                <Link href="/docs/supabase_seed.sql" target="_blank" className="text-cyan-deep underline font-mono">
                  docs/supabase_seed.sql
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
