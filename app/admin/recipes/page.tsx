'use client';

import RecipesTable from "@/components/admin/recipes/RecipesTable";

export default function RecipesPage() {
  return (
    <div className="text-gray-700">

      <h1 className="text-3xl font-bold mb-2">Recipes</h1>
      <p className="text-gray-500 mb-6">
        Manage product recipes and ingredient costing
      </p>

      <RecipesTable />

    </div>
  );
}