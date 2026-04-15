'use client';

import { roleLabel } from "@/lib/auth";

type Row = {
  fullName: string;
  userId: string;
  email: string | null;
  phone: string | null;
  role: number;
  shopId: string | null;
  staffType: string | null;
};

export default function ViewUserModal({
  data,
  onClose,
}: {
  data: Row;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">
        <h2 className="font-bold mb-4">User Details</h2>
        <p><b>Name:</b> {data.fullName}</p>
        <p><b>User ID:</b> {data.userId}</p>
        <p><b>Email:</b> {data.email ?? "—"}</p>
        <p><b>Phone:</b> {data.phone ?? "—"}</p>
        <p><b>Role:</b> {roleLabel(data.role)}</p>
        <p><b>Shop:</b> {data.shopId ?? "—"}</p>
        <p><b>Staff type:</b> {data.staffType ?? "—"}</p>
        <div className="flex justify-end mt-4">
          <button type="button" onClick={onClose} className="bg-sky-500 text-white px-4 py-2 rounded">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
