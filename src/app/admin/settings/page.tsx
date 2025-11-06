// "use client";

// import React, { useMemo, useState } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import ProtectedRoute from "@/app/ProtectedRoute";
// // ================= Types =================

// type Gateway = "Razorpay" | "Stripe" | "PayPal" | "Paytm" | "Cashfree" | "";

// type RefundPeriod = "3_days" | "7_days" | "14_days" | "custom" | "";

// interface PGValues {
//   gateway: Gateway;
//   apiKey: string;
//   apiSecret: string;
//   webhookUrl: string;
//   currency: string;
//   enableGateway: boolean;
//   testMode: boolean;
//   txnLimit: number | "";
//   compilerInput: string; // extra input field for code compiler inputs
// }

// interface CommissionValues {
//   banquet: string;
//   catering: string;
//   photography: string;
//   decoration: string;
//   essential: string;
//   type: "Flat" | "Tiered" | "Vendor-specific" | "";
//   dynamicCommission: boolean;
// }

// interface RefundValues {
//   globalRefund: RefundPeriod;
//   fullRefundDays: string; // e.g. 7 days
//   partialRefundHours: string; // e.g. 48 hours
//   noRefundOnEventDay: boolean;
//   overrideVendor: string;
//   autoRefunds: boolean;
// }

// interface WizardValues {
//   payment: PGValues;
//   commission: CommissionValues;
//   refund: RefundValues;
// }

// // ================= Helpers =================

// const gateways: Gateway[] = ["Razorpay", "Stripe", "PayPal", "Paytm", "Cashfree"];
// const currencies = [
//   { code: "USD", label: "US Dollar" },
//   { code: "EUR", label: "Euro" },
//   { code: "INR", label: "Indian Rupee" },
//   { code: "GBP", label: "British Pound" },
//   { code: "AED", label: "UAE Dirham" },
// ];

// const refundOptions: { value: RefundPeriod; label: string }[] = [
//   { value: "3_days", label: "3 days" },
//   { value: "7_days", label: "7 days" },
//   { value: "14_days", label: "14 days" },
//   { value: "custom", label: "Custom" },
// ];

// const tabs = ["Venue Owner Controls", "Booking & Pricing", "Payment & Transaction", "Content & CMS"];

// // Validators per step
// function validatePayment(v: PGValues) {
//   const e: Partial<Record<keyof PGValues, string>> = {};
//   if (!v.gateway) e.gateway = "Please select a gateway";
//   if (!v.currency) e.currency = "Select a currency";
//   if (v.enableGateway) {
//     if (!v.apiKey) e.apiKey = "API key is required";
//     if (!v.apiSecret) e.apiSecret = "API secret is required";
//   }
//   if (v.webhookUrl && !/^https?:\/\//i.test(v.webhookUrl)) e.webhookUrl = "Webhook must start with http(s)://";
//   if (v.txnLimit !== "" && Number(v.txnLimit) < 0) e.txnLimit = "Limit cannot be negative";
//   return e;
// }

// function validateCommission(v: CommissionValues) {
//   const e: Partial<Record<keyof CommissionValues, string>> = {};
//   const fields: (keyof CommissionValues)[] = ["banquet", "catering", "photography", "decoration", "essential"];
//   fields.forEach((f) => {
//     const val = String(v[f] || "").trim();
//     if (val && !/^\d{1,2}(?:\.\d+)?$/.test(val)) e[f] = "Use % number (0-99.99)";
//   });
//   if (!v.type) e.type = "Select commission type";
//   return e;
// }

// function validateRefund(v: RefundValues) {
//   const e: Partial<Record<keyof RefundValues, string>> = {};
//   if (!v.globalRefund) e.globalRefund = "Choose a default period";
//   if (v.fullRefundDays && !/^\d+$/.test(v.fullRefundDays)) e.fullRefundDays = "Enter days as number";
//   if (v.partialRefundHours && !/^\d+$/.test(v.partialRefundHours)) e.partialRefundHours = "Enter hours as number";
//   return e;
// }

