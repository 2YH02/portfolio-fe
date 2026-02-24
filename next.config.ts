import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.yonghun.me"}/:path*`,
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
