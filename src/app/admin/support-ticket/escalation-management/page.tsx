'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "@/app/components/Header";

type EscalationRules = {
    unresolvedDurationHours: number | "";
    escalateTo: string;
    autoEscalatePriority: "High and Above" | "Medium and Above" | "All";
    notifyByEmail: boolean;
    notifyBySMS: boolean;
};

type EscalationLevel = {
    id: string;
    level: number;
    title: string;
    description?: string;
    slaWindow: string; // e.g., "0-24h"
};

type EscalatedTicket = {
    id: string;
    summary: string;
    priority: "High" | "Medium" | "Low" | "Critical";
    currentLevel: number;
    ageHours: number;
};

const sampleLevels: EscalationLevel[] = [
    { id: "l1", level: 1, title: "Level 1: Support Team", description: "Initial ticket handling", slaWindow: "0-24h" },
    { id: "l2", level: 2, title: "Level 2: Senior Admin", description: "Complex issues and escalations", slaWindow: "24-48h" },
    { id: "l3", level: 3, title: "Level 3: Management", description: "Critical issues and SLA breaches", slaWindow: "48h+" },
];

const sampleEmployees = [
    { id: "e1", name: "Support Agent" },
    { id: "e2", name: "Senior Admin" },
    { id: "e3", name: "Operations Manager" },
];

const sampleEscalated: EscalatedTicket[] = [
    { id: "#T015", summary: "Payment not processed but charged", priority: "Critical", currentLevel: 2, ageHours: 20 },
    { id: "#T023", summary: "Booking not confirmed", priority: "High", currentLevel: 1, ageHours: 12 },
];

const rulesInitial: EscalationRules = {
    unresolvedDurationHours: 24,
    escalateTo: sampleEmployees[1].id,
    autoEscalatePriority: "High and Above",
    notifyByEmail: true,
    notifyBySMS: false,
};

const rulesSchema = Yup.object({
    unresolvedDurationHours: Yup.number().min(1).required("Required"),
    escalateTo: Yup.string().required("Select an escalation target"),
    autoEscalatePriority: Yup.string().required(),
    notifyByEmail: Yup.boolean(),
    notifyBySMS: Yup.boolean(),
});

