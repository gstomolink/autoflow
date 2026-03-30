'use client';

import { useState, useEffect } from "react";

const ingredientsList = [
  { name: "Burger Bun", unit: "pcs", cost: 50 },
  { name: "Chicken Patty", unit: "g", cost: 200 },
  { name: "Cheese Slice", unit: "pcs", cost: 120 },
  { name: "Lettuce", unit: "g", cost: 10 },
  { name: "Sauce", unit: "g", cost: 15 },
  { name: "Pizza Dough", unit: "g", cost: 100 },
  { name: "Chicken", unit: "g", cost: 250 },
  { name: "Rice", unit: "g", cost: 80 },
  { name: "Egg", unit: "pcs", cost: 30 },
  { name: "Cream", unit: "ml", cost: 60 },
];

export default function IngredientsSelectorRow({ row, index, removeRow }: any) {
  const [name, setName] = useState(row.name);
  const [qty, setQty] = useState(row.qty);
  const [unit, setUnit] = useState(row.unit);
  const [cost, setCost] = useState(row.cost);

  useEffect(() => {
    const ingredient = ingredientsList.find((i) => i.name === name);
    if (ingredient) {
      setUnit(ingredient.unit);
      setCost(ingredient.cost);
    }
  }, [name]);

  return (
    <tr>
      <td>
        <select
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 px-2 py-1 rounded"
        >
          <option value="">Select Ingredient</option>
          {ingredientsList.map((i, idx) => (
            <option key={idx} value={i.name}>{i.name}</option>
          ))}
        </select>
      </td>
      <td>
        <input
          type="number"
          value={qty}
          onChange={(e) => setQty(Number(e.target.value))}
          className="border border-gray-300 px-2 py-1 rounded w-20"
        />
      </td>
      <td className="text-center">{unit}</td>
      <td className="text-center">{cost}</td>
      <td className="text-center">{qty * cost}</td>
      <td>
        <button
          onClick={() => removeRow(index)}
          className=" px-2 py-1 rounded"
        >
          ✕
        </button>
      </td>
    </tr>
  );
}