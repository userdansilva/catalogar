/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/categories-mfe-static",
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

export default nextConfig;
