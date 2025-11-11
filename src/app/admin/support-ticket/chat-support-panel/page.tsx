'use client';
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import Header from "@/app/components/Header";

type Message = {
  id: string;
  author: "user" | "agent";
  text: string;
  time: string;
};

type Chat = {
  id: string;
  employeeName: string;
  ticket: string;
  issueType: string;
  status: "Active" | "Resolved" | "Pending";
  messages: Message[];
  startedAt: string;
  lastUpdatedAt: string;
};

const sampleChats: Chat[] = [
  {
    id: "chat-1",
    employeeName: "Raghava Chary",
    ticket: "TK-12345",
    issueType: "Payment",
    status: "Active",
    startedAt: "11/06/2025, 11:00am",
    lastUpdatedAt: "11/06/2025, 12:05pm",
    messages: [
      { id: "m1", author: "user", text: "Hi, I'm having issues with my venue booking. The payment went through but I haven't received confirmation.", time: "10:12 AM" },
      { id: "m2", author: "agent", text: "Sure, it's BK-789456. I'll check and update you.", time: "10:15 AM" },
    ],
  },
  {
    id: "chat-2",
    employeeName: "Raj Sharma",
    ticket: "TK-54321",
    issueType: "Booking",
    status: "Pending",
    startedAt: "10/25/2025, 09:30am",
    lastUpdatedAt: "10/25/2025, 10:10am",
    messages: [
      { id: "m1", author: "user", text: "I need help with my venue booking", time: "09:30 AM" },
      { id: "m2", author: "agent", text: "Hello, I'd be happy to help. What seems to be the issue?", time: "09:32 AM" },
    ],
  },
];

export default function SupportChatPanel() {
  const [chats, setChats] = useState<Chat[]>(sampleChats);
  const [activeChatId, setActiveChatId] = useState<string>(chats[0].id);
  const [quickReplies] = useState<string[]>([
    "Thank you for contacting us",
    "We are checking this for you",
    "Could you share your booking ID?",
    "Payment has been verified, please check",
  ]);
  const [rating, setRating] = useState<number | null>(null);

  const activeChat = chats.find((c) => c.id === activeChatId) ?? chats[0];

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const newMsg: Message = {
      id: `m-${Date.now()}`,
      author: "agent",
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, newMsg], lastUpdatedAt: new Date().toLocaleString() } : c
      )
    );
  };

  const handleSelectChat = (id: string) => {
    setActiveChatId(id);
  };

  return (
    <>
      <Header title="Chat support Panel"/>
    <div className="h-[90vh] overflow-y-auto scrollbar-none flex bg-[#EEE9F7] p-3">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* <header className="bg-white rounded-xl p-6 shadow flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">Support Tickets - Chat support Panel</h1>
            <p className="text-sm text-gray-500">Quickly respond to customer chats and track conversation history</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-600">Agent: John Doe</div>
            <div className="px-3 py-1 rounded-full bg-indigo-900 text-white text-xs">Active</div>
            <div className="px-3 py-1 rounded-full bg-white border text-xs">Escalate</div>
            <div className="px-3 py-1 rounded-full bg-white border text-xs">Mark Resolved</div>
          </div>
        </header> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Active chat conversation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-medium">{activeChat.employeeName}</div>
                  <div className="text-xs text-gray-500">Ticket {activeChat.ticket} • {activeChat.issueType}</div>
                </div>
                <div className="text-xs text-gray-500">Last updated: {activeChat.lastUpdatedAt}</div>
              </div>

              <div className="space-y-3 max-h-[46vh] overflow-y-auto pr-2">
                {activeChat.messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex ${m.author === "agent" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`${m.author === "agent" ? "bg-indigo-600 text-white" : "bg-white border"} rounded-lg p-3 max-w-[75%]`}>
                      <div className="text-sm">{m.text}</div>
                      <div className={`text-xs mt-2 ${m.author === "agent" ? "text-indigo-100" : "text-gray-400"}`}>{m.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 border rounded-lg p-3 bg-white flex items-center gap-3">
                <button className="p-2 rounded bg-gray-50 border" title="Call" aria-label="call">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6.6 10.2a15.05 15.05 0 006.2 6.2l2.1-2.1a1 1 0 011.1-.2c1.2.5 2.5.8 3.8.8a1 1 0 011 1v3.1a1 1 0 01-1 1C10.2 22 2 13.8 2 3a1 1 0 011-1h3.1a1 1 0 011 1c0 1.3.3 2.6.8 3.8a1 1 0 01-.2 1.1L6.6 10.2z" fill="#6b7280"/></svg>
                </button>
                <button className="p-2 rounded bg-gray-50 border" title="Attach" aria-label="attach">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 8v10a4 4 0 01-4 4H7a4 4 0 01-4-4V8" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </button>

                <Formik
                  initialValues={{ message: "" }}
                  onSubmit={(values, { resetForm }) => {
                    sendMessage(values.message);
                    resetForm();
                  }}
                >
                  {() => (
                    <Form className="flex-1 flex items-center gap-3">
                      <Field
                        name="message"
                        placeholder="Type your message..."
                        className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none"
                      />
                      <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M22 2L11 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M22 2l-7 20  -3-9-9-3 19-8z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>

            {/* Last Chats */}
            <div className="bg-white rounded-xl p-4 shadow">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold">Last Chats</h3>
                <button className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">View More Chats</button>
              </div>

              <div className="space-y-4">
                {chats.map((c) => (
                  <div key={c.id} className="border rounded p-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-medium">{c.employeeName}</div>
                        <div className="text-xs text-gray-500">{c.ticket} • {c.issueType}</div>
                        <div className="text-xs text-gray-400 mt-1">Start: {c.startedAt} • Last: {c.lastUpdatedAt}</div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className={`${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"} px-2 py-1 rounded-full text-xs`}>{c.status}</div>
                        <button onClick={() => handleSelectChat(c.id)} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded text-sm">Chat Now</button>
                      </div>
                    </div>
                    <div className="mt-3 text-sm text-gray-600">Conversation History</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column: Quick Replies, Rating, Code Input */}
          <aside className="space-y-4">
            <div className="bg-white rounded-xl p-4 shadow">
              <h4 className="font-semibold mb-3">Quick Replies</h4>
              <div className="space-y-2">
                {quickReplies.map((qr, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(qr)}
                    className="w-full text-left bg-indigo-50 text-indigo-700 px-3 py-2 rounded text-sm"
                  >
                    {qr}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow text-center">
              <h4 className="font-semibold mb-2">Chat Rating</h4>
              <div className="flex items-center justify-center gap-1">
                {[1,2,3,4,5].map((s) => (
                  <button
                    key={s}
                    onClick={() => setRating(s)}
                    className={`p-2 rounded ${rating && rating >= s ? "bg-yellow-400 text-white" : "bg-gray-100 text-gray-400"}`}
                    aria-label={`rate ${s}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-500 mt-2">User feedback after closing</div>
            </div>
          </aside>
        </div>
      </div>
    </div>
    </>
  );
}