export default function EscalationManagement() {
    const [rules, setRules] = useState<EscalationRules>(rulesInitial);
    const [levels] = useState<EscalationLevel[]>(sampleLevels);
    const [escalated, setEscalated] = useState<EscalatedTicket[]>(sampleEscalated);
    const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
    const [running, setRunning] = useState<boolean>(false);

    const saveRules = (vals: EscalationRules) => {
        setRules(vals);
    };

    const resolveTicket = (ticketId: string) => {
        setEscalated((prev) => prev.filter((t) => t.id !== ticketId));
    };

    const escalateFurther = (ticketId: string) => {
        setEscalated((prev) =>
            prev.map((t) =>
                t.id === ticketId ? { ...t, currentLevel: Math.min(t.currentLevel + 1, levels.length) } : t
            )
        );
    };

    const reassignTicket = (ticketId: string, toEmployeeId: string) => {
        // demo: mark as reassign action by appending summary
        setEscalated((prev) =>
            prev.map((t) => (t.id === ticketId ? { ...t, summary: `${t.summary} (reassigned to ${toEmployeeId})` } : t))
        );
    };

    return (
        <>
            <Header title="Escalation Management" />
            <div className="h-[90vh] overflow-y-auto scrollbar-none flex bg-[#EEE9F7] p-3">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* KPI cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                            <div className="text-sm text-gray-500">Active Escalations</div>
                            <div className="text-2xl font-bold mt-2">{escalated.length}</div>
                            <div className="text-xs text-gray-400 mt-1">Requiring immediate attention</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                            <div className="text-sm text-gray-500">Avg Escalation Time</div>
                            <div className="text-2xl font-bold mt-2">22h</div>
                            <div className="text-xs text-gray-400 mt-1">Before resolution</div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow flex flex-col">
                            <div className="text-sm text-gray-500">SLA Breaches</div>
                            <div className="text-2xl font-bold mt-2">3</div>
                            <div className="text-xs text-gray-400 mt-1">This week</div>
                        </div>
                    </div>

                    {/* Escalation Rules Form */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <h2 className="font-semibold mb-4">Escalation Rules</h2>
                        <Formik
                            initialValues={rules}
                            validationSchema={rulesSchema}
                            onSubmit={(values, actions) => {
                                saveRules(values);
                                actions.setSubmitting(false);
                            }}
                        >
                            {({ values, setFieldValue, isSubmitting }) => (
                                <Form className="space-y-4">
                                    {/* Time-based */}
                                    <div className="border rounded p-4 space-y-3">
                                        <div className="font-medium">Time-based Escalation</div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Unresolved Duration (hours)</label>
                                                <Field
                                                    type="number"
                                                    name="unresolvedDurationHours"
                                                    min={1}
                                                    className="w-full p-2 rounded border"
                                                />
                                                <ErrorMessage name="unresolvedDurationHours" component="div" className="text-xs text-red-500" />
                                            </div>

                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Escalate To</label>
                                                <Field as="select" name="escalateTo" className="w-full p-2 rounded border" value={values.escalateTo}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("escalateTo", e.target.value)}
                                                >
                                                    {sampleEmployees.map((emp) => (
                                                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                                                    ))}
                                                </Field>
                                                <ErrorMessage name="escalateTo" component="div" className="text-xs text-red-500" />
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                <div>When a ticket remains unresolved for the configured duration, it will be escalated automatically.</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Priority-based */}
                                    <div className="border rounded p-4 space-y-3">
                                        <div className="font-medium">Priority-based Escalation</div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            <div>
                                                <label className="block text-sm text-gray-600 mb-1">Auto-escalate priority tickets</label>
                                                <Field as="select" name="autoEscalatePriority" className="w-full p-2 rounded border" value={values.autoEscalatePriority}
                                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("autoEscalatePriority", e.target.value)}
                                                >
                                                    <option value="High and Above">High and Above</option>
                                                    <option value="Medium and Above">Medium and Above</option>
                                                    <option value="All">All</option>
                                                </Field>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" checked={values.notifyByEmail} onChange={() => setFieldValue("notifyByEmail", !values.notifyByEmail)} />
                                                    <span className="text-sm">Send email alert</span>
                                                </label>
                                                <label className="flex items-center gap-2">
                                                    <input type="checkbox" checked={values.notifyBySMS} onChange={() => setFieldValue("notifyBySMS", !values.notifyBySMS)} />
                                                    <span className="text-sm">Send SMS notification</span>
                                                </label>
                                            </div>

                                            <div className="text-sm text-gray-500">
                                                Choose which priority levels are auto-escalated and whether notifications are sent.
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-black text-white rounded">Save Rules</button>
                                        <div className="text-sm text-gray-500">Current rules saved locally in this demo</div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>

                    {/* Escalation Chain */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <h2 className="font-semibold mb-4">Escalation Chain</h2>
                        <div className="space-y-3">
                            {levels.map((lvl) => (
                                <div key={lvl.id} className="flex items-center justify-between border rounded p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-semibold">{`L${lvl.level}`}</div>
                                        <div>
                                            <div className="font-medium">{lvl.title}</div>
                                            {lvl.description && <div className="text-sm text-gray-500">{lvl.description}</div>}
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-500">{lvl.slaWindow}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Currently Escalated Tickets */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <h2 className="font-semibold mb-4">Currently Escalated Tickets</h2>
                        <div className="space-y-4">
                            {escalated.length === 0 && <div className="text-sm text-gray-500">No escalated tickets at the moment.</div>}
                            {escalated.map((t) => (
                                <div key={t.id} className="border rounded p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="flex items-center gap-3">
                                                <div className={`px-3 py-1 rounded-full text-sm ${t.priority === "Critical" ? "bg-red-100 text-red-700" : t.priority === "High" ? "bg-pink-100 text-pink-700" : "bg-gray-100 text-gray-700"}`}>{t.priority}</div>
                                                <div className="font-medium">{t.id} <span className="text-sm text-gray-500 ml-2">{t.summary}</span></div>
                                            </div>
                                            <div className="text-xs text-gray-400 mt-2">Level {t.currentLevel} • Age: {t.ageHours}h</div>
                                        </div>

                                        <div className="flex flex-col items-end gap-2">
                                            <div className="text-sm text-gray-500">Actions</div>
                                            <div className="flex gap-2">
                                                <button onClick={() => resolveTicket(t.id)} className="px-3 py-1 rounded bg-green-600 text-white text-sm">Resolve</button>
                                                <button onClick={() => escalateFurther(t.id)} className="px-3 py-1 rounded bg-yellow-100 text-yellow-800 text-sm">Escalate Further</button>

                                                <div className="flex items-center gap-2">
                                                    <select onChange={(e) => reassignTicket(t.id, e.target.value)} className="p-2 border rounded text-sm">
                                                        <option value="">Reassign...</option>
                                                        {sampleEmployees.map((emp) => <option key={emp.id} value={emp.name}>{emp.name}</option>)}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}