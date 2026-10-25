import { highlights, projects } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ConceptDemo } from "@/components/work/ConceptDemo";
import { ProjectCard } from "@/components/work/ProjectCard";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 lg:py-24">
      <Container>
        <SectionHeader index="05" label="Selected work" id="work-title">
          The work behind the titles.
        </SectionHeader>

        {/* A — professional highlights */}
        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-6 lg:mt-20">
          <div className="col-span-12 lg:col-span-3">
            <h3 className="mono-label text-paper-dim">
              <span className="text-lime">A</span> — Professional highlights
            </h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
              The kinds of systems and responsibilities from my roles, described without confidential company
              detail.
            </p>
          </div>
          <ul className="col-span-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:col-span-9">
            {highlights.map((h) => (
              <li key={h.title} className="flex flex-col bg-ink-950 p-6 lg:p-8">
                <p className="mono-label text-muted">{h.context}</p>
                <h4 className="mt-3 font-display text-[1.75rem] leading-tight text-paper">{h.title}</h4>
                <p className="mt-3 flex-1 text-[0.975rem] leading-relaxed text-paper-dim">{h.text}</p>
                <p className="mono-label mt-5 text-paper-dim">{h.tags.join(" / ")}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* B — personal projects */}
        <div className="mt-20 grid grid-cols-12 gap-x-6 gap-y-6 lg:mt-28">
          <div className="col-span-12 lg:col-span-3">
            <h3 className="mono-label text-paper-dim">
              <span className="text-lime">B</span> — Project index
            </h3>
            <p className="mt-3 max-w-[34ch] text-sm leading-relaxed text-muted">
              Personal projects, published with source and a short write-up.
            </p>
          </div>
          <div className="col-span-12 lg:col-span-9">
            {projects.length > 0 ? (
              <ol className="border-t border-line">
                {projects.map((p, i) => (
                  <ProjectCard key={p.slug} project={p} index={i} />
                ))}
              </ol>
            ) : (
              <div className="grid grid-cols-12 gap-x-6 border-y border-line py-5">
                <p className="mono-label col-span-2 text-muted sm:col-span-1">00</p>
                <p className="col-span-10 text-[0.975rem] leading-relaxed text-paper-dim sm:col-span-11">
                  The index is open. New personal projects will be listed here as they are published — each
                  with its source, its data and what it set out to show.
                </p>
              </div>
            )}

            <div className="mt-10">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="font-display text-[1.75rem] leading-tight text-paper">
                  Concept: validating a billing load
                </h4>
                <p className="mono-label border border-line-strong px-2 py-1 text-paper-dim">
                  Portfolio demo · synthetic data
                </p>
              </div>
              <p className="mb-6 max-w-[64ch] text-[0.975rem] leading-relaxed text-paper-dim">
                A small, interactive illustration of the checks a load goes through before anyone reports on
                it. The nine invoice rows are invented for this page; this is not a system built at Partner or
                Isracard.
              </p>
              <ConceptDemo />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
