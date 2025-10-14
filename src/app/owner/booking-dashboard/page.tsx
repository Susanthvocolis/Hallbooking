'use client'
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

type Booking = {
  id: string;
  customer: string;
  date: string;
  time: string;
  bookingStatus: "Confirmed" | "Pending";
  paymentStatus: "Completed" | "Pending";
};

const bookingsData: Booking[] = [
  {
    id: "BK001",
    customer: "Rahul Kumar",
    date: "15 Nov 2025",
    time: "18:00",
    bookingStatus: "Confirmed",
    paymentStatus: "Completed",
  },
  {
    id: "BK002",
    customer: "Priya Sharma",
    date: "20 Nov 2025",
    time: "19:00",
    bookingStatus: "Pending",
    paymentStatus: "Pending",
  },
];

const badgeClasses = {
  Confirmed: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Completed: "bg-green-100 text-green-700",
};

const BookingDashboard: React.FC = () => {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | "Confirmed" | "Pending">("All");

  const filteredBookings = bookingsData.filter((b) => {
    const matchesSearch =
      b.customer.toLowerCase().includes(filter.toLowerCase()) ||
      b.id.toLowerCase().includes(filter.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || b.bookingStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
            {/* JD initials */}
          </div>
        </div>
      </header>

      <main className="px-6 py-8 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Booking Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-5">
          <div className="flex-1">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-[#7d7cd3]">
                <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                  <circle cx="9" cy="9" r="7" stroke="#7d7cd3" strokeWidth="2" />
                  <path d="M15 15l-3.5-3.5" stroke="#7d7cd3" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search by customer name or booking ID..."
                className="w-full pl-10 pr-2 py-2 border rounded-lg focus:ring-2 focus:ring-[#7d7cd3] focus:outline-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              className="flex items-center border rounded-lg px-4 py-2 bg-white gap-2"
              onClick={() =>
                setStatusFilter(
                  statusFilter === "All"
                    ? "Confirmed"
                    : statusFilter === "Confirmed"
                    ? "Pending"
                    : "All"
                )
              }
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <path
                  d="M4 7h12M6 11h8M9 15h2"
                  stroke="#7d7cd3"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="font-medium text-gray-600">
                {statusFilter === "All"
                  ? "All Status"
                  : statusFilter + " only"}
              </span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-[#7d7cd3] text-white">
                <th className="py-3 px-4 text-left font-medium">Booking ID</th>
                <th className="py-3 px-4 text-left font-medium">Customer Name</th>
                <th className="py-3 px-4 text-left font-medium">Event Date</th>
                <th className="py-3 px-4 text-left font-medium">Event Time</th>
                <th className="py-3 px-4 text-left font-medium">Booking Status</th>
                <th className="py-3 px-4 text-left font-medium">Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((b) => (
                <tr key={b.id} className="border-b last:border-0">
                  <td className="py-3 px-4">{b.id}</td>
                  <td className="py-3 px-4">{b.customer}</td>
                  <td className="py-3 px-4">{b.date}</td>
                  <td className="py-3 px-4">{b.time}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        badgeClasses[b.bookingStatus]
                      }`}
                    >
                      {b.bookingStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-4 py-1 rounded-full text-sm font-semibold ${
                        badgeClasses[b.paymentStatus]
                      }`}
                    >
                      {b.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-gray-400">
                    No bookings found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default BookingDashboard;