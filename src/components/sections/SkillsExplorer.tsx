"use client";

import { useState } from "react";
import {
  evidenceLabels,
  professionalEvidence,
  skillCategories,
  type Evidence,
  type Skill,
} from "@/content/profile";

const filters: (Evidence | "all")[] = ["all", "partner", "isracard", "progeeks", "studies", "toolkit"];

function isProfessional(skill: Skill) {
  return skill.evidence.some((e) => professionalEvidence.includes(e));
}

export function SkillsExplorer() {
  const [filter, setFilter] = useState<Evidence | "all">("all");

  const matches = (skill: Skill) => filter === "all" || skill.evidence.includes(filter);
  const total = skillCategories.reduce((n, c) => n + c.skills.filter(matches).length, 0);

  return (
    <div className="mt-12 lg:mt-16">
      <div className="flex flex-col gap-6 border-y border-line py-4 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Highlight skills by source" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={`mono-label min-h-10 border px-3 transition-colors ${
                  active
                    ? "border-accent bg-accent text-on-accent"
                    : "border-line-strong text-paper-dim hover:border-paper hover:text-paper"
                }`}
              >
                {f === "all" ? "All sources" : evidenceLabels[f].short}
              </button>
            );
          })}
        </div>
        <div className="mono-label flex flex-wrap items-center gap-x-5 gap-y-2 text-muted">
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2.5 bg-accent" /> Used in a professional role
          </span>
          <span className="flex items-center gap-2">
            <span aria-hidden="true" className="inline-block size-2.5 border border-paper-dim" /> Coursework or CV toolkit
          </span>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {filter === "all"
          ? "Showing all skills."
          : `Highlighting ${total} skills from ${evidenceLabels[filter].short}.`}
      </p>

      <div className="grid gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((cat, ci) => {
          const count = cat.skills.filter(matches).length;
          return (
            <section key={cat.id} aria-labelledby={`skills-${cat.id}`} className="border-b border-line pt-8 pb-6">
              <div className="flex items-baseline justify-between gap-4">
                <h3 id={`skills-${cat.id}`} className="font-display text-2xl leading-tight text-paper">
                  <span aria-hidden="true" className="mono-label mr-3 align-middle text-muted">{String(ci + 1).padStart(2, "0")}</span>
                  {cat.label}
                </h3>
                {filter !== "all" && (
                  <span className="mono-label shrink-0 text-muted">
                    {count}/{cat.skills.length}
                  </span>
                )}
              </div>
              <ul className="mt-4">
                {cat.skills.map((skill) => {
                  const on = matches(skill);
                  const pro = isProfessional(skill);
                  return (
                    <li
                      key={skill.name}
                      className={`flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5 border-t border-line/70 py-2 transition-opacity duration-300 ${
                        on ? "opacity-100" : "opacity-30"
                      }`}
                    >
                      <span className="flex shrink-0 items-baseline gap-3 text-[0.975rem] text-paper">
                        <span
                          aria-hidden="true"
                          className={`inline-block size-2 shrink-0 translate-y-[-1px] ${
                            pro ? "bg-accent" : "border border-paper-dim"
                          }`}
                        />
                        {skill.name}
                      </span>
                      <span className="mono-label ml-auto text-right text-muted">
                        <span className="sr-only">Source: </span>
                        {skill.evidence.map((e) => evidenceLabels[e].short).join(" · ")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>
    </div>
  );
}
