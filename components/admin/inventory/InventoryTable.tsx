'use client';

import { useState, useMemo } from "react";
import StockAdjustmentModal from "./StockAdjustmentModal";
import StockTransferModal from "./StockTransferModal";
import AddStockModal from "./AddStockModal";
import ViewStockModal from "./ViewStockModal";
import EditStockModal from "./EditStockModal";

// ✅ TYPE (IMPORTANT FIX)
type StockItem = {
  id: string;
  name: string;
  warehouse: string;
  unit: string;
  stock: number;
  cost: number;
  supplier: string;
  expiry: string;
};

const initialData: StockItem[] = [
  { id:"ING001", name:"Flour", warehouse:"Main Store", unit:"kg", stock:50, cost:250, supplier:"ABC Suppliers", expiry:"2026-06-01" },
  { id:"ING002", name:"Sugar", warehouse:"Galle Branch", unit:"kg", stock:40, cost:200, supplier:"ABC Suppliers", expiry:"2026-07-10" },
  { id:"ING003", name:"Salt", warehouse:"Main Store", unit:"kg", stock:30, cost:100, supplier:"XYZ Traders", expiry:"2027-01-01" },
  { id:"ING004", name:"Milk", warehouse:"Matara Depot", unit:"liter", stock:60, cost:300, supplier:"Dairy Farm", expiry:"2026-04-02" },
  { id:"ING005", name:"Butter", warehouse:"Main Store", unit:"kg", stock:20, cost:800, supplier:"Dairy Farm", expiry:"2026-04-05" },
  { id:"ING006", name:"Eggs", warehouse:"Galle Branch", unit:"pcs", stock:200, cost:30, supplier:"Farm Fresh", expiry:"2026-04-03" },
  { id:"ING007", name:"Chicken", warehouse:"Kandy Branch", unit:"kg", stock:35, cost:900, supplier:"Meat House", expiry:"2026-04-01" },
  { id:"ING008", name:"Tomatoes", warehouse:"Galle Branch", unit:"kg", stock:45, cost:150, supplier:"Veg Market", expiry:"2026-04-04" },
  { id:"ING009", name:"Onions", warehouse:"Main Store", unit:"kg", stock:55, cost:120, supplier:"Veg Market", expiry:"2026-05-01" },
  { id:"ING010", name:"Cheese", warehouse:"Kandy Branch", unit:"kg", stock:15, cost:1200, supplier:"Dairy Farm", expiry:"2026-04-10" },
];

export default function InventoryTable({ onlyLow }: any) {

  const [data, setData] = useState<StockItem[]>(initialData);

  const [search, setSearch] = useState("");
  const [threshold, setThreshold] = useState(25);
  const [warehouse, setWarehouse] = useState("");

  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);

  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const [showAdjust, setShowAdjust] = useState(false);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showAdd, setShowAdd] = useState(false);

  //  FILTER FIX
  const filtered = useMemo(() => {
    let d = data.map((i) => ({
      ...i,
      status: i.stock <= threshold,
    }));

    if (onlyLow) {
      d = d.filter((i) => i.stock <= threshold);
    }

    if (search) {
      d = d.filter(
        (i) =>
          i.name.toLowerCase().includes(search.toLowerCase()) ||
          i.id.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (warehouse) {
      d = d.filter((i) => i.warehouse === warehouse);
    }

    return d;
  }, [data, search, threshold, onlyLow, warehouse]);

  // DELETE
  const handleDelete = (id: string) => {
    if (confirm("Are you sure to delete?")) {
      setData(prev => prev.filter(i => i.id !== id));
    }
  };

  return (
    <div className="text-gray-700">

      {/* ACTION BUTTONS */}
      <div className="flex justify-end gap-2 mb-4">
        <button onClick={()=>setShowAdd(true)} className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"> Add Stock</button>
        <button onClick={()=>setShowAdjust(true)} className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"> Adjust Stock</button>
        <button onClick={()=>setShowTransfer(true)} className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"> Transfer</button>
      </div>

      {/* FILTER */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center gap-4 flex-wrap">

        <input
          placeholder="Search Ingredient / ID..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded w-60"
        />

        <select
          value={warehouse}
          onChange={(e)=>setWarehouse(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded"
        >
          <option value="">All Warehouses</option>
          <option>Main Store</option>
          <option>Galle Branch</option>
          <option>Matara Depot</option>
          <option>Kandy Branch</option>
        </select>

        <div className="flex items-center gap-2">
          <label>Low Stock:</label>
          <input
            type="number"
            value={threshold}
            onChange={(e)=>setThreshold(Number(e.target.value))}
            className="border border-gray-300 px-2 py-2 rounded w-24"
          />
        </div>

        <button className="ml-auto bg-sky-500 text-white px-5 py-2 rounded hover:bg-sky-600">
          Search
        </button>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded text-gray-700">
  <thead className="bg-gray-100 text-left">
    <tr>
      <th className="p-2 border-t border-gray-300">ID</th>
      <th className="p-2 border-t border-gray-300">Ingredient</th>
      <th className="p-2 border-t border-gray-300">Warehouse</th>
      <th className="p-2 border-t border-gray-300">Stock</th>
      <th className="p-2 border-t border-gray-300">Unit</th> 
      <th className="p-2 border-t border-gray-300">Cost</th>   
      <th className="p-2 border-t border-gray-300">Supplier</th>
      <th className="p-2 border-t border-gray-300">Expiry</th>
      <th className="p-2 border-t border-gray-300">Status</th>
      <th className="p-2 border-t border-gray-300">Actions</th>
    </tr>
  </thead>

  <tbody>
    {filtered.map((i) => (
      <tr key={i.id} className={`border-t border-gray-300 ${i.status ? "bg-red-100" : ""}`}>
        <td className="p-2 border-t border-gray-300">{i.id}</td>
        <td className="p-2 border-t border-gray-300">{i.name}</td>
        <td className="p-2 border-t border-gray-300">{i.warehouse}</td>
        <td className="p-2 border-t border-gray-300">{i.stock}</td>
        <td className="p-2 border-t border-gray-300">{i.unit}</td>   
        <td className="p-2 border-t border-gray-300">Rs. {i.cost}</td> 
        <td className="p-2 border-t border-gray-300">{i.supplier}</td>
        <td className="p-2 border-t border-gray-300">{i.expiry}</td>
        <td className="p-2 border-t border-gray-300 font-bold">
          {i.status ? "Low Stock" : "OK"}
        </td>
        <td className="p-2 border-t border-gray-300 flex gap-2">
          <button
            onClick={() => { setSelectedItem(i); setShowView(true); }}
            className="bg-blue-500 text-white px-2 py-1 rounded"
          >
            View
          </button>
          <button
            onClick={() => { setSelectedItem(i); setShowEdit(true); }}
            className="bg-yellow-500 text-white px-2 py-1 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete(i.id)}
            className="bg-red-500 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      {/* MODALS */}
      {showView && selectedItem && <ViewStockModal data={selectedItem} onClose={()=>setShowView(false)} />}
      
      {showEdit && selectedItem && (
        <EditStockModal
          data={selectedItem}
          onClose={()=>setShowEdit(false)}
          onSave={(updated: StockItem)=>{
            setData(prev =>
              prev.map(i => i.id === updated.id ? updated : i)
            );
            setShowEdit(false);
          }}
        />
      )}

      {showAdd && <AddStockModal onClose={()=>setShowAdd(false)} />}
      {showAdjust && <StockAdjustmentModal onClose={()=>setShowAdjust(false)} />}
      {showTransfer && <StockTransferModal onClose={()=>setShowTransfer(false)} />}

    </div>
  );
}