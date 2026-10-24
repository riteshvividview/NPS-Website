import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Reuse optimized variants; replace media filenames when publishing new artwork.
    minimumCacheTTL: 14400,
  },
  async headers() {
    return [{
      source: "/:path*.:extension(png|jpg|jpeg|webp|avif|svg|mp4|woff2|ttf|otf)",
      headers: [{ key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" }],
    }];
  },
};

export default nextConfig;
