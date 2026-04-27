"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  type ShopListEntry,
  filterShopsByQuery,
  formatShopSelectLabel,
} from "@/lib/shop-scope";

type Props = {
  shops: ShopListEntry[];
  value: string;
  onChange: (shopId: string) => void;
  placeholder: string;
  disabled?: boolean;
  id?: string;
  className?: string;
  inputClassName?: string;
  "aria-label"?: string;
  allowClear?: boolean;
};

export default function SearchableShopCombobox({
  shops,
  value,
  onChange,
  placeholder,
  disabled,
  id,
  className = "",
  inputClassName = "",
  "aria-label": ariaLabel,
  allowClear,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const selectedShop = useMemo(
    () => shops.find((s) => s.shopId === value),
    [shops, value],
  );

  useEffect(() => {
    if (open) return;
    setQuery(selectedShop ? formatShopSelectLabel(selectedShop) : "");
  }, [value, shops, open, selectedShop]);

  const filtered = useMemo(
    () => filterShopsByQuery(shops, open ? query : ""),
    [shops, query, open],
  );

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const pick = (shop: ShopListEntry) => {
    onChange(shop.shopId);
    setQuery(formatShopSelectLabel(shop));
    setOpen(false);
  };

  const inputValue = open ? query : selectedShop ? formatShopSelectLabel(selectedShop) : "";

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <div className="flex items-stretch gap-1">
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-label={ariaLabel}
          disabled={disabled}
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            const v = e.target.value;
            setQuery(v);
            if (!open) setOpen(true);
          }}
          onFocus={() => {
            if (disabled) return;
            setOpen(true);
            if (!selectedShop) setQuery("");
            else setQuery(formatShopSelectLabel(selectedShop));
          }}
          className={`min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 placeholder:text-slate-400 disabled:bg-slate-100 ${inputClassName}`}
        />
        {allowClear && value ? (
          <button
            type="button"
            disabled={disabled}
            onClick={() => {
              onChange("");
              setQuery("");
              setOpen(false);
            }}
            className="shrink-0 rounded-md border border-slate-300 px-2 text-sm text-slate-600 hover:bg-slate-50 disabled:opacity-50"
            aria-label="Clear shop"
          >
            ×
          </button>
        ) : null}
      </div>

      {open && !disabled ? (
        <ul
          role="listbox"
          className="absolute z-[100] mt-1 max-h-60 w-full overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-slate-500">No matches</li>
          ) : (
            filtered.map((s) => (
              <li key={s.shopId} role="option">
                <button
                  type="button"
                  className="w-full px-3 py-2 text-left text-sm text-slate-800 hover:bg-sky-50"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(s)}
                >
                  {formatShopSelectLabel(s)}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
