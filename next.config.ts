import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ibb.co",
      },
      {
        protocol: "https",
        hostname: "seoul-sage.vercel.app",
      },
      {
        protocol: 'https',
        hostname: 'placehold.co', 
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
