"use client";

import Header from "@/app/components/Header";
import React, { useState } from "react";

const statCards = [
  {
    label: "Total FAQs",
    value: "47",
    color: "bg-[#FFFFFF]",
    trend: "+12",
    icon: "bg-[#7067ec]",
  },
  {
    label: "Categories",
    value: "10",
    color: "bg-[#FFFFFF]",
    trend: "+12",
    icon: "bg-[#e146e7]",
  },
  {
    label: "Most Viewed",
    value: "1,547",
    color: "bg-[#FFFFFF]",
    trend: "+12",
    icon: "bg-[#20c7f8]",
  },
  {
    label: "Added this Week",
    value: "15",
    color: "bg-[#FFFFFF]",
    trend: "+10",
    icon: "bg-[#1ef49b]",
  },
];

// Static FAQ array
const faqs = [
  "How do I book the hall?",
  "What facilities are included in the hall booking?",
  "How far in advance should I book?",
  "Can we play music or have a DJ?",
  "What are the check-in and check-out timings?",
];

const FAQManager: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <>
      <Header title="FAQ Management" />
      <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#ede6f8] p-3">
        <div className="bg-white rounded-xl">
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {statCards.map((card, i) => (
              <div key={i} className={`${card.color} flex items-center p-4 rounded-lg gap-3`}>
                <div className={`${card.icon} w-7 h-7 rounded-md`}></div>
                <div className="flex-1">
                  <div className="text-xl font-bold">{card.value}</div>
                  <div className="text-sm text-gray-500">{card.label}</div>
                </div>
                <span className="text-xs font-bold text-[#4d44b5]">{card.trend}</span>
              </div>
            ))}
          </div>

          {/* Filters row */}
          <div className="bg-white rounded-xl flex flex-col md:flex-row items-center gap-4 p-5 mb-6">
            <div className="flex flex-1 flex-wrap gap-2">
              <input
                type="text"
                placeholder="Search FAQ by Question and Answer.........."
                className="rounded border p-2 w-72"
              />
              <select className="rounded border p-2 w-36">
                <option>All Categories</option>
              </select>
              <select className="rounded border p-2 w-36">
                <option>Sort by date</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#7067ec] text-white rounded px-7 py-2 font-medium">Export</button>
              <button className="bg-[#7067ec] text-white rounded px-7 py-2 font-medium">Add FAQs</button>
            </div>
          </div>

          {/* FAQ List */}
          <div className="bg-white rounded-xl p-6">
            <div className="mb-4 text-lg font-semibold text-black">All FAQs</div>
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-[#f9fafb] rounded flex flex-col">
                  <button
                    className="text-left px-5 py-3 font-medium focus:outline-none flex justify-between items-center"
                    onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                  >
                    <span className="text-[16px] text-black">{faq}</span>
                    <span className="text-gray-400">{openIdx === idx ? "▲" : "▼"}</span>
                  </button>
                  {openIdx === idx && (
                    <div className="px-5 pb-4 text-[#6b7282] text-[15px]">
                      This is a placeholder answer for: "{faq}".
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQManager;