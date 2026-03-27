'use client';

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

  const handleLogout = () => {
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
          onClick={handleLogout}
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
    </aside>
  );
}