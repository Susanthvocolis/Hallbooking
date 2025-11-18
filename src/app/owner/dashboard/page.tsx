'use client'

import React from 'react';
import { Formik, Form, Field } from 'formik';
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/ProtectedRoute';

const bookings = [
  {
    name: 'Rahul Kumar',
    date: '15 Nov 2025',
    status: 'Confirmed',
  },
  {
    name: 'Rahul Kumar',
    date: '15 Nov 2025',
    status: 'Pending',
  },
  {
    name: 'Rahul Kumar',
    date: '15 Nov 2025',
    status: 'Confirmed',
  },
];

const statusColor = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
};

const DashboardOverview: React.FC = () => {
  return (
    <ProtectedRoute requiredRole={["venue_owner", "service_vendor"]}>
      <>
        <Header title='Dashboard' />
        <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#eeeff9]">
          <main className="px-6 py-8 max-w-6xl mx-auto">
            {/* Dashboard Overview Title */}
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {/* Total Bookings */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span>Total Bookings</span>
                  <svg width="20" height="20" fill="none"><circle cx="10" cy="10" r="9" stroke="#7D7CD3" strokeWidth="2" /><path d="M7 10h6M10 7v6" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <div className="text-2xl font-bold text-green-500">24</div>
                <div className="text-xs text-green-500">+12% from last month</div>
              </div>
              {/* Pending Enquiries */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span>Pending Enquiries</span>
                  <svg width="20" height="20" fill="none"><rect x="3" y="5" width="14" height="10" rx="2" stroke="#7D7CD3" strokeWidth="2" /><path d="M7 9h6" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <div className="text-2xl font-bold text-yellow-500">8</div>
                <div className="text-xs text-yellow-500">Needs attention</div>
              </div>
              {/* Active Venues */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span>Active Venues</span>
                  <svg width="20" height="20" fill="none"><rect x="3" y="7" width="14" height="8" rx="2" stroke="#7D7CD3" strokeWidth="2" /><path d="M7 11h6" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" /></svg>
                </div>
                <div className="text-2xl font-bold text-green-500">3</div>
                <div className="text-xs text-green-500">All approved</div>
              </div>
              {/* Average Rating */}
              <div className="bg-white rounded-xl p-6 shadow-sm flex flex-col gap-2 border">
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <span>Average Rating</span>
                  <svg width="20" height="20" fill="none"><polygon points="10,3 12.4,8.5 18,9.3 13.5,13.1 14.7,18.6 10,15.7 5.3,18.6 6.5,13.1 2,9.3 7.6,8.5" stroke="#7D7CD3" strokeWidth="2" fill="none" /></svg>
                </div>
                <div className="text-2xl font-bold text-green-500">4.5</div>
                <div className="text-xs text-green-500">From 42 reviews</div>
              </div>
            </div>

            {/* Middle Section: Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Recent Bookings */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="text-xl font-semibold mb-4">Recent Bookings</div>
                <ul className="space-y-3">
                  {bookings.map((b, idx) => (
                    <li key={idx} className="flex items-center justify-between p-3 rounded-lg border bg-[#f8fafc]">
                      <div>
                        <div className="font-medium">{b.name}</div>
                        <div className="text-xs text-gray-500">{b.date}</div>
                      </div>
                      <div className={`px-4 py-1 rounded-full text-sm font-semibold ${statusColor[b.status as keyof typeof statusColor]}`}>
                        {b.status}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              {/* Quick Actions */}
              <div className="bg-white rounded-xl p-6 shadow-sm border">
                <div className="text-xl font-semibold mb-4">Quick Actions</div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="flex flex-col items-center bg-[#eeeff9] hover:bg-[#d6d7ed] transition rounded-lg p-4">
                    <svg width="28" height="28" fill="none"><rect x="6" y="10" width="16" height="8" rx="2" stroke="#7D7CD3" strokeWidth="2" /><path d="M14 6v4" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" /></svg>
                    <span className="mt-2 font-medium">Add Venue</span>
                  </button>
                  <button className="flex flex-col items-center bg-[#eeeff9] hover:bg-[#d6d7ed] transition rounded-lg p-4">
                    <svg width="28" height="28" fill="none"><rect x="6" y="6" width="16" height="16" rx="2" stroke="#7D7CD3" strokeWidth="2" /><path d="M14 10v8M10 14h8" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" /></svg>
                    <span className="mt-2 font-medium">Manage Calendar</span>
                  </button>
                  <button className="flex flex-col items-center bg-[#eeeff9] hover:bg-[#d6d7ed] transition rounded-lg p-4">
                    <svg width="28" height="28" fill="none"><rect x="6" y="10" width="16" height="8" rx="2" stroke="#7D7CD3" strokeWidth="2" /><path d="M14 6v4" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" /></svg>
                    <span className="mt-2 font-medium">View Enquiries</span>
                  </button>
                  <button className="flex flex-col items-center bg-[#eeeff9] hover:bg-[#d6d7ed] transition rounded-lg p-4">
                    <svg width="28" height="28" fill="none"><polygon points="14,4 17.2,11.2 25,12.4 19.5,17.3 20.9,25 14,21.2 7.1,25 8.5,17.3 3,12.4 10.8,11.2" stroke="#7D7CD3" strokeWidth="2" fill="none" /></svg>
                    <span className="mt-2 font-medium">Reviews</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Code Compiler Input Section */}
            {/* <div className="mt-10">
          <div className="bg-white rounded-xl p-6 shadow-sm border max-w-2xl mx-auto">
            <div className="text-xl font-semibold mb-4">Code Compiler Input</div>
            <Formik
              initialValues={{ codeInput: '' }}
              onSubmit={(values, actions) => {
                alert(`Input submitted: ${values.codeInput}`);
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form className="flex flex-col gap-4">
                  <label htmlFor="codeInput" className="block font-medium mb-1">
                    Enter input for your code:
                  </label>
                  <Field
                    as="textarea"
                    id="codeInput"
                    name="codeInput"
                    placeholder="Type the input for your code here..."
                    rows={3}
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#7d7cd3] resize-y"
                  />
                  <button
                    type="submit"
                    className="self-start px-6 py-2 rounded-lg bg-[#7d7cd3] text-white font-semibold hover:bg-[#5b5ab7] transition"
                    disabled={isSubmitting}
                  >
                    Submit Input
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div> */}
          </main>
        </div>
      </>
    </ProtectedRoute>

  );
};

export default DashboardOverview;