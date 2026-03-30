'use client';

export default function CostSummary({ ingredients }: any) {
  const totalCost = ingredients.reduce(
    (sum: number, i: any) => sum + i.qty * i.cost,
    0
  );

  const servings = 1; // can make dynamic later
  const costPerServing = (totalCost / servings).toFixed(2);

  return (
    <div className="border-t pt-2 flex justify-end gap-6 text-gray-700">
      <div><strong>Total Recipe Cost:</strong> Rs. {totalCost}</div>
      <div><strong>Cost per Serving:</strong> Rs. {costPerServing}</div>
    </div>
  );
}