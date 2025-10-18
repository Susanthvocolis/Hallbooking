"use client";

import React, { useState } from "react";
// Import your real page components here
import CustomerSupport from "../content-managment-customer-suppoer/page";
import FAQManager from "../content-managment-f&q/page";

// Dummy component for Blogs (replace this with real blog management UI)
const Blogs = () => (
  <>
    <div className="flex justify-between items-center mb-3">
      <h3 className="text-xl font-bold text-black">Blog Management</h3>
      <div className="flex gap-2">
        <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Export</button>
        <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Create Blog</button>
      </div>
    </div>
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
    <div className="bg-white min-h-[170px] flex justify-center items-center text-[#6b7282] rounded-lg border border-gray-200">
      No blog entries found...
    </div>
  </>
);

// Tabs array with name and component for each tab
const tabs = [
  { name: "Blogs", component: <Blogs /> },
  { name: "FAQ Manager", component: <FAQManager /> },
  { name: "Static Pages", component: <CustomerSupport /> },
];

const BlogManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0); // default first tab

  return (
    <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#ede6f8] p-6">
      {/* Main Header */}
      <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-black">Blog Management</h2>
        <p className="text-[#6b7282]">Monitor and manage all venue bookings across the platform</p>
      </div>

      {/* Tabs - matches your screenshot */}
      <div className="bg-[#e6def4] rounded-2xl px-4 py-5 flex gap-10 items-center mb-4">
        {tabs.map((tab, idx) => (
          <button
            key={tab.name}
            className={`flex-1 py-4 text-xl font-semibold rounded-2xl transition 
              ${activeTab === idx
                ? "bg-[#d9ceef] shadow-[0_6px_16px_rgba(110,87,195,0.09)] text-black"
                : "bg-white text-black"
              }`}
            style={{
              marginLeft: idx === 0 ? 0 : "10px",
              marginRight: idx === tabs.length - 1 ? 0 : "10px"
            }}
            onClick={() => setActiveTab(idx)}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content for the selected tab */}
      <div className="bg-white rounded-xl p-6">
        {tabs[activeTab].component}
      </div>
    </div>
  );
};

export default BlogManagement;

/*
---------------------------
API INTEGRATION GUIDE

1. Replace static content with API data (blogs).
2. Add useState/useEffect and fetch data as needed.
3. Add blog listing and actions.
---------------------------
*/
