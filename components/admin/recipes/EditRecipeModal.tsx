'use client';

import { useState, useEffect } from "react";
import IngredientsSelectorRow from "./IngredientsSelectorRow";
import CostSummary from "./CostSummary";

export default function EditRecipeModal({ data, onClose }: any) {
  const [product, setProduct] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [recipeName, setRecipeName] = useState(data.name);
  const [ingredients, setIngredients] = useState(data.ingredientsList || [
    { name: "", qty: 0, unit: "", cost: 0 }
  ]);

  const addRow = () => {
    setIngredients([...ingredients, { name: "", qty: 0, unit: "", cost: 0 }]);
  };

  const removeRow = (index: number) => {
    setIngredients(ingredients.filter((_: any, i: number) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[900px] p-6 rounded-xl">
        <h2 className="text-xl font-bold mb-4">Edit Recipe</h2>

        {/* PRODUCT INFO */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <select
            className="border p-2 rounded"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
          >
            <option>Select Product</option>
            <option>Cheese Chicken Burger</option>
            <option>Deviled Chicken Pizza</option>
            <option>Nasi Goreng</option>
            <option>Chicken Pasta</option>
            <option>Biriyani</option>
          </select>

          <input
            placeholder="Category"
            className="border p-2 rounded"
            value={category}
            readOnly
          />

          <input
            placeholder="Recipe Name"
            className="border p-2 rounded"
            value={recipeName}
            onChange={(e) => setRecipeName(e.target.value)}
          />
        </div>

        {/* INGREDIENTS TABLE */}
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
            {ingredients.map((row: any, i: number) => (
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

        {/* COST SUMMARY */}
        <CostSummary ingredients={ingredients} />

        <div className="flex justify-end gap-3 mt-4">
          <button onClick={onClose}>Cancel</button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}