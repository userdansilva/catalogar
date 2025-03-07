/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PUBLIC_BASE_URL: process.env.NEXTAUTH_URL
  }
};

export default nextConfig;
