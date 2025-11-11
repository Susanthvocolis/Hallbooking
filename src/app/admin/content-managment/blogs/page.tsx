import Header from "@/app/components/Header";

const Blogs = () => (
    <>
        <Header title="Blogs" />
        <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#ede6f8] p-3">
            <div className="bg-white p-3 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-black">Blog Management</h3>
                    <div className="flex gap-2">
                        <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Export</button>
                        <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium">Create Blog</button>
                    </div>
                </div>
                <div className="bg-[#f4f1fa] rounded-lg flex flex-wrap gap-2 items-center p-4 mb-4">
                    <input
                        type="text"
                        placeholder="Search Blogs and title, content and tags"
                        className="rounded border p-2 w-56"
                    />
                    <select className="rounded border p-2 w-28">
                        <option>All Status</option>
                    </select>
                    <select className="rounded border p-2 w-28">
                        <option>All Category</option>
                    </select>
                    <button className="bg-[#7067ec] text-white rounded px-5 py-2 font-medium ml-auto">Filters</button>
                </div>
                <div className="bg-white min-h-[170px] flex justify-center items-center text-[#6b7282] rounded-lg border border-gray-200">
                    No blog entries found...
                </div>
            </div>
        </div>
    </>
);

export default Blogs;