// const StatCard: React.FC<{ title: string; value: string | number }> = ({ title, value }) => (
//   <div className="flex-1 min-w-[180px] rounded-2xl border bg-white p-4 shadow-sm">
//     <div className="text-sm text-gray-500">{title}</div>
//     <div className="mt-2 text-2xl font-semibold">{value}</div>
//   </div>
// );

// const Toggle: React.FC<{ name: any; label: string }> = ({ name, label }) => (
//   <Field name={name}>
//     {({ field, form }: any) => (
//       <button
//         type="button"
//         onClick={() => form.setFieldValue(name, !field.value)}
//         className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${field.value ? "bg-indigo-600" : "bg-gray-300"
//           }`}
//         aria-pressed={field.value}
//       >
//         <span
//           className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${field.value ? "translate-x-5" : "translate-x-1"
//             }`}
//         />
//         <span className="sr-only">{label}</span>
//       </button>
//     )}
//   </Field>
// );

// const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
//   <section className="rounded-2xl border bg-white p-5 shadow-sm">
//     <h3 className="mb-4 text-base font-semibold text-gray-800">{title}</h3>
//     <div className="space-y-4">{children}</div>
//   </section>
// );

// const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
//   <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
//     {children}
//   </label>
// );

// const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
//   <input
//     {...props}
//     className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${props.className || ""
//       }`}
//   />
// );

// const SelectEl: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
//   <select
//     {...props}
//     className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${props.className || ""
//       }`}
//   />
// );

// const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
//   <textarea
//     {...props}
//     className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${props.className || ""
//       }`}
//   />
// );

// // ================= Main Wizard Component =================

// const BookingPaymentsWizard: React.FC = () => {
//   const [step, setStep] = useState<number>(0); // 0: Payment, 1: Commission, 2: Refund
//   const [toast, setToast] = useState<string | null>(null);

//   const stats = useMemo(() => [{ title: "Success", value: 120 }, { title: "Failed", value: 8 }, { title: "In Review", value: 3 }], []);

//   const initialValues: WizardValues = {
//     payment: {
//       gateway: "",
//       apiKey: "",
//       apiSecret: "",
//       webhookUrl: "",
//       currency: "INR",
//       enableGateway: true,
//       testMode: true,
//       txnLimit: "",
//       compilerInput: "",
//     },
//     commission: {
//       banquet: "",
//       catering: "",
//       photography: "",
//       decoration: "",
//       essential: "",
//       type: "",
//       dynamicCommission: false,
//     },
//     refund: {
//       globalRefund: "",
//       fullRefundDays: "",
//       partialRefundHours: "",
//       noRefundOnEventDay: false,
//       overrideVendor: "",
//       autoRefunds: false,
//     },
//   };

//   function save(values: WizardValues) {
//     localStorage.setItem("wizard_config", JSON.stringify(values));
//     setToast("Saved (mock). Replace with API");
//     setTimeout(() => setToast(null), 2000);
//   }

//   return (
//     <ProtectedRoute requiredRole={['super_admin']}>
//       <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#efe6f4] flex">
//         <div className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
//           <header className="rounded-2xl border bg-white p-4 shadow-sm">
//             <h1 className="text-lg font-semibold text-gray-900">
//               {step === 0 && "Payment Gateway Configuration"}
//               {step === 1 && "Commission Management"}
//               {step === 2 && "Refund & Cancellation Policy"}
//             </h1>
//             <p className="mt-1 text-xs text-gray-500">
//               {step === 0 && "Select and integrate from available gateways: Razorpay / Stripe / PayPal / Paytm / Cashfree"}
//               {step === 1 && "Define commission % charged to vendors per booking"}
//               {step === 2 && "Set global refund defaults: 3 days, 7 days, 14 days, or custom"}
//             </p>
//             <div className="mt-4 grid grid-cols-2 gap-2 text-xs sm:grid-cols-4">
//               {tabs.map((tab, i) => (
//                 <div key={i} className={`rounded-xl border px-3 py-2 text-center ${i === 2 ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-gray-50"}`}>{tab}</div>
//               ))}
//             </div>
//           </header>

