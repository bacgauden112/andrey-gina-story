import { prisma } from "@/lib/prisma";

import type { GuestType } from "@/lib/guest-types";

export { GUEST_TYPES, isGuestType, normalizeGuestType, INVITE_PREFIXES, normalizeInvitePrefix } from "@/lib/guest-types";
export type { GuestType } from "@/lib/guest-types";

// The invitation link carries the guest code (wedding-0001); old links carry the raw id.
export async function findGuestByRef(ref: unknown) {
  if (!ref || typeof ref !== "string") return null;
  try {
    const guest =
      (await prisma.guest.findUnique({ where: { code: ref } })) ||
      (await prisma.guest.findUnique({ where: { id: ref } }));
    if (guest && !guest.code) {
      await ensureGuestCodes();
      return await prisma.guest.findUnique({ where: { id: guest.id } });
    }
    return guest;
  } catch {
    return null;
  }
}

export function formatGuestCode(n: number) {
  return `wedding-${String(n).padStart(4, "0")}`;
}

// Next number after the highest one ever issued (deleted codes are never reused while the highest one exists).
export async function nextGuestCode() {
  const rows = await prisma.guest.findMany({ where: { code: { not: null } }, select: { code: true } });
  let max = 0;
  for (const r of rows) {
    const m = /^wedding-(\d+)$/.exec(r.code || "");
    if (m) max = Math.max(max, Number(m[1]));
  }
  return formatGuestCode(max + 1);
}

// Self-healing: any guest that ended up without a code (e.g. created by an older deployment) gets the next one.
export async function ensureGuestCodes() {
  const missing = await prisma.guest.findMany({
    where: { code: null },
    orderBy: { createdAt: "asc" },
    select: { id: true },
  });
  for (const g of missing) {
    for (let attempt = 0; attempt < 5; attempt++) {
      try {
        await prisma.guest.update({ where: { id: g.id }, data: { code: await nextGuestCode() } });
        break;
      } catch (e) {
        if ((e as { code?: string })?.code !== "P2002") throw e;
      }
    }
  }
  return missing.length;
}

// The guestbook is the list of RSVP messages. A message saved only on the guest (e.g. by an older
// deployment) gets its guestbook entry here, so the list never misses one.
export async function syncGuestWishes() {
  const [guests, wishes] = await Promise.all([
    prisma.guest.findMany({
      where: { message: { not: null } },
      select: { id: true, name: true, message: true, updatedAt: true },
    }),
    prisma.wish.findMany({ where: { guestId: { not: null }, fromRsvp: true }, select: { guestId: true } }),
  ]);
  const linked = new Set(wishes.map((w) => w.guestId));
  for (const g of guests) {
    const content = (g.message || "").trim();
    if (!content || linked.has(g.id)) continue;
    await prisma.wish.create({ data: { guestId: g.id, fromRsvp: true, name: g.name, content, createdAt: g.updatedAt } });
  }
}

type Answers = { status: string; attendBride: boolean; attendGroom: boolean; needShuttle: boolean };

// An answered RSVP stops being valid when it mentions a party the guest is no longer invited to.
export function rsvpConflictsWith(type: GuestType, g: Answers) {
  if (g.status !== "THAM_GIA") return false;
  if (type === "GROOM") return g.attendBride || g.needShuttle;
  if (type === "BRIDE") return g.attendGroom;
  return false;
}

export const RSVP_RESET = {
  status: "CHUA_XAC_NHAN",
  guestCount: 1,
  attendBride: false,
  attendGroom: false,
  needShuttle: false,
  shuttleCount: 0,
} as const;
