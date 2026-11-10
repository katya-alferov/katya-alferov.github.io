"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: "chaos into clarity".
 * Points drift in from the left as scattered noise and settle into neat
 * lanes on the right, like raw records becoming a clean table. The pointer
 * pushes nearby points aside and lights them in the accent colour.
 *
 * Purely decorative (aria-hidden). Pauses off-screen and in hidden tabs;
 * with reduced motion it draws one still frame.
 */

type Point = { x: number; lane: number; jitter: number; phase: number; speed: number; size: number };

const LANES = 9;

export function DataField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let points: Point[] = [];
    let colors = readColors();
    const pointer = { x: -9999, y: -9999, active: false };
    let frame = 0;
    let running = false;
    let visible = true;
    let last = performance.now();

    function readColors() {
      const css = getComputedStyle(document.documentElement);
      return {
        dot: css.getPropertyValue("--color-muted").trim() || "#8f8b81",
        lane: css.getPropertyValue("--color-line").trim() || "#2a2b26",
        accent: css.getPropertyValue("--color-lime").trim() || "#d4f54a",
      };
    }

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round(Math.min(220, Math.max(70, (width * height) / 5200)));
      points = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        lane: Math.floor(Math.random() * LANES),
        jitter: (Math.random() - 0.5) * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 14 + Math.random() * 22,
        size: Math.random() < 0.18 ? 3 : 2,
      }));
    }

    function laneY(lane: number) {
      const top = height * 0.12;
      const span = height * 0.76;
      return top + (span * (lane + 0.5)) / LANES;
    }

    function draw(dt: number, t: number) {
      ctx!.clearRect(0, 0, width, height);

      // Faint lanes on the ordered (right) side.
      ctx!.strokeStyle = colors.lane;
      ctx!.lineWidth = 1;
      ctx!.globalAlpha = 0.9;
      for (let l = 0; l < LANES; l++) {
        const y = Math.round(laneY(l)) + 0.5;
        ctx!.beginPath();
        ctx!.moveTo(width * 0.62, y);
        ctx!.lineTo(width, y);
        ctx!.stroke();
      }

      for (const p of points) {
        p.x += p.speed * dt;
        if (p.x > width + 10) {
          p.x = -10;
          p.lane = Math.floor(Math.random() * LANES);
          p.jitter = (Math.random() - 0.5) * 2;
        }

        // order: 0 at the left (noise) → 1 past ~65% of the width (aligned)
        const k = Math.min(1, Math.max(0, (p.x / width - 0.3) / 0.35));
        const order = k * k * (3 - 2 * k);
        const noise = (1 - order) * height * 0.38;
        const wobble = Math.sin(t * 0.0012 + p.phase) * (1 - order) * 18;
        let x = p.x;
        let y = laneY(p.lane) + p.jitter * noise + wobble;

        // Snap to a 12px rhythm once ordered, like cells in a table.
        if (order > 0.98) x = Math.round(x / 12) * 12;

        let glow = 0;
        if (pointer.active) {
          const dx = x - pointer.x;
          const dy = y - pointer.y;
          const d = Math.hypot(dx, dy);
          const r = 120;
          if (d < r) {
            const f = 1 - d / r;
            glow = f;
            x += (dx / (d || 1)) * f * 26;
            y += (dy / (d || 1)) * f * 26;
          }
        }

        ctx!.globalAlpha = 0.5 + order * 0.3 + glow * 0.2;
        ctx!.fillStyle = glow > 0.15 ? colors.accent : colors.dot;
        const s = p.size + glow * 2;
        ctx!.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx!.globalAlpha = 1;
    }

    function loop(now: number) {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt, now);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduced || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = pointer.x >= 0 && pointer.y >= 0 && pointer.x <= width && pointer.y <= height;
      if (reduced) draw(0, 0);
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onTheme() {
      colors = readColors();
      if (!running) draw(0, 0);
    }

    resize();
    draw(0, 0);
    start();

    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw(0, 0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("themechange", onTheme);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("themechange", onTheme);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full [mask-image:linear-gradient(to_right,rgba(0,0,0,0.4),rgba(0,0,0,0.65)_45%,#000_75%)]"
    />
  );
}
