/**
 * Script to fix image URLs in sample-datasets.json
 * 
 * Replaces deprecated source.unsplash.com URLs with proper images.unsplash.com URLs
 * 
 * Usage:
 * npx tsx scripts/fix-image-urls.ts
 */

import * as fs from "fs";
import * as path from "path";

// Mapping of specialties/tags to curated Unsplash photo IDs
const specialtyImageMap: Record<string, string> = {
  "critical care": "photo-1582719478250-c89cae4dc85b",
  "cardiology": "photo-1576091160399-112ba8d25d1f",
  "neurology": "photo-1551601651-2a8555f1a136",
  "radiology": "photo-1559757148-5c350d0d3c56",
  "oncology": "photo-1576091160550-2173dba999ef",
  "genetics": "photo-1587854692152-cbe660dbde88",
  "pharmacology": "photo-1551190822-a9333d879b1f",
  "ophthalmology": "photo-1582719471384-894fbb16e074",
  "dermatology": "photo-1519494026892-80bbd2d6fd0d",
  "pathology": "photo-1538108149393-fbbd81895907",
  "orthopedics": "photo-1551601651-2a8555f1a136",
  "general": "photo-1559757148-5c350d0d3c56",
  "pediatrics": "photo-1582719478250-c89cae4dc85b",
  "public health": "photo-1551190822-a9333d879b1f",
  "informatics": "photo-1519494026892-80bbd2d6fd0d",
  "dentistry": "photo-1582719471384-894fbb16e074",
  "rehabilitation": "photo-1576091160550-2173dba999ef",
  "psychiatry": "photo-1551601651-2a8555f1a136",
  "genomics": "photo-1587854692152-cbe660dbde88",
};

function getImageUrl(specialty: string): string {
  const photoId = specialtyImageMap[specialty.toLowerCase()] || specialtyImageMap["general"];
  return `https://images.unsplash.com/${photoId}?w=800`;
}

function fixImageUrls() {
  const jsonPath = path.join(process.cwd(), "scripts", "sample-datasets.json");
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`JSON file not found at: ${jsonPath}`);
    process.exit(1);
  }

  try {
    console.log("Reading sample-datasets.json...");
    const fileContent = fs.readFileSync(jsonPath, "utf-8");
    const datasets = JSON.parse(fileContent);

    console.log(`Found ${datasets.length} datasets\n`);
    
    let fixedCount = 0;
    let skippedCount = 0;

    for (let i = 0; i < datasets.length; i++) {
      const dataset = datasets[i];
      
      // Check if URL needs fixing
      if (dataset.cover_image_url && dataset.cover_image_url.includes("source.unsplash.com")) {
        const newUrl = getImageUrl(dataset.specialty);
        console.log(`[${i + 1}] Fixing: ${dataset.title}`);
        console.log(`    Old: ${dataset.cover_image_url}`);
        console.log(`    New: ${newUrl}`);
        dataset.cover_image_url = newUrl;
        fixedCount++;
      } else if (!dataset.cover_image_url) {
        // Add image URL if missing
        const newUrl = getImageUrl(dataset.specialty);
        console.log(`[${i + 1}] Adding missing URL for: ${dataset.title}`);
        console.log(`    New: ${newUrl}`);
        dataset.cover_image_url = newUrl;
        fixedCount++;
      } else {
        skippedCount++;
      }
    }

    // Write back to file
    console.log(`\nWriting fixed datasets back to file...`);
    fs.writeFileSync(jsonPath, JSON.stringify(datasets, null, 2), "utf-8");

    console.log(`\n${"=".repeat(50)}`);
    console.log(`✓ Fixed ${fixedCount} image URLs`);
    console.log(`→ Skipped ${skippedCount} datasets (already had valid URLs)`);
    console.log(`✓ File saved successfully!\n`);
    
    return { fixedCount, skippedCount };
  } catch (error) {
    console.error("Error fixing image URLs:", error);
    process.exit(1);
  }
}

fixImageUrls();

