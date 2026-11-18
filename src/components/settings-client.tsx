"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, KeyRound } from "lucide-react";

export function SettingsClient({
  initialConfig,
  stats,
}: {
  initialConfig: {
    studioName: string;
    curatorName: string;
    curatorBio: string;
    theme: string;
  };
  stats: {
    activeWorks: number;
    collections: number;
    trashedWorks: number;
  };
}) {
  const router = useRouter();
  const [studioName, setStudioName] = useState(initialConfig.studioName);
  const [curatorName, setCuratorName] = useState(initialConfig.curatorName);
  const [curatorBio, setCuratorBio] = useState(initialConfig.curatorBio);
  const [theme, setTheme] = useState(initialConfig.theme);
  const [newPassword, setNewPassword] = useState("");
  const [statusMsg, setStatusMsg] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg("");
    await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studioName,
        curatorName,
        curatorBio,
        theme,
        newPassword: newPassword || undefined,
      }),
    });
    localStorage.setItem("phulchitra_theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setNewPassword("");
    setStatusMsg("স্টুডিও সেটিংস ও নিরাপত্তা তথ্য সংরক্ষিত হয়েছে");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-subtle">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
          কনফিগারেশন ও নিরাপত্তা • SETTINGS & SECURITY
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          সেটিংস ও এক্সপোর্ট{" "}
          <span className="text-xl sm:text-2xl font-normal text-muted">(Settings)</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form
          onSubmit={handleSave}
          className="bg-surface border border-subtle rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-serif text-2xl font-bold">স্টুডিও পরিচিতি ও পাসকোড</h3>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              স্টুডিও / গ্যালারির নাম
            </label>
            <input
              type="text"
              required
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              প্রধান কিউরেটরের নাম
            </label>
            <input
              type="text"
              required
              value={curatorName}
              onChange={(e) => setCuratorName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              কিউরেটর পরিচিতি (Bio)
            </label>
            <textarea
              rows={2}
              value={curatorBio}
              onChange={(e) => setCuratorBio(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              ডিফল্ট ওয়ার্কস্পেস থিম
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            >
              <option value="paper">কাগজ — Warm Studio Paper (Default)</option>
              <option value="light">গ্যালারি — Gallery White</option>
              <option value="dark">নিশি — Nocturne Dark</option>
            </select>
          </div>

          <div className="pt-2 border-t border-subtle">
            <label className="flex items-center gap-1.5 text-xs font-medium text-muted mb-1">
              <KeyRound className="w-3.5 h-3.5" /> নতুন স্টুডিও পাসকোড (পরিবর্তন করতে চাইলে লিখুন)
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="নতুন পাসকোড (কমপক্ষে ৪ অক্ষর)..."
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {statusMsg && <p className="text-xs text-emerald-700 font-medium">{statusMsg}</p>}

          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-medium transition"
          >
            পছন্দসমূহ সংরক্ষণ করুন
          </button>
        </form>

        <div className="bg-surface border border-subtle rounded-2xl p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <h3 className="font-serif text-2xl font-bold">আর্কাইভ ব্যাকআপ ও এক্সপোর্ট</h3>
            <p className="text-sm text-muted leading-relaxed">
              আপনার সম্পূর্ণ <strong>{studioName}</strong> ক্যাটালগ—শিল্পকর্মের তথ্য, সংকলন তালিকা এবং
              নোটসমূহ—JSON ব্যাকআপ ফাইল হিসেবে ডাউনলোড করুন।
            </p>

            <div className="p-4 rounded-xl bg-canvas border border-subtle font-mono text-xs text-muted space-y-1.5">
              <div>সক্রিয় শিল্পকর্ম (Active Artworks): {stats.activeWorks}</div>
              <div>সংকলন সংখ্যা (Collections): {stats.collections}</div>
              <div>ট্র্যাশে সংরক্ষিত (Trashed): {stats.trashedWorks}</div>
            </div>
          </div>

          <div className="pt-4 border-t border-subtle">
            <a
              href="/api/export"
              className="px-5 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-medium transition inline-flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              সম্পূর্ণ আর্কাইভ এক্সপোর্ট (.json)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
