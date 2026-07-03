"use client";

import Connected from "@/components/industries/Connected";

const STEPS = [
  {
    icon: "capture",
    title: "Capture",
    desc: "Collect real-time data across access, movement, and operations.",
  },
  {
    icon: "control",
    title: "Control",
    desc: "Manage permissions, workflows, and compliance from one platform.",
  },
  {
    icon: "prove",
    title: "Prove",
    desc: "Generate insights and reports that provide full operational visibility.",
  },
];

export default function OurApproach() {
  return (
    <Connected
      connected={{
        heading: "Our Approach",
        subtitle: "Simple system. Powerful impact.",
        steps: STEPS,
      }}
    />
  );
}
