'use client';

import { useState } from "react";

// USERS COMPONENTS
import UsersTable from "@/components/admin/users/UsersTable";

// ROLES COMPONENTS
import RolesTable from "@/components/admin/roles/RolesTable";

export default function UsersRolesPage() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users");

  return (
    <div className="text-gray-700">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Users & Roles</h1>
        <p className="text-gray-500">
          Manage system users, roles, and permissions
        </p>
      </div>

      {/* TABS */}
<div className="flex gap-6 mb-6 border-b border-gray-200">
  <button
    onClick={() => setActiveTab("users")}
    className={`pb-2 cursor-pointer ${
      activeTab === "users"
        ? "text-sky-500 border-b-2 border-sky-500 font-medium"
        : "text-gray-500 hover:text-sky-500"
    }`}
  >
    Users
  </button>

  <button
    onClick={() => setActiveTab("roles")}
    className={`pb-2 cursor-pointer ${
      activeTab === "roles"
        ? "text-sky-500 border-b-2 border-sky-500 font-medium"
        : "text-gray-500 hover:text-sky-500"
    }`}
  >
    Roles
  </button>
</div>

      {/* CONTENT */}
      <div>
        {activeTab === "users" && <UsersTable />}
        {activeTab === "roles" && <RolesTable />}
      </div>

    </div>
  );
}