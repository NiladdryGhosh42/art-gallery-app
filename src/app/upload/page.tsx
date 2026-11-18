import React from "react";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { UploadClient } from "@/components/upload-client";

export const dynamic = "force-dynamic";

export default async function UploadPage() {
  const [config, collections, galleryCount, trashedCount] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.collection.findMany({ orderBy: { createdAt: "desc" } }),
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
      <UploadClient collections={collections} />
    </StudioShell>
  );
}
