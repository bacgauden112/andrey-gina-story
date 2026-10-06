import type { GuestType } from "@/lib/guest-types";

// Offsets (canvas px) applied to sections that follow content whose height changed.
// The page is an absolutely positioned canvas, so growing/shrinking a section means
// shifting everything below it by the same amount.
const SHIFT_AFTER_INVITE_BOTH = 116; // Section3 with both party blocks
export const PARTY_BLOCK_STEP = 621; // height of one party block + gap, removed for single-side guests
export const SHIFT_AFTER_INTRO = 178; // Section8 gets longer (couple profiles)
// Guestbook box height change vs the original design (negative = taller, room for more wishes next to the form).
export const WISHES_SHRINK = -220;
export const SHIFT_AFTER_ALBUM = -170; // Section9 album is shorter (collages)

export function shiftAfterInvite(type: GuestType) {
  return SHIFT_AFTER_INVITE_BOTH - (type === "BOTH" ? 0 : PARTY_BLOCK_STEP);
}

export function canvasBaseH(type: GuestType) {
  return 10640 - WISHES_SHRINK + shiftAfterInvite(type) + SHIFT_AFTER_INTRO + SHIFT_AFTER_ALBUM;
}
