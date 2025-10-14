'use client'

import clsx from "clsx";
import { useFormik } from "formik";
import React from "react";
import {
  HiOutlineAdjustments,
  HiOutlineArrowDown,
  HiOutlineCalendar,
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineSpeakerphone,
  HiOutlineTicket,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineXCircle
} from "react-icons/hi";

// Dummy Data
const stats = [
  { label: "Total Venues", value: "1,247" },
  { label: "Registered Users", value: "8,989" },
  { label: "Active Bookings", value: "423" },
  { label: "Monthly Revenue", value: "₹12.4L" },
];

const analytics = [
  { label: "Confirmed", value: 75, color: "border-black", dot: "bg-black" },
  { label: "Pending", value: 20, color: "border-orange-400", dot: "bg-orange-400" },
  { label: "Cancelled", value: 10, color: "border-red-500", dot: "bg-red-500" },
  { label: "Completed", value: 5, color: "border-green-500", dot: "bg-green-500" },
];

const activities = [
  {
    icon: <HiOutlinePlus className="text-gray-500" />,
    text: (
      <>
        <span className="font-medium">New venue registered</span>
        <br />
        Royal Banquet Hall - Mumbai
      </>
    ),
  },
  {
    icon: <HiOutlineUser className="text-gray-500" />,
    text: (
      <>
        <span className="font-medium">New user signup</span>
        <br />
        Priya Sharma joined platform
      </>
    ),
  },
  {
    icon: <HiOutlineCalendar className="text-gray-500" />,
    text: (
      <>
        <span className="font-medium">Booking confirmed</span>
        <br />
        Grand Convention Center - Delhi
      </>
    ),
  },
  {
    icon: <HiOutlineTicket className="text-gray-500" />,
    text: (
      <>
        <span className="font-medium">Support ticket resolved</span>
        <br />
        Payment issue - Ticket #1234
      </>
    ),
  },
];

const venues = [
  {
    name: "Royal Banquet Hall",
    owner: "Raj Sharma",
    location: "Mumbai, MH",
    capacity: 500,
    status: "Pending",
    date: "2025-07-22",
  },
  {
    name: "Grand Palace",
    owner: "Amit Kumar",
    location: "Delhi, DL",
    capacity: 300,
    status: "Active",
    date: "2025-07-21",
  },
  {
    name: "Crystal Convention",
    owner: "Priya Singh",
    location: "Bangalore, KA",
    capacity: 750,
    status: "Active",
    date: "2025-07-20",
  },
];

// const navItems = [
//   { icon: <HiOutlineHome className="w-5 h-5" />, label: "Dashboard", active: true },
//   { icon: <HiOutlineClipboardList className="w-5 h-5" />, label: "Venue Management" },
//   { icon: <HiOutlineUserGroup className="w-5 h-5" />, label: "User Management" },
//   { icon: <HiOutlineCalendar className="w-5 h-5" />, label: "Booking Management" },
//   { icon: <HiOutlineTicket className="w-5 h-5" />, label: "Support Tickets" },
//   { icon: <HiOutlineDocumentReport className="w-5 h-5" />, label: "Content Management" },
//   { icon: <HiOutlineChartBar className="w-5 h-5" />, label: "Analytics & Report" },
//   { icon: <HiOutlineCog className="w-5 h-5" />, label: "Setting" },
// ];

// Booking Analytics Chart (SVG - semi-donut, static for now)
function BookingAnalyticsChart() {
  return (
    <div className="w-full flex justify-center">
      <svg width="120" height="120" className="mx-auto my-2">
        {/* Background ring */}
        <circle cx="60" cy="60" r="50" stroke="#E5E7EB" strokeWidth="12" fill="none" />
        {/* Confirmed - Black */}
        <circle
          cx="60"
          cy="60"
          r="50"
          stroke="#111"
          strokeWidth="12"
          fill="none"
          strokeDasharray="235"
          strokeDashoffset="60"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        {/* Pending - Orange */}
        <circle
          cx="60"
          cy="60"
          r="42"
          stroke="#F59E42"
          strokeWidth="9"
          fill="none"
          strokeDasharray="180"
          strokeDashoffset="110"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        {/* Cancelled - Red */}
        <circle
          cx="60"
          cy="60"
          r="34"
          stroke="#EF4444"
          strokeWidth="8"
          fill="none"
          strokeDasharray="120"
          strokeDashoffset="150"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
        {/* Completed - Green */}
        <circle
          cx="60"
          cy="60"
          r="26"
          stroke="#22C55E"
          strokeWidth="8"
          fill="none"
          strokeDasharray="85"
          strokeDashoffset="170"
          strokeLinecap="round"
          transform="rotate(-90 60 60)"
        />
      </svg>
    </div>
  );
}

