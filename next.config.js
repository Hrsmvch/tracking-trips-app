/** @type {import('next').NextConfig} */
const nextConfig = {  
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  basePath: process.env.NODE_ENV === "development" ? undefined : 'https://hrsmvch.github.io/',
  assetPrefix: process.env.NODE_ENV === "development" ? undefined : 'https://hrsmvch.github.io/',
  
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }, 
}

module.exports = nextConfig
