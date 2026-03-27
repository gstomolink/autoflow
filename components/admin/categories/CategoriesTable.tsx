'use client';

import { useState, useMemo } from "react";
import CategoryFormModal from "./CategoryFormModal";
import ViewCategoryModal from "./ViewCategoryModal";
import { useAdminI18n } from "@/components/layout/AdminI18nProvider";

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
  const { t } = useAdminI18n();
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
              <th className="p-3 text-left">{t("tableCategoryId")}</th>
              <th className="p-3 text-left">{t("tableName")}</th>
              <th className="p-3 text-left">{t("tableDescription")}</th>
              <th className="p-3 text-left">{t("tableProducts")}</th>
              <th className="p-3 text-left">{t("tableCreated")}</th>
              <th className="p-3 text-left">{t("tableActions")}</th>
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
                    className="px-2 py-1 bg-sky-500 text-sky-50 rounded hover:bg-sky-600 transition-colors cursor-pointer"
                  >
                    {t("actionView")}
                  </button>
                  <button
                    onClick={() => setEditItem(cat)}
                    className="px-2 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 transition-colors cursor-pointer"
                  >
                    {t("actionEdit")}
                  </button>
                  <button
                    onClick={() => deleteCategory(cat.id)}
                    className="px-2 py-1 bg-rose-500 text-rose-50 rounded hover:bg-rose-600 transition-colors cursor-pointer"
                  >
                    {t("actionDelete")}
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