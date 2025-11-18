'use client'
import Header from '@/app/components/Header';
import ProtectedRoute from '@/app/ProtectedRoute';
import { createVenue, getVenueListByOwnerId } from '@/app/services/VenuService/venueService';
import { DecodeJwtToken } from '@/app/utils/DecodeJwtToken';
import clsx from "clsx";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

const amenitiesList = [
  'AC', 'Parking', 'Stage', 'Lawn', 'Kitchen', 'WiFi', 'Audio System', 'Lighting', 'Generator', 'Water Service'
];

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

function VenueCard({ venue, }: { venue: any; }) {
  const images =
    venue?.images?.length > 0
      ? venue.images
      : [
        "https://images.unsplash.com/photo-1510076857177-7470076d4098?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=400&q=80",
        "https://plus.unsplash.com/premium_photo-1664530452329-42682d3a73a7?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=400&q=80",
        "https://images.unsplash.com/photo-1670529776180-60e4132ab90c?auto=format&fit=crop&w=400&q=80",
      ];
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (hovered && images.length > 1) {
      interval = setInterval(() => {
        setIndex((prev) => (prev + 1) % images.length);
      }, 2000); // change every 2 seconds
    }
    return () => clearInterval(interval);
  }, [hovered, images.length]);

  return (
    <div className="bg-white rounded-xl shadow-sm w-full max-w-xs flex flex-col overflow-hidden border border-gray-100"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative">
        <img
          src={`${process.env.NEXT_PUBLIC_IMAGE_API_URL}${images[index]}`}
          alt={venue.name}
          className="h-32 w-full object-cover"
        />
        <span
          className={clsx(
            "absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-bold drop-shadow",
            venue.status === "Pending"
              ? "bg-orange-100 text-orange-600"
              : "bg-green-100 text-green-700"
          )}
        >
          {venue.status}
        </span>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <div className="font-bold text-[17px]">{venue.name}</div>
        <div className="text-xs text-gray-500">{venue.address}</div>
        <div className="flex flex-wrap gap-2 mt-2 mb-4">
          {venue.amenities.map((a: any) => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-600 font-medium"
            >
              {a}
            </span>
          ))}
        </div>
        <div className="flex justify-end gap-2 mt-auto">
          <>
            <button className="bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-xs hover:bg-blue-200">
              View
            </button>
            <button className="bg-green-100 text-green-800 px-3 py-1 rounded font-semibold text-xs hover:bg-green-200">
              Edit
            </button>
            <button className="bg-red-100 text-red-800 px-3 py-1 rounded font-semibold text-xs hover:bg-red-200">
              Delete
            </button>
          </>
        </div>
      </div>
    </div>
  );
}

