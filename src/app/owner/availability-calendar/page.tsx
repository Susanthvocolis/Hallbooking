'use client'
import React, { useState } from "react";
import { Formik, Form, Field } from "formik";

// Helper to get days in month and their weekday
const getMonthDays = (year: number, month: number) => {
  const days: { date: Date; day: number }[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push({ date: new Date(date), day: date.getDay() });
    date.setDate(date.getDate() + 1);
  }
  return days;
};

const pad = (n: number) => n.toString().padStart(2, "0");

// Example available/unavailable days for demo
const demoAvailable = [
  2, 3, 5, 6, 9, 10, 12, 13, 16, 17, 19, 20, 22, 25, 26, 29, 30,
];
const demoUnavailable = [7, 18, 27];

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const AvailabilityCalendar: React.FC = () => {
  // Default to December 2024 as in image
  const [year, setYear] = useState(2024);
  const [month, setMonth] = useState(11); // 0-indexed, so 11 = Dec

  const days = getMonthDays(year, month);

  // Find what weekday the first day is, to pad calendar
  const firstWeekday = days[0].day;
  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstWeekday; i++) calendarCells.push(null);
  days.forEach((d) => calendarCells.push(d.date.getDate()));

  // Fill to complete 6 weeks (to keep grid even)
  while (calendarCells.length < 6 * 7) calendarCells.push(null);

  // Legend
  const isAvailable = (d: number) => demoAvailable.includes(d);
  const isUnavailable = (d: number) => demoUnavailable.includes(d);

  // Handlers for changing month
  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else {
      setMonth((m) => m - 1);
    }
  };
  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else {
      setMonth((m) => m + 1);
    }
  };

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
            JD
          </div>
        </div>
      </header>

      <main className="px-2 py-8 md:px-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Availability Calendar</h1>

        {/* Month Selector & Legend */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <div className="flex items-center gap-3 text-lg font-medium">
            <button aria-label="Previous Month" onClick={prevMonth} className="p-1">
              <span className="inline-block rotate-90 text-[#7d7cd3]">&#8593;</span>
            </button>
            <span>
              {monthNames[month]} {year}
            </span>
            <button aria-label="Next Month" onClick={nextMonth} className="p-1">
              <span className="inline-block -rotate-90 text-[#7d7cd3]">&#8593;</span>
            </button>
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-[#7d7cd3]">
              <span className="w-4 h-4 rounded bg-[#7d7cd3] inline-block" />
              <span className="text-sm">Available Dates</span>
            </span>
            <span className="flex items-center gap-2 text-black">
              <span className="w-4 h-4 rounded bg-black inline-block" />
              <span className="text-sm">Unavailable Dates</span>
            </span>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="w-full bg-white rounded-xl shadow-sm border p-4">
          <div className="grid grid-cols-7 border-b pb-2 mb-2">
            {["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"].map((d) => (
              <div key={d} className="text-center text-sm font-semibold text-gray-600 py-1">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-y-3 min-h-[370px]">
            {calendarCells.map((d, i) => (
              <div
                key={i}
                className={`h-10 flex items-center justify-center text-base font-medium
                  ${d === null ? "" :
                    isUnavailable(d) ? "text-black font-bold" :
                    isAvailable(d) ? "text-[#7d7cd3]" :
                    "text-gray-400"
                  }
                `}
              >
                {d ? pad(d) : ""}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AvailabilityCalendar;