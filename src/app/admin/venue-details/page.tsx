"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/app/ProtectedRoute";

// Define types for banquet hall data
interface Owner {
  name: string;
  phone: string;
  email: string;
}

interface BanquetData {
  name: string;
  location: string;
  owner: Owner;
  mainImage: string;
  gallery: string[];
}

// Static data for now (replace when API is ready)
const staticBanquetData: BanquetData = {
  name: "Royal Banquet Hall",
  location: "Kukatpally Hyderabad, Telangana",
  owner: {
    name: "Rajesh Sharma",
    phone: "+91 9876543210",
    email: "rajeshsharma1234@gmail.com",
  },
  mainImage: "/images/2b6e634cd581a755e7432f90797b88a0e0aa9681.jpg",
  gallery: [
    "/images/44a9e52bc9f9e714053e1d21671d0e3c621147f8.jpg",
    "/images/2b6e634cd581a755e7432f90797b88a0e0aa9681.jpg",
    "/images/f6a63c23cc3598a692000fb9a44c93cb7ebb765f.jpg",
    "/images/62fc6c33a801d5fbf480bf15de6e419adad71b04.jpg",
  ],
};

const ViewDetails: React.FC = () => {
  // ---- For future API integration: uncomment and use this instead of staticBanquetData
  // const [banquetData, setBanquetData] = useState<BanquetData | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   fetch("YOUR_API_ENDPOINT_HERE")
  //     .then((res) => res.json())
  //     .then((data: BanquetData) => setBanquetData(data))
  //     .catch((err) => setError(String(err)))
  //     .finally(() => setLoading(false));
  // }, []);
  // if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>;
  // if (error) return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  // if (!banquetData) return <div className="flex justify-center items-center h-screen">No data found</div>;

  // Combine main image with gallery for selection
  const allImages = [staticBanquetData.mainImage, ...staticBanquetData.gallery];
  const [selectedImage, setSelectedImage] = useState(allImages[0]);
  const router = useRouter();

  return (
    <ProtectedRoute requiredRole={['super_admin']}>
      <div className="min-h-screen bg-[#e9daf8] p-4">
        <div className="max-w-6xl mx-auto bg-white rounded-lg overflow-hidden">
          <div className="flex items-center px-4 py-2 border-b">
            <button onClick={() => router.back()} className="mr-2 text-lg" style={{ color: "black" }}>&lt;</button>
            <span className="font-medium" style={{ color: "black" }}>View Details</span>
          </div>
          <div className="flex flex-wrap md:flex-nowrap gap-8 px-6 py-6">
            {/* LEFT SECTION */}
            <div className="flex-shrink-0 w-full md:w-1/3">
              <h2 className="text-xl font-bold" style={{ color: "black" }}>{staticBanquetData.name}</h2>
              <p className="text-sm text-gray-500 mb-3">{staticBanquetData.location}</p>

              {/* Large Main Image */}
              <div className="mb-4">
                <img
                  src={selectedImage}
                  alt="Main"
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>

              {/* 4x1 Row of Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mb-4">
                {allImages.slice(0, 4).map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className={`w-full h-24 object-cover rounded-lg cursor-pointer border-2 transition-all duration-200 hover:scale-105 ${selectedImage === img ? 'border-blue-500' : 'border-transparent'
                      }`}
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>

              {/* Owner Details */}
              <div className="bg-gray-100 rounded-lg p-2 mt-1">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Owner Details</span>
                <span className="block" style={{ color: "black" }}>{staticBanquetData.owner.name}</span>
                <span className="block text-sm" style={{ color: "black" }}>{staticBanquetData.owner.phone}</span>
                <span className="block text-sm" style={{ color: "black" }}>{staticBanquetData.owner.email}</span>
              </div>
            </div>

            {/* RIGHT SECTION */}
            <div className="flex-1 space-y-4">
              <div className="flex gap-2 justify-end mb-2">
                <button className="bg-red-500 text-white px-4 py-1 rounded">Reject</button>
                <button className="bg-green-500 text-white px-4 py-1 rounded">Approve</button>
                <button className="bg-yellow-400 text-white px-4 py-1 rounded">Pending</button>
              </div>
              {/* Description */}
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Description</span>
                <p className="text-sm text-gray-700">
                  Lorem ipsum dolor sit amet, established fact that a reader will be distracted by readable content...
                </p>
              </div>
              {/* Capacity */}
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Capacity</span>
                <p className="text-sm" style={{ color: "#6b7282" }}>Maximum 1000 members</p>
                <p className="text-sm" style={{ color: "#6b7282" }}>
                  Minimum 700 members
                </p>

              </div>
              {/* Amenities */}
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Amenities</span>
                <span className="font-semibold" style={{ color: "#6b7282" }}>
                  Hall & Seating
                </span>
                <ul className="list-disc ml-5 text-sm" style={{ color: "#6b7282" }}>
                  <li>Spacious hall with flexible layouts</li>
                  <li>Comfortable chairs and tables</li>
                  <li>Stage / Platform for events</li>
                  <li>Dance Floor</li>
                </ul>

              </div>
              {/* Audio-Visual & Lighting */}
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Audio-Visual & Lighting</span>
                <ul className="list-disc ml-5 text-sm" style={{ color: "#6b7282" }} >
                  <li>Professional sound system with microphones</li>
                  <li>LED / screen / TV for events</li>
                  <li>Decorative themed lighting</li>
                  <li>Backup generator</li>
                </ul>
              </div>
              {/* Catering & Dining */}
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Catering & Dining</span>
                <ul className="list-disc ml-5 text-sm" style={{ color: "#6b7282" }}>
                  <li>In-house catering service (veg / non-veg)</li>
                  <li>Customizable catering packages</li>
                  <li>Buffet, plated, or custom dining</li>
                  <li>Cutlery, plates, glassware</li>
                </ul>
              </div>
              {/* Decoration & Ambiance */}
              <div className="bg-gray-100 rounded-lg p-3" style={{ color: "#6b7282" }}>
                <span className="font-bold block mb-1" style={{ color: "black" }}>Decoration & Ambiance</span>
                <ul className="list-disc ml-5 text-sm">
                  <li>Stage décor, flowers, drapes, balloons, theme décor</li>
                  <li>Focus lights</li>
                  <li>Welcome entrance setup</li>
                </ul>
              </div>
              {/* Additional Facilities */}
              <div className="bg-gray-100 rounded-lg p-3" style={{ color: "#6b7282" }}>
                <span className="font-bold block mb-1" style={{ color: "black" }}>Additional Facilities</span>
                <ul className="list-disc ml-5 text-sm">
                  <li>AC & ventilation</li>
                  <li>Security & surveillance</li>
                  <li>Valet parking / ample parking spaces</li>
                  <li>Wheelchair accessibility</li>
                </ul>
              </div>
              {/* Terms and Conditions */}
              <div className="bg-gray-100 rounded-lg p-3">
                <span className="font-bold block mb-1" style={{ color: "black" }}>Terms and Conditions</span>
                <ul className="list-disc ml-5 text-sm" style={{ color: "#6b7282" }}>
                  <li>Final pricing and availability as strictly followed</li>
                  <li>Smoking and alcohol restrictions</li>
                  <li>Full payment must be cleared</li>
                  <li>Refunds/cancellations as per venue rules</li>
                  <li>Outside caterers, decorators, or vendors require prior approval from management</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ViewDetails;