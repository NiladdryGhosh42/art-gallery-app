"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ImagePlus } from "lucide-react";

export function UploadClient({
  collections,
}: {
  collections: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("২০২৬");
  const [medium, setMedium] = useState("");
  const [dimensions, setDimensions] = useState("");
  const [status, setStatus] = useState("Finished");
  const [collectionId, setCollectionId] = useState("");
  const [tags, setTags] = useState("");
  const [privateNotes, setPrivateNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleFileSelect = (selected: File) => {
    setFile(selected);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(selected);
    if (!title) {
      setTitle(selected.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("year", year);
    formData.append("medium", medium || "মিশ্র মাধ্যম");
    formData.append("dimensions", dimensions);
    formData.append("status", status);
    formData.append("collectionId", collectionId);
    formData.append("tags", tags);
    formData.append("privateNotes", privateNotes);
    if (file) formData.append("file", file);

    const res = await fetch("/api/artworks", {
      method: "POST",
      body: formData,
    });

    setSubmitting(false);
    if (res.ok) {
      router.push("/");
      router.refresh();
    }
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-subtle">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
          স্কেচবুকে নতুন পাতা • NEW SKETCHBOOK PAGE
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          আপলোড স্টুডিও{" "}
          <span className="text-xl sm:text-2xl font-normal text-muted">(Upload)</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6">
          <label className="border-2 border-dashed border-subtle hover:border-accent rounded-2xl bg-surface p-8 text-center transition cursor-pointer flex flex-col items-center justify-center min-h-[340px]">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) handleFileSelect(e.target.files[0]);
              }}
            />
            {preview ? (
              <img
                src={preview}
                alt="Preview"
                className="max-h-80 mx-auto rounded-xl object-contain"
              />
            ) : (
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-elevated mx-auto flex items-center justify-center text-accent">
                  <ImagePlus className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium">
                  শিল্পকর্মের ছবি নির্বাচন করুন বা এখানে ছেড়ে দিন
                </p>
                <p className="text-xs text-muted">
                  PNG, JPG, WEBP সমর্থিত (Sharp দ্বারা অপ্টিমাইজড ও সুরক্ষিত)
                </p>
              </div>
            )}
          </label>
        </div>

        <div className="lg:col-span-6 bg-surface border border-subtle rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted mb-1">শিরোনাম (Title) *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="যেমন: বুড়িগঙ্গার তীরে গোধূলি"
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
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
                placeholder="জলরং, চারকোল, তেলরং..."
                className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-muted mb-1">আয়তন (Dimensions)</label>
              <input
                type="text"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                placeholder="যেমন: ৫০ × ৭০ সেমি"
                className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              সংকলন নির্বাচন (Collection)
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
              placeholder="আলো, জলরং, স্মৃতি"
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-muted mb-1">
              একান্ত স্টুডিও নোট (Private Notes)
            </label>
            <textarea
              rows={3}
              value={privateNotes}
              onChange={(e) => setPrivateNotes(e.target.value)}
              placeholder="এই ছবিটির পেছনের গল্প বা অনুভূতি..."
              className="w-full px-3.5 py-2 rounded-xl bg-canvas border border-subtle text-sm focus:outline-none focus:border-accent"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl border border-subtle text-sm font-medium hover:bg-elevated transition"
            >
              বাতিল
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-accent hover:bg-accentHover text-white text-sm font-medium transition shadow-xs disabled:opacity-50"
            >
              {submitting ? "সংরক্ষণ হচ্ছে..." : "আর্কাইভে সংরক্ষণ করুন"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
