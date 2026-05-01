'use client';

import { useState } from 'react';

export default function CashierPOSPage() {
  const [activeTab, setActiveTab] = useState<'POS' | 'ORDERS'>('POS');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock data
  const categories = ['All', 'Burgers', 'Pizza', 'Sides', 'Beverages'];
  
  const products = [
    { id: 1, name: 'Classic Beef Burger', price: 1200, category: 'Burgers', color: 'bg-orange-100' },
    { id: 2, name: 'Spicy Chicken Burger', price: 1350, category: 'Burgers', color: 'bg-orange-100' },
    { id: 3, name: 'Large Pepperoni Pizza', price: 2800, category: 'Pizza', color: 'bg-red-100' },
    { id: 4, name: 'Margherita Pizza', price: 2200, category: 'Pizza', color: 'bg-red-100' },
    { id: 5, name: 'French Fries', price: 600, category: 'Sides', color: 'bg-yellow-100' },
    { id: 6, name: 'Onion Rings', price: 750, category: 'Sides', color: 'bg-yellow-100' },
    { id: 7, name: 'Coca Cola 500ml', price: 300, category: 'Beverages', color: 'bg-stone-100' },
    { id: 8, name: 'Iced Latte', price: 850, category: 'Beverages', color: 'bg-amber-100' },
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Mock cart
  const cart = [
    { id: 1, name: 'Classic Beef Burger', price: 1200, qty: 2 },
    { id: 5, name: 'French Fries', price: 600, qty: 1 },
    { id: 7, name: 'Coca Cola 500ml', price: 300, qty: 2 },
  ];

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  return (
    <div className="text-gray-700 h-[calc(100vh-100px)] flex flex-col">
      
      {/* HEADER */}
      <div className="mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Cashier Terminal
          </h1>
          <p className="text-gray-600 mt-1">
            Colombo Main Branch - Terminal 01
          </p>
        </div>
        
        {/* TAB NAVIGATION */}
        <div className="flex bg-gray-200 p-1 rounded-lg">
          <button 
            onClick={() => setActiveTab('POS')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'POS' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
          >
            New Order (POS)
          </button>
          <button 
            onClick={() => setActiveTab('ORDERS')}
            className={`px-6 py-2 rounded-md font-medium text-sm transition-colors ${activeTab === 'ORDERS' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-600 hover:text-gray-800'}`}
          >
            Order History
          </button>
        </div>
      </div>

      {/* POS VIEW */}
      {activeTab === 'POS' && (
        <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
          
          {/* LEFT PANEL: PRODUCT GRID */}
          <div className="flex-1 flex flex-col bg-white rounded-xl shadow-sm p-5 overflow-hidden">
            
            {/* Search & Categories */}
            <div className="shrink-0 mb-4">
              <input 
                type="text" 
                placeholder="Search products, SKU, or barcode..." 
                className="w-full border border-gray-300 px-4 py-2.5 rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-sky-500 mb-4"
              />
              
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {categories.map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === cat 
                        ? 'bg-sky-600 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards */}
            <div className="flex-1 overflow-y-auto pr-2">
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map(product => (
                  <div 
                    key={product.id} 
                    className="border border-gray-100 rounded-xl p-3 cursor-pointer hover:border-sky-300 hover:shadow-md transition-all flex flex-col h-full"
                  >
                    <div className={`h-24 w-full rounded-lg ${product.color} mb-3 flex items-center justify-center`}>
                      {/* Placeholder for Product Image */}
                      <span className="text-2xl opacity-50">🍔</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 text-sm leading-tight mb-1">{product.name}</p>
                      <p className="text-xs text-gray-500">{product.category}</p>
                    </div>
                    <div className="mt-2 font-bold text-sky-700">
                      LKR {product.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: CART & CHECKOUT */}
          <div className="w-full lg:w-[400px] flex flex-col bg-white rounded-xl shadow-sm overflow-hidden shrink-0">
            
            {/* Cart Header */}
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="font-bold text-gray-800 text-lg">Current Order</h2>
              <span className="bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full text-xs font-bold">#1027</span>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start">
                  <div className="flex-1 pr-4">
                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                    <p className="text-sky-600 text-sm font-medium mt-0.5">LKR {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-3 bg-gray-100 rounded-lg px-2 py-1">
                    <button className="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm font-bold hover:text-red-500">-</button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button className="w-6 h-6 flex items-center justify-center rounded bg-white text-gray-600 shadow-sm font-bold hover:text-green-500">+</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout Totals */}
            <div className="p-5 border-t border-gray-100 bg-gray-50 space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span className="font-medium">LKR {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Tax (10%)</span>
                <span className="font-medium">LKR {tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Discount</span>
                <span className="font-medium text-green-600">- LKR 0</span>
              </div>
              
              <div className="border-t border-gray-200 pt-3 mt-3 flex justify-between items-center">
                <span className="text-lg font-bold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-sky-700">LKR {total.toLocaleString()}</span>
              </div>

              {/* Payment Action */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-2">
                <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-lg transition-colors">
                  CASH
                </button>
                <button className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 rounded-lg transition-colors">
                  CARD
                </button>
              </div>
              <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition-colors mt-2">
                HOLD ORDER
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ORDERS HISTORY VIEW */}
      {activeTab === 'ORDERS' && (
        <div className="flex-1 bg-white rounded-xl shadow-sm p-6 overflow-hidden flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-gray-800 text-xl">Today's Orders</h2>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Search Order ID..." 
                className="border border-gray-300 px-3 py-1.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
              <button className="bg-gray-100 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-gray-200">
                Filter
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-gray-500 bg-gray-50">
                  <th className="p-3 font-medium rounded-tl-lg">Order ID</th>
                  <th className="p-3 font-medium">Time</th>
                  <th className="p-3 font-medium">Items</th>
                  <th className="p-3 font-medium">Total Amount</th>
                  <th className="p-3 font-medium">Payment</th>
                  <th className="p-3 font-medium">Status</th>
                  <th className="p-3 font-medium rounded-tr-lg">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold">#1026</td>
                  <td className="p-3">10:45 AM</td>
                  <td className="p-3">1x Veggie Wrap, 1x Iced Latte</td>
                  <td className="p-3 font-medium">LKR 1,850</td>
                  <td className="p-3">Card</td>
                  <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
                  <td className="p-3 text-sky-600 hover:underline cursor-pointer font-medium">Receipt</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold">#1025</td>
                  <td className="p-3">10:32 AM</td>
                  <td className="p-3">1x Large Pepperoni Pizza, 2x Coke</td>
                  <td className="p-3 font-medium">LKR 3,400</td>
                  <td className="p-3">Cash</td>
                  <td className="p-3"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Completed</span></td>
                  <td className="p-3 text-sky-600 hover:underline cursor-pointer font-medium">Receipt</td>
                </tr>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-bold">#1024</td>
                  <td className="p-3">10:15 AM</td>
                  <td className="p-3">2x Spicy Chicken Burger...</td>
                  <td className="p-3 font-medium">LKR 2,700</td>
                  <td className="p-3">Card</td>
                  <td className="p-3"><span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">Refunded</span></td>
                  <td className="p-3 text-sky-600 hover:underline cursor-pointer font-medium">Details</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
