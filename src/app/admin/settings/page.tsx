'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserManagementSetting from "@/app/components/UserManagementSetting";
import VenueOwnerControls from "@/app/components/VenueOwnerControls";
import BookingPricing from "@/app/components/BookingPricing";
import PaymentTransaction from "@/app/components/PaymentTransaction";
import ProtectedRoute from "@/app/ProtectedRoute";

type Languages = {
  english: boolean;
  hindi: boolean;
  telugu: boolean;
  gujarati: boolean;
  tamil: boolean;
  marathi: boolean;
};

type FormValues = {
  primaryEmail: string;
  supportNumber: string;
  timeZone: string;
  languages: Languages;
  codeInput: string;
};

const initialValues: FormValues = {
  primaryEmail: "Loremipsum123@gmail.com",
  supportNumber: "+90 9876543210",
  timeZone: "",
  languages: {
    english: true,
    hindi: false,
    telugu: false,
    gujarati: false,
    tamil: false,
    marathi: false,
  },
  codeInput: "",
};

const validationSchema = Yup.object({
  primaryEmail: Yup.string().email("Invalid email").required("Required"),
  supportNumber: Yup.string().required("Required"),
  timeZone: Yup.string(),
  codeInput: Yup.string(),
});

type PanelName =
  | "General Settings"
  | "User Management"
  | "Venue Owner Controls"
  | "Booking & Pricing"
  | "Payment & Transaction";

const TABS: PanelName[] = [
  "General Settings",
  "User Management",
  "Venue Owner Controls",
  "Booking & Pricing",
  "Payment & Transaction",
];
/* ----------------------- Panels ----------------------- */

