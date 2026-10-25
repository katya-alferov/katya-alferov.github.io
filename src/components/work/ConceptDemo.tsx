"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";

/**
 * Portfolio demonstration with synthetic data. Not a system built at an
 * employer: it only illustrates the validate → transform → load → report flow.
 */

type Row = { invoice: string; account: string | null; date: string; amount: number };

const raw: Row[] = [
  { invoice: "INV-1001", account: "ACC-204", date: "2026-01-04", amount: 412.5 },
  { invoice: "INV-1002", account: "ACC-117", date: "2026-01-09", amount: 89.9 },
  { invoice: "INV-1003", account: null, date: "2026-01-11", amount: 230.0 },
  { invoice: "INV-1004", account: "ACC-204", date: "2026-01-15", amount: 156.2 },
  { invoice: "INV-1002", account: "ACC-117", date: "2026-01-09", amount: 89.9 },
  { invoice: "INV-1005", account: "ACC-331", date: "2026-13-02", amount: 75.0 },
  { invoice: "INV-1006", account: "ACC-117", date: "2026-02-03", amount: -40.0 },
  { invoice: "INV-1007", account: "ACC-331", date: "2026-02-07", amount: 318.4 },
  { invoice: "INV-1008", account: "ACC-204", date: "2026-02-12", amount: 64.1 },
];

const rules = [
  { sql: "account_id IS NOT NULL", reason: "missing account" },
  { sql: "amount >= 0", reason: "negative amount" },
  { sql: "is_valid_date(billing_date)", reason: "invalid date" },
  { sql: "invoice_id is unique", reason: "duplicate invoice" },
];

function isValidDate(value: string) {
  const [y, m, d] = value.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return date.getUTCFullYear() === y && date.getUTCMonth() === m - 1 && date.getUTCDate() === d;
}

function validate(rows: Row[]) {
  const seen = new Set<string>();
  return rows.map((row) => {
    let reason: string | null = null;
    if (!row.account) reason = rules[0].reason;
    else if (row.amount < 0) reason = rules[1].reason;
    else if (!isValidDate(row.date)) reason = rules[2].reason;
    else if (seen.has(row.invoice)) reason = rules[3].reason;
    seen.add(row.invoice);
    return { row, reason };
  });
}

