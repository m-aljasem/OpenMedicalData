"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Plus, User, LogOut, LogIn, Shield } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SupabaseClient } from "@supabase/supabase-js";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<string | null>(null);
  
  let supabase: SupabaseClient | null = null;
  try {
    supabase = createClient();
  } catch (error) {
    // During build time or if env vars are missing, supabase will be null
    // Component will render without auth features
  }

  useEffect(() => {
    if (!supabase) return;

    const currentSupabase = supabase; // Capture for closure

    async function loadUser() {
      try {
        const {
          data: { user },
        } = await currentSupabase.auth.getUser();

        if (user) {
          setUser(user);
          const { data } = await currentSupabase
            .from("roles")
            .select("role")
            .eq("user_id", user.id)
            .single();
          if (data) setRole(data.role);
        }
      } catch (error) {
        // Silently fail during build or if Supabase is unavailable
        console.error("Failed to load user:", error);
      }
    }
    loadUser();

    const {
      data: { subscription },
    } = currentSupabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        loadUser();
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setRole(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  const handleSignOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const isModerator = role === "moderator" || role === "admin" || role === "superadmin";

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            OMeD
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/datasets"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === "/datasets"
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <div className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Datasets</span>
              </div>
            </Link>

            {user ? (
              <>
                <Link
                  href="/submit"
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Submit</span>
                </Link>
                {isModerator && (
                  <Link
                    href="/admin"
                    className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <Link
                  href="/profile"
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Profile</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-4 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all flex items-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

