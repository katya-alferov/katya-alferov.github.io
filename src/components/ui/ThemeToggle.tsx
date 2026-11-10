"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";
export const THEME_KEY = "theme";

/** Switches between the dark (default) and light palettes; remembered per browser. */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // The inline script in layout.tsx has already applied the saved theme;
    // the event keeps the header's desktop and mobile toggles in sync.
    const sync = () => setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
    sync();
    window.addEventListener("themechange", sync);
    return () => window.removeEventListener("themechange", sync);
  }, []);

  function toggle() {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    window.dispatchEvent(new Event("themechange"));
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      /* storage unavailable: the choice lasts for this visit only */
    }
  }

  const light = theme === "light";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={light}
      className={`inline-flex size-11 items-center justify-center border border-line-strong text-paper transition-colors hover:border-lime hover:text-lime lg:size-9 ${className}`}
    >
      {light ? <Moon aria-hidden="true" className="size-4" /> : <Sun aria-hidden="true" className="size-4" />}
      <span className="sr-only">Light mode</span>
    </button>
  );
}

/** Runs before first paint so a saved light theme never flashes dark. */
export const themeScript = `try{if(localStorage.getItem("${THEME_KEY}")==="light")document.documentElement.dataset.theme="light"}catch(e){}`;
