"use client";

import React, { useMemo, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

// =====================================
// Types
// =====================================


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

interface WizardValues {
  // Payment Gateway Integration
  paymentGateway: {
    apiKey: string;
    apiSecret: string;
    webhook: string;
    currency: string;
    region: string;
    enabled: boolean;
    txnNote: string;
  };

  // SMS & Email
  smsEmail: {
    smsGateway: string;
    smsApiKey: string;
    smsApiSecret: string;
    senderId: string;
    smsEnabled: boolean;

    emailGateway: string;
    smtpHost: string;
    smtpPort: string;
    smtpUser: string;
    smtpPass: string;
    fromEmail: string;
    emailEnabled: boolean;
  };

  // Firebase
  firebase: {
    serverKey: string;
    senderId: string;
    androidAppId: string;
    iosAppId: string;
    targetUser: boolean;
    targetVendor: boolean;
    targetEmployee: boolean;
  };

  // Google Maps API
  maps: {
    apiKey: string;
    vendorGeotag: boolean;
    userGeotag: boolean;
  };

  // Analytics
  analytics: {
    gaId: string;
    metaPixelId: string;
    customScript: string;
    modules: { home: boolean; booking: boolean; checkout: boolean };
  };

  // Third Party Service (CRM/Marketing/Chat)
  integrations: {
    crmPlatform: string;
    crmApiKey: string;
    crmApiSecret: string;

    marketingPlatform: string;
    marketingApiKey: string;
    listId: string;

    chatPlatform: string;
    chatWidgetId: string;
    chatApiKey: string;
  };

  // Webhooks
  webhooks: {
    bookingUrl: string;
    successMarketing: string;
    failureCallback: string;
    vendorRegUrl: string;
    retryCount: number | "";
    retryInterval: number | "";
  };

  // Cloud Storage
  storage: {
    provider: string;
    accessKey: string;
    secretKey: string;
    bucket: string;
    region: string;
    path: string;
    retentionDays: number | "";
    backupFrequency: string;
    autoBackup: boolean;
  };

  // Security Tokens
  tokens: {
    tokenName: string;
    accessLevel: string;
    expiry: string;
    employeeEmail: string;
    role: string;
    defaultExpiryDays: number | "";
    regenBufferDays: number | "";
  };
}

// =====================================
// Small UI primitives
// =====================================

const Label: React.FC<{ htmlFor?: string; children: React.ReactNode }> = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-gray-700">
    {children}
  </label>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
  <input
    {...props}
    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${
      props.className || ""
    }`}
  />
);

const SelectEl: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = (props) => (
  <select
    {...props}
    className={`w-full rounded-xl border bg-white px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${
      props.className || ""
    }`}
  />
);

const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = (props) => (
  <textarea
    {...props}
    className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none ring-indigo-600/30 transition focus:ring-4 ${
      props.className || ""
    }`}
  />
);

