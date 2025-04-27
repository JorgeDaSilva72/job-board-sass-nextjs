// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "utfs.io",
//         port: "",
//       },
//       {
//         protocol: "https",
//         hostname: "res.cloudinary.com",
//         port: "",
//       },
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//         port: "",
//       },

//       {
//         protocol: "https",
//         hostname: "flagcdn.com",
//         port: "",
//       },
//     ],
//   },
// };

// export default nextConfig;

import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "flagcdn.com",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      fs: false,
      child_process: false,
      "fs/promises": false,
      async_hooks: false,
    };
    return config;
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
