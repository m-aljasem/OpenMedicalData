"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { Check, X, Eye, Calendar } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

interface AdminPanelProps {
  pendingDatasets: any[];
  currentUserId: string;
  userRole: string | null;
}

export default function AdminPanel({
  pendingDatasets,
  currentUserId,
  userRole,
}: AdminPanelProps) {
  const router = useRouter();
  const [processing, setProcessing] = useState<string | null>(null);
  const supabase = createClient();

  async function handleApprove(datasetId: string) {
    setProcessing(datasetId);
    const { error } = await supabase
      .from("datasets")
      .update({
        status: "approved",
        approved_by: currentUserId,
        approved_at: new Date().toISOString(),
      })
      .eq("id", datasetId);

    if (!error) {
      router.refresh();
    }
    setProcessing(null);
  }

  async function handleReject(datasetId: string) {
    setProcessing(datasetId);
    const { error } = await supabase
      .from("datasets")
      .update({
        status: "rejected",
        approved_by: currentUserId,
        approved_at: new Date().toISOString(),
      })
      .eq("id", datasetId);

    if (!error) {
      router.refresh();
    }
    setProcessing(null);
  }

  if (pendingDatasets.length === 0) {
    return (
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-12 text-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">
          No pending datasets to review.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {pendingDatasets.map((dataset) => (
        <div
          key={dataset.id}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-6"
        >
          <div className="flex flex-col md:flex-row gap-6">
            {dataset.cover_image_url && (
              <div className="relative w-full md:w-48 h-48 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src={dataset.cover_image_url}
                  alt={dataset.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div>
                <h2 className="text-2xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {dataset.title}
                </h2>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{format(new Date(dataset.created_at), "MMM d, yyyy")}</span>
                  </div>
                  <div>
                    Submitted by:{" "}
                    <span className="font-medium">
                      {dataset.profiles?.name || dataset.profiles?.email || "Anonymous"}
                    </span>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
                  {dataset.abstract}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {dataset.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/datasets/${dataset.id}`}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
                <button
                  onClick={() => handleApprove(dataset.id)}
                  disabled={processing === dataset.id}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="w-5 h-5" />
                  Approve
                </button>
                <button
                  onClick={() => handleReject(dataset.id)}
                  disabled={processing === dataset.id}
                  className="inline-flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl hover:from-red-600 hover:to-rose-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <X className="w-5 h-5" />
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

