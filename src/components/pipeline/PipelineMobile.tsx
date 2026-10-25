"use client";

import { useId, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Plus } from "lucide-react";
import { evidenceLabels, type PipelineStage } from "@/content/profile";

/** Narrow-screen pipeline: a vertical line of stages, each a disclosure. */
export function PipelineMobile({ items }: { items: PipelineStage[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0].id);
  const baseId = useId();
  const stages = items.filter((s) => s.id !== "orchestration");
  const layer = items.find((s) => s.id === "orchestration");

  return (
    <div>
      <ol className="relative" aria-label="Stages of a data pipeline">
        {/* the line data travels along */}
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[7px] w-px bg-line-strong" />
        <span aria-hidden="true" className="absolute top-3 bottom-3 left-[5px] w-[5px]">
          <span className="signal-vertical absolute left-0 h-3 w-full bg-lime" />
        </span>
        {stages.map((stage) => (
          <Row
            key={stage.id}
            stage={stage}
            open={openId === stage.id}
            onToggle={() => setOpenId(openId === stage.id ? null : stage.id)}
            panelId={`${baseId}-${stage.id}`}
          />
        ))}
      </ol>
      {layer && (
        <div className="mt-4 border-t border-dashed border-line-strong pt-1">
          <ol aria-label="Across all stages">
            <Row
              stage={layer}
              open={openId === layer.id}
              onToggle={() => setOpenId(openId === layer.id ? null : layer.id)}
              panelId={`${baseId}-${layer.id}`}
              layer
            />
          </ol>
        </div>
      )}
    </div>
  );
}

function Row({
  stage,
  open,
  onToggle,
  panelId,
  layer = false,
}: {
  stage: PipelineStage;
  open: boolean;
  onToggle: () => void;
  panelId: string;
  layer?: boolean;
}) {
  return (
    <li className="relative pl-8">
      <span
        aria-hidden="true"
        className={`absolute top-[1.15rem] left-0 size-[15px] border transition-colors ${
          layer ? "border-dashed" : ""
        } ${open ? "border-lime bg-lime/15" : "border-line-strong bg-ink-950"}`}
      />
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className="flex min-h-12 w-full items-center justify-between gap-4 py-3 text-left"
      >
        <span className="flex items-baseline gap-3">
          <span className={`mono-label ${open ? "text-lime" : "text-muted"}`}>
            {layer ? "Layer" : stage.index}
          </span>
          <span className="font-display text-xl leading-tight text-paper">{stage.label}</span>
        </span>
        <Plus
          aria-hidden="true"
          className={`size-4 shrink-0 text-muted transition-transform duration-300 ${open ? "rotate-45 text-lime" : ""}`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <m.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 1, 0.5, 1] }}
            className="overflow-hidden"
          >
            <div className="pb-5">
              <p className="text-[0.95rem] leading-relaxed text-paper-dim">{stage.summary}</p>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-paper">{stage.inPractice}</p>
              <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                {stage.tech.map((t) => (
                  <li key={t.name} className="text-sm text-paper">
                    {t.name}
                    <span className="mono-label ml-1.5 text-muted">
                      {t.evidence.map((e) => evidenceLabels[e].short).join("·")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </li>
  );
}
