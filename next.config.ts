import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/kazamiyuuji",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
