"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, Filter, Calendar, ThumbsUp, Download, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const specialties = [
  "cardiology",
  "neurology",
  "oncology",
  "ophthalmology",
  "general",
  "pharmacology",
  "genetics",
  "pathology",
  "orthopedics",
  "pediatrics",
  "radiology",
  "surgery",
  "pulmonology",
  "infectious_disease",
  "dermatology",
  "endocrinology",
];

interface FiltersPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function FiltersPanel({ isOpen, onClose }: FiltersPanelProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get current filter values from URL
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get("specialties")?.split(",").filter(Boolean) || []
  );
  const [minUpvotes, setMinUpvotes] = useState(
    searchParams.get("min_upvotes") || ""
  );
  const [minDownloads, setMinDownloads] = useState(
    searchParams.get("min_downloads") || ""
  );
  const [dateFrom, setDateFrom] = useState(
    searchParams.get("date_from") || ""
  );
  const [dateTo, setDateTo] = useState(searchParams.get("date_to") || "");

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    // Remove existing filter params
    params.delete("specialties");
    params.delete("min_upvotes");
    params.delete("min_downloads");
    params.delete("date_from");
    params.delete("date_to");
    params.delete("specialty"); // Remove old single specialty param

    // Add new filter params
    if (selectedSpecialties.length > 0) {
      params.set("specialties", selectedSpecialties.join(","));
    }
    if (minUpvotes) {
      params.set("min_upvotes", minUpvotes);
    }
    if (minDownloads) {
      params.set("min_downloads", minDownloads);
    }
    if (dateFrom) {
      params.set("date_from", dateFrom);
    }
    if (dateTo) {
      params.set("date_to", dateTo);
    }

    router.push(`/datasets?${params.toString()}`);
    onClose();
  };

  const clearFilters = () => {
    setSelectedSpecialties([]);
    setMinUpvotes("");
    setMinDownloads("");
    setDateFrom("");
    setDateTo("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("specialties");
    params.delete("min_upvotes");
    params.delete("min_downloads");
    params.delete("date_from");
    params.delete("date_to");
    params.delete("specialty");

    router.push(`/datasets?${params.toString()}`);
    onClose();
  };

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty)
        ? prev.filter((s) => s !== specialty)
        : [...prev, specialty]
    );
  };

  const activeFiltersCount =
    selectedSpecialties.length +
    (minUpvotes ? 1 : 0) +
    (minDownloads ? 1 : 0) +
    (dateFrom ? 1 : 0) +
    (dateTo ? 1 : 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-700" />
              <h2 className="text-2xl font-bold text-gray-900">Filters</h2>
              {activeFiltersCount > 0 && (
                <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Filters Content */}
          <div className="space-y-6">
            {/* Specialties */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Specialties
              </label>
              <div className="grid grid-cols-2 gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => toggleSpecialty(specialty)}
                    className={`px-3 py-2 text-sm rounded-lg border transition-all ${
                      selectedSpecialties.includes(specialty)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    {specialty.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Date Range
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">To</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Minimum Upvotes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4" />
                Minimum Upvotes
              </label>
              <input
                type="number"
                min="0"
                value={minUpvotes}
                onChange={(e) => setMinUpvotes(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Minimum Downloads */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Minimum Downloads
              </label>
              <input
                type="number"
                min="0"
                value={minDownloads}
                onChange={(e) => setMinDownloads(e.target.value)}
                placeholder="0"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-3">
            <Button
              onClick={applyFilters}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
              size="lg"
            >
              Apply Filters
            </Button>
            {activeFiltersCount > 0 && (
              <Button
                onClick={clearFilters}
                variant="outline"
                className="w-full"
                size="lg"
              >
                Clear All Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

