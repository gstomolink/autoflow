'use client';

import { useState } from "react";

export default function EditStockModal({ data, onClose, onSave }: any) {

  const [form, setForm] = useState({ ...data });

  const handleChange = (key:string, value:any) => {
    setForm((prev: any) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[500px] p-6 rounded-xl relative">

        <button onClick={onClose} className="absolute top-3 right-3 text-xl text-gray-500 hover:text-gray-700">✕</button>

        <h2 className="text-xl text-black font-bold mb-4">Edit Item</h2>

        <div className="grid grid-cols-2 gap-4 font-gray-700">
          <input value={form.id} className="border border-gray-300 text-gray-700 p-2 rounded" disabled />
          <input value={form.name} onChange={e=>handleChange("name", e.target.value)} className="border border-gray-300 text-gray-700 p-2 rounded" />

          <input value={form.stock} type="number" onChange={e=>handleChange("stock", Number(e.target.value))} className="border border-gray-300 text-gray-700 p-2 rounded" />

          <input value={form.supplier} onChange={e=>handleChange("supplier", e.target.value)} className="border border-gray-300 text-gray-700 p-2 rounded" />
          <input value={form.cost} type="number" onChange={e=>handleChange("cost", Number(e.target.value))} className="border border-gray-300 text-gray-700 p-2 rounded" />

          <input value={form.expiry} type="date" onChange={e=>handleChange("expiry", e.target.value)} className="border border-gray-300 text-gray-700 p-2 rounded col-span-2" />

        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border border-gray-300 text-gray-700 px-4 py-2 rounded cursor-pointer hover:bg-gray-100">
            Cancel
          </button>
          <button onClick={()=>onSave(form)} className="bg-sky-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-sky-600">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}