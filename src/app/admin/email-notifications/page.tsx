'use client'
import React, { useState } from "react";
import type { NextPage } from "next";
import { Formik, Form, Field, FieldProps } from "formik";

/**
 * Single-file Next.js + TypeScript page that implements the "Email & Notification Management" UI
 * as one component. Uses Tailwind CSS for styling and Formik for all forms.
 *
 * - One main Formik form for notification toggles + push settings (persisted to local state in this demo)
 * - One Formik form for a demo Code Compiler (includes an "Input (stdin)" field as requested)
 * - Responsive layout replicating the card sections in the provided design
 *
 * Drop this file into pages/index.tsx of a Next.js + TypeScript project with Tailwind configured.
 */

type SettingsFormValues = {
  // User notifications
  user_ticket_confirmation: boolean;
  user_ticket_creation: boolean;
  user_other: boolean;

  // Employee notifications
  employee_new_assignment: boolean;
  employee_priority_change: boolean;
  employee_daily_summary: boolean;

  // Admin notifications
  admin_escalation_alerts: boolean;
  admin_high_priority: boolean;
  admin_sla_breach: boolean;

  // Push settings
  push_endpoint: string;
  push_api_key: string;
};

type CompilerFormValues = {
  language: string;
  code: string;
  stdin: string;
};

