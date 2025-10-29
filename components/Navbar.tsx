"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Plus, User, LogOut, LogIn, Shield, Info, Grid3x3 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<SupabaseUser | null>(null);
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

  const isHomePage = pathname === "/";

  return (
    <nav className={cn(
      "w-full border-b sticky top-0 z-50",
      isHomePage 
        ? "border-white/20 bg-transparent backdrop-blur-none shadow-none"
        : "border-gray-200 bg-white/90 backdrop-blur-xl shadow-sm"
    )}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {pathname !== "/" && (
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient ml-5"
            >
              OMeD
            </Link>
          )}
          {pathname === "/" && <div className="ml-5" />}

          <div className="flex items-center gap-2">
            <Button
              asChild
              variant={pathname === "/datasets" ? "secondary" : "ghost"}
              size="default"
              className={cn(
                pathname === "/datasets" && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                isHomePage && "text-white hover:bg-white/10"
              )}
            >
              <Link href="/datasets" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                <span>Datasets</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname === "/about" ? "secondary" : "ghost"}
              size="default"
              className={cn(
                pathname === "/about" && "bg-blue-100 text-blue-700 hover:bg-blue-100",
                isHomePage && "text-white hover:bg-white/10"
              )}
            >
              <Link href="/about" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>About</span>
              </Link>
            </Button>

            <Button
              asChild
              variant={pathname?.startsWith("/datasets") && pathname.includes("#categories") ? "secondary" : "ghost"}
              size="default"
              className={cn(
                isHomePage && "text-white hover:bg-white/10"
              )}
            >
              <Link href="/#categories" className="flex items-center gap-2">
                <Grid3x3 className="w-4 h-4" />
                <span>Categories</span>
              </Link>
            </Button>

            <Button
              asChild
              variant="submit"
              size="lg"
              className="shadow-md hover:shadow-lg px-6 py-6 min-w-[120px]"
            >
              <Link href="/submit" className="flex items-center gap-2 justify-center">
                <Plus className="w-5 h-5" />
                <span className="font-semibold">Submit</span>
              </Link>
            </Button>

            {user ? (
              <>
                {isModerator && (
                  <Button
                    asChild
                    variant="ghost"
                    size="default"
                    className={cn(isHomePage && "text-white hover:bg-white/10")}
                  >
                    <Link href="/admin" className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      <span>Admin</span>
                    </Link>
                  </Button>
                )}
                <Button
                  asChild
                  variant="ghost"
                  size="default"
                  className={cn(isHomePage && "text-white hover:bg-white/10")}
                >
                  <Link href="/profile" className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                </Button>
                <Button
                  onClick={handleSignOut}
                  variant="ghost"
                  size="default"
                  className={cn(isHomePage && "text-white hover:bg-white/10")}
                >
                  <LogOut className="w-4 h-4" />
                  <span className="ml-2">Sign Out</span>
                </Button>
              </>
            ) : (
              <Button
                asChild
                variant="gradient"
                size="lg"
                className="shadow-md hover:shadow-lg px-6 py-6 min-w-[120px]"
              >
                <Link href="/auth/login" className="flex items-center gap-2 justify-center">
                  <LogIn className="w-5 h-5" />
                  <span className="font-semibold">Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

