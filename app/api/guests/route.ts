import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ensureGuestCodes, isGuestType, nextGuestCode, normalizeInvitePrefix } from "@/lib/guest";

export async function GET() {
  try {
    await ensureGuestCodes();
    const guests = await prisma.guest.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(guests);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch guests" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name } = body;
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    const guestType = isGuestType(body.guestType) ? body.guestType : "BOTH";

    // `code` is unique: if two guests are created at the same moment, retry with the next number.
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        const guest = await prisma.guest.create({
          data: { name, guestType, invitePrefix: normalizeInvitePrefix(body.invitePrefix), code: await nextGuestCode() },
        });
        return NextResponse.json(guest);
      } catch (e) {
        if ((e as { code?: string })?.code !== "P2002") throw e;
      }
    }
    return NextResponse.json({ error: "Could not allocate guest code" }, { status: 500 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create guest" }, { status: 500 });
  }
}
