'use client'
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

type LeadStatus = "New" | "Contacted";
type Lead = {
  id: string;
  name: string;
  email: string;
  preferredDate: string;
  eventType: string;
  mobile: string;
  receivedDate: string;
  status: LeadStatus;
};

const leadsData: Lead[] = [
  {
    id: "LD001",
    name: "Amit Patel",
    email: "amit@example.com",
    preferredDate: "15 Dec 2025",
    eventType: "Wedding",
    mobile: "+91 98765 43210",
    receivedDate: "8 Oct 2025",
    status: "New",
  },
  {
    id: "LD001",
    name: "Amit Patel",
    email: "amit@example.com",
    preferredDate: "15 Dec 2025",
    eventType: "Wedding",
    mobile: "+91 98765 43210",
    receivedDate: "8 Oct 2025",
    status: "Contacted",
  },
  {
    id: "LD001",
    name: "Amit Patel",
    email: "amit@example.com",
    preferredDate: "15 Dec 2025",
    eventType: "Wedding",
    mobile: "+91 98765 43210",
    receivedDate: "8 Oct 2025",
    status: "New",
  },
  {
    id: "LD001",
    name: "Amit Patel",
    email: "amit@example.com",
    preferredDate: "15 Dec 2025",
    eventType: "Wedding",
    mobile: "+91 98765 43210",
    receivedDate: "8 Oct 2025",
    status: "New",
  },
];

const statusBadge: Record<LeadStatus, string> = {
  New: "bg-[#7d7cd3] text-white",
  Contacted: "bg-yellow-400 text-white",
};

const EnquiryLeadManager: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(leadsData);

  // Optionally, actions can update lead status, etc.

  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#eeeff9]">
      {/* Header */}
      <header className="flex items-center justify-between bg-white px-8 py-4 border-b">
        <div />
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="font-semibold text-lg">John Doe</div>
            <div className="text-sm text-gray-500">Venue Owner</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-[#7d7cd3] flex items-center justify-center text-white font-bold text-xl">
            JD
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Enquiry & Lead Manager</h1>

        <div className="flex flex-col gap-6">
          {leads.map((lead, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-sm border p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex-1 flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-lg">{lead.name}</span>
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        statusBadge[lead.status]
                      }`}
                    >
                      {lead.status}
                    </span>
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-semibold">Lead ID:</span> {lead.id}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-semibold">Email:</span> {lead.email}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-semibold">Preferred Date:</span> {lead.preferredDate}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="text-sm mb-1">
                    <span className="font-semibold">Event Type:</span> {lead.eventType}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-semibold">Mobile:</span> {lead.mobile}
                  </div>
                  <div className="text-sm mb-1">
                    <span className="font-semibold">Received:</span> {lead.receivedDate}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 md:flex-col lg:flex-row md:gap-2">
                <button className="bg-[#7d7cd3] hover:bg-[#5b5ab7] text-white font-semibold px-5 py-2 rounded-lg transition">
                  Call
                </button>
                <button className="bg-[#7d7cd3] hover:bg-[#5b5ab7] text-white font-semibold px-5 py-2 rounded-lg transition">
                  Chat
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg transition">
                  Accept
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition">
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default EnquiryLeadManager;