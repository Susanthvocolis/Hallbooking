'use client'
import React, { useState, useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Head from "next/head";
import Header from "@/app/components/Header";

type Message = {
    id: string;
    author: "customer" | "agent";
    authorName: string;
    text: string;
    time: string;
    variant?: "info" | "primary";
};

type TimelineItem = {
    id: string;
    title: string;
    subtitle?: string;
    time: string;
};

export default function SupportTicketDetails() {
    // Demo ticket data (replace with API data)
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "m1",
            author: "customer",
            authorName: "Raj Sharma",
            text: "Hi, I'm having issues with my venue booking. The payment went through but I haven't received confirmation.",
            time: "10:12 AM, 12 Nov 2025",
            variant: "info",
        },
        {
            id: "m2",
            author: "agent",
            authorName: "Support Agent",
            text: "Thanks for reporting — I'm checking with payments team. I'll update you shortly.",
            time: "10:20 AM, 12 Nov 2025",
            variant: "primary",
        },
    ]);

    const [internalNotes, setInternalNotes] = useState<string[]>([
        "Customer claims payment went through but booking is pending.",
    ]);

    const [timeline, setTimeline] = useState<TimelineItem[]>([
        { id: "t1", title: "Ticket Created", subtitle: "Ticket #ABC-123456", time: "10:05 AM, 12 Nov 2025" },
        { id: "t2", title: "Assigned to Support Agent", time: "10:08 AM, 12 Nov 2025" },
        { id: "t3", title: "Status Updated to Active", time: "10:10 AM, 12 Nov 2025" },
    ]);

    const [status, setStatus] = useState<string>("Pending");
    const [assignee, setAssignee] = useState<string>("Unassigned");
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [attachmentName, setAttachmentName] = useState<string | null>("booking-screenshot.png");

    // Helper to add a message (agent reply)
    const handleSendMessage = (text: string) => {
        if (!text.trim()) return;
        const newMsg: Message = {
            id: "m" + (messages.length + 1),
            author: "agent",
            authorName: "Support Agent",
            text,
            time: new Date().toLocaleString("en-GB", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short", year: "numeric" }),
            variant: "primary",
        };
        setMessages((m) => [...m, newMsg]);
        // update timeline
        setTimeline((t) => [{ id: `t-msg-${newMsg.id}`, title: `Agent replied`, time: newMsg.time }, ...t]);
    };

    // Validation schema for internal notes form
    const noteSchema = Yup.object({
        note: Yup.string().required("Please add a note"),
    });

    // Validation schema for code compiler input
    const codeSchema = Yup.object({
        codeInput: Yup.string().required("Enter input for the compiler"),
    });

    return (
        <>
        <Header title="Ticket Details View" />
            <div className="h-[90vh] overflow-y-auto scrollbar-none flex bg-[#EEE9F7] p-3">
                <div className="max-w-6xl mx-auto space-y-6">
                    {/* Ticket Details */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="md:col-span-2 space-y-4">
                                <div className="border rounded-md p-4">
                                    <h3 className="font-semibold mb-2">User Information</h3>
                                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                                        <div><span className="font-medium">Name</span><div>Raj Sharma</div></div>
                                        <div><span className="font-medium">Email</span><div>raj.sharma@email.com</div></div>
                                        <div><span className="font-medium">Phone</span><div>+91 98765 43210</div></div>
                                        <div><span className="font-medium">Created</span><div>10:05 AM, 12 Nov 2025</div></div>
                                    </div>
                                </div>

                                <div className="border rounded-md p-4">
                                    <h3 className="font-semibold mb-2">Issue Details</h3>
                                    <div className="text-sm text-gray-700 mb-3">
                                        <div className="mb-2"><span className="font-medium">Category:</span> Payment Issue</div>
                                        <div className="mb-2"><span className="font-medium">Description:</span> I made a payment for booking but haven't received confirmation. The amount was deducted from my account but the booking status shows pending.</div>
                                    </div>

                                    <div>
                                        <div className="font-medium text-sm mb-1">Attachments</div>
                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-md w-full">
                                                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none"><path d="M12 16V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /><path d="M8 12l4-4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                                <div className="text-sm text-gray-700 truncate">{attachmentName}</div>
                                                <button
                                                    onClick={() => { setAttachmentName(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                                                    className="ml-auto text-xs text-indigo-600"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                            <input ref={fileInputRef} type="file" accept="image/*,application/pdf" className="hidden" onChange={(e) => {
                                                const f = e.target.files?.[0]; if (f) setAttachmentName(f.name);
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Right column: status controls & timeline */}
                            <div className="space-y-4">
                                <div className="border rounded-md p-4">
                                    <h3 className="font-semibold mb-3">Manage Ticket</h3>
                                    <div className="space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Status</label>
                                            <select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                                className="w-full border rounded-md p-2 bg-white"
                                            >
                                                <option>Pending</option>
                                                <option>Active</option>
                                                <option>Resolved</option>
                                                <option>Closed</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Assign to</label>
                                            <select
                                                value={assignee}
                                                onChange={(e) => setAssignee(e.target.value)}
                                                className="w-full border rounded-md p-2 bg-white"
                                            >
                                                <option>Unassigned</option>
                                                <option>Agent - Priya</option>
                                                <option>Agent - Rahul</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-2 pt-1">
                                            <button
                                                onClick={() => {
                                                    setTimeline((t) => [{ id: `t-${Date.now()}`, title: `Status changed to ${status}`, time: new Date().toLocaleString() }, ...t]);
                                                    alert("Status updated (demo)");
                                                }}
                                                className="px-3 py-2 bg-indigo-600 text-white rounded"
                                            >
                                                Change Status
                                            </button>
                                            <button
                                                onClick={() => {
                                                    alert("Ticket closed (demo)");
                                                    setStatus("Closed");
                                                    setTimeline((t) => [{ id: `t-close-${Date.now()}`, title: `Ticket closed`, time: new Date().toLocaleString() }, ...t]);
                                                }}
                                                className="px-3 py-2 border rounded"
                                            >
                                                Close Ticket
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="border rounded-md p-4">
                                    <h3 className="font-semibold mb-3">Timeline</h3>
                                    <ul className="space-y-3 text-sm text-gray-700">
                                        {timeline.map((t) => (
                                            <li key={t.id} className="flex items-start gap-3">
                                                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xs">{/* icon */}⦿</div>
                                                <div>
                                                    <div className="font-medium">{t.title}</div>
                                                    {t.subtitle && <div className="text-xs text-gray-500">{t.subtitle}</div>}
                                                    <div className="text-xs text-gray-400">{t.time}</div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Conversation History */}
                        <div className="mt-6">
                            <h3 className="font-semibold mb-3">Conversation History</h3>
                            <div className="space-y-4">
                                {messages.map((m) => (
                                    <div
                                        key={m.id}
                                        className={`max-w-3xl ${m.author === "customer" ? "self-start" : "ml-auto"} `}
                                    >
                                        <div className={`${m.author === "customer" ? "bg-white border" : "bg-indigo-600 text-white"} rounded-lg p-4`}>
                                            <div className="flex items-center justify-between">
                                                <div className="text-sm font-medium">{m.authorName}</div>
                                                <div className={`text-xs ${m.author === "customer" ? "text-gray-400" : "text-indigo-100"}`}>{m.time}</div>
                                            </div>
                                            <div className="mt-2 text-sm">{m.text}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* quick reply form */}
                            <div className="mt-4">
                                <Formik
                                    initialValues={{ reply: "" }}
                                    onSubmit={(values, actions) => {
                                        handleSendMessage(values.reply);
                                        actions.setSubmitting(false);
                                        actions.resetForm();
                                    }}
                                >
                                    {({ isSubmitting }) => (
                                        <Form className="flex items-start gap-3">
                                            <Field as="textarea" name="reply" rows={2} placeholder="Write a reply..." className="flex-1 border rounded-md p-3" />
                                            <div className="flex flex-col gap-2">
                                                <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">Send</button>
                                                <button type="button" onClick={() => { const ta = document.querySelector('textarea[name="reply"]') as HTMLTextAreaElement | null; if (ta) ta.value = ""; }} className="px-4 py-2 border rounded">Clear</button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </div>

                        {/* Internal Notes */}
                        <div className="mt-6 bg-white rounded-md p-4">
                            <h3 className="font-semibold mb-3">Internal Notes</h3>
                            <ul className="space-y-2 mb-4">
                                {internalNotes.map((n, idx) => (
                                    <li key={idx} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{n}</li>
                                ))}
                            </ul>

                            <Formik
                                initialValues={{ note: "" }}
                                validationSchema={noteSchema}
                                onSubmit={(values, actions) => {
                                    setInternalNotes((prev) => [values.note, ...prev]);
                                    actions.setSubmitting(false);
                                    actions.resetForm();
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form className="space-y-3">
                                        <Field as="textarea" name="note" rows={3} placeholder="Add internal notes for support team..." className="w-full border rounded-md p-3" />
                                        <ErrorMessage name="note" component="div" className="text-xs text-red-500" />
                                        <div className="flex items-center gap-3">
                                            <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-indigo-600 text-white rounded">Add Note</button>
                                            <button type="button" onClick={() => { const ta = document.querySelector('textarea[name="note"]') as HTMLTextAreaElement | null; if (ta) ta.value = ""; }} className="px-3 py-2 border rounded">Clear</button>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}