/* General Settings (original settings form) */
const GeneralSettingsPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-2">General Settings</h2>
      <p className="text-sm text-gray-600 mb-4">Monitor and manage platform-wide settings</p>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          console.log("Saving settings:", values);
          alert("Settings saved (see console)");
          actions.setSubmitting(false);
        }}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Primary Contact Email</label>
                  <Field
                    name="primaryEmail"
                    type="email"
                    className="w-full border rounded-md p-3 bg-gray-50"
                    placeholder="Loremipsum123@gmail.com"
                  />
                  <ErrorMessage name="primaryEmail" component="div" className="text-xs text-red-500 mt-1" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Support Contact Number</label>
                  <Field
                    name="supportNumber"
                    className="w-full border rounded-md p-3 bg-gray-50"
                    placeholder="+90 9876543210"
                  />
                  <ErrorMessage name="supportNumber" component="div" className="text-xs text-red-500 mt-1" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Regional Settings</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Default Time Zone</label>
                <Field name="timeZone" as="select" className="w-full border rounded-md p-3 bg-white">
                  <option value="">Select Time Zone. Example: IST, GMT+5:30 etc</option>
                  <option value="IST">IST (GMT+5:30)</option>
                  <option value="GMT">GMT (UTC+0)</option>
                  <option value="PST">PST (UTC-8)</option>
                </Field>
              </div>

              <div>
                <label className="block text-sm font-medium mb-3">Language Settings</label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {([
                    ["english", "English"],
                    ["hindi", "Hindi"],
                    ["telugu", "Telugu"],
                    ["gujarati", "Gujarati"],
                    ["tamil", "Tamil"],
                    ["marathi", "Marathi"],
                  ] as [keyof Languages, string][]).map(([key, label]) => (
                    <Field name={`languages.${key}`} key={key}>
                      {({ field, form }: any) => (
                        <label
                          className="flex items-center gap-3 p-3 border rounded-md bg-gray-50 cursor-pointer"
                          onClick={() => form.setFieldValue(field.name, !field.value)}
                        >
                          <input
                            type="checkbox"
                            checked={field.value}
                            readOnly
                            className="w-4 h-4 accent-indigo-600"
                          />
                          <div className="flex-1 text-sm">{label}</div>

                          <div
                            aria-hidden
                            className={`w-10 h-6 rounded-full p-1 transition-colors ${field.value ? "bg-indigo-600" : "bg-gray-200"
                              }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${field.value ? "translate-x-4" : "translate-x-0"
                                }`}
                            />
                          </div>
                        </label>
                      )}
                    </Field>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  // resetting to defaults via page reload is simple; here we just alert the user
                  alert("Reset to defaults (demo) — implement as needed.");
                }}
                className="px-5 py-2 border rounded-md text-indigo-600"
              >
                CANCEL
              </button>

              <div className="flex items-center gap-4">
                <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-indigo-600 text-white rounded-md">
                  SAVE
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

/* Booking & Pricing Panel */
const BookingPricingPanel: React.FC = () => {
  const pricing = [
    { id: "P001", venue: "Royal Banquet", base: "₹50,000", weekend: "₹60,000" },
    { id: "P002", venue: "Green Farmhouse", base: "₹40,000", weekend: "₹55,000" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-xl font-semibold">Booking & Pricing</h2>
      <p className="text-sm text-gray-500">Manage pricing rules and booking options</p>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Venue</th>
              <th className="py-2 pr-4">Base Price</th>
              <th className="py-2 pr-4">Weekend Price</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {pricing.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="py-3 pr-4 text-sm">{p.id}</td>
                <td className="py-3 pr-4 text-sm">{p.venue}</td>
                <td className="py-3 pr-4 text-sm">{p.base}</td>
                <td className="py-3 pr-4 text-sm">{p.weekend}</td>
                <td className="py-3 pr-4 text-sm">
                  <button className="px-3 py-1 mr-2 rounded bg-indigo-600 text-white text-xs">Edit</button>
                  <button className="px-3 py-1 rounded border text-xs">History</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Payment Panel */
const PaymentPanel: React.FC = () => {
  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-xl font-semibold">Payment</h2>
      <p className="text-sm text-gray-500">Configure payment gateway and merchant details</p>

      <Formik
        initialValues={{ merchantId: "", apiKey: "", sandbox: true, codeInput: "" } as any}
        onSubmit={(values, actions) => {
          console.log("Payment settings:", values);
          alert("Payment settings saved (demo)");
          actions.setSubmitting(false);
        }}
      >
        {({ values, setFieldValue, isSubmitting }) => (
          <Form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Merchant ID</label>
                <Field name="merchantId" className="w-full border rounded-md p-3 bg-gray-50" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">API Key / Secret</label>
                <Field name="apiKey" className="w-full border rounded-md p-3 bg-gray-50" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={values.sandbox}
                  onChange={() => setFieldValue("sandbox", !values.sandbox)}
                  className="w-4 h-4"
                />
                <span className="text-sm">Use sandbox / test mode</span>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setFieldValue("merchantId", "");
                  setFieldValue("apiKey", "");
                  setFieldValue("sandbox", true);
                }}
                className="px-5 py-2 border rounded-md text-indigo-600"
              >
                RESET
              </button>

              <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-indigo-600 text-white rounded-md">
                SAVE PAYMENT
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

/* ----------------------- Main AdminSettings Component ----------------------- */

const AdminSettings: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<PanelName>("General Settings");

  const renderPanel = (tab: PanelName) => {
    switch (tab) {
      case "User Management":
        return <UserManagementSetting />;
      case "Venue Owner Controls":
        return <VenueOwnerControls />;
      case "Booking & Pricing":
        return <BookingPricing />;
      case "Payment & Transaction":
        return <PaymentTransaction />;
      case "General Settings":
      default:
        return <GeneralSettingsPanel />;
    }
  };

  return (
    <ProtectedRoute requiredRole={['super_admin']}>
      <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#efe6f4] flex">
        <main className="flex-1 p-6 md:p-10">
          <header className="mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Settings</h1>
                  <p className="text-sm text-gray-600 mt-1">Manage the selected area below</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold text-lg">John Doe</div>
                    <div className="text-sm text-gray-500">Super Admin</div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-400" />
                </div>
              </div>
            </div>
          </header>

          <section className="bg-white rounded-xl p-6 shadow mb-2">
            {/* Interactive Tabs (top of the content) */}
            <div className="border-b pb-0 mb-0">
              <div className="flex flex-wrap gap-6 text-sm">
                {TABS.map((t) => {
                  const active = t === selectedTab;
                  return (
                    <button
                      key={t}
                      onClick={() => setSelectedTab(t)}
                      className={`pb-2 ${active ? "border-b-2 border-indigo-600 font-medium text-indigo-800" : "text-gray-500"}`}
                      aria-pressed={active}
                    >
                      {t}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Render selected panel */}
            <div>{renderPanel(selectedTab)}</div>
          </section>
        </main>
      </div>
    </ProtectedRoute>
  );
};

export default AdminSettings;