/**
 * Script to update image URLs for existing datasets in the database
 * 
 * Reads the fixed sample-datasets.json and updates cover_image_url
 * for datasets that already exist in the database (matched by title).
 * 
 * Usage:
 * 1. Set up your .env.local with Supabase credentials
 * 2. Run: npx tsx scripts/update-image-urls.ts
 * 
 * Note: This script requires Supabase Admin API access.
 */

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

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
 * Updates image URLs for existing datasets in the database
 */
async function updateImageUrls() {
  console.log("Updating image URLs for existing datasets...\n");

  const datasets = loadDatasetsFromJSON();
  
  let updatedCount = 0;
  let notFoundCount = 0;
  let errorCount = 0;
  let skippedCount = 0;

  for (const dataset of datasets) {
    // Find the dataset in the database by title
    const { data: existing, error: fetchError } = await supabase
      .from("datasets")
      .select("id, title, cover_image_url")
      .eq("title", dataset.title)
      .limit(1);

    if (fetchError) {
      console.error(`✗ Error fetching dataset ${dataset.title}:`, fetchError.message);
      errorCount++;
      continue;
    }

    if (!existing || existing.length === 0) {
      console.log(`→ Dataset not found in database: ${dataset.title}`);
      notFoundCount++;
      continue;
    }

    const existingDataset = existing[0];

    // Check if the URL is already correct or if it needs updating
    const needsUpdate = 
      !existingDataset.cover_image_url ||
      existingDataset.cover_image_url.includes("source.unsplash.com") ||
      existingDataset.cover_image_url !== dataset.cover_image_url;

    if (!needsUpdate && dataset.cover_image_url) {
      console.log(`→ Already up to date: ${dataset.title}`);
      skippedCount++;
      continue;
    }

    if (!dataset.cover_image_url) {
      console.log(`→ No image URL in JSON for: ${dataset.title}`);
      skippedCount++;
      continue;
    }

    // Update the dataset with the new image URL
    const { error: updateError } = await supabase
      .from("datasets")
      .update({ cover_image_url: dataset.cover_image_url })
      .eq("id", existingDataset.id);

    if (updateError) {
      console.error(`✗ Error updating ${dataset.title}:`, updateError.message);
      errorCount++;
    } else {
      console.log(`✓ Updated: ${dataset.title}`);
      console.log(`    New URL: ${dataset.cover_image_url}`);
      updatedCount++;
    }

    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log(`\n${"=".repeat(50)}`);
  console.log(`✓ Updated ${updatedCount} datasets`);
  if (skippedCount > 0) {
    console.log(`→ Skipped ${skippedCount} datasets (already up to date or no URL in JSON)`);
  }
  if (notFoundCount > 0) {
    console.log(`→ ${notFoundCount} datasets not found in database`);
  }
  if (errorCount > 0) {
    console.log(`✗ ${errorCount} datasets had errors`);
  }
  console.log(`\n`);
}

async function main() {
  console.log("Starting image URL update...\n");
  console.log("=".repeat(50));
  console.log();

  try {
    await updateImageUrls();

    console.log("=".repeat(50));
    console.log("\n✓ Update completed!\n");
  } catch (error) {
    console.error("\n❌ Error during update:", error);
    process.exit(1);
  }
}

main();

