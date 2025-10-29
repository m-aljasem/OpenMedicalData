"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowUpDown } from "lucide-react";

export default function SortSelect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get("sort") || "newest";

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (sortValue === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", sortValue);
    }
    
    router.push(`/datasets?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-500" />
      <select
        value={currentSort}
        onChange={handleSortChange}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="most_upvoted">Most Upvoted</option>
        <option value="most_downloaded">Most Downloaded</option>
        <option value="alphabetical">Alphabetical (A-Z)</option>
      </select>
    </div>
  );
}

