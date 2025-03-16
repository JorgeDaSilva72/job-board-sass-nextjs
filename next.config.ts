import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
      },

      {
        protocol: "https",
        hostname: "flagcdn.com",
        port: "",
      },
    ],
  },
};

export default nextConfig;
