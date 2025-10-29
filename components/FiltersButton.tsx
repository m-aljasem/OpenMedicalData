"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import FiltersPanel from "./FiltersPanel";
import { useSearchParams } from "next/navigation";

export default function FiltersButton() {
  const [isOpen, setIsOpen] = useState(false);
  const searchParams = useSearchParams();

  // Count active filters
  const activeFiltersCount =
    (searchParams.get("specialties")?.split(",").filter(Boolean).length || 0) +
    (searchParams.get("min_upvotes") ? 1 : 0) +
    (searchParams.get("min_downloads") ? 1 : 0) +
    (searchParams.get("date_from") ? 1 : 0) +
    (searchParams.get("date_to") ? 1 : 0) +
    (searchParams.get("specialty") ? 1 : 0); // Legacy single specialty

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors relative"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFiltersCount > 0 && (
          <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-500 text-white text-xs font-semibold rounded-full">
            {activeFiltersCount}
          </span>
        )}
      </button>
      <FiltersPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

