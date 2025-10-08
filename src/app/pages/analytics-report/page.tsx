"use client";

import React from "react";

// Static stat card data
const statCards = [
  {
    label: "New Bookings",
    value: 626,
    color: "orange",
    period: "Daily",
  },
  {
    label: "Expenses",
    value: "626k",
    color: "blue",
    period: "Daily",
  },
  {
    label: "New Users",
    value: 250,
    color: "yellow",
    period: "Daily",
  },
];

// Simple gauge fake implementation for demo
function Gauge({ value, color }: { value: number | string; color: string }) {
  let colored =
    color === "orange"
      ? "bg-gradient-to-r from-orange-300 to-orange-500"
      : color === "blue"
      ? "bg-gradient-to-r from-blue-300 to-blue-500"
      : "bg-gradient-to-r from-yellow-300 to-yellow-500";
  return (
    <div className="flex flex-col items-center">
      {/* Fake gauge with colored half ring */}
      <div className="w-24 h-10 relative my-2">
        <div className={`absolute left-0 top-0 w-24 h-10 rounded-t-full ${colored}`}></div>
        <div className="absolute left-2 top-2 w-20 h-8 rounded-t-full bg-white"></div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
    </div>
  );
}

const AnalyticsReport: React.FC = () => (
  <div className="min-h-screen bg-[#ede6f8] p-6">
    {/* Header */}
    <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
      <h2 className="text-2xl font-bold mb-2 text-black">Analytics & Report</h2>
      <p className="text-[#6b7282]">Monitor and manage all venue bookings across the platform</p>
    </div>

    {/* Stat Cards with Gauges */}
    <div className="grid grid-cols-3 gap-4 mb-6">
      {statCards.map((card, i) => (
        <div key={i} className="bg-white rounded-xl p-5 flex flex-col items-center">
          <div className="flex justify-between w-full">
            <div className="text-[17px] font-semibold">{card.label}</div>
            <select className="rounded border ml-2 h-7 text-xs px-2">
              <option>{card.period}</option>
            </select>
          </div>
          <Gauge value={card.value} color={card.color} />
          <div className="text-[12px] text-[#6b7282] w-full text-center my-1">Lorem ipsum dolor sit amet.</div>
        </div>
      ))}
    </div>

    {/* Chart Card */}
    <div className="bg-white rounded-xl p-5">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold text-black">Monthly Earnings</div>
        <select className="rounded border h-9 text-xs px-2">
          <option>Last 4 Months</option>
          <option>Last Month</option>
        </select>
      </div>
      {/* Chart Placeholder */}
      <div className="w-full h-[260px] flex items-center">
        {/* If using chart.js or recharts, render actual line chart here */}
        <div className="w-full h-[200px] flex items-center justify-center bg-gradient-to-b from-[#dde8fc] to-[#fff] rounded-lg border border-gray-200">
          <span className="text-[#6b7282]">[Monthly earnings chart goes here]</span>
        </div>
      </div>
    </div>
  </div>
);

export default AnalyticsReport;

/*
---------------------------
API/CHART INTEGRATION GUIDE

1. To fetch real stats, use useEffect/useState.
2. To visualize data, use a chart library like recharts, chart.js, or apexcharts.
3. Replace Gauge() and chart placeholder with real visual components.
---------------------------
*/
