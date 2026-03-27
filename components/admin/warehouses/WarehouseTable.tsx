'use client';

import { useState, useMemo } from "react";
import ViewWarehouseModal from "./ViewWarehouseModal";
import EditWarehouseModal from "./EditWarehouseModal";

const initialData = [
  {
    id: "WH-001",
    name: "Main Warehouse",
    address: "12/4 Main Street, Colombo",
    manager: "John Silva",
    contact: "0771234567",

  },
  {
    id: "WH-002",
    name: "Galle Branch",
    address: "45 Beach Road, Galle",
    manager: "Nimal Perera",
    contact: "0779876543",

  },
  {
    id: "WH-003",
    name: "Matara Depot",
    address: "78 Station Road, Matara",
    manager: "Kasun Fernando",
    contact: "0712345678",
  },
  {
    id: "WH-004",
    name: "Kandy Storage",
    address: "22 Hill Street, Kandy",
    manager: "Saman Kumara",
    contact: "0763456789",
  },
  {
    id: "WH-005",
    name: "Negombo Hub",
    address: "9 Lagoon Road, Negombo",
    manager: "Ruwan Jayasuriya",
    contact: "0756789123",
  },
];

export default function WarehouseTable({ filters }: any) {
  const [data, setData] = useState(initialData);
  const [viewItem, setViewItem] = useState<any>(null);
  const [editItem, setEditItem] = useState<any>(null);

  const filtered = useMemo(() => {
    if (!filters?.name) return data;
    return data.filter((w) => w.name === filters.name);
  }, [filters, data]);

  const deleteWarehouse = (id: string) => {
    setData(data.filter((w) => w.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-gray-700">
          <thead className="bg-white">
            <tr>
              <th className="p-3 text-left">Warehouse ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Address</th>
              <th className="p-3 text-left">Manager</th>
              <th className="p-3 text-left">Contact No</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((w, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="p-3">{w.id}</td>
                <td className="p-3 font-medium">{w.name}</td>
                <td className="p-3">{w.address}</td>
                <td className="p-3">{w.manager}</td>
                <td className="p-3">{w.contact}</td>

                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setViewItem(w)}
                    className="px-2 py-1 bg-sky-500 text-sky-50 rounded cursor-pointer hover:bg-sky-600 transition-colors"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setEditItem(w)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 rounded cursor-pointer hover:bg-slate-300 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteWarehouse(w.id)}
                    className="px-2 py-1 bg-rose-500 text-rose-50 rounded cursor-pointer hover:bg-rose-600 transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewItem && (
        <ViewWarehouseModal
          data={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}

      {editItem && (
        <EditWarehouseModal
          data={editItem}
          onClose={() => setEditItem(null)}
        />
      )}
    </>
  );
}