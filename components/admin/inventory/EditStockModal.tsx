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

        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Edit Item</h2>
          <button
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>
            <label className="block text-sm text-gray-700 mb-1">ID</label>
            <input value={form.id} className="w-full border border-gray-300 text-gray-700 p-2 rounded placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" disabled />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Name</label>
            <input value={form.name} onChange={e=>handleChange("name", e.target.value)} className="w-full border border-gray-300 text-gray-700 p-2 rounded placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-1">Stock</label>
            <input value={form.stock} type="number" onChange={e=>handleChange("stock", Number(e.target.value))} className="w-full border border-gray-300 text-gray-700 p-2 rounded placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Supplier</label>
            <input value={form.supplier} onChange={e=>handleChange("supplier", e.target.value)} className="w-full border border-gray-300 text-gray-700 p-2 rounded placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-1">Cost</label>
            <input value={form.cost} type="number" onChange={e=>handleChange("cost", Number(e.target.value))} className="w-full border border-gray-300 text-gray-700 p-2 rounded placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>

          <div className="col-span-2">
            <label className="block text-sm text-gray-700 mb-1">Expiry Date</label>
            <input value={form.expiry} type="date" onChange={e=>handleChange("expiry", e.target.value)} className="w-full border border-gray-300 text-gray-700 p-2 rounded placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">
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