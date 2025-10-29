"use client";

import Link from "next/link";
import { Database } from "@/lib/supabase/types";
import { ThumbsUp, Download, Calendar } from "lucide-react";
import { format } from "date-fns";
import DatasetImage from "./DatasetImage";

type Dataset = Database["public"]["Tables"]["datasets"]["Row"];

interface DatasetCardProps {
  dataset: Dataset;
  showPendingBadge?: boolean;
}

export default function DatasetCard({ dataset, showPendingBadge = false }: DatasetCardProps) {
  const isPending = dataset.status === "pending";
  
  return (
    <Link
      href={`/datasets/${dataset.id}`}
      className="group block bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02] relative"
    >
      {isPending && showPendingBadge && (
        <span className="absolute top-2 right-2 z-10 px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-semibold">
          Pending
        </span>
      )}
      {dataset.cover_image_url && (
        <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50">
          <DatasetImage
            src={dataset.cover_image_url}
            alt={dataset.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {dataset.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {dataset.abstract}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-lg"
            >
              {tag}
            </span>
          ))}
          {dataset.tags.length > 3 && (
            <span className="px-2 py-1 text-gray-500 text-xs">
              +{dataset.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{dataset.upvotes_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Download className="w-4 h-4" />
              <span>{dataset.monthly_downloads}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(dataset.created_at), "MMM yyyy")}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

