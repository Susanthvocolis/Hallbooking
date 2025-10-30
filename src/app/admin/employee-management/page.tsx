'use client';
import React, { useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaRegEye, FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import ProtectedRoute from '@/app/ProtectedRoute';

interface User {
    id: number;
    name: string;
    type: string;
    status: "Active" | "Pending";
    location: string;
    joined: string;
    lastActive: string;
}

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

const staticUsers: User[] = [
    {
        id: 1,
        name: "Raj Sharma",
        type: "Banquet",
        status: "Pending",
        location: "Mumbai, MH",
        joined: "2025-07-22",
        lastActive: "2025-07-22",
    },
    {
        id: 2,
        name: "Raj Sharma",
        type: "Banquet",
        status: "Pending",
        location: "Mumbai, MH",
        joined: "2025-07-22",
        lastActive: "2025-07-22",
    }
    // ...Array(6).fill({
    //     // id: 2,
    //     name: "Raj Sharma",
    //     type: "Banquet",
    //     status: "Active",
    //     location: "Mumbai, MH",
    //     joined: "2025-07-22",
    //     lastActive: "2025-07-22",
    // }),
];

const columns: TableColumn<User>[] = [
    {
        name: 'Name',
        selector: row => row.name,
    },
    {
        name: 'Department',
        selector: row => row.type,
    },
    // {
    //     name: 'Status',
    //     cell: row => (
    //         row.status === "Pending" ?
    //             <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-semibold">Pending</span> :
    //             <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">Active</span>
    //     )
    // },
    // {
    //     name: 'Location',
    //     selector: row => row.location,
    // },
    {
        name: 'Joined',
        selector: row => row.joined,
    },
    {
        name: 'Last Active',
        selector: row => row.lastActive,
    },
    {
        name: 'Actions',
        cell: row => (
            <div className="flex gap-2">
                <button className="text-green-500 w-7 h-7 rounded-full flex items-center justify-center text-lg"><FaRegEye /></button>
                <button className="text-orange-500 w-7 h-7 rounded-full flex items-center justify-center text-lg"><FaEdit /></button>
                <button className="text-red-500 w-7 h-7 rounded-full flex items-center justify-center text-lg"><ImBin /></button>
            </div>
        )
    }
];

const Table = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
    return (
        <>
            <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
            <p>Manage your Employee here.</p>
            <div>
                <div className='flex justify-between items-center mb-4 bg-white p-4 rounded-lg'>
                    <p>All Employees</p>
                    <button onClick={() => setShowForm(true)} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add New Employee</button>
                </div>
                <DataTable
                    columns={columns}
                    data={staticUsers}
                    pagination
                    highlightOnHover
                />
            </div>
        </>
    );
}

const RegisterForm = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
    return (
        <main className="px-2 py-8 md:px-8  mx-auto">
            <h1 className="text-2xl font-bold mb-8">Employee Registration</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    alert('Employee Registration Submitted!\n' + JSON.stringify(values, null, 2));
                    actions.setSubmitting(false);
                }}
            >
                {({ setFieldValue, isSubmitting, values }) => (
                    <Form className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="venueName">Name</label>
                                <Field name="venueName" className="w-full border rounded-lg p-2" />
                                <ErrorMessage name="venueName" component="div" className="text-xs text-red-500" />
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
                                <label className="block text-sm font-semibold mb-1" htmlFor="location">Department</label>
                                <Field name="location" className="w-full border rounded-lg p-2" />
                                <ErrorMessage name="location" component="div" className="text-xs text-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="venueType">Permission</label>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>Users Management</label>
                                    <Field type="checkbox" name="userManagement" className="w-full border rounded-lg p-2" />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>HallOwners Management</label>
                                    <Field type="checkbox" name="hallOwnersManagement" className="w-full border rounded-lg p-2" />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>SupportTickets Management</label>
                                    <Field type="checkbox" name="supportTicketsManagement" className="w-full border rounded-lg p-2" />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>Bookings Management</label>
                                    <Field type="checkbox" name="bookingsManagement" className="w-full border rounded-lg p-2" />
                                </div>
                                <ErrorMessage name="venueType" component="div" className="text-xs text-red-500" />
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
const EmployeeManagementPage = () => {
    const [showForm, setShowForm] = useState(false)
    return (
        <ProtectedRoute requiredRole={['super_admin']}>
            <div className="overflow-y-scroll [scrollbar-width:none] h-[100vh] bg-[#ede6f8] p-6">
                {showForm ? <RegisterForm setShowForm={setShowForm} /> : <Table setShowForm={setShowForm} />}
            </div>
        </ProtectedRoute>
    )
}

export default EmployeeManagementPage;