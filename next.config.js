/** @type {import('next').NextConfig} */
const nextConfig = {  
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  basePath: process.env.NODE_ENV === "development" ? undefined : '/tracking-trips-app',
  assetPrefix: process.env.NODE_ENV === "development" ? undefined : '/tracking-trips-app',
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }, 
  images: {
    domains: ['picsum.photos'],
  },
  experimental: {},
}

module.exports = nextConfig
