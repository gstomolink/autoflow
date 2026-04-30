'use client';

import { useState } from "react";
import IngredientsSelectorRow from "./IngredientsSelectorRow";
import CostSummary from "./CostSummary";

export default function AddRecipeModal({ onClose }: any) {
  const [ingredients, setIngredients] = useState([
    { name:"", qty:0, unit:"", cost:0 }
  ]);

  const addRow = () => {
    setIngredients([...ingredients, { name:"", qty:0, unit:"", cost:0 }]);
  };

  const removeRow = (index:number) => {
    setIngredients(ingredients.filter((_,i)=>i!==index));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">

      <div className="bg-white w-[900px] p-6 rounded-xl">

        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-black mb-1">Add Recipe</h2>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-gray-700 hover:text-gray-900 transition-colors p-1 rounded"
            aria-label="Close modal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        {/* PRODUCT INFO */}
        <div className="grid grid-cols-3 gap-4 mb-6 border-b pb-4">
          <div>
            <label className="block text-sm text-gray-700 mb-1">Category</label>
            <input placeholder="Category" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Recipe Name</label>
            <input placeholder="Recipe Name" className="w-full px-3 py-2 rounded border border-gray-300 text-gray-700 placeholder:text-gray-300 focus:ring-2 focus:ring-sky-500" />
          </div>
        </div>

        {/* INGREDIENTS */}
        <table className="w-full mb-4">
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Qty</th>
              <th>Unit</th>
              <th>Cost</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {ingredients.map((row,i)=>(
              <IngredientsSelectorRow
                key={i}
                row={row}
                index={i}
                removeRow={removeRow}
              />
            ))}
          </tbody>
        </table>

        <button onClick={addRow} className="text-sky-500 mb-4">
          + Add Ingredient
        </button>

        {/* COST */}
        <CostSummary ingredients={ingredients} />

        <div className="flex justify-end gap-3 pt-4 mt-6">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 border border-slate-300 hover:bg-slate-300 text-slate-600 transition-colors">Cancel</button>
          <button className="bg-sky-500 text-sky-50 px-4 py-2 rounded hover:bg-sky-600 transition-colors">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}