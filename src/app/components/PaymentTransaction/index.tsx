'use client'; 
import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type FormValues = {
  gateway: string;
  commissionPercent: string;
  refundPolicy: string;
  taxSettings: string;
  invoiceTemplate: File | null;
  codeInput: string;
};

const initialValues: FormValues = {
  gateway: "",
  commissionPercent: "",
  refundPolicy: "",
  taxSettings: "",
  invoiceTemplate: null,
  codeInput: "",
};

const validationSchema = Yup.object({
  gateway: Yup.string().required("Select a payment gateway"),
  commissionPercent: Yup.string()
    .matches(/^\d+(\.\d+)?$/, "Enter a valid number")
    .optional(),
  refundPolicy: Yup.string().optional(),
  taxSettings: Yup.string().optional(),
  invoiceTemplate: Yup.mixed().nullable(),
  codeInput: Yup.string().optional(),
});

const refundOptions = [
  { value: "3", label: "3 days" },
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "none", label: "No refund" },
];

const gatewayOptions = [
  { value: "razorpay", label: "Razorpay" },
  { value: "stripe", label: "Stripe" },
  { value: "paypal", label: "PayPal" },
];

const PaymentTransaction: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [invoiceName, setInvoiceName] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#f7f6fb] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">Payment Integration & Billing</h2>
          <p className="text-sm text-gray-500 mb-6">
            Configure payment gateway, commission, refund policy, tax and invoice template.
          </p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              // In a real app you'd upload files and persist settings via API calls here.
              const payload = {
                gateway: values.gateway,
                commissionPercent: values.commissionPercent,
                refundPolicy: values.refundPolicy,
                taxSettings: values.taxSettings,
                invoiceTemplateName: values.invoiceTemplate ? values.invoiceTemplate.name : null,
                codeInput: values.codeInput,
              };
              console.log("Payment Integration saved:", payload);
              alert("Payment settings saved (see console)");
              actions.setSubmitting(false);
            }}
          >
            {({ setFieldValue, values, isSubmitting, resetForm }) => (
              <Form className="space-y-6">
                {/* Payment Gateway */}
                <div>
                  <label className="block text-sm font-medium mb-2">Payment Gateway Integration</label>
                  <Field
                    as="select"
                    name="gateway"
                    className="w-full border rounded-md p-3 bg-white"
                    value={values.gateway}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue("gateway", e.target.value)
                    }
                  >
                    <option value="">Select Razorpay / Stripe / PayPal</option>
                    {gatewayOptions.map((g) => (
                      <option key={g.value} value={g.value}>
                        {g.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="gateway" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Commission % */}
                <div>
                  <label className="block text-sm font-medium mb-2">Commission % for bookings</label>
                  <Field
                    name="commissionPercent"
                    placeholder="e.g. 5 or 2.5"
                    className="w-full border rounded-md p-3 bg-white"
                  />
                  <ErrorMessage name="commissionPercent" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Refund Policy */}
                <div>
                  <label className="block text-sm font-medium mb-2">Refund Policy Default</label>
                  <Field
                    as="select"
                    name="refundPolicy"
                    className="w-full border rounded-md p-3 bg-white"
                    value={values.refundPolicy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue("refundPolicy", e.target.value)
                    }
                  >
                    <option value="">Select 3 days, 7 days, 14 days</option>
                    {refundOptions.map((r) => (
                      <option key={r.value} value={r.value}>
                        {r.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="refundPolicy" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Tax Settings */}
                <div>
                  <label className="block text-sm font-medium mb-2">Tax Settings</label>
                  <Field
                    name="taxSettings"
                    placeholder="Select GST %, TDS"
                    className="w-full border rounded-md p-3 bg-white"
                  />
                  <ErrorMessage name="taxSettings" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Invoice Template Upload */}
                <div>
                  <label className="block text-sm font-medium mb-2">Invoice Template</label>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:bg-gray-50 transition"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept=".pdf,.docx,.doc,.pptx,.png,.jpg"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const f = e.currentTarget.files ? e.currentTarget.files[0] : null;
                        setFieldValue("invoiceTemplate", f);
                        setInvoiceName(f ? f.name : null);
                      }}
                    />
                    <div className="text-gray-500">
                      <svg className="mx-auto mb-2" width="28" height="28" viewBox="0 0 24 24" fill="none">
                        <path d="M12 16V4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M8 8l4-4 4 4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <rect x="3" y="10" width="18" height="8" rx="2" stroke="#9ca3af" strokeWidth="1.2" />
                      </svg>
                      <div className="font-medium">
                        {invoiceName ? invoiceName : "Upload Here"}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Click to upload an invoice template (.pdf/.docx/.png/.jpg)</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setInvoiceName(null);
                      if (fileInputRef.current) fileInputRef.current.value = "";
                    }}
                    className="px-4 py-2 border rounded-md text-indigo-600"
                  >
                    CANCEL
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                  >
                    SAVE
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default PaymentTransaction;