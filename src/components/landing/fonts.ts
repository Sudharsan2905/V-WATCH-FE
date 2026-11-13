import { Inter } from "next/font/google";

// The landing page (Figma "V-Watch LP") is set in Inter, unlike the rest of the
// site (Lato). It's a variable font, so the design's in-between weights (570,
// 730, 740, 760, 780…) render exactly. Loaded only by the landing routes and
// exposed as a CSS variable, so it never leaks into the shared Lato pages.
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});
