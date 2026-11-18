"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Plus, Heart, LayoutGrid, List } from "lucide-react";
import { SampleArtworkPlate } from "./sample-plates";

export interface ArtworkDTO {
  id: string;
  title: string;
  year: string;
  medium: string;
  dimensions: string | null;
  status: string;
  imagePath: string | null;
  svgKey: string | null;
  privateNotes: string | null;
  tags: string;
  favorite: boolean;
  collectionId: string | null;
  collection?: { id: string; name: string } | null;
}

export function GalleryClient({
  artworks,
  collections,
}: {
  artworks: ArtworkDTO[];
  collections: { id: string; name: string }[];
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [onlyFavorites, setOnlyFavorites] = useState(false);
  const [layout, setLayout] = useState<"masonry" | "list">("masonry");

  const filtered = useMemo(() => {
    return artworks.filter((art) => {
      if (onlyFavorites && !art.favorite) return false;
      if (statusFilter !== "all" && art.status !== statusFilter) return false;
      if (collectionFilter !== "all" && art.collectionId !== collectionFilter) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${art.title} ${art.medium} ${art.tags} ${art.privateNotes || ""}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [artworks, search, statusFilter, collectionFilter, onlyFavorites]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-subtle">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
            স্থায়ী সংগ্রহশালা • PERMANENT CATALOGUE
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
            স্টুডিও গ্যালারি{" "}
            <span className="text-xl sm:text-2xl font-normal text-muted">(Gallery)</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`px-3 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition ${
              onlyFavorites
                ? "bg-accent text-white border-accent"
                : "bg-surface border-subtle text-muted hover:text-ink"
            }`}
          >
            <Heart className="w-3.5 h-3.5" /> প্রিয় ({artworks.filter((a) => a.favorite).length})
          </button>

          <div className="inline-flex p-1 rounded-xl bg-surface border border-subtle">
            <button
              onClick={() => setLayout("masonry")}
              className={`p-2 rounded-lg transition ${
                layout === "masonry" ? "bg-elevated text-accent" : "text-muted"
              }`}
              title="মেসনরি গ্যালারি"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setLayout("list")}
              className={`p-2 rounded-lg transition ${
                layout === "list" ? "bg-elevated text-accent" : "text-muted"
              }`}
              title="তালিকা ভিউ"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Link
            href="/upload"
            className="px-4 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-medium transition inline-flex items-center gap-2 shadow-xs"
          >
            <Plus className="w-4 h-4" />
            নতুন শিল্পকর্ম যোগ করুন
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        <div className="relative md:col-span-6">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="শিরোনাম, মাধ্যম, নোট বা ট্যাগ দিয়ে খুঁজুন..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-subtle text-sm focus:outline-none focus:border-accent"
          />
        </div>
        <div className="md:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-subtle text-sm focus:outline-none focus:border-accent"
          >
            <option value="all">সকল অবস্থা (All Status)</option>
            <option value="Finished">সমাপ্ত (Finished)</option>
            <option value="Work in Progress">চলমান (Work in Progress)</option>
            <option value="Sketch">স্কেচ (Sketch)</option>
          </select>
        </div>
        <div className="md:col-span-3">
          <select
            value={collectionFilter}
            onChange={(e) => setCollectionFilter(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-surface border border-subtle text-sm focus:outline-none focus:border-accent"
          >
            <option value="all">সকল সংকলন ({artworks.length})</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-surface border border-subtle rounded-2xl p-12 text-center space-y-2">
          <p className="font-serif text-2xl font-semibold">কোনো শিল্পকর্ম খুঁজে পাওয়া যায়নি</p>
          <p className="text-sm text-muted">
            ফিল্টার পরিবর্তন করুন অথবা আপলোড স্টুডিও থেকে নতুন পাতা যোগ করুন।
          </p>
        </div>
      ) : layout === "masonry" ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          {filtered.map((art, index) => (
            <Link
              key={art.id}
              href={`/artwork/${art.id}`}
              className="studio-card rounded-2xl overflow-hidden block break-inside-avoid group"
            >
              <div
                className={`${
                  index % 3 === 1 ? "aspect-[3/4]" : "aspect-[4/3]"
                } w-full overflow-hidden bg-elevated relative border-b border-subtle`}
              >
                <div className="w-full h-full transition-transform duration-500 group-hover:scale-105">
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
                <span className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-surface/90 backdrop-blur-xs border border-subtle text-[11px] font-mono">
                  {art.year}
                </span>
                {art.favorite && (
                  <span className="absolute top-3 left-3 p-1.5 rounded-lg bg-surface/90 text-accent">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                  </span>
                )}
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-medium text-accent truncate">
                      {art.collection?.name || "অনির্ধারিত"}
                    </p>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-elevated text-muted">
                      {art.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-bold leading-snug mt-1 group-hover:text-accent transition">
                    {art.title}
                  </h3>
                  <p className="text-xs text-muted mt-1 line-clamp-1">{art.medium}</p>
                </div>

                <div className="pt-2 border-t border-subtle flex items-center justify-between text-[11px] font-mono text-muted">
                  <span>{art.dimensions || "স্কেচবুক পাতা"}</span>
                  <span className="font-sans font-medium text-ink">পরিদর্শন →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((art) => (
            <Link
              key={art.id}
              href={`/artwork/${art.id}`}
              className="studio-card rounded-2xl overflow-hidden flex flex-col sm:flex-row group"
            >
              <div className="sm:w-56 h-44 sm:h-auto shrink-0 bg-elevated overflow-hidden border-b sm:border-b-0 sm:border-r border-subtle">
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
              <div className="p-5 flex-1 flex flex-col justify-between gap-3">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-accent">
                      {art.collection?.name || "অনির্ধারিত"}
                    </span>
                    <span className="text-xs font-mono text-muted">
                      {art.year} • {art.status}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold mt-1 group-hover:text-accent transition">
                    {art.title}
                  </h3>
                  <p className="text-xs text-muted mt-1">{art.medium}</p>
                  {art.privateNotes && (
                    <p className="text-xs text-muted/90 mt-2 line-clamp-2 italic">
                      “{art.privateNotes}”
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-subtle text-xs">
                  <span className="text-muted font-mono">{art.dimensions}</span>
                  <span className="text-accent font-medium">বিস্তারিত দেখুন →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