const Table = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  const Decode = DecodeJwtToken()
  const [venues, setVenues] = useState([]);
  const ownerId = Decode?.id

  useEffect(() => {
    const fetchVenues = async () => {
      const data = await getVenueListByOwnerId(ownerId || "");
      setVenues(data.data || []);
    };
    fetchVenues();
  }, []);

  return (
    <>
      <section>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className='flex justify-between items-center mb-4'>
            <div className="font-bold text-lg mb-4">
              All Venues ({venues.length})
            </div>
            <button onClickCapture={() => setShowForm(true)} className='bg-blue-100 text-blue-800 px-3 py-1 rounded font-semibold text-xs hover:bg-blue-200' onClick={() => setShowForm(true)}>Add Venue</button>
          </div>
          <div className="flex flex-wrap col-3 gap-6">
            {venues.length === 0 ? (
              <div className="text-gray-500 text-center w-full py-8">
                No venues found.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue, idx) => (
                  <VenueCard venue={venue} key={idx} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

const RegisterForm = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const decode = DecodeJwtToken()
  const venuesType = [
    { value: "Banquet Hall", key: "banquet_hall" },
    { value: "Farm House", key: "farm_house" },
    { value: "Destination Hall", key: "destination" },
    { value: "Party Hall", key: "party_hall" },
    { value: "DJ Sound", key: "dj_sound" },
    { value: "catering", key: "catering" },
    { value: "lighting", key: "lighting" },
    { value: "Photography ", key: "photography" },
    { value: "Decoration", key: "decoration" },
    { value: "Makeup", key: "makeup" }
  ]
  const servisesType = [
    { value: "DJ Sound", key: "dj_sound" },
    { value: "catering", key: "catering" },
    { value: "lighting", key: "lighting" },
    { value: "Photography ", key: "photography" },
    { value: "Decoration", key: "decoration" },
    { value: "Makeup", key: "makeup" }
  ]
  const type = decode?.role === "venue_owner" ? venuesType : servisesType

  const initialValues = {
    name: '',
    ownerId: decode?.id,
    mobile: '',
    email: '',
    city: '',
    state: '',
    pincode: '',
    address: '',
    type: '',
    subType: '',
    price: '',
    capacity: '',
    gstin: '',
    amenities: [] as string[],
    gallery: null as File | null,
    description: '',
    terms: '',
    codeInput: '',
  };

  const onsubmit = (values: any) => {
    const result = createVenue(values)
  }

  const handleFileDrop = (e: React.DragEvent, setFieldValue: (field: string, value: any) => void) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFieldValue('gallery', e.dataTransfer.files[0]);
    }
  };
  return (
    <main className="px-2 py-8 md:px-8 mx-auto">
      <h1 className="text-2xl font-bold mb-8">Venue Registration</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onsubmit}
      >
        {({ setFieldValue, isSubmitting, values }) => (
          <Form className="flex flex-col gap-5 bg-[#ffffff]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="venueType">Venue Type</label>
                {/* <Field name="venueType" className="w-full border rounded-lg p-2" /> */}
                <Field as="select" name="venueType" className="w-full border rounded-lg p-2">
                  <option>Select Venue type</option>
                  {type.map(eachItem => (
                    <option key={eachItem.key} value={eachItem.key}>
                      {eachItem.value}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="venueType" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="venueName">Venue Name</label>
                <Field name="venueName" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="venueName" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="mobile">Contact No</label>
                <Field name="mobile" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="mobile" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="email">Contact Email</label>
                <Field name="email" type="email" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="location">Location</label>
                <Field name="location" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="location" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="city">City</label>
                <Field name="city" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="city" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="city">State</label>
                <Field name="state" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="city" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="city">Pin Code</label>
                <Field name="pincode" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="city" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="pricePerDay">Price</label>
                <Field name="pricePerDay" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="pricePerDay" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="capacityMin">Capacity</label>
                <Field name="capacity" className="w-full border rounded-lg p-2" />
                <ErrorMessage name="capacityMin" component="div" className="text-xs text-red-500" />
              </div>
              <div>
                {/* className="md:col-span-2" */}
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
                <svg width="32" height="32" fill="none" className="mx-auto mb-2"><path d="M16 22v-7M16 15l-4 4m4-4l4 4" stroke="#7D7CD3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><rect x="4" y="4" width="24" height="24" rx="4" stroke="#7D7CD3" strokeWidth="2" /></svg>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
            {/* Submit Button */}
            <div className="flex flex-row gap-4 md:gap-6 mt-4">
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full mt-2 py-3 rounded-lg bg-[#7d7cd3] text-white font-semibold text-lg hover:bg-[#5b5ab7] transition"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}
const VenueRegistration: React.FC = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <ProtectedRoute requiredRole={["venue_owner", "service_vendor"]}>
      <>
        <Header title='Venue Management' />
        <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#eeeff9]">
          {showForm ? <RegisterForm setShowForm={setShowForm} /> : <Table setShowForm={setShowForm} />}
        </div>
      </>
    </ProtectedRoute>
  );
};

export default VenueRegistration;