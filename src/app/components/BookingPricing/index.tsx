import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type FormValues = {
  bookingEnabled: boolean;
  dynamicPricingEnabled: boolean;
  cancellationPolicy: string;
  serviceFee: string;
  currency: string;
  codeInput: string;
};

const initialValues: FormValues = {
  bookingEnabled: true,
  dynamicPricingEnabled: true,
  cancellationPolicy: "",
  serviceFee: "",
  currency: "INR",
  codeInput: "",
};

const validationSchema = Yup.object({
  cancellationPolicy: Yup.string().optional(),
  serviceFee: Yup.string().optional(),
  currency: Yup.string().required("Currency is required"),
  codeInput: Yup.string().optional(),
});

const Toggle: React.FC<{
  name: string;
  label?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ name, label, value, onChange }) => {
  return (
    <label className="flex items-center gap-4">
      <div className="flex flex-col">
        {label && <span className="text-sm font-medium text-gray-700">{label}</span>}
        <div
          role="switch"
          aria-checked={value}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onChange(!value);
          }}
          onClick={() => onChange(!value)}
          className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${
            value ? "bg-indigo-600" : "bg-gray-200"
          }`}
        >
          <div
            className={`w-6 h-6 bg-white rounded-full shadow transform transition-transform ${
              value ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </div>
      </div>
    </label>
  );
};

const BookingPricing: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#f7f6fb] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">Booking & Pricing Settings</h2>
          <p className="text-sm text-gray-500 mb-6">Configure booking features, pricing and currency settings</p>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              // Replace with real API call
              console.log("BookingFeatureSettings saved:", values);
              alert("Settings saved (see console)");
              actions.setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, isSubmitting }) => (
              <Form className="space-y-6">
                {/* Booking Feature */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Booking Feature</label>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Enable or disable booking for listings</div>
                      <Toggle
                        name="bookingEnabled"
                        value={values.bookingEnabled}
                        onChange={(v) => setFieldValue("bookingEnabled", v)}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">When disabled, customers won't be able to make bookings.</div>
                  </div>
                </div>

                {/* Dynamic Pricing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enable Dynamic Pricing</label>
                  <div className="bg-gray-50 p-4 rounded-md border">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">Allow dynamic pricing rules like peak/seasonal pricing</div>
                      <Toggle
                        name="dynamicPricingEnabled"
                        value={values.dynamicPricingEnabled}
                        onChange={(v) => setFieldValue("dynamicPricingEnabled", v)}
                      />
                    </div>
                    <div className="mt-2 text-xs text-gray-400">If enabled, use the pricing rules page to configure different rates.</div>
                  </div>
                </div>

                {/* Default Cancellation Policy */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Cancellation Policy</label>
                  <Field
                    as="select"
                    name="cancellationPolicy"
                    value={values.cancellationPolicy}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setFieldValue("cancellationPolicy", e.target.value)
                    }
                    className="w-full border rounded-md p-3 bg-white"
                  >
                    <option value="">Select Here</option>
                    <option value="flexible">Flexible - refund up to 7 days</option>
                    <option value="moderate">Moderate - refund up to 15 days</option>
                    <option value="strict">Strict - limited refund</option>
                    <option value="none">No refund</option>
                  </Field>
                  <ErrorMessage name="cancellationPolicy" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Service Fee */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Fee</label>
                  <Field
                    name="serviceFee"
                    placeholder="Select or enter service fee (e.g. 5% or 500)"
                    className="w-full border rounded-md p-3 bg-white"
                  />
                  <ErrorMessage name="serviceFee" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Currency Setting */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency Setting</label>
                  <Field
                    as="select"
                    name="currency"
                    value={values.currency}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("currency", e.target.value)}
                    className="w-full border rounded-md p-3 bg-white"
                  >
                    <option value="INR">INR (₹) — default</option>
                    <option value="USD">USD ($)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="EUR">EUR (€)</option>
                  </Field>
                  <ErrorMessage name="currency" component="div" className="text-xs text-red-500 mt-1" />
                </div>
                
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      // reset to initial values
                      setFieldValue("bookingEnabled", initialValues.bookingEnabled);
                      setFieldValue("dynamicPricingEnabled", initialValues.dynamicPricingEnabled);
                      setFieldValue("cancellationPolicy", initialValues.cancellationPolicy);
                      setFieldValue("serviceFee", initialValues.serviceFee);
                      setFieldValue("currency", initialValues.currency);
                      setFieldValue("codeInput", initialValues.codeInput);
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

export default BookingPricing;