import type Lenis from "lenis";

// The page-level Lenis instance, registered by <SmoothScroll /> on mount.
let pageScroller: Lenis | null = null;

export function setPageScroller(lenis: Lenis | null) {
  pageScroller = lenis;
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
