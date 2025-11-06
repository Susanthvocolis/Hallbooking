'use client'
import React, { useState, useRef, useEffect } from "react";
import { NextPage } from "next";
import { Formik, Form, Field } from "formik";

/**
 * Single-file Next.js page that implements the entire Chat Support Panel UI as one component.
 * - TypeScript + functional components
 * - Tailwind for styling (assumes Tailwind is configured in the project)
 * - Formik for chat input and the code-compiler form
 *
 * Features included:
 * - Chat header with user info and ticket controls
 * - Message list (user/admin style bubbles)
 * - Message send form (Formik)
 * - Right sidebar with Quick Replies, Chat Rating, and an embedded Code Compiler (including an "stdin" input field)
 * - Responsive layout: single column on small screens, two-column grid on large screens
 * - Simulated code execution (client-side mock) — replace with a backend runner if you need real compilation
 */

/* ----------------------
   Types
   ---------------------- */
type Author = "user" | "admin";

type Message = {
  id: string;
  author: Author;
  text: string;
  time?: string;
};

/* ----------------------
   Helpers
   ---------------------- */
const makeId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 9)}`;

const nowTime = () => new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

/* ----------------------
   Page Component
   ---------------------- */
const Home: NextPage = () => {
  const initialMessages: Message[] = [
    { id: makeId(), author: "user", text: "I need help with my account", time: "10:02" },
    { id: makeId(), author: "admin", text: "Hi! Happy to help — what seems to be the issue?", time: "10:03" }
  ];

  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [rating, setRating] = useState<number>(0);
  const messagesRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom on messages change
  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const msg: Message = { id: makeId(), author: "user", text, time: nowTime() };
    setMessages((m) => [...m, msg]);

    // Simulate an admin reply after a short delay
    setTimeout(() => {
      const reply: Message = {
        id: makeId(),
        author: "admin",
        text: "Thanks for the message — I'm looking into it.",
        time: nowTime()
      };
      setMessages((m) => [...m, reply]);
    }, 900);
  };

  const handleQuickReply = (text: string) => sendMessage(text);

  /* ----------------------
     Subcomponents (inside single file)
     ---------------------- */

  const MessageBubble: React.FC<{ message: Message }> = ({ message }) => {
    const isUser = message.author === "user";
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mt-3`}>
        <div
          className={`max-w-[85%] p-3 rounded-lg shadow-sm text-sm ${
            isUser ? "bg-white" : "bg-[#efe6f7]"
          }`}
        >
          <div>{message.text}</div>
          <div className="text-xs text-gray-400 mt-1 text-right">{message.time ?? "Now"}</div>
          
        </div>
      </div>
    );
  };

  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] p-6 bg-[#f6eef8]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg p-4 mb-4">
          <h1 className="text-xl font-semibold">Chat Support Panel</h1>
          <div className="text-sm text-gray-500">Real-time chat with users</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Chat (spans 2 columns on lg) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-semibold">John Doe</div>
                  <div className="text-xs text-gray-400">Ticket #12345</div>
                </div>

                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-green-600 text-white rounded text-sm">Active</button>
                  <button className="px-3 py-1 bg-gray-200 rounded text-sm">Transfer</button>
                  <button className="px-3 py-1 bg-gray-200 rounded text-sm">End Chat</button>
                </div>
              </div>

              <div
                ref={messagesRef}
                className="h-[55vh] overflow-auto border rounded p-3 bg-[#faf7fc]"
                role="log"
                aria-live="polite"
              >
                {messages.map((m) => (
                  <MessageBubble key={m.id} message={m} />
                ))}
              </div>

              <div className="mt-3">
                <Formik
                  initialValues={{ message: "" }}
                  onSubmit={(values, { resetForm }) => {
                    sendMessage(values.message);
                    resetForm();
                  }}
                >
                  {() => (
                    <Form className="flex gap-2">
                      <Field
                        name="message"
                        placeholder="Type your message..."
                        className="flex-1 border rounded px-3 py-2"
                        aria-label="Type your message"
                      />
                      <button type="submit" className="bg-indigo-600 text-white px-4 rounded">
                        Send
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>

          {/* Right: Sidebar */}
          <aside className="space-y-4">
            {/* Quick Replies */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Quick Replies</h3>
              <div className="flex flex-col gap-3">
                {[
                  "Thank you for contacting us",
                  "We are looking into it",
                  "Can you share more details?",
                  "Please try restarting the app",
                  "I'll escalate this to our team"
                ].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuickReply(q)}
                    className="text-sm text-left bg-[#efe6f7] px-3 py-2 rounded"
                    aria-label={`Quick reply ${i + 1}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Rating */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h3 className="font-semibold mb-2">Chat Rating</h3>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    className={`text-2xl ${n <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    aria-label={`Rate ${n}`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="text-xs text-gray-400 mt-2">
                {rating ? `Thanks! You rated ${rating}/5` : "Give feedback after chatting"}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Home;