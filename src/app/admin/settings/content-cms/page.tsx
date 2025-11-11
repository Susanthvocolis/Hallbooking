"use client";

import React, { useMemo, useState } from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import Header from "@/app/components/Header";

type TabKey =
    | "home"
    | "static"
    | "blog"
    | "banner"
    | "push"
    | "seo"
    | "media"
    | "email"
    | "popup"
    | "feedback";

const TABS: { key: TabKey; label: string }[] = [
    { key: "home", label: "Home Page Management" },
    { key: "static", label: "Static Pages Management" },
    { key: "blog", label: "Blog/Articles" },
    { key: "banner", label: "Banner & Advertisement" },
    { key: "push", label: "Push Notification & Announcement Manager" },
    { key: "seo", label: "SEO & Metadata Control" },
    { key: "media", label: "Media Library" },
    { key: "email", label: "Email Template Management" },
    { key: "popup", label: "App & Web Pop-Up Manager" },
    { key: "feedback", label: "Feedback & Review Moderation" },
];

const pill = "rounded-full px-3 py-1 text-xs font-medium border";
const input =
    "w-full rounded-lg border border-gray-200 bg-white/80 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-400";
const label = "text-sm font-medium text-gray-700";
const card = "rounded-2xl bg-white";
const hSec = "text-lg font-semibold text-gray-900";
const btn =
    "inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50";
const ghostBtn =
    "inline-flex items-center justify-center rounded-xl border px-4 py-2 hover:bg-gray-50";

