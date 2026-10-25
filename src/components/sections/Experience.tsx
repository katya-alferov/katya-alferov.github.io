import { earlierRoles, earlierSkills, roles, type Role } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TechList } from "@/components/ui/TechList";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="py-20 lg:py-24">
      <Container>
        <SectionHeader
          index="02"
          label="Experience"
          id="experience-title"
          aside={
            <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-paper-dim">
              Enterprise ETL and BI work at Partner and Isracard: from writing the specification, through
              development and testing, to supporting the process in production.
            </p>
          }
        >
          Building data processes — and keeping them running.
        </SectionHeader>

        <ol className="mt-14 lg:mt-20">
          {roles.map((role, i) => (
            <RoleEntry key={role.id} role={role} current={i === 0} />
          ))}
        </ol>

        <EarlierWork />
      </Container>
    </section>
  );
}

function RoleEntry({ role, current }: { role: Role; current: boolean }) {
  const compact = role.groups.length === 1;
  return (
    <li className="grid grid-cols-12 gap-x-6 gap-y-6 border-t border-line py-10 lg:py-14">
      <div className="col-span-12 lg:col-span-3">
        <div className="lg:sticky lg:top-24">
          <p className="mono-label flex items-center gap-2 text-paper-dim">
            {current && <span aria-hidden="true" className="inline-block size-1.5 bg-accent" />}
            <span>
              <span className="sr-only">Dates: </span>
              {role.start} — {role.end}
            </span>
          </p>
          <p className="mt-3 font-display text-[clamp(2.5rem,4.5vw,3.75rem)] leading-none tracking-[-0.03em] text-paper">
            {role.company}
          </p>
          {role.team && <p className="mono-label mt-3 text-muted">{role.team}</p>}
        </div>
      </div>

      <div className="col-span-12 lg:col-span-9">
        <h3 className="text-[1.375rem] font-medium tracking-tight text-paper">
          {role.title}
          <span className="sr-only"> at {role.company}</span>
        </h3>
        <p className="mt-3 max-w-[60ch] font-display text-[1.375rem] leading-snug text-paper-dim italic">
          {role.summary}
        </p>

        {!compact && (
          <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {role.groups.map((group) => (
              <div key={group.label}>
                <h4 className="mono-label border-b border-line pb-2 text-accent-ink">{group.label}</h4>
                <ul className="mt-3 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="relative pl-5 text-[0.975rem] leading-relaxed text-paper-dim">
                      <span aria-hidden="true" className="absolute top-[0.7em] left-0 h-px w-2.5 bg-line-strong" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex flex-col gap-2 border-t border-dashed border-line pt-4 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="mono-label shrink-0 text-muted">Stack</p>
          <TechList items={role.tech} />
        </div>
      </div>
    </li>
  );
}

function EarlierWork() {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-8 border-t border-line pt-10 lg:pt-14">
      <div className="col-span-12 lg:col-span-3">
        <p className="mono-label text-paper-dim">2016 — 2021</p>
        <h3 className="mt-3 font-display text-3xl leading-tight text-paper">Earlier: business &amp; marketing</h3>
        <p className="mt-3 max-w-[34ch] text-[0.925rem] leading-relaxed text-muted">
          Before moving into data development: running my own business, plus analysis, reporting and coordination on the marketing side.
        </p>
      </div>
      <div className="col-span-12 lg:col-span-9">
        <ul className="grid gap-px border border-line bg-line sm:grid-cols-2 xl:grid-cols-4">
          {earlierRoles.map((r) => (
            <li key={r.title} className="bg-ink-950 p-5">
              <p className="mono-label text-muted">{r.range}</p>
              <p className="mt-3 font-medium text-paper">{r.title}</p>
              {r.company && <p className="text-sm text-muted">{r.company}</p>}
              <p className="mt-3 text-[0.925rem] leading-relaxed text-paper-dim">{r.summary}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
          <p className="mono-label shrink-0 text-muted">Carried forward</p>
          <TechList items={earlierSkills} />
        </div>
      </div>
    </div>
  );
}
