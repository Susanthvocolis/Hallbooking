"use client";

import React, { useState } from "react";

// ---------- Types ----------
interface User {
  id: number;
  name: string;
  type: string;
  status: "Active" | "Pending";
  location: string;
  joined: string;
  lastActive: string;
}

// ---------- Static Data (Replace this with API data later) ----------
const staticUsers: User[] = [
  {
    id: 1,
    name: "Raj Sharma",
    type: "Banquet",
    status: "Pending",
    location: "Mumbai, MH",
    joined: "2025-07-22",
    lastActive: "2025-07-22",
  },
  ...Array(6).fill({
    id: 2,
    name: "Raj Sharma",
    type: "Banquet",
    status: "Active",
    location: "Mumbai, MH",
    joined: "2025-07-22",
    lastActive: "2025-07-22",
  }),
];

const statCards = [
  {
    label: "Total Customers",
    value: "1,247",
    color: "bg-[#beb9f2]",
    trend: "+12%",
    icon: "bg-[#7067ec]",
  },
  {
    label: "Venue Owners",
    value: "1,247",
    color: "bg-[#f7c5ee]",
    trend: "+12%",
    icon: "bg-[#e146e7]",
  },
  {
    label: "Active Users",
    value: "1,247",
    color: "bg-[#c8e3fd]",
    trend: "+12%",
    icon: "bg-[#20c7f8]",
  },
  {
    label: "New Signups (30d)",
    value: "1,247",
    color: "bg-[#cafde7]",
    trend: "+12%",
    icon: "bg-[#1ef49b]",
  },
];

// ---------- Component ----------
const UserManagement: React.FC = () => {
  // ---- Future API Integration (uncomment/use this later) ----
  // const [users, setUsers] = useState<User[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   fetch("YOUR_API_ENDPOINT_HERE")
  //     .then(res => res.json())
  //     .then((data: User[]) => setUsers(data))
  //     .catch(err => setError(String(err)))
  //     .finally(() => setLoading(false));
  // }, []);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  // Use static data for now
  const users = staticUsers;

  // ---------- Layout ----------
  return (
    <div className="min-h-screen bg-[#ede6f8] p-6">
      {/* Header */}
      <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-black">User Management</h2>
        <p className="text-[#6b7282]">Manage customers and venue owners across the platform</p>
      </div>

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

      {/* Filters and Actions */}
      <div className="bg-white rounded-xl flex flex-col md:flex-row items-center gap-4 p-5 mb-6">
        <div className="flex flex-1 flex-wrap gap-2">
          <input type="text" placeholder="Search Booking ID" className="rounded border p-2 w-48"/>
          <select className="rounded border p-2 w-32">
            <option>All Status</option>
          </select>
          <select className="rounded border p-2 w-32">
            <option>All Venue</option>
          </select>
          <select className="rounded border p-2 w-32">
            <option>All Dates</option>
          </select>
          <select className="rounded border p-2 w-32">
            <option>All Cities</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="bg-[#7067ec] text-white rounded px-7 py-2 font-medium">Export</button>
          <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-7 py-2 font-medium">Send Announcement</button>
        </div>
      </div>

      {/* Filters/Columns Buttons */}
      <div className="flex justify-end gap-3 mb-2">
        <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Filters</button>
        <button className="bg-[#f4f1fa] text-[#7067ec] rounded px-5 py-2 font-medium">Columns</button>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl p-5 overflow-auto">
        <div className="mb-4 text-lg font-semibold">All Users</div>
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead>
            <tr className="text-gray-700">
              <th className="py-2 px-2">User</th>
              <th className="py-2 px-2">Type</th>
              <th className="py-2 px-2">Status</th>
              <th className="py-2 px-2">Location</th>
              <th className="py-2 px-2">Joined</th>
              <th className="py-2 px-2">Last Active</th>
              <th className="py-2 px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, idx) => (
              <tr key={idx} className="bg-[#f4f1fa] rounded-lg">
                <td className="py-2 px-2 font-medium">{u.name}</td>
                <td className="py-2 px-2">{u.type}</td>
                <td className="py-2 px-2">
                  {u.status === "Pending" ? (
                    <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">Pending</span>
                  ) : (
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Active</span>
                  )}
                </td>
                <td className="py-2 px-2">{u.location}</td>
                <td className="py-2 px-2">{u.joined}</td>
                <td className="py-2 px-2">{u.lastActive}</td>
                <td className="py-2 px-2 flex gap-2 items-center">
                  <button className="bg-green-100 text-green-700 w-7 h-7 rounded-full flex items-center justify-center text-lg">✔</button>
                  <button className="bg-red-100 text-red-700 w-7 h-7 rounded-full flex items-center justify-center text-lg">✕</button>
                  <button className="bg-blue-100 text-blue-700 w-7 h-7 rounded-full flex items-center justify-center text-lg">✉</button>
                  <button className="bg-orange-100 text-orange-700 w-7 h-7 rounded-full flex items-center justify-center text-lg">✎</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;

/*
---------------------------
API INTEGRATION GUIDE

1. Uncomment the useEffect/useState code block above and swap staticUsers for user state.
2. Replace "YOUR_API_ENDPOINT_HERE" with your real API.
3. Adjust User type and UI as per your actual backend.
4. Provide loading/error UI as needed.

When your backend is ready, this component will seamlessly render real data!
---------------------------
*/
