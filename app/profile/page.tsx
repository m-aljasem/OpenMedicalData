import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";
import Footer from "@/components/Footer";
import { getUser } from "@/lib/utils/auth";

export const metadata = {
  title: "My Profile - OMeD",
  description: "Manage your profile settings",
};

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const supabase = await createClient();
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">My Profile</h1>
        <ProfileForm user={user} profile={profile} />
      </main>
      <Footer />
    </div>
  );
}

