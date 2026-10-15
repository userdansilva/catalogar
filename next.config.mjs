import { withSentryConfig } from "@sentry/nextjs/config";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  cacheComponents: true,
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
};

export default withSentryConfig(nextConfig, {
  org: "catalogar",
  project: "catalogar",
  authToken: process.env.SENTRY_AUTH_TOKEN,
  widenClientFileUpload: true,
});
