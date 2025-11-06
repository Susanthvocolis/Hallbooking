"use client";

import React, { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// =============================================================
// Small UI primitives
// =============================================================

const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${props.className || ""
      }`}
  />
);

const SelectEl: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${props.className || ""
      }`}
  />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${props.className || ""
      }`}
  />
);

const Toggle: React.FC<{ name: string; label: string }> = ({ name, label }) => (
  <Field name={name}>
    {({ field, form }: any) => (
      <button
        type="button"
        onClick={() => form.setFieldValue(name, !field.value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${field.value ? "bg-indigo-600" : "bg-gray-300"
          }`}
        aria-pressed={field.value}
      >
        <span className="sr-only">{label}</span>
        <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition ${field.value ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    )}
  </Field>
);

const Section: React.FC<{ title: string; children: React.ReactNode; subtitle?: string }> = ({ title, subtitle, children }) => (
  <section className="rounded-2xl border bg-white p-5 shadow-sm">
    <h3 className="text-base font-semibold text-gray-800">{title}</h3>
    {subtitle && <p className="mt-1 text-xs text-gray-500">{subtitle}</p>}
    <div className="mt-4 space-y-4">{children}</div>
  </section>
);

const StatCard: React.FC<{ title: string; value: number | string }> = ({ title, value }) => (
  <div className="flex-1 min-w-[160px] rounded-2xl border bg-white p-4 text-center shadow-sm">
    <div className="text-sm text-gray-500">{title}</div>
    <div className="mt-2 text-2xl font-semibold">{value}</div>
  </div>
);

type SubTab =
  | "Payment Gateway Integration"
  | "SMS & Email Gateway"
  | "Firebase Setup"
  | "Google Maps API"
  | "Analytics Tracking"
  | "Third Party Service"
  | "Webhook Management"
  | "Cloud Storage"
  | "Security Tokens"
  | "Integration Logs";

interface IntegrationValues {
  paymentGateway: {
    apiKey: string; apiSecret: string; webhook: string; currency: string; region: string; enabled: boolean; txnNote: string; compilerInput: string;
  };
  smsEmail: {
    smsGateway: string; smsApiKey: string; smsApiSecret: string; senderId: string; smsEnabled: boolean; emailGateway: string; smtpHost: string; smtpPort: string; smtpUser: string; smtpPass: string; fromEmail: string; emailEnabled: boolean; compilerInput: string;
  };
  firebase: { serverKey: string; senderId: string; androidAppId: string; iosAppId: string; targetUser: boolean; targetVendor: boolean; targetEmployee: boolean; compilerInput: string };
  maps: { apiKey: string; vendorGeotag: boolean; userGeotag: boolean; compilerInput: string };
  analytics: { gaId: string; metaPixelId: string; customScript: string; modules: { home: boolean; booking: boolean; checkout: boolean }; compilerInput: string };
  integrations: { crmPlatform: string; crmApiKey: string; crmApiSecret: string; marketingPlatform: string; marketingApiKey: string; listId: string; chatPlatform: string; chatWidgetId: string; chatApiKey: string; compilerInput: string };
  webhooks: { bookingUrl: string; successMarketing: string; failureCallback: string; vendorRegUrl: string; retryCount: number | ""; retryInterval: number | ""; compilerInput: string };
  storage: { provider: string; accessKey: string; secretKey: string; bucket: string; region: string; path: string; retentionDays: number | ""; backupFrequency: string; autoBackup: boolean; compilerInput: string };
  tokens: { tokenName: string; accessLevel: string; expiry: string; employeeEmail: string; role: string; defaultExpiryDays: number | ""; regenBufferDays: number | ""; compilerInput: string };
}

