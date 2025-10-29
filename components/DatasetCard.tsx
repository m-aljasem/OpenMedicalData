import Link from "next/link";
import Image from "next/image";
import { Database } from "@/lib/supabase/types";
import { ThumbsUp, Download, Calendar } from "lucide-react";
import { format } from "date-fns";

type Dataset = Database["public"]["Tables"]["datasets"]["Row"];

interface DatasetCardProps {
  dataset: Dataset;
}

export default function DatasetCard({ dataset }: DatasetCardProps) {
  return (
    <Link
      href={`/datasets/${dataset.id}`}
      className="group block bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
    >
      {dataset.cover_image_url && (
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={dataset.cover_image_url}
            alt={dataset.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
          {dataset.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
          {dataset.abstract}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {dataset.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg"
            >
              {tag}
            </span>
          ))}
          {dataset.tags.length > 3 && (
            <span className="px-2 py-1 text-gray-500 dark:text-gray-400 text-xs">
              +{dataset.tags.length - 3} more
            </span>
          )}
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
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

