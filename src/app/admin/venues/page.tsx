"use client";
import React, { useState } from "react";
import { useFormik } from "formik";
import {
  HiOutlineHome,
  HiOutlineClipboardList,
  HiOutlineUserGroup,
  HiOutlineCalendar,
  HiOutlineTicket,
  HiOutlineDocumentReport,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineStar,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
  HiOutlineXCircle,
} from "react-icons/hi";
import clsx from "clsx";

// Dummy Data
const navItems = [
  { icon: <HiOutlineHome className="w-5 h-5" />, label: "Dashboard" },
  { icon: <HiOutlineClipboardList className="w-5 h-5" />, label: "Venue Management", active: true },
  { icon: <HiOutlineUserGroup className="w-5 h-5" />, label: "User Management" },
  { icon: <HiOutlineCalendar className="w-5 h-5" />, label: "Booking Management" },
  { icon: <HiOutlineTicket className="w-5 h-5" />, label: "Support Tickets" },
  { icon: <HiOutlineDocumentReport className="w-5 h-5" />, label: "Content Management" },
  { icon: <HiOutlineChartBar className="w-5 h-5" />, label: "Analytics & Report" },
  { icon: <HiOutlineCog className="w-5 h-5" />, label: "Setting" },
];

const stats = [
  { label: "Total Venues", value: "1,247", icon: <HiOutlineHome />, color: "bg-white" },
  { label: "Pending Approval", value: "43", icon: <HiOutlineClock />, color: "bg-white" },
  { label: "Active Venues", value: "1,247", icon: <HiOutlineCheckCircle />, color: "bg-white" },
  { label: "Premium Listed", value: "234", icon: <HiOutlineStar />, color: "bg-white" },
  { label: "Suspended", value: "27", icon: <HiOutlineClock />, color: "bg-white" },
  { label: "Rejected", value: "22", icon: <HiOutlineXCircle />, color: "bg-white" },
];

const venues = [
  {
    name: "Royal Banquet Hall",
    owner: "Sharma",
    location: "Mumbai, MH",
    guests: 500,
    status: "Pending",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    amenities: ["AC", "Parking", "Catering", "WiFi"],
  },
  {
    name: "Paradise Farmhouse",
    owner: "Varma",
    location: "Hyderabad, TG",
    guests: 100,
    status: "Active",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    amenities: ["AC", "Parking", "BBQ", "Pool"],
  },
  {
    name: "Royal Banquet Hall",
    owner: "Sharma",
    location: "Mumbai, MH",
    guests: 500,
    status: "Active",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    amenities: ["AC", "Parking", "Catering", "WiFi"],
  },
];

// Filter options
const statusOptions = [
  { value: "", label: "All Status" },
  { value: "Pending", label: "Pending" },
  { value: "Active", label: "Active" },
  { value: "Suspended", label: "Suspended" },
  { value: "Rejected", label: "Rejected" },
];

const locationOptions = [
  { value: "", label: "All Cities" },
  { value: "Mumbai, MH", label: "Mumbai, MH" },
  { value: "Hyderabad, TG", label: "Hyderabad, TG" },
];

const typeOptions = [
  { value: "", label: "All Types" },
  { value: "Banquet", label: "Banquet" },
  { value: "Farmhouse", label: "Farmhouse" },
];

const capacityOptions = [
  { value: "", label: "Any Capacity" },
  { value: "1-100", label: "1-100" },
  { value: "101-500", label: "101-500" },
  { value: "501+", label: "501+" },
];