const ToggleSwitch: React.FC<{
  name: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
  desc?: string;
}> = ({ checked, onChange, label, desc }) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        {label && <div className="text-sm font-medium">{label}</div>}
        {desc && <div className="text-xs text-gray-500 mt-0.5">{desc}</div>}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 rounded-full transition-colors focus:outline-none ${
          checked ? "bg-black border-black" : "bg-white border-gray-300"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white transform transition-transform ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

const Home: NextPage = () => {
  const [savedAt, setSavedAt] = useState<string | null>(null);

  const initialSettings: SettingsFormValues = {
    user_ticket_confirmation: true,
    user_ticket_creation: false,
    user_other: false,

    employee_new_assignment: true,
    employee_priority_change: false,
    employee_daily_summary: false,

    admin_escalation_alerts: true,
    admin_high_priority: true,
    admin_sla_breach: false,

    push_endpoint: "https://api.example.com/push",
    push_api_key: ""
  };

  const initialCompiler: CompilerFormValues = {
    language: "javascript",
    code: "// example code\nconsole.log('Hello')",
    stdin: ""
  };

  const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
  const [compilerRunning, setCompilerRunning] = useState(false);

  const simulateRun = (values: CompilerFormValues) => {
    setCompilerRunning(true);
    setCompilerOutput(null);
    // mock run
    setTimeout(() => {
      const header = `Language: ${values.language}\n`;
      const codeEcho = `Code length: ${values.code.length} chars\n`;
      const stdinEcho = `stdin: "${values.stdin}"\n`;
      const result = `Mock output: ${values.stdin ? values.stdin.toUpperCase() : "NO INPUT"}\n`;
      setCompilerOutput(header + codeEcho + stdinEcho + result);
      setCompilerRunning(false);
    }, 800);
  };

  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#f6eef8] p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <header className="bg-white rounded-lg p-5 mb-6 shadow-sm">
          <h1 className="text-lg font-semibold">Email & Notification Management</h1>
          <p className="text-sm text-gray-500 mt-1">Configure notification settings</p>
        </header>

        <Formik
          initialValues={initialSettings}
          onSubmit={(values, { setSubmitting }) => {
            // in a real app, send to server; here we persist to local state/time
            setTimeout(() => {
              setSavedAt(new Date().toLocaleString());
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, setFieldValue, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="space-y-5">
              {/* User Notifications */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold mb-2">User Notifications</h2>
                <div className="space-y-3">
                  <div>
                    <ToggleSwitch
                      name="user_ticket_confirmation"
                      checked={values.user_ticket_confirmation}
                      onChange={(v) => setFieldValue("user_ticket_confirmation", v)}
                      label="Ticket Creation Confirmation"
                      desc="Send email to user when ticket is created."
                    />
                  </div>

                  <div>
                    <ToggleSwitch
                      name="user_ticket_creation"
                      checked={values.user_ticket_creation}
                      onChange={(v) => setFieldValue("user_ticket_creation", v)}
                      label="Ticket Creation Notification"
                      desc="Notify user of ticket updates and changes."
                    />
                  </div>

                  <div>
                    <ToggleSwitch
                      name="user_other"
                      checked={values.user_other}
                      onChange={(v) => setFieldValue("user_other", v)}
                      label="Other user notifications"
                      desc="Miscellaneous user notification toggles."
                    />
                  </div>
                </div>
              </section>

              {/* Employee Notifications */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold mb-2">Employee Notifications</h2>
                <div className="space-y-3">
                  <div>
                    <ToggleSwitch
                      name="employee_new_assignment"
                      checked={values.employee_new_assignment}
                      onChange={(v) => setFieldValue("employee_new_assignment", v)}
                      label="New Ticket Assignment"
                      desc="Notify employee when a ticket is assigned."
                    />
                  </div>

                  <div>
                    <ToggleSwitch
                      name="employee_priority_change"
                      checked={values.employee_priority_change}
                      onChange={(v) => setFieldValue("employee_priority_change", v)}
                      label="Ticket Priority Change"
                      desc="Notify employee on priority changes."
                    />
                  </div>

                  <div>
                    <ToggleSwitch
                      name="employee_daily_summary"
                      checked={values.employee_daily_summary}
                      onChange={(v) => setFieldValue("employee_daily_summary", v)}
                      label="Daily Summary"
                      desc="Send daily summary to employees."
                    />
                  </div>
                </div>
              </section>

              {/* Admin Notifications */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold mb-2">Admin Notifications</h2>
                <div className="space-y-3">
                  <div>
                    <ToggleSwitch
                      name="admin_escalation_alerts"
                      checked={values.admin_escalation_alerts}
                      onChange={(v) => setFieldValue("admin_escalation_alerts", v)}
                      label="Escalation Alerts"
                      desc="Alert admins when issues escalate."
                    />
                  </div>

                  <div>
                    <ToggleSwitch
                      name="admin_high_priority"
                      checked={values.admin_high_priority}
                      onChange={(v) => setFieldValue("admin_high_priority", v)}
                      label="High Priority Tickets"
                      desc="Notify admin on new high priority tickets."
                    />
                  </div>

                  <div>
                    <ToggleSwitch
                      name="admin_sla_breach"
                      checked={values.admin_sla_breach}
                      onChange={(v) => setFieldValue("admin_sla_breach", v)}
                      label="SLA Breach Warning"
                      desc="Warn admin when SLA is at risk of breach."
                    />
                  </div>
                </div>
              </section>

              {/* Push Notification Settings */}
              <section className="bg-white rounded-lg p-4 shadow-sm">
                <h2 className="font-semibold mb-3">Push Notification Settings</h2>
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Push Notification Endpoint</label>
                    <Field name="push_endpoint">
                      {({ field }: FieldProps) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="https://api.example.com/push"
                          className="w-full bg-[#faf7fc] border rounded px-3 py-2 text-sm"
                        />
                      )}
                    </Field>
                  </div>

                  <div>
                    <label className="block text-xs text-gray-500 mb-1">API Key</label>
                    <Field name="push_api_key">
                      {({ field }: FieldProps) => (
                        <input
                          {...field}
                          type="text"
                          placeholder="Enter API key"
                          className="w-full bg-[#faf7fc] border rounded px-3 py-2 text-sm"
                        />
                      )}
                    </Field>
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-black text-white px-4 py-2 rounded text-sm"
                    >
                      {isSubmitting ? "Saving..." : "Save Settings"}
                    </button>

                    {savedAt && (
                      <div className="text-xs text-gray-500">Last saved: <span className="font-medium">{savedAt}</span></div>
                    )}
                  </div>
                </div>
              </section>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Home;