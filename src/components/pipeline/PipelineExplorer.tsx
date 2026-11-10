"use client";

import { useEffect, useId, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { AnimatePresence, LazyMotion, MotionConfig, domAnimation, m } from "motion/react";
import {
  evidenceLabels,
  orchestrationLayer,
  pipelineNote,
  pipelineStages,
  type PipelineStage,
} from "@/content/profile";
import { Pause, Play } from "lucide-react";
import { PipelineDiagram } from "./PipelineDiagram";
import { LABEL_BOTTOM, NODE_TOP, NODE_W, RAIL, VIEW_H, VIEW_W, stageX } from "./geometry";
import { PipelineMobile } from "./PipelineMobile";

export const pipelineItems: PipelineStage[] = [...pipelineStages, orchestrationLayer];

/**
 * The signature hero interaction: a conceptual data pipeline.
 * Desktop/tablet renders an SVG schematic with an accessible tablist laid
 * over it; narrow screens get a vertical, disclosure-based version.
 */
export function PipelineExplorer() {
  const [selectedId, setSelectedId] = useState(pipelineStages[0].id);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();
  const [playing, setPlaying] = useState(false);

  // "Run the pipeline": step through the six stages, then stop on BI.
  useEffect(() => {
    if (!playing) return;
    const ids = pipelineStages.map((s) => s.id);
    const i = ids.indexOf(selectedId);
    const timer = window.setTimeout(() => {
      if (i < 0 || i >= ids.length - 1) setPlaying(false);
      else setSelectedId(ids[i + 1]);
    }, 1700);
    return () => window.clearTimeout(timer);
  }, [playing, selectedId]);

  function togglePlay() {
    if (playing) {
      setPlaying(false);
      return;
    }
    setSelectedId(pipelineStages[0].id);
    setPlaying(true);
  }

  function choose(id: string) {
    setPlaying(false);
    setSelectedId(id);
  }

  const selected = pipelineItems.find((s) => s.id === selectedId) ?? pipelineItems[0];
  const highlightId = hoverId ?? selectedId;

  function onTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const ids = pipelineItems.map((s) => s.id);
    const current = ids.indexOf(selectedId);
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % ids.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + ids.length) % ids.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = ids.length - 1;
    if (next === null) return;
    event.preventDefault();
    choose(ids[next]);
    tabRefs.current[ids[next]]?.focus();
  }

  const panelId = `${baseId}-panel`;

  return (
    <LazyMotion features={domAnimation} strict>
    <MotionConfig reducedMotion="user">
      <div className="hidden md:block">
        <div className="relative">
          <PipelineDiagram activeId={highlightId} />

          <div
            role="tablist"
            aria-label="Stages of a data pipeline"
            aria-orientation="horizontal"
            className="absolute inset-0"
          >
            {pipelineItems.map((stage) => {
              const isSelected = stage.id === selectedId;
              const box = hitBox(stage.id);
              return (
                <button
                  key={stage.id}
                  ref={(el) => {
                    tabRefs.current[stage.id] = el;
                  }}
                  id={`${baseId}-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={panelId}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => choose(stage.id)}
                  onKeyDown={onTabKeyDown}
                  onPointerEnter={() => setHoverId(stage.id)}
                  onPointerLeave={() => setHoverId(null)}
                  onFocus={() => setHoverId(null)}
                  className={`group absolute flex cursor-pointer flex-col justify-end text-left outline-offset-2 ${
                    stage.id === "orchestration" ? "items-start justify-start" : "items-center"
                  }`}
                  style={box}
                >
                  <span
                    className={`mono-label whitespace-nowrap transition-colors ${
                      stage.id === "orchestration" ? "" : "text-center"
                    } ${isSelected ? "text-lime" : "text-muted group-hover:text-paper"}`}
                  >
                    {stage.index !== "∞" ? `${stage.index} · ` : ""}
                    {stage.short}
                    <span className="sr-only">: {stage.label}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${selected.id}`}
          tabIndex={0}
          className="relative mt-6 grid min-h-[13rem] grid-cols-12 gap-x-6 border-t border-line pt-6 lg:min-h-[11rem]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={selected.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="col-span-12 grid grid-cols-12 gap-x-6 gap-y-5"
            >
              <div className="col-span-4 lg:col-span-3">
                <p className="mono-label text-lime">
                  {selected.id === "orchestration" ? "Layer · spans stages 02–05" : `Stage ${selected.index} / 06`}
                </p>
                <p className="mt-2 font-display text-[1.75rem] leading-[1.1] tracking-[-0.01em] text-paper">
                  {selected.label}
                </p>
              </div>
              <div className="col-span-8 lg:col-span-5">
                <p className="text-[0.975rem] leading-relaxed text-paper-dim">{selected.summary}</p>
                <p className="mt-3 text-[0.975rem] leading-relaxed text-paper">
                  <span className="mono-label mr-2 text-muted">In practice</span>
                  {selected.inPractice}
                </p>
              </div>
              <div className="col-span-12 lg:col-span-4">
                <p className="mono-label text-muted">Technologies</p>
                <ul className="mt-2 divide-y divide-line border-y border-line">
                  {selected.tech.map((t) => (
                    <li key={t.name} className="flex items-baseline justify-between gap-4 py-1.5">
                      <span className="text-[0.925rem] text-paper">{t.name}</span>
                      <span className="mono-label shrink-0 text-muted">
                        {t.evidence.map((e) => evidenceLabels[e].short).join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-x-8 gap-y-4">
          <p className="max-w-3xl text-sm leading-relaxed text-muted">
            {pipelineNote} Select a stage, or use the arrow keys to move between them.
          </p>
          <button
            type="button"
            onClick={togglePlay}
            aria-pressed={playing}
            className="mono-label inline-flex min-h-10 shrink-0 items-center gap-2 border border-line-strong px-4 text-paper transition-colors hover:border-lime hover:text-lime"
          >
            {playing ? (
              <Pause aria-hidden="true" className="size-3.5" />
            ) : (
              <Play aria-hidden="true" className="size-3.5" />
            )}
            {playing ? "Pause" : "Run the pipeline"}
          </button>
        </div>
      </div>

      <div className="md:hidden">
        <PipelineMobile items={pipelineItems} />
        <p className="mt-5 text-sm leading-relaxed text-muted">{pipelineNote}</p>
      </div>
    </MotionConfig>
    </LazyMotion>
  );
}

/* Hit areas in percentages of the diagram's viewBox. */
function hitBox(id: string): CSSProperties {
  if (id === "orchestration") {
    return {
      left: pct(RAIL.x1 - 4, VIEW_W),
      top: pct(RAIL.y - 30, VIEW_H),
      width: pct(RAIL.x2 - RAIL.x1 + 8, VIEW_W),
      height: pct(44, VIEW_H),
    };
  }
  const i = pipelineStages.findIndex((s) => s.id === id);
  const x = stageX(i) - 10;
  return {
    left: pct(x, VIEW_W),
    top: pct(NODE_TOP - 10, VIEW_H),
    width: pct(NODE_W + 20, VIEW_W),
    height: pct(LABEL_BOTTOM - NODE_TOP + 10, VIEW_H),
  };
}

function pct(value: number, total: number) {
  return `${(value / total) * 100}%`;
}
