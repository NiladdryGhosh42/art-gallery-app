import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { CollectionDetailClient } from "@/components/collection-detail-client";

export const dynamic = "force-dynamic";

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [config, collection, galleryCount, colCount, trashedCount] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.collection.findUnique({
      where: { id },
      include: {
        artworks: {
          where: { trashed: false },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    prisma.artwork.count({ where: { trashed: false } }),
    prisma.collection.count(),
    prisma.artwork.count({ where: { trashed: true } }),
  ]);

  if (!collection) notFound();

  return (
    <StudioShell
      studioName={config?.studioName || "ফুলচিত্র"}
      curatorName={config?.curatorName || "স্টুডিও আর্কাইভ"}
      initialTheme={config?.theme || "paper"}
      counts={{
        gallery: galleryCount,
        collections: colCount,
        trash: trashedCount,
      }}
    >
      <CollectionDetailClient collection={collection} />
    </StudioShell>
  );
}
