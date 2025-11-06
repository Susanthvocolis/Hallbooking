'use client'
import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field, FieldProps } from "formik";

/**
 * pages/index.tsx
 *
 * Single-file Next.js + TypeScript page that implements the "Feedback & Rating" screen as a single component.
 * - Tailwind CSS classes for layout & styling (assumes Tailwind is configured in the project)
 * - Formik is used for the Code Compiler form (stdin input included) and a small filter form example
 * - All UI lives in one file per your request
 *
 * Notes:
 * - The Code Compiler is a mocked client-side runner for demo only (replace with real API if needed).
 * - This page is responsive: cards stack on narrow screens and lay out in grid on larger viewports.
 */

type Feedback = {
  id: string;
  user: string;
  ticket: string;
  rating: number; // 1..5
  comment: string;
  date: string; // ISO or simple
};

const mockFeedback: Feedback[] = [
  {
    id: "F-1001",
    user: "John Doe",
    ticket: "#1001",
    rating: 5,
    comment: "Excellent support! very helpful",
    date: "2024-04-15"
  },
  {
    id: "F-1002",
    user: "Jane Smith",
    ticket: "#1002",
    rating: 4,
    comment: "Good service, resolved quickly",
    date: "2024-04-13"
  }
];

const ratingDistribution = {
  5: { count: 145, pct: 58 },
  4: { count: 75, pct: 30 },
  3: { count: 20, pct: 8 },
  2: { count: 7, pct: 3 },
  1: { count: 3, pct: 1 }
};

const nowAverage = 4.7;
const responseRate = "94%";
const satisfactionTrend = "+0.3";

const uid = (p = "") => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}${p}`;

const StarRow: React.FC<{ rating: number }> = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.964c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.4 2.79c-.784.57-1.84-.197-1.54-1.118l1.286-3.964a1 1 0 00-.364-1.118L2.6 9.39c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.964z" />
        </svg>
      ))}
    </div>
  );
};

const ProgressBar: React.FC<{ pct: number }> = ({ pct }) => {
  return (
    <div className="w-full bg-[#efe6f7] rounded-full h-4 overflow-hidden">
      <div
        className="bg-black h-4 rounded-full transition-all"
        style={{ width: `${pct}%` }}
        aria-valuenow={pct}
      />
    </div>
  );
};

const Page: NextPage = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockFeedback);
  const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
  const [compilerRunning, setCompilerRunning] = useState(false);

  // Simulated compile/run (client-side mock)
  const simulateRun = (values: { language: string; code: string; stdin: string }) => {
    setCompilerRunning(true);
    setCompilerOutput(null);
    setTimeout(() => {
      const header = `Language: ${values.language}\n`;
      const codeLen = `Code length: ${values.code.length} chars\n`;
      const stdinEcho = `stdin: "${values.stdin}"\n`;
      const result = `Mock output: ${values.stdin ? values.stdin.split("\n").join(" | ").toUpperCase() : "NO INPUT"}\n`;
      setCompilerOutput(header + codeLen + stdinEcho + result);
      setCompilerRunning(false);
    }, 800);
  };

  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#f6eef8] p-6">
      <div className="max-w-5xl mx-auto">
        <header className="bg-white rounded-lg p-5 mb-6 shadow-sm">
          <h1 className="text-lg font-semibold">Feedback & Rating</h1>
          <p className="text-sm text-gray-500 mt-1">User satisfaction and feedback</p>
        </header>

        <main className="space-y-5">
          {/* Top summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 shadow-sm flex flex-col">
              <div className="text-xs text-gray-500">Average Rating</div>
              <div className="flex items-center gap-3 mt-2">
                <div className="text-2xl font-semibold">{nowAverage}</div>
                <div>
                  <StarRow rating={Math.round(nowAverage)} />
                  <div className="text-xs text-gray-400">Average Rating</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-xs text-gray-500">Response Rate</div>
              <div className="text-2xl font-semibold mt-2">{responseRate}</div>
              <div className="text-xs text-gray-400">Users providing feedback</div>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-xs text-gray-500">Satisfaction Trend</div>
              <div className="text-2xl font-semibold mt-2 text-green-600">{satisfactionTrend}</div>
              <div className="text-xs text-gray-400">Improvement this month</div>
            </div>
          </div>

          {/* Rating Distribution */}
          <section className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="font-semibold mb-3">User Notifications</h2>
            <div className="space-y-3">
              {([5, 4, 3, 2, 1] as const).map((r) => {
                const data = ratingDistribution[r];
                return (
                  <div key={r} className="flex items-center gap-3">
                    <div className="w-12 text-sm flex items-center gap-2">
                      <div className="font-medium">{r}</div>
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20" aria-hidden>
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.964a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.286 3.964c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.4 2.79c-.784.57-1.84-.197-1.54-1.118l1.286-3.964a1 1 0 00-.364-1.118L2.6 9.39c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.964z" />
                      </svg>
                    </div>

                    <div className="flex-1">
                      <ProgressBar pct={data.pct} />
                    </div>

                    <div className="w-20 text-right text-sm text-gray-500">
                      {data.count} ({data.pct}%)
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Recent Feedback + Code Compiler (side by side on wide screens) */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
            <section className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-3">Recent Feedback</h3>
              <div className="space-y-3">
                {feedbacks.map((f) => (
                  <div key={f.id} className="border rounded p-3 bg-[#faf7fc]">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{f.user} <span className="text-xs text-gray-400"> {f.ticket}</span></div>
                        <div className="flex items-center gap-2 mt-1">
                          <StarRow rating={f.rating} />
                          <div className="text-xs text-gray-500">{f.date}</div>
                        </div>
                      </div>
                      <div className="text-xs text-gray-500">#{f.id}</div>
                    </div>

                    <div className="mt-3 text-sm text-gray-700">{f.comment}</div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                {/* Small demo form to add feedback (uses basic inputs, not required by design but demonstrates Formik usage) */}
                <Formik
                  initialValues={{ user: "", ticket: "", rating: 5, comment: "" }}
                  onSubmit={(values, { resetForm }) => {
                    const newF: Feedback = {
                      id: uid("fb"),
                      user: values.user || "Anonymous",
                      ticket: values.ticket || "#0000",
                      rating: Number(values.rating),
                      comment: values.comment || "",
                      date: new Date().toISOString().slice(0, 10)
                    };
                    setFeedbacks((s) => [newF, ...s]);
                    resetForm();
                  }}
                >
                  {() => (
                    <Form className="grid grid-cols-1 sm:grid-cols-2 gap-2 items-end">
                      <div>
                        <Field name="user" placeholder="Name" className="w-full border rounded px-2 py-1 text-sm" />
                      </div>

                      <div>
                        <Field name="ticket" placeholder="Ticket #" className="w-full border rounded px-2 py-1 text-sm" />
                      </div>

                      <div className="sm:col-span-2">
                        <Field name="comment">
                          {({ field }: FieldProps) => (
                            <textarea {...field} placeholder="Comment" className="w-full border rounded px-2 py-1 text-sm" rows={2} />
                          )}
                        </Field>
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-500">Rating</label>
                        <Field as="select" name="rating" className="border rounded px-2 py-1 text-sm">
                          <option value={5}>5</option>
                          <option value={4}>4</option>
                          <option value={3}>3</option>
                          <option value={2}>2</option>
                          <option value={1}>1</option>
                        </Field>
                      </div>

                      <div className="sm:col-span-1">
                        <button type="submit" className="bg-black text-white px-3 py-1 rounded text-sm">
                          Add Feedback
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Page;