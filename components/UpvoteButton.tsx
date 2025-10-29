"use client";

import { useState, useEffect } from "react";
import { ThumbsUp } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface UpvoteButtonProps {
  datasetId: string;
  userId?: string;
}

export default function UpvoteButton({ datasetId, userId }: UpvoteButtonProps) {
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvotesCount, setUpvotesCount] = useState(0);
  const supabase = createClient();

  useEffect(() => {
    async function loadUpvoteStatus() {
      if (!userId) return;

      const { data } = await supabase
        .from("upvotes")
        .select("*")
        .eq("dataset_id", datasetId)
        .eq("user_id", userId)
        .single();

      setIsUpvoted(!!data);
    }

    async function loadUpvotesCount() {
      const { data } = await supabase
        .from("datasets")
        .select("upvotes_count")
        .eq("id", datasetId)
        .single();

      if (data) {
        setUpvotesCount(data.upvotes_count);
      }
    }

    loadUpvoteStatus();
    loadUpvotesCount();
  }, [datasetId, userId, supabase]);

  const handleUpvote = async () => {
    if (!userId) {
      window.location.href = "/auth/login";
      return;
    }

    if (isUpvoted) {
      const { error } = await supabase
        .from("upvotes")
        .delete()
        .eq("dataset_id", datasetId)
        .eq("user_id", userId);

      if (!error) {
        setIsUpvoted(false);
        setUpvotesCount((prev) => Math.max(0, prev - 1));
      }
    } else {
      const { error } = await supabase.from("upvotes").insert({
        dataset_id: datasetId,
        user_id: userId,
      });

      if (!error) {
        setIsUpvoted(true);
        setUpvotesCount((prev) => prev + 1);
      }
    }
  };

  return (
    <button
      onClick={handleUpvote}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-medium shadow-lg hover:shadow-xl ${
        isUpvoted
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
      }`}
    >
      <ThumbsUp className={`w-5 h-5 ${isUpvoted ? "fill-current" : ""}`} />
      <span>{upvotesCount}</span>
      <span>{isUpvoted ? "Upvoted" : "Upvote"}</span>
    </button>
  );
}

