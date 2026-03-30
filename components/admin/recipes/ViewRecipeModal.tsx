'use client';

export default function ViewRecipeModal({ data, onClose }: any) {
  const totalCost = data.ingredientsList.reduce((sum:any,i:any)=>sum + i.qty*i.cost,0);

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
      <div className="bg-white w-[800px] p-6 rounded-xl max-h-[90vh] overflow-y-auto relative">

        {/* BLACK CROSS */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">{data.name}</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div><strong>Category:</strong> {data.category}</div>
          <div><strong>Last Updated:</strong> {data.updated}</div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
        <table className="w-full mb-4 border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Ingredient</th>
              <th className="p-2">Quantity</th>
              <th className="p-2">Unit</th>
              <th className="p-2">Unit Cost</th>
              <th className="p-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.ingredientsList.map((i:any, idx:number)=>(
              <tr key={idx} className="border-t">
                <td className="p-2">{i.name}</td>
                <td className="p-2">{i.qty}</td>
                <td className="p-2">{i.unit}</td>
                <td className="p-2">{i.cost}</td>
                <td className="p-2">{i.qty*i.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end font-bold">
          Total Recipe Cost: Rs. {totalCost}
        </div>
      </div>
    </div>
  );
}