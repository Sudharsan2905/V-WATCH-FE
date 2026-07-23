"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
// Required by Lenis: forces `height: auto` on html/body (our layout sets
// h-full, which would otherwise cap the scrollable area) and handles the
// [data-lenis-prevent] escape hatches.
import "lenis/dist/lenis.css";
import { setPageScroller } from "@/lib/scrollChain";

export default function SmoothScroll() {
  const pathname = usePathname();
  // Hold the live Lenis instance so the route-change effect below can reset the
  // scroll position (Lenis manages scroll itself, so Next's default
  // scroll-to-top on navigation never fires).
  const lenisRef = useRef<Lenis | null>(null);
  // The route effect below also fires once on the initial mount — i.e. a full
  // page load / refresh. On a refresh the browser restores the previous scroll
  // offset, so we must NOT reset to the top there (that fight is what produced
  // the "jump to top then back to position" flash). Skip that first run so a
  // refresh continues from where the user was; only later runs (real in-app
  // navigations) reset to the top.
  const isFirstRun = useRef(true);

  useEffect(() => {
    const lenis = new Lenis({ 
      duration: 2.2,
      wheelMultiplier: 1,
      touchMultiplier: 0.9,
      lerp: 0.045,
      smoothWheel: true,
      syncTouch: false, 
      // Takes over in-page #anchor jumps (Hero -> "how it works", hrms -> #trial)
      // from the CSS `scroll-behavior: smooth` we had to remove.
      anchors: true,
    });
    lenisRef.current = lenis;

    // Nested scroll panels (see chainWheelToPage) need the instance to hand
    // their over-scrolled wheel deltas back to the page.
    setPageScroller(lenis);

    // Hold the *live* frame id. Capturing only the first one leaks the loop:
    // cleanup would cancel an already-consumed id, leaving the old loop driving
    // a destroyed Lenis while the next mount starts a second one. Two loops
    // writing scrollTop each frame is what made scrolling stall mid-page.
    let rafId = requestAnimationFrame(function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    });

    // Late-arriving webfonts and images change document height after Lenis has
    // measured it, which strands the scroll limit partway down the page.
    const resize = () => lenis.resize();
    window.addEventListener("load", resize);
    document.fonts?.ready.then(resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", resize);
      setPageScroller(null);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  // Client-side navigation swaps the whole page under Lenis. Because Lenis owns
  // the scroll position, Next's default scroll-to-top never runs — so the new
  // route would open at the previous page's scroll offset. Jump to the top
  // ourselves (immediately, no animation), unless the URL targets an in-page
  // anchor. Then remeasure once the new route has painted.
  useEffect(() => {
    const lenis = lenisRef.current;
    // Only reset to the top on real navigations — not on the initial load /
    // refresh, where the browser restores the previous scroll offset.
    if (isFirstRun.current) {
      isFirstRun.current = false;
    } else if (lenis && !window.location.hash) {
      lenis.scrollTo(0, { immediate: true, force: true });
    }
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
