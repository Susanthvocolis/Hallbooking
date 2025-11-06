'use client';
import React, { useState, useEffect, use } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { FaRegEye, FaEdit } from "react-icons/fa";
import { ImBin } from "react-icons/im";
import ProtectedRoute from '@/app/ProtectedRoute';
import { register, getEmployees, updateUser, deleteUser } from '@/app/services/LoginService/loginService';
import Header from '@/app/components/Header';

interface User {
    _id?: string;
    fullName?: string;
    email?: string;
    phoneNo?: string;
    employeeDetails?: {
        department?: string;
        permissions?: {
            manageUsers?: number;
            manageHallOwners?: number;
            handleSupportTickets?: number;
            manageBookings?: number;
        }
    }
}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Employee Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNo: Yup.string().required('Mobile No is required'),
    employeeDetails: Yup.object().shape({
        department: Yup.string().required('Department is required'),
    })
});


const Table = ({ setShowForm, onEdit }: { setShowForm: (show: boolean) => void; onEdit: (employee: User) => void; }) => {
    const [employees, setEmployees] = useState<User[]>([]);

    const columns: TableColumn<User>[] = [
        {
            name: 'Name',
            selector: row => row.fullName || '',
        },
        {
            name: 'Department',
            selector: row => row.employeeDetails?.department || '',
        },
        {
            name: 'Actions',
            cell: row => (
                <div className="flex gap-2">
                    <button className="text-green-500 w-7 h-7 rounded-full flex items-center justify-center text-lg"><FaRegEye /></button>
                    <button onClick={() => onEdit(row)} className="text-orange-500 w-7 h-7 rounded-full flex items-center justify-center text-lg"><FaEdit /></button>
                    <button onClick={() => row._id && handleDelete(row._id)} className="text-red-500 w-7 h-7 rounded-full flex items-center justify-center text-lg"><ImBin /></button>
                </div>
            )
        }
    ];

    const fetchEmployees = async () => {
        const employees = await getEmployees();
        setEmployees(employees.data || []);
    };

    const handleDelete = async (userId: string) => {
        const result = await deleteUser(userId);
        if (result.status === 200) {
            alert(result?.message);
            fetchEmployees();
        } else {
            alert('Error deleting user');
        }
    }
    useEffect(() => {
        fetchEmployees();
    }, []);
    return (
        <>
            <div>
                <div className='flex justify-between items-center mb-4 bg-white p-4 rounded-lg'>
                    <p>All Employees</p>
                    <button onClick={() => { setShowForm(true), onEdit({}) }} className='bg-blue-500 text-white px-4 py-2 rounded-lg'>Add New Employee</button>
                </div>
                <DataTable
                    columns={columns}
                    data={employees}
                    pagination
                    highlightOnHover
                />
            </div>
        </>
    );
}

const RegisterForm = ({ setShowForm, editData }: { setShowForm: (show: boolean) => void; editData: User | null }) => {
    const initialValues = editData || {
        fullName: '',
        email: '',
        phoneNo: '',
        employeeDetails: {
            department: '',
            permissions: {
                manageUsers: 0,
                manageHallOwners: 0,
                handleSupportTickets: 0,
                manageBookings: 0,
            }
        }
    };

    const onSubmit = async (values: any, { resetForm }: any) => {
        const valuesToSubmit = { ...values, password: '12345678', role: 'employee' };
        let result;
        if (editData && editData?._id) {
            // console.log('editData found', values);
            result = await updateUser(editData._id, values);
        } else {
            result = await register(valuesToSubmit);
        }
        if (result.status === 200) {
            alert(result?.message);
            setShowForm(false);
            //initial values will clear after submit
            resetForm();
        } else {
            alert('Error in Registration');
            setShowForm(true);
        }
    }
    console.log('editData', editData);
    return (
        <main className="px-2 py-8 md:px-8  mx-auto">
            <h1 className="text-2xl font-bold mb-8">Employee Registration</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                // onSubmit={async (values, actions) => {
                //     const valuesToSubmit = { ...values, password: '12345678', role: 'employee' };
                //     // const result = await register(valuesToSubmit)
                //     let result;

                //     if (editData) {
                //         alert(editData)
                //         // 🔹 Update existing employee
                //         // result = await updateEmployee(editData._id, valuesToSubmit);
                //     } else {
                //         // 🔹 Create new employee
                //         result = await register(valuesToSubmit);
                //     }
                //     if (result.status === 200) {
                //         alert(result?.message);
                //         setShowForm(false);
                //     } else {
                //         alert('Error in Registration');
                //         setShowForm(true);
                //     }
                // }}
                onSubmit={onSubmit}
            >
                {({ setFieldValue, isSubmitting, values }) => (
                    <Form className="flex flex-col gap-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="fullName">Employee Name</label>
                                <Field name="fullName" className="w-full border rounded-lg p-2" />
                                <ErrorMessage name="fullName" component="div" className="text-xs text-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="mobile">Email</label>
                                <Field name="email" className="w-full border rounded-lg p-2" />
                                <ErrorMessage name="email" component="div" className="text-xs text-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="mobile">Mobile No</label>
                                <Field name="phoneNo" type="text" className="w-full border rounded-lg p-2" />
                                <ErrorMessage name="phoneNo" component="div" className="text-xs text-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="location">Department</label>
                                <Field name="employeeDetails.department" className="w-full border rounded-lg p-2" />
                                <ErrorMessage name="employeeDetails.department" component="div" className="text-xs text-red-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold mb-1" htmlFor="venueType">Permission</label>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>Users Management</label>
                                    <Field type="checkbox" checked={values.employeeDetails?.permissions?.manageUsers === 1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue(
                                                "employeeDetails.permissions.manageUsers",
                                                e.target.checked ? 1 : 0
                                            )
                                        } name="employeeDetails.permissions.manageUsers" className="w-full border rounded-lg p-2" />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>HallOwners Management</label>
                                    <Field type="checkbox" checked={values.employeeDetails?.permissions?.manageHallOwners === 1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue(
                                                "employeeDetails.permissions.manageHallOwners",
                                                e.target.checked ? 1 : 0
                                            )
                                        } name="employeeDetails.permissions.manageHallOwners" className="w-full border rounded-lg p-2" />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>SupportTickets Management</label>
                                    <Field type="checkbox" checked={values.employeeDetails?.permissions?.handleSupportTickets === 1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue(
                                                "employeeDetails.permissions.handleSupportTickets",
                                                e.target.checked ? 1 : 0
                                            )
                                        } name="employeeDetails.permissions.handleSupportTickets" className="w-full border rounded-lg p-2" />
                                </div>
                                <div className='flex justify-between items-center gap-4'>
                                    <label>Bookings Management</label>
                                    <Field type="checkbox" checked={values.employeeDetails?.permissions?.manageBookings === 1}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            setFieldValue(
                                                "employeeDetails.permissions.manageBookings",
                                                e.target.checked ? 1 : 0
                                            )
                                        } name="employeeDetails.permissions.manageBookings" className="w-full border rounded-lg p-2" />
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
    const [editData, setEditData] = useState<User | null>(null);

    const handleEdit = (employee: User) => {
        setEditData(employee);
        setShowForm(true);
    };
    return (
        <ProtectedRoute requiredRole={['super_admin']}>
            <>
                <Header title='Employee Management' />
                <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#ede6f8] p-6">
                    {showForm ? <RegisterForm setShowForm={setShowForm} editData={editData} /> : <Table setShowForm={setShowForm} onEdit={handleEdit} />}
                </div>
            </>
        </ProtectedRoute>
    )
}

export default EmployeeManagementPage;