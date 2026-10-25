import type { ReactNode } from "react";

/** Editorial section opener: a numbered technical label beside a display heading. */
export function SectionHeader({
  index,
  label,
  id,
  children,
  aside,
}: {
  index: string;
  label: string;
  id: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-12 gap-x-6 gap-y-4 border-t border-line pt-5">
      <p className="mono-label col-span-12 flex items-center gap-3 self-start text-muted lg:col-span-3 lg:pt-5">
        <span className="text-accent-ink">{index}</span>
        <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
        {label}
      </p>
      <h2
        id={id}
        className="col-span-12 max-w-[22ch] font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] tracking-[-0.025em] text-paper lg:col-span-9"
      >
        {children}
      </h2>
      {aside && <div className="col-span-12 lg:col-span-9 lg:col-start-4">{aside}</div>}
    </header>
  );
}
