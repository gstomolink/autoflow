'use client';

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menu = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Products", href: "/admin/products" },
  { name: "Warehouse", href: "/admin/warehouses" },
  { name: "Inventory", href: "/admin/inventory" },
  { name: "Inventory Orders", href: "/admin/inventory-orders" },
  { name: "Customer Orders", href: "/admin/orders" },
  // { name: "Customers", href: "/admin/customers" },
  { name: "Suppliers", href: "/admin/suppliers" },
  // { name: "Purchases", href: "/admin/purchases" },
  // { name: "Reports", href: "/admin/reports" },
  { name: "Users & Roles", href: "/admin/users-roles" },
  { name: "Settings", href: "/admin/settings" },
  // { name: "Audit Logs", href: "/admin/audit-logs" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <aside className="w-56 h-screen sticky top-0
      bg-gradient-to-b from-purple-700 via-blue-700 to-gray-900
      text-white border-r border-white/10 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <img src="/logo.jpg" alt="Logo" className="h-16 mb-2 m-auto" />
        <h2 className="text-lg font-bold tracking-wide text-center">ADMIN PANEL</h2>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-lg transition font-bold tracking-wide
                ${
                  active
                    ? "bg-white text-purple-700"
                    : "hover:bg-white/10"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg font-bold tracking-wide
                     hover:bg-red-600/40 text-red-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}