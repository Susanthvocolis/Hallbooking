// "use client";

// import AllSectionsCombined from "@/app/components/UserSetting";
// import React, { useState } from "react";

// const settingsTabs = [
//   "General Settings", "User Management", "Venue Owner Controls",
//   "Booking & Pricing Controls", "Payment & Transaction Settings",
//   "Content & CMS Settings", "Security & Compliance", "System Integrations",
//   "Advanced Controls", "Notification Settings"
// ];

// const SettingTabs = [
//   { name: "General Settings", tab: 0 },
//   { name: "User Management", tab: 1 },
//   { name: "Venue Owner Controls", tab: 2 },
//   { name: "Booking & Pricing Controls", tab: 3 },
//   { name: "Payment & Transaction Settings", tab: 4 },
//   { name: "Content & CMS Settings", tab: 5 },
//   { name: "Security & Compliance", tab: 6 },
//   { name: "System Integrations", tab: 7 },
//   { name: "Advanced Controls", tab: 8 },
//   { name: "Notification Settings", tab: 9 },
// ];

// const languagesList = [
//   { name: "English" },
//   { name: "Hindi" },
//   { name: "Telugu" },
//   { name: "Tamil" },
//   { name: "Gujarati" },
//   { name: "Marathi" },
// ];

// const Settings: React.FC = () => {
//   const [selectedTab, setSelectedTab] = useState(SettingTabs[0]);
//   const [activeLanguages, setActiveLanguages] = useState<string[]>(["English"]);
//   const [email, setEmail] = useState("LoremIpsum123@gmail.com");
//   const [contact, setContact] = useState("+90 9876543210");
//   const [timezone, setTimezone] = useState("");

//   const handleLangToggle = (lang: string) => {
//     setActiveLanguages((prev) =>
//       prev.includes(lang)
//         ? prev.filter((l) => l !== lang)
//         : [...prev, lang]
//     );
//   };

//   return (
//     <div className="min-h-screen bg-[#ede6f8] p-6">
//       {/* Header */}
//       <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
//         <h2 className="text-2xl font-bold mb-2 text-black">Settings</h2>
//         <p className="text-[#6b7282]">
//           Monitor and manage all venue bookings across the platform
//         </p>
//       </div>

//       {/* Layout: Tabs column and Settings Form */}
//       <div className="flex gap-6">
//         {/* Tabs list */}
//         <div className="bg-white rounded-xl px-5 py-7 w-[300px] flex flex-col gap-2 h-fit">
//           {SettingTabs.map((tab) => (
//             <button
//               key={tab.tab}
//               onClick={() => setSelectedTab(tab)}
//               className={`text-left text-[15px] py-2 px-2 rounded flex items-center gap-2 ${
//                 tab === selectedTab
//                   ? "text-black font-semibold"
//                   : "text-[#6b7282] hover:text-black"
//               }`}
//             >
//               <span
//                 className={`h-3 w-3 rounded-full border border-gray-400 inline-block ${
//                   tab === selectedTab ? "bg-black border-black" : "bg-white"
//                 }`}
//               ></span>
//               {tab.name}
//             </button>
//           ))}
//         </div>
//         {/* Settings Card */}
//         <div className="flex-1 bg-white rounded-xl p-7">
//           <div className="mb-5">
//             <h3 className="font-bold text-[18px] mb-4 text-black">General Settings:</h3>
//             <h4 className="font-bold text-[15px] mb-2 text-black">Contact Information:</h4>
//             <label className="block font-medium text-black mb-1">Primary Contact Email</label>
//             <input
//               className="border rounded px-4 py-2 mb-4 w-full text-[#6b7282] bg-[#f9fafb] outline-none"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <label className="block font-medium text-black mb-1">Support Contact Number</label>
//             <input
//               className="border rounded px-4 py-2 mb-6 w-full text-[#6b7282] bg-[#f9fafb] outline-none"
//               value={contact}
//               onChange={(e) => setContact(e.target.value)}
//             />
//             <h4 className="font-bold text-[15px] mb-2 text-black">Regional Settings:</h4>
//             <label className="block font-medium text-black mb-1">Default Time Zone</label>
//             <input
//               className="border rounded px-4 py-2 mb-6 w-full text-[#6b7282] bg-[#f9fafb] outline-none"
//               placeholder="Select Time Zone. Example: IST, GMT+5:30 etc"
//               value={timezone}
//               onChange={(e) => setTimezone(e.target.value)}
//             />

//             {/* LANGUAGE SETTINGS - Image Style */}
//             <h4 className="font-bold text-[15px] mb-4 text-black">Language Settings</h4>
//             <div className="grid grid-cols-2 gap-4">
//               {languagesList.map((lang) => (
//                 <div
//                   key={lang.name}
//                   className="flex items-center bg-[#fafafb] rounded-xl p-4 gap-4 shadow-sm border border-[#f1f1f4]"
//                 >
//                   {/* Checkbox */}
//                   <input
//                     type="checkbox"
//                     checked={activeLanguages.includes(lang.name)}
//                     onChange={() => handleLangToggle(lang.name)}
//                     className="accent-[#7067ec] h-5 w-5 rounded border border-gray-300"
//                   />

//                   {/* Custom Toggle */}
//                   <div
//                     className={`w-11 h-6 flex items-center bg-[#e7e1ee] rounded-full cursor-pointer transition ${
//                       activeLanguages.includes(lang.name)
//                         ? "bg-[#7067ec]"
//                         : "bg-[#e7e1ee]"
//                     }`}
//                     onClick={() => handleLangToggle(lang.name)}
//                   >
//                     <div
//                       className={`w-5 h-5 rounded-full shadow transition-all duration-200 ${
//                         activeLanguages.includes(lang.name)
//                           ? "translate-x-5 bg-[#5743ea]"
//                           : "translate-x-1 bg-white"
//                       }`}
//                     />
//                   </div>

