"use client";
import UserManagement from "@/app/admin/user-managment/page";
import React, { useState } from "react";

// Sample static data for demo
const adminRows = Array(6).fill({
  name: "Rajesh Sharma",
  email: "loremipsum@gmail.com",
  currentRole: "SUPER ADMIN",
  assignRole: "SUPER ADMIN",
  status: "ACTIVE",
});

const rolePerms = [
  { role: "Super Admin", create: true, edit: false, delete: false, approve: true },
  { role: "Admin", create: true, edit: false, delete: false, approve: false },
  { role: "Moderator", create: true, edit: false, delete: false, approve: false },
  { role: "User", create: false, edit: false, delete: false, approve: false }
];

const suspendRows = Array(5).fill({
  name: "Rajesh Sharma",
  role: "Admin",
  lastActive: "2 Hours ago",
  status: "ACTIVE"
});

const AccountLimitsSection = () => (
  <div className="mb-10">
    <p className="font-semibold text-sm mb-3 text-black">Account Limits</p>
    <div className="rounded-md bg-[#7267d6] flex flex-col items-center justify-center py-8 mb-8">
      <div className="text-white text-3xl font-semibold mb-2">8</div>
      <div className="text-white text-lg">Current Active Admin Accounts</div>
    </div>
  </div>
);

const AssignRemoveAdminRolesSection = () => (
  <div className="mb-10">
    <p className="font-semibold text-lg mb-2 text-black">Assign / Remove Admin Roles</p>
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-[700px] w-full text-base border-collapse">
        <thead>
          <tr className="bg-[#f1f1f4]">
            <th className="py-3 px-4 text-left font-semibold">User Name</th>
            <th className="py-3 px-4 text-left font-semibold">Email</th>
            <th className="py-3 px-4 text-left font-semibold">Current Role</th>
            <th className="py-3 px-4 text-left font-semibold">Assign Role</th>
            <th className="py-3 px-4 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {adminRows.map((a, idx) => (
            <tr key={idx} className="border-b border-[#f1f1f4] last:border-b-0">
              <td className="py-3 px-4">{a.name}</td>
              <td className="py-3 px-4">{a.email}</td>
              <td className="py-3 px-4 font-semibold text-[#22bb5f]">{a.currentRole}</td>
              <td className="py-3 px-4 font-semibold text-[#ef9c43]">{a.assignRole}</td>
              <td className="py-3 px-4 font-semibold text-[#22bb5f]">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SetRolePermissionsSection = () => (
  <div className="mb-10">
    <p className="font-semibold text-lg mb-2 text-black">Set Role Permissions</p>
    <div className="overflow-x-auto rounded-md">
      <table className="min-w-[600px] w-full text-base border-collapse">
        <thead>
          <tr className="bg-[#f1f1f4]">
            <th className="py-3 px-4 text-left font-semibold">Role</th>
            <th className="py-3 px-4 text-center font-semibold">Create</th>
            <th className="py-3 px-4 text-center font-semibold">Edit</th>
            <th className="py-3 px-4 text-center font-semibold">Delete</th>
            <th className="py-3 px-4 text-center font-semibold">Approve</th>
          </tr>
        </thead>
        <tbody>
          {rolePerms.map((perm, idx) => (
            <tr key={idx} className="border-b border-[#f1f1f4] last:border-b-0">
              <td className="py-3 px-4">{perm.role}</td>
              <td className="py-3 px-4 text-center">
                <input type="checkbox" checked={perm.create} readOnly className="accent-[#7267d6] h-5 w-5 rounded" />
              </td>
              <td className="py-3 px-4 text-center">
                <input type="checkbox" checked={perm.edit} readOnly className="accent-[#7267d6] h-5 w-5 rounded" />
              </td>
              <td className="py-3 px-4 text-center">
                <input type="checkbox" checked={perm.delete} readOnly className="accent-[#7267d6] h-5 w-5 rounded" />
              </td>
              <td className="py-3 px-4 text-center">
                <input type="checkbox" checked={perm.approve} readOnly className="accent-[#7267d6] h-5 w-5 rounded" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const SuspendReactiveAdminsSection: React.FC = () => {
  const [suspended, setSuspended] = useState(Array(suspendRows.length).fill(false));
  return (
    <div>
      <p className="font-semibold text-lg mb-2 text-black">Suspend / Reactive Admins</p>
      <div className="overflow-x-auto rounded-md">
        <table className="min-w-[600px] w-full text-base border-collapse">
          <thead>
            <tr className="bg-[#f1f1f4]">
              <th className="py-3 px-4 text-left font-semibold">Admin Name</th>
              <th className="py-3 px-4 text-left font-semibold">Role</th>
              <th className="py-3 px-4 text-left font-semibold">Last Active</th>
              <th className="py-3 px-4 text-left font-semibold">Status</th>
              <th className="py-3 px-4 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {suspendRows.map((admin, idx) => (
              <tr key={idx} className="border-b border-[#f1f1f4] last:border-b-0">
                <td className="py-3 px-4">{admin.name}</td>
                <td className="py-3 px-4">{admin.role}</td>
                <td className="py-3 px-4">{admin.lastActive}</td>
                <td className="py-3 px-4 font-semibold text-[#22bb5f]">{admin.status}</td>
                <td className="py-3 px-4">
                  {/* Switch */}
                  <div
                    onClick={() =>
                      setSuspended((v) =>
                        v.map((b, i) => (i === idx ? !b : b))
                      )
                    }
                    className={`inline-block w-10 h-6 rounded-full cursor-pointer border transition ${
                      suspended[idx] ? "bg-[#7267d6]" : "bg-[#d1d5db]"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full shadow transition-all duration-200 ${
                        suspended[idx]
                          ? "translate-x-4 bg-white"
                          : "translate-x-1 bg-white"
                      }`}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Buttons */}
      <div className="flex gap-3 justify-end mt-8">
        <button className="px-8 py-2 rounded border border-[#7267d6] text-[#7267d6] font-semibold bg-white hover:bg-[#f4f1fa]">CANCEL</button>
        <button className="px-8 py-2 rounded bg-[#7267d6] text-white font-semibold hover:bg-[#5743ea]">SAVE</button>
      </div>
    </div>
  );
};

const UserManagementSetting: React.FC = () => (
  <div className="bg-white rounded-2xl p-6 max-w-4xl mx-auto mt-6">
    <AccountLimitsSection />
    <AssignRemoveAdminRolesSection />
    <SetRolePermissionsSection />
    <SuspendReactiveAdminsSection />
  </div>
);

export default UserManagementSetting;
