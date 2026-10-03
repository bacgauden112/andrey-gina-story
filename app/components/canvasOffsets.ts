// Offsets (canvas px) applied to sections that follow content whose height changed.
// The page is an absolutely positioned canvas, so growing/shrinking a section means
// shifting everything below it by the same amount.
export const SHIFT_AFTER_INVITE = 116; // Section3 is taller (two party blocks)
export const SHIFT_AFTER_INTRO = 178; // Section8 gets longer (couple profiles)
export const SHIFT_AFTER_ALBUM = -170; // Section9 album is shorter (two collages)
export const CANVAS_BASE_H = 10640 + SHIFT_AFTER_INVITE + SHIFT_AFTER_INTRO + SHIFT_AFTER_ALBUM;
