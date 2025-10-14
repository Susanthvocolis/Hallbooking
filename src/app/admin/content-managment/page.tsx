"use client";

import React from "react";

const tabs = ["Blogs", "FAQ Manager", "Static Pages"];
const activeTab = "Blogs";

const BlogManagement: React.FC = () => (
  <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#ede6f8] p-6">
    {/* Page Header */}
    <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
      <h2 className="text-2xl font-bold mb-2 text-black">Support Tickets</h2>
      <p className="text-[#6b7282]">Monitor and manage all venue bookings across the platform</p>
    </div>

    {/* Tabs */}
    <div className="bg-[#f4f1fa] rounded-xl flex gap-10 p-2 items-center mb-4">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          className={`px-7 py-2 text-black font-semibold rounded-lg ${
            activeTab === tab ? "bg-[#ebe6f8]" : "hover:bg-white"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>

    {/* Blog Management Panel */}
    <div className="bg-white rounded-xl p-6">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-xl font-bold text-black">Blog Management</h3>
        <div className="flex gap-2">
          <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Export</button>
          <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Create Blog</button>
        </div>
      </div>
      {/* Filters Row */}
      <div className="bg-[#f4f1fa] rounded-lg flex flex-wrap gap-2 items-center p-4 mb-4">
        <input
          type="text"
          placeholder="Search Blogs and title, content and tags"
          className="rounded border p-2 w-56"
        />
        <select className="rounded border p-2 w-28">
          <option>All Status</option>
        </select>
        <select className="rounded border p-2 w-28">
          <option>All Category</option>
        </select>
        <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium ml-auto">Filters</button>
      </div>

      {/* Empty State Content */}
      <div className="bg-white min-h-[170px] flex justify-center items-center text-[#6b7282] rounded-lg border border-gray-200">
        No blog entries found...
      </div>
    </div>
  </div>
);

export default BlogManagement;

/*
---------------------------
API INTEGRATION GUIDE

1. Replace static content with API data (blogs).
2. Add useState/useEffect and fetch data as needed.
3. Add blog listing and actions.
---------------------------
*/
