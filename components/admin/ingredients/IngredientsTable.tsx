'use client';

import { useState } from "react";
import AddIngredientModal from "./AddIngredientModal";
import EditIngredientModal from "./EditIngredientModal";
import ViewIngredientModal from "./ViewIngredientModal";

const data = [
  { id:"ING001", name:"Flour", unit:"kg", stock:50, cost:250, supplier:"ABC Suppliers", expiry:"2026-06-01", updated:"2026-03-30" },
  { id:"ING002", name:"Sugar", unit:"kg", stock:40, cost:200, supplier:"ABC Suppliers", expiry:"2026-07-10", updated:"2026-03-29" },
  { id:"ING003", name:"Salt", unit:"kg", stock:30, cost:100, supplier:"XYZ Traders", expiry:"2027-01-01", updated:"2026-03-28" },
  { id:"ING004", name:"Milk", unit:"liter", stock:60, cost:300, supplier:"Dairy Farm", expiry:"2026-04-02", updated:"2026-03-30" },
  { id:"ING005", name:"Butter", unit:"kg", stock:20, cost:800, supplier:"Dairy Farm", expiry:"2026-04-05", updated:"2026-03-27" },
  { id:"ING006", name:"Eggs", unit:"pcs", stock:200, cost:30, supplier:"Farm Fresh", expiry:"2026-04-03", updated:"2026-03-30" },
  { id:"ING007", name:"Chicken", unit:"kg", stock:35, cost:900, supplier:"Meat House", expiry:"2026-04-01", updated:"2026-03-29" },
  { id:"ING008", name:"Tomatoes", unit:"kg", stock:45, cost:150, supplier:"Veg Market", expiry:"2026-04-04", updated:"2026-03-30" },
  { id:"ING009", name:"Onions", unit:"kg", stock:55, cost:120, supplier:"Veg Market", expiry:"2026-05-01", updated:"2026-03-28" },
  { id:"ING010", name:"Cheese", unit:"kg", stock:15, cost:1200, supplier:"Dairy Farm", expiry:"2026-04-10", updated:"2026-03-30" },
];

export default function IngredientsTable() {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  const [add, setAdd] = useState(false);
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  // 🔍 SEARCH BUTTON FUNCTION
  const handleSearch = () => {
    const result = data.filter((i) =>
      i.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(result);
  };

  return (
    <div>

      {/*  TOP BAR */}
      <div className="flex justify-end mb-4">
        <button
          onClick={()=>setAdd(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          + Add Ingredient
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">

        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search ingredient..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-72 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
          />
        </div>

        <button
          onClick={handleSearch}
          className="ml-auto bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600"
        >
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">ID</th>
            <th className="p-2">Name</th>
            <th className="p-2">Unit</th>
            <th className="p-2">Stock</th>
            <th className="p-2">Cost</th>
            <th className="p-2">Supplier</th>
            <th className="p-2">Expiry Date</th>
            <th className="p-2">Updated</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length === 0 ? (
            <tr className="border-t border-gray-300">
              <td className="p-6 text-center text-slate-500" colSpan={9}>
                No data
              </td>
            </tr>
          ) : null}
          {filteredData.map((i, idx) => (
            <tr key={idx} className="border-t border-gray-300">
              <td className="p-2">{i.id}</td>
              <td className="p-2">{i.name}</td>
              <td className="p-2">{i.unit}</td>
              <td className="p-2">{i.stock}</td>
              <td className="p-2">{i.cost}</td>
              <td className="p-2">{i.supplier}</td>

              {/* EXPIRY HIGHLIGHT */}
              <td
                className={`p-2 font-semibold ${
                    (() => {
                    const today = new Date();
                    const expiryDate = new Date(i.expiry);

                    const diffTime = expiryDate.getTime() - today.getTime();
                    const diffDays = diffTime / (1000 * 60 * 60 * 24);

                    return diffDays <= 14 ? "text-red-500" : "text-gray-700";
                    })()
                }`}
                >
                {i.expiry}
                </td>

              <td className="p-2">{i.updated}</td>

              <td className="p-2 flex gap-2">
                <button onClick={()=>setView(i)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                <button onClick={()=>setEdit(i)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-rose-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {add && <AddIngredientModal onClose={()=>setAdd(false)} />}
      {view && <ViewIngredientModal data={view} onClose={()=>setView(null)} />}
      {edit && <EditIngredientModal data={edit} onClose={()=>setEdit(null)} />}

    </div>
  );
}