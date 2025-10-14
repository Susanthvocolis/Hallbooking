'use client'
import React, { useRef } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Venue badge color map
const statusMap: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
};

const initialProfile = {
  ownerName: "John Doe",
  mobile: "+91 98765 43210",
  email: "john@example.com",
  address: "123 Main Street, Mumbai, Maharashtra",
  profilePic: null as File | null,
  brandLogo: null as File | null,
};

const initialPassword = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const initialCodeInput = {
  codeInput: "",
};

const profileSchema = Yup.object({
  ownerName: Yup.string().required("Required"),
  mobile: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  address: Yup.string().required("Required"),
});

const passwordSchema = Yup.object({
  currentPassword: Yup.string().required("Required"),
  newPassword: Yup.string().min(6, "Min 6 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Required"),
});

const venues = [
  {
    name: "Royal Banquet Hall",
    type: "Banquet",
    capacity: "500-1000 guests",
    location: "Mumbai",
    status: "Approved",
  },
  {
    name: "Green Valley Farmhouse",
    type: "Banquet",
    capacity: "500-1000 guests",
    location: "Mumbai",
    status: "Pending",
  },
];

const ProfileSettings: React.FC = () => {
  const profilePicRef = useRef<HTMLInputElement | null>(null);
  const brandLogoRef = useRef<HTMLInputElement | null>(null);

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

      <main className="px-3 py-8 md:px-8  mx-auto flex flex-col gap-6">
        <h1 className="text-2xl font-bold mb-2">Profile Settings</h1>

        {/* Profile Information */}
        <section className="bg-white rounded-xl p-6 shadow-sm border flex flex-col gap-5">
          <h2 className="text-lg font-semibold text-center">Profile Information</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            {/* Profile Pic */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-20 h-20 rounded-full bg-[#e2e3f7] flex flex-col justify-center items-center cursor-pointer relative"
                onClick={() => profilePicRef.current?.click()}
              >
                <svg width="36" height="36" fill="none">
                  <circle cx="18" cy="18" r="16" stroke="#7d7cd3" strokeWidth="2" />
                  <path d="M12 22c0-2 2-4 6-4s6 2 6 4" stroke="#7d7cd3" strokeWidth="2" />
                  <circle cx="18" cy="15" r="2" stroke="#7d7cd3" strokeWidth="2" />
                </svg>
                <span className="absolute bottom-0 right-0 bg-[#7d7cd3] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  <svg width="14" height="14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="text-xs text-gray-400">Profile Picture</div>
              <input
                type="file"
                ref={profilePicRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={() => { /* handle preview if needed */ }}
              />
            </div>
            {/* Brand Logo */}
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-24 h-20 rounded-xl bg-[#e2e3f7] flex flex-col justify-center items-center cursor-pointer relative border-2 border-dashed border-[#7d7cd3]"
                onClick={() => brandLogoRef.current?.click()}
              >
                <svg width="36" height="36" fill="none">
                  <rect x="6" y="10" width="24" height="16" rx="3" stroke="#7d7cd3" strokeWidth="2" />
                  <circle cx="18" cy="18" r="3" stroke="#7d7cd3" strokeWidth="2" />
                </svg>
                <span className="absolute bottom-0 right-0 bg-[#7d7cd3] w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-white">
                  <svg width="14" height="14" fill="none">
                    <path d="M7 1v12M1 7h12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </span>
              </div>
              <div className="text-xs text-gray-400">Brand Logo</div>
              <input
                type="file"
                ref={brandLogoRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={() => { /* handle preview if needed */ }}
              />
            </div>
          </div>
          {/* Profile Form */}
          <Formik
            initialValues={initialProfile}
            validationSchema={profileSchema}
            onSubmit={(values, actions) => {
              alert("Profile Updated!\n" + JSON.stringify(values, null, 2));
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-3 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold mb-1" htmlFor="ownerName">Owner Name</label>
                    <Field name="ownerName" className="w-full border rounded-lg p-2" />
                    <ErrorMessage name="ownerName" component="div" className="text-xs text-red-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1" htmlFor="mobile">Mobile</label>
                    <Field name="mobile" className="w-full border rounded-lg p-2" />
                    <ErrorMessage name="mobile" component="div" className="text-xs text-red-500" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="email">Email</label>
                  <Field name="email" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="address">Business Address</label>
                  <Field as="textarea" name="address" rows={2} className="w-full border rounded-lg p-2 resize-y" />
                  <ErrorMessage name="address" component="div" className="text-xs text-red-500" />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                  disabled={isSubmitting}
                >
                  Save Profile
                </button>
              </Form>
            )}
          </Formik>
        </section>

        {/* Change Password */}
        <section className="bg-white rounded-xl p-6 shadow-sm border flex flex-col gap-3">
          <h2 className="text-lg font-semibold text-center mb-2">Change Password</h2>
          <Formik
            initialValues={initialPassword}
            validationSchema={passwordSchema}
            onSubmit={(values, actions) => {
              alert("Password Updated!");
              actions.setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="currentPassword">Current Password</label>
                  <Field name="currentPassword" type="password" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="currentPassword" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="newPassword">New Password</label>
                  <Field name="newPassword" type="password" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="newPassword" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="confirmPassword">Confirm New Password</label>
                  <Field name="confirmPassword" type="password" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-xs text-red-500" />
                </div>
                <button
                  type="submit"
                  className="w-full mt-2 py-2 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                  disabled={isSubmitting}
                >
                  Update Password
                </button>
              </Form>
            )}
          </Formik>
        </section>

        {/* My Venues */}
        <section className="bg-white rounded-xl p-6 shadow-sm border flex flex-col gap-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold">My Venues</h2>
            <button className="px-4 py-1 rounded-md bg-[#7d7cd3] text-white font-semibold text-sm hover:bg-[#5b5ab7] transition">
              + Add Venue
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {venues.map((venue, idx) => (
              <div key={idx} className="border rounded-lg px-4 py-3 flex flex-col gap-1">
                <div className="font-semibold">{venue.name}</div>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span>{venue.type}</span>
                  <span>• {venue.capacity}</span>
                  <span>• {venue.location}</span>
                  <span className={`px-3 py-1 rounded-full font-semibold ${statusMap[venue.status]}`}>
                    {venue.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfileSettings;