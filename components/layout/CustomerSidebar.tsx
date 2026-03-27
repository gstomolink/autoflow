'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/customer/dashboard" },
  { name: "Products", href: "/customer/products" },
  { name: "Cart", href: "/customer/cart" },
  { name: "Order History", href: "/customer/order-history" },
  { name: "Track Order", href: "/customer/order-tracking" },
  { name: "Profile", href: "/customer/profile" },
];

export default function CustomerSidebar() {
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    //  Clear stored login data
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.clear();

    //  Clear cookies (basic)
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    // Redirect to login
    router.push("/login");
    setShowLogoutModal(false);
  };

  return (
    <aside className="w-64 bg-[#E3E7ED] border-r border-slate-300 text-slate-800">
      <div className="p-6 border-b border-slate-300">
        <img src="/logo.png" alt="Logo" className="h-10 mb-2" />
        <h2 className="font-semibold">Customer Panel</h2>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded-lg hover:bg-slate-200 transition"
          >
            {item.name}
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-200 text-red-700 mt-4 inline-flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="w-4 h-4"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 17l5-5m0 0-5-5m5 5H9" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 21H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
          </svg>
          <span>Logout</span>
        </button>
      </nav>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60] p-4">
          <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-5">
            <h3 className="text-lg font-semibold text-slate-800">Confirm Logout</h3>
            <p className="text-sm text-slate-600 mt-2">
              Are you sure you want to logout?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-rose-500 text-rose-50 hover:bg-rose-600 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}