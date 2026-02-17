import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://api.yonghun.me/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evcsbwqeetfvegvrtbny.supabase.co",
        pathname: "/**",
      },
    ],
    qualities: [45, 50, 75],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
