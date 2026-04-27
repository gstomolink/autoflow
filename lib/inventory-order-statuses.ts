export const INVENTORY_ORDER_STATUS_VALUES = [
  "draft",
  "submitted",
  "partially_received",
  "received",
  "cancelled",
] as const;

export type InventoryOrderStatusValue =
  (typeof INVENTORY_ORDER_STATUS_VALUES)[number];

export const INVENTORY_ORDER_STATUS_OPTIONS: readonly {
  value: InventoryOrderStatusValue;
  label: string;
}[] = [
  { value: "draft", label: "Draft" },
  { value: "submitted", label: "Submitted to supplier" },
  { value: "partially_received", label: "Partially received" },
  { value: "received", label: "Fully received" },
  { value: "cancelled", label: "Cancelled" },
];

export function isInventoryOrderStatus(
  s: string,
): s is InventoryOrderStatusValue {
  return (INVENTORY_ORDER_STATUS_VALUES as readonly string[]).includes(s);
}

export function inventoryOrderStatusLabel(status: string): string {
  const row = INVENTORY_ORDER_STATUS_OPTIONS.find((o) => o.value === status);
  return row?.label ?? status;
}
