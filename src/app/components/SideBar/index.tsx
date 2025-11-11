"use client";
import ProtectedRoute from '@/app/ProtectedRoute';
import { Owner, SuperAdmin } from '@/app/components/SideBarItems';
import { DecodeJwtToken } from '@/app/utils/DecodeJwtToken';
import clsx from "clsx";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { HiOutlineMenu } from "react-icons/hi";


const SideBar = () => {
    const pathname = usePathname();
    const [showSidebar, setShowSidebar] = useState(false);
    const [sidebarOpen, setSidebarOpen] = React.useState(false);
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
    const decode = DecodeJwtToken();

    let navItems

    switch (decode?.role) {
        case 'super_admin':
            navItems = SuperAdmin;
            break;
        case 'employee':
            navItems = Owner;
            break;
        case 'hall_owner':
            navItems = Owner;
            break;
        case 'service_vendor':
            navItems = Owner;
            break;
        case 'end_user':
            navItems = Owner;
            break;
        default:
            navItems = Owner;
            break;
    }

    useEffect(() => {
        setShowSidebar(pathname !== '/' &&
            pathname !== "/pages/login" &&
            pathname !== '/pages/signup' &&
            pathname !== '/pages/forgot-password' &&
            pathname !== '/admin/venue-details');
    }, [pathname]);

    return (
        // <ProtectedRoute requiredRole={['super_admin', 'employee', 'venue_owner', 'service_vendor']}>
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
                        <ul className="space-y-1 h-[70vh] overflow-y-auto ">
                            {navItems.map((item, idx) => {
                                const key = `${item.label}-${idx}`;
                                // parent is active if its path matches or any submenu path matches current pathname
                                const parentActive = pathname === item.path || (item.submenu || []).some(si => si.path === pathname);

                                return (
                                    <div key={key}
                                        className={item.submenu && parentActive ? "bg-gray-200 rounded-lg p-2" : ""}>
                                        <li>
                                            {item.submenu ? (
                                                // render a button for parents with submenu to toggle children
                                                <button
                                                    type="button"
                                                    onClick={() => setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }))}
                                                    className={
                                                        parentActive
                                                            ? "w-full text-left bg-gray-200 text-gray-600 flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                            : "w-full text-left text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                    }
                                                >
                                                    {item.icon}
                                                    <span className="truncate">{item.label}</span>
                                                    <span className="ml-auto">{openMenus?.[key] ? '▾' : '▸'}</span>
                                                </button>
                                            ) : (
                                                <Link
                                                    href={item.path}
                                                    onClick={() => {
                                                        setSidebarOpen(false);
                                                        setOpenMenus(openMenus);
                                                    }}
                                                    className={
                                                        parentActive
                                                            ? "bg-[#7067ec] text-white flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                            : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                    }
                                                >
                                                    {item.icon}
                                                    <span className="truncate">{item.label}</span>
                                                </Link>
                                            )}
                                        </li>

                                        {/* render submenu when toggled open */}
                                        {item.submenu && openMenus?.[key] && (
                                            <div className="pl-6 mt-1 space-y-1">
                                                {item.submenu.map((subitem, sidx) => (
                                                    <Link
                                                        key={`${subitem.label}-${sidx}`}
                                                        href={subitem.path}
                                                        onClick={() => setSidebarOpen(false)}
                                                        className={
                                                            pathname === subitem.path
                                                                ? "bg-[#7067ec] text-white flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 flex items-center gap-3 px-3 py-2 rounded-lg font-medium text-sm sm:text-base transition"
                                                        }
                                                    >
                                                        {/* {subitem.icon} */}
                                                        ▸
                                                        <span className="truncate">{subitem.label}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>
            )}
        </>
        // </ProtectedRoute>
    );
}

export default SideBar;