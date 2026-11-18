import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const updated = await prisma.artwork.update({
    where: { id },
    data: {
      ...(body.title !== undefined ? { title: body.title } : {}),
      ...(body.year !== undefined ? { year: body.year } : {}),
      ...(body.medium !== undefined ? { medium: body.medium } : {}),
      ...(body.dimensions !== undefined ? { dimensions: body.dimensions } : {}),
      ...(body.status !== undefined ? { status: body.status } : {}),
      ...(body.collectionId !== undefined
        ? { collectionId: body.collectionId || null }
        : {}),
      ...(body.tags !== undefined ? { tags: body.tags } : {}),
      ...(body.privateNotes !== undefined ? { privateNotes: body.privateNotes } : {}),
      ...(body.favorite !== undefined ? { favorite: Boolean(body.favorite) } : {}),
      ...(body.trashed !== undefined ? { trashed: Boolean(body.trashed) } : {}),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const art = await prisma.artwork.findUnique({ where: { id } });

  if (art?.imagePath) {
    const filePath = path.join(process.cwd(), "private_uploads", art.imagePath);
    await fs.unlink(filePath).catch(() => {});
  }

  await prisma.artwork.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
