// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  async redirects() {
    return [
      {
        // Redirect any preview / auto-generated Vercel URLs to main domain
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "scentora-:slug*.vercel.app",
          },
        ],
        destination: "https://scentora.vercel.app/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
