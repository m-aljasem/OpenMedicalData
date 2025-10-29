import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import SubmissionForm from "@/components/SubmissionForm";
import Footer from "@/components/Footer";
import { getUser } from "@/lib/utils/auth";

export const metadata = {
  title: "Submit Dataset - OMeD",
  description: "Submit a new medical dataset to the OMeD platform",
};

export default async function SubmitPage() {
  const user = await getUser();

  if (!user) {
    redirect("/auth/login");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
          Submit a Dataset
        </h1>
        <SubmissionForm userId={user.id} />
      </main>
      <Footer />
    </div>
  );
}

