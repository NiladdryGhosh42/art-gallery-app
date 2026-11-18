"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "প্রবেশ অনুমোদিত নয়");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch {
      setError("নেটওয়ার্ক ত্রুটি হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-canvas flex items-center justify-center p-4">
      <div className="bg-surface border border-subtle rounded-2xl max-w-md w-full p-7 sm:p-9 shadow-xl">
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-accent text-white flex items-center justify-center font-serif text-2xl font-bold shadow-xs">
            ফ
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold tracking-tight leading-none">
              ফুলচিত্র স্টুডিও
            </h1>
            <p className="text-[11px] text-muted mt-1 font-mono uppercase tracking-wider">
              PHULCHITRA PRIVATE ARCHIVE
            </p>
          </div>
        </div>

        <p className="text-sm text-muted mb-6 leading-relaxed">
          আমাদের একান্ত স্কেচবুক ও চিত্রশালার দরজা। শিল্পকর্ম ও গোপন নোটগুলো দেখতে স্টুডিও পাসকোড দিয়ে প্রবেশ করুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-muted mb-1.5">
              স্টুডিও পাসকোড (Passcode)
            </label>
            <input
              type="password"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              placeholder="পাসকোড লিখুন (ডিফল্ট: ফুলচিত্র)"
              required
              className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-500/10 border border-red-400/30 text-red-700 text-xs">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accentHover text-white font-medium text-sm transition shadow-sm disabled:opacity-50"
          >
            {loading ? "যাচাই করা হচ্ছে..." : "স্টুডিও আনলক করুন (Unlock Studio)"}
          </button>
        </form>
      </div>
    </div>
  );
}
