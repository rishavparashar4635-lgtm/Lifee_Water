/**
 * Section IDs in DOM order (top → bottom). Used for scroll-spy and hash sync.
 * Each id must match the corresponding section's `id` attribute.
 */
export const SECTION_IDS = [
  "home",
  "about",
  "process",
  "products",
  "certifications",
  "why-us",
  "customizer",
  "distribution",
  "contact",
] as const;

/** Navbar + scroll-spy: offset for fixed header (~h-20) plus small buffer */
export const HEADER_SCROLL_OFFSET = 88;

/**
 * Returns which section is “active” — the last section whose top edge is at or above the scroll line.
 */
export function getActiveSectionId(ids: readonly string[]): string {
  const line = window.scrollY + HEADER_SCROLL_OFFSET;
  let best = ids[0];
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= line + 1) {
      best = id;
    }
  }
  return best;
}
