'use client';

type Props = {
  mode: "add" | "edit";
  data?: any;
  onClose: () => void;
};

export default function CategoryFormModal({ mode, data, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-black mb-4">
          {mode === "add" ? "Add New Category" : "Edit Category"}
        </h2>

          <button onClick={onClose} className="cursor-pointer text-black items-center mb-6">
            ⨯
          </button>
        </div>
        
        

        <div className="space-y-4">
          <input
            defaultValue={data?.id}
            placeholder="Category ID"
            className="w-full border p-2 rounded text-gray-700"
          />
          
          <input
            defaultValue={data?.name}
            placeholder="Category Name"
            className="w-full border p-2 rounded text-gray-700"
          />
          <textarea
            defaultValue={data?.description}
            placeholder="Description"
            className="w-full border p-2 rounded text-gray-700"
          />
          <select className="w-full border p-2 rounded text-gray-700">
            <option>Active</option>
            <option>Hidden</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-purple-100 text-purple-600 rounded hover:bg-purple-200 cursor-pointer">
            Cancel
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 cursor-pointer">
            Add New Category
          </button>
        </div>
      </div>
    </div>
  );
}