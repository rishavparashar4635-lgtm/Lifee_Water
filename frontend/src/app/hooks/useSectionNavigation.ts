import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { throttle } from "../utils/throttle";
import { SECTION_IDS, getActiveSectionId } from "../sectionNav/sectionIds";
import { isSectionScrollSpySuppressed, suppressSectionScrollSpy } from "../sectionNav/sectionScrollSpy";

export { suppressSectionScrollSpy } from "../sectionNav/sectionScrollSpy";

/**
 * Keeps `location.hash` in sync with the visible section while scrolling,
 * and scrolls to the target section when the hash changes (nav click, footer link, direct URL).
 */
export function useSectionNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const syncingFromSpy = useRef(false);

  // Scroll to section when hash changes (navbar, Link to="/#...", shared URL)
  useEffect(() => {
    if (location.pathname !== "/") return;

    if (syncingFromSpy.current) {
      syncingFromSpy.current = false;
      return;
    }

    const hash = location.hash.replace(/^#/, "");
    if (!hash) return;

    suppressSectionScrollSpy(550);

    const t = window.setTimeout(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);

    return () => window.clearTimeout(t);
  }, [location.pathname, location.hash]);

  // Throttled scroll-spy: update URL with replace (no extra history entries while scrolling)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const onScroll = throttle(() => {
      if (isSectionScrollSpySuppressed()) return;

      const active = getActiveSectionId(SECTION_IDS);
      const rawHash = window.location.hash.replace(/^#/, "");
      const currentId = rawHash || "home";

      if (active === currentId) return;

      syncingFromSpy.current = true;
      if (active === "home") {
        navigate({ pathname: "/", hash: "" }, { replace: true, preventScrollReset: true });
      } else {
        navigate({ pathname: "/", hash: `#${active}` }, { replace: true, preventScrollReset: true });
      }
    }, 120);

    window.addEventListener("scroll", onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [location.pathname, navigate]);
}