const Toggle: React.FC<{ name: string; label: string }> = ({ name, label }) => (
  <Field name={name}>
    {({ field, form }: any) => (
      <button
        type="button"
        onClick={() => form.setFieldValue(name, !field.value)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
          field.value ? "bg-indigo-600" : "bg-gray-300"
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

// =====================================
// Component
// =====================================

const SettingsIntegrationWizard: React.FC = () => {
  const subTabs: SubTab[] = [
    "Payment Gateway Integration",
    "SMS & Email Gateway",
    "Firebase Setup",
    "Google Maps API",
    "Analytics Tracking",
    "Third Party Service",
    "Webhook Management",
    "Cloud Storage",
    "Security Tokens",
    "Integration Logs",
  ];

  const [sub, setSub] = useState<SubTab>("Payment Gateway Integration");
  const [toast, setToast] = useState<string | null>(null);

  const stats = useMemo(() => [{ title: "Success", value: 0 }, { title: "Failed", value: 0 }, { title: "Retries", value: 0 }], []);

  const initialValues: WizardValues = {
    paymentGateway: {
      apiKey: "",
      apiSecret: "",
      webhook: "",
      currency: "",
      region: "",
      enabled: false,
      txnNote: "",
    },
    smsEmail: {
      smsGateway: "",
      smsApiKey: "",
      smsApiSecret: "",
      senderId: "",
      smsEnabled: false,
      emailGateway: "",
      smtpHost: "",
      smtpPort: "",
      smtpUser: "",
      smtpPass: "",
      fromEmail: "",
      emailEnabled: false,
    },
    firebase: {
      serverKey: "",
      senderId: "",
      androidAppId: "",
      iosAppId: "",
      targetUser: false,
      targetVendor: false,
      targetEmployee: false,
    },
    maps: { apiKey: "", vendorGeotag: false, userGeotag: false },
    analytics: {
      gaId: "",
      metaPixelId: "",
      customScript: "",
      modules: { home: true, booking: false, checkout: false },
    },
    integrations: {
      crmPlatform: "",
      crmApiKey: "",
      crmApiSecret: "",
      marketingPlatform: "",
      marketingApiKey: "",
      listId: "",
      chatPlatform: "",
      chatWidgetId: "",
      chatApiKey: "",
    },
    webhooks: {
      bookingUrl: "",
      successMarketing: "",
      failureCallback: "",
      vendorRegUrl: "",
      retryCount: "",
      retryInterval: "",
    },
    storage: {
      provider: "",
      accessKey: "",
      secretKey: "",
      bucket: "",
      region: "",
      path: "",
      retentionDays: "",
      backupFrequency: "",
      autoBackup: false,
    },
    tokens: {
      tokenName: "",
      accessLevel: "",
      expiry: "",
      employeeEmail: "",
      role: "",
      defaultExpiryDays: "",
      regenBufferDays: "",
    },
  };

  function save(values: WizardValues) {
    localStorage.setItem("settings_wizard", JSON.stringify(values));
    setToast("Saved (mock). Swap for API call.");
    setTimeout(() => setToast(null), 1500);
  }

  return (
    <div className="mx-auto max-w-5xl space-y-5 p-4 sm:p-6">
      {/* <header className="rounded-2xl border bg-white p-4 shadow-sm"> */}
        <div className="flex flex-wrap gap-2">
          {subTabs.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSub(s)}
              className={`rounded-xl border px-3 py-1 text-xs ${sub === s ? "bg-indigo-600 text-white border-indigo-600" : "bg-white"}`}
            >
              {s}
            </button>
          ))}
        </div>
      {/* </header> */}

      <Formik initialValues={initialValues} onSubmit={(v) => save(v)}>
        {({ values, isSubmitting }) => (
          <Form className="space-y-5">
            {/* ================= Payment Gateway Integration ================= */}
            {sub === "Payment Gateway Integration" && (
              <>
                <Section title="API Key & Secret">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label htmlFor="paymentGateway.apiKey">API Key</Label><Field as={Input} id="paymentGateway.apiKey" name="paymentGateway.apiKey" placeholder="Enter API Key" /></div>
                    <div><Label htmlFor="paymentGateway.apiSecret">API Secret</Label><Field as={Input} id="paymentGateway.apiSecret" name="paymentGateway.apiSecret" placeholder="Enter API Secret" /></div>
                  </div>
                </Section>
                <Section title="Webhook URL"><div><Label htmlFor="paymentGateway.webhook">Webhook URL</Label><Field as={Input} id="paymentGateway.webhook" name="paymentGateway.webhook" placeholder="Enter Webhook URL" /></div></Section>
                <Section title="Currency & Region settings">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label htmlFor="paymentGateway.currency">Currency</Label><Field as={SelectEl} id="paymentGateway.currency" name="paymentGateway.currency"><option value="">Select Currency</option><option value="INR">INR</option><option value="USD">USD</option><option value="EUR">EUR</option></Field></div>
                    <div><Label htmlFor="paymentGateway.region">Region</Label><Field as={SelectEl} id="paymentGateway.region" name="paymentGateway.region"><option value="">Select Region</option><option value="APAC">APAC</option><option value="EU">EU</option><option value="US">US</option></Field></div>
                  </div>
                </Section>
                <Section title="Gateway Controls">
                  <div className="flex items-center gap-3"><Label>Enable Gateway</Label><Toggle name="paymentGateway.enabled" label="Enable Gateway" /></div>
                </Section>
                <Section title="Test Transaction">
                  <div className="grid gap-3">
                    <Field as={Input} name="paymentGateway.txnNote" placeholder="Test transaction note for validation" />
                    <button type="button" className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test Transaction</button>
                  </div>
                </Section>
                <Section title="Transaction Logs">
                  <div className="flex flex-wrap gap-3">{stats.map((s) => (<StatCard key={s.title} title={s.title} value={s.value} />))}</div>
                </Section>
              </>
            )}

            {/* ================= SMS & Email Gateway ================= */}
            {sub === "SMS & Email Gateway" && (
              <>
                <Section title="SMS Gateway Selection">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label htmlFor="smsEmail.smsGateway">Select Gateway</Label><Field as={SelectEl} id="smsEmail.smsGateway" name="smsEmail.smsGateway"><option value="">Select SMS Gateway</option><option value="twilio">Twilio</option><option value="msg91">MSG91</option></Field></div>
                    <div className="flex items-end"><div className="flex items-center gap-3"><Label>Enable SMS Gateway</Label><Toggle name="smsEmail.smsEnabled" label="Enable SMS" /></div></div>
                    <div><Label htmlFor="smsEmail.smsApiKey">API Key</Label><Field as={Input} id="smsEmail.smsApiKey" name="smsEmail.smsApiKey" placeholder="Enter API Key" /></div>
                    <div><Label htmlFor="smsEmail.smsApiSecret">API Secret</Label><Field as={Input} id="smsEmail.smsApiSecret" name="smsEmail.smsApiSecret" placeholder="Enter API Secret" /></div>
                    <div className="sm:col-span-2"><Label htmlFor="smsEmail.senderId">Sender ID</Label><Field as={Input} id="smsEmail.senderId" name="smsEmail.senderId" placeholder="Enter Sender ID" /></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test SMS Delivery</button></div>
                  </div>
                </Section>

                <Section title="Email Gateway Selection">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label htmlFor="smsEmail.emailGateway">Select Gateway</Label><Field as={SelectEl} id="smsEmail.emailGateway" name="smsEmail.emailGateway"><option value="">Select Email Gateway</option><option value="ses">AWS SES</option><option value="sendgrid">SendGrid</option><option value="smtp">Custom SMTP</option></Field></div>
                    <div className="flex items-end"><div className="flex items-center gap-3"><Label>SMTP Credentials</Label><Toggle name="smsEmail.emailEnabled" label="Enable SMTP" /></div></div>
                    <div><Label>SMTP Host</Label><Field as={Input} name="smsEmail.smtpHost" placeholder="Enter SMTP Host" /></div>
                    <div><Label>SMTP Port</Label><Field as={Input} name="smsEmail.smtpPort" placeholder="Enter SMTP Port" /></div>
                    <div><Label>Username</Label><Field as={Input} name="smsEmail.smtpUser" placeholder="Enter Username" /></div>
                    <div><Label>Password</Label><Field as={Input} name="smsEmail.smtpPass" placeholder="Enter Password" /></div>
                    <div className="sm:col-span-2"><Label>From Email</Label><Field as={Input} name="smsEmail.fromEmail" placeholder="Enter From Email Address" /></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test Email Delivery</button></div>
                  </div>
                </Section>
              </>
            )}

            {/* ================= Firebase Setup ================= */}
            {sub === "Firebase Setup" && (
              <>
                <Section title="Firebase Server Key"><Field as={Input} name="firebase.serverKey" placeholder="Enter Firebase Server Key" /></Section>
                <Section title="Sender ID"><Field as={Input} name="firebase.senderId" placeholder="Enter Sender ID" /></Section>
                <Section title="App IDs">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Android App ID</Label><Field as={Input} name="firebase.androidAppId" placeholder="Enter Android App ID" /></div>
                    <div><Label>iOS App ID</Label><Field as={Input} name="firebase.iosAppId" placeholder="Enter iOS App ID" /></div>
                  </div>
                </Section>
                <Section title="Test Push Button"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Send Test Push Notification</button></Section>
                <Section title="Targeted Modules">
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2"><Field type="checkbox" name="firebase.targetUser" /> User App</label>
                    <label className="flex items-center gap-2"><Field type="checkbox" name="firebase.targetVendor" /> Vendor App</label>
                    <label className="flex items-center gap-2"><Field type="checkbox" name="firebase.targetEmployee" /> Employee App</label>
                  </div>
                </Section>
              </>
            )}

            {/* ================= Google Maps API ================= */}
            {sub === "Google Maps API" && (
              <>
                <Section title="Google Maps API Key"><Field as={Input} name="maps.apiKey" placeholder="Enter Google Maps API Key" /></Section>
                <Section title="Geo-tagging Settings">
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2"><Field type="checkbox" name="maps.vendorGeotag" /> Enable Geo-tagging for Vendors</label>
                    <label className="flex items-center gap-2"><Field type="checkbox" name="maps.userGeotag" /> Enable Geo-tagging for Users</label>
                  </div>
                </Section>
                <Section title="API Status Test"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test API Connection</button><div className="rounded-xl border bg-gray-50 p-3 text-xs text-gray-500">API Status will appear here</div></Section>
              </>
            )}

            {/* ================= Analytics Tracking ================= */}
            {sub === "Analytics Tracking" && (
              <>
                <Section title="Tracking IDs">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Google Analytics ID</Label><Field as={Input} name="analytics.gaId" placeholder="Enter Google Analytics ID" /></div>
                    <div><Label>Meta Pixel ID</Label><Field as={Input} name="analytics.metaPixelId" placeholder="Enter Meta Pixel ID" /></div>
                    <div className="sm:col-span-2"><Label>Custom Tracking Script</Label><Field as={Textarea} name="analytics.customScript" rows={3} placeholder="Enter Custom Tracking Script" /></div>
                  </div>
                </Section>
                <Section title="Module Selection">
                  <div className="space-y-2 text-sm">
                    <label className="flex items-center gap-2"><Field type="checkbox" name="analytics.modules.home" /> Home</label>
                    <label className="flex items-center gap-2"><Field type="checkbox" name="analytics.modules.booking" /> Booking</label>
                    <label className="flex items-center gap-2"><Field type="checkbox" name="analytics.modules.checkout" /> Checkout</label>
                  </div>
                </Section>
                <Section title="Event Log Validation"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Validate Event Logs</button></Section>
                <Section title="Site Performance Metrics"><div className="flex flex-wrap gap-3">{[{title:"Page views",value:0},{title:"Clicks",value:0},{title:"Conversions",value:0}].map((s)=> (<StatCard key={s.title} title={s.title} value={s.value} />))}</div></Section>
              </>
            )}

            {/* ================= Third Party Service ================= */}
            {sub === "Third Party Service" && (
              <>
                <Section title="CRM Integration">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Select CRM</Label><Field as={SelectEl} name="integrations.crmPlatform"><option value="">Select CRM platform</option><option value="hubspot">HubSpot</option><option value="salesforce">Salesforce</option></Field></div>
                    <div><Label>API Key</Label><Field as={Input} name="integrations.crmApiKey" placeholder="Enter API Key" /></div>
                    <div className="sm:col-span-2"><Label>API Secret</Label><Field as={Input} name="integrations.crmApiSecret" placeholder="Enter API Secret" /></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl border px-4 py-2 text-sm">Test Connection</button></div>
                  </div>
                </Section>

                <Section title="Marketing Automation">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Select Platform</Label><Field as={SelectEl} name="integrations.marketingPlatform"><option value="">Select marketing platform</option><option value="mailchimp">Mailchimp</option><option value="klaviyo">Klaviyo</option></Field></div>
                    <div><Label>API Key</Label><Field as={Input} name="integrations.marketingApiKey" placeholder="Enter API Key" /></div>
                    <div className="sm:col-span-2"><Label>List ID / Audience ID</Label><Field as={Input} name="integrations.listId" placeholder="Enter list/audience ID" /></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl border px-4 py-2 text-sm">Test Connection</button></div>
                  </div>
                </Section>

                <Section title="Chat Support">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Select Chat Platform</Label><Field as={SelectEl} name="integrations.chatPlatform"><option value="">Select Chat Platform</option><option value="intercom">Intercom</option><option value="freshchat">Freshchat</option></Field></div>
                    <div><Label>Widget/Property ID</Label><Field as={Input} name="integrations.chatWidgetId" placeholder="Enter Widget/Property ID" /></div>
                    <div className="sm:col-span-2"><Label>API Key</Label><Field as={Input} name="integrations.chatApiKey" placeholder="Enter API Key" /></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl border px-4 py-2 text-sm">Test Connection</button></div>
                  </div>
                </Section>
              </>
            )}

            {/* ================= Webhook Management ================= */}
            {sub === "Webhook Management" && (
              <>
                <Section title="Booking Confirmation Webhook"><Field as={Input} name="webhooks.bookingUrl" placeholder="Enter Webhook URL for book" /><button type="button" className="mt-2 w-full rounded-xl border px-4 py-2 text-sm">Test Webhook</button></Section>
                <Section title="Payment Success/Failure Webhook">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Success Webhook URL</Label><Field as={Input} name="webhooks.successMarketing" placeholder="Select marketing platform / URL" /></div>
                    <div><Label>Failure Callback URL</Label><Field as={Input} name="webhooks.failureCallback" placeholder="Enter Callback URL" /></div>
                  </div>
                  <button type="button" className="mt-2 w-full rounded-xl border px-4 py-2 text-sm">Test Webhook</button>
                </Section>
                <Section title="New Vendor Registration Webhook"><Field as={Input} name="webhooks.vendorRegUrl" placeholder="Enter Webhook URL for new" /><button type="button" className="mt-2 w-full rounded-xl border px-4 py-2 text-sm">Test Webhook</button></Section>
                <Section title="Retry Mechanism">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Max Retry Attempts</Label><Field as={Input} type="number" name="webhooks.retryCount" placeholder="0" /></div>
                    <div><Label>Retry Interval (seconds)</Label><Field as={Input} type="number" name="webhooks.retryInterval" placeholder="0" /></div>
                  </div>
                </Section>
              </>
            )}

            {/* ================= Cloud Storage ================= */}
            {sub === "Cloud Storage" && (
              <>
                <Section title="Storage Provider"><Field as={SelectEl} name="storage.provider"><option value="">Select Storage Provider</option><option value="s3">AWS S3</option><option value="gcs">Google Cloud Storage</option><option value="azure">Azure Blob</option></Field></Section>
                <Section title="Storage Credentials">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Access Key ID</Label><Field as={Input} name="storage.accessKey" placeholder="Enter Access Key ID" /></div>
                    <div><Label>Secret Access Key</Label><Field as={Input} name="storage.secretKey" placeholder="Enter Secret Access Key" /></div>
                    <div><Label>Bucket Name</Label><Field as={Input} name="storage.bucket" placeholder="Enter Bucket Name" /></div>
                    <div><Label>Region</Label><Field as={Input} name="storage.region" placeholder="Enter Region" /></div>
                    <div className="sm:col-span-2"><Label>Bucket Path/Folder</Label><Field as={Input} name="storage.path" placeholder="Enter Bucket Path/Folder" /></div>
                  </div>
                </Section>
                <Section title="Data Retention Settings">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Data Retention Period (days)</Label><Field as={Input} type="number" name="storage.retentionDays" placeholder="0" /></div>
                    <div><Label>Backup Frequency</Label><Field as={SelectEl} name="storage.backupFrequency"><option value="">Select Backup Frequency</option><option value="daily">Daily</option><option value="weekly">Weekly</option><option value="monthly">Monthly</option></Field></div>
                  </div>
                  <div className="mt-2 flex items-center gap-3"><Label>Auto-Backup Enabled</Label><Toggle name="storage.autoBackup" label="Enable Auto Backup" /></div>
                </Section>
                <Section title="Connection Test"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Test Storage Connection</button></Section>
              </>
            )}

            {/* ================= Security Tokens ================= */}
            {sub === "Security Tokens" && (
              <>
                <Section title="Generate New Token">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Token Name</Label><Field as={Input} name="tokens.tokenName" placeholder="Enter Token Name" /></div>
                    <div><Label>Access Level</Label><Field as={SelectEl} name="tokens.accessLevel"><option value="">Select Access Level</option><option value="read">Read</option><option value="write">Write</option><option value="admin">Admin</option></Field></div>
                    <div className="sm:col-span-2"><Label>Expiry Date</Label><Field as={Input} name="tokens.expiry" placeholder="DD-MM-YYYY" /></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">Generate Token</button></div>
                  </div>
                </Section>
                <Section title="Role-based Access">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Employee Email</Label><Field as={Input} name="tokens.employeeEmail" placeholder="Enter Employee Email" /></div>
                    <div><Label>Role Assignment</Label><Field as={SelectEl} name="tokens.role"><option value="">Select role</option><option value="support">Support</option><option value="ops">Ops</option><option value="manager">Manager</option></Field></div>
                    <div className="sm:col-span-2"><button type="button" className="w-full rounded-xl border px-4 py-2 text-sm">Assign Role</button></div>
                  </div>
                </Section>
                <Section title="Token Configuration">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div><Label>Default Token Expiry (days)</Label><Field as={Input} type="number" name="tokens.defaultExpiryDays" placeholder="0" /></div>
                    <div><Label>Auto-Regeneration Buffer (days)</Label><Field as={Input} type="number" name="tokens.regenBufferDays" placeholder="0" /></div>
                  </div>
                </Section>
              </>
            )}

            {/* ================= Integration Logs ================= */}
            {sub === "Integration Logs" && (
              <>
                <Section title="Gateway Status Dashboard">
                  <div className="flex flex-wrap gap-3">{stats.map((s) => (<StatCard key={s.title} title={s.title} value={s.value} />))}</div>
                </Section>
              </>
            )}

            {/* Actions */}
            <div className="flex items-center justify-between">
              <button type="button" className="rounded-xl border px-4 py-2 text-sm">CANCEL</button>
              <button type="submit" disabled={isSubmitting} className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:opacity-60">{isSubmitting ? "Saving…" : "SAVE"}</button>
            </div>

            {toast && <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-800">{toast}</div>}
          </Form>
        )}
      </Formik>

    </div>
  );
};

export default SettingsIntegrationWizard;