// Dummy Formik form for sending announcements (Modal)
function AnnouncementModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const formik = useFormik({
    initialValues: { title: "", message: "" },
    onSubmit: (values) => {
      alert(`Announcement Sent:\nTitle: ${values.title}\nMessage: ${values.message}`);
      onClose();
    },
  });

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 w-full max-w-md mx-4">
        <h2 className="font-bold text-lg sm:text-xl mb-4">Send Announcement</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <div>
            <label className="block font-medium mb-1 text-sm" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </div>
          <div>
            <label className="block font-medium mb-1 text-sm" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className="w-full border border-gray-300 px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              onChange={formik.handleChange}
              value={formik.values.message}
            />
          </div>
          <div className="flex gap-2 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-black text-white hover:bg-gray-900 transition-colors text-sm"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Dashboard Component
const Dashboard: React.FC = () => {
  const [showAnnouncement, setShowAnnouncement] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="min-h-screen flex bg-[#EEE9F7]">
      {/* Content */}
      <main className="h-[100vh] overflow-y-auto scrollbar-none flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
        {/* Topbar */}
        <section className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <div className="mt-12 lg:mt-0">
            <h1 className="font-bold text-xl sm:text-2xl">Dashboard Overview</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-black text-white rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-sm sm:text-lg font-bold">
              S
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-xs sm:text-sm">Super Admin</div>
              <div className="text-xs text-gray-500 truncate">
                admin@venuegroups.com
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm px-3 sm:px-6 py-4 sm:py-5 flex flex-col items-center"
            >
              <div className="text-lg sm:text-2xl font-bold">{stat.value}</div>
              <div className="text-gray-500 text-xs sm:text-sm font-medium mt-1 text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </section>

        {/* Analytics & Activity */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 mb-6">
          {/* Booking Analytics */}
          <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col shadow-sm">
            <div className="font-bold text-base sm:text-lg mb-2">Booking Analytics</div>
            <div className="border-b mb-4" />
            <div className="flex flex-col md:flex-row items-center gap-4">
              <BookingAnalyticsChart />
              <ul className="flex-1 space-y-2 w-full">
                {analytics.map((item) => (
                  <li key={item.label} className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "inline-block w-3 h-3 rounded-full flex-shrink-0",
                        item.dot
                      )}
                    ></span>
                    <span className="font-medium text-sm">{item.label}</span>
                    <span className="ml-auto text-gray-700 font-bold text-sm">
                      {item.value}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-4 sm:p-6 flex flex-col shadow-sm">
            <div className="font-bold text-base sm:text-lg mb-2">Recent Activity</div>
            <div className="border-b mb-4" />
            <ul className="space-y-3 sm:space-y-4">
              {activities.map((a, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="mt-1 flex-shrink-0">{a.icon}</span>
                  <span className="min-w-0">{a.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <button className="bg-white rounded-xl flex items-center justify-center gap-2 px-4 sm:px-6 py-4 sm:py-5 font-semibold text-sm sm:text-lg shadow-sm hover:bg-gray-50 transition-colors">
            <HiOutlinePlus className="flex-shrink-0" />
            <span className="hidden sm:inline">Approve Venues</span>
            <span className="sm:hidden">Approve</span>
          </button>
          <button
            className="bg-white rounded-xl flex items-center justify-center gap-2 px-4 sm:px-6 py-4 sm:py-5 font-semibold text-sm sm:text-lg shadow-sm hover:bg-gray-50 transition-colors"
            onClick={() => setShowAnnouncement(true)}
          >
            <HiOutlineSpeakerphone className="flex-shrink-0" />
            <span className="hidden sm:inline">Send Announcements</span>
            <span className="sm:hidden">Announce</span>
          </button>
          <button className="bg-white rounded-xl flex items-center justify-center gap-2 px-4 sm:px-6 py-4 sm:py-5 font-semibold text-sm sm:text-lg shadow-sm hover:bg-gray-50 transition-colors">
            <HiOutlineArrowDown className="flex-shrink-0" />
            <span className="hidden sm:inline">Export Reports</span>
            <span className="sm:hidden">Export</span>
          </button>
          <button className="bg-white rounded-xl flex items-center justify-center gap-2 px-4 sm:px-6 py-4 sm:py-5 font-semibold text-sm sm:text-lg shadow-sm hover:bg-gray-50 transition-colors">
            <HiOutlineAdjustments className="flex-shrink-0" />
            <span className="hidden sm:inline">System Settings</span>
            <span className="sm:hidden">Settings</span>
          </button>
        </section>

        {/* Recent Venue Registrations */}
        <section className="bg-white rounded-xl p-4 sm:p-6 shadow-sm">
          <div className="font-bold text-base sm:text-lg mb-2">Recent Venue Registrations</div>
          <div className="border-b mb-4" />
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-xs sm:text-sm text-gray-700">
                  <th className="pb-2 font-semibold">Venue Name</th>
                  <th className="pb-2 font-semibold hidden sm:table-cell">Owner</th>
                  <th className="pb-2 font-semibold hidden md:table-cell">Location</th>
                  <th className="pb-2 font-semibold hidden lg:table-cell">Capacity</th>
                  <th className="pb-2 font-semibold">Status</th>
                  <th className="pb-2 font-semibold hidden md:table-cell">Date Added</th>
                  <th className="pb-2 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {venues.map((venue, idx) => (
                  <tr
                    key={idx}
                    className={clsx(
                      "text-xs sm:text-sm",
                      idx % 2 === 1 ? "bg-gray-50" : ""
                    )}
                  >
                    <td className="py-2">
                      <div className="font-medium">{venue.name}</div>
                      <div className="text-xs text-gray-500 sm:hidden">{venue.owner}</div>
                    </td>
                    <td className="py-2 hidden sm:table-cell">{venue.owner}</td>
                    <td className="py-2 hidden md:table-cell">{venue.location}</td>
                    <td className="py-2 hidden lg:table-cell">{venue.capacity}</td>
                    <td className="py-2">
                      <span
                        className={clsx(
                          "px-2 sm:px-3 py-1 rounded-full text-xs font-semibold",
                          venue.status === "Pending"
                            ? "bg-orange-100 text-orange-600"
                            : "bg-green-100 text-green-700"
                        )}
                      >
                        {venue.status}
                      </span>
                    </td>
                    <td className="py-2 hidden md:table-cell text-xs">{venue.date}</td>
                    <td className="py-2">
                      <div className="flex gap-1 sm:gap-2">
                        <button className="bg-green-100 p-1 rounded hover:bg-green-200 transition-colors">
                          <HiOutlineCheckCircle className="text-green-600 w-4 h-4" />
                        </button>
                        <button className="bg-red-100 p-1 rounded hover:bg-red-200 transition-colors">
                          <HiOutlineXCircle className="text-red-600 w-4 h-4" />
                        </button>
                        <button className="bg-blue-100 p-1 rounded hover:bg-blue-200 transition-colors">
                          <HiOutlineEye className="text-blue-600 w-4 h-4" />
                        </button>
                        <button className="bg-yellow-100 p-1 rounded hover:bg-yellow-200 transition-colors hidden sm:inline-block">
                          <HiOutlinePencilAlt className="text-yellow-600 w-4 h-4" />
                        </button>
                        <button className="bg-gray-100 p-1 rounded hover:bg-gray-200 transition-colors hidden sm:inline-block">
                          <HiOutlineTrash className="text-gray-500 w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <AnnouncementModal
          open={showAnnouncement}
          onClose={() => setShowAnnouncement(false)}
        />
      </main>
    </div>
  );
};

export default Dashboard;