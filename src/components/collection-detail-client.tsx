"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { SampleArtworkPlate } from "./sample-plates";
import type { ArtworkDTO } from "./gallery-client";

export function CollectionDetailClient({
  collection,
}: {
  collection: {
    id: string;
    name: string;
    description: string | null;
    artworks: ArtworkDTO[];
  };
}) {
  const router = useRouter();
  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description || "");
  const [savedMsg, setSavedMsg] = useState("");

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/collections/${collection.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setSavedMsg("সংকলনের তথ্য হালনাগাদ হয়েছে");
    router.refresh();
  };

  const handleDelete = async () => {
    await fetch(`/api/collections/${collection.id}`, { method: "DELETE" });
    router.push("/collections");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-subtle">
        <Link
          href="/collections"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          সকল সংকলন (All Collections)
        </Link>

        <button
          onClick={handleDelete}
          className="px-3.5 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-500/10 text-xs font-medium inline-flex items-center gap-1.5 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          সংকলন মুছে ফেলুন
        </button>
      </div>

      <form
        onSubmit={handleUpdate}
        className="bg-surface border border-subtle rounded-2xl p-6 sm:p-8 space-y-4"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            প্রদর্শনী সিরিজ • EXHIBITION SERIES
          </span>
          <span className="text-xs font-mono text-muted">
            {collection.artworks.length} টি নথিভুক্ত শিল্পকর্ম
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-muted mb-1">সংকলনের শিরোনাম</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle font-serif text-2xl font-bold focus:outline-none focus:border-accent"
            />
          </div>
          <div>
            <label className="block text-xs text-muted mb-1">সংক্ষিপ্ত বিবরণ</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xs text-emerald-700 font-medium">{savedMsg}</span>
          <button
            type="submit"
            className="px-4 py-2 rounded-xl bg-elevated hover:bg-accent hover:text-white text-xs font-medium transition"
          >
            সংকলনের তথ্য হালনাগাদ করুন
          </button>
        </div>
      </form>

      {collection.artworks.length === 0 ? (
        <div className="bg-surface border border-subtle rounded-2xl p-10 text-center space-y-2">
          <p className="font-serif text-xl font-semibold">
            এই সংকলনে এখনো কোনো শিল্পকর্ম যুক্ত করা হয়নি
          </p>
          <p className="text-xs text-muted">
            গ্যালারি থেকে যেকোনো শিল্পকর্ম খুলে এই সংকলনে যুক্ত করুন।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collection.artworks.map((art) => (
            <Link
              key={art.id}
              href={`/artwork/${art.id}`}
              className="studio-card rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-elevated border-b border-subtle">
                {art.imagePath ? (
                  <img
                    src={`/api/images/${art.imagePath}`}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <SampleArtworkPlate svgKey={art.svgKey} />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-serif text-xl font-bold group-hover:text-accent transition">
                  {art.title}
                </h3>
                <p className="text-xs text-muted mt-1">{art.medium}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
