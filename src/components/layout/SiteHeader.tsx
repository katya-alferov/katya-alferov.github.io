"use client";

import { useEffect, useState } from "react";
import { ArrowDownToLine, Menu, X } from "lucide-react";
import { cvFiles, navigation, person } from "@/content/profile";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
        scrolled || open ? "border-line bg-ink-950/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        <a href="#top" className="group flex items-center gap-3">
          <Mark />
          <span className="flex flex-col leading-none">
            <span className="text-[0.95rem] font-medium tracking-tight text-paper">{person.name}</span>
            <span className="mono-label mt-1 text-muted">{person.role}</span>
            <span className="sr-only">, back to top</span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="link-underline text-sm text-paper-dim hover:text-paper">
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={cvFiles.pdf.href}
                download
                className="mono-label inline-flex items-center gap-2 border border-line-strong px-3 py-2 text-paper transition-colors hover:border-lime hover:text-lime"
              >
                <ArrowDownToLine aria-hidden="true" className="size-3.5" />
                CV <span className="sr-only">(PDF)</span>
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex size-11 items-center justify-center border border-line-strong text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Primary" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-ink-950 lg:hidden">
          <ul className="mx-auto flex max-w-[1440px] flex-col px-5 py-3 sm:px-8">
            {navigation.map((item, i) => (
              <li key={item.href} className="border-b border-line last:border-0">
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 py-3.5 font-display text-2xl text-paper"
                >
                  <span className="mono-label text-muted">0{i + 1}</span>
                  {item.label}
                </a>
              </li>
            ))}
            <li className="py-4">
              <a
                href={cvFiles.pdf.href}
                download
                className="mono-label inline-flex items-center gap-2 text-lime"
              >
                <ArrowDownToLine aria-hidden="true" className="size-3.5" />
                Download CV (PDF)
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

/** Monogram: two strokes joined like a pipeline junction. */
export function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden="true">
      <rect x="0.5" y="0.5" width="31" height="31" fill="none" stroke="var(--color-line-strong)" />
      <path d="M8 7v18M8 16h6l8-9M14 16l8 9" fill="none" stroke="var(--color-paper)" strokeWidth="1.5" />
      <rect x="12" y="14" width="4" height="4" fill="var(--color-lime)" />
    </svg>
  );
}
