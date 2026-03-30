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

        <h2 className="text-xl font-bold mb-4">Add Recipe</h2>

        {/* PRODUCT INFO */}
        <div className="grid grid-cols-3 gap-4 mb-6 border-b pb-4">

          <input placeholder="Category" className="border p-2 rounded" />

          <input placeholder="Recipe Name" className="border p-2 rounded" />
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

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded">
            Save
          </button>
        </div>

      </div>
    </div>
  );
}