/**
 * Temporarily pauses scroll-spy hash updates (e.g. during smooth scroll from nav click).
 */
let suppressedUntil = 0;

export function suppressSectionScrollSpy(ms = 650) {
  suppressedUntil = Date.now() + ms;
}

export function isSectionScrollSpySuppressed(): boolean {
  return Date.now() < suppressedUntil;
}
