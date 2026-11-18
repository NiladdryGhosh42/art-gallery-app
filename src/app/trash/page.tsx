import React from "react";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { TrashClient } from "@/components/trash-client";

export const dynamic = "force-dynamic";

export default async function TrashPage() {
  const [config, trashedArtworks, galleryCount, colCount] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.artwork.findMany({
      where: { trashed: true },
      orderBy: { updatedAt: "desc" },
    }),
    prisma.artwork.count({ where: { trashed: false } }),
    prisma.collection.count(),
  ]);

  return (
    <StudioShell
      studioName={config?.studioName || "ফুলচিত্র"}
      curatorName={config?.curatorName || "স্টুডিও আর্কাইভ"}
      initialTheme={config?.theme || "paper"}
      counts={{
        gallery: galleryCount,
        collections: colCount,
        trash: trashedArtworks.length,
      }}
    >
      <TrashClient artworks={trashedArtworks} />
    </StudioShell>
  );
}
