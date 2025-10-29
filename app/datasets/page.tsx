import { createClient } from "@/lib/supabase/server";
import DatasetCard from "@/components/DatasetCard";
import { SearchParams } from "@/lib/types";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Datasets - OMeD",
  description: "Browse and search medical datasets",
};

async function getDatasets(searchParams: SearchParams) {
  const supabase = await createClient();
  let query = supabase
    .from("datasets")
    .select("*")
    .eq("status", "approved")
    .order("created_at", { ascending: false });

  if (searchParams.search) {
    query = query.or(
      `title.ilike.%${searchParams.search}%,abstract.ilike.%${searchParams.search}%,tags.cs.{${searchParams.search}}`
    );
  }

  if (searchParams.specialty) {
    query = query.eq("specialty", searchParams.specialty);
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
  const datasets = await getDatasets(params);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Medical Datasets
          </h1>
          {params.search && (
            <p className="text-gray-600 dark:text-gray-400">
              Search results for: <strong>{params.search}</strong>
            </p>
          )}
          {params.specialty && (
            <p className="text-gray-600 dark:text-gray-400">
              Filtered by specialty: <strong>{params.specialty}</strong>
            </p>
          )}
        </div>

        {datasets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No datasets found. Be the first to submit one!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {datasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}

