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

interface NavItem {
    icon: React.ReactElement;
    label: string;
    path: string;
    submenu?: {
        label: string;
        path: string;
    }[];
}

export const SuperAdmin: NavItem[] = [
    {
        icon: <HiOutlineHome className="w-5 h-5" />,
        label: "Dashboard",
        path: "/admin/dashboard",
    },
    {
        icon: <HiOutlineClipboardList className="w-5 h-5" />,
        label: "Venue Management",
        path: "/admin/venues"
    },
    {
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
        label: "User Management",
        path: "/admin/user-managment"
    },
    {
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
        label: "Service Management",
        path: "/admin/service-management"
    },
    {
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
        label: "Employee Management",
        path: "/admin/employee-management"
    },
    {
        icon: <HiOutlineCalendar className="w-5 h-5" />,
        label: "Booking Management",
        path: "/admin/booking-managment"
    },
    {
        icon: <HiOutlineTicket className="w-5 h-5" />,
        label: "Support Tickets",
        path: "/admin/support-ticket"
    },
    {
        icon: <HiOutlineDocumentReport className="w-5 h-5" />,
        label: "Content Management",
        path: "/admin/content-managment",
        submenu: [
            {
                label: "Blogs",
                path: "/admin/content-managment/blogs",
            },
            {
                label: "FAQs",
                path: "/admin/content-managment/faqs",
            },
            {
                label: "Static Pages",
                path: "/admin/content-managment/static-pages",
            },
        ]
    },
    {
        icon: <HiOutlineChartBar className="w-5 h-5" />,
        label: "Analytics & Report",
        path: "/admin/analytics-report"
    },
    {
        icon: <HiOutlineCog className="w-5 h-5" />,
        label: "Setting",
        path: "/admin/settingss",
        submenu: [
            {
                label: "General Settings",
                path: "/admin/settings/general",
            },
            {
                label: "Payment & Transaction",
                path: "/admin/settings/payment-transaction",
            },
            {
                label: "Content & CMS",
                path: "/admin/settings/content-cms",
            },
            {
                label: "System Integration",
                path: "/admin/settings/system-integration",
            },
        ]
    },
];

export const Owner: NavItem[] = [
    {
        icon: <HiOutlineHome className="w-5 h-5" />,
        label: "Dashboard",
        path: "/owner/dashboard",
    },
    {
        icon: <HiOutlineClipboardList className="w-5 h-5" />,
        label: "Venue Registration",
        path: "/owner/venue-registration"
    },
    {
        icon: <HiOutlineUserGroup className="w-5 h-5" />,
        label: "Bookings",
        path: "/owner/booking-dashboard"
    },
    {
        icon: <HiOutlineCalendar className="w-5 h-5" />,
        label: "Availability",
        path: "/owner/availability-calendar"
    },
    {
        icon: <HiOutlineTicket className="w-5 h-5" />,
        label: "Enquiries",
        path: "/owner/enquiry-lead-manager"
    },
    {
        icon: <HiOutlineDocumentReport className="w-5 h-5" />,
        label: "Reviews",
        path: "/owner/ratings-reviews"
    },
    {
        icon: <HiOutlineCog className="w-5 h-5" />,
        label: "Settings",
        path: "/owner/profile-settings"
    },
];