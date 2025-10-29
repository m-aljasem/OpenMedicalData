import { createClient } from "@/lib/supabase/server";
import DatasetCard from "@/components/DatasetCard";
import { SearchParams } from "@/lib/types";
import Footer from "@/components/Footer";
import SortSelect from "@/components/SortSelect";
import FiltersPanel from "@/components/FiltersPanel";
import ActiveFilters from "@/components/ActiveFilters";
import { Suspense } from "react";
import FiltersButton from "@/components/FiltersButton";
import { getUser, getUserRole, isSuperAdmin } from "@/lib/utils/auth";

export const metadata = {
  title: "Datasets - OMeD",
  description: "Browse and search medical datasets",
};

async function getDatasets(searchParams: SearchParams) {
  const supabase = await createClient();
  const user = await getUser();
  const userRole = user ? await getUserRole(user.id) : null;
  const canSeeAll = isSuperAdmin(userRole);

  let query = supabase.from("datasets").select("*");

  // Superadmins can see all datasets, others only see approved
  if (!canSeeAll) {
    query = query.eq("status", "approved");
  }

  if (searchParams.search) {
    query = query.or(
      `title.ilike.%${searchParams.search}%,abstract.ilike.%${searchParams.search}%,tags.cs.{${searchParams.search}}`
    );
  }

  // Handle specialty filters (support both old single specialty and new multiple)
  if (searchParams.specialties) {
    const specialties = searchParams.specialties.split(",").filter(Boolean);
    if (specialties.length > 0) {
      query = query.in("specialty", specialties);
    }
  } else if (searchParams.specialty) {
    // Legacy support for single specialty
    query = query.eq("specialty", searchParams.specialty);
  }

  // Apply numeric filters
  if (searchParams.min_upvotes) {
    const minUpvotes = parseInt(searchParams.min_upvotes);
    if (!isNaN(minUpvotes)) {
      query = query.gte("upvotes_count", minUpvotes);
    }
  }

  if (searchParams.min_downloads) {
    const minDownloads = parseInt(searchParams.min_downloads);
    if (!isNaN(minDownloads)) {
      query = query.gte("monthly_downloads", minDownloads);
    }
  }

  // Apply date range filters
  if (searchParams.date_from) {
    query = query.gte("created_at", searchParams.date_from);
  }

  if (searchParams.date_to) {
    // Add time to end of day for inclusive filtering
    const dateTo = new Date(searchParams.date_to);
    dateTo.setHours(23, 59, 59, 999);
    query = query.lte("created_at", dateTo.toISOString());
  }

  // Handle sorting
  const sortOption = searchParams.sort || "newest";
  switch (sortOption) {
    case "oldest":
      query = query.order("created_at", { ascending: true });
      break;
    case "most_upvoted":
      query = query.order("upvotes_count", { ascending: false });
      break;
    case "most_downloaded":
      query = query.order("monthly_downloads", { ascending: false });
      break;
    case "alphabetical":
      query = query.order("title", { ascending: true });
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.error("Error fetching datasets:", error);
    return [];
  }

  return data || [];
}

export default async function DatasetsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const user = await getUser();
  const userRole = user ? await getUserRole(user.id) : null;
  const canSeeAll = isSuperAdmin(userRole);
  const datasets = await getDatasets(params);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-4xl font-bold text-gray-900">
              Medical Datasets
            </h1>
            {datasets.length > 0 && (
              <div className="flex items-center gap-3">
                <Suspense fallback={<div className="w-24 h-10 bg-gray-100 rounded-lg animate-pulse" />}>
                  <FiltersButton />
                </Suspense>
                <Suspense fallback={<div className="w-40 h-10 bg-gray-100 rounded-lg animate-pulse" />}>
                  <SortSelect />
                </Suspense>
              </div>
            )}
          </div>
          {(params.search || params.specialty) && (
            <div className="space-y-1 mb-4">
              {params.search && (
                <p className="text-gray-600">
                  Search results for: <strong>{params.search}</strong>
                </p>
              )}
              {params.specialty && (
                <p className="text-gray-600">
                  Filtered by specialty: <strong>{params.specialty}</strong>
                </p>
              )}
            </div>
          )}
          <Suspense fallback={null}>
            <ActiveFilters />
          </Suspense>
        </div>

        {datasets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No datasets found. Be the first to submit one!
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Showing {datasets.length} dataset{datasets.length !== 1 ? "s" : ""}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {datasets.map((dataset) => (
                <DatasetCard 
                  key={dataset.id} 
                  dataset={dataset} 
                  showPendingBadge={canSeeAll}
                />
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

