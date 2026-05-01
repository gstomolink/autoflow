'use client';

import { useState } from 'react';

type Product = {
  id: number;
  name: string;
  image: string;
  price: number;
  discount?: number;
  stock: number;
  category: string;
};

const categories = ['All', 'Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', image: '/logo.png', price: 120, discount: 20, stock: 15, category: 'Category 1' },
  { id: 2, name: 'Smart Watch', image: '/logo.png', price: 80, stock: 8, category: 'Category 2' },
  { id: 3, name: 'Gaming Mouse', image: '/logo.png', price: 60, discount: 10, stock: 20, category: 'Category 3' },
  { id: 4, name: 'Bluetooth Speaker', image: '/logo.png', price: 140, stock: 5, category: 'Category 1' },
  { id: 5, name: 'Laptop Stand', image: '/logo.png', price: 40, discount: 15, stock: 30, category: 'Category 4' },
  { id: 6, name: 'Mechanical Keyboard', image: '/logo.png', price: 200, stock: 12, category: 'Category 5' },
];

export default function ProductsPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = products.filter((p) => {
    const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* Heading */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Explore Products</h1>
        <p className="text-gray-500 mt-1">
          Discover amazing deals and find the perfect products tailored just for you ✨
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 md:items-end">
        <div className="flex flex-col gap-1 flex-1">
          <label className="text-sm font-medium text-gray-700">Search Product</label>
          <input
            type="text"
            placeholder="Search products by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-black"
          >
            {categories.map((cat) => (
              <option key={cat} className="text-black">
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Promotions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {[1, 2, 3].map((promo) => (
          <div
            key={promo}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl p-6 shadow-md transform transition duration-300 hover:scale-105 cursor-pointer"
          >
            <h3 className="text-lg font-semibold">Special Offer #{promo}</h3>
            <p className="text-sm mt-1 opacity-90">Limited time discount on selected items</p>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => {
          const hasDiscount = product.discount && product.discount > 0;
          const newPrice = hasDiscount
            ? (product.price - (product.price * product.discount!) / 100).toFixed(2)
            : product.price.toFixed(2);

          return (
            <div
              key={product.id}
              className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition flex flex-col"
            >
              {/* Image */}
              <div className="relative mb-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-full object-contain bg-gray-50 rounded-lg"
                />

                {hasDiscount && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-semibold text-gray-800 mb-1">{product.name}</h3>

              {/* Price */}
              <div className="mb-1">
                {hasDiscount ? (
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 line-through text-sm">
                      ${product.price.toFixed(2)}
                    </span>
                    <span className="text-purple-600 font-bold text-lg">${newPrice}</span>
                  </div>
                ) : (
                  <span className="text-purple-600 font-bold text-lg">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Stock */}
              <p className="text-sm text-gray-500 mb-4">Stock: {product.stock} available</p>

              {/* Spacer to align buttons */}
              <div className="flex-grow" />

              {/* Add to Cart */}
              <button className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition">
                Add to Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}