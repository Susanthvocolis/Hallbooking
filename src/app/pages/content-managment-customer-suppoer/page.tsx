"use client";

import React from "react";

const tabs = ["Blogs", "FAQ Manager", "Customer Support"];
const activeTab = "Customer Support";

const CustomerSupport: React.FC = () => {
  // ---- Future API Integration (uncomment/use this later) ----
  // const [supportData, setSupportData] = useState<any[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  // useEffect(() => {
  //   fetch("YOUR_API_ENDPOINT_HERE")
  //     .then(res => res.json())
  //     .then((data: any[]) => setSupportData(data))
  //     .catch(err => setError(String(err)))
  //     .finally(() => setLoading(false));
  // }, []);
  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="min-h-screen bg-[#ede6f8] p-6">
      {/* Header */}
      <div className="bg-[#f4f1fa] rounded-xl p-5 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-black">Content Management</h2>
        <p className="text-[#6b7282]">Monitor and manage all venue bookings across the platform</p>
      </div>

      {/* Tabs */}
      <div className="bg-[#f4f1fa] rounded-xl flex gap-10 p-2 items-center mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={tab}
            className={`px-7 py-2 text-black font-semibold rounded-lg ${
              activeTab === tab ? "bg-[#ebe6f8]" : "hover:bg-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Search and Sort Section */}
      <div className="bg-white rounded-xl p-5 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search by Privacy policy, About us, etc."
            className="flex-1 rounded border border-gray-300 p-3 w-full md:w-auto"
          />
          <select className="rounded border border-gray-300 p-3 w-full md:w-40">
            <option>Sort by date</option>
            <option>Sort by name</option>
            <option>Sort by status</option>
          </select>
        </div>
      </div>

      {/* Empty Content Area */}
      <div className="bg-white rounded-xl p-6">
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center text-[#6b7282]">
            <div className="text-lg mb-2">No content available</div>
            <div className="text-sm">Customer support content will appear here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;

/*
---------------------------
API INTEGRATION GUIDE

1. Uncomment the useState/useEffect code block above.
2. Replace "YOUR_API_ENDPOINT_HERE" with your real API endpoint.
3. Add appropriate data types for customer support content.
4. Replace the empty content area with actual support pages/content.
5. Add actions like create, edit, delete as needed.

When your backend is ready, this component will seamlessly render real data!
---------------------------
*/
