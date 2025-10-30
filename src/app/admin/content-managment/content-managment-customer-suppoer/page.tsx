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