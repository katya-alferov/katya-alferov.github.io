import Image from "next/image";
import { ArrowDownToLine, ArrowRight, MapPin } from "lucide-react";
import { cvFiles, hero, person } from "@/content/profile";
import { asset } from "@/lib/paths";
import { Container } from "@/components/ui/Container";
import { PipelineExplorer } from "@/components/pipeline/PipelineExplorer";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative pt-24 pb-16 sm:pt-28 lg:pb-20">
      <Container>
        <p className="mono-label flex flex-wrap items-center gap-x-3 gap-y-1 text-paper-dim">
          <span aria-hidden="true" className="inline-block size-2 bg-lime" />
          {hero.eyebrow.map((item, i) => (
            <span key={item} className="flex items-center gap-3">
              {item}
              {i < hero.eyebrow.length - 1 && (
                <span aria-hidden="true" className="text-line-strong">
                  /
                </span>
              )}
            </span>
          ))}
        </p>

        <h1
          id="hero-title"
          className="mt-5 font-display text-[clamp(2.75rem,7.6vw,7.5rem)] leading-[0.94] font-normal tracking-[-0.035em] text-paper"
        >
          <span className="sm:block">
            {hero.headline.lead}
          </span>{" "}
          <span className="inline-block italic sm:block sm:pl-[12%] lg:pl-[24%]">
            {hero.headline.accent.replace(/\.$/, "")}
            <span className="text-lime not-italic">.</span>
          </span>
        </h1>

        <div className="mt-10 grid grid-cols-12 gap-x-6 gap-y-8">
          <div className="col-span-12 flex flex-col gap-3 sm:col-span-5 lg:col-span-3">
            {person.portrait && (
              <Image
                src={asset(person.portrait.src)}
                alt={person.portrait.alt}
                width={240}
                height={300}
                sizes="(min-width: 1024px) 15vw, 40vw"
                className="mb-2 aspect-[4/5] w-32 border border-line object-cover grayscale sm:w-40"
                priority
              />
            )}
            <p className="mono-label flex items-center gap-2 text-paper-dim">
              <MapPin aria-hidden="true" className="size-3.5 text-muted" />
              {person.location}
              <span aria-hidden="true" className="text-line-strong">·</span>
              <span className="text-muted">{person.locationNote}</span>
            </p>
            <p className="mono-label flex items-center gap-2">
              <ArrowDownToLine aria-hidden="true" className="size-3.5 text-muted" />
              <a href={cvFiles.pdf.href} download className="link-underline text-paper-dim hover:text-lime">
                Download CV <span className="text-muted">(PDF)</span>
              </a>
              <span aria-hidden="true" className="text-line-strong">/</span>
              <a href={cvFiles.docx.href} download className="link-underline text-paper-dim hover:text-lime">
                Word<span className="sr-only"> version of the CV</span>
              </a>
            </p>
          </div>

          <div
            className="col-span-12 sm:col-span-7 lg:col-span-6 lg:col-start-7"
          >
            <p className="text-[1.0625rem] leading-relaxed text-paper-dim sm:text-lg">{hero.intro}</p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href={hero.primaryCta.href}
                className="group inline-flex min-h-12 items-center gap-3 bg-lime px-5 text-[0.95rem] font-medium text-ink-950 transition-colors hover:bg-paper active:translate-y-px"
              >
                {hero.primaryCta.label}
                <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={hero.secondaryCta.href}
                className="inline-flex min-h-12 items-center border border-line-strong px-5 text-[0.95rem] text-paper transition-colors hover:border-paper active:translate-y-px"
              >
                {hero.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        <figure className="mt-16 lg:mt-14" aria-labelledby="pipeline-caption">
          <figcaption
            id="pipeline-caption"
            className="mono-label mb-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-line pt-4 text-muted"
          >
            <span>
              <span className="text-lime">Fig. 01</span> — How data moves through an enterprise system
            </span>
            <span className="hidden md:inline">Select a stage</span>
          </figcaption>
          <PipelineExplorer />
        </figure>
      </Container>
    </section>
  );
}
