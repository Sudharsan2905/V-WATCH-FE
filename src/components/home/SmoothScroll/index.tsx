"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
// Required by Lenis: forces `height: auto` on html/body (our layout sets
// h-full, which would otherwise cap the scrollable area) and handles the
// [data-lenis-prevent] escape hatches.
import "lenis/dist/lenis.css";
import { setPageScroller } from "@/lib/scrollChain";

export default function SmoothScroll() {
  const pathname = usePathname();
  
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
      lenis.destroy();
    };
  }, []);

  // Client-side navigation swaps the whole page under Lenis; remeasure once the
  // new route has painted.
  useEffect(() => {
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event("resize")));
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
