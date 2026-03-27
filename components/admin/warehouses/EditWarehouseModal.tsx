'use client';

import { useState } from "react";

export default function EditWarehouseModal({ data, onClose }: any) {
  const [form, setForm] = useState(data);

  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">
            Edit Warehouse
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center">
            ⨯
          </button>
        </div>

        <div className="space-y-3">
          <input value={form.name} onChange={(e)=>setForm({...form,name:e.target.value})} className="w-full border border-gray-300 p-2 rounded"/>
          <input value={form.address} onChange={(e)=>setForm({...form,address:e.target.value})} className="w-full border border-gray-300 p-2 rounded"/>
          <input value={form.manager} onChange={(e)=>setForm({...form,manager:e.target.value})} className="w-full border border-gray-300 p-2 rounded"/>
          <input value={form.contact} onChange={(e)=>setForm({...form,contact:e.target.value})} className="w-full border border-gray-300 p-2 rounded"/>
        </div>

        <div className="flex justify-end mt-4 gap-2">
          <button onClick={onClose} className="px-4 py-2 border border-purple-600 text-purple-600 bg-purple-100 hover:bg-purple-200 rounded cursor-pointer">Cancel</button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer hover:bg-purple-700">Save</button>
        </div>
      </div>
    </div>
  );
}