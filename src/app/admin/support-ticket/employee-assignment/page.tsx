'use client';
import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import Header from "@/app/components/Header";

type Employee = {
    id: string;
    name: string;
    workload: number; // number of open tickets assigned
    skills: string[]; // categories they can handle
    status: "Available" | "Busy" | "Offline";
};

type Ticket = {
    id: string;
    title?: string;
    category: string;
    priority: "High" | "Medium" | "Low";
    assignedTo?: string | null; // employee id
};

type AutoAssignRules = {
    method: "Round Robin" | "Load Balanced";
    skillMatching: "Required" | "Preferred" | "Not required";
};

const initialEmployees: Employee[] = [
    { id: "e1", name: "Sarah Johnson", workload: 1, skills: ["Catering", "Venue"], status: "Available" },
    { id: "e2", name: "Mike Chen", workload: 5, skills: ["Catering", "Venue"], status: "Busy" },
    { id: "e3", name: "Emma Wilson", workload: 2, skills: ["Catering", "Venue"], status: "Available" },
];

const initialTickets: Ticket[] = [
    { id: "#T001", category: "Catering", priority: "High" },
    { id: "#T002", category: "Catering", priority: "Medium" },
    { id: "#T003", category: "Venue", priority: "Low" },
];

export default function EmployeeAssignment() {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [tickets, setTickets] = useState<Ticket[]>(initialTickets);
    const [rules, setRules] = useState<AutoAssignRules>({ method: "Round Robin", skillMatching: "Required" });
    const [roundRobinIndex, setRoundRobinIndex] = useState<number>(0);

    // Derived lists
    const employeeMap = useMemo(() => {
        const m = new Map<string, Employee>();
        employees.forEach((e) => m.set(e.id, e));
        return m;
    }, [employees]);

    // assign a specific ticket to a given employee id
    const assignTicketTo = (ticketId: string, employeeId: string | undefined | null) => {
        if (!employeeId) return;
        setTickets((prev) => prev.map((t) => (t.id === ticketId ? { ...t, assignedTo: employeeId } : t)));
        setEmployees((prev) =>
            prev.map((e) => (e.id === employeeId ? { ...e, workload: e.workload + 1, status: "Busy" } : e))
        );
    };

    // Auto-assign a single ticket using current rules
    const autoAssignTicket = (ticket: Ticket) => {
        const available = employees.filter((e) => e.status !== "Offline");
        if (available.length === 0) {
            alert("No employees available to assign.");
            return;
        }

        const skillRequired = rules.skillMatching === "Required";
        let candidates = available;

        if (skillRequired) {
            candidates = available.filter((e) => e.skills.includes(ticket.category));
            if (candidates.length === 0) {
                // if required but none match, we can either skip or fallback; for demo fallback to all
                candidates = available;
            }
        }

        let chosen: Employee | undefined;
        if (rules.method === "Round Robin") {
            // pick next in round robin among candidates (based on the roundRobinIndex in employees order)
            const sortedCandidates = candidates.sort((a, b) => a.id.localeCompare(b.id));
            const idx = roundRobinIndex % sortedCandidates.length;
            chosen = sortedCandidates[idx];
            setRoundRobinIndex((ri) => (ri + 1) % Math.max(1, sortedCandidates.length));
        } else {
            // Load Balanced -> pick candidate with lowest workload
            chosen = candidates.reduce((best, c) => (c.workload < best.workload ? c : best), candidates[0]);
        }

        if (chosen) assignTicketTo(ticket.id, chosen.id);
    };

    // Auto assign all pending tickets (demo)
    const autoAssignAll = () => {
        tickets.forEach((t) => {
            if (!t.assignedTo) autoAssignTicket(t);
        });
    };

    // helper to render employee status pill
    const StatusPill: React.FC<{ status: Employee["status"] }> = ({ status }) => {
        const styles =
            status === "Available"
                ? "bg-black text-white"
                : status === "Busy"
                    ? "bg-red-100 text-red-700"
                    : "bg-gray-100 text-gray-700";
        return <span className={`px-3 py-1 rounded-full text-sm ${styles}`}>{status}</span>;
    };

    return (
        <>
            <Header title="Employee Assignment" />
            <div className="h-[90vh] overflow-y-auto scrollbar-none flex bg-[#EEE9F7] p-3">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Top panels: Employee List & Pending Tickets */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Employee List */}
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <h2 className="font-semibold text-lg mb-4">Employee List</h2>
                            <div className="space-y-4">
                                {employees.map((emp) => (
                                    <div key={emp.id} className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{emp.name}</div>
                                            <div className="mt-2 flex items-center gap-2">
                                                <span className="bg-gray-900 text-white rounded-full px-3 py-1 text-xs">{emp.workload} Tickets</span>
                                                {emp.skills.map((s) => (
                                                    <span key={s} className="border rounded-full px-3 py-1 text-xs text-gray-700">
                                                        {s}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                        <div>
                                            <StatusPill status={emp.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Pending Tickets */}
                        <div className="bg-white rounded-2xl p-6 shadow">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="font-semibold text-lg">Pending Tickets</h2>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={autoAssignAll}
                                        className="px-4 py-2 bg-black text-white rounded-md text-sm"
                                    >
                                        Auto-Assign All
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {tickets.map((t) => {
                                    const assignedEmployee = t.assignedTo ? employeeMap.get(t.assignedTo) : undefined;
                                    return (
                                        <div key={t.id} className="border rounded-lg p-4 flex flex-col gap-3">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <div className="font-medium">{t.id} <span className="text-sm text-gray-500">• {t.category}</span></div>
                                                    <div className="text-xs text-gray-500 mt-1">Category: <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full text-xs">{t.category}</span></div>
                                                </div>

                                                <div>
                                                    <div className={`px-3 py-1 rounded-full text-sm ${t.priority === "High" ? "bg-red-100 text-red-700" : t.priority === "Medium" ? "bg-gray-100 text-gray-700" : "bg-gray-100 text-gray-700"}`}>
                                                        {t.priority}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                {/* Formik per-ticket assign form */}
                                                <Formik
                                                    enableReinitialize
                                                    initialValues={{ assignee: assignedEmployee?.id ?? "" }}
                                                    onSubmit={(values, actions) => {
                                                        if (!values.assignee) {
                                                            alert("Select an employee to assign.");
                                                            actions.setSubmitting(false);
                                                            return;
                                                        }
                                                        assignTicketTo(t.id, values.assignee || undefined);
                                                        actions.setSubmitting(false);
                                                    }}
                                                >
                                                    {({ values, setFieldValue }) => (
                                                        <Form className="flex items-center gap-3 w-full">
                                                            <Field
                                                                as="select"
                                                                name="assignee"
                                                                value={values.assignee}
                                                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("assignee", e.target.value)}
                                                                className="flex-1 p-3 rounded-md bg-[#f3ecf8] border focus:outline-none"
                                                            >
                                                                <option value="">Assign to....</option>
                                                                {employees.map((e) => (
                                                                    <option key={e.id} value={e.id}>
                                                                        {e.name} ({e.status}) — {e.workload} tickets
                                                                    </option>
                                                                ))}
                                                            </Field>

                                                            <button
                                                                type="submit"
                                                                className="px-4 py-2 bg-black text-white rounded-md"
                                                            >
                                                                Assign
                                                            </button>
                                                        </Form>
                                                    )}
                                                </Formik>

                                                <div className="text-sm text-gray-600">
                                                    {assignedEmployee ? <div>Assigned: <span className="font-medium">{assignedEmployee.name}</span></div> : <div className="italic text-gray-400">Unassigned</div>}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Auto-Assignment Rules panel */}
                    <div className="bg-white rounded-2xl p-6 shadow">
                        <h2 className="font-semibold text-lg mb-4">Auto-Assignment Rules</h2>

                        <Formik
                            initialValues={{ method: rules.method, skillMatching: rules.skillMatching }}
                            onSubmit={(values, actions) => {
                                setRules({ method: values.method as AutoAssignRules["method"], skillMatching: values.skillMatching as AutoAssignRules["skillMatching"] });
                                actions.setSubmitting(false);
                                alert("Auto-assignment rules saved.");
                            }}
                        >
                            {({ values, setFieldValue }) => (
                                <Form className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium mb-2">Assignment Method</label>
                                        <Field as="select" name="method" className="w-full p-3 rounded-md bg-[#f3ecf8] border" onChange={(e: any) => setFieldValue("method", e.target.value)}>
                                            <option value="Round Robin">Round Robin</option>
                                            <option value="Load Balanced">Load Balanced</option>
                                        </Field>
                                    </div>

                                    <div className="md:col-span-1">
                                        <label className="block text-sm font-medium mb-2">Skill Matching</label>
                                        <Field as="select" name="skillMatching" className="w-full p-3 rounded-md bg-[#f3ecf8] border" onChange={(e: any) => setFieldValue("skillMatching", e.target.value)}>
                                            <option value="Required">Required</option>
                                            <option value="Preferred">Preferred</option>
                                            <option value="Not required">Not required</option>
                                        </Field>
                                    </div>

                                    <div className="md:col-span-1">
                                        <button type="submit" className="px-6 py-3 bg-black text-white rounded-md">Save Rules</button>
                                    </div>
                                </Form>
                            )}
                        </Formik>

                        <div className="mt-4 text-sm text-gray-500">
                            Current: Method = <span className="font-medium">{rules.method}</span> • Skill Matching = <span className="font-medium">{rules.skillMatching}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}