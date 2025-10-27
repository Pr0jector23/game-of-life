import type { NextConfig } from "next";

const nextConfig: NextConfig = { // i added the options
  output: 'export',
  images: { unoptimized: true }, // optional: disables Image Optimization
  basePath: '/<your-repo-name>', // 👈 required for GitHub Pages
  assetPrefix: '/<your-repo-name>/', // 👈 required too
};

module.exports = nextConfig; // i added this too

export default nextConfig;
