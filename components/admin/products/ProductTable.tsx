'use client';

import { useState, useMemo } from "react";
import EditProductModal from "./EditProductModal";
import ViewProductModal from "./ViewProductModal";

export type Product = {
  id: string;
  image: string;
  name: string;
  category: string;
  price: number;
  supplier: string;
};

const initialProducts: Product[] = [
  {
    id: "P-1001",
    image: "/products/p1.jpg",
    name: "Wireless Headphones",
    category: "Electronics",
    price: 199,
    supplier: "SUP-01",
  },
];

export default function ProductTable({ filters }: any) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [editItem, setEditItem] = useState<Product | null>(null);
  const [viewItem, setViewItem] = useState<Product | null>(null);

  const filtered = useMemo(() => {
    let data = products;

    if (filters?.name) {
      data = data.filter(p =>
        p.name.toLowerCase().includes(filters.name.toLowerCase())
      );
    }

    if (filters?.category) {
      data = data.filter(p => p.category === filters.category);
    }

    return data;
  }, [filters, products]);

  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-black">
          <thead className="bg-white">
            <tr>
              <th className="p-3 text-left">Product ID</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Supplier ID</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((p, i) => (
              <tr key={i} className="border-t border-gray-200">
                <td className="p-3">{p.id}</td>
                <td className="p-3">
                  <img src={p.image} className="h-12 w-12 object-cover rounded" />
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">${p.price}</td>
                <td className="p-3">{p.supplier}</td>
                <td className="p-3 space-x-2">
                  <button onClick={()=>setViewItem(p)} className="px-2 py-1 bg-sky-500 text-white rounded hover:bg-sky-600 transition-colors cursor-pointer">View</button>
                  <button onClick={()=>setEditItem(p)} className="px-2 py-1 bg-slate-200 text-slate-800 rounded hover:bg-slate-300 transition-colors cursor-pointer">Edit</button>
                  <button onClick={()=>deleteProduct(p.id)} className="px-2 py-1 bg-rose-500 text-white rounded hover:bg-rose-600 transition-colors cursor-pointer">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editItem && <EditProductModal product={editItem} onClose={()=>setEditItem(null)} />}
      {viewItem && <ViewProductModal product={viewItem} onClose={()=>setViewItem(null)} />}
    </>
  );
}