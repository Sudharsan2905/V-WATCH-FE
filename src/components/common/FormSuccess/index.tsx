"use client";

import { motion } from "motion/react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Shared success card shown after a form (Book a Demo, Contact, Partnership,
// HRMS trial) submits successfully. A spring-in badge with a ping ripple and a
// self-drawing checkmark, followed by the confirmation copy and a reset link.
// The outer container styling (background, radius, min-height) is passed in via
// `className` so each form can match its own card shape.
export default function FormSuccess({
  onReset,
  resetLabel = "Submit another request",
  title = "Request sent successfully",
  message = "Your request has been sent to our team. They will review it and contact you shortly with the next steps.",
  className = "",
}: {
  onReset: () => void;
  resetLabel?: string;
  title?: string;
  message?: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className={`flex w-full flex-col items-center justify-center gap-6 text-center ${className}`}
    >
      {/* Animated success badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 16 }}
        className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#E9F8FF]"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#0A8EC8]/10" />
        <svg
          width="38"
          height="38"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#0A8EC8"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <motion.path
            d="M20 6 9 17l-5-5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
          />
        </svg>
      </motion.div>

      <div className="flex flex-col gap-2.5">
        <h3 className="text-[24px] font-bold leading-[29px] text-[#0A4B6E]">
          {title}
        </h3>
        <p className="mx-auto max-w-[380px] text-[15px] font-normal leading-[22px] text-[#3890C0]">
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-[14px] font-bold text-[#0A8EC8] underline-offset-2 hover:underline hover:cursor-pointer"
      >
        {resetLabel}
      </button>
    </motion.div>
  );
}