//           <Formik
//             initialValues={initialValues}
//             onSubmit={async (values, { setSubmitting }) => {
//               setSubmitting(true);
//               await new Promise((r) => setTimeout(r, 600));
//               save(values);
//               setSubmitting(false);
//             }}
//           >
//             {({ values, isSubmitting, validateForm }) => (
//               <Form className="space-y-5">
//                 {/* Step 0: Payment */}
//                 {step === 0 && (
//                   <>
//                     <Section title="Gateway Selection">
//                       <div>
//                         <Label htmlFor="payment.gateway">Select Gateway</Label>
//                         <Field as={SelectEl} id="payment.gateway" name="payment.gateway">
//                           <option value="">Select Razorpay / Stripe / PayPal / Paytm / Cashfree</option>
//                           {gateways.map((g) => (
//                             <option key={g} value={g}>{g}</option>
//                           ))}
//                         </Field>
//                         <ErrorMessage name="payment.gateway" component="div" className="mt-1 text-xs text-red-600" />
//                       </div>
//                     </Section>

//                     <Section title="API Configuration">
//                       <div className="grid gap-4 sm:grid-cols-2">
//                         <div>
//                           <Label htmlFor="payment.apiKey">API Key</Label>
//                           <Field as={Input} id="payment.apiKey" name="payment.apiKey" placeholder="Enter API Key" />
//                           <ErrorMessage name="payment.apiKey" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div>
//                           <Label htmlFor="payment.apiSecret">API Secret</Label>
//                           <Field as={Input} id="payment.apiSecret" name="payment.apiSecret" placeholder="Enter API Secret" />
//                           <ErrorMessage name="payment.apiSecret" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div className="sm:col-span-2">
//                           <Label htmlFor="payment.webhookUrl">Webhook Callback URL</Label>
//                           <Field as={Input} id="payment.webhookUrl" name="payment.webhookUrl" placeholder="https://…" />
//                           <ErrorMessage name="payment.webhookUrl" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div className="sm:col-span-2">
//                           <Label htmlFor="payment.compilerInput">Code Compiler Input</Label>
//                           <Field as={Textarea} id="payment.compilerInput" name="payment.compilerInput" rows={4} placeholder="Paste or write any input payload your code/compiler should receive during tests…" />
//                         </div>
//                       </div>
//                       {values.payment.gateway && (
//                         <p className="text-xs text-gray-500">Tip: {values.payment.gateway} often requires whitelisting the webhook domain.</p>
//                       )}
//                     </Section>

//                     <Section title="Gateway Settings">
//                       <div className="grid gap-4 sm:grid-cols-2">
//                         <div>
//                           <Label htmlFor="payment.currency">Default Currency</Label>
//                           <Field as={SelectEl} id="payment.currency" name="payment.currency">
//                             {currencies.map((c) => (
//                               <option key={c.code} value={c.code}>{c.code} — {c.label}</option>
//                             ))}
//                           </Field>
//                           <ErrorMessage name="payment.currency" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div className="flex items-end gap-3">
//                           <div className="flex flex-col"><Label>Enable Gateway</Label><Toggle name="payment.enableGateway" label="Enable Gateway" /></div>
//                           <div className="flex flex-col"><Label>Test Mode</Label><Toggle name="payment.testMode" label="Test Mode" /></div>
//                         </div>
//                         <div className="sm:col-span-2">
//                           <Label htmlFor="payment.txnLimit">Set Transaction Limit</Label>
//                           <Field as={Input} type="number" id="payment.txnLimit" name="payment.txnLimit" placeholder="e.g., 50000" />
//                           <ErrorMessage name="payment.txnLimit" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                       </div>
//                     </Section>

