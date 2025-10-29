import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, Download, Calendar, User, Tag } from "lucide-react";
import { format } from "date-fns";
import UpvoteButton from "@/components/UpvoteButton";
import CommentsSection from "@/components/CommentsSection";
import DownloadButton from "@/components/DownloadButton";
import Footer from "@/components/Footer";
import { getUser, getUserRole, isSuperAdmin } from "@/lib/utils/auth";
import DatasetImage from "@/components/DatasetImage";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const user = await getUser();
  const userRole = user ? await getUserRole(user.id) : null;
  const canSeeAll = isSuperAdmin(userRole);
  
  let query = supabase.from("datasets").select("*").eq("id", id);
  if (!canSeeAll) {
    query = query.eq("status", "approved");
  }
  
  const { data: dataset } = await query.single();

  if (!dataset) {
    return {
      title: "Dataset Not Found - OMeD",
    };
  }

  return {
    title: `${dataset.title} - OMeD`,
    description: dataset.abstract,
    openGraph: {
      title: dataset.title,
      description: dataset.abstract,
      images: dataset.cover_image_url ? [dataset.cover_image_url] : [],
    },
  };
}

async function getDataset(id: string, isSuperAdmin: boolean = false) {
  const supabase = await createClient();
  
  let query = supabase.from("datasets").select("*").eq("id", id);

  // Superadmins can see all datasets, others only see approved
  if (!isSuperAdmin) {
    query = query.eq("status", "approved");
  }

  const { data: dataset, error: datasetError } = await query.single();

  if (datasetError) {
    console.error("Error fetching dataset:", datasetError);
    return null;
  }

  if (!dataset) {
    console.error("Dataset not found with id:", id);
    return null;
  }

  // Now fetch the profile separately to avoid RLS issues with the join
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, name, email")
    .eq("id", dataset.submitted_by)
    .single();

  // Return dataset with profile attached
  return {
    ...dataset,
    profiles: profile || null,
  };
}

export default async function DatasetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser();
  const userRole = user ? await getUserRole(user.id) : null;
  const canSeeAll = isSuperAdmin(userRole);
  
  const dataset = await getDataset(id, canSeeAll);

  if (!dataset) {
    notFound();
  }

  // Show badge for pending datasets (only visible to superadmins)
  const isPending = dataset.status === "pending";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        {dataset.cover_image_url && (
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8">
            <DatasetImage
              src={dataset.cover_image_url}
              alt={dataset.title}
              fill
              className="object-cover rounded-2xl"
            />
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8 mb-8">
          <div className="flex items-start justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {dataset.title}
            </h1>
            {isPending && canSeeAll && (
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
                Pending Approval
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{format(new Date(dataset.created_at), "MMMM d, yyyy")}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <Link
                href={`/profile/${dataset.submitted_by}`}
                className="hover:text-blue-600 transition-colors"
              >
                {dataset.profiles?.name || dataset.profiles?.email || "Anonymous"}
              </Link>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900">Abstract</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {dataset.abstract}
            </p>
          </div>

          {dataset.doi && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">DOI</h2>
              <a
                href={`https://doi.org/${dataset.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {dataset.doi}
              </a>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3 text-gray-900 flex items-center gap-2">
              <Tag className="w-5 h-5" />
              Tags
            </h2>
            <div className="flex flex-wrap gap-2">
              {dataset.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {dataset.case_size && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                Case Size
              </h2>
              <p className="text-gray-700">{dataset.case_size}</p>
            </div>
          )}

          {dataset.sample_data && (
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900">
                Sample Data Preview
              </h2>
              <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                {JSON.stringify(dataset.sample_data, null, 2)}
              </pre>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <ThumbsUp className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-gray-900">
                {dataset.upvotes_count}
              </span>
              <span className="text-gray-600">upvotes</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
              <Download className="w-5 h-5 text-green-600" />
              <span className="font-semibold text-gray-900">
                {dataset.monthly_downloads}
              </span>
              <span className="text-gray-600">monthly downloads</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <UpvoteButton datasetId={dataset.id} userId={user?.id} />
            <DownloadButton
              datasetId={dataset.id}
              datasetLink={dataset.dataset_link}
              userId={user?.id}
            />
          </div>
        </div>

        <CommentsSection datasetId={dataset.id} userId={user?.id} />
      </main>
      <Footer />
    </div>
  );
}

