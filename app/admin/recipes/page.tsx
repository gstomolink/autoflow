'use client';

import { useState } from "react";
import RecipesTable from "@/components/admin/recipes/RecipesTable";
import RecipeFilters from "@/components/admin/recipes/RecipeFilters";

export default function RecipesPage() {
  const [filters, setFilters] = useState({
    search: "",
    category: ""
  });

  return (
    <div className="text-gray-700">

      <h1 className="text-3xl font-bold mb-2">Recipes</h1>
      <p className="text-gray-500 mb-6">
        Manage product recipes and ingredient costing
      </p>



      <RecipesTable filters={filters} />

    </div>
  );
}