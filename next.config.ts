import type { NextConfig } from "next";

const nextConfig: NextConfig = { // i added the options
  output: 'export',
  images: { unoptimized: true }, // optional: disables Image Optimization
  basePath: '/game-of-life>', // required for GitHub Pages
  assetPrefix: '/game-of-life/', // required too
};

module.exports = nextConfig; // i added this too

// export default nextConfig;
