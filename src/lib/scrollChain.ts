import type Lenis from "lenis";

// The page-level Lenis instance, registered by <SmoothScroll /> on mount.
let pageScroller: Lenis | null = null;

export function setPageScroller(lenis: Lenis | null) {
  pageScroller = lenis;
}

/**
 * Lock or unlock the page's scroll — used by full-screen overlays (e.g. the
 * cookie preferences modal) so the background can't scroll behind them.
 *
 * Lenis drives the scroll itself, so `overflow: hidden` on the body isn't
 * enough; `lenis.stop()` is what actually freezes wheel/touch handling. We also
 * pin `document.body` overflow as a fallback for the brief window before Lenis
 * mounts (or if it's ever absent).
 */
export function setPageScrollLocked(locked: boolean) {
  if (typeof document !== "undefined") {
    document.body.style.overflow = locked ? "hidden" : "";
  }
  if (!pageScroller) return;
  if (locked) pageScroller.stop();
  else pageScroller.start();
}

/**
 * Smoothly scroll the page to an absolute Y position through the same Lenis
 * instance driving the rest of the page — never native `window.scrollTo({
 * behavior: "smooth" })`, which animates the same scrollTop Lenis writes
 * every frame and fights it to a stutter (see the note on
 * `setPageScrollLocked` above). Falls back to native smooth-scroll only for
 * the brief window before Lenis mounts.
 */
export function scrollPageTo(target: number, options?: { onComplete?: () => void }) {
  if (pageScroller) {
    pageScroller.scrollTo(target, { onComplete: options?.onComplete });
    return;
  }
  window.scrollTo({ top: target, behavior: "smooth" });
  if (options?.onComplete) {
    window.addEventListener("scrollend", options.onComplete, { once: true });
  }
}

/**
 * Hand an over-scrolled wheel delta back to the page.
 *
 * Nested scroll panels need `data-lenis-prevent` so Lenis stops swallowing the
 * wheel — but that attribute also pins `overscroll-behavior: contain`, which
 * kills native scroll chaining. The result is a dead zone: once the inner list
 * bottoms out, the page stops moving under the cursor.
 *
 * So we chain by hand. If the panel still has room to move in the wheel's
 * direction we do nothing (the browser scrolls it natively); once it's at the
 * edge, the delta is forwarded to Lenis so the page picks up smoothly.
 *
 * Returns true when the delta was forwarded to the page.
 */
export function chainWheelToPage(
  el: HTMLElement | null,
  deltaY: number,
): boolean {
  if (!el || deltaY === 0 || !pageScroller) return false;

  const atTop = el.scrollTop <= 0;
  // Sub-pixel scroll heights mean the bottom rarely lands on an exact integer.
  const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
  if (!(deltaY < 0 ? atTop : atBottom)) return false;

  // targetScroll, not the current position — otherwise each tick re-anchors to
  // a still-animating value and the page crawls.
  pageScroller.scrollTo(pageScroller.targetScroll + deltaY);
  return true;
}
