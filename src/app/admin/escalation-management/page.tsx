'use client'
import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field, FieldProps } from "formik";

/**
 * pages/index.tsx
 *
 * Single-file Next.js + TypeScript page implementing "Escalation Management" UI as one component.
 * - Tailwind CSS for layout & styling (assumes Tailwind is configured)
 * - Formik for forms (Escalation Rules and Code Compiler)
 * - Includes a Code Compiler panel with an Input (stdin) field (mocked runner)
 *
 * Drop this file into pages/index.tsx of a Next.js project with Tailwind + Formik installed.
 */

/* ---------------------------
   Types & Mock data
   --------------------------- */
type EscalationRuleValues = {
  timeDurationHours: number;
  escalateTo: string;
  autoPriorityLevels: string[]; // e.g., ["High", "Critical"]
  notifyAssignee: boolean;
  notifyManager: boolean;
};

type EscalationLevel = {
  id: string;
  name: string;
  desc: string;
  eta: string;
  color?: string; // tailwind color class
};

type EscalatedTicket = {
  id: string;
  title: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  level: string;
  elapsed: string;
};

const escalationLevels: EscalationLevel[] = [
  { id: "L1", name: "Level 1: Support Team", desc: "Initial ticket handling", eta: "0-24h", color: "bg-gray-800" },
  { id: "L2", name: "Level 2: Senior Admin", desc: "Complex issues and escalations", eta: "24-48h", color: "bg-yellow-500" },
  { id: "L3", name: "Level 3: Management", desc: "Critical issues and SLA breaches", eta: "48h+", color: "bg-red-500" }
];

const initialEscalatedTickets: EscalatedTicket[] = [
  { id: "#T105", title: "Critical service down", priority: "Critical" as any, level: "L2", elapsed: "2d 3h" },
  { id: "#T023", title: "Payment not processed", priority: "High", level: "L1", elapsed: "30h" }
];

/* ---------------------------
   Helpers
   --------------------------- */
const nowTime = () => new Date().toLocaleString();

/* ---------------------------
   Page Component
   --------------------------- */

