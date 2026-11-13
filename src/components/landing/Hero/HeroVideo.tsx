"use client";

import { useEffect, useRef } from "react";

// Looping lifecycle clip in the hero figure. Muted + playsInline so mobile
// browsers allow autoplay; paused for visitors who prefer reduced motion.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <video
      ref={ref}
      // Slight zoom crops a thin grey border baked into the clip's edges.
      className="absolute inset-0 h-full w-full scale-[1.04] object-cover"
      src="/landing/hero-lifecycle.mp4"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden
    />
  );
}
