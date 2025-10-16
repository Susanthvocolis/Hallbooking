"use client";
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import clsx from "clsx";
import {
    HiOutlineCalendar,
    HiOutlineChartBar,
    HiOutlineClipboardList,
    HiOutlineCog,
    HiOutlineDocumentReport,
    HiOutlineHome,
    HiOutlineTicket,
    HiOutlineUserGroup,
    HiOutlineMenu,
} from "react-icons/hi";

const owner = [
    { icon: <HiOutlineHome className="w-5 h-5" />, label: "Dashboard", path: "/owner/dashboard", active: true },
    { icon: <HiOutlineClipboardList className="w-5 h-5" />, label: "Venue Registration", path: "/owner/venue-registration" },
    { icon: <HiOutlineUserGroup className="w-5 h-5" />, label: "Bookings", path: "/owner/booking-dashboard" },
    { icon: <HiOutlineCalendar className="w-5 h-5" />, label: "Availability", path: "/owner/availability-calendar" },
    { icon: <HiOutlineTicket className="w-5 h-5" />, label: "Enquiries", path: "/owner/enquiry-lead-manager" },
    { icon: <HiOutlineDocumentReport className="w-5 h-5" />, label: "Reviews", path: "/owner/ratings-reviews" },
    { icon: <HiOutlineCog className="w-5 h-5" />, label: "Settings", path: "/owner/profile-settings" },
];

const admin = [
    { icon: <HiOutlineHome className="w-5 h-5" />, label: "Dashboard", path: "/admin/dashboard", active: true },
    { icon: <HiOutlineClipboardList className="w-5 h-5" />, label: "Venue Management", path: "/admin/venues" },
    { icon: <HiOutlineUserGroup className="w-5 h-5" />, label: "User Management", path: "/admin/user-managment" },
    { icon: <HiOutlineCalendar className="w-5 h-5" />, label: "Booking Management", path: "/admin/booking-managment" },
    { icon: <HiOutlineTicket className="w-5 h-5" />, label: "Support Tickets", path: "/admin/support-ticket" },
    { icon: <HiOutlineDocumentReport className="w-5 h-5" />, label: "Content Management", path: "/admin/content-managment" },
    { icon: <HiOutlineChartBar className="w-5 h-5" />, label: "Analytics & Report", path: "/admin/analytics-report" },
    { icon: <HiOutlineCog className="w-5 h-5" />, label: "Setting", path: "/admin/settings/general-setting" },
];


const content = [
    { label: "Dashboard", path: "/admin/content-managment", active: true },
    { label: "Venue Management", path: "/admin/content-managment-f&q" },
    { label: "User Management", path: "/admin/content-managment-customer-suppoer" },
    
];


const navItems = admin; // Change to 'admin' for admin panel

const SideBar = () => {
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);

    useEffect(() => {
    setShowSidebar(pathname !== '/' && 
                   pathname !== "/pages/login" && 
                   pathname !== '/pages/signup' && 
                   pathname !== '/pages/forgot-password' && 
                   pathname !== '/admin/venue-details');
}, [pathname]);

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-lg shadow-md"
            >
                <HiOutlineMenu className="w-6 h-6" />
            </button>

            {/* Sidebar Overlay for Mobile */}
            {sidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-transparent bg-opacity-50 z-40"
                    onClick={() => setSidebarOpen(false)}
                />
            )}
            {showSidebar && (
                <aside className={clsx(
                    "w-64 h-[calc(100vh-1rem)] overflow-y-auto scrollbar-none bg-white flex flex-col p-4 sm:p-6 lg:p-8 rounded-r-3xl transition-transform duration-300 ease-in-out z-40",
                    "fixed lg:relative h-full lg:h-auto",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}>
                    <div>
                        <div className="text-xl sm:text-2xl font-bold leading-tight">Hall Booking</div>
                        <div className="text-xs text-gray-500 font-semibold mt-1 mb-6 lg:mb-8">
                            Super Admin Panel
                        </div>
                    </div>
                    <nav className="flex-1">
                        <ul className="space-y-1">
                            {navItems.map((item, idx) => (
                                <li key={item.label}>
                                    <a
                                        href={item.path}
                                        onClick={() => setSidebarOpen(false)}
                                        className={
                                            pathname === item.path
                                                ? "bg-[#7067ec] text-white flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                            // "flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                        }
                                    >
                                        {item.icon}
                                        <span className="truncate">{item.label}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            )}
        </>
    );
}

export default SideBar;