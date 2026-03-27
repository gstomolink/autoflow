'use client';

export default function ResetPasswordModal({ data, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md text-gray-700">

        <h2 className="font-bold mb-4">Reset Password</h2>

        <p>User: <b>{data.name}</b></p>

        <input placeholder="New Password" className="w-full border p-2 rounded mt-3"/>
        <input placeholder="Confirm Password" className="w-full border p-2 rounded mt-2"/>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border px-4 py-2 rounded">Cancel</button>
          <button className="bg-sky-500 text-white px-4 py-2 rounded">Reset</button>
        </div>

      </div>
    </div>
  );
}