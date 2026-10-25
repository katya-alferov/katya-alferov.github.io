import { Container } from "@/components/ui/Container";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillsExplorer } from "./SkillsExplorer";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-20 lg:py-24">
      <Container>
        <SectionHeader
          index="03"
          label="Skills"
          id="skills-title"
          aside={
            <p className="max-w-[60ch] text-[1.0625rem] leading-relaxed text-paper-dim">
              No percentages or star ratings. Each skill is marked by where it appears on the CV — so you can
              see what was used day to day in a role, and what comes from study or a broader toolkit.
            </p>
          }
        >
          What I work with, and where it comes from.
        </SectionHeader>
        <SkillsExplorer />
      </Container>
    </section>
  );
}