// Venue Card
function VenueCard({
  venue,
}: {
  venue: typeof venues[0];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm w-full max-w-xs flex flex-col overflow-hidden border border-gray-100">
      <div className="relative">
        <img
          src={venue.image}
          alt={venue.name}
          className="h-32 w-full object-cover"
        />
        <span
          className={clsx(
            "absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold drop-shadow",
            venue.status === "Pending"
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-700"
          )}
        >
          {venue.status}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="font-bold text-[17px]">{venue.name}</div>
        <div className="text-xs text-gray-500">{venue.location}</div>
        <div className="flex items-center gap-1 text-xs mt-1 mb-2">
          <span className="font-semibold text-gray-900">By {venue.owner}</span>
          <span className="text-gray-400">&bull;</span>
          <span>{venue.guests} Guests</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {venue.amenities.map((a) => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="flex gap-2 mt-auto">
          {venue.status === "Pending" && (
            <>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs hover:bg-green-200">
                Approve
              </button>
              <button className="bg-red-100 text-red-800 px-3 py-1 rounded font-semibold text-xs hover:bg-red-200">
                Reject
              </button>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-xs hover:bg-blue-200">
                View
              </button>
            </>
          )}
          {venue.status === "Active" && (
            <>
              <button className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs hover:bg-green-200">
                Approve
              </button>
              <button className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded font-semibold text-xs hover:bg-yellow-200">
                Edit
              </button>
              <button className="bg-gray-100 text-gray-800 px-3 py-1 rounded font-semibold text-xs hover:bg-gray-200">
                Suspend
              </button>
              <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-xs hover:bg-blue-200">
                View
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Main Component
const VenueManagement: React.FC = () => {
  const [filteredVenues, setFilteredVenues] = useState(venues);

  const formik = useFormik({
    initialValues: {
      search: "",
      status: "",
      location: "",
      type: "",
      capacity: "",
      date: "",
    },
    onSubmit: (values) => {
      // Simple filtering logic for demo
      let filtered = venues.filter((v) => {
        let matches =
          (!values.search ||
            v.name.toLowerCase().includes(values.search.toLowerCase()) ||
            v.owner.toLowerCase().includes(values.search.toLowerCase())) &&
          (!values.status || v.status === values.status) &&
          (!values.location || v.location === values.location) &&
          (!values.type || (v.name.toLowerCase().includes(values.type.toLowerCase()) || v.amenities.includes(values.type))) &&
          (!values.capacity ||
            (values.capacity === "1-100" && v.guests <= 100) ||
            (values.capacity === "101-500" && v.guests > 100 && v.guests <= 500) ||
            (values.capacity === "501+" && v.guests > 500));
        return matches;
      });
      setFilteredVenues(filtered);
    },
  });

  const resetFilters = () => {
    formik.resetForm();
    setFilteredVenues(venues);
  };

  return (
    <div className="min-h-screen flex bg-[#EEE9F7]">
     
      {/* Content */}
      <main className="h-[100vh] overflow-y-auto scrollbar-none flex-1 p-4 sm:p-6 lg:p-8 lg:ml-0">
        {/* Breadcrumbs + Title */}
        <section className="mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h1 className="font-bold text-2xl">Venue Management</h1>
            <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
              <HiOutlineHome className="w-4 h-4" />
              <span>Dashboard</span>
              <span>&gt;</span>
              <span className="text-black font-medium">Venue Management</span>
            </div>
          </div>
        </section>

        {/* Filter/Search */}
        <section className="mb-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-4">Filter & Search Venues</h2>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <input
                  name="search"
                  type="text"
                  value={formik.values.search}
                  onChange={formik.handleChange}
                  placeholder="Search by Venue Name Owner Name"
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                />
                <select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                >
                  {statusOptions.map((s) => (
                    <option value={s.value} key={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
                <select
                  name="location"
                  value={formik.values.location}
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                >
                  {locationOptions.map((l) => (
                    <option value={l.value} key={l.value}>
                      {l.label}
                    </option>
                  ))}
                </select>
                <select
                  name="type"
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                >
                  {typeOptions.map((t) => (
                    <option value={t.value} key={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
                <select
                  name="capacity"
                  value={formik.values.capacity}
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                >
                  {capacityOptions.map((c) => (
                    <option value={c.value} key={c.value}>
                      {c.label}
                    </option>
                  ))}
                </select>
                <input
                  name="date"
                  type="date"
                  value={formik.values.date}
                  onChange={formik.handleChange}
                  className="border border-gray-300 rounded px-3 py-2 w-full text-sm"
                  placeholder="DD-MM-YYYY"
                />
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-[#7266E7] text-white font-semibold rounded-lg px-8 py-2 hover:bg-[#5547b2] transition"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  className="bg-[#7266E7] text-white font-semibold rounded-lg px-8 py-2 hover:bg-[#5547b2] transition"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </section>

        {/* Stats */}
        <section className="mb-6 grid grid-cols-2 md:grid-cols-6 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-6 flex flex-col items-center bg-white shadow-sm"
            >
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-500 text-xs font-medium mb-2">
                {stat.label}
              </div>
              <div className="text-gray-300">{stat.icon}</div>
            </div>
          ))}
        </section>
        
        {/* All Venues */}
        <section>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="font-bold text-lg mb-4">
              All Venues ({filteredVenues.length})
            </div>
            <div className="flex flex-wrap gap-6">
              {filteredVenues.length === 0 ? (
                <div className="text-gray-500 text-center w-full py-8">
                  No venues found.
                </div>
              ) : (
                filteredVenues.map((venue, idx) => (
                  <VenueCard venue={venue} key={idx} />
                ))
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default VenueManagement;