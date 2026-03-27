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
    <aside className="w-64 bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 backdrop-blur-lg border-r border-white/20 text-white">
      <div className="p-6 border-b border-white/20">
        <img src="/logo.png" alt="Logo" className="h-10 mb-2" />
        <h2 className="font-semibold">Customer Panel</h2>
      </div>

      <nav className="p-4 space-y-2">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="block px-4 py-2 rounded-lg hover:bg-white/20 transition"
          >
            {item.name}
          </Link>
        ))}

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-500/30 mt-4"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
}