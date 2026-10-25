import { courses, degrees, person, training } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="py-20 lg:py-24">
      <Container>
        <SectionHeader index="04" label="Education" id="education-title">
          Computer science, business — and psychology.
        </SectionHeader>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-20">
          <div className="col-span-12 lg:col-span-7">
            <ul className="border-t border-line">
              {degrees.map((d) => (
                <li key={d.degree} className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-2 border-b border-line py-7">
                  <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.25rem)] leading-tight tracking-[-0.015em] text-paper">
                    {d.degree}
                  </h3>
                  <p className="row-span-2 self-start text-right">
                    <span className="mono-label block text-muted">GPA</span>
                    <span className="font-display text-4xl leading-none text-paper">{d.gpa}</span>
                  </p>
                  <p className="mono-label text-paper-dim">
                    {d.school} <span className="text-line-strong">·</span> {d.range}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="mono-label text-muted">Professional training</h3>
                <ul className="mt-3 space-y-3">
                  {training.map((t) => (
                    <li key={t.name}>
                      <span className="block text-paper">{t.name}</span>
                      <span className="text-sm text-muted">{t.provider}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="mono-label text-muted">Languages</h3>
                <ul className="mt-3 space-y-1.5">
                  {person.languages.map((l) => (
                    <li key={l.name} className="flex justify-between gap-4 border-b border-line/70 pb-1.5">
                      <span className="text-paper">{l.name}</span>
                      <span className="text-sm text-muted">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 lg:col-start-9">
            <div className="mono-label flex justify-between border-b border-line pb-3 text-muted">
              <h3>Relevant coursework</h3>
              <span aria-hidden="true">Grade</span>
            </div>
            <ul>
              {courses.map((c) => (
                <li key={c.name} className="flex items-baseline justify-between gap-6 border-b border-line/70 py-3">
                  <span className="text-[0.975rem] leading-snug text-paper">{c.name}</span>
                  <span className="font-mono text-sm text-lime tabular-nums">
                    <span className="sr-only">Grade </span>
                    {c.grade}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