const Page: NextPage = () => {
  // UI state
  const [activeEscalationsCount] = useState<number>(12);
  const [avgEscalationTime] = useState<string>("22h");
  const [slaBreaches] = useState<number>(3);

  // Rules state (saved)
  const [savedRules, setSavedRules] = useState<EscalationRuleValues>({
    timeDurationHours: 24,
    escalateTo: "L2",
    autoPriorityLevels: ["High", "Critical"],
    notifyAssignee: true,
    notifyManager: false
  });

  // Escalation chain and tickets
  const [levels] = useState<EscalationLevel[]>(escalationLevels);
  const [tickets, setTickets] = useState<EscalatedTicket[]>(initialEscalatedTickets);

  // Code compiler mock state
  const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const ticketsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to top of tickets on change (nice to have)
    ticketsRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tickets]);

  // Simulated "save rules" function
  const applyRules = (values: EscalationRuleValues) => {
    setSavedRules(values);
    // In a real app, call API here. We keep it client-side for demo.
  };

  // Simulated code run
  const simulateRun = (values: { language: string; code: string; stdin: string }) => {
    setIsRunning(true);
    setCompilerOutput(null);
    setTimeout(() => {
      const header = `Language: ${values.language}\n`;
      const codeLength = `Code length: ${values.code.length} chars\n`;
      const stdinEcho = `stdin: "${values.stdin}"\n`;
      const result = `Mock program output: ${values.stdin ? values.stdin.split("\n").join(" | ").toUpperCase() : "NO INPUT"}\n`;
      setCompilerOutput(header + codeLength + stdinEcho + result + `\n[run at ${nowTime()}]`);
      setIsRunning(false);
    }, 800);
  };

  // Quick actions for tickets (mock)
  const resolveTicket = (id: string) => {
    setTickets((prev) => prev.filter((t) => t.id !== id));
  };

  const escalateFurther = (id: string) => {
    setTickets((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        // move to next level if exists
        const currentIndex = levels.findIndex((l) => l.id === t.level);
        const next = levels[Math.min(currentIndex + 1, levels.length - 1)];
        return { ...t, level: next.id, elapsed: "0h" };
      })
    );
  };

  const reassignTicket = (id: string) => {
    // mock: append " (reassigned)"
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, title: t.title + " (reassigned)" } : t)));
  };

  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#f6eef8] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-lg p-5 mb-6 shadow-sm">
          <h1 className="text-xl font-semibold">Escalation Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and track escalated tickets</p>
        </header>

        {/* Top KPI cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-500">Active Escalations</div>
            <div className="text-2xl font-semibold mt-2">{activeEscalationsCount}</div>
            <div className="text-xs text-gray-400 mt-1">Requiring immediate attention</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-500">Avg Escalation Time</div>
            <div className="text-2xl font-semibold mt-2">{avgEscalationTime}</div>
            <div className="text-xs text-gray-400 mt-1">Before resolution</div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="text-xs text-gray-500">SLA Breaches</div>
            <div className="text-2xl font-semibold mt-2">{slaBreaches}</div>
            <div className="text-xs text-gray-400 mt-1">This week</div>
          </div>
        </div>

        {/* Escalation Rules form */}
        <section className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-3">Escalation Rules</h2>

          <Formik
            initialValues={{
              timeDurationHours: savedRules.timeDurationHours,
              escalateTo: savedRules.escalateTo,
              autoPriorityLevels: savedRules.autoPriorityLevels,
              notifyAssignee: savedRules.notifyAssignee,
              notifyManager: savedRules.notifyManager
            }}
            onSubmit={(values) => {
              // values.autoPriorityLevels is array of strings (we'll ensure via inputs)
              applyRules(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <Form className="space-y-4">
                {/* Time-based Escalation */}
                <div className="border rounded p-4 bg-[#faf7fc]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Time-based Escalation</div>
                      <div className="text-xs text-gray-500">Unresolved duration triggers escalation</div>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Unresolved Duration (hours)</label>
                      <Field name="timeDurationHours">
                        {({ field }: FieldProps) => (
                          <input
                            {...field}
                            type="number"
                            min={1}
                            className="w-full border rounded px-3 py-2"
                            aria-label="Unresolved Duration"
                          />
                        )}
                      </Field>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Escalate To</label>
                      <Field as="select" name="escalateTo" className="w-full border rounded px-3 py-2">
                        {levels.map((l) => (
                          <option key={l.id} value={l.id}>
                            {l.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>

                {/* Priority-based Escalation */}
                <div className="border rounded p-4 bg-[#faf7fc]">
                  <div className="font-medium">Priority-based Escalation</div>
                  <div className="text-xs text-gray-500">Auto-escalate priority tickets</div>

                  <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-xs text-gray-500 mb-1">Auto-escalate priority levels</label>

                      {/* Simple multi-select using checkboxes */}
                      <div className="flex gap-3 flex-wrap">
                        {["Low", "Medium", "High", "Critical"].map((p) => {
                          const checked = values.autoPriorityLevels.includes(p);
                          return (
                            <label key={p} className="inline-flex items-center gap-2 bg-white px-3 py-1 rounded shadow-sm">
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => {
                                  const next = checked
                                    ? values.autoPriorityLevels.filter((x: string) => x !== p)
                                    : [...values.autoPriorityLevels, p];
                                  setFieldValue("autoPriorityLevels", next);
                                }}
                              />
                              <span className="text-sm">{p}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs text-gray-500 mb-2">Notifications</div>
                      <label className="flex items-center justify-between mb-2">
                        <span className="text-sm">Notify Assignee</span>
                        <input
                          type="checkbox"
                          checked={values.notifyAssignee}
                          onChange={(e) => setFieldValue("notifyAssignee", e.target.checked)}
                          className="h-4 w-4"
                        />
                      </label>

                      <label className="flex items-center justify-between">
                        <span className="text-sm">Notify Manager</span>
                        <input
                          type="checkbox"
                          checked={values.notifyManager}
                          onChange={(e) => setFieldValue("notifyManager", e.target.checked)}
                          className="h-4 w-4"
                        />
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button type="submit" className="bg-black text-white px-4 py-2 rounded text-sm">
                    Save Rules
                  </button>
                  <div className="text-xs text-gray-500">Last saved rules: <span className="font-medium">{savedRules.timeDurationHours}h → {savedRules.escalateTo}</span></div>
                </div>
              </Form>
            )}
          </Formik>
        </section>

        {/* Escalation Chain */}
        <section className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-3">Escalation Chain</h2>
          <div className="space-y-3">
            {levels.map((l, idx) => (
              <div key={l.id} className="flex items-center justify-between bg-[#faf7fc] p-3 rounded">
                <div className="flex items-center gap-3">
                  <div className={`rounded-full h-10 w-10 flex items-center justify-center text-white ${l.color ?? "bg-gray-800"}`}>
                    {l.id.replace("L", "")}
                  </div>
                  <div>
                    <div className="font-medium">{l.name}</div>
                    <div className="text-xs text-gray-500">{l.desc}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{l.eta}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Currently Escalated Tickets */}
        <section className="bg-white rounded-lg p-4 shadow-sm mb-6">
          <h2 className="font-semibold mb-3">Currently Escalated Tickets</h2>

          <div ref={ticketsRef} className="space-y-3 max-h-[34vh] overflow-auto">
            {tickets.map((t) => (
              <div key={t.id} className="bg-[#faf7fc] p-3 rounded flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium">{t.id}</div>
                    <div className="text-xs text-gray-500">{t.title}</div>
                    <div className={`text-xs px-2 py-0.5 rounded ${t.priority === "Critical" ? "bg-red-100 text-red-700" : t.priority === "High" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                      {t.priority}
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 mt-2">Escalation Level: {t.level} • Elapsed: {t.elapsed}</div>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => resolveTicket(t.id)} className="bg-white border px-3 py-1 rounded text-sm">Resolve</button>
                  <button onClick={() => escalateFurther(t.id)} className="bg-indigo-600 text-white px-3 py-1 rounded text-sm">Escalate Further</button>
                  <button onClick={() => reassignTicket(t.id)} className="bg-gray-200 px-3 py-1 rounded text-sm">Reassign</button>
                </div>
              </div>
            ))}

            {tickets.length === 0 && <div className="text-sm text-gray-500">No currently escalated tickets.</div>}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Page;