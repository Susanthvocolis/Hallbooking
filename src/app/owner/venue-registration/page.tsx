'use client'
import React, { useRef } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const amenitiesList = [
  'AC', 'Parking', 'Stage', 'Lawn', 'Kitchen', 'WiFi', 'Audio System', 'Lighting', 'Generator', 'Water Service'
];

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

const VenueRegistration: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileDrop = (e: React.DragEvent, setFieldValue: (field: string, value: any) => void) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFieldValue('gallery', e.dataTransfer.files[0]);
    }
  };

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

      <main className="px-2 py-8 md:px-8  mx-auto">
        <h1 className="text-2xl font-bold mb-8">Venue Registration</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, actions) => {
            alert('Venue Registration Submitted!\n' + JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }}
        >
          {({ setFieldValue, isSubmitting, values }) => (
            <Form className="flex flex-col gap-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="venueName">Venue Name</label>
                  <Field name="venueName" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="venueName" component="div" className="text-xs text-red-500" />
                </div>
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
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="email">Email</label>
                  <Field name="email" type="email" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="city">City</label>
                  <Field name="city" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="city" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="location">Location</label>
                  <Field name="location" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="location" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="venueType">Venue Type</label>
                  <Field name="venueType" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="venueType" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="pricePerDay">Price Per Day</label>
                  <Field name="pricePerDay" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="pricePerDay" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="capacityMin">Capacity (Min)</label>
                  <Field name="capacityMin" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="capacityMin" component="div" className="text-xs text-red-500" />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1" htmlFor="capacityMax">Capacity (Max)</label>
                  <Field name="capacityMax" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="capacityMax" component="div" className="text-xs text-red-500" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-1" htmlFor="gstin">GSTIN (Optional)</label>
                  <Field name="gstin" className="w-full border rounded-lg p-2" />
                  <ErrorMessage name="gstin" component="div" className="text-xs text-red-500" />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <div className="block text-sm font-semibold mb-2">Amenities</div>
                <div className="flex flex-wrap gap-3">
                  {amenitiesList.map((am, idx) => (
                    <label key={idx} className="flex items-center gap-1 bg-white border rounded px-2 py-1 cursor-pointer">
                      <Field type="checkbox" name="amenities" value={am} className="accent-[#7d7cd3]" />
                      <span className="text-xs">{am}</span>
                    </label>
                  ))}
                </div>
                <ErrorMessage name="amenities" component="div" className="text-xs text-red-500" />
              </div>

              {/* Gallery Upload */}
              <div>
                <label className="block text-sm font-semibold mb-1">Gallery Upload</label>
                <div
                  className="w-full border-2 border-dashed border-[#7d7cd3] rounded-xl bg-white flex flex-col items-center justify-center py-8 text-center cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={e => e.preventDefault()}
                  onDrop={e => handleFileDrop(e, setFieldValue)}
                >
                  <svg width="32" height="32" fill="none" className="mx-auto mb-2"><path d="M16 22v-7M16 15l-4 4m4-4l4 4" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><rect x="4" y="4" width="24" height="24" rx="4" stroke="#7D7CD3" strokeWidth="2"/></svg>
                  <div className="font-medium text-gray-500">Click to upload or drag and drop</div>
                  <div className="text-xs text-gray-400">Maximum size: 5mb (1 file)</div>
                  {values.gallery && (
                    <div className="mt-2 text-xs text-green-700">Selected: {values.gallery.name}</div>
                  )}
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={e => {
                      if (e.target.files && e.target.files[0]) {
                        setFieldValue('gallery', e.target.files[0]);
                      }
                    }}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="description">Description</label>
                <Field as="textarea" name="description" rows={3} className="w-full border rounded-lg p-2 resize-y" />
                <ErrorMessage name="description" component="div" className="text-xs text-red-500" />
              </div>
              {/* Terms */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="terms">Terms & Conditions</label>
                <Field as="textarea" name="terms" rows={3} className="w-full border rounded-lg p-2 resize-y" />
                <ErrorMessage name="terms" component="div" className="text-xs text-red-500" />
              </div>
              {/* Code Compiler Input */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="codeInput">Code Compiler Input</label>
                <Field as="textarea" name="codeInput" rows={2} placeholder="Type input for your code..." className="w-full border rounded-lg p-2 resize-y" />
                <ErrorMessage name="codeInput" component="div" className="text-xs text-red-500" />
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                disabled={isSubmitting}
              >
                Submit For Approval
              </button>
            </Form>
          )}
        </Formik>
      </main>
    </div>
  );
};

export default VenueRegistration;