import { story } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";

export function Story() {
  const [lead, ...rest] = story.paragraphs;
  return (
    <section id="story" aria-labelledby="story-title" className="py-20 lg:py-24">
      <Container>
        <SectionHeader index="01" label="Story" id="story-title">
          {story.heading}
        </SectionHeader>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-14 lg:mt-20">
          <div className="col-span-12 lg:col-span-6 lg:col-start-7 lg:row-start-1">
            <p className="font-display text-[clamp(1.375rem,2.2vw,1.875rem)] leading-[1.3] tracking-[-0.01em] text-paper">
              {lead}
            </p>
            {rest.map((p) => (
              <p key={p.slice(0, 24)} className="mt-6 max-w-[62ch] text-[1.0625rem] leading-relaxed text-paper-dim">
                {p}
              </p>
            ))}
          </div>

          <div className="col-span-12 lg:col-span-4 lg:row-start-1">
            <p className="mono-label text-muted">Four threads through the work</p>
            <ol className="mt-4 border-t border-line">
              {story.threads.map((t, i) => (
                <li key={t.label} className="grid grid-cols-[3rem_1fr] gap-x-3 border-b border-line py-4">
                  <span className="mono-label pt-1 text-lime">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="block font-display text-xl text-paper">{t.label}</span>
                    <span className="mt-1 block text-[0.925rem] leading-relaxed text-muted">{t.text}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Container>
    </section>
  );
}
