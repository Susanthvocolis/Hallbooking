'use client';
import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Header from "@/app/components/Header";

interface Languages {
    english: boolean;
    hindi: boolean;
    telugu: boolean;
    gujarati: boolean;
    tamil: boolean;
    marathi: boolean;
}
const GeneralSettings = () => {
    const initialValues = {
        primaryEmail: "",
        supportNumber: "",
        timeZone: "",
        languages: {
            english: false,
            hindi: false,
            telugu: false,
            gujarati: false,
            tamil: false,
            marathi: false,
        },
    };
    const validationSchema = Yup.object().shape({
        primaryEmail: Yup.string().email("Invalid email format").required("Primary contact email is required"),
        supportNumber: Yup.string().required("Support contact number is required"),
        timeZone: Yup.string().required("Time zone is required"),
    });
    return (
        <>
            <Header title="General Settings" />
            <div className="overflow-y-scroll [scrollbar-width:none] h-[90vh] bg-[#ede6f8] p-3">
                <div className="bg-white rounded-xl p-6 shadow">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values, actions) => {
                            console.log("Saving settings:", values);
                            alert("Settings saved (see console)");
                            actions.setSubmitting(false);
                        }}
                    >
                        {({ values, isSubmitting, setFieldValue }) => (
                            <Form className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-medium mb-3">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Primary Contact Email</label>
                                            <Field
                                                name="primaryEmail"
                                                type="email"
                                                className="w-full border rounded-md p-3 bg-gray-50"
                                                placeholder="Loremipsum123@gmail.com"
                                            />
                                            <ErrorMessage name="primaryEmail" component="div" className="text-xs text-red-500 mt-1" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Support Contact Number</label>
                                            <Field
                                                name="supportNumber"
                                                className="w-full border rounded-md p-3 bg-gray-50"
                                                placeholder="+90 9876543210"
                                            />
                                            <ErrorMessage name="supportNumber" component="div" className="text-xs text-red-500 mt-1" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-lg font-medium mb-3">Regional Settings</h3>
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium mb-2">Default Time Zone</label>
                                        <Field name="timeZone" as="select" className="w-full border rounded-md p-3 bg-white">
                                            <option value="">Select Time Zone. Example: IST, GMT+5:30 etc</option>
                                            <option value="IST">IST (GMT+5:30)</option>
                                            <option value="GMT">GMT (UTC+0)</option>
                                            <option value="PST">PST (UTC-8)</option>
                                        </Field>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-3">Language Settings</label>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                            {([
                                                ["english", "English"],
                                                ["hindi", "Hindi"],
                                                ["telugu", "Telugu"],
                                                ["gujarati", "Gujarati"],
                                                ["tamil", "Tamil"],
                                                ["marathi", "Marathi"],
                                            ] as [keyof Languages, string][]).map(([key, label]) => (
                                                <Field name={`languages.${key}`} key={key}>
                                                    {({ field, form }: any) => (
                                                        <label
                                                            className="flex items-center gap-3 p-3 border rounded-md bg-gray-50 cursor-pointer"
                                                            onClick={() => form.setFieldValue(field.name, !field.value)}
                                                        >
                                                            <input
                                                                type="checkbox"
                                                                checked={field.value}
                                                                readOnly
                                                                className="w-4 h-4 accent-indigo-600"
                                                            />
                                                            <div className="flex-1 text-sm">{label}</div>

                                                            <div
                                                                aria-hidden
                                                                className={`w-10 h-6 rounded-full p-1 transition-colors ${field.value ? "bg-indigo-600" : "bg-gray-200"
                                                                    }`}
                                                            >
                                                                <div
                                                                    className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${field.value ? "translate-x-4" : "translate-x-0"
                                                                        }`}
                                                                />
                                                            </div>
                                                        </label>
                                                    )}
                                                </Field>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            // resetting to defaults via page reload is simple; here we just alert the user
                                            alert("Reset to defaults (demo) — implement as needed.");
                                        }}
                                        className="px-5 py-2 border rounded-md text-indigo-600"
                                    >
                                        CANCEL
                                    </button>

                                    <div className="flex items-center gap-4">
                                        <button type="submit" disabled={isSubmitting} className="px-5 py-2 bg-indigo-600 text-white rounded-md">
                                            SAVE
                                        </button>
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </>
    );
};

export default GeneralSettings;