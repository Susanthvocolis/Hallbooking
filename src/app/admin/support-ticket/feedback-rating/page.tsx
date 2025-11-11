'use client';
import React, { useMemo, useState } from "react";
import { Formik, Form, Field } from "formik";
import Header from "@/app/components/Header";

type Feedback = {
    id: string;
    name: string;
    ticket: string;
    rating: number; // 1-5
    text: string;
    date: string; // ISO or friendly
};

const sampleFeedback: Feedback[] = [
    {
        id: "FB001",
        name: "John Doe",
        ticket: "#T001",
        rating: 5,
        text: "Excellent support! Very helpful",
        date: "2024-01-15",
    },
    {
        id: "FB002",
        name: "John Doe",
        ticket: "#T002",
        rating: 4,
        text: "Good service, resolved quickly",
        date: "2024-01-15",
    },
];

const Star: React.FC<{ filled?: boolean }> = ({ filled }) => (
    <svg
        className={`inline-block w-4 h-4 ${filled ? "text-yellow-400" : "text-gray-300"}`}
        viewBox="0 0 20 20"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth="1"
        aria-hidden
    >
        <path d="M10 1.5l2.6 5.3L18.5 8l-4 3.9.9 5.1L10 13.9 4.6 17l.9-5.1L1.5 8l5.9-.2L10 1.5z" />
    </svg>
);

export default function SupportFeedback() {
    const [feedback] = useState<Feedback[]>(sampleFeedback);
    const [search, setSearch] = useState("");
    const [compilerOutput, setCompilerOutput] = useState<string | null>(null);
    const [running, setRunning] = useState(false);

    // computed metrics
    const stats = useMemo(() => {
        const total = feedback.length;
        const ratingSum = feedback.reduce((s, f) => s + f.rating, 0);
        const avg = total ? ratingSum / total : 0;
        // Fake responseRate and trend for demo
        const responseRate = 94;
        const trend = +0.3;
        const distribution = [0, 0, 0, 0, 0]; // index 0 => 1-star
        feedback.forEach((f) => {
            if (f.rating >= 1 && f.rating <= 5) distribution[f.rating - 1] += 1;
        });
        return { total, avg, responseRate, trend, distribution };
    }, [feedback]);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return feedback;
        return feedback.filter(
            (f) =>
                f.name.toLowerCase().includes(q) ||
                f.ticket.toLowerCase().includes(q) ||
                f.text.toLowerCase().includes(q)
        );
    }, [feedback, search]);

    const maxCount = Math.max(...stats.distribution, 1);

    return (
        <>
            <Header title="Feedback & rating" />
            <div className="h-[90vh] overflow-y-auto scrollbar-none bg-[#EEE9F7] p-3">
                <div className="max-w-5xl mx-auto space-y-6">
                    {/* Header */}
                    <header className="bg-white rounded-xl p-6 shadow">
                        <h1 className="text-xl font-semibold">Support Tickets - Feedback & rating</h1>
                        <p className="text-sm text-gray-500 mt-1">Overview of ratings, response rate and recent user feedback</p>
                    </header>

                    {/* KPI Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white rounded-lg p-4 shadow flex flex-col">
                            <div className="text-sm text-gray-500">Average Rating</div>
                            <div className="mt-2 flex items-center gap-3">
                                <div className="text-2xl font-bold">{stats.avg.toFixed(1)}</div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} filled={i < Math.round(stats.avg)} />
                                    ))}
                                </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">Average Rating</div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow flex flex-col">
                            <div className="text-sm text-gray-500">Response Rate</div>
                            <div className="mt-2 text-2xl font-bold">{stats.responseRate}%</div>
                            <div className="text-xs text-gray-400 mt-1">Users providing feedback</div>
                        </div>

                        <div className="bg-white rounded-lg p-4 shadow flex flex-col">
                            <div className="text-sm text-gray-500">Satisfaction Trend</div>
                            <div className="mt-2 text-2xl font-bold text-green-600">+{stats.trend}</div>
                            <div className="text-xs text-gray-400 mt-1">Improvement this month</div>
                        </div>
                    </div>

                    {/* Rating Distribution */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <h3 className="font-semibold mb-4">User Notifications</h3>
                        <div className="space-y-3">
                            {Array.from({ length: 5 }).map((_, idx) => {
                                const star = 5 - idx; // show 5..1
                                const count = stats.distribution[star - 1] ?? 0;
                                const pct = Math.round((count / maxCount) * 100);
                                return (
                                    <div key={star} className="flex items-center gap-3">
                                        <div className="w-12 text-sm flex items-center gap-2">
                                            <span className="font-medium">{star}</span>
                                            <Star filled />
                                        </div>
                                        <div className="flex-1 h-5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-5 bg-black rounded-full"
                                                style={{ width: `${pct}%`, minWidth: count ? "6px" : "0" }}
                                            />
                                        </div>
                                        <div className="w-20 text-right text-sm text-gray-500">{count} ({Math.round((count / (stats.total || 1)) * 100)}%)</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Feedback + search */}
                    <div className="bg-white rounded-xl p-6 shadow">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold">Recent Feedback</h3>
                            <div className="flex items-center gap-2">
                                <input
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name, ticket or text..."
                                    className="border rounded-md px-3 py-2 text-sm w-64 bg-gray-50"
                                />
                                <button onClick={() => setSearch("")} className="px-3 py-2 bg-gray-100 rounded text-sm">
                                    Clear
                                </button>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {filtered.length === 0 && <div className="text-sm text-gray-500">No feedback found.</div>}
                            {filtered.map((fb) => (
                                <div key={fb.id} className="border rounded-md p-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <div className="font-medium">{fb.name} <span className="text-sm text-gray-400 ml-2">{fb.ticket}</span></div>
                                            <div className="mt-2">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star key={i} filled={i < fb.rating} />
                                                ))}
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-400">{fb.date}</div>
                                    </div>
                                    <div className="text-sm text-gray-700 mt-3">{fb.text}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}