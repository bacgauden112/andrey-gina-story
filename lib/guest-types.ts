// Client-safe (no database import): used by both the admin UI and the invitation.
export type GuestType = "BOTH" | "GROOM" | "BRIDE";

export const GUEST_TYPES: { value: GuestType; label: string }[] = [
  { value: "BOTH", label: "Cả 2 lễ" },
  { value: "GROOM", label: "Chỉ nhà trai" },
  { value: "BRIDE", label: "Chỉ nhà gái" },
];

export function isGuestType(v: unknown): v is GuestType {
  return v === "BOTH" || v === "GROOM" || v === "BRIDE";
}

export function normalizeGuestType(v: unknown): GuestType {
  return isGuestType(v) ? v : "BOTH";
}

// How the guest is addressed in the invitation link preview ("Thân mời Lan", "Kính mời cô Nga").
export const INVITE_PREFIXES = ["Thân mời", "Kính mời", "Trân trọng kính mời"];
export const DEFAULT_INVITE_PREFIX = INVITE_PREFIXES[0];

export function normalizeInvitePrefix(v: unknown): string {
  const t = typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, 40) : "";
  return t || DEFAULT_INVITE_PREFIX;
}
