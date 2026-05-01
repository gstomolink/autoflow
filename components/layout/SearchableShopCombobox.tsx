"use client";

import { useMemo } from "react";
import {
  type ShopListEntry,
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
  "aria-label": ariaLabel,
  allowClear,
}: Props) {
  const selectedShop = useMemo(
    () => shops.find((s) => s.shopId === value),
    [shops, value],
  );

  return (
    <div className={`flex items-stretch gap-1 ${className}`}>
      <div className="flex items-stretch gap-1">
        <select
          id={id}
          aria-label={ariaLabel}
          disabled={disabled}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-800 disabled:bg-slate-100"
        >
          <option value="">{placeholder}</option>
          {shops.map((shop) => (
            <option key={shop.shopId} value={shop.shopId}>
              {formatShopSelectLabel(shop)}
            </option>
          ))}
        </select>
      </div>
      
    </div>
  );
}
