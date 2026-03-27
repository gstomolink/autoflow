"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CartItem = {
  id: string;
  name: string;
  image: string;
  price: number;
  qty: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([
    { id: "1", name: "Wireless Headphones", image: "/logo.png", price: 120, qty: 1 },
    { id: "2", name: "Smart Watch", image: "/logo.png", price: 80, qty: 2 },
    { id: "3", name: "Gaming Mouse", image: "/logo.png", price: 60, qty: 1 },
  ]);

  const updateQty = (id: string, delta: number) => {
    setItems(items.map(item =>
      item.id === id
        ? { ...item, qty: Math.max(1, item.qty + delta) }
        : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discount = subtotal * 0.1; // 10% discount example
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal - discount + shipping;

  return (
    <main className="flex-1 p-6 bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            🛒 Your Shopping Cart
          </h1>
          <p className="text-gray-500 mt-1">
            Almost there! Review your items and checkout securely.
          </p>
        </div>

        <Link href="/customer/products">
          <button className="px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition">
            ← Continue Shopping
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT — Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const rowSubtotal = item.price * item.qty;

            return (
              <div
                key={item.id}
                className="bg-white border rounded-xl p-4 shadow-sm flex flex-col md:flex-row md:items-center gap-4"
              >
                {/* Image */}
                <div className="flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>

                {/* Name */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-purple-600 font-bold mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>

                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(item.id, -1)}
                    className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-300 text-gray-800 font-bold"
                  >
                    −
                  </button>
                  <span className="w-6 text-center font-medium text-gray-800">
                    {item.qty}
                  </span>
                  <button
                    onClick={() => updateQty(item.id, 1)}
                    className="h-8 w-8 rounded bg-gray-100 hover:bg-gray-300 text-gray-800 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-28 text-right">
                  <p className="text-sm text-gray-500">Subtotal</p>
                  <p className="font-bold text-gray-800">
                    ${rowSubtotal.toFixed(2)}
                  </p>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700 text-xl px-2"
                  title="Remove item"
                >
                  🗑
                </button>
              </div>
            );
          })}
        </div>

        {/* RIGHT — Order Summary */}
        <div className="bg-gray-50 border rounded-xl p-6 shadow-sm h-fit">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium text-gray-800">
                ${subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Discount (10%)</span>
              <span className="font-medium text-green-600">
                − ${discount.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium text-gray-800">
                {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
              </span>
            </div>

            <div className="border-t pt-3 flex justify-between text-base">
              <span className="font-semibold text-gray-800">Total</span>
              <span className="font-bold text-purple-700">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Extras */}
          <div className="mt-6 space-y-2 text-sm text-gray-600">
            <p>🔒 Secure SSL encrypted checkout</p>
            <p>🚚 Fast & reliable delivery</p>
            <p>↩ Easy returns within 7 days</p>
          </div>

          <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
            Secure Checkout
          </button>
        </div>
      </div>
    </main>
  );
}