//                     <Section title="Gateway Status Dashboard">
//                       <div className="flex flex-wrap gap-3">
//                         {stats.map((s) => (<StatCard key={s.title} title={s.title} value={s.value} />))}
//                       </div>
//                     </Section>
//                   </>
//                 )}

//                 {/* Step 1: Commission */}
//                 {step === 1 && (
//                   <>
//                     <Section title="Commission by Category">
//                       <div className="space-y-3">
//                         {[
//                           { key: "banquet", label: "Banquet Halls" },
//                           { key: "catering", label: "Catering" },
//                           { key: "photography", label: "Photography" },
//                           { key: "decoration", label: "Decoration Services" },
//                           { key: "essential", label: "Essential Services" },
//                         ].map((f) => (
//                           <div key={f.key}>
//                             <Label htmlFor={`commission.${f.key}`}>{f.label}</Label>
//                             <Field as={Input} id={`commission.${f.key}`} name={`commission.${f.key}`} placeholder="Enter Commission %" />
//                             <ErrorMessage name={`commission.${f.key}`} component="div" className="mt-1 text-xs text-red-600" />
//                           </div>
//                         ))}
//                       </div>
//                     </Section>

//                     <Section title="Commission Type">
//                       <div className="grid gap-4 sm:grid-cols-2">
//                         <div>
//                           <Label htmlFor="commission.type">Select Commission Type</Label>
//                           <Field as={SelectEl} id="commission.type" name="commission.type">
//                             <option value="">Select Commission type</option>
//                             <option value="Flat">Flat</option>
//                             <option value="Tiered">Tiered</option>
//                             <option value="Vendor-specific">Vendor-specific</option>
//                           </Field>
//                           <ErrorMessage name="commission.type" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div className="flex items-end"><div className="flex flex-col"><Label>Dynamic Commission</Label><Toggle name="commission.dynamicCommission" label="Dynamic Commission" /></div></div>
//                       </div>
//                     </Section>

//                     <Section title="Historical Changes">
//                       <div className="rounded-xl border bg-gray-50 p-3 text-center text-xs text-gray-500">No historical changes recorded</div>
//                     </Section>
//                   </>
//                 )}

//                 {/* Step 2: Refund */}
//                 {step === 2 && (
//                   <>
//                     <Section title="Global Refund Default">
//                       <div>
//                         <Label htmlFor="refund.globalRefund">Refund Period</Label>
//                         <Field as={SelectEl} id="refund.globalRefund" name="refund.globalRefund">
//                           <option value="">Select 3 days, 7 days, 14 days</option>
//                           {refundOptions.map((r) => (
//                             <option key={r.value} value={r.value}>{r.label}</option>
//                           ))}
//                         </Field>
//                         <ErrorMessage name="refund.globalRefund" component="div" className="mt-1 text-xs text-red-600" />
//                       </div>
//                     </Section>

//                     <Section title="Refund Rules">
//                       <div className="grid gap-4 sm:grid-cols-2">
//                         <div>
//                           <Label htmlFor="refund.fullRefundDays">Full Refund Period</Label>
//                           <Field as={Input} id="refund.fullRefundDays" name="refund.fullRefundDays" placeholder="Enter days (e.g., 7+ days before event)" />
//                           <ErrorMessage name="refund.fullRefundDays" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div>
//                           <Label htmlFor="refund.partialRefundHours">Partial Refund Period</Label>
//                           <Field as={Input} id="refund.partialRefundHours" name="refund.partialRefundHours" placeholder="Enter hours (e.g., within 48 Hours)" />
//                           <ErrorMessage name="refund.partialRefundHours" component="div" className="mt-1 text-xs text-red-600" />
//                         </div>
//                         <div className="sm:col-span-2 flex items-center gap-3">
//                           <Label>No Refund on Event Day</Label>
//                           <Toggle name="refund.noRefundOnEventDay" label="No Refund on Event Day" />
//                         </div>
//                       </div>
//                     </Section>

