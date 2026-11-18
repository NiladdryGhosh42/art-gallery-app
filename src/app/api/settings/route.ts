import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const dataToUpdate: Record<string, string> = {};

  if (body.studioName) dataToUpdate.studioName = body.studioName.trim();
  if (body.curatorName) dataToUpdate.curatorName = body.curatorName.trim();
  if (body.curatorBio !== undefined) dataToUpdate.curatorBio = body.curatorBio.trim();
  if (body.theme) dataToUpdate.theme = body.theme;

  if (body.newPassword && body.newPassword.trim().length >= 4) {
    dataToUpdate.passwordHash = await bcrypt.hash(body.newPassword.trim(), 12);
  }

  const updated = await prisma.studioConfig.update({
    where: { id: "singleton" },
    data: dataToUpdate,
  });

  return NextResponse.json({
    studioName: updated.studioName,
    curatorName: updated.curatorName,
    curatorBio: updated.curatorBio,
    theme: updated.theme,
  });
}
