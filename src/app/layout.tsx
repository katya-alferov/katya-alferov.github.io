import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { person, site } from "@/content/profile";
import { basePath } from "@/lib/paths";
import "./globals.css";

/* Open-source (OFL) fonts, self-hosted from src/fonts — no external requests. */
const fraunces = localFont({
  variable: "--font-fraunces",
  src: [
    { path: "../fonts/fraunces-latin-full-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/fraunces-latin-wght-italic.woff2", weight: "100 900", style: "italic" },
  ],
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const dmSans = localFont({
  variable: "--font-dm-sans",
  src: [{ path: "../fonts/dm-sans-latin-opsz-normal.woff2", weight: "100 1000", style: "normal" }],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const plexMono = localFont({
  variable: "--font-plex-mono",
  src: [
    { path: "../fonts/ibm-plex-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/ibm-plex-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
});

/**
 * Set NEXT_PUBLIC_SITE_URL in production so Open Graph URLs are absolute.
 * Next.js adds the base path to metadata files itself, so only the origin is
 * used as metadataBase.
 */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const homePath = `${basePath}/`;

export const metadata: Metadata = {
  metadataBase: new URL(new URL(siteUrl).origin),
  title: {
    default: site.title,
    template: `%s — ${person.name}`,
  },
  description: site.description,
  applicationName: person.name,
  authors: [{ name: person.name }],
  keywords: [
    "Katya Alferov",
    "ETL developer",
    "BI developer",
    "data engineering",
    "Informatica PowerCenter",
    "SQL",
    "Oracle",
    "Teradata",
    "Power BI",
    "SAP BusinessObjects",
    "Israel",
  ],
  alternates: { canonical: homePath },
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    url: homePath,
    siteName: person.name,
    locale: "en_US",
    firstName: "Katya",
    lastName: "Alferov",
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbf7ef",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-accent focus:px-4 focus:py-2 focus:text-on-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
