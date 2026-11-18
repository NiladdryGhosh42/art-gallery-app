import React from "react";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { GalleryClient } from "@/components/gallery-client";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [config, artworks, collections, trashedCount] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.artwork.findMany({
      where: { trashed: false },
      include: { collection: { select: { id: true, name: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.collection.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.artwork.count({ where: { trashed: true } }),
  ]);

  return (
    <StudioShell
      studioName={config?.studioName || "ফুলচিত্র"}
      curatorName={config?.curatorName || "স্টুডিও আর্কাইভ"}
      initialTheme={config?.theme || "paper"}
      counts={{
        gallery: artworks.length,
        collections: collections.length,
        trash: trashedCount,
      }}
    >
      <GalleryClient artworks={artworks} collections={collections} />
    </StudioShell>
  );
}
