"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Heart, Trash2, Save } from "lucide-react";
import { SampleArtworkPlate } from "./sample-plates";
import type { ArtworkDTO } from "./gallery-client";

export function ArtworkDetailClient({
  artwork,
  collections,
}: {
  artwork: ArtworkDTO;
  collections: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [title, setTitle] = useState(artwork.title);
  const [year, setYear] = useState(artwork.year);
  const [dimensions, setDimensions] = useState(artwork.dimensions || "");
  const [medium, setMedium] = useState(artwork.medium);
  const [status, setStatus] = useState(artwork.status);
  const [collectionId, setCollectionId] = useState(artwork.collectionId || "");
  const [tags, setTags] = useState(artwork.tags);
  const [privateNotes, setPrivateNotes] = useState(artwork.privateNotes || "");
  const [favorite, setFavorite] = useState(artwork.favorite);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    await fetch(`/api/artworks/${artwork.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        year,
        dimensions,
        medium,
        status,
        collectionId,
        tags,
        privateNotes,
        favorite,
      }),
    });
    setSaving(false);
    setMessage("শিল্পকর্মের তথ্য সংরক্ষিত হয়েছে");
    router.refresh();
  };

  const toggleFavorite = async () => {
    const next = !favorite;
    setFavorite(next);
    await fetch(`/api/artworks/${artwork.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ favorite: next }),
    });
    router.refresh();
  };

  const moveToTrash = async () => {
    await fetch(`/api/artworks/${artwork.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trashed: true }),
    });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-subtle">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          গ্যালারিতে ফিরে যান (Back to Gallery)
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleFavorite}
            className={`px-3.5 py-2 rounded-xl border text-xs font-medium inline-flex items-center gap-1.5 transition ${
              favorite
                ? "bg-accent text-white border-accent"
                : "bg-surface border-subtle hover:bg-elevated"
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${favorite ? "fill-current" : ""}`} />
            {favorite ? "প্রিয় তালিকায় আছে" : "প্রিয় চিহ্নিত করুন"}
          </button>

          <button
            onClick={moveToTrash}
            className="px-3.5 py-2 rounded-xl border border-red-300 text-red-600 hover:bg-red-500/10 text-xs font-medium inline-flex items-center gap-1.5 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            ট্র্যাশে পাঠান
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-7 bg-surface border border-subtle rounded-2xl p-4 sm:p-8 flex items-center justify-center shadow-xs">
          <div className="w-full max-h-[620px] overflow-hidden rounded-xl flex items-center justify-center bg-elevated/40">
            {artwork.imagePath ? (
              <img
                src={`/api/images/${artwork.imagePath}`}
                alt={artwork.title}
                className="w-full h-auto max-h-[600px] object-contain"
              />
            ) : (
              <SampleArtworkPlate svgKey={artwork.svgKey} />
            )}
          </div>
        </div>

        <div className="lg:col-span-5 bg-surface border border-subtle rounded-2xl p-6 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted">ID: {artwork.id.toUpperCase()}</span>
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-elevated text-accent">
              {status}
            </span>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                শিল্পকর্মের শিরোনাম (Title)
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle font-serif text-xl font-bold focus:outline-none focus:border-accent"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">সাল (Year)</label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">অবস্থা (Status)</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
                >
                  <option value="Finished">সমাপ্ত (Finished)</option>
                  <option value="Work in Progress">চলমান (Work in Progress)</option>
                  <option value="Sketch">স্কেচ (Sketch)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-muted mb-1">মাধ্যম (Medium)</label>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-muted mb-1">
                  আয়তন (Dimensions)
                </label>
                <input
                  type="text"
                  value={dimensions}
                  onChange={(e) => setDimensions(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                নির্ধারিত সংকলন (Collection)
              </label>
              <select
                value={collectionId}
                onChange={(e) => setCollectionId(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
              >
                <option value="">অনির্ধারিত (Unassigned)</option>
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">ট্যাগসমূহ (Tags)</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-muted mb-1">
                একান্ত স্টুডিও নোট (Private Notes)
              </label>
              <textarea
                rows={4}
                value={privateNotes}
                onChange={(e) => setPrivateNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm leading-relaxed focus:outline-none focus:border-accent"
              />
            </div>

            {message && (
              <p className="text-xs text-emerald-700 font-medium">{message}</p>
            )}

            <button
              type="submit"
              disabled={saving}
              className="w-full py-2.5 px-4 rounded-xl bg-accent hover:bg-accentHover text-white font-medium text-sm transition inline-flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? "সংরক্ষণ হচ্ছে..." : "তথ্য সংরক্ষণ করুন (Save Changes)"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