export default function ContentCMS() {
    const [tab, setTab] = useState<TabKey>("home");

    return (
        <>
            <Header title="Content & CMS Management" />
            <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#ede6f8] p-3">
                <div className="max-w-[1000px]">
                    <div className={`${card}`}>
                        <div className="[scrollbar-width:none] mb-4 p-2 flex w-full gap-2 overflow-x-auto">
                            {TABS.map((t) => (
                                <button
                                    key={t.key}
                                    onClick={() => setTab(t.key)}
                                    className={`${pill} whitespace-nowrap ${tab === t.key
                                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                            : "border-transparent bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    {t.label}
                                </button>
                            ))}
                        </div>

                        {/* ------- Tab Content ------- */}
                        {tab === "home" && <HomePage />}
                        {tab === "static" && <StaticPages />}
                        {tab === "blog" && <BlogArticles />}
                        {tab === "banner" && <BannerAds />}
                        {tab === "push" && <PushAnnouncements />}
                        {tab === "seo" && <SEOControl />}
                        {tab === "media" && <MediaLibrary />}
                        {tab === "email" && <EmailTemplates />}
                        {tab === "popup" && <PopUpManager />}
                        {tab === "feedback" && <FeedbackModeration />}
                    </div>
                </div>
            </div>
        </>
    );
}

/* ===================== SCREENS ===================== */

function HomePage() {
    return (
        <div className="space-y-6">
            <section className={`${card} p-4 sm:p-6`}>
                <h3 className={hSec}>Hero Section</h3>
                <Formik
                    initialValues={{
                        heroImage: "",
                        tagLine: "",
                        subTitle: "",
                        carousels: [
                            { title: "Carousel 1", items: ["", "", ""] },
                            { title: "Carousel 2", items: ["", "", ""] },
                        ],
                        featured: { sectionTitle: "", sectionDescription: "" },
                        ctas: {
                            leftText: "",
                            leftUrl: "",
                            rightText: "",
                            rightUrl: "",
                        },
                        schedule: { enabled: false, start: "", end: "" },
                    }}
                    onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
                >
                    {({ values }) => (
                        <Form className="space-y-6">
                            {/* Upload + Texts */}
                            <div className="grid grid-cols-1 gap-4">
                                <div>
                                    <label className={label}>Hero Image</label>
                                    <Field
                                        name="heroImage"
                                        className={input}
                                        placeholder="Upload URL or path…"
                                    />
                                </div>
                                <div>
                                    <label className={label}>Tagline</label>
                                    <Field name="tagLine" className={input} placeholder="Lorem ipsum" />
                                </div>
                                <div>
                                    <label className={label}>Subtitle</label>
                                    <Field
                                        name="subTitle"
                                        className={input}
                                        placeholder="Add a short hero subtitle"
                                    />
                                </div>
                            </div>

                            {/* Carousels */}
                            <div>
                                <div className="mb-2 flex items-center justify-between">
                                    <h4 className="font-semibold">Promotional Carousels</h4>
                                    <FieldArray name="carousels">
                                        {(helpers) => (
                                            <button
                                                type="button"
                                                className={ghostBtn}
                                                onClick={() =>
                                                    helpers.push({ title: `Carousel ${values.carousels.length + 1}`, items: ["", "", ""] })
                                                }
                                            >
                                                + Add Carousel
                                            </button>
                                        )}
                                    </FieldArray>
                                </div>

                                <FieldArray name="carousels">
                                    {(helpers) => (
                                        <div className="space-y-4">
                                            {values.carousels.map((c, idx) => (
                                                <div key={idx} className="rounded-xl border p-4">
                                                    <div className="mb-3 flex items-center justify-between">
                                                        <h5 className="font-medium">{c.title}</h5>
                                                        <button
                                                            type="button"
                                                            className="text-sm text-rose-600"
                                                            onClick={() => helpers.remove(idx)}
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                                                        {c.items.map((_, i) => (
                                                            <Field
                                                                key={i}
                                                                name={`carousels.${idx}.items.${i}`}
                                                                className={input}
                                                                placeholder={`Image/Link #${i + 1}`}
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </FieldArray>
                            </div>

                            {/* Featured */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div>
                                    <label className={label}>Featured Section Title</label>
                                    <Field
                                        name="featured.sectionTitle"
                                        className={input}
                                        placeholder="Lorem ipsum"
                                    />
                                </div>
                                <div>
                                    <label className={label}>Section Description</label>
                                    <Field
                                        name="featured.sectionDescription"
                                        className={input}
                                        placeholder="Short blurb"
                                    />
                                </div>
                            </div>

                            {/* CTAs */}
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                <div className="rounded-xl border p-3">
                                    <h5 className="mb-2 font-medium">CTA Left</h5>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <Field name="ctas.leftText" className={input} placeholder="Button text" />
                                        <Field name="ctas.leftUrl" className={input} placeholder="https://…" />
                                    </div>
                                </div>
                                <div className="rounded-xl border p-3">
                                    <h5 className="mb-2 font-medium">CTA Right</h5>
                                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <Field name="ctas.rightText" className={input} placeholder="Button text" />
                                        <Field name="ctas.rightUrl" className={input} placeholder="https://…" />
                                    </div>
                                </div>
                            </div>

                            {/* Schedule */}
                            <div className="rounded-xl border p-3">
                                <h5 className="mb-2 font-medium">Schedule Content Visibility</h5>
                                <div className="flex items-center gap-3">
                                    <Field type="checkbox" name="schedule.enabled" className="h-4 w-4" />
                                    <span className="text-sm text-gray-700">Enable scheduling</span>
                                </div>
                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Field name="schedule.start" className={input} placeholder="Start date (DD/MM/YYYY)" />
                                    <Field name="schedule.end" className={input} placeholder="End date (DD/MM/YYYY)" />
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3">
                                <button type="button" className={ghostBtn}>
                                    Cancel
                                </button>
                                <button type="submit" className={btn}>
                                    Save
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </section>
        </div>
    );
}

function StaticPages() {
    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Page Editor</h3>
            <p className="mb-4 text-sm text-gray-600">
                WYSIWYG editor for quick updates with version control
            </p>
            <Formik
                initialValues={{ title: "", content: "" }}
                onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
            >
                <Form className="space-y-4">
                    <div>
                        <label className={label}>Page Title</label>
                        <Field
                            as="select"
                            name="title"
                            className={input}
                            placeholder="Select page"
                        >
                            <option value="">Select About us/Contact us/Terms/Privacy/Refunds</option>
                            <option>About us</option>
                            <option>Contact us</option>
                            <option>Terms & Conditions</option>
                            <option>Privacy Policy</option>
                            <option>Refund & Cancellation</option>
                        </Field>
                    </div>
                    <div>
                        <label className={label}>Page Content</label>
                        <Field as="textarea" name="content" className={`${input} h-56`} placeholder="Lorem ipsum" />
                    </div>
                    <div className="flex items-center justify-end gap-3 pt-2">
                        <button type="button" className={ghostBtn}>Cancel</button>
                        <button type="submit" className={btn}>Save</button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
}

function BlogArticles() {
    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Create New Blog Post</h3>
            <Formik
                initialValues={{
                    title: "",
                    slug: "",
                    category: "",
                    author: "",
                    tags: "",
                    content: "",
                    hero: "",
                    metaTitle: "",
                    metaDesc: "",
                }}
                onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
            >
                <Form className="space-y-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className={label}>Article Title</label>
                            <Field name="title" className={input} placeholder="Lorem ipsum" />
                        </div>
                        <div>
                            <label className={label}>URL Slug</label>
                            <Field name="slug" className={input} placeholder="lorem-ipsum" />
                        </div>
                        <div>
                            <label className={label}>Category</label>
                            <Field name="category" className={input} placeholder="Lorem ipsum" />
                        </div>
                        <div>
                            <label className={label}>Author</label>
                            <Field name="author" className={input} placeholder="Lorem ipsum" />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={label}>Tags</label>
                            <Field name="tags" className={input} placeholder="tag1, tag2" />
                        </div>
                    </div>

                    <div>
                        <label className={label}>Article Content</label>
                        <Field as="textarea" name="content" className={`${input} h-48`} placeholder="Lorem ipsum" />
                    </div>

                    <div>
                        <label className={label}>Hero Image</label>
                        <Field name="hero" className={input} placeholder="Upload URL or path…" />
                    </div>

                    <div className="rounded-xl border p-4">
                        <h4 className="mb-3 font-semibold">SEO Settings</h4>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <label className={label}>Meta Title</label>
                                <Field name="metaTitle" className={input} />
                            </div>
                            <div>
                                <label className={label}>Meta Description</label>
                                <Field name="metaDesc" className={input} />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <button type="button" className={ghostBtn}>Cancel</button>
                        <button type="submit" className={btn}>Save</button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
}

function BannerAds() {
    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Create New Banner</h3>
            <Formik
                initialValues={{ name: "", type: "", position: "", url: "", audience: "", hero: "" }}
                onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
            >
                <Form className="space-y-4">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className={label}>Banner Name</label>
                            <Field name="name" className={input} />
                        </div>
                        <div>
                            <label className={label}>Banner Type</label>
                            <Field name="type" className={input} />
                        </div>
                        <div>
                            <label className={label}>Position</label>
                            <Field name="position" className={input} />
                        </div>
                        <div>
                            <label className={label}>Link URL</label>
                            <Field name="url" className={input} />
                        </div>
                        <div className="sm:col-span-2">
                            <label className={label}>Target Audience</label>
                            <Field as="select" name="audience" className={input}>
                                <option value="">Select here</option>
                                <option>All Users</option>
                                <option>Logged-in</option>
                                <option>Vendors</option>
                            </Field>
                        </div>
                        <div className="sm:col-span-2">
                            <label className={label}>Hero Image</label>
                            <Field name="hero" className={input} placeholder="Upload URL or path…" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button type="button" className={ghostBtn}>Cancel</button>
                        <button type="submit" className={btn}>Save</button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
}

function PushAnnouncements() {
    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Send New Notification</h3>
            <Formik
                initialValues={{
                    title: "",
                    sendTo: "All Users",
                    message: "",
                    type: "Special Offer Available!",
                    priority: "",
                    schedule: { enabled: false, date: "" },
                }}
                onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
            >
                {({ values }) => (
                    <Form className="space-y-6">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <div>
                                <label className={label}>Notification Title</label>
                                <Field name="title" className={input} placeholder="Special Offer Available!" />
                            </div>
                            <div>
                                <label className={label}>Send To</label>
                                <Field as="select" name="sendTo" className={input}>
                                    <option>All Users</option>
                                    <option>Only Vendors</option>
                                    <option>Only Employees</option>
                                </Field>
                            </div>
                            <div className="sm:col-span-2">
                                <label className={label}>Message</label>
                                <Field as="textarea" name="message" className={`${input} h-28`} placeholder="Enter your notification message…" />
                            </div>
                            <div>
                                <label className={label}>Notification Type</label>
                                <Field name="type" className={input} />
                            </div>
                            <div>
                                <label className={label}>Priority</label>
                                <Field as="select" name="priority" className={input}>
                                    <option value="">Select Priority</option>
                                    <option>Low</option>
                                    <option>Normal</option>
                                    <option>High</option>
                                </Field>
                            </div>
                        </div>

                        <div className="rounded-xl border p-4">
                            <div className="flex items-center gap-3">
                                <Field type="checkbox" name="schedule.enabled" className="h-4 w-4" />
                                <span className="text-sm">Schedule for later</span>
                            </div>
                            {values.schedule.enabled && (
                                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    <Field name="schedule.date" className={input} placeholder="Pick a date" />
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <button type="button" className={ghostBtn}>Save as Draft</button>
                            <button type="submit" className={btn}>Send Now</button>
                        </div>

                        {/* Templates table (static mock) */}
                        <div className="mt-6 rounded-xl border">
                            <div className="border-b p-4 font-semibold">Message Templates</div>
                            <div className="p-4">
                                <div className="no-scrollbar grid grid-cols-1 gap-3 md:grid-cols-3">
                                    {["User Templates", "Vendor Templates", "Employee Templates"].map((x) => (
                                        <div key={x} className="rounded-lg border p-3">
                                            <div className="mb-2 flex items-center justify-between">
                                                <span className="font-medium">{x}</span>
                                                <button className={pill + " border-gray-200"}>+ New Template</button>
                                            </div>
                                            <ul className="space-y-2 text-sm">
                                                <li className="flex items-center justify-between rounded border px-3 py-2">
                                                    <span>Booking Confirmation</span>
                                                    <span className={pill + " border-emerald-300 bg-emerald-50"}>Automated</span>
                                                </li>
                                                <li className="flex items-center justify-between rounded border px-3 py-2">
                                                    <span>Special Offer</span>
                                                    <span className={pill + " border-gray-300"}>Manual</span>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

function SEOControl() {
    const pages = ["Home", "Venues", "About", "Contact", "Blog"];
    const [pageIdx, setPageIdx] = useState(0);

    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Page SEO Settings</h3>
            <div className="mt-3 mb-4 flex flex-wrap gap-2">
                {pages.map((p, i) => (
                    <button
                        key={p}
                        onClick={() => setPageIdx(i)}
                        className={`${pill} ${i === pageIdx ? "border-indigo-500 bg-indigo-50 text-indigo-700" : "border-gray-200"
                            }`}
                    >
                        {p}
                    </button>
                ))}
            </div>

            <Formik
                initialValues={{
                    slug: "/",
                    metaTitle: "",
                    metaDesc: "",
                    metaKeywords: "",
                    ogTitle: "",
                    ogDesc: "",
                    ogImage: "",
                }}
                onSubmit={(v) => alert(`Saved SEO for ${pages[pageIdx]}\n` + JSON.stringify(v, null, 2))}
            >
                <Form className="space-y-4">
                    <div>
                        <label className={label}>Page URL Slug</label>
                        <Field name="slug" className={input} />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div>
                            <label className={label}>Meta Title</label>
                            <Field name="metaTitle" className={input} />
                        </div>
                        <div>
                            <label className={label}>Meta Description</label>
                            <Field name="metaDesc" className={input} />
                        </div>
                    </div>
                    <div>
                        <label className={label}>Meta Keywords</label>
                        <Field name="metaKeywords" className={input} />
                    </div>
                    <div className="rounded-xl border p-4">
                        <h4 className="mb-3 font-semibold">Open Graph Tags (Social Media)</h4>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Field name="ogTitle" className={input} placeholder="OG title" />
                            <Field name="ogDesc" className={input} placeholder="OG description" />
                            <Field name="ogImage" className={`${input} sm:col-span-2`} placeholder="https://example.com/og-image.jpg" />
                        </div>
                    </div>
                    <div className="flex items-center justify-end">
                        <button type="submit" className={btn}>Save Settings</button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
}

function MediaLibrary() {
    const files = useMemo(
        () =>
            Array.from({ length: 6 }).map((_, i) => ({
                name: `Banner - image - ${i + 1}.jpg`,
                size: "1.2 MB",
                kind: i % 2 ? "Banners" : "Blog Images",
                thumb:
                    "https://images.unsplash.com/photo-1520975922284-7b19c0b86d3a?q=80&w=600&auto=format&fit=crop",
            })),
        []
    );
    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>File Management</h3>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <select className={input + " max-w-[220px]"} defaultValue="">
                    <option value="">Filter by type</option>
                    <option>All Files</option>
                    <option>Banners</option>
                    <option>Blog Images</option>
                    <option>Venue photos</option>
                    <option>Documents</option>
                </select>
                <button className={btn}>+ Add New File</button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {files.map((f) => (
                    <div key={f.name} className="overflow-hidden rounded-xl border">
                        <img src={f.thumb} alt={f.name} className="h-40 w-full object-cover" />
                        <div className="p-3">
                            <div className="font-medium">{f.name}</div>
                            <div className="text-xs text-gray-500">{f.size}</div>
                            <div className="mt-3 flex gap-2">
                                <button className={pill + " border-gray-200"}>Preview</button>
                                <button className={pill + " border-gray-200"}>Replace</button>
                                <button className={pill + " border-gray-200"}>Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

function EmailTemplates() {
    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Email Templates</h3>
            <div className="mb-3 flex flex-wrap gap-2">
                {["Booking Confirmation", "Cancellation Notice", "Vendor Onboarding", "Subscription Renewal"].map(
                    (x, i) => (
                        <button key={x} className={`${pill} ${i === 0 ? "border-indigo-500 bg-indigo-50" : "border-gray-200"}`}>
                            {x}
                        </button>
                    )
                )}
            </div>
            <Formik
                initialValues={{ subject: "Booking Confirmation - (Booking ID)", body: "" }}
                onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
            >
                <Form className="space-y-4">
                    <div>
                        <label className={label}>Email Subject</label>
                        <Field name="subject" className={input} />
                    </div>
                    <div>
                        <label className={label}>Email Body</label>
                        <Field as="textarea" name="body" className={`${input} h-48`} />
                    </div>
                    <div className="rounded-xl border p-4 text-sm">
                        <div className="font-semibold mb-2">Available Placeholders:</div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                                "{Customer Name}",
                                "{Booking ID}",
                                "{Venue Name}",
                                "{Event Date}",
                                "{Total Amount}",
                                "{Contact Email}",
                            ].map((p) => (
                                <span key={p} className={`${pill} border-gray-200`}>{p}</span>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button type="button" className={ghostBtn}>Cancel</button>
                        <button type="submit" className={btn}>Save</button>
                    </div>
                </Form>
            </Formik>
        </section>
    );
}

function PopUpManager() {
    const rows = [
        { title: "Dasara Special", type: "Promotion", trigger: "Page load", platform: "Mobile only", expiry: "30/11/2025" },
        { title: "New Year Special", type: "Announcement", trigger: "First login", platform: "Web & Mobile", expiry: "05/01/2026" },
    ];

    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Create New pop-UP</h3>
            <Formik
                initialValues={{
                    title: "",
                    popType: "",
                    message: "",
                    ctaText: "",
                    ctaUrl: "",
                    trigger: "",
                    expiry: "",
                    duration: "",
                    frequency: "",
                }}
                onSubmit={(v) => alert(JSON.stringify(v, null, 2))}
            >
                <Form className="space-y-6">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <Field name="title" className={input} placeholder="Pop-up Title" />
                        <Field as="select" name="popType" className={input}>
                            <option value="">Pop-UP Type</option>
                            <option>Promotion</option>
                            <option>Announcement</option>
                            <option>Survey</option>
                        </Field>
                        <div className="sm:col-span-2">
                            <Field as="textarea" name="message" className={`${input} h-28`} placeholder="Message" />
                        </div>
                        <Field name="ctaText" className={input} placeholder="call-to-Action Button Text" />
                        <Field name="ctaUrl" className={input} placeholder="CTA Link URL" />
                        <Field as="select" name="trigger" className={input}>
                            <option value="">Trigger Condition</option>
                            <option>Page load</option>
                            <option>First login</option>
                            <option>After purchase</option>
                        </Field>
                        <Field name="expiry" className={input} placeholder="Expiry Date (DD/MM/YYYY)" />
                        <Field name="duration" className={input} placeholder="Display Duration (sec)" />
                        <Field as="select" name="frequency" className={input}>
                            <option value="">Show frequency</option>
                            <option>Once</option>
                            <option>Daily</option>
                            <option>Every visit</option>
                        </Field>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                        <button type="button" className={ghostBtn}>Cancel</button>
                        <button type="submit" className={btn}>Save</button>
                    </div>
                </Form>
            </Formik>

            <div className="mt-6 rounded-xl border">
                <div className="border-b p-4 font-semibold">Active pop-Ups</div>
                <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                        <thead>
                            <tr className="border-b bg-gray-50">
                                {["Title", "Type", "Trigger", "Platform", "Expiry", "Actions"].map((h) => (
                                    <th key={h} className="px-4 py-2 font-medium text-gray-600">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((r) => (
                                <tr key={r.title} className="border-b">
                                    <td className="px-4 py-2">{r.title}</td>
                                    <td className="px-4 py-2">{r.type}</td>
                                    <td className="px-4 py-2">{r.trigger}</td>
                                    <td className="px-4 py-2">{r.platform}</td>
                                    <td className="px-4 py-2">{r.expiry}</td>
                                    <td className="px-4 py-2">
                                        <div className="flex gap-2">
                                            <button className={pill + " border-gray-200"}>Edit</button>
                                            <button className={pill + " border-gray-200"}>Remove</button>
                                            <button className={pill + " border-yellow-300 bg-yellow-50"}>Feature</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

function FeedbackModeration() {
    const stats = [
        { label: "Total Reviews", value: "1,234" },
        { label: "Pending", value: "45" },
        { label: "Featured", value: "23" },
        { label: "Flagged", value: "8" },
    ];
    const rows = Array.from({ length: 6 }).map((_, i) => ({
        user: "Jhon",
        venue: "Grand Ballroom hall",
        rating: 5,
        review: "Excellent place for Occations",
        date: i ? "2 days ago" : "Today",
        status: "Pending",
    }));

    return (
        <section className={`${card} p-4 sm:p-6`}>
            <h3 className={hSec}>Feedback & Review Moderation</h3>
            <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((s) => (
                    <div key={s.label} className="rounded-xl border p-3 text-center">
                        <div className="text-2xl font-bold">{s.value}</div>
                        <div className="text-xs text-gray-600">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
                <select className={input + " max-w-[160px]"}>
                    <option>All Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                </select>
                <select className={input + " max-w-[160px]"}>
                    <option>All Ratings</option>
                    <option>5 ★</option>
                    <option>4 ★</option>
                    <option>3 ★</option>
                    <option>2 ★</option>
                    <option>1 ★</option>
                </select>
            </div>

            <div className="mt-4 overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead>
                        <tr className="border-b bg-gray-50">
                            {["User Name", "Venue / Service", "Rating", "Review", "Date", "Status", "Actions"].map(
                                (h) => (
                                    <th key={h} className="px-4 py-2 font-medium text-gray-600">
                                        {h}
                                    </th>
                                )
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, idx) => (
                            <tr key={idx} className="border-b">
                                <td className="px-4 py-2">{r.user}</td>
                                <td className="px-4 py-2">{r.venue}</td>
                                <td className="px-4 py-2">{Array.from({ length: r.rating }).map((_, i) => "★").join("")}</td>
                                <td className="px-4 py-2">{r.review}</td>
                                <td className="px-4 py-2">{r.date}</td>
                                <td className="px-4 py-2">{r.status}</td>
                                <td className="px-4 py-2">
                                    <div className="flex gap-2">
                                        <button className={pill + " border-emerald-300 bg-emerald-50"}>Approve</button>
                                        <button className={pill + " border-rose-300 bg-rose-50"}>Reject</button>
                                        <button className={pill + " border-yellow-300 bg-yellow-50"}>Feature</button>
                                        <button className={pill + " border-gray-300"}>Flag</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}
