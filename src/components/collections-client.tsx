"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SampleArtworkPlate } from "./sample-plates";

interface CollectionSummary {
  id: string;
  name: string;
  description: string | null;
  artworks: { id: string; imagePath: string | null; svgKey: string | null }[];
}

export function CollectionsClient({
  collections,
}: {
  collections: CollectionSummary[];
}) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setCreating(true);
    await fetch("/api/collections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description }),
    });
    setName("");
    setDescription("");
    setCreating(false);
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-subtle">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
          কিউরেটেড সিরিজ • CURATED SERIES
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          সংকলনসমূহ{" "}
          <span className="text-xl sm:text-2xl font-normal text-muted">(Collections)</span>
        </h2>
      </div>

      <form
        onSubmit={handleCreate}
        className="bg-surface border border-subtle rounded-2xl p-5 flex flex-col md:flex-row gap-3 items-end"
      >
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-muted mb-1">
            নতুন সংকলনের নাম (Series Title)
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: বর্ষার নকশা ও জলরং"
            className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="flex-1 w-full">
          <label className="block text-xs font-medium text-muted mb-1">
            সংকলনের বিবরণ (Curatorial Statement)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="বিষয়বস্তু বা সময়কালের সংক্ষিপ্ত নোট..."
            className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <button
          type="submit"
          disabled={creating}
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-medium transition shrink-0"
        >
          {creating ? "তৈরি হচ্ছে..." : "সংকলন তৈরি করুন"}
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((col) => {
          const cover = col.artworks[0];
          return (
            <Link
              key={col.id}
              href={`/collections/${col.id}`}
              className="studio-card rounded-2xl overflow-hidden flex flex-col group"
            >
              <div className="h-44 bg-elevated border-b border-subtle overflow-hidden relative">
                {cover ? (
                  <div className="w-full h-full group-hover:scale-105 transition-transform duration-500">
                    {cover.imagePath ? (
                      <img
                        src={`/api/images/${cover.imagePath}`}
                        alt={col.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <SampleArtworkPlate svgKey={cover.svgKey} />
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-muted">
                    খালি সিরিজ (Empty Series)
                  </div>
                )}
                <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-surface/90 backdrop-blur-xs border border-subtle text-xs font-medium">
                  {col.artworks.length} টি শিল্পকর্ম
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl font-bold group-hover:text-accent transition">
                    {col.name}
                  </h3>
                  <p className="text-xs text-muted mt-1.5 line-clamp-2 leading-relaxed">
                    {col.description || "কিউরেটেড স্টুডিও সিরিজ।"}
                  </p>
                </div>
                <div className="pt-4 mt-4 border-t border-subtle flex justify-end text-xs">
                  <span className="text-accent font-medium">সংকলন খুলুন →</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
