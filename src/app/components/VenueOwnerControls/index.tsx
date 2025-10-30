import React, { useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

type FormValues = {
  durationMonths: string;
  logo: File | null;
  maxUploadLimit: string;
  verification: {
    gstin: boolean;
    pan: boolean;
    aadhar: boolean;
  };
  commissionModel: string;
  codeInput: string;
};

const initialValues: FormValues = {
  durationMonths: "",
  logo: null,
  maxUploadLimit: "",
  verification: {
    gstin: true,
    pan: false,
    aadhar: false,
  },
  commissionModel: "",
  codeInput: "",
};

const validationSchema = Yup.object({
  durationMonths: Yup.string().optional(),
  maxUploadLimit: Yup.string().optional(),
  commissionModel: Yup.string().optional(),
  codeInput: Yup.string().optional(),
});

const monthsOptions = [
  { value: "1", label: "1 month" },
  { value: "3", label: "3 months" },
  { value: "6", label: "6 months" },
  { value: "12", label: "12 months" },
];

const VenueOwnerControls: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = (file: File | null, setFieldValue: (field: string, value: any) => void) => {
    setFieldValue("logo", file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleDrop = (e: React.DragEvent, setFieldValue: (field: string, value: any) => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0], setFieldValue);
    }
  };

  const clearUpload = (setFieldValue: (field: string, value: any) => void) => {
    setFieldValue("logo", null);
    setPreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen bg-[#f7f5fb] p-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Listing Defaults & Upload Settings</h2>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, actions) => {
              // Convert File to something portable if necessary (e.g., upload)
              const payload = {
                ...values,
                logoName: values.logo ? values.logo.name : null,
              };
              console.log("Listing settings saved:", payload);
              alert("Listing settings saved (see console)");
              actions.setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, isSubmitting, resetForm }) => (
              <Form className="space-y-6">
                {/* Default Listing Duration */}
                <div>
                  <label className="block text-sm font-medium mb-2">Default Listing Duration</label>
                  <Field
                    as="select"
                    name="durationMonths"
                    className="w-full border rounded-md p-3 bg-white"
                    value={values.durationMonths}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFieldValue("durationMonths", e.target.value)}
                  >
                    <option value="">Select Months Here</option>
                    {monthsOptions.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name="durationMonths" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Upload Logo */}
                <div>
                  <label className="block text-sm font-medium mb-2">Upload Logo</label>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => handleDrop(e, setFieldValue)}
                    onClick={() => fileInputRef.current?.click()}
                    className="relative border-2 border-dashed border-gray-300 rounded-md p-8 text-center cursor-pointer hover:bg-gray-50 transition"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
                    }}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={(e) => {
                        const f = e.currentTarget.files ? e.currentTarget.files[0] : null;
                        handleFileSelect(f, setFieldValue);
                      }}
                    />
                    {previewUrl ? (
                      <div className="flex items-center justify-center flex-col">
                        <img src={previewUrl} alt="logo preview" className="max-h-28 object-contain mb-3" />
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              clearUpload(setFieldValue);
                            }}
                            className="px-3 py-1 text-sm border rounded-md bg-white"
                          >
                            Remove
                          </button>
                          <button
                            type="button"
                            onClick={(ev) => {
                              ev.stopPropagation();
                              fileInputRef.current?.click();
                            }}
                            className="px-3 py-1 text-sm bg-indigo-600 text-white rounded-md"
                          >
                            Replace
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-500">
                        <svg className="mx-auto mb-2" width="28" height="28" viewBox="0 0 24 24" fill="none">
                          <path d="M12 16V4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <path d="M8 8l4-4 4 4" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          <rect x="3" y="10" width="18" height="8" rx="2" stroke="#9ca3af" strokeWidth="1.2" />
                        </svg>
                        <div className="font-medium">Drag and drop logo here</div>
                        <div className="text-xs text-gray-400">PNG, JPG, SVG — max 5MB</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Maximum Upload Limit */}
                <div>
                  <label className="block text-sm font-medium mb-2">Maximum Upload Limit (Photos, Videos, Etc...)</label>
                  <Field
                    name="maxUploadLimit"
                    placeholder="Select maximum upload limit"
                    className="w-full border rounded-md p-3 bg-white"
                  />
                  <ErrorMessage name="maxUploadLimit" component="div" className="text-xs text-red-500 mt-1" />
                </div>

                {/* Verification Required */}
                <div>
                  <label className="block text-sm font-medium mb-2">Verification Required</label>
                  <div className="flex flex-wrap gap-3">
                    <label className="flex items-center gap-2 p-3 border rounded-md bg-gray-50 cursor-pointer">
                      <Field type="checkbox" name="verification.gstin" className="w-4 h-4" />
                      <span className="text-sm">GSTIN</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded-md bg-gray-50 cursor-pointer">
                      <Field type="checkbox" name="verification.pan" className="w-4 h-4" />
                      <span className="text-sm">PAN</span>
                    </label>
                    <label className="flex items-center gap-2 p-3 border rounded-md bg-gray-50 cursor-pointer">
                      <Field type="checkbox" name="verification.aadhar" className="w-4 h-4" />
                      <span className="text-sm">Aadhar</span>
                    </label>
                  </div>
                </div>

                {/* Commission Model Setup */}
                <div>
                  <label className="block text-sm font-medium mb-2">Commission Model Setup (Future Use)</label>
                  <Field
                    as="textarea"
                    name="commissionModel"
                    rows={4}
                    placeholder="Describe commission model or paste JSON config..."
                    className="w-full border rounded-md p-3 font-mono bg-white"
                  />
                  <ErrorMessage name="commissionModel" component="div" className="text-xs text-red-500 mt-1" />
                </div>
                {/* Actions */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      resetForm();
                      setPreviewUrl(null);
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

export default VenueOwnerControls;