"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { Send, User as UserIcon } from "lucide-react";
import { getGravatarUrl } from "@/lib/utils/avatar";

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles?: {
    name: string | null;
    email: string;
    avatar_type: string;
    avatar_value: string | null;
  };
}

interface CommentsSectionProps {
  datasetId: string;
  userId?: string;
}

export default function CommentsSection({ datasetId, userId }: CommentsSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadComments();
  }, [datasetId]);

  async function loadComments() {
    const { data } = await supabase
      .from("comments")
      .select(
        `
        *,
        profiles:user_id (
          name,
          email,
          avatar_type,
          avatar_value
        )
      `
      )
      .eq("dataset_id", datasetId)
      .order("created_at", { ascending: false });

    if (data) {
      setComments(data as Comment[]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !userId) return;

    setLoading(true);
    const { error } = await supabase.from("comments").insert({
      dataset_id: datasetId,
      user_id: userId,
      content: newComment.trim(),
    });

    if (!error) {
      setNewComment("");
      loadComments();
    }
    setLoading(false);
  }

  function getAvatarUrl(profile: Comment["profiles"]) {
    if (!profile) return "/default-avatar.png";
    if (profile.avatar_type === "gravatar") {
      return getGravatarUrl(profile.email);
    }
    return profile.avatar_value || "/default-avatar.png";
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900">Comments</h2>

      {userId ? (
        <form onSubmit={handleSubmit} className="mb-8">
          <div className="flex gap-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !newComment.trim()}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              Post
            </button>
          </div>
        </form>
      ) : (
        <div className="mb-8 p-4 bg-blue-50 rounded-xl">
          <p className="text-blue-700">
            Please{" "}
            <a href="/auth/login" className="underline font-medium">
              sign in
            </a>{" "}
            to comment.
          </p>
        </div>
      )}

      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          comments.map((comment) => (
            <div
              key={comment.id}
              className="flex gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <div className="flex-shrink-0">
                {comment.profiles ? (
                  <img
                    src={getAvatarUrl(comment.profiles)}
                    alt={comment.profiles.name || "User"}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserIcon className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-semibold text-gray-900">
                    {comment.profiles?.name || comment.profiles?.email || "Anonymous"}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(comment.created_at), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {comment.content}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

