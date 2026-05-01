'use client';

import { useState } from "react";

const data = [
  { name:"Flour", expiry:"2026-06-01" },
  { name:"Sugar", expiry:"2026-07-10" },
  { name:"Salt", expiry:"2027-01-01" },
  { name:"Milk", expiry:"2026-04-02" },
  { name:"Butter", expiry:"2026-04-05" },
  { name:"Eggs", expiry:"2026-04-03" },
  { name:"Chicken", expiry:"2026-04-01" },
  { name:"Tomatoes", expiry:"2026-04-04" },
  { name:"Onions", expiry:"2026-05-01" },
  { name:"Cheese", expiry:"2026-04-10" },
];

export default function NearExpiryTab() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [range, setRange] = useState("");
  const [filteredData, setFilteredData] = useState(data);

  //  Convert range → days
  const getDays = () => {
    if (range === "1w") return 7;
    if (range === "2w") return 14;
    if (range === "1m") return 30;
    if (range === "2m") return 60;
    if (range === "3m") return 90;
    return 0;
  };

  // 🔍 HANDLE SEARCH BUTTON
  const handleSearch = () => {
    let result = [...data];

    // SEARCH BY NAME
    if (search) {
      result = result.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // FILTER BY SELECTED DATE
    if (selectedDate) {
      const selected = new Date(selectedDate);
      result = result.filter(i => new Date(i.expiry) <= selected);
    }

    // FILTER BY RANGE
    if (range) {
      const today = new Date();
      const future = new Date();
      future.setDate(today.getDate() + getDays());

      result = result.filter(i => {
        const exp = new Date(i.expiry);
        return exp >= today && exp <= future;
      });
    }

    setFilteredData(result);
  };

  const handleClear = () => {
    setSearch("");
    setSelectedDate("");
    setRange("");
    setFilteredData(data);
  };

  return (
    <div>

      {/* FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex items-center gap-4 flex-wrap">

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search ingredient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-60 border border-gray-300 px-3 py-2 rounded-lg"
        />

        {/* DATE PICKER */}
        <div className="flex items-center gap-2">
            <label>Expiring Before:</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-lg"
          />
        </div>

        {/* RANGE FILTER */}
        <select
          value={range}
          onChange={(e) => setRange(e.target.value)}
          className="border border-gray-300 px-3 py-2 rounded-lg"
        >
          <option value="">Select Range</option>
          <option value="1w">1 Week</option>
          <option value="2w">2 Weeks</option>
          <option value="1m">1 Month</option>
          <option value="2m">2 Months</option>
          <option value="3m">3 Months</option>
        </select>

        <div className="ml-auto flex gap-2">
          <button
            type="button"
            onClick={handleSearch}
            className="bg-sky-500 text-white px-5 py-2 rounded-lg hover:bg-sky-600 cursor-pointer"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Clear
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full bg-white shadow rounded">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Ingredient</th>
            <th className="p-2">Expiry Date</th>
          </tr>
        </thead>

        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((i, idx) => (
              <tr key={idx} className="border-t border-gray-300">
                <td className="p-2 text-center">{i.name}</td>
                <td className="p-2 text-gray-700 font-medium text-center">
                  {i.expiry}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} className="text-center p-4 text-gray-500">
                No matching data
              </td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  );
}