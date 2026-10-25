import { ArrowDownToLine, ArrowUpRight, Mail, Phone } from "lucide-react";
import { cvFiles, person } from "@/content/profile";
import { Container } from "@/components/ui/Container";

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-line bg-ink-900 py-20 lg:py-24">
      <Container>
        <p className="mono-label flex items-center gap-3 text-muted">
          <span className="text-accent-ink">06</span>
          <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
          Contact
        </p>
        <h2
          id="contact-title"
          className="mt-6 max-w-[14ch] font-display text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.95] tracking-[-0.035em] text-paper"
        >
          Have a data challenge <span className="italic">in mind</span>
          <span className="ml-[0.06em] text-accent-ink">?</span>
        </h2>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 lg:mt-16">
          <div className="col-span-12 lg:col-span-7">
            <p className="max-w-[52ch] text-[1.0625rem] leading-relaxed text-paper-dim">
              Recruiters, hiring managers and technical leads are welcome to get in touch. Email is the best way
              to reach me.
            </p>
            <a
              href={`mailto:${person.email}`}
              className="group mt-8 inline-flex max-w-full items-center gap-4 border-b border-line-strong pb-3 transition-colors hover:border-accent"
            >
              <Mail aria-hidden="true" className="size-6 shrink-0 text-accent-ink" />
              <span className="font-display text-[clamp(1.375rem,4vw,2.75rem)] leading-tight break-all text-paper group-hover:text-accent-ink sm:break-normal">
                {person.email}
              </span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-6 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink"
              />
            </a>
          </div>

          <dl className="col-span-12 grid gap-px self-end border border-line bg-line sm:grid-cols-2 lg:col-span-5">
            <div className="bg-ink-900 p-5">
              <dt className="mono-label text-muted">CV</dt>
              <dd className="mt-2 flex flex-wrap gap-x-4 gap-y-2">
                <a href={cvFiles.pdf.href} download className="inline-flex items-center gap-2 text-paper hover:text-accent-ink">
                  <ArrowDownToLine aria-hidden="true" className="size-4" />
                  Download PDF
                </a>
                <a href={cvFiles.docx.href} download className="inline-flex items-center gap-2 text-paper-dim hover:text-accent-ink">
                  Word (.docx)
                </a>
              </dd>
            </div>
            <div className="bg-ink-900 p-5">
              <dt className="mono-label text-muted">Phone</dt>
              <dd className="mt-2">
                <a href={person.phoneHref} className="inline-flex items-center gap-2 text-paper hover:text-accent-ink">
                  <Phone aria-hidden="true" className="size-4" />
                  {person.phoneDisplay}
                </a>
              </dd>
            </div>
            {person.linkedin && (
              <div className="bg-ink-900 p-5">
                <dt className="mono-label text-muted">LinkedIn</dt>
                <dd className="mt-2">
                  <a
                    href={person.linkedin}
                    rel="me noopener noreferrer"
                    target="_blank"
                    className="inline-flex items-center gap-2 text-paper hover:text-accent-ink"
                  >
                    LinkedIn profile
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                </dd>
              </div>
            )}
            <div className="bg-ink-900 p-5">
              <dt className="mono-label text-muted">Location</dt>
              <dd className="mt-2 text-paper">
                {person.location}
                <span className="block text-sm text-muted">{person.locationNote}</span>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
