import { pipelineStages } from "@/content/profile";
import {
  LABEL_BOTTOM,
  NODE_H,
  NODE_MID,
  NODE_TOP,
  NODE_W,
  RAIL,
  VIEW_H,
  VIEW_W,
  stageX,
} from "./geometry";

const C = {
  line: "var(--color-line-strong)",
  faint: "var(--color-line)",
  fill: "var(--color-ink-900)",
  paper: "var(--color-paper-dim)",
  muted: "var(--color-muted)",
  lime: "var(--color-lime)",
};

type ShapeProps = { x: number; active: boolean };

/**
 * Decorative schematic. All meaning is carried by the accessible tablist
 * and panel in PipelineExplorer, so the SVG itself is hidden from AT.
 */
export function PipelineDiagram({ activeId }: { activeId: string }) {
  const ids = pipelineStages.map((s) => s.id);
  const activeIndex = ids.indexOf(activeId);
  const railActive = activeId === "orchestration";
  const right = (i: number) => stageX(i) + NODE_W;

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      className="block h-auto w-full select-none"
      aria-hidden="true"
      focusable="false"
      style={{ fontFamily: "var(--font-mono)" }}
    >
      {/* Orchestration rail */}
      <g>
        <line
          x1={RAIL.x1}
          x2={RAIL.x2}
          y1={RAIL.y}
          y2={RAIL.y}
          stroke={railActive ? C.lime : C.line}
          strokeWidth={1}
          strokeDasharray="1 5"
          className="transition-[stroke] duration-300"
        />
        {[1, 2, 3, 4].map((i) => {
          const cx = stageX(i) + NODE_W / 2;
          return (
            <g key={i}>
              <line
                x1={cx}
                x2={cx}
                y1={RAIL.y}
                y2={NODE_TOP}
                stroke={railActive ? C.lime : C.faint}
                strokeDasharray="1 4"
                className="transition-[stroke] duration-300"
              />
              <rect
                x={cx - 2.5}
                y={RAIL.y - 2.5}
                width={5}
                height={5}
                fill={railActive ? C.lime : "var(--color-ink-950)"}
                stroke={railActive ? C.lime : C.line}
                className="transition-[fill,stroke] duration-300"
              />
            </g>
          );
        })}
        <line x1={RAIL.x1} x2={RAIL.x1} y1={RAIL.y - 5} y2={RAIL.y + 5} stroke={railActive ? C.lime : C.line} />
        <line x1={RAIL.x2} x2={RAIL.x2} y1={RAIL.y - 5} y2={RAIL.y + 5} stroke={railActive ? C.lime : C.line} />
      </g>

      {/* Fan-in from the three source slabs to extraction */}
      {[0, 1, 2].map((k) => {
        const y1 = NODE_TOP + 13 + k * 29;
        const y2 = NODE_MID - 8 + k * 8;
        const x1 = right(0);
        const x2 = stageX(1);
        const d = `M ${x1} ${y1} C ${x1 + 46} ${y1}, ${x2 - 46} ${y2}, ${x2} ${y2}`;
        const active = activeIndex === 0 || activeIndex === 1;
        return (
          <Connection key={k} d={d} active={active} delay={k * 0.5} />
        );
      })}

      {/* Straight connections between the remaining stages */}
      {[1, 2, 3, 4].map((i) => {
        const d = `M ${right(i)} ${NODE_MID} L ${stageX(i + 1)} ${NODE_MID}`;
        const active = activeIndex === i || activeIndex === i + 1;
        return <Connection key={i} d={d} active={active} delay={i * 0.35} arrow />;
      })}

      <Sources x={stageX(0)} active={activeIndex === 0} />
      <Extract x={stageX(1)} active={activeIndex === 1} />
      <Transform x={stageX(2)} active={activeIndex === 2} />
      <Database x={stageX(3)} active={activeIndex === 3} />
      <Warehouse x={stageX(4)} active={activeIndex === 4} />
      <Insights x={stageX(5)} active={activeIndex === 5} />

      {/* Axis: the direction of travel */}
      <g fontSize={10} letterSpacing="0.08em" fill={C.muted}>
        <line x1={stageX(0)} x2={right(5)} y1={LABEL_BOTTOM + 34} y2={LABEL_BOTTOM + 34} stroke={C.faint} />
        {pipelineStages.map((_, i) => (
          <line
            key={i}
            x1={stageX(i) + NODE_W / 2}
            x2={stageX(i) + NODE_W / 2}
            y1={LABEL_BOTTOM + 30}
            y2={LABEL_BOTTOM + 38}
            stroke={i === activeIndex ? C.lime : C.line}
          />
        ))}
        <text x={stageX(0)} y={LABEL_BOTTOM + 56}>RAW</text>
        <text x={stageX(2) + NODE_W / 2} y={LABEL_BOTTOM + 56}>VALIDATED</text>
        <text x={stageX(4)} y={LABEL_BOTTOM + 56}>MODELLED</text>
        <text x={right(5)} y={LABEL_BOTTOM + 56} textAnchor="end">CONSUMED</text>
      </g>
    </svg>
  );
}