//                   {/* Language Name */}
//                   <span
//                     className={`ml-2 text-lg font-medium ${
//                       activeLanguages.includes(lang.name)
//                         ? "text-[#5743ea] underline underline-offset-2"
//                         : "text-[#c0bdd4]"
//                     }`}
//                     style={{
//                       transition: "color 0.2s, text-decoration 0.2s",
//                     }}
//                   >
//                     {lang.name}
//                   </span>
//                 </div>
//               ))}
//             </div>
//             {/* END LANGUAGE GRID */}

//             <div className="flex gap-3 justify-end mt-8">
//               <button className="px-6 py-2 rounded border border-[#7067ec] text-[#7067ec] font-semibold bg-white hover:bg-[#f4f1fa]">
//                 CANCEL
//               </button>
//               <button className="px-6 py-2 rounded bg-[#7067ec] text-white font-semibold">
//                 SAVE
//               </button>
//             </div>
//           </div>
//         </div>
//         <AllSectionsCombined />
//       </div>
//     </div>
//   );
// };

// export default Settings;

// /*
// ---------------------------
// API INTEGRATION GUIDE

// 1. Replace state variables (email, contact, timezone, language selection) with values from backend.
// 2. Add useEffect/useState to fetch and persist settings.
// 3. Add save/cancel logic for backend update.
// 4. Expand form for additional controls as needed.
// ---------------------------
// */
'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

/**
 * AdminSettings.tsx
 *
 * Updated admin settings screen that:
 * - Shows left sidebar (static navigation)
 * - Re-uses the top "tabs" area but makes every tab interactive:
 *   General Settings | User Management | Venue Owner Controls | Booking & Pricing | Payment
 * - Clicking a tab immediately replaces the content below with the correct panel
 * - Each panel is a small but functional stub (you can extend them to match your backend)
 * - Each panel includes a small Code Compiler Input Form (Formik) as requested
 *
 * Place this file at: components/AdminSettings.tsx
 *
 * NOTE: Tailwind classes are used for layout/styling. Ensure Tailwind + Formik + Yup are installed.
 */

/* ----------------------- Types & Validation ----------------------- */

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
  | "Payment";

const TABS: PanelName[] = [
  "General Settings",
  "User Management",
  "Venue Owner Controls",
  "Booking & Pricing",
  "Payment",
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
                            className={`w-10 h-6 rounded-full p-1 transition-colors ${
                              field.value ? "bg-indigo-600" : "bg-gray-200"
                            }`}
                          >
                            <div
                              className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                                field.value ? "translate-x-4" : "translate-x-0"
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

/* User Management Panel */
const UserManagementPanel: React.FC = () => {
  const sampleUsers = [
    { id: "U001", name: "Rahul Kumar", role: "Venue Owner", email: "rahul@example.com" },
    { id: "U002", name: "Priya Sharma", role: "Customer", email: "priya@example.com" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">User Management</h2>
        <div className="text-sm text-gray-500">Search, edit or disable users</div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-sm text-gray-600">
              <th className="py-2 pr-4">ID</th>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Role</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleUsers.map((u) => (
              <tr key={u.id} className="border-t">
                <td className="py-3 pr-4 text-sm">{u.id}</td>
                <td className="py-3 pr-4 text-sm">{u.name}</td>
                <td className="py-3 pr-4 text-sm">{u.role}</td>
                <td className="py-3 pr-4 text-sm">{u.email}</td>
                <td className="py-3 pr-4 text-sm">
                  <button className="px-3 py-1 mr-2 rounded bg-indigo-600 text-white text-xs">Edit</button>
                  <button className="px-3 py-1 rounded border text-xs">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* Venue Owner Controls Panel */
const VenueOwnerControlsPanel: React.FC = () => {
  const owners = [
    { id: "V001", name: "Sunrise Banquet", owner: "Kamal", email: "kamal@venue.com", status: "Pending" },
    { id: "V002", name: "Green Farmhouse", owner: "Anita", email: "anita@venue.com", status: "Approved" },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow space-y-4">
      <h2 className="text-xl font-semibold">Venue Owner Controls</h2>
      <p className="text-sm text-gray-500">Approve or manage venue owners</p>

      <div className="space-y-3">
        {owners.map((o) => (
          <div key={o.id} className="flex items-center justify-between border rounded p-3">
            <div>
              <div className="font-medium">{o.owner} — {o.id}</div>
              <div className="text-sm text-gray-600">{o.email} • {o.name}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-sm ${o.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                {o.status}
              </span>
              <button className="px-3 py-1 bg-indigo-600 text-white rounded">View</button>
              <button className="px-3 py-1 border rounded">Message</button>
            </div>
          </div>
        ))}
      </div>
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
        return <UserManagementPanel />;
      case "Venue Owner Controls":
        return <VenueOwnerControlsPanel />;
      case "Booking & Pricing":
        return <BookingPricingPanel />;
      case "Payment":
        return <PaymentPanel />;
      case "General Settings":
      default:
        return <GeneralSettingsPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-[#efe6f4] flex">
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

        <section className="bg-white rounded-xl p-6 shadow mb-6">
          {/* Interactive Tabs (top of the content) */}
          <div className="border-b pb-4 mb-6">
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
  );
};

export default AdminSettings;