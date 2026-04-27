'use client';

import { useState } from "react";

export default function SearchableShopCombobox({
  shops = [
    { id: 1, name: "Main Store" },
    { id: 2, name: "Kuruduwatta Branch" },
  ],
  value,
  onChange,
  placeholder = "Select shop",
  className = "",
}: any) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const formatId = (id: number | string) =>
    String(id).padStart(3, "0");

  const filtered = shops.filter((shop: any) => {
    const name = shop?.name?.toLowerCase() || "";
    const id = String(shop?.id || "");

    return (
      name.includes(search.toLowerCase()) ||
      id.includes(search)
    );
  });

  const selectedShop = shops.find(
    (s: any) => String(s.id) === String(value)
  );

  return (
    <div className={`relative ${className}`}>
      
      {/* INPUT */}
      <div
        onClick={() => setOpen(!open)}
        className="border border-gray-300 px-3 py-2 rounded-lg cursor-pointer bg-white text-gray-700 w-[250px]"
      >
        {selectedShop
          ? `${formatId(selectedShop.id)} ${selectedShop.name}`
          : placeholder}
      </div>

      {/* DROPDOWN */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          
          {/* SEARCH */}
          <input
            type="text"
            placeholder="Search shop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border-b border-gray-300 outline-none text-gray-700"
          />

          {/* LIST */}
          {filtered.length > 0 ? (
            filtered.map((shop: any) => (
              <div
                key={shop.id}
                onClick={() => {
                  onChange(shop.id);
                  setOpen(false);
                }}
                className="px-3 py-2 hover:bg-sky-100 cursor-pointer text-gray-700"
              >
                {formatId(shop.id)} {shop.name}
              </div>
            ))
          ) : (
            <div className="px-3 py-2 text-gray-500">
              No shops found
            </div>
          )}
        </div>
      )}
    </div>
  );
}