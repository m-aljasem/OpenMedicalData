"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, User } from "lucide-react";
import Image from "next/image";

const profileSchema = z.object({
  name: z.string().optional(),
  affiliation: z.string().optional(),
  orcid: z.string().optional(),
  linkedin: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  google_scholar: z.string().url().optional().or(z.literal("")),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  user: {
    id: string;
    email?: string;
  };
  profile: any;
}

export default function ProfileForm({ user, profile }: ProfileFormProps) {
  const router = useRouter();
  const [coverPhotoSearch, setCoverPhotoSearch] = useState("");
  const [coverPhotoUrl, setCoverPhotoUrl] = useState(profile?.cover_photo_url || null);
  const [avatarType, setAvatarType] = useState<"gravatar" | "premade">(
    profile?.avatar_type || "gravatar"
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile?.name || "",
      affiliation: profile?.affiliation || "",
      orcid: profile?.orcid || "",
      linkedin: profile?.linkedin || "",
      github: profile?.github || "",
      google_scholar: profile?.google_scholar || "",
    },
  });

  const searchCoverPhoto = async () => {
    if (!coverPhotoSearch.trim()) return;

    // Using Unsplash API (you'll need to add the API key to env)
    const unsplashKey = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY;
    if (!unsplashKey) {
      setError("Unsplash API key not configured");
      return;
    }

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
          coverPhotoSearch
        )}&per_page=1&orientation=landscape`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashKey}`,
          },
        }
      );

      const data = await response.json();
      if (data.results && data.results.length > 0) {
        setCoverPhotoUrl(data.results[0].urls.regular);
      }
    } catch (err) {
      setError("Failed to fetch cover photo. You can manually enter a URL.");
    }
  };

  const onSubmit = async (data: ProfileFormData) => {
    setError("");
    setSaving(true);

    try {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({
          name: data.name || null,
          affiliation: data.affiliation || null,
          orcid: data.orcid || null,
          linkedin: data.linkedin || null,
          github: data.github || null,
          google_scholar: data.google_scholar || null,
          avatar_type: avatarType,
          cover_photo_url: coverPhotoUrl,
        })
        .eq("id", user.id);

      if (updateError) {
        setError(updateError.message);
        setSaving(false);
      } else {
        router.refresh();
        setSaving(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setSaving(false);
    }
  };

  return (
    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Avatar Type
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setAvatarType("gravatar")}
              className={`px-4 py-2 rounded-xl transition-all ${
                avatarType === "gravatar"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Gravatar
            </button>
            <button
              type="button"
              onClick={() => setAvatarType("premade")}
              className={`px-4 py-2 rounded-xl transition-all ${
                avatarType === "premade"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              }`}
            >
              Premade
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Cover Photo
          </label>
          <div className="space-y-4">
            {coverPhotoUrl && (
              <div className="relative w-full h-48 rounded-xl overflow-hidden">
                <Image src={coverPhotoUrl} alt="Cover" fill className="object-cover" />
              </div>
            )}
            <div className="flex gap-2">
              <input
                type="text"
                value={coverPhotoSearch}
                onChange={(e) => setCoverPhotoSearch(e.target.value)}
                placeholder="Search for cover photo keyword"
                className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={searchCoverPhoto}
                className="px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Search className="w-5 h-5" />
                Search
              </button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Or enter a direct image URL:{" "}
              <input
                type="url"
                value={coverPhotoUrl || ""}
                onChange={(e) => setCoverPhotoUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="mt-2 w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </p>
          </div>
        </div>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Name
          </label>
          <input
            id="name"
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="affiliation"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Affiliation
          </label>
          <input
            id="affiliation"
            {...register("affiliation")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="orcid"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            ORCID
          </label>
          <input
            id="orcid"
            {...register("orcid")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0000-0000-0000-0000"
          />
        </div>

        <div>
          <label
            htmlFor="linkedin"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            LinkedIn URL
          </label>
          <input
            id="linkedin"
            type="url"
            {...register("linkedin")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://linkedin.com/in/..."
          />
          {errors.linkedin && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.linkedin.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="github"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            GitHub URL
          </label>
          <input
            id="github"
            type="url"
            {...register("github")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://github.com/..."
          />
          {errors.github && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.github.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="google_scholar"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Google Scholar URL
          </label>
          <input
            id="google_scholar"
            type="url"
            {...register("google_scholar")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://scholar.google.com/..."
          />
          {errors.google_scholar && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.google_scholar.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
}

