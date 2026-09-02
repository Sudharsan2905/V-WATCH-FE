"use client";

import { useRef, useState } from "react";
import { motion, MotionConfig, type Variants } from "motion/react";

// Shared ease — matches the rest of the site (≈ easeOutQuint).
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Header clip-wipe from the top — the site's signature heading reveal.
const wipeDown: Variants = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (delay = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { delay, duration: 0.6, ease: EASE },
  }),
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE, delay },
  }),
};

// Frame reveal — rise + subtle scale, same feel as the glass cards elsewhere.
const frameIn: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: EASE, delay },
  }),
};

const VIEWPORT = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -120px 0px",
} as const;

export type PlatformVideoContent = {
  /** Optional section heading above the frame. Omitted by default — the design
      puts the player directly under the hero curve. */
  heading?: string;
  intro?: string;
  /** MP4 (or any browser-playable) source. Leave undefined until the file lands
      in /public — the frame then renders as a placeholder. */
  src?: string;
  /** Optional WebM served ahead of `src` where supported. */
  srcWebm?: string;
  /** Still frame shown before playback (plain URL, native `poster` attr). */
  poster?: string;
  /** Describes the clip for screen readers and the play button. */
  title?: string;
  /** Caption rendered under the frame. */
  caption?: string;
  /** Text shown on the placeholder while there is no source. */
  placeholderNote?: string;
  /** CSS aspect-ratio for the frame. */
  aspect?: string;
};

// Dark interior — same palette as the ConnectedCapabilities panel so the two
// dark surfaces on the page read as one system.
const PANEL_BG =
  "linear-gradient(155deg, #0A1A2E 0%, #0B2340 45%, #071627 100%)";

function PlayGlyph({ muted = false }: Readonly<{ muted?: boolean }>) {
  return (
    <span
      className="relative flex size-[62px] items-center justify-center rounded-full bg-white sm:size-[72px]"
      style={{
        boxShadow: muted
          ? "0 10px 26px -12px rgba(9,38,70,0.45), inset 0 1px 0 rgba(255,255,255,1)"
          : "0 16px 38px -14px rgba(9,38,70,0.60), inset 0 1px 0 rgba(255,255,255,1)",
      }}
    >
      {/* Outer halo ring */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-3 rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(33,177,241,0.30) 0%, rgba(33,177,241,0) 100%)",
        }}
      />
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="relative ml-[3px] size-6 sm:size-7"
        fill="#0A4B6E"
      >
        <path d="M8 5.14v13.72a1 1 0 0 0 1.53.85l10.29-6.86a1 1 0 0 0 0-1.7L9.53 4.29A1 1 0 0 0 8 5.14Z" />
      </svg>
    </span>
  );
}

export default function PlatformVideo({
  content = {},
}: Readonly<{ content?: PlatformVideoContent }> = {}) {
  const {
    heading,
    intro,
    src,
    srcWebm,
    poster,
    title = "V-Watch platform walkthrough",
    caption,
    placeholderNote = "Platform walkthrough coming soon",
    aspect = "16 / 9",
  } = content;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const hasVideo = Boolean(src || srcWebm);
  const hasHeader = Boolean(heading || intro);

  const handlePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    setPlaying(true);
    void el.play();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section
        className="relative z-10 overflow-hidden px-6 pb-10 pt-12 lg:px-15 lg:pb-14 lg:pt-16"
        style={{
          // Bridges the hero curve (#f5fbff) into SinglePlatform (#f2f6fb) so
          // the three sections share one continuous ground.
          background: "linear-gradient(180deg, #f5fbff 0%, #f2f6fb 100%)",
        }}
      >
        <motion.div
          className="mx-auto max-w-[1280px]"
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
        >
          {heading && (
            <motion.h2
              variants={wipeDown}
              custom={0.05}
              className="max-w-[889px] text-[26px] font-extrabold leading-[34px] text-[#0A4B6E] sm:text-[28px] sm:leading-[36px]"
            >
              {heading}
            </motion.h2>
          )}

          {intro && (
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="mt-2 max-w-[878px] text-[20px] leading-[24px] text-[#0A4B6E]"
            >
              {intro}
            </motion.p>
          )}

          {/* FRAME — light gradient rim over the dark panel, lifted on a soft
              blue shadow. The rim is real padding (not a border) so the inner
              radius stays concentric with the outer one. */}
          <motion.div
            variants={frameIn}
            custom={hasHeader ? 0.3 : 0.05}
            className={`relative w-full rounded-[22px] p-[6px] sm:rounded-[28px] sm:p-2 ${
              hasHeader ? "mt-8 sm:mt-10" : ""
            }`}
            style={{
              background: "linear-gradient(180deg, #FFFFFF 0%, #DCEDF8 100%)",
              boxShadow:
                "0 30px 60px -30px rgba(9,38,70,0.45), 0 8px 20px -12px rgba(56,116,170,0.25)",
            }}
          >
            <div
              className="relative w-full overflow-hidden rounded-[17px] sm:rounded-[21px]"
              style={{ aspectRatio: aspect, background: PANEL_BG }}
            >
              {/* Ambient glows — give the empty placeholder depth, and sit
                  harmlessly behind the video once a source is set. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background: `
                    radial-gradient(58% 55% at 30% 25%, rgba(33,177,241,0.20) 0%, rgba(33,177,241,0) 100%),
                    radial-gradient(52% 50% at 76% 78%, rgba(133,196,236,0.16) 0%, rgba(133,196,236,0) 100%)
                  `,
                }}
              />

              {hasVideo ? (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 size-full object-cover"
                    poster={poster}
                    controls={playing}
                    playsInline
                    preload="metadata"
                    title={title}
                    onPlay={() => setPlaying(true)}
                  >
                    {srcWebm && <source src={srcWebm} type="video/webm" />}
                    {src && <source src={src} type="video/mp4" />}
                  </video>

                  {/* Click-to-play overlay — unmounted once playback starts so
                      the native controls take over. */}
                  {!playing && (
                    <button
                      type="button"
                      onClick={handlePlay}
                      aria-label={`Play video: ${title}`}
                      className="absolute inset-0 flex cursor-pointer items-center justify-center transition-colors hover:bg-black/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                    >
                      <PlayGlyph />
                    </button>
                  )}
                </>
              ) : (
                /* PLACEHOLDER — no source yet. Non-interactive: a dimmed play
                   badge plus a short note, so the layout is final and dropping
                   the file in is the only remaining step. */
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                  <PlayGlyph muted />
                  <p className="text-[14px] font-semibold leading-5 text-white/70 sm:text-[15px]">
                    {placeholderNote}
                  </p>
                </div>
              )}

              {/* Inner hairline — keeps the dark panel edge crisp against the rim */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[17px] sm:rounded-[21px]"
                style={{ border: "1px solid rgba(255,255,255,0.10)" }}
              />
            </div>
          </motion.div>

          {caption && (
            <motion.p
              variants={fadeUp}
              custom={0.5}
              className="mx-auto mt-4 max-w-[760px] text-center text-[15px] leading-[22px] text-[#006F9F]"
            >
              {caption}
            </motion.p>
          )}
        </motion.div>
      </section>
    </MotionConfig>
  );
}
