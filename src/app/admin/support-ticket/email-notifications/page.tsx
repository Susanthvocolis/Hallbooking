"use client";

import React from "react";
import { Formik, Form, Field } from "formik";

/** ---------- UI Helpers ---------- */
const card = "rounded-2xl border bg-white shadow-sm";
const label = "text-sm font-medium text-gray-800";
const input =
  "w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400";
const btnPrimary =
  "inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50";
const btnGhost =
  "inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50";
const pill =
  "rounded-full px-3 py-1 text-xs font-medium border border-gray-200";

/** ---------- Types ---------- */
type Notice = {
  key: string;
  title: string;
  subtitle?: string;
};

type FormShape = {
  // compiler
  compiler: { language: string; stdin: string; code: string };

  // switches
  user: Record<string, boolean>;
  employee: Record<string, boolean>;
  admin: Record<string, boolean>;

  // push settings
  push: { endpoint: string; apiKey: string };
};

/** ---------- Data from the mockup ---------- */
const USER_NOTICES: Notice[] = [
  { key: "u_create_1", title: "Ticket Creation Confirmation", subtitle: "Send email on new ticket" },
  { key: "u_create_2", title: "Ticket Creation Confirmation", subtitle: "Send SMS on new ticket" },
  { key: "u_create_3", title: "Ticket Creation Confirmation", subtitle: "In-app alert on new ticket" },
  { key: "u_update", title: "Ticket Creation Confirmation", subtitle: "Notify updates on created ticket" },
  { key: "u_close", title: "Ticket Creation Confirmation", subtitle: "Send email when a ticket is closed" },
];

const EMP_NOTICES: Notice[] = [
  { key: "e_assign", title: "New Ticket Assignment", subtitle: "Alert when ticket gets assigned" },
  { key: "e_priority", title: "Ticket Priority Change", subtitle: "Notify when priority is updated" },
  { key: "e_summary", title: "Daily Summary", subtitle: "Send daily workload summary" },
];

const ADMIN_NOTICES: Notice[] = [
  { key: "a_escalation", title: "Escalation Alerts", subtitle: "Notify on escalations" },
  { key: "a_highprio", title: "High Priority Tickets", subtitle: "Alert on high-priority tickets" },
  { key: "a_sla", title: "SLA Breach Warning", subtitle: "Alert when ticket nears SLA deadline" },
];

/** ---------- Toggle UI ---------- */
const Toggle: React.FC<{
  name: string;
  disabled?: boolean;
}> = ({ name, disabled }) => (
  <Field name={name} type="checkbox">
    {({ field }) => (
      <button
        type="button"
        aria-pressed={field.value}
        onClick={() => !disabled && field.onChange({ target: { name, value: !field.value } })}
        className={[
          "relative inline-flex h-6 w-11 items-center rounded-full transition",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer",
          field.value ? "bg-indigo-600" : "bg-gray-300",
        ].join(" ")}
      >
        <span
          className={[
            "inline-block h-5 w-5 transform rounded-full bg-white transition",
            field.value ? "translate-x-5" : "translate-x-1",
          ].join(" ")}
        />
      </button>
    )}
  </Field>
);

/** ---------- The Screen Component ---------- */
export default function SupportTicketNotifications() {
  const initial: FormShape = {
    compiler: { language: "typescript", stdin: "", code: "" },

    user: USER_NOTICES.reduce((a, n) => ({ ...a, [n.key]: true }), {}),
    employee: EMP_NOTICES.reduce((a, n) => ({ ...a, [n.key]: n.key !== "e_summary" })), // daily summary off by default
    admin: ADMIN_NOTICES.reduce((a, n) => ({ ...a, [n.key]: true }), {}),

    push: {
      endpoint: "https://api.example.com/push",
      apiKey: "",
    },
  };

  return (
    <div className="mx-auto max-w-[1100px] p-4 sm:p-6">
      {/* Header */}
      <div className={`${card} mb-5 p-5 border-violet-200`}>
        <h1 className="text-2xl font-bold">Support Tickets – Email & Notifications</h1>
        <p className="mt-1 text-sm text-gray-600">
          Lorem ipsum dlot slit consectetur lorem ipsum lorem ipsum
        </p>
      </div>

      <Formik<FormShape>
        initialValues={initial}
        onSubmit={(values) => {
          // Replace with your API call(s)
          alert("Submitting settings:\n" + JSON.stringify(values, null, 2));
        }}
      >
        {({ values }) => (
          <Form className="space-y-6">
            {/* ------------ User Notifications ------------ */}
            <Section
              title="User Notifications"
              items={USER_NOTICES}
              path="user"
            />

            {/* ------------ Employee Notifications ------------ */}
            <Section
              title="Employee Notifications"
              items={EMP_NOTICES}
              path="employee"
              // Example: keep "Daily Summary" disabled if no employee notices are active.
              getDisabled={(itemKey) =>
                itemKey === "e_summary" &&
                Object.entries(values.employee)
                  .filter(([k]) => k !== "e_summary")
                  .every(([_, v]) => !v)
              }
            />

            {/* ------------ Admin Notifications ------------ */}
            <Section title="Admin Notifications" items={ADMIN_NOTICES} path="admin" />

            {/* ------------ Push Notification Settings ------------ */}
            <section className={`${card} p-5`}>
              <h3 className="text-lg font-semibold">Push Notification Settings</h3>
              <div className="mt-4 grid grid-cols-1 gap-4">
                <div>
                  <label className={label}>Push Notification Endpoint</label>
                  <Field
                    name="push.endpoint"
                    className={input}
                    placeholder="https://api.example.com/push"
                  />
                </div>
                <div>
                  <label className={label}>API Key</label>
                  <Field name="push.apiKey" className={input} placeholder="Enter API Key" />
                </div>
              </div>

              <div className="mt-5 flex justify-center">
                <button type="submit" className={btnPrimary}>
                  Save Settings
                </button>
              </div>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
}

/** ---------- Section component to render toggle lists ---------- */
const Section: React.FC<{
  title: string;
  items: Notice[];
  path: "user" | "employee" | "admin";
  getDisabled?: (key: string) => boolean;
}> = ({ title, items, path, getDisabled }) => {
  return (
    <section className={`${card} p-5`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 space-y-4">
        {items.map((n) => {
          const name = `${path}.${n.key}`;
          const disabled = getDisabled?.(n.key) ?? false;
          return (
            <div
              key={n.key}
              className="flex items-start justify-between gap-6 rounded-xl border p-4"
            >
              <div>
                <div className="font-medium">{n.title}</div>
                {n.subtitle && (
                  <div className="text-xs text-gray-500">{n.subtitle}</div>
                )}
              </div>
              <Toggle name={name} disabled={disabled} />
            </div>
          );
        })}
      </div>
    </section>
  );
};
