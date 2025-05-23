import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "m.media-amazon.com",
      "growth-school-adonisjs.onrender.com",
      "images.pexels.com",
      "server11.vps.webdock.cloud",
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "500mb",
    },
  },
};

export default nextConfig;
