import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // „Torta putuje" (V4 E1c) se aktivira preko next-view-transitions
  // (ViewTransitions provider + njegov Link u ProductCard) — ne treba
  // experimental.viewTransition flag (koji obara Turbopack build).
  images: {
    // Pun kvalitet fotografija (V4 #41): AVIF pa WebP; dozvoljeni kvaliteti
    // po upotrebi (kartice 75–85, galerija/hero 90+)
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 92],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
