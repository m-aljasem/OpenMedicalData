/**
 * Database Seeding Script from JSON
 * 
 * This script populates the database with datasets from sample-datasets.json.
 * 
 * Usage:
 * 1. Set up your .env.local with Supabase credentials
 * 2. Run: npx tsx scripts/seed-from-json.ts
 * 
 * Note: This script requires Supabase Admin API access.
 * It will skip datasets that already exist (by title).
 */

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// You'll need to set these in your environment or pass as arguments
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error(
    "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface DatasetFromJSON {
  title: string;
  abstract: string;
  doi?: string;
  tags: string[];
  specialty: string;
  dataset_link: string;
  cover_image_url?: string;
  sample_data?: Record<string, unknown>;
  case_size?: string;
  submitted_by_index: number;
  status: "pending" | "approved" | "rejected";
  upvotes_count: number;
  monthly_downloads: number;
}

/**
 * Fetches all user IDs from the database, ordered by creation time
 * This ensures we can map submitted_by_index to actual user IDs
 */
async function getUserIds(): Promise<string[]> {
  console.log("Fetching user IDs from database...\n");

  // Get all users from auth (admin API)
  const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

  if (authError) {
    console.error("Error fetching users:", authError.message);
    return [];
  }

  if (!authUsers || authUsers.users.length === 0) {
    console.error("No users found in database. Please run seed-database.ts first to create users.");
    return [];
  }

  // Sort by created_at to get consistent ordering
  const sortedUsers = authUsers.users.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  const userIds = sortedUsers.map((user) => user.id);
  console.log(`Found ${userIds.length} users in database\n`);
  return userIds;
}

/**
 * Loads datasets from the JSON file
 */
function loadDatasetsFromJSON(): DatasetFromJSON[] {
  const jsonPath = path.join(process.cwd(), "scripts", "sample-datasets.json");
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`JSON file not found at: ${jsonPath}`);
    process.exit(1);
  }

  try {
    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const datasets: DatasetFromJSON[] = JSON.parse(fileContent);
    console.log(`Loaded ${datasets.length} datasets from JSON file\n`);
    return datasets;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    process.exit(1);
  }
}

/**
 * Seeds datasets from JSON into the database
 */
async function seedDatasetsFromJSON(userIds: string[]) {
  console.log("Creating datasets from JSON file...\n");

  const datasets = loadDatasetsFromJSON();
  
  if (userIds.length === 0) {
    console.error("No users available. Cannot proceed with datasets.");
    return;
  }

  let successCount = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const dataset of datasets) {
    // Map submitted_by_index to actual user ID
    const submittedBy = userIds[dataset.submitted_by_index];
    if (!submittedBy) {
      console.error(
        `⚠ Invalid user index ${dataset.submitted_by_index} for dataset: ${dataset.title} (max index: ${userIds.length - 1})`
      );
      errorCount++;
      continue;
    }

    // Check if dataset already exists by title
    const { data: existing, error: checkError } = await supabase
      .from("datasets")
      .select("id")
      .eq("title", dataset.title)
      .limit(1);

    if (checkError) {
      console.error(`Error checking dataset ${dataset.title}:`, checkError.message);
      errorCount++;
      continue;
    }

    if (existing && existing.length > 0) {
      console.log(`→ Dataset already exists: ${dataset.title}`);
      skippedCount++;
      continue;
    }

    // Insert the dataset
    const { error } = await supabase.from("datasets").insert({
      title: dataset.title,
      abstract: dataset.abstract,
      doi: dataset.doi || null,
      tags: dataset.tags,
      specialty: dataset.specialty,
      dataset_link: dataset.dataset_link,
      cover_image_url: dataset.cover_image_url || null,
      sample_data: dataset.sample_data || null,
      case_size: dataset.case_size || null,
      submitted_by: submittedBy,
      status: dataset.status,
      upvotes_count: dataset.upvotes_count,
      monthly_downloads: dataset.monthly_downloads,
    });

    if (error) {
      console.error(`✗ Error creating dataset ${dataset.title}:`, error.message);
      errorCount++;
    } else {
      console.log(`✓ Created dataset: ${dataset.title}`);
      successCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✓ Created ${successCount} datasets`);
  if (skippedCount > 0) {
    console.log(`→ Skipped ${skippedCount} existing datasets`);
  }
  if (errorCount > 0) {
    console.log(`✗ ${errorCount} datasets had errors`);
  }
  console.log(`\n`);
}

async function main() {
  console.log("Starting database seeding from JSON file...\n");
  console.log("=".repeat(50));
  console.log();

  try {
    // First, get all user IDs from the database
    const userIds = await getUserIds();

    if (userIds.length === 0) {
      console.error(
        "\n❌ No users found in database. Please run 'npx tsx scripts/seed-database.ts' first to create users.\n"
      );
      process.exit(1);
    }

    // Then, seed datasets from JSON
    await seedDatasetsFromJSON(userIds);

    console.log("=".repeat(50));
    console.log("\n✓ Seeding completed successfully!\n");
  } catch (error) {
    console.error("\n❌ Error during seeding:", error);
    process.exit(1);
  }
}

main();

