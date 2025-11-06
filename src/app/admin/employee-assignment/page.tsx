'use client'
import React, { useEffect, useRef, useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field, FieldProps } from "formik";

/**
 * Single-file page implementing "Employee Assignment" UI as a single Next.js + TypeScript component.
 * - Tailwind CSS classes for layout & styles (assumes Tailwind is configured in your project)
 * - Formik for forms: assignment actions, auto-assignment rules, and Code Compiler (with stdin)
 * - Responsive: grid collapses to single column on small screens
 *
 * How to use:
 * - Place this file at pages/index.tsx in a Next.js project configured with Tailwind + TypeScript + Formik.
 * - Install dependencies: formik, next, react, react-dom, typescript, tailwindcss (if not already).
 *
 * The "Run" button in the Code Compiler is a client-side simulated runner for demo only.
 */

/* -----------------------------
   Types
   ----------------------------- */
type Employee = {
  id: string;
  name: string;
  workload: number; // number of active tickets
  skills: string[]; // e.g., ["Billing", "CRM"]
  status: "Available" | "Busy" | "Offline";
};

type Ticket = {
  id: string;
  category: string;
  priority: "Low" | "Medium" | "High";
  assignedTo?: string; // employee id
};

type AutoAssignRules = {
  method: "Round Robin" | "Least Workload" | "Skill Match";
  skillMatching: "Required" | "Preferred" | "Off";
};

/* -----------------------------
   Mock data
   ----------------------------- */
const initialEmployees: Employee[] = [
  { id: "e1", name: "Sarah Johnson", workload: 2, skills: ["Billing", "CRM"], status: "Available" },
  { id: "e2", name: "Mike Chen", workload: 5, skills: ["Delivery", "Billing"], status: "Busy" },
  { id: "e3", name: "Emma Wilson", workload: 1, skills: ["CRM", "Support"], status: "Available" }
];

const initialTickets: Ticket[] = [
  { id: "T-001", category: "Billing", priority: "High" },
  { id: "T-002", category: "Delivery", priority: "Medium" },
  { id: "T-003", category: "CRM", priority: "Low" }
];

/* -----------------------------
   Helper utils
   ----------------------------- */