function Connection({
  d,
  active,
  delay,
  arrow,
}: {
  d: string;
  active: boolean;
  delay: number;
  arrow?: boolean;
}) {
  return (
    <g>
      <path d={d} fill="none" stroke={active ? C.lime : C.line} strokeWidth={1} className="transition-[stroke] duration-300" />
      <path
        d={d}
        fill="none"
        stroke={active ? C.lime : C.paper}
        strokeWidth={active ? 3 : 2}
        strokeLinecap="square"
        className={`signal ${active ? "signal--fast" : ""}`}
        style={{ animationDelay: `${-delay}s`, opacity: active ? 1 : 0.55 }}
      />
      {arrow && <ArrowHead d={d} active={active} />}
    </g>
  );
}

function ArrowHead({ d, active }: { d: string; active: boolean }) {
  // Straight paths only: "M x1 y L x2 y"
  const parts = d.split(" ");
  const x = Number(parts[4]);
  const y = Number(parts[5]);
  return (
    <path
      d={`M ${x - 6} ${y - 4} L ${x} ${y} L ${x - 6} ${y + 4}`}
      fill="none"
      stroke={active ? C.lime : C.line}
      className="transition-[stroke] duration-300"
    />
  );
}

function nodeStyle(active: boolean) {
  return {
    fill: active ? "color-mix(in oklab, var(--color-lime) 9%, var(--color-ink-900))" : C.fill,
    stroke: active ? C.lime : C.line,
    strokeWidth: 1,
    className: "transition-[fill,stroke] duration-300",
  };
}

function detail(active: boolean) {
  return { stroke: active ? C.lime : C.muted, strokeWidth: 1, fill: "none", className: "transition-[stroke] duration-300" };
}

function Sources({ x, active }: ShapeProps) {
  return (
    <g>
      {["JSON", "XML", "DB"].map((t, k) => {
        const y = NODE_TOP + k * 29;
        return (
          <g key={t}>
            <rect x={x} y={y} width={NODE_W} height={26} {...nodeStyle(active)} />
            <text x={x + 10} y={y + 17} fontSize={10} letterSpacing="0.08em" fill={active ? C.lime : C.muted}>
              {t}
            </text>
            <line x1={x + NODE_W - 30} x2={x + NODE_W - 10} y1={y + 13} y2={y + 13} {...detail(active)} />
          </g>
        );
      })}
    </g>
  );
}

function Extract({ x, active }: ShapeProps) {
  const y = NODE_TOP;
  return (
    <g>
      <rect x={x} y={y} width={NODE_W} height={NODE_H} {...nodeStyle(active)} />
      <line x1={x + 84} x2={x + 84} y1={y} y2={y + NODE_H} {...detail(active)} strokeDasharray="2 3" />
      {[0, 1, 2].map((k) => (
        <line key={k} x1={x + 18} x2={x + 66} y1={y + 26 + k * 16} y2={y + 26 + k * 16} {...detail(active)} />
      ))}
      <path d={`M ${x + 98} ${y + 30} L ${x + 110} ${y + 42} L ${x + 98} ${y + 54}`} {...detail(active)} />
    </g>
  );
}

function Transform({ x, active }: ShapeProps) {
  const y = NODE_TOP;
  return (
    <g>
      <rect x={x} y={y} width={NODE_W} height={NODE_H} {...nodeStyle(active)} />
      {/* funnel: many in, fewer out */}
      <path d={`M ${x + 22} ${y + 18} L ${x + 58} ${y + 38} L ${x + 58} ${y + 46} L ${x + 22} ${y + 66}`} {...detail(active)} />
      <line x1={x + 58} x2={x + 106} y1={y + 42} y2={y + 42} {...detail(active)} />
      {/* validation marks */}
      <path d={`M ${x + 80} ${y + 22} l 4 4 l 8 -8`} {...detail(active)} />
      <path d={`M ${x + 80} ${y + 58} l 8 8 M ${x + 88} ${y + 58} l -8 8`} {...detail(active)} />
    </g>
  );
}

function Database({ x, active }: ShapeProps) {
  const y = NODE_TOP + 6;
  const cx = x + NODE_W / 2;
  const rx = NODE_W / 2;
  const ry = 9;
  const h = NODE_H - 12;
  const s = nodeStyle(active);
  return (
    <g>
      <path
        d={`M ${x} ${y} L ${x} ${y + h} A ${rx} ${ry} 0 0 0 ${x + NODE_W} ${y + h} L ${x + NODE_W} ${y}`}
        {...s}
      />
      <ellipse cx={cx} cy={y} rx={rx} ry={ry} {...s} />
      <path d={`M ${x} ${y + h / 3} A ${rx} ${ry} 0 0 0 ${x + NODE_W} ${y + h / 3}`} {...detail(active)} />
      <path d={`M ${x} ${(y + (2 * h) / 3)} A ${rx} ${ry} 0 0 0 ${x + NODE_W} ${y + (2 * h) / 3}`} {...detail(active)} />
    </g>
  );
}

function Warehouse({ x, active }: ShapeProps) {
  const y = NODE_TOP;
  const cols = 4;
  const rows = 3;
  return (
    <g>
      <rect x={x} y={y} width={NODE_W} height={NODE_H} {...nodeStyle(active)} />
      {Array.from({ length: cols - 1 }, (_, k) => (
        <line key={`c${k}`} x1={x + ((k + 1) * NODE_W) / cols} x2={x + ((k + 1) * NODE_W) / cols} y1={y} y2={y + NODE_H} {...detail(active)} strokeOpacity={0.6} />
      ))}
      {Array.from({ length: rows - 1 }, (_, k) => (
        <line key={`r${k}`} x1={x} x2={x + NODE_W} y1={y + ((k + 1) * NODE_H) / rows} y2={y + ((k + 1) * NODE_H) / rows} {...detail(active)} strokeOpacity={0.6} />
      ))}
      <rect x={x + NODE_W / cols} y={y + NODE_H / rows} width={NODE_W / cols} height={NODE_H / rows} fill={active ? C.lime : C.muted} opacity={active ? 0.8 : 0.35} className="transition-[fill,opacity] duration-300" />
    </g>
  );
}

function Insights({ x, active }: ShapeProps) {
  const y = NODE_TOP;
  const bars = [22, 38, 30, 52];
  return (
    <g>
      <rect x={x} y={y} width={NODE_W} height={NODE_H} {...nodeStyle(active)} />
      <line x1={x + 18} x2={x + NODE_W - 18} y1={y + NODE_H - 14} y2={y + NODE_H - 14} {...detail(active)} />
      {bars.map((h, k) => (
        <rect
          key={k}
          x={x + 26 + k * 22}
          y={y + NODE_H - 14 - h}
          width={10}
          height={h}
          {...detail(active)}
          fill={k === bars.length - 1 && active ? C.lime : "none"}
        />
      ))}
    </g>
  );
}
