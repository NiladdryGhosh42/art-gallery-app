import React from "react";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { CollectionsClient } from "@/components/collections-client";

export const dynamic = "force-dynamic";

export default async function CollectionsPage() {
  const [config, collections, galleryCount, trashedCount] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.collection.findMany({
      include: {
        artworks: {
          where: { trashed: false },
          select: { id: true, imagePath: true, svgKey: true },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.artwork.count({ where: { trashed: false } }),
    prisma.artwork.count({ where: { trashed: true } }),
  ]);

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
      <CollectionsClient collections={collections} />
    </StudioShell>
  );
}
