/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
  // Next 15
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "catalogarblobdev.blob.core.windows.net",
        pathname: "/catalogar-dev/**",
      },
      {
        protocol: "https",
        hostname: "media-dev.catalogar.com.br",
        pathname: "/catalogar-dev/**",
      },
      {
        protocol: "https",
        hostname: "media.catalogar.com.br",
        pathname: "/catalogar/**",
      },
    ],
  },
  transpilePackages: [
    "next-safe-action",
    "@next-safe-action/adapter-react-hook-form",
  ],
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: "http://localhost:3333/api/auth/:path*",
      },
    ];
  },
};

export default nextConfig;
