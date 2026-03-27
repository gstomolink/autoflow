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
      bg-[#0F172A] text-slate-200 border-r border-slate-800 flex flex-col">
      
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <img src="/logo.jpg" alt="Logo" className="h-16 mb-2 m-auto" />
        <h2 className="text-lg font-bold tracking-wide text-center text-slate-200">ADMIN PANEL</h2>
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
                    : "text-slate-300 hover:bg-slate-800"
                }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full text-left px-4 py-2 rounded-lg font-bold tracking-wide
                     hover:bg-red-500/20 text-red-400 inline-flex items-center gap-2"
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
      </div>
    </aside>
  );
}