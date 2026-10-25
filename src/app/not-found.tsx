import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageFrame } from "@/components/layout/PageFrame";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageFrame />
      <main id="main" className="flex min-h-dvh items-center py-24">
        <Container>
          <p className="mono-label text-lime">Error 404 · reject_log</p>
          <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.95] tracking-[-0.035em] text-paper">
            This row failed <span className="italic">validation</span>
            <span className="text-lime">.</span>
          </h1>
          <div className="mt-10 max-w-xl border-y border-line py-4 font-mono text-xs text-paper-dim">
            <p>
              <span className="text-muted">check&nbsp;&nbsp;</span> page_exists(url)
            </p>
            <p className="mt-1">
              <span className="text-muted">result&nbsp;</span> <span className="text-paper">✕</span> no matching page
            </p>
          </div>
          <Link
            href="/"
            className="mt-10 inline-flex min-h-12 items-center gap-3 bg-lime px-5 font-medium text-ink-950 transition-colors hover:bg-paper"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Back to the homepage
          </Link>
        </Container>
      </main>
    </>
  );
}
