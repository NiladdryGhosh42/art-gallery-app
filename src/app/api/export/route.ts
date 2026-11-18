import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const [config, collections, artworks] = await Promise.all([
    prisma.studioConfig.findUnique({ where: { id: "singleton" } }),
    prisma.collection.findMany(),
    prisma.artwork.findMany(),
  ]);

  const bundle = {
    exportedAt: new Date().toISOString(),
    platform: "ফুলচিত্র (Phulchitra)",
    settings: {
      studioName: config?.studioName,
      curatorName: config?.curatorName,
      curatorBio: config?.curatorBio,
      theme: config?.theme,
    },
    collections,
    artworks,
  };

  return new NextResponse(JSON.stringify(bundle, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Content-Disposition": `attachment; filename="phulchitra-archive-${new Date().toISOString().split("T")[0]}.json"`,
    },
  });
}
