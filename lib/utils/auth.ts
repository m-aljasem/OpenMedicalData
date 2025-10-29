import { createClient } from "@/lib/supabase/server";
import { Database } from "@/lib/supabase/types";

type Role = "superadmin" | "admin" | "moderator" | "user";

export async function getUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getUserRole(userId: string): Promise<Role | null> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", userId)
    .single();

  if (error || !data) return null;
  return data.role as Role;
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) return null;
  return data;
}

export function hasPermission(
  userRole: Role | null,
  requiredRole: Role
): boolean {
  if (!userRole) return false;

  const hierarchy: Role[] = ["user", "moderator", "admin", "superadmin"];
  const userLevel = hierarchy.indexOf(userRole);
  const requiredLevel = hierarchy.indexOf(requiredRole);

  return userLevel >= requiredLevel;
}

export function canModerate(userRole: Role | null): boolean {
  return hasPermission(userRole, "moderator");
}

export function canAdmin(userRole: Role | null): boolean {
  return hasPermission(userRole, "admin");
}

export function isSuperAdmin(userRole: Role | null): boolean {
  return userRole === "superadmin";
}

