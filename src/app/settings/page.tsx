import React from "react";
import { prisma } from "@/lib/prisma";
import { StudioShell } from "@/components/studio-shell";
import { SettingsClient } from "@/components/settings-client";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const [config, activeWorks, collections, trashedWorks] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.artwork.count({ where: { trashed: false } }),
    prisma.collection.count(),
    prisma.artwork.count({ where: { trashed: true } }),
  ]);

  return (
    <StudioShell
      studioName={config?.studioName || "ফুলচিত্র"}
      curatorName={config?.curatorName || "স্টুডিও আর্কাইভ"}
      initialTheme={config?.theme || "paper"}
      counts={{
        gallery: activeWorks,
        collections,
        trash: trashedWorks,
      }}
    >
      <SettingsClient
        initialConfig={{
          studioName: config?.studioName || "ফুলচিত্র",
          curatorName: config?.curatorName || "স্টুডিও আর্কাইভ",
          curatorBio: config?.curatorBio || "",
          theme: config?.theme || "paper",
        }}
        stats={{
          activeWorks,
          collections,
          trashedWorks,
        }}
      />
    </StudioShell>
  );
}