const uid = (p = "") => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}${p}`;

/* -----------------------------
   Component
   ----------------------------- */
const Home: NextPage = () => {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
  const [rules, setRules] = useState<AutoAssignRules>({
    method: "Round Robin",
    skillMatching: "Required"
  });

  const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
  const [compilerRunning, setCompilerRunning] = useState(false);

  const ticketListRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // scroll to top of ticket list on ticket change (small nicety)
    ticketListRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [tickets]);

  /* Assignment logic (mock) */
  const assignTicketTo = (ticketId: string, employeeId: string | undefined) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, assignedTo: employeeId } : t))
    );

    if (employeeId) {
      setEmployees((prev) =>
        prev.map((e) => (e.id === employeeId ? { ...e, workload: e.workload + 1 } : e))
      );
    }
  };

  const autoAssignAll = () => {
    // Very small demo algorithm that respects selected auto-assign rules:
    if (rules.method === "Round Robin") {
      let idx = 0;
      const availableEmployees = employees.filter((e) => e.status !== "Offline");
      setTickets((prev) =>
        prev.map((t) => {
          const emp = availableEmployees[idx % availableEmployees.length];
          idx++;
          // increment workload after mapping
          assignTicketTo(t.id, emp.id);
          return { ...t, assignedTo: emp.id };
        })
      );
      return;
    }

    if (rules.method === "Least Workload") {
      setTickets((prev) =>
        prev.map((t) => {
          // choose employee with lowest workload who is not offline
          const ok = employees.filter((e) => e.status !== "Offline");
          const emp = ok.reduce((a, b) => (a.workload <= b.workload ? a : b), ok[0]);
          assignTicketTo(t.id, emp.id);
          return { ...t, assignedTo: emp.id };
        })
      );
      return;
    }

    if (rules.method === "Skill Match") {
      setTickets((prev) =>
        prev.map((t) => {
          // prefer employee who has the required skill (category)
          const skilled = employees.filter((e) => e.skills.includes(t.category) && e.status !== "Offline");
          const pick = skilled.length ? skilled[0] : employees.find((e) => e.status !== "Offline");
          if (pick) assignTicketTo(t.id, pick.id);
          return { ...t, assignedTo: pick?.id };
        })
      );
      return;
    }
  };

  /* Code compiler simulation */
  const simulateCompile = (values: { language: string; code: string; stdin: string }) => {
    setCompilerRunning(true);
    setCompilerOutput(null);
    setTimeout(() => {
      // simple mock: echo language, code length and uppercase stdin
      const header = `Language: ${values.language}\n`;
      const codeLen = `Code length: ${values.code.length} chars\n`;
      const stdinEcho = `stdin: "${values.stdin}"\n`;
      const result = `Program output (mock): ${values.stdin ? values.stdin.toUpperCase() : "NO INPUT"}\n`;
      setCompilerOutput(header + codeLen + stdinEcho + result);
      setCompilerRunning(false);
    }, 900);
  };

  /* -----------------------------
     Render UI (single big component)
     ----------------------------- */
  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#f6eef8] p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <h1 className="text-xl font-semibold">Employee Assignment</h1>
          <p className="text-sm text-gray-500">Assign tickets to employees</p>
        </div>

        {/* Main grid: left employees, right pending tickets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee List - left (1 col on lg) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg p-4 shadow-sm h-full flex flex-col">
              <h2 className="font-semibold mb-3">Employee List</h2>
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                <div>Name</div>
                <div className="ml-auto">Workload</div>
              </div>

              <div className="space-y-3 overflow-auto">
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex items-center justify-between gap-4 bg-[#faf7fc] p-3 rounded"
                    role="group"
                    aria-label={`Employee ${emp.name}`}
                  >
                    <div>
                      <div className="font-medium">{emp.name}</div>
                      <div className="text-xs text-gray-500">Skills: {emp.skills.join(", ")}</div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-sm px-2 py-1 bg-white rounded border text-center min-w-[40px]">
                        {emp.workload}
                      </div>
                      <div>
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${
                            emp.status === "Available"
                              ? "bg-green-100 text-green-700"
                              : emp.status === "Busy"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-xs text-gray-500">
                Tip: click "Assign" on a ticket in the right column to assign to a selected employee.
              </div>
            </div>
          </div>

          {/* Pending Tickets - right (span 2 on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h2 className="font-semibold mb-3">Pending Tickets</h2>

              <div ref={ticketListRef} className="space-y-4 max-h-[46vh] overflow-auto pr-2">
                {tickets.map((t) => (
                  <div key={t.id} className="flex items-start justify-between gap-4 bg-[#faf7fc] p-3 rounded">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="font-medium">{t.id}</div>
                        <div className="text-xs text-gray-500">{t.category}</div>
                        <div
                          className={`text-xs px-2 py-0.5 rounded ${
                            t.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : t.priority === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {t.priority}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mt-2">Assigned: {t.assignedTo ?? "Unassigned"}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Formik dropdown to pick employee and assign */}
                      <Formik
                        initialValues={{ assignee: t.assignedTo ?? "" }}
                        onSubmit={(values) => {
                          // assign or unassign
                          assignTicketTo(t.id, values.assignee || undefined);
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <Form className="flex items-center gap-2">
                            <Field name="assignee" as="select" className="border rounded px-2 py-1 text-sm">
                              <option value="">-- Select employee --</option>
                              {employees.map((e) => (
                                <option key={e.id} value={e.id}>
                                  {e.name} ({e.workload})
                                </option>
                              ))}
                            </Field>
                            <button
                              type="submit"
                              className="bg-black text-white px-3 py-1 rounded text-sm"
                              aria-label={`Assign ticket ${t.id}`}
                            >
                              Assign
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                // quick assign to first available
                                const avail = employees.find((x) => x.status === "Available");
                                if (avail) {
                                  setFieldValue("assignee", avail.id);
                                }
                              }}
                              className="text-sm px-2 py-1 bg-gray-200 rounded"
                              title="Pick first available"
                            >
                              Quick
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Auto-Assignment Rules */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Auto-Assignment Rules</h3>

              <Formik
                initialValues={{ method: rules.method, skillMatching: rules.skillMatching }}
                onSubmit={(values) => {
                  // Save rules to state
                  const newRules: AutoAssignRules = {
                    method: values.method as AutoAssignRules["method"],
                    skillMatching: values.skillMatching as AutoAssignRules["skillMatching"]
                  };
                  setRules(newRules);
                }}
              >
                {({ values }) => (
                  <Form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Assignment Method</label>
                      <Field as="select" name="method" className="w-full border rounded px-2 py-1 text-sm">
                        <option value="Round Robin">Round Robin</option>
                        <option value="Least Workload">Least Workload</option>
                        <option value="Skill Match">Skill Match</option>
                      </Field>
                    </div>

                    <div>
                      <label className="block text-xs text-gray-500 mb-1">Skill Matching</label>
                      <Field as="select" name="skillMatching" className="w-full border rounded px-2 py-1 text-sm">
                        <option value="Required">Required</option>
                        <option value="Preferred">Preferred</option>
                        <option value="Off">Off</option>
                      </Field>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="submit"
                        className="bg-black text-white px-4 py-2 rounded text-sm"
                        aria-label="Save Auto Assign Rules"
                      >
                        Save Rules
                      </button>
                      <button
                        type="button"
                        onClick={() => autoAssignAll()}
                        className="bg-indigo-600 text-white px-4 py-2 rounded text-sm"
                        aria-label="Run Auto Assign"
                      >
                        Run Rules
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;