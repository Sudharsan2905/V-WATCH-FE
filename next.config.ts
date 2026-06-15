import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["outsider-curtsy-concert.ngrok-free.app", "outsider-curtsy-concert.ngrok-free.dev"],
  images: {
    // Several design assets are SVGs (some saved with a .png extension). Next's image
    // optimizer rejects SVGs unless this is enabled; the CSP sandbox keeps them inert.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
