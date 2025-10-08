"use client";

import React, { useState } from "react";

const settingsTabs = [
  "General Settings", "User Management", "Venue Owner Controls",
  "Booking & Pricing Controls", "Payment & Transaction Settings",
  "Content & CMS Settings", "Security & Compliance", "System Integrations",
  "Advanced Controls", "Notification Settings"
];

const languagesList = [
  { name: "English" },
  { name: "Hindi" },
  { name: "Telugu" },
  { name: "Tamil" },
  { name: "Gujarati" },
  { name: "Marathi" },
];

const Settings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(settingsTabs[0]);
  const [activeLanguages, setActiveLanguages] = useState<string[]>(["English"]);
  const [email, setEmail] = useState("LoremIpsum123@gmail.com");
  const [contact, setContact] = useState("+90 9876543210");
  const [timezone, setTimezone] = useState("");

  const handleLangToggle = (lang: string) => {
    setActiveLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((l) => l !== lang)
        : [...prev, lang]
    );
  };

  return (
    <div className="min-h-screen bg-[#ede6f8] p-6">
      {/* Header */}
      <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-black">Settings</h2>
        <p className="text-[#6b7282]">
          Monitor and manage all venue bookings across the platform
        </p>
      </div>

      {/* Layout: Tabs column and Settings Form */}
      <div className="flex gap-6">
        {/* Tabs list */}
        <div className="bg-white rounded-xl px-5 py-7 w-[300px] flex flex-col gap-2 h-fit">
          {settingsTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`text-left text-[15px] py-2 px-2 rounded flex items-center gap-2 ${
                tab === selectedTab
                  ? "text-black font-semibold"
                  : "text-[#6b7282] hover:text-black"
              }`}
            >
              <span
                className={`h-3 w-3 rounded-full border border-gray-400 inline-block ${
                  tab === selectedTab ? "bg-black border-black" : "bg-white"
                }`}
              ></span>
              {tab}
            </button>
          ))}
        </div>
        {/* Settings Card */}
        <div className="flex-1 bg-white rounded-xl p-7">
          <div className="mb-5">
            <h3 className="font-bold text-[18px] mb-4 text-black">General Settings:</h3>
            <h4 className="font-bold text-[15px] mb-2 text-black">Contact Information:</h4>
            <label className="block font-medium text-black mb-1">Primary Contact Email</label>
            <input
              className="border rounded px-4 py-2 mb-4 w-full text-[#6b7282] bg-[#f9fafb] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="block font-medium text-black mb-1">Support Contact Number</label>
            <input
              className="border rounded px-4 py-2 mb-6 w-full text-[#6b7282] bg-[#f9fafb] outline-none"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
            <h4 className="font-bold text-[15px] mb-2 text-black">Regional Settings:</h4>
            <label className="block font-medium text-black mb-1">Default Time Zone</label>
            <input
              className="border rounded px-4 py-2 mb-6 w-full text-[#6b7282] bg-[#f9fafb] outline-none"
              placeholder="Select Time Zone. Example: IST, GMT+5:30 etc"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
            />

            {/* LANGUAGE SETTINGS - Image Style */}
            <h4 className="font-bold text-[15px] mb-4 text-black">Language Settings</h4>
            <div className="grid grid-cols-2 gap-4">
              {languagesList.map((lang) => (
                <div
                  key={lang.name}
                  className="flex items-center bg-[#fafafb] rounded-xl p-4 gap-4 shadow-sm border border-[#f1f1f4]"
                >
                  {/* Checkbox */}
                  <input
                    type="checkbox"
                    checked={activeLanguages.includes(lang.name)}
                    onChange={() => handleLangToggle(lang.name)}
                    className="accent-[#7067ec] h-5 w-5 rounded border border-gray-300"
                  />

                  {/* Custom Toggle */}
                  <div
                    className={`w-11 h-6 flex items-center bg-[#e7e1ee] rounded-full cursor-pointer transition ${
                      activeLanguages.includes(lang.name)
                        ? "bg-[#7067ec]"
                        : "bg-[#e7e1ee]"
                    }`}
                    onClick={() => handleLangToggle(lang.name)}
                  >
                    <div
                      className={`w-5 h-5 rounded-full shadow transition-all duration-200 ${
                        activeLanguages.includes(lang.name)
                          ? "translate-x-5 bg-[#5743ea]"
                          : "translate-x-1 bg-white"
                      }`}
                    />
                  </div>

                  {/* Language Name */}
                  <span
                    className={`ml-2 text-lg font-medium ${
                      activeLanguages.includes(lang.name)
                        ? "text-[#5743ea] underline underline-offset-2"
                        : "text-[#c0bdd4]"
                    }`}
                    style={{
                      transition: "color 0.2s, text-decoration 0.2s",
                    }}
                  >
                    {lang.name}
                  </span>
                </div>
              ))}
            </div>
            {/* END LANGUAGE GRID */}

            <div className="flex gap-3 justify-end mt-8">
              <button className="px-6 py-2 rounded border border-[#7067ec] text-[#7067ec] font-semibold bg-white hover:bg-[#f4f1fa]">
                CANCEL
              </button>
              <button className="px-6 py-2 rounded bg-[#7067ec] text-white font-semibold">
                SAVE
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

/*
---------------------------
API INTEGRATION GUIDE

1. Replace state variables (email, contact, timezone, language selection) with values from backend.
2. Add useEffect/useState to fetch and persist settings.
3. Add save/cancel logic for backend update.
4. Expand form for additional controls as needed.
---------------------------
*/
