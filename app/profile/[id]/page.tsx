import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import Footer from "@/components/Footer";
import { getGravatarUrl } from "@/lib/utils/avatar";
import { Database } from "@/lib/supabase/types";
import { ExternalLink, Mail, Building, GraduationCap } from "lucide-react";
import DatasetCard from "@/components/DatasetCard";
import DatasetImage from "@/components/DatasetImage";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error || !data) return null;
  return data;
}

async function getUserDatasets(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("datasets")
    .select("*")
    .eq("submitted_by", userId)
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  return data || [];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getProfile(id);

  if (!profile) {
    return {
      title: "Profile Not Found - OMeD",
    };
  }

  return {
    title: `${profile.name || profile.email} - OMeD`,
    description: profile.affiliation || `Profile of ${profile.name || profile.email}`,
  };
}

export default async function UserProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getProfile(id);
  const datasets = await getUserDatasets(id);

  if (!profile) {
    notFound();
  }

  const avatarUrl =
    profile.avatar_type === "gravatar"
      ? getGravatarUrl(profile.email)
      : profile.avatar_value || getGravatarUrl(profile.email);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Cover Photo */}
        {profile.cover_photo_url && (
          <div className="relative w-full h-64 md:h-96">
            <DatasetImage
              src={profile.cover_photo_url}
              alt="Cover"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Profile Header */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700 p-8 mb-8 -mt-20 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                src={avatarUrl}
                alt={profile.name || profile.email}
                className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                  {profile.name || profile.email}
                </h1>
                {profile.affiliation && (
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                    <Building className="w-5 h-5" />
                    <span>{profile.affiliation}</span>
                  </div>
                )}
                <div className="flex flex-wrap gap-4">
                  {profile.orcid && (
                    <a
                      href={`https://orcid.org/${profile.orcid}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <GraduationCap className="w-5 h-5" />
                      ORCID
                    </a>
                  )}
                  {profile.linkedin && (
                    <a
                      href={profile.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-5 h-5" />
                      LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <ExternalLink className="w-5 h-5" />
                      GitHub
                    </a>
                  )}
                  {profile.google_scholar && (
                    <a
                      href={profile.google_scholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      <GraduationCap className="w-5 h-5" />
                      Google Scholar
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submitted Datasets */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Submitted Datasets ({datasets.length})
            </h2>
            {datasets.length === 0 ? (
              <div className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  No datasets submitted yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {datasets.map((dataset) => (
                  <DatasetCard key={dataset.id} dataset={dataset} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

