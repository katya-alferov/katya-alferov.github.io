/** Inline technology list, separated by thin slashes. */
export function TechList({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {items.map((item, i) => (
        <li key={item} className="mono-label text-paper-dim">
          {item}
          {i < items.length - 1 && (
            <span aria-hidden="true" className="ml-2 text-line-strong">
              /
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
