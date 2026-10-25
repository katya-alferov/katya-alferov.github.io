import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/content/profile";

/** One entry in the project index. Fed from `projects` in content/profile.ts. */
export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <li className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-line py-6">
      <p className="mono-label col-span-2 text-lime sm:col-span-1">{String(index + 1).padStart(2, "0")}</p>
      <div className="col-span-10 sm:col-span-6">
        <h4 className="font-display text-2xl leading-tight text-paper">{project.title}</h4>
        <p className="mt-2 text-[0.975rem] leading-relaxed text-paper-dim">{project.summary}</p>
        {project.points && (
          <ul className="mt-3 space-y-1">
            {project.points.map((p) => (
              <li key={p} className="text-sm text-muted">— {p}</li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-span-10 col-start-3 sm:col-span-4 sm:col-start-auto">
        <p className="mono-label text-paper-dim">{project.stack.join(" / ")}</p>
        {project.links && (
          <ul className="mt-3 flex flex-wrap gap-4">
            {project.links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex items-center gap-1 text-sm text-lime hover:underline">
                  {l.label}
                  <ArrowUpRight aria-hidden="true" className="size-3.5" />
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="mono-label col-span-12 text-muted sm:col-span-1 sm:text-right">{project.year}</p>
    </li>
  );
}
