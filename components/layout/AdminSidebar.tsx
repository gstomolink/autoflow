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
      bg-[#E3E7ED] text-slate-800 border-r border-slate-300 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-300">
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
                    ? "bg-white text-slate-900"
                    : "hover:bg-slate-200"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-300">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg font-bold tracking-wide
                     hover:bg-red-200 text-red-700"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}