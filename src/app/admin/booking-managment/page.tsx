"use client";

import Header from "@/app/components/Header";
import ProtectedRoute from "@/app/ProtectedRoute";
import React, { useState } from "react";

// Types
interface Booking {
  id: string;
  venue: string;
  customer: string;
  eventDate: string;
  priority: string;
  amount: string;
}

const statCards = [
  {
    label: "Total Bookings",
    value: "2,247",
    color: "bg-[#beb9f2]",
    trend: "+12%",
    icon: "bg-[#7067ec]",
  },
  {
    label: "Confirmed Bookings",
    value: "1,247",
    color: "bg-[#f7c5ee]",
    trend: "+12%",
    icon: "bg-[#e146e7]",
  },
  {
    label: "Pending Approval",
    value: "1,547",
    color: "bg-[#c8e3fd]",
    trend: "+12%",
    icon: "bg-[#20c7f8]",
  },
  {
    label: "Total Revenue",
    value: "₹24.8L",
    color: "bg-[#cafde7]",
    trend: "+12%",
    icon: "bg-[#1ef49b]",
  },
];

// Static Data (replace with API integration)
const staticBookings: Booking[] = Array(8)
  .fill(0)
  .map((_, idx) => ({
    id: "ABC-12345" + (idx % 2 ? "6" : "7"),
    venue: "Lorem",
    customer: "Raj Sharma",
    eventDate: "2025-07-22",
    priority: "Lorem",
    amount: "10,000/-",
  }));

const BookingManagement: React.FC = () => {
  // ----- Future API integration -----
  // const [bookings, setBookings] = useState<Booking[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   fetch("YOUR_API_ENDPOINT_HERE")
  //     .then(res => res.json())
  //     .then((data: Booking[]) => setBookings(data))
  //     .catch(err => setError(String(err)))
  //     .finally(() => setLoading(false));
  // }, []);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  const bookings = staticBookings;

  return (
    <ProtectedRoute requiredRole={["super_admin"]}>
      <>
        <Header title="Booking Management" />
        <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#ede6f8] p-6">
          {/* Header */}
          {/* <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
          <h2 className="text-2xl font-bold mb-2 text-black">Booking Management</h2>
          <p className="text-[#6b7282]">Monitor and manage all venue bookings across the platform</p>
        </div> */}

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {statCards.map((card, i) => (
              <div
                key={i}
                className={`${card.color} flex items-center p-4 rounded-lg gap-3`}
              >
                <div className={`${card.icon} w-7 h-7 rounded-md`}></div>
                <div className="flex-1">
                  <div className="text-xl font-bold">{card.value}</div>
                  <div className="text-sm text-gray-500">{card.label}</div>
                </div>
                <span className="text-xs font-bold text-[#4d44b5]">{card.trend}</span>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          {/* <div className="bg-white rounded-xl flex flex-col md:flex-row flex-wrap gap-4 items-center px-5 py-4 mb-6">
          <button className="bg-[#7067ec] text-white rounded px-6 py-2 font-medium">Export Bookings</button>
          <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-6 py-2 font-medium">Manual Booking</button>
          <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-6 py-2 font-medium">Dispute Resolution</button>
          <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-6 py-2 font-medium">Send Notifications</button>
        </div> */}

          {/* Filters and Actions */}
          <div className="bg-white rounded-xl flex flex-col md:flex-row items-center gap-4 p-5 mb-6">
            <div className="flex flex-1 flex-wrap gap-2 self-start">
              <input type="text" placeholder="Search Status" className="rounded border p-2 w-48" />
              <select className="rounded border p-2 w-32">
                <option>All Venues</option>
              </select>
              <select className="rounded border p-2 w-32">
                <option>All Dates</option>
              </select>
              <select className="rounded border p-2 w-32">
                <option>All Cities</option>
              </select>
            </div>
            <div className="flex gap-2 self-end">
              <button className="bg-[#7067ec] text-white rounded px-7 py-2 font-medium">Export</button>
              {/* <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-7 py-2 font-medium">Send Announcement</button> */}
            </div>
          </div>

          {/* Filters/Customize Buttons */}
          {/* <div className="flex justify-end gap-3 mb-2">
          <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Filters</button>
          <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-5 py-2 font-medium">Customize</button>
        </div> */}

          {/* Bookings Table */}
          <div className="bg-white rounded-xl p-5 overflow-auto">
            <div className="mb-4 text-lg font-semibold">All Bookings</div>
            <table className="w-full text-left border-separate border-spacing-y-2">
              <thead>
                <tr className="text-gray-700">
                  <th className="py-2 px-2">Booking ID</th>
                  <th className="py-2 px-2">Venue</th>
                  <th className="py-2 px-2">Customer</th>
                  <th className="py-2 px-2">Event date</th>
                  <th className="py-2 px-2">Priority</th>
                  <th className="py-2 px-2">Amount</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, idx) => (
                  <tr key={idx} className="bg-[#f4f1fa] rounded-lg">
                    <td className="py-2 px-2 font-medium">{b.id}</td>
                    <td className="py-2 px-2">{b.venue}</td>
                    <td className="py-2 px-2">{b.customer}</td>
                    <td className="py-2 px-2">{b.eventDate}</td>
                    <td className="py-2 px-2">{b.priority}</td>
                    <td className="py-2 px-2">{b.amount}</td>
                    <td className="py-2 px-2 flex gap-2 items-center">
                      <span className="bg-green-400 w-4 h-4 rounded-full inline-block"></span>
                      <span className="bg-blue-400 w-4 h-4 rounded-full inline-block"></span>
                      <span className="bg-orange-400 w-4 h-4 rounded-full inline-block"></span>
                      <span className="bg-red-400 w-4 h-4 rounded-full inline-block"></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </>
    </ProtectedRoute>
  );
};

export default BookingManagement;
