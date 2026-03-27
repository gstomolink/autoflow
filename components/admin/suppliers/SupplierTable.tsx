'use client';

import { useState, useMemo } from "react";
import ViewSupplierModal from "./ViewSupplierModal";
import EditSupplierModal from "./EditSupplierModal";

const data = [
  {
    id: "SUP-001",
    name: "ABC Traders",
    contact: "0771234567",
    email: "abc@gmail.com",
    address: "12/4 Main Street, Colombo",
  },
  {
    id: "SUP-002",
    name: "Global Supplies",
    contact: "0719876543",
    email: "global@gmail.com",
    address: "45 Beach Road, Galle",
  },
];

export default function SupplierTable() {
  const [search, setSearch] = useState("");
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);
  const [suppliers, setSuppliers] = useState(data);

  const filtered = useMemo(() => {
    if (!search) return suppliers;

    return suppliers.filter((s) =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, suppliers]);

  const deleteSupplier = (id: string) => {
    setSuppliers(suppliers.filter((s) => s.id !== id));
  };

  return (
    <>
      {/* SEARCH LINE */}
      <div className="flex justify-between items-center mb-4">
        <input
          placeholder="Search suppliers..."
          onChange={(e) => setSearch(e.target.value)}
          className="border border-gray-300 text-gray-700 px-3 py-2 rounded w-72 cursor-pointer"
        />

        <button className="bg-sky-500 text-sky-50 px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors cursor-pointer">
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white rounded shadow text-gray-700">
        <thead className="bg-white">
          <tr>
            <th className="p-3">Supplier ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Contact</th>
            <th className="p-3">Email</th>
            <th className="p-3">Address</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((s, i) => (
            <tr key={i} className="border-t border-gray-300">
              <td className="p-3">{s.id}</td>
              <td className="p-3 font-medium">{s.name}</td>
              <td className="p-3">{s.contact}</td>
              <td className="p-3">{s.email}</td>
              <td className="p-3">{s.address}</td>

              <td className="p-3 space-x-2">
                <button
                  onClick={() => setViewItem(s)}
                  className="px-2 py-1 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer"
                >
                  View
                </button>

                <button
                  onClick={() => setEditItem(s)}
                  className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors cursor-pointer"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteSupplier(s.id)}
                  className="px-2 py-1 bg-rose-500 text-rose-50 rounded hover:bg-rose-600 transition-colors cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {viewItem && (
        <ViewSupplierModal data={viewItem} onClose={() => setViewItem(null)} />
      )}

      {editItem && (
        <EditSupplierModal data={editItem} onClose={() => setEditItem(null)} />
      )}
    </>
  );
}