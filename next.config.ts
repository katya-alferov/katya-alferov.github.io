import type { NextConfig } from "next";

/**
 * The site is exported as plain static files (no server needed), which is
 * what free static hosts like GitHub Pages serve.
 *
 * NEXT_PUBLIC_BASE_PATH is the sub-path the site lives under, e.g.
 * "/katya-alferov" for https://<user>.github.io/katya-alferov. The GitHub
 * Actions workflow sets it; leave it empty for local development.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
