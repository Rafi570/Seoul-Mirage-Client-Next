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
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
        pathname: '/**',
      },
      // এখানে ui-avatars ডোমেইনটি যুক্ত করা হলো
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        pathname: '/api/**', // এর ভেতরের এপিআই পাথ এলাউ করার জন্য
      },
    ],
  },
};

export default nextConfig;