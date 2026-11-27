import path from 'node:path';
import type { NextConfig } from 'next';

/**
 * Static export for AWS S3 hosting.
 * - output 'export'      → `next build` writes plain HTML/CSS/JS to `out/`
 * - trailingSlash        → emits /about/index.html so S3 serves folder URLs
 * - images.unoptimized   → no image server on S3; photos are pre-converted to WebP
 *                          at commit time by scripts/optimize-images.mjs
 */
const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  // Pin the project root so lockfiles in parent folders are never picked up.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
