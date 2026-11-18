import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { ArtworkDetailClient } from "@/components/artwork-detail-client";

export const dynamic = "force-dynamic";

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [config, artwork, collections, galleryCount, trashedCount] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.artwork.findUnique({ where: { id } }),
    prisma.collection.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.artwork.count({ where: { trashed: false } }),
    prisma.artwork.count({ where: { trashed: true } }),
  ]);

  if (!artwork) notFound();

  return (
    <StudioShell
      studioName={config?.studioName || "ফুলচিত্র"}
      curatorName={config?.curatorName || "স্টুডিও আর্কাইভ"}
      initialTheme={config?.theme || "paper"}
      counts={{
        gallery: galleryCount,
        collections: collections.length,
        trash: trashedCount,
      }}
    >
      <ArtworkDetailClient artwork={artwork} collections={collections} />
    </StudioShell>
  );
}
