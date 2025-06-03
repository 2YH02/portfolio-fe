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
    domains: ["evcsbwqeetfvegvrtbny.supabase.co"],
  },
};

export default nextConfig;
