import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const trashed = searchParams.get("trashed") === "true";

  const artworks = await prisma.artwork.findMany({
    where: { trashed },
    include: { collection: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(artworks);
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const title = String(formData.get("title") || "").trim();
    const year = String(formData.get("year") || "২০২৬").trim();
    const medium = String(formData.get("medium") || "মিশ্র মাধ্যম").trim();
    const dimensions = String(formData.get("dimensions") || "").trim();
    const status = String(formData.get("status") || "Finished").trim();
    const collectionId = String(formData.get("collectionId") || "").trim() || null;
    const tags = String(formData.get("tags") || "").trim();
    const privateNotes = String(formData.get("privateNotes") || "").trim();
    const file = formData.get("file") as File | null;

    if (!title) {
      return NextResponse.json({ error: "শিরোনাম আবশ্যক" }, { status: 400 });
    }

    let imagePath: string | null = null;
    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const storageDir = path.join(process.cwd(), "private_uploads");
      await fs.mkdir(storageDir, { recursive: true });

      const filename = `art-${Date.now()}.webp`;
      const fullPath = path.join(storageDir, filename);

      await sharp(buffer)
        .resize({ width: 1800, withoutEnlargement: true })
        .webp({ quality: 88 })
        .toFile(fullPath);

      imagePath = filename;
    }

    const created = await prisma.artwork.create({
      data: {
        title,
        year,
        medium,
        dimensions,
        status,
        collectionId,
        tags,
        privateNotes,
        imagePath,
        svgKey: imagePath ? null : "afternoon-light",
      },
    });

    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "আপলোড ব্যর্থ হয়েছে" }, { status: 500 });
  }
}