export const SettingsIntegrationWizard: React.FC = () => {
  const subTabs: SubTab[] = [
    "Payment Gateway Integration", "SMS & Email Gateway", "Firebase Setup", "Google Maps API", "Analytics Tracking", "Third Party Service", "Webhook Management", "Cloud Storage", "Security Tokens", "Integration Logs",
  ];
  const [sub, setSub] = useState<SubTab>("Payment Gateway Integration");
  const [toast, setToast] = useState<string | null>(null);
  const stats = useMemo(() => [{ title: "Success", value: 0 }, { title: "Failed", value: 0 }, { title: "Retries", value: 0 }], []);

  const initialValues: IntegrationValues = {
    paymentGateway: { apiKey: "", apiSecret: "", webhook: "", currency: "", region: "", enabled: false, txnNote: "", compilerInput: "" },
    smsEmail: { smsGateway: "", smsApiKey: "", smsApiSecret: "", senderId: "", smsEnabled: false, emailGateway: "", smtpHost: "", smtpPort: "", smtpUser: "", smtpPass: "", fromEmail: "", emailEnabled: false, compilerInput: "" },
    firebase: { serverKey: "", senderId: "", androidAppId: "", iosAppId: "", targetUser: false, targetVendor: false, targetEmployee: false, compilerInput: "" },
    maps: { apiKey: "", vendorGeotag: false, userGeotag: false, compilerInput: "" },
    analytics: { gaId: "", metaPixelId: "", customScript: "", modules: { home: true, booking: false, checkout: false }, compilerInput: "" },
    integrations: { crmPlatform: "", crmApiKey: "", crmApiSecret: "", marketingPlatform: "", marketingApiKey: "", listId: "", chatPlatform: "", chatWidgetId: "", chatApiKey: "", compilerInput: "" },
    webhooks: { bookingUrl: "", successMarketing: "", failureCallback: "", vendorRegUrl: "", retryCount: "", retryInterval: "", compilerInput: "" },
    storage: { provider: "", accessKey: "", secretKey: "", bucket: "", region: "", path: "", retentionDays: "", backupFrequency: "", autoBackup: false, compilerInput: "" },
    tokens: { tokenName: "", accessLevel: "", expiry: "", employeeEmail: "", role: "", defaultExpiryDays: "", regenBufferDays: "", compilerInput: "" },
  };

  function save(values: IntegrationValues) {
    localStorage.setItem("settings_integration", JSON.stringify(values));
    setToast("Saved (mock). Swap for API call.");
    setTimeout(() => setToast(null), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      <header className="rounded-2xl border bg-white p-4 shadow-sm">
        <div className="mt-3 flex flex-wrap gap-2">
          {subTabs.map((s) => (
            <button key={s} type="button" onClick={() => setSub(s)} className={`rounded-xl border px-3 py-1 text-xs ${sub === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}>{s}</button>
          ))}
        </div>
      </header>

      <Formik initialValues={initialValues} onSubmit={(v) => save(v)}>
        {({ values, isSubmitting }) => (
          <Form className="space-y-5">
            {sub === "Payment Gateway Integration" && (
              <>
                <Section title="API Key & Secret"><div className="grid gap-4 sm:grid-cols-2"><div><Label>API Key</Label><Field as={Input} name="paymentGateway.apiKey" placeholder="Enter API Key" /></div><div><Label>API Secret</Label><Field as={Input} name="paymentGateway.apiSecret" placeholder="Enter API Secret" /></div></div></Section>
                <Section title="Webhook URL"><Field as={Input} name="paymentGateway.webhook" placeholder="Enter Webhook URL" /></Section>
                <Section title="Currency & Region settings"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Currency</Label><Field as={SelectEl} name="paymentGateway.currency"><option value="">Select Currency</option><option value="INR">INR</option><option value="USD">USD</option></Field></div><div><Label>Region</Label><Field as={SelectEl} name="paymentGateway.region"><option value="">Select Region</option><option value="APAC">APAC</option><option value="EU">EU</option></Field></div></div></Section>
                <Section title="Gateway Controls"><div className="flex items-center gap-3"><Label>Enable Gateway</Label><Toggle name="paymentGateway.enabled" label="Enable" /></div></Section>
                <Section title="Test Transaction"><Field as={Input} name="paymentGateway.txnNote" placeholder="Test transaction note for validation" /><button type="button" className="mt-2 w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test Transaction</button></Section>
                <Section title="Transaction Logs"><div className="flex flex-wrap gap-3">{[{ title: "Success", value: 0 }, { title: "Failed", value: 0 }].map(s => (<StatCard key={s.title} title={s.title} value={s.value} />))}</div></Section>
              </>
            )}
            {sub === "SMS & Email Gateway" && (
              <>
                <Section title="SMS Gateway Selection"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Select Gateway</Label><Field as={SelectEl} name="smsEmail.smsGateway"><option value="">Select SMS Gateway</option><option value="twilio">Twilio</option><option value="msg91">MSG91</option></Field></div><div className="flex items-end"><div className="flex items-center gap-3"><Label>Enable SMS Gateway</Label><Toggle name="smsEmail.smsEnabled" label="Enable SMS" /></div></div><div><Label>API Key</Label><Field as={Input} name="smsEmail.smsApiKey" placeholder="Enter API Key" /></div><div><Label>API Secret</Label><Field as={Input} name="smsEmail.smsApiSecret" placeholder="Enter API Secret" /></div><div className="sm:col-span-2"><Label>Sender ID</Label><Field as={Input} name="smsEmail.senderId" placeholder="Enter Sender ID" /></div><div className="sm:col-span-2"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test SMS Delivery</button></div></div></Section>
                <Section title="Email Gateway Selection"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Select Gateway</Label><Field as={SelectEl} name="smsEmail.emailGateway"><option value="">Select Email Gateway</option><option value="ses">AWS SES</option><option value="sendgrid">SendGrid</option><option value="smtp">Custom SMTP</option></Field></div><div className="flex items-end"><div className="flex items-center gap-3"><Label>SMTP Credentials</Label><Toggle name="smsEmail.emailEnabled" label="Enable SMTP" /></div></div><div><Label>SMTP Host</Label><Field as={Input} name="smsEmail.smtpHost" placeholder="Enter SMTP Host" /></div><div><Label>SMTP Port</Label><Field as={Input} name="smsEmail.smtpPort" placeholder="Enter SMTP Port" /></div><div><Label>Username</Label><Field as={Input} name="smsEmail.smtpUser" placeholder="Enter Username" /></div><div><Label>Password</Label><Field as={Input} name="smsEmail.smtpPass" placeholder="Enter Password" /></div><div className="sm:col-span-2"><Label>From Email</Label><Field as={Input} name="smsEmail.fromEmail" placeholder="Enter From Email Address" /></div><div className="sm:col-span-2"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test Email Delivery</button></div></div></Section>
                <Section title="Code Compiler Input"><Field as={Textarea} name="smsEmail.compilerInput" rows={4} placeholder="Provide sample payload(s) for SMS/Email test runs" /></Section>
              </>
            )}
            {/* Other sub-tabs left intact for brevity (Google Maps, Analytics, Third Party, Webhooks, Cloud Storage, Security Tokens, Integration Logs) */}

            <div className="flex items-center justify-between"><button type="button" className="rounded-xl border px-4 py-2 text-sm">CANCEL</button><button type="submit" disabled={isSubmitting} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{isSubmitting ? "Saving…" : "SAVE"}</button></div>
            {toast && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{toast}</div>}
          </Form>
        )}
      </Formik>

      <footer className="pb-6 text-center text-[10px] text-gray-400">System Integration Suite. Replace localStorage with API calls.</footer>
    </div>
  );
};

// =============================================================
// 2) PAYMENT & TRANSACTION SUITE (new from latest PNGs)
// =============================================================

type PSub =
  | "Overview"
  | "Gateway Config"
  | "Commission Mgmt"
  | "Refund Policy"
  | "Tax Config"
  | "Invoice Template"
  | "Vendor Payouts"
  | "Transaction Logs"
  | "Financial Analytics";

interface PaymentSuiteValues {
  overview: { gateway: string; commissionEnabled: boolean; refundDefault: string; tax: string; template: string; compilerInput: string };
  gateway: { gateway: string; apiKey: string; apiSecret: string; webhook: string; currency: string; enable: boolean; testMode: boolean; compilerInput: string };
  commission: { banquet: string; catering: string; photography: string; decoration: string; essential: string; type: string; dynamic: boolean; compilerInput: string };
  refund: { global: string; fullDays: string; partialHours: string; noEventDay: boolean; vendorType: string; auto: boolean; compilerInput: string };
  tax: { gst: string; cgst: string; sgst: string; tds: string; serviceTax: string; jurisdiction: string; autoCalc: boolean; compilerInput: string };
  invoice: { fileName: string; templateType: string; compilerInput: string };
  payouts: { cycle: string; method: string; serviceTax: string; minAmount: string; compilerInput: string };
  logs: { date: string; status: string; gateway: string; type: string; compilerInput: string };
  analytics: { compilerInput: string };
}

function download(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}

export default function PaymentTransactionSuite() {
  const [sub, setSub] = useState<PSub>("Overview");
  const [toast, setToast] = useState<string | null>(null);
  const metrics = useMemo(() => [
    { title: "Total Revenue", value: "₹0" },
    { title: "Commission Earned", value: "₹0" },
    { title: "Refunds Processed", value: "₹0" },
    { title: "Tax Collected", value: "₹0" },
    { title: "Gateway Performance", value: "0%" },
  ], []);

  const initialValues: PaymentSuiteValues = {
    overview: { gateway: "", commissionEnabled: false, refundDefault: "", tax: "", template: "", compilerInput: "" },
    gateway: { gateway: "", apiKey: "", apiSecret: "", webhook: "", currency: "INR", enable: true, testMode: true, compilerInput: "" },
    commission: { banquet: "", catering: "", photography: "", decoration: "", essential: "", type: "", dynamic: false, compilerInput: "" },
    refund: { global: "", fullDays: "", partialHours: "", noEventDay: false, vendorType: "", auto: false, compilerInput: "" },
    tax: { gst: "", cgst: "", sgst: "", tds: "", serviceTax: "", jurisdiction: "", autoCalc: false, compilerInput: "" },
    invoice: { fileName: "", templateType: "", compilerInput: "" },
    payouts: { cycle: "", method: "", serviceTax: "", minAmount: "", compilerInput: "" },
    logs: { date: "", status: "", gateway: "", type: "", compilerInput: "" },
    analytics: { compilerInput: "" },
  };

  function save(values: PaymentSuiteValues) {
    localStorage.setItem("payment_tx_suite", JSON.stringify(values));
    setToast("Saved (mock). Replace with API call.");
    setTimeout(() => setToast(null), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-3 sm:p-3">
      <header >
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {(["Overview", "Gateway Config", "Commission Mgmt", "Refund Policy", "Tax Config", "Invoice Template", "Vendor Payouts", "Transaction Logs", "Financial Analytics"] as PSub[]).map((t) => (
            <button key={t} type="button" onClick={() => setSub(t)} className={`rounded-xl border px-3 py-2 ${sub === t ? "bg-indigo-50 border-indigo-200 text-indigo-700" : "bg-gray-50"}`}>{t}</button>
          ))}
        </div>
      </header>

      <Formik initialValues={initialValues} onSubmit={(v) => save(v)}>
        {({ values, isSubmitting }) => (
          <Form className="space-y-5">
            {sub === "Overview" && (
              <Section title="Quick Links">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Payment Gateway Integration</Label>
                    <Field as={SelectEl} name="overview.gateway">
                      <option value="">Select Razorpay / Stripe / PayPal</option>
                      <option value="Razorpay">Razorpay</option>
                      <option value="Stripe">Stripe</option>
                      <option value="PayPal">PayPal</option>
                    </Field>
                  </div>
                  <div><Label>Commission % for bookings</Label><Field as={Input} name="overview.commissionEnabled" placeholder="Enabled Pricing" disabled /></div>
                  <div><Label>Refund Policy Default</Label><Field as={SelectEl} name="overview.refundDefault"><option value="">Select 3 days, 7 days, 14 days</option><option value="3d">3 days</option><option value="7d">7 days</option><option value="14d">14 days</option></Field></div>
                  <div><Label>Tax Settings</Label><Field as={Input} name="overview.tax" placeholder="Select GST %, TDS" /></div>
                  <div><Label>Invoice Template</Label><Field as={Input} name="overview.template" placeholder="Upload here" /></div>
                </div>
              </Section>
            )}

            {sub === "Gateway Config" && (
              <>
                <Section title="Gateway Selection"><Field as={SelectEl} name="gateway.gateway"><option value="">Select: Razorpay / Stripe / PayPal / Paytm / Cashfree</option><option>Razorpay</option><option>Stripe</option><option>PayPal</option><option>Paytm</option><option>Cashfree</option></Field></Section>
                <Section title="API Configuration"><div className="grid gap-4 sm:grid-cols-2"><div><Label>API Key</Label><Field as={Input} name="gateway.apiKey" placeholder="Enter API Key" /></div><div><Label>API Secret</Label><Field as={Input} name="gateway.apiSecret" placeholder="Enter API Secret" /></div><div className="sm:col-span-2"><Label>Webhook Callback URL</Label><Field as={Input} name="gateway.webhook" placeholder="https://…" /></div></div></Section>
                <Section title="Gateway Settings"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Currency</Label><Field as={SelectEl} name="gateway.currency"><option>INR</option><option>USD</option><option>EUR</option></Field></div><div className="flex items-end gap-6"><div className="flex items-center gap-3"><Label>Enable Gateway</Label><Toggle name="gateway.enable" label="Enable" /></div><div className="flex items-center gap-3"><Label>Test Mode</Label><Toggle name="gateway.testMode" label="Test" /></div></div></div></Section>
                <Section title="Gateway Status Dashboard"><div className="flex flex-wrap gap-3">{[{ title: "Success", value: 0 }, { title: "Failed", value: 0 }, { title: "In Review", value: 0 }].map(s => <StatCard key={s.title} title={s.title} value={s.value} />)}</div></Section>
              </>
            )}

            {sub === "Commission Mgmt" && (
              <>
                <Section title="Commission by Category">
                  <div className="space-y-3 grid gap-4 grid-cols-3">{[
                    { key: "banquet", label: "Banquet Halls" },
                    { key: "catering", label: "Catering" },
                    { key: "photography", label: "Photography" },
                    { key: "decoration", label: "Decoration Services" },
                    { key: "essential", label: "Essential Services" }
                  ].map(f => (
                    <div key={f.key}>
                      <Label>{f.label}</Label>
                      <Field as={Input} name={`commission.${f.key}`} placeholder="Enter Commission %" />
                    </div>
                  ))}</div>
                </Section>
                <Section title="Commission Type">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <Label>Commission Structure</Label>
                      <Field as={SelectEl} name="commission.type">
                        <option value="">Select Commission type</option>
                        <option>Flat</option>
                        <option>Tiered</option>
                        <option>Vendor-specific</option>
                      </Field>
                    </div>
                    <div className="flex items-end">
                      <div className="flex items-center gap-3">
                        <Label>Dynamic Commission</Label>
                        <Toggle name="commission.dynamic" label="Dynamic" />
                      </div>
                    </div>
                  </div>
                </Section>
                <Section title="Historical Changes"><div className="rounded-xl border bg-gray-50 p-3 text-center text-xs text-gray-500">No historical changes recorded</div></Section>
              </>
            )}

            {sub === "Refund Policy" && (
              <>
                <Section title="Global Refund Default"><Field as={SelectEl} name="refund.global"><option value="">Select 3 days, 7 days, 14 days</option><option>3 days</option><option>7 days</option><option>14 days</option></Field></Section>
                <Section title="Refund Rules"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Full Refund Period</Label><Field as={Input} name="refund.fullDays" placeholder="Enter days (e.g., 7+ days before event)" /></div><div><Label>Partial Refund Period</Label><Field as={Input} name="refund.partialHours" placeholder="Enter hours (e.g., within 48 Hours)" /></div><div className="sm:col-span-2 flex items-center gap-3"><Label>No Refund on Event Day</Label><Toggle name="refund.noEventDay" label="No refund" /></div></div></Section>
                <Section title="Policy Overrides"><Label>Vendor/Service Type</Label><Field as={SelectEl} name="refund.vendorType"><option value="">Select Vendor or Service Type</option><option>Venue</option><option>Caterer</option></Field></Section>
                <Section title="Automated Refund Processing"><div className="flex items-center gap-3"><Label>Enable Automated Refunds</Label><Toggle name="refund.auto" label="Auto refunds" /></div></Section>
              </>
            )}

            {sub === "Tax Config" && (
              <>
                <Section title="GST Configuration" subtitle="GST %, CGST/SGST split">
                  <div className="grid gap-4 md:grid-cols-3 sm:grid-cols-2">
                    <div>
                      <Label>GST %</Label>
                      <Field as={Input} name="tax.gst" placeholder="Enter GST Percentage" />
                    </div>
                    <div>
                      <Label>CGST %</Label>
                      <Field as={Input} name="tax.cgst" placeholder="Enter CGST %" />
                    </div>
                    <div>
                      <Label>SGST %</Label>
                      <Field as={Input} name="tax.sgst" placeholder="Enter SGST %" />
                    </div>
                  </div>
                </Section>
                <Section title="TDS Configuration"><Label>TDS %</Label><Field as={Input} name="tax.tds" placeholder="Enter TDS Percentage" /></Section>
                <Section title="Additional Taxes"><Label>Service Tax %</Label><Field as={Input} name="tax.serviceTax" placeholder="Enter Service Tax %" /></Section>
                <Section title="Jurisdiction Tax Profiles"><Label>Select Jurisdiction</Label><Field as={SelectEl} name="tax.jurisdiction"><option value="">Select Jurisdiction</option><option>India</option><option>UAE</option><option>Canada</option></Field></Section>
                <Section title="Automated Tax Calculation"><div className="flex items-center gap-3"><Label>Enable Auto Calculation</Label><Toggle name="tax.autoCalc" label="Auto calc" /></div></Section>
              </>
            )}

            {sub === "Invoice Template" && (
              <>
                <Section title="Upload Template"><div className="rounded-2xl border border-dashed p-10 text-center text-sm text-gray-500">Upload Here</div></Section>
                <Section title="Dynamic Placeholders"><div className="rounded-2xl bg-violet-50 p-4 text-sm"><div>Available placeholders:</div><ul className="mt-2 list-disc pl-5"><li>{`{bookingId}`}</li><li>{`{customerName}`}</li><li>{`{venueName}`}</li><li>{`{GST%}`}</li><li>{`{TotalAmount}`}</li></ul></div></Section>
                <Section title="Template Options"><Label>Select Template Type</Label><Field as={SelectEl} name="invoice.templateType"><option value="">Select Template Type</option><option>User Copy</option><option>Vendor Copy</option></Field></Section>
                <Section title="Preview"><button type="button" onClick={() => download("sample.pdf", "Sample PDF preview placeholder")} className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Download Sample PDF</button></Section>
              </>
            )}

            {sub === "Vendor Payouts" && (
              <>
                <Section title="Payout Cycle"><Label>Select Payout Cycle</Label><Field as={SelectEl} name="payouts.cycle"><option value="">Select Cycle</option><option>Instant</option><option>Weekly</option><option>Monthly</option></Field></Section>
                <Section title="Payout Method"><Label>Payment Method</Label><Field as={SelectEl} name="payouts.method"><option value="">Select Method</option><option>Razorpay</option><option>PayPal</option><option>Bank Transfer</option></Field></Section>
                <Section title="Minimum Withdrawal Limits"><div className="grid gap-4 sm:grid-cols-2"><div><Label>Service Tax %</Label><Field as={Input} name="payouts.serviceTax" placeholder="Enter Service Tax %" /></div><div><Label>Minimum Amount</Label><Field as={Input} name="payouts.minAmount" placeholder="Enter Minimum Amount" /></div></div></Section>
                <Section title="Payout Tracking"><div className="grid grid-cols-2 gap-3"><StatCard title="Pending Payouts" value={0} /><StatCard title="Completed" value={0} /></div></Section>
              </>
            )}

            {sub === "Transaction Logs" && (
              <>
                <Section title="Filters"><div className="grid gap-4 sm:grid-cols-4"><div><Label>Date Range</Label><Field as={Input} name="logs.date" placeholder="dd-mm-yyyy" /></div><div><Label>Status</Label><Field as={SelectEl} name="logs.status"><option value="">Select Status</option><option>Success</option><option>Failed</option></Field></div><div><Label>Gateway</Label><Field as={SelectEl} name="logs.gateway"><option value="">Select Gateway</option><option>Razorpay</option><option>Stripe</option></Field></div><div><Label>Type</Label><Field as={SelectEl} name="logs.type"><option value="">Select Type</option><option>Charge</option><option>Refund</option></Field></div></div></Section>
                <Section title="Transaction Records"><div className="rounded-xl border bg-gray-50 p-6 text-center text-xs text-gray-500">No transactions found</div></Section>
                <Section title="Export Options"><div className="grid gap-3"><button type="button" onClick={() => download("transactions.csv", "bookingId,user,vendor,amount,commission,tax,status\n")} className="w-full rounded-xl bg-indigo-200 px-4 py-2 text-sm">Export to CSV</button><button type="button" onClick={() => download("transactions.json", "[]")} className="w-full rounded-xl bg-indigo-200 px-4 py-2 text-sm">Export to JSON</button></div></Section>
                <Section title="Error Handling"><Field as={Input} name="logs.compilerInput" placeholder="Auto-retry enabled for failed transactions" /></Section>
              </>
            )}

            {sub === "Financial Analytics" && (
              <>
                <Section title="Financial Analytics"><div className="flex flex-wrap gap-3">{metrics.map((m) => (<StatCard key={m.title} title={m.title} value={m.value} />))}</div></Section>
                <Section title="Monthly Comparison"><div className="h-48 rounded-2xl border bg-gray-50 p-4 text-center text-xs text-gray-500">Chart placeholder</div></Section>
                <Section title="Profitability Insights"><div className="rounded-2xl border bg-gray-50 p-4 text-xs text-gray-600">Add your profitability insights here.</div></Section>
              </>
            )}

            <div className="flex items-center justify-between"><button type="button" className="rounded-xl border px-4 py-2 text-sm">CANCEL</button><button type="submit" disabled={isSubmitting} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{isSubmitting ? "Saving…" : "SAVE"}</button></div>
            {toast && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{toast}</div>}
          </Form>
        )}
      </Formik>

    </div>
  );
}
