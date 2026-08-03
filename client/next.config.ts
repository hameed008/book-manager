import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async rewrites() {
    return [
      {

        source: "/api/:path*",
        destination: "https://book-manager-1nhz.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