//                     <Section title="Policy Overrides">
//                       <div className="grid gap-4 sm:grid-cols-2">
//                         <div>
//                           <Label htmlFor="refund.overrideVendor">Vendor/Service Type</Label>
//                           <Field as={SelectEl} id="refund.overrideVendor" name="refund.overrideVendor">
//                             <option value="">Select Vendor or Service Type</option>
//                             <option value="vendor_a">Vendor A</option>
//                             <option value="vendor_b">Vendor B</option>
//                           </Field>
//                         </div>
//                       </div>
//                     </Section>

//                     <Section title="Automated Refund Processing">
//                       <div className="flex items-center gap-3">
//                         <Label>Enable Automated Refunds</Label>
//                         <Toggle name="refund.autoRefunds" label="Enable Automated Refunds" />
//                       </div>
//                     </Section>
//                   </>
//                 )}

//                 {/* Actions & Stepper */}
//                 <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
//                   <div className="order-2 flex gap-2 sm:order-1">
//                     <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-xl border px-4 py-2 text-sm">
//                       {step === 0 ? "Cancel" : "Back"}
//                     </button>
//                     <button
//                       type="submit"
//                       onClick={async (e) => {
//                         // run step-level validation before saving
//                         e.preventDefault();
//                         let errors: any = {};
//                         if (step === 0) errors = validatePayment(values.payment);
//                         if (step === 1) errors = validateCommission(values.commission);
//                         if (step === 2) errors = validateRefund(values.refund);
//                         if (Object.keys(errors).length) {
//                           // trigger Formik validation render by touching a field indirectly
//                           await validateForm();
//                           setToast("Please fix form errors");
//                           setTimeout(() => setToast(null), 1500);
//                           return;
//                         }
//                         save(values);
//                       }}
//                       disabled={isSubmitting}
//                       className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
//                     >
//                       {isSubmitting ? "Saving…" : "Save"}
//                     </button>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => setStep((s) => Math.min(2, s + 1))}
//                     className="order-1 rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white sm:order-2"
//                   >
//                     Next
//                   </button>
//                 </div>

//                 {toast && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{toast}</div>}
//               </Form>
//             )}
//           </Formik>

//           <footer className="pb-6 text-center text-[10px] text-gray-400">Built with Next.js + TypeScript + Tailwind + Formik. Replace localStorage with your API.</footer>
//         </div>
//       </div>
//     </ProtectedRoute>
//   );
// };

// export default BookingPaymentsWizard;

'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import UserManagementSetting from "@/app/components/UserManagementSetting";
import VenueOwnerControls from "@/app/components/VenueOwnerControls";
import BookingPricing from "@/app/components/BookingPricing";
import PaymentTransaction from "@/app/components/PaymentTransaction";
import ProtectedRoute from "@/app/ProtectedRoute";
import SettingsIntegrationWizard from "@/app/components/SystemIntegration";
import Header from "@/app/components/Header";

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
  | "Payment & Transaction"
  | "System Integration";

const TABS: PanelName[] = [
  "General Settings",
  "User Management",
  "Venue Owner Controls",
  "Booking & Pricing",
  "Payment & Transaction",
  "System Integration",
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
      case "System Integration":
        return <SettingsIntegrationWizard />
      case "General Settings":
      default:
        return <GeneralSettingsPanel />;
    }
  };

  return (
    <ProtectedRoute requiredRole={['super_admin']}>
      <>
      <Header title="Settings"/>
      <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#efe6f4] flex">
        <main className="flex-1 p-6 md:p-3">
          {/* <header className="mb-6">
            <div className="bg-white p-6 rounded-xl shadow">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-semibold">Settings</h1>
                  <p className="text-sm text-gray-600 mt-1">Monitor and manage all venue bookings across the platform</p>
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
          </header> */}

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
      </>
    </ProtectedRoute>
  );
};

export default AdminSettings;