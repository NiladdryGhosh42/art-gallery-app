import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { checkRateLimit, recordFailedAttempt, clearAttempts } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "local-client";
  const rate = checkRateLimit(ip);

  if (!rate.allowed) {
    return NextResponse.json(
      { error: `অনেকবার ভুল চেষ্টা করা হয়েছে। ${rate.retryAfterSec} সেকেন্ড পর আবার চেষ্টা করুন।` },
      { status: 429 }
    );
  }

  try {
    const { passcode } = await req.json();
    if (!passcode || typeof passcode !== "string") {
      return NextResponse.json({ error: "পাসকোড প্রদান করুন।" }, { status: 400 });
    }

    let config = await prisma.studioConfig.findUnique({ where: { id: "singleton" } });
    if (!config) {
      const defaultHash = await bcrypt.hash("ফুলচিত্র", 12);
      config = await prisma.studioConfig.create({
        data: { id: "singleton", passwordHash: defaultHash },
      });
    }

    const isValid = await bcrypt.compare(passcode.trim(), config.passwordHash);
    if (!isValid) {
      recordFailedAttempt(ip);
      return NextResponse.json({ error: "ভুল পাসকোড। আবার চেষ্টা করুন।" }, { status: 401 });
    }

    clearAttempts(ip);
    const token = await createSessionToken();

    const response = NextResponse.json({ ok: true });
    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch {
    return NextResponse.json({ error: "সার্ভার ত্রুটি হয়েছে।" }, { status: 500 });
  }
}
