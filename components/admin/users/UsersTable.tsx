'use client';

import { useState, useMemo } from "react";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";
import ViewUserModal from "./ViewUserModal";

const data = [
  {
    id: "U001",
    name: "John Doe",
    email: "john@gmail.com",
    phone: "0771234567",
    role: "Admin",
    warehouse: "Main Warehouse",
    date: "2026-03-20",
    status: "Active",
  },
];

export default function UsersTable() {
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("");
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  const filtered = useMemo(() => {
    let d = data;

    if (search) {
      d = d.filter((u) =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.phone.includes(search)
      );
    }

    if (role) {
      d = d.filter((u) => u.role === role);
    }

    return d;
  }, [search, role]);

  return (
    <div>

      <div>

  {/* TOP RIGHT BUTTON */}
  <div className="flex justify-end mb-4">
    <button
      onClick={() => setAdd(true)}
      className="bg-sky-500 text-sky-50 hover:bg-sky-600 px-4 py-2 rounded"
    >
      + Add New User
    </button>
  </div>

  {/* SEARCH + FILTER ROW */}
  <div className="flex justify-between items-center mb-4">

    {/* LEFT SIDE (search + filter) */}
    <div className="flex gap-2">
      <input
        placeholder="Search name, email, phone..."
        className="border px-3 py-2 rounded"
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        onChange={(e) => setRole(e.target.value)}
        className="border px-3 py-2 rounded"
      >
        <option value="">All Roles</option>
        <option>Admin</option>
        <option>Manager</option>
        <option>Cashier</option>
        <option>Staff</option>
      </select>
    </div>

    {/* RIGHT SIDE (search button) */}
    <button className="bg-sky-500 text-sky-50 px-4 py-2 rounded">
      Search
    </button>
  </div>

</div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-gray-700">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">User ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Phone</th>
            <th className="p-2">Role</th>
            <th className="p-2">Warehouse</th>
            <th className="p-2">Created</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((u, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="p-2">{u.id}</td>
              <td className="p-2">{u.name}</td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.phone}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2">{u.warehouse}</td>
              <td className="p-2">{u.date}</td>

              <td className="p-2 flex gap-2 flex-wrap">

                <button onClick={()=>setView(u)} className="px-3 py-1 bg-sky-500 text-sky-50 rounded">View</button>

                <button onClick={()=>setEdit(u)} className="px-3 py-1 bg-gray-500 text-gray-50 rounded">Edit</button>

                <button className="px-3 py-1 bg-rose-500 text-rose-50 rounded">
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {add && <AddUserModal onClose={()=>setAdd(false)} />}
      {view && <ViewUserModal data={view} onClose={()=>setView(null)} />}
      {edit && <EditUserModal data={edit} onClose={()=>setEdit(null)} />}

    </div>
  );
}