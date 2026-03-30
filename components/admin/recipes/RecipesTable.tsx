'use client';

import { useState } from "react";
import AddRecipeModal from "./AddRecipeModal";
import EditRecipeModal from "./EditRecipeModal";
import ViewRecipeModal from "./ViewRecipeModal";

const data = [
  {
    id:"REC001",
    name:"Cheese Chicken Burger",
    category:"Burger",
    ingredientsList: [
      { name: "Burger Bun", qty: 1, unit: "pcs", cost: 50 },
      { name: "Chicken Patty", qty: 150, unit: "g", cost: 200 },
      { name: "Cheese Slice", qty: 1, unit: "pcs", cost: 120 },
      { name: "Lettuce", qty: 20, unit: "g", cost: 10 },
      { name: "Sauce", qty: 15, unit: "g", cost: 15 },
    ],
    updated:"2026-03-30"
  },
  {
    id:"REC002",
    name:"Deviled Chicken Pizza",
    category:"Pizza",
    ingredientsList: [
      { name: "Pizza Dough", qty: 250, unit: "g", cost: 100 },
      { name: "Chicken", qty: 150, unit: "g", cost: 250 },
      { name: "Cheese", qty: 120, unit: "g", cost: 120 },
      { name: "Deviled Sauce", qty: 50, unit: "g", cost: 50 },
      { name: "Onion", qty: 30, unit: "g", cost: 20 },
    ],
    updated:"2026-03-29"
  },
  {
    id:"REC003",
    name:"Nasi Goreng",
    category:"Rice",
    ingredientsList: [
      { name: "Rice", qty: 300, unit: "g", cost: 80 },
      { name: "Chicken", qty: 100, unit: "g", cost: 250 },
      { name: "Egg", qty: 1, unit: "pcs", cost: 30 },
      { name: "Soy Sauce", qty: 20, unit: "ml", cost: 10 },
      { name: "Oil", qty: 15, unit: "ml", cost: 5 },
    ],
    updated:"2026-03-28"
  },
  {
    id:"REC004",
    name:"Chicken Pasta",
    category:"Pasta",
    ingredientsList: [
      { name: "Pasta", qty: 200, unit: "g", cost: 100 },
      { name: "Chicken", qty: 120, unit: "g", cost: 250 },
      { name: "Cream", qty: 100, unit: "ml", cost: 60 },
      { name: "Cheese", qty: 50, unit: "g", cost: 120 },
      { name: "Garlic", qty: 10, unit: "g", cost: 15 },
    ],
    updated:"2026-03-27"
  },
  {
    id:"REC005",
    name:"Biriyani",
    category:"Rice",
    ingredientsList: [
      { name: "Rice", qty: 400, unit: "g", cost: 80 },
      { name: "Chicken", qty: 250, unit: "g", cost: 250 },
      { name: "Spices", qty: 20, unit: "g", cost: 50 },
      { name: "Yogurt", qty: 50, unit: "ml", cost: 40 },
      { name: "Oil", qty: 30, unit: "ml", cost: 10 },
    ],
    updated:"2026-03-26"
  },
];

export default function RecipesTable({ filters }: any) {
  const [add, setAdd] = useState(false);
  const [view, setView] = useState<any>(null);
  const [edit, setEdit] = useState<any>(null);

  const filtered = data.filter((r)=>
    r.name.toLowerCase().includes(filters.search.toLowerCase()) &&
    (filters.category ? r.category === filters.category : true)
  );

  return (
    <div>

      {/* 1️⃣ Add Recipe Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={()=>setAdd(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded"
        >
          + Add Recipe
        </button>
      </div>

      {/* 2️⃣ SEARCH BAR */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search recipe..."
          value={filters.search}
          onChange={(e)=>filters.setSearch(e.target.value)}
          className="w-72 border border-gray-300 px-3 py-2 rounded-lg text-gray-700"
        />
        <select
          value={filters.category}
          onChange={(e)=>filters.setCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg"
        >
          <option value="">All Categories</option>
          <option value="Burger">Burger</option>
          <option value="Pizza">Pizza</option>
          <option value="Rice">Rice</option>
          <option value="Pasta">Pasta</option>
        </select>

        <button
          onClick={()=>{}}
          className="ml-auto bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600"
        >
          Search
        </button>
      </div>

      {/* 3️⃣ RECIPES TABLE */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Recipe ID</th>
            <th className="p-2">Product Name</th>
            <th className="p-2">Category</th>
            <th className="p-2">Total Ingredients</th>
            <th className="p-2">Estimated Cost</th>
            <th className="p-2">Last Updated</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {filtered.map((r, i)=>(
            <tr key={i} className="border-t">
              <td className="p-2">{r.id}</td>
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.category}</td>
              <td className="p-2">{r.ingredientsList.length}</td>
              <td className="p-2">
                Rs. {r.ingredientsList.reduce((sum, i)=>sum + i.qty*i.cost,0)}
              </td>
              <td className="p-2">{r.updated}</td>

              <td className="p-2 flex gap-2">
                <button onClick={()=>setView(r)} className="bg-blue-500 text-white px-2 py-1 rounded">View</button>
                <button onClick={()=>setEdit(r)} className="bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
                <button className="bg-rose-500 text-white px-2 py-1 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODALS */}
      {add && <AddRecipeModal onClose={()=>setAdd(false)} />}
      {view && <ViewRecipeModal data={view} onClose={()=>setView(null)} />}
      {edit && <EditRecipeModal data={edit} onClose={()=>setEdit(null)} />}
    </div>
  );
}