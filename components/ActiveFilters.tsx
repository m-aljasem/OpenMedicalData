"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

export default function ActiveFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const specialties = searchParams.get("specialties")?.split(",").filter(Boolean) || [];
  const minUpvotes = searchParams.get("min_upvotes");
  const minDownloads = searchParams.get("min_downloads");
  const dateFrom = searchParams.get("date_from");
  const dateTo = searchParams.get("date_to");
  const legacySpecialty = searchParams.get("specialty");

  const removeFilter = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (key === "specialties") {
      const currentSpecialties = params.get("specialties")?.split(",").filter(Boolean) || [];
      const newSpecialties = currentSpecialties.filter((s) => s !== value);
      if (newSpecialties.length > 0) {
        params.set("specialties", newSpecialties.join(","));
      } else {
        params.delete("specialties");
      }
    } else {
      params.delete(key);
    }

    // Also remove legacy specialty if present
    if (key !== "specialty") {
      params.delete("specialty");
    }

    router.push(`/datasets?${params.toString()}`);
  };

  const clearAll = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("specialties");
    params.delete("specialty");
    params.delete("min_upvotes");
    params.delete("min_downloads");
    params.delete("date_from");
    params.delete("date_to");
    router.push(`/datasets?${params.toString()}`);
  };

  const hasFilters =
    specialties.length > 0 ||
    !!minUpvotes ||
    !!minDownloads ||
    !!dateFrom ||
    !!dateTo ||
    !!legacySpecialty;

  if (!hasFilters) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      <span className="text-sm text-gray-600 font-medium">Active filters:</span>
      
      {/* Legacy single specialty */}
      {legacySpecialty && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
          {legacySpecialty.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          <button
            onClick={() => removeFilter("specialty")}
            className="hover:bg-blue-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Multiple specialties */}
      {specialties.map((specialty) => (
        <span
          key={specialty}
          className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
        >
          {specialty.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          <button
            onClick={() => removeFilter("specialties", specialty)}
            className="hover:bg-blue-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}

      {/* Min upvotes */}
      {minUpvotes && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
          Min {minUpvotes} upvotes
          <button
            onClick={() => removeFilter("min_upvotes")}
            className="hover:bg-green-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Min downloads */}
      {minDownloads && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
          Min {minDownloads} downloads
          <button
            onClick={() => removeFilter("min_downloads")}
            className="hover:bg-purple-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Date range */}
      {dateFrom && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
          From {new Date(dateFrom).toLocaleDateString()}
          <button
            onClick={() => removeFilter("date_from")}
            className="hover:bg-orange-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {dateTo && (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm">
          Until {new Date(dateTo).toLocaleDateString()}
          <button
            onClick={() => removeFilter("date_to")}
            className="hover:bg-orange-200 rounded-full p-0.5"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      )}

      {/* Clear all button */}
      <button
        onClick={clearAll}
        className="text-sm text-gray-600 hover:text-gray-900 underline"
      >
        Clear all
      </button>
    </div>
  );
}

