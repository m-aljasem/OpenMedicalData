import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminPanel from "@/components/AdminPanel";
import Footer from "@/components/Footer";
import { getUser, getUserRole, canModerate } from "@/lib/utils/auth";

export const metadata = {
  title: "Admin Panel - OMeD",
  description: "Moderate and manage datasets",
};

export default async function AdminPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const userRole = await getUserRole(user.id);

  if (!canModerate(userRole)) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data: pendingDatasets } = await supabase
    .from("datasets")
    .select(`
      *,
      profiles:submitted_by (
        id,
        name,
        email
      )
    `)
    .eq("status", "pending")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-7xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">Admin Panel</h1>
        <AdminPanel
          pendingDatasets={pendingDatasets || []}
          currentUserId={user.id}
          userRole={userRole}
        />
      </main>
      <Footer />
    </div>
  );
}

