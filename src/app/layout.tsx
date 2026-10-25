import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { person, site } from "@/content/profile";
import "./globals.css";

/* Open-source (OFL) fonts, self-hosted from src/fonts — no external requests. */
const newsreader = localFont({
  variable: "--font-newsreader",
  src: [
    { path: "../fonts/newsreader-latin-opsz-normal.woff2", weight: "200 800", style: "normal" },
    { path: "../fonts/newsreader-latin-wght-italic.woff2", weight: "200 800", style: "italic" },
  ],
  display: "swap",
  fallback: ["Times New Roman", "serif"],
});

const instrumentSans = localFont({
  variable: "--font-instrument",
  src: [{ path: "../fonts/instrument-sans-latin-wght-normal.woff2", weight: "400 700", style: "normal" }],
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

/** Set NEXT_PUBLIC_SITE_URL in production so Open Graph URLs are absolute. */
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    title: site.title,
    description: site.description,
    url: "/",
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
  themeColor: "#0f100e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${instrumentSans.variable} ${plexMono.variable} antialiased`}
    >
      <body className="min-h-dvh">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-lime focus:px-4 focus:py-2 focus:text-ink-950"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
