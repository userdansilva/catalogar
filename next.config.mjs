/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_BASE_URL: process.env.NEXTAUTH_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "catalogarblobdev.blob.core.windows.net",
        pathname: "/catalogar-dev/**",
      },
    ],
  },
};

export default nextConfig;
