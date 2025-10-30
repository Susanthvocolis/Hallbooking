"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ProtectedRoute from "@/app/ProtectedRoute";
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

const initialValues = {
  venueName: '',
  ownerName: '',
  mobile: '',
  email: '',
  city: '',
  location: '',
  venueType: '',
  pricePerDay: '',
  capacityMin: '',
  capacityMax: '',
  gstin: '',
  amenities: [] as string[],
  gallery: null as File | null,
  description: '',
  terms: '',
  codeInput: '',
};

const validationSchema = Yup.object({
  venueName: Yup.string().required('Required'),
  ownerName: Yup.string().required('Required'),
  mobile: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  city: Yup.string().required('Required'),
  location: Yup.string().required('Required'),
  venueType: Yup.string().required('Required'),
  pricePerDay: Yup.string().required('Required'),
  capacityMin: Yup.number().required('Required'),
  capacityMax: Yup.number().required('Required'),
  gstin: Yup.string(),
  amenities: Yup.array(),
  description: Yup.string(),
  terms: Yup.string(),
  codeInput: Yup.string(),
});

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

const Table = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  const users = staticUsers;
  return (
    <div>
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
          <input type="text" placeholder="Search Booking ID" className="rounded border p-2 w-48" />
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
        <div className="flex justify-between items-center mb-4">
          <div className="mb-4 text-lg font-semibold">All Users</div>
          <button onClick={() => setShowForm(true)} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add User</button>
        </div>
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
  )
}

const RegisterForm = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  return (
    <main className="px-2 py-8 md:px-8  mx-auto">
      <h1 className="text-2xl font-bold mb-8">User Registration</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          alert('User Registration Submitted!\n' + JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="flex flex-col gap-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="venueName">First name</label>
                <Field name="venueName" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="venueName" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="mobile">Mobile</label>
                <Field name="mobile" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="mobile" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="email">Email</label>
                <Field name="email" type="email" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex flex-row gap-4 md:gap-6 mt-4">
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}

const UserManagement: React.FC = () => {
  const [showForm, setShowForm] = useState(false)
  return (
    <ProtectedRoute requiredRole={['super_admin']}>
      <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#ede6f8] p-6">
        {showForm ? <RegisterForm setShowForm={setShowForm} /> : <Table setShowForm={setShowForm} />}
      </div>
    </ProtectedRoute>
  );
};

export default UserManagement;