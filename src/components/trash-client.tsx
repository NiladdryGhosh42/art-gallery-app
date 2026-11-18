"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Trash2 } from "lucide-react";
import { SampleArtworkPlate } from "./sample-plates";
import type { ArtworkDTO } from "./gallery-client";

export function TrashClient({ artworks }: { artworks: ArtworkDTO[] }) {
  const router = useRouter();

  const restoreArtwork = async (id: string) => {
    await fetch(`/api/artworks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trashed: false }),
    });
    router.refresh();
  };

  const permanentDelete = async (id: string) => {
    await fetch(`/api/artworks/${id}`, { method: "DELETE" });
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="pb-4 border-b border-subtle">
        <p className="text-xs font-mono uppercase tracking-widest text-accent mb-1">
          অস্থায়ীভাবে মুছে ফেলা • SOFT-DELETED
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight">
          স্টুডিও ট্র্যাশ{" "}
          <span className="text-xl sm:text-2xl font-normal text-muted">(Trash)</span>
        </h2>
      </div>

      {artworks.length === 0 ? (
        <div className="bg-surface border border-subtle rounded-2xl p-12 text-center space-y-2">
          <p className="font-serif text-2xl font-semibold">ট্র্যাশ খালি আছে</p>
          <p className="text-sm text-muted">
            মুছে ফেলা শিল্পকর্মগুলো স্থায়ীভাবে অপসারণের আগে এখানে জমা থাকে।
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="studio-card rounded-2xl overflow-hidden flex flex-col opacity-90"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-elevated border-b border-subtle grayscale">
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
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="font-serif text-xl font-bold">{art.title}</h3>
                  <p className="text-xs text-muted mt-0.5">
                    {art.medium} • {art.year}
                  </p>
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-subtle">
                  <button
                    onClick={() => restoreArtwork(art.id)}
                    className="flex-1 py-1.5 px-3 rounded-xl bg-elevated hover:bg-accent hover:text-white text-xs font-medium transition inline-flex items-center justify-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> পুনরুদ্ধার
                  </button>
                  <button
                    onClick={() => permanentDelete(art.id)}
                    className="py-1.5 px-3 rounded-xl border border-red-300 text-red-600 hover:bg-red-500/10 text-xs font-medium transition inline-flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> স্থায়ীভাবে মুছুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
