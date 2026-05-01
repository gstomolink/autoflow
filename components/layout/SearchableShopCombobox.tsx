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
  const selectedLabel = selectedShop
    ? formatShopSelectLabel(selectedShop)
    : placeholder;

  return (
    <div className={`w-full ${className}`}>
      <select
        id={id}
        aria-label={ariaLabel}
        disabled={disabled}
        value={value}
        title={selectedLabel}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-800 disabled:bg-slate-100"
      >
        <option value="">{placeholder}</option>
        {shops.map((shop) => (
          <option key={shop.shopId} value={shop.shopId}>
            {formatShopSelectLabel(shop)}
          </option>
        ))}
      </select>
    </div>
  );
}
