'use client';

import { useState, useMemo } from "react";
import CategoryFormModal from "./CategoryFormModal";
import ViewCategoryModal from "./ViewCategoryModal";

const initialCategories = [
  {
    id: "CAT-001",
    name: "Electronics",
    description: "Devices & gadgets",
    count: 120,
    created: "2026-03-01",

  },
  {
    id: "CAT-002",
    name: "Accessories",
    description: "Add-ons & extras",
    count: 80,
    created: "2026-03-05",
  },
];

export default function CategoriesTable({ filters }: any) {
  const [categories, setCategories] = useState(initialCategories);
  const [editItem, setEditItem] = useState<any>(null);
  const [viewItem, setViewItem] = useState<any>(null);

  const filteredData = useMemo(() => {
    let data = categories;

    if (filters?.category) {
      data = data.filter((c) => c.name === filters.category);
    }


    return data;
  }, [filters, categories]);

  const deleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-white text-black text-sm">
            <tr>
              <th className="p-3 text-left">Category ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Products</th>
              <th className="p-3 text-left">Created</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((cat, i) => (
              <tr key={i} className="border-t">
                <td className="p-3 text-gray-700">{cat.id}</td>
                <td className="p-3 font-medium text-gray-700">{cat.name}</td>
                <td className="p-3 text-gray-700">{cat.description}</td>
                <td className="p-3 text-gray-700">{cat.count}</td>
                <td className="p-3 text-gray-700">{cat.created}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => setViewItem(cat)}
                    className="px-2 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    onClick={() => setEditItem(cat)}
                    className="px-2 py-1 bg-slate-200 text-slate-800 rounded hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="px-2 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && (
        <CategoryFormModal
          mode="edit"
          data={editItem}
          onClose={() => setEditItem(null)}
        />
      )}

      {viewItem && (
        <ViewCategoryModal
          data={viewItem}
          onClose={() => setViewItem(null)}
        />
      )}
    </>
  );
}