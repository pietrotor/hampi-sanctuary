import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The favicon reads this file from disk while rendering the page. Vercel
  // serves `public` as static assets and leaves it out of the server bundle.
  outputFileTracingIncludes: {
    "/": ["./public/logo-mark-bone.png"],
    "/*": ["./public/logo-mark-bone.png"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 78, 90],
    // The defaults jump from 2048 straight to 3840, so a 2x laptop got a
    // file almost twice the width it paints.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3200, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 480],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
