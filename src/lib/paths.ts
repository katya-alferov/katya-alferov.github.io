/**
 * Prefix for files in public/ when the site is served from a sub-path
 * (GitHub Pages project sites). next/link and metadata files handle this
 * automatically; plain <a href> and <img src> do not.
 */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function asset(path: string) {
  return `${basePath}${path}`;
}
