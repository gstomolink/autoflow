'use client';

export default function AdminHeader() {
  return (
    <header className="bg-white rounded-xl shadow-sm p-2 mb-2 flex justify-between items-center">
      <div>
        <h1 className="text-medium font-bold text-gray-800 ml-4">Hello Admin</h1>
      </div>

      <div className="flex items-center gap-4">
        

        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            AD
          </div>
          <span className="font-medium text-gray-700">Admin</span>
        </div>
      </div>
    </header>
  );
}