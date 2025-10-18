import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  /**
   * Descomente as rewrites abaixo para habilitar o MFE de categorias
   * em desenvolvimento.
   *
   * Lembre-se de renomear a pasta `categorias` em `src/app/dashboard/(auth)/(sidebar)`, para
   * disponibilizar a rota para o MFE.
   */
  // async rewrites() {
  //   return [
  //     {
  //       source: "/dashboard/categorias",
  //       destination: "http://localhost:3001/dashboard/categorias",
  //     },
  //     {
  //       source: "/dashboard/categorias/:path+",
  //       destination: "http://localhost:3001/dashboard/categorias/:path+",
  //     },
  //     {
  //       source: "/categories-mfe-static/:path+",
  //       destination: "http://localhost:3001/categories-mfe-static/:path+",
  //     },
  //   ];
  // },
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
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: "catalogar",
  project: "catalogar",

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: "/monitoring",

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
