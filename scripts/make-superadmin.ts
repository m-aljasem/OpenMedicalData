import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import { resolve } from "path";

// Load environment variables
dotenv.config({ path: resolve(process.cwd(), ".env.local") });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing required environment variables:");
  console.error("NEXT_PUBLIC_SUPABASE_URL:", !!supabaseUrl);
  console.error("SUPABASE_SERVICE_ROLE_KEY:", !!supabaseServiceKey);
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function makeSuperAdmin(email: string) {
  console.log(`\n🔍 Looking for user with email: ${email}\n`);

  // Find user by email
  const { data: users, error: userError } = await supabase.auth.admin.listUsers();

  if (userError) {
    console.error("Error fetching users:", userError);
    process.exit(1);
  }

  const user = users.users.find((u) => u.email === email);

  if (!user) {
    console.error(`❌ User with email ${email} not found!`);
    console.log("\nAvailable users:");
    users.users.forEach((u) => {
      console.log(`  - ${u.email} (${u.id})`);
    });
    process.exit(1);
  }

  console.log(`✓ Found user: ${user.email} (${user.id})\n`);

  // Check current role
  const { data: currentRole } = await supabase
    .from("roles")
    .select("role")
    .eq("user_id", user.id)
    .single();

  if (currentRole) {
    console.log(`Current role: ${currentRole.role}`);
    if (currentRole.role === "superadmin") {
      console.log("✓ User is already a superadmin!");
      return;
    }
  }

  // Update or insert role
  const { error: roleError } = await supabase
    .from("roles")
    .upsert(
      {
        user_id: user.id,
        role: "superadmin",
      },
      {
        onConflict: "user_id",
      }
    );

  if (roleError) {
    console.error("❌ Error updating role:", roleError);
    process.exit(1);
  }

  console.log(`\n✅ Successfully made ${email} a superadmin!\n`);
}

// Get email from command line argument or use default
const email = process.argv[2] || "m-aljasem@outlook.com";

makeSuperAdmin(email)
  .then(() => {
    console.log("Done!");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Fatal error:", error);
    process.exit(1);
  });

