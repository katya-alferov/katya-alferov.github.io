import { ArrowUp } from "lucide-react";
import { person } from "@/content/profile";
import { Container } from "@/components/ui/Container";
import { Mark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-ink-900">
      <Container className="flex flex-col gap-6 py-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Mark />
          <p className="text-sm text-paper-dim">
            {person.name} <span className="text-muted">· {person.role}, {person.location}</span>
          </p>
        </div>
        <div className="mono-label flex flex-wrap items-center gap-x-6 gap-y-3 text-muted">
          <a href={`mailto:${person.email}`} className="link-underline hover:text-paper">
            Email
          </a>
          {person.linkedin && (
            <a href={person.linkedin} rel="me noopener noreferrer" target="_blank" className="link-underline hover:text-paper">
              LinkedIn
            </a>
          )}
          <a href="#top" className="inline-flex items-center gap-1.5 hover:text-accent-ink">
            Back to top <ArrowUp aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
