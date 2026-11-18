import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, description } = await req.json();
  if (!name?.trim()) {
    return NextResponse.json({ error: "সংকলনের নাম আবশ্যক" }, { status: 400 });
  }

  const col = await prisma.collection.create({
    data: {
      name: name.trim(),
      description: description?.trim() || "",
    },
  });

  return NextResponse.json(col, { status: 201 });
}