const checked = validate(raw);
const valid = checked.filter((c) => !c.reason).map((c) => c.row);
const rejected = checked.filter((c) => c.reason);
const transformed = valid.map((r) => ({ ...r, month: r.date.slice(0, 7) }));
const byAccount = Object.entries(
  transformed.reduce<Record<string, number>>((acc, r) => {
    acc[r.account!] = (acc[r.account!] ?? 0) + r.amount;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);
const max = Math.max(...byAccount.map(([, v]) => v));

const steps = [
  { id: "extract", label: "Extract", note: `${raw.length} rows read from invoices_raw.csv` },
  { id: "validate", label: "Validate", note: `${valid.length} pass, ${rejected.length} rejected with a reason` },
  { id: "transform", label: "Transform", note: "Derive billing_month, standardise amounts" },
  { id: "load", label: "Load", note: "Valid rows to the fact table, rejects to a log" },
  { id: "report", label: "Report", note: "Billed amount per account" },
] as const;

type StepId = (typeof steps)[number]["id"];

const money = (n: number) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function ConceptDemo() {
  const [step, setStep] = useState<StepId>("validate");
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});
  const baseId = useId();
  const current = steps.find((s) => s.id === step)!;

  function onKeyDown(e: KeyboardEvent<HTMLButtonElement>) {
    const i = steps.findIndex((s) => s.id === step);
    let n: number | null = null;
    if (e.key === "ArrowRight") n = (i + 1) % steps.length;
    if (e.key === "ArrowLeft") n = (i - 1 + steps.length) % steps.length;
    if (n === null) return;
    e.preventDefault();
    setStep(steps[n].id);
    refs.current[steps[n].id]?.focus();
  }

  return (
    <div className="border border-line bg-ink-900">
      <div role="tablist" aria-label="Demo pipeline steps" className="grid grid-cols-5 border-b border-line">
        {steps.map((s, i) => {
          const active = s.id === step;
          return (
            <button
              key={s.id}
              ref={(el) => {
                refs.current[s.id] = el;
              }}
              id={`${baseId}-${s.id}`}
              role="tab"
              type="button"
              aria-selected={active}
              aria-controls={`${baseId}-panel`}
              tabIndex={active ? 0 : -1}
              onClick={() => setStep(s.id)}
              onKeyDown={onKeyDown}
              className={`relative flex min-h-14 flex-col items-start justify-center gap-0.5 border-r border-line px-2 py-3 text-left last:border-r-0 sm:px-4 ${
                active ? "bg-ink-850" : "hover:bg-ink-850/60"
              }`}
            >
              <span className={`mono-label ${active ? "text-lime" : "text-muted"}`}>0{i + 1}</span>
              <span className={`text-[0.8rem] sm:text-sm ${active ? "text-paper" : "text-paper-dim"}`}>{s.label}</span>
              {active && <span aria-hidden="true" className="absolute inset-x-0 -bottom-px h-0.5 bg-lime" />}
            </button>
          );
        })}
      </div>

      <div
        id={`${baseId}-panel`}
        role="tabpanel"
        aria-labelledby={`${baseId}-${step}`}
        tabIndex={0}
        className="p-4 sm:p-6"
      >
        <p className="mono-label text-muted">{current.note}</p>
        <div className="mt-4 min-h-[19rem]">
          {step === "extract" && <RowsTable rows={raw.map((row) => ({ row }))} />}
          {step === "validate" && (
            <>
              <ul className="mb-4 flex flex-wrap gap-x-5 gap-y-1">
                {rules.map((r) => (
                  <li key={r.sql} className="font-mono text-xs text-paper-dim">
                    <span className="text-lime">✓</span> {r.sql}
                  </li>
                ))}
              </ul>
              <RowsTable rows={checked} showStatus />
            </>
          )}
          {step === "transform" && <RowsTable rows={transformed.map((row) => ({ row }))} showMonth />}
          {step === "load" && (
            <dl className="grid gap-px border border-line bg-line sm:grid-cols-2">
              <div className="bg-ink-900 p-5">
                <dt className="mono-label text-muted">fact_invoice</dt>
                <dd className="mt-2 font-display text-5xl text-paper">{valid.length}</dd>
                <dd className="mt-1 text-sm text-paper-dim">rows inserted</dd>
              </div>
              <div className="bg-ink-900 p-5">
                <dt className="mono-label text-muted">reject_log</dt>
                <dd className="mt-2 font-display text-5xl text-paper">{rejected.length}</dd>
                <dd className="mt-1 text-sm text-paper-dim">
                  rows kept with their reason, for follow-up rather than silently dropped
                </dd>
              </div>
            </dl>
          )}
          {step === "report" && (
            <table className="w-full text-sm">
              <caption className="sr-only">Billed amount per account, synthetic data</caption>
              <thead>
                <tr className="mono-label text-left text-muted">
                  <th scope="col" className="pb-2 font-normal">Account</th>
                  <th scope="col" className="pb-2 font-normal">Billed</th>
                  <th scope="col" className="w-1/2 pb-2 font-normal">
                    <span className="sr-only">Relative size</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {byAccount.map(([acc, total]) => (
                  <tr key={acc} className="border-t border-line">
                    <th scope="row" className="py-3 text-left font-mono font-normal text-paper">{acc}</th>
                    <td className="py-3 font-mono text-paper tabular-nums">{money(total)}</td>
                    <td className="py-3" aria-hidden="true">
                      <span className="block h-2 bg-lime" style={{ width: `${(total / max) * 100}%` }} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function RowsTable({
  rows,
  showStatus = false,
  showMonth = false,
}: {
  rows: { row: Row & { month?: string }; reason?: string | null }[];
  showStatus?: boolean;
  showMonth?: boolean;
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[30rem] font-mono text-xs">
        <caption className="sr-only">Synthetic invoice rows</caption>
        <thead>
          <tr className="text-left text-muted">
            <th scope="col" className="pb-2 font-normal">invoice_id</th>
            <th scope="col" className="pb-2 font-normal">account_id</th>
            <th scope="col" className="pb-2 font-normal">billing_date</th>
            {showMonth && <th scope="col" className="pb-2 font-normal">billing_month</th>}
            <th scope="col" className="pb-2 text-right font-normal">amount</th>
            {showStatus && <th scope="col" className="pb-2 pl-4 font-normal">status</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map(({ row, reason }, i) => (
            <tr key={i} className={`border-t border-line ${reason ? "text-muted" : "text-paper"}`}>
              <td className="py-1.5">{row.invoice}</td>
              <td className="py-1.5">{row.account ?? <span className="text-lime">NULL</span>}</td>
              <td className="py-1.5">{row.date}</td>
              {showMonth && <td className="py-1.5 text-lime">{row.month}</td>}
              <td className="py-1.5 text-right tabular-nums">{money(row.amount)}</td>
              {showStatus && (
                <td className="py-1.5 pl-4 whitespace-nowrap">
                  {reason ? (
                    <span>
                      <span className="text-paper">✕</span> {reason}
                    </span>
                  ) : (
                    <span className="text-lime">pass</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
