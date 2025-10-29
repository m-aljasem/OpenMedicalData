/**
 * Database Seeding Script
 * 
 * This script populates the database with dummy users and datasets.
 * 
 * Usage:
 * 1. Set up your .env.local with Supabase credentials
 * 2. Run: npx tsx scripts/seed-database.ts
 * 
 * Note: This script requires Supabase Admin API access for creating users.
 * For production, consider using Supabase Dashboard or a migration tool.
 */

import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

// You'll need to set these in your environment or pass as arguments
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ""; // Service role key for admin operations

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error(
    "Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your environment"
  );
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

interface UserData {
  email: string;
  password: string;
  name: string;
  affiliation: string;
  orcid?: string;
  linkedin?: string;
  github?: string;
  google_scholar?: string;
  cover_photo_url?: string;
  role: "superadmin" | "admin" | "moderator" | "user";
}

const users: UserData[] = [
  {
    email: "sarah.johnson@harvard.edu",
    password: "Demo@Password123",
    name: "Sarah Johnson",
    affiliation: "Harvard Medical School, Boston, USA",
    orcid: "0000-0002-1234-5678",
    linkedin: "https://linkedin.com/in/sarahjohnson",
    github: "https://github.com/sarahjohnson",
    google_scholar: "https://scholar.google.com/citations?user=abc123",
    cover_photo_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1600",
    role: "superadmin",
  },
  {
    email: "david.chen@oxford.ac.uk",
    password: "Demo@Password123",
    name: "David Chen",
    affiliation: "Oxford University, Oxford, UK",
    orcid: "0000-0003-2345-6789",
    linkedin: "https://linkedin.com/in/davidchen",
    github: "https://github.com/davidchen",
    google_scholar: "https://scholar.google.com/citations?user=def456",
    cover_photo_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1600",
    role: "moderator",
  },
  {
    email: "anna.mueller@charite.de",
    password: "Demo@Password123",
    name: "Anna Mueller",
    affiliation: "Charité - Universitätsmedizin Berlin, Germany",
    orcid: "0000-0004-3456-7890",
    linkedin: "https://linkedin.com/in/annamueller",
    github: "https://github.com/annamueller",
    google_scholar: "https://scholar.google.com/citations?user=ghi789",
    cover_photo_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1600",
    role: "moderator",
  },
  {
    email: "takashi.tanaka@u-tokyo.ac.jp",
    password: "Demo@Password123",
    name: "Takashi Tanaka",
    affiliation: "The University of Tokyo, Japan",
    orcid: "0000-0005-4567-8901",
    linkedin: "https://linkedin.com/in/takashitanaka",
    github: "https://github.com/takashitanaka",
    google_scholar: "https://scholar.google.com/citations?user=jkl012",
    cover_photo_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1600",
    role: "user",
  },
  {
    email: "emily.brown@utoronto.ca",
    password: "Demo@Password123",
    name: "Emily Brown",
    affiliation: "University of Toronto, Canada",
    orcid: "0000-0006-5678-9012",
    linkedin: "https://linkedin.com/in/emilybrown",
    github: "https://github.com/emilybrown",
    google_scholar: "https://scholar.google.com/citations?user=mno345",
    cover_photo_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1600",
    role: "user",
  },
  {
    email: "james.wilson@sydney.edu.au",
    password: "Demo@Password123",
    name: "James Wilson",
    affiliation: "University of Sydney, Australia",
    orcid: "0000-0007-6789-0123",
    linkedin: "https://linkedin.com/in/jameswilson",
    github: "https://github.com/jameswilson",
    google_scholar: "https://scholar.google.com/citations?user=pqr678",
    cover_photo_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=1600",
    role: "user",
  },
  {
    email: "priya.sharma@aiims.edu",
    password: "Demo@Password123",
    name: "Priya Sharma",
    affiliation: "All India Institute of Medical Sciences, New Delhi, India",
    orcid: "0000-0008-7890-1234",
    linkedin: "https://linkedin.com/in/priyasharma",
    github: "https://github.com/priyasharma",
    google_scholar: "https://scholar.google.com/citations?user=stu901",
    cover_photo_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1600",
    role: "user",
  },
  {
    email: "pierre.martin@sorbonne-universite.fr",
    password: "Demo@Password123",
    name: "Pierre Martin",
    affiliation: "Sorbonne University, Paris, France",
    orcid: "0000-0009-8901-2345",
    linkedin: "https://linkedin.com/in/pierremartin",
    github: "https://github.com/pierremartin",
    google_scholar: "https://scholar.google.com/citations?user=vwx234",
    cover_photo_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1600",
    role: "user",
  },
  {
    email: "maria.silva@usp.br",
    password: "Demo@Password123",
    name: "Maria Silva",
    affiliation: "University of São Paulo, Brazil",
    orcid: "0000-0010-9012-3456",
    linkedin: "https://linkedin.com/in/mariasilva",
    github: "https://github.com/mariasilva",
    google_scholar: "https://scholar.google.com/citations?user=yza567",
    cover_photo_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1600",
    role: "user",
  },
  {
    email: "thabo.mthembu@uct.ac.za",
    password: "Demo@Password123",
    name: "Thabo Mthembu",
    affiliation: "University of Cape Town, South Africa",
    orcid: "0000-0011-0123-4567",
    linkedin: "https://linkedin.com/in/thabomthembu",
    github: "https://github.com/thabomthembu",
    google_scholar: "https://scholar.google.com/citations?user=bcd890",
    cover_photo_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600",
    role: "user",
  },
];

async function createUser(userData: UserData) {
  let userId: string | null = null;
  let isNewUser = false;

  // Try to find existing user by email
  const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
  
  if (!listError && existingUsers) {
    const existingUser = existingUsers.users.find(u => u.email === userData.email);
    if (existingUser) {
      userId = existingUser.id;
      console.log(`→ User already exists: ${userData.name} (${userData.email})`);
    }
  }

  // Create auth user if it doesn't exist
  if (!userId) {
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: userData.email,
      password: userData.password,
      email_confirm: true,
    });

    if (authError) {
      // If user exists error, try to find them
      if (authError.message.includes("already been registered")) {
        const { data: retryUsers } = await supabase.auth.admin.listUsers();
        if (retryUsers) {
          const foundUser = retryUsers.users.find(u => u.email === userData.email);
          if (foundUser) {
            userId = foundUser.id;
            console.log(`→ User already exists: ${userData.name} (${userData.email})`);
          }
        }
      }
      
      if (!userId) {
        console.error(`Error creating auth user ${userData.email}:`, authError.message);
        return null;
      }
    } else if (authData?.user) {
      userId = authData.user.id;
      isNewUser = true;
    }
  }

  if (!userId) {
    console.error(`Failed to get/create user ${userData.email}`);
    return null;
  }

  // Upsert profile (update if exists, create if not)
  const { error: profileError } = await supabase.from("profiles").upsert({
    id: userId,
    email: userData.email,
    name: userData.name,
    affiliation: userData.affiliation,
    orcid: userData.orcid,
    linkedin: userData.linkedin,
    github: userData.github,
    google_scholar: userData.google_scholar,
    avatar_type: "gravatar",
    cover_photo_url: userData.cover_photo_url,
  }, {
    onConflict: 'id'
  });

  if (profileError) {
    console.error(`Error upserting profile for ${userData.email}:`, profileError.message);
  }

  // Upsert role (update if exists, create if not)
  const { error: roleError } = await supabase.from("roles").upsert({
    user_id: userId,
    role: userData.role,
  }, {
    onConflict: 'user_id'
  });

  if (roleError) {
    console.error(`Error upserting role for ${userData.email}:`, roleError.message);
  }

  if (isNewUser) {
    console.log(`✓ Created user: ${userData.name} (${userData.email})`);
  } else {
    console.log(`✓ Updated user: ${userData.name} (${userData.email})`);
  }
  
  return userId;
}

async function seedUsers() {
  console.log("Processing users...\n");
  const userIds: string[] = [];

  for (const user of users) {
    const userId = await createUser(user);
    if (userId) {
      userIds.push(userId);
    }
    // Small delay to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  console.log(`\n✓ Processed ${userIds.length} users\n`);
  return userIds;
}

interface DatasetData {
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

const datasets: DatasetData[] = [
  {
    title: "MIMIC-III Clinical Database",
    abstract:
      "MIMIC-III is a large, freely-available database comprising deidentified health-related data associated with over forty thousand patients who stayed in critical care units of the Beth Israel Deaconess Medical Center between 2001 and 2012.",
    doi: "10.1038/sdata.2016.35",
    tags: ["ICU", "critical care", "EHR", "patient monitoring", "vital signs"],
    specialty: "cardiology",
    dataset_link: "https://physionet.org/content/mimiciii/1.4/",
    cover_image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    sample_data: { patient_id: "12345", age: 65, gender: "M", diagnosis: "Atrial Fibrillation" },
    case_size: "40,000 patients",
    submitted_by_index: 0,
    status: "approved",
    upvotes_count: 234,
    monthly_downloads: 1250,
  },
  {
    title: "Chest X-Ray Images for Pneumonia Detection",
    abstract:
      "This dataset contains 5,863 X-Ray images (JPEG) in 2 folders (train/test). There are 2 classes: Pneumonia and Normal. Chest X-ray images (anterior-posterior) were selected from retrospective cohorts of pediatric patients.",
    tags: ["radiology", "chest X-ray", "pneumonia", "deep learning", "medical imaging"],
    specialty: "cardiology",
    dataset_link: "https://www.kaggle.com/datasets/paultimothymooney/chest-xray-pneumonia",
    cover_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    sample_data: { image_id: "img001", label: "Normal", path: "train/Normal/..." },
    case_size: "5,863 images",
    submitted_by_index: 1,
    status: "approved",
    upvotes_count: 189,
    monthly_downloads: 890,
  },
  {
    title: "ECG Arrhythmia Classification Dataset",
    abstract:
      "The MIT-BIH Arrhythmia Database contains 48 half-hour excerpts of two-channel ambulatory ECG recordings, obtained from 47 subjects studied by the BIH Arrhythmia Laboratory.",
    doi: "10.1109/TBME.1979.326318",
    tags: ["ECG", "arrhythmia", "cardiac", "signal processing", "electrocardiography"],
    specialty: "cardiology",
    dataset_link: "https://physionet.org/content/mitdb/1.0.0/",
    cover_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    sample_data: { signal: "0.123, 0.234, 0.345", hr: 72, rhythm: "Normal Sinus" },
    case_size: "48 recordings",
    submitted_by_index: 2,
    status: "approved",
    upvotes_count: 156,
    monthly_downloads: 720,
  },
  {
    title: "Alzheimer's Disease Neuroimaging Initiative (ADNI)",
    abstract:
      "ADNI is a longitudinal study designed to develop clinical, imaging, genetic, and biochemical biomarkers for the early detection and tracking of Alzheimer's disease.",
    tags: ["Alzheimer", "neuroimaging", "MRI", "PET", "dementia", "biomarkers"],
    specialty: "neurology",
    dataset_link: "https://adni.loni.usc.edu/",
    cover_image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
    sample_data: { subject_id: "ADNI001", age: 72, diagnosis: "MCI", mmse_score: 26 },
    case_size: "1,737 subjects",
    submitted_by_index: 3,
    status: "approved",
    upvotes_count: 278,
    monthly_downloads: 1450,
  },
  {
    title: "OpenNeuro: Brain Imaging Data Repository",
    abstract:
      "OpenNeuro is a free and open platform for sharing neuroimaging data from human brain imaging research studies. It provides access to publicly available brain imaging datasets.",
    tags: ["neuroimaging", "fMRI", "brain", "MRI", "neuroscience"],
    specialty: "neurology",
    dataset_link: "https://openneuro.org/",
    cover_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800",
    sample_data: { scan_id: "sub001", modality: "fMRI", voxel_size: "2x2x2mm" },
    case_size: "500+ datasets",
    submitted_by_index: 4,
    status: "approved",
    upvotes_count: 312,
    monthly_downloads: 2100,
  },
  {
    title: "Epileptic Seizure Recognition Dataset",
    abstract:
      "This dataset is a pre-processed and re-structured/reshaped version of a very commonly used dataset featuring epileptic seizure recognition. The dataset consists of 5 different folders, each with 100 files.",
    tags: ["epilepsy", "seizure", "EEG", "signal processing", "classification"],
    specialty: "neurology",
    dataset_link: "https://archive.ics.uci.edu/ml/datasets/Epileptic+Seizure+Recognition",
    cover_image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    sample_data: { segment: 1, label: 1, features: [0.123, 0.456] },
    case_size: "500 files",
    submitted_by_index: 5,
    status: "approved",
    upvotes_count: 145,
    monthly_downloads: 650,
  },
  {
    title: "Parkinson's Disease Progression Dataset",
    abstract:
      "This dataset contains longitudinal telemonitoring data from patients with Parkinson's disease. The data includes motor examination results, voice measurements, and time series data.",
    tags: ["Parkinson", "telemonitoring", "motor symptoms", "speech", "time series"],
    specialty: "neurology",
    dataset_link: "https://archive.ics.uci.edu/ml/datasets/Parkinsons+Telemonitoring",
    cover_image_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
    sample_data: { patient: "p001", jitter: 0.0078, shimmer: 0.0234 },
    case_size: "42 patients",
    submitted_by_index: 0,
    status: "pending",
    upvotes_count: 0,
    monthly_downloads: 0,
  },
  {
    title: "The Cancer Genome Atlas (TCGA)",
    abstract:
      "TCGA is a landmark cancer genomics program that molecularly characterized over 20,000 primary cancer and matched normal samples spanning 33 cancer types.",
    tags: ["cancer", "genomics", "tumor", "gene expression", "molecular"],
    specialty: "oncology",
    dataset_link: "https://www.cancer.gov/about-nci/organization/ccg/research/structural-genomics/tcga",
    cover_image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    sample_data: { sample_id: "TCGA-A1-A0SB", cancer_type: "BRCA", mutations: 156 },
    case_size: "20,000+ samples",
    submitted_by_index: 1,
    status: "approved",
    upvotes_count: 456,
    monthly_downloads: 3200,
  },
  {
    title: "Breast Cancer Wisconsin Diagnostic Dataset",
    abstract:
      "Features are computed from a digitized image of a fine needle aspirate (FNA) of a breast mass. They describe characteristics of the cell nuclei present in the image.",
    tags: ["breast cancer", "diagnosis", "cell nuclei", "histopathology"],
    specialty: "oncology",
    dataset_link: "https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)",
    cover_image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    sample_data: { id: 1, radius_mean: 17.99, texture_mean: 10.38, diagnosis: "M" },
    case_size: "569 cases",
    submitted_by_index: 2,
    status: "approved",
    upvotes_count: 198,
    monthly_downloads: 980,
  },
  {
    title: "Skin Cancer Detection Dataset",
    abstract:
      "This dataset contains images of benign and malignant skin lesions. The dataset consists of 1800 images of common pigmented skin lesions across 7 lesion types.",
    tags: ["skin cancer", "dermatology", "melanoma", "lesions", "classification"],
    specialty: "oncology",
    dataset_link: "https://www.kaggle.com/datasets/fanconic/skin-cancer-malignant-vs-benign",
    cover_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    sample_data: { image_id: "ISIC_001", label: "benign", lesion_type: "nevus" },
    case_size: "1,800 images",
    submitted_by_index: 3,
    status: "approved",
    upvotes_count: 234,
    monthly_downloads: 1120,
  },
  {
    title: "Lung Cancer Screening CT Scans",
    abstract:
      "A collection of low-dose CT scans from the Lung Image Database Consortium image collection (LIDC-IDRI). The dataset includes CT scans with radiologist annotations.",
    tags: ["lung cancer", "CT scan", "screening", "radiology", "nodules"],
    specialty: "oncology",
    dataset_link: "https://www.cancerimagingarchive.net/collection/lidc-idri/",
    cover_image_url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    sample_data: { scan_id: "LIDC-0001", nodule_count: 3, size_mm: 12.5 },
    case_size: "1,018 cases",
    submitted_by_index: 4,
    status: "pending",
    upvotes_count: 0,
    monthly_downloads: 0,
  },
  {
    title: "Diabetic Retinopathy Detection Dataset",
    abstract:
      "This dataset contains images of retinas taken using fundoscopy. The images are categorized into 5 levels based on the severity of diabetic retinopathy (DR).",
    tags: ["diabetic retinopathy", "retina", "fundoscopy", "eye", "diabetes"],
    specialty: "ophthalmology",
    dataset_link: "https://www.kaggle.com/datasets/tanlikesmath/diabetic-retinopathy-resized",
    cover_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800",
    sample_data: { image_id: "1_left", level: 0, severity: "No DR" },
    case_size: "35,000+ images",
    submitted_by_index: 5,
    status: "approved",
    upvotes_count: 267,
    monthly_downloads: 1380,
  },
  {
    title: "OCT Images for Retinal Diseases",
    abstract:
      "Optical Coherence Tomography (OCT) images of the retina for detection of choroidal neovascularization (CNV), diabetic macular edema (DME), and drusen.",
    tags: ["OCT", "retina", "macular degeneration", "eye", "imaging"],
    specialty: "ophthalmology",
    dataset_link: "https://www.kaggle.com/datasets/paultimothymooney/kermany2018",
    cover_image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    sample_data: { image_id: "CNV_0001", diagnosis: "CNV", age: 68 },
    case_size: "84,000 images",
    submitted_by_index: 6,
    status: "approved",
    upvotes_count: 189,
    monthly_downloads: 980,
  },
  {
    title: "Open-i: Open Access Biomedical Image Search Engine",
    abstract:
      "Open-i is an open-access biomedical image search engine that allows users to search for biomedical literature figures from the PubMed Central repository.",
    tags: ["medical images", "biomedical", "literature", "PubMed", "figures"],
    specialty: "general",
    dataset_link: "https://openi.nlm.nih.gov/",
    cover_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800",
    sample_data: { image_id: "PMC123456", caption: "X-ray showing...", pmc_id: "123456" },
    case_size: "7.5+ million images",
    submitted_by_index: 7,
    status: "approved",
    upvotes_count: 423,
    monthly_downloads: 2850,
  },
  {
    title: "Clinical Trials Data from ClinicalTrials.gov",
    abstract:
      "A comprehensive database of privately and publicly funded clinical studies conducted around the world. Data includes study protocols, results, and locations.",
    tags: ["clinical trials", "research", "drugs", "interventions", "outcomes"],
    specialty: "general",
    dataset_link: "https://clinicaltrials.gov/ct2/resources/download",
    cover_image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
    sample_data: { nct_id: "NCT00000001", condition: "Diabetes", phase: "Phase 3" },
    case_size: "400,000+ studies",
    submitted_by_index: 8,
    status: "approved",
    upvotes_count: 312,
    monthly_downloads: 1950,
  },
  {
    title: "Medical Cost Personal Dataset",
    abstract:
      "This dataset contains demographics, health indicators, and medical costs of individuals. Useful for understanding factors affecting healthcare costs.",
    tags: ["healthcare costs", "demographics", "insurance", "health indicators"],
    specialty: "general",
    dataset_link: "https://www.kaggle.com/datasets/mirichoi0218/insurance",
    cover_image_url: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800",
    sample_data: { age: 19, sex: "female", bmi: 27.9, charges: 16884.924 },
    case_size: "1,338 records",
    submitted_by_index: 9,
    status: "approved",
    upvotes_count: 145,
    monthly_downloads: 670,
  },
  {
    title: "COVID-19 Chest X-Ray Dataset",
    abstract:
      "A collection of chest X-ray images for COVID-19 positive cases, normal cases, and viral pneumonia cases. Useful for developing diagnostic models.",
    tags: ["COVID-19", "chest X-ray", "pneumonia", "pandemic", "diagnosis"],
    specialty: "general",
    dataset_link: "https://www.kaggle.com/datasets/tawsifurrahman/covid19-radiography-database",
    cover_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800",
    sample_data: { image_id: "COVID_001", label: "COVID-19", source: "GitHub" },
    case_size: "21,000+ images",
    submitted_by_index: 0,
    status: "pending",
    upvotes_count: 0,
    monthly_downloads: 0,
  },
  {
    title: "DrugBank Database",
    abstract:
      "DrugBank is a comprehensive, freely accessible, online database containing information on drugs and drug targets. It combines detailed drug data with comprehensive drug target information.",
    tags: ["drugs", "pharmacology", "targets", "interactions", "chemicals"],
    specialty: "pharmacology",
    dataset_link: "https://go.drugbank.com/",
    cover_image_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
    sample_data: { drug_id: "DB00001", name: "Lepirudin", type: "biotech" },
    case_size: "14,000+ drugs",
    submitted_by_index: 1,
    status: "approved",
    upvotes_count: 378,
    monthly_downloads: 2450,
  },
  {
    title: "ChEMBL Database",
    abstract:
      "ChEMBL is a manually curated database of bioactive molecules with drug-like properties. It brings together chemical, bioactivity and genomic data to aid translation of genomic information into effective new drugs.",
    tags: ["chemicals", "bioactivity", "drug discovery", "compounds", "medicinal chemistry"],
    specialty: "pharmacology",
    dataset_link: "https://www.ebi.ac.uk/chembl/",
    cover_image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    sample_data: { molecule_id: "CHEMBL1", pref_name: "LEPIRUDIN", max_phase: 4 },
    case_size: "2.3M compounds",
    submitted_by_index: 2,
    status: "approved",
    upvotes_count: 289,
    monthly_downloads: 1650,
  },
  {
    title: "Side Effect Resource (SIDER)",
    abstract:
      "SIDER contains information on marketed medicines and their recorded adverse drug reactions. The information is extracted from public documents and package inserts.",
    tags: ["side effects", "adverse reactions", "drug safety", "pharmacovigilance"],
    specialty: "pharmacology",
    dataset_link: "http://sideeffects.embl.de/",
    cover_image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
    sample_data: { drug_name: "aspirin", side_effect: "nausea", frequency: "common" },
    case_size: "1,430 drugs",
    submitted_by_index: 3,
    status: "approved",
    upvotes_count: 167,
    monthly_downloads: 890,
  },
  {
    title: "1000 Genomes Project",
    abstract:
      "The 1000 Genomes Project produced a catalogue of common human genetic variation, using openly consented samples from people who declared themselves to be healthy.",
    tags: ["genomics", "genetic variation", "SNPs", "population genetics", "human genome"],
    specialty: "genetics",
    dataset_link: "https://www.internationalgenome.org/",
    cover_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800",
    sample_data: { sample_id: "HG00096", population: "GBR", variants: 84600000 },
    case_size: "2,504 individuals",
    submitted_by_index: 4,
    status: "approved",
    upvotes_count: 445,
    monthly_downloads: 3120,
  },
  {
    title: "ClinVar Database",
    abstract:
      "ClinVar is a public archive of reports of the relationships among human variations and phenotypes, with supporting evidence. ClinVar facilitates access to and communication about the relationships asserted between human variation and observed health status.",
    tags: ["genetic variants", "clinical significance", "pathogenicity", "disease associations"],
    specialty: "genetics",
    dataset_link: "https://www.ncbi.nlm.nih.gov/clinvar/",
    cover_image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    sample_data: { variant_id: "12345", gene: "BRCA1", clinical_significance: "Pathogenic" },
    case_size: "1.3M variants",
    submitted_by_index: 5,
    status: "approved",
    upvotes_count: 334,
    monthly_downloads: 2100,
  },
  {
    title: "gnomAD: Genome Aggregation Database",
    abstract:
      "The Genome Aggregation Database (gnomAD) is a resource developed by an international coalition of investigators, with the goal of aggregating and harmonizing both exome and genome sequencing data from a wide variety of large-scale sequencing projects.",
    tags: ["genome", "exome", "allele frequency", "population genetics", "variants"],
    specialty: "genetics",
    dataset_link: "https://gnomad.broadinstitute.org/",
    cover_image_url: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800",
    sample_data: { variant: "chr1:12345:A:G", af: 0.0001, pop: "all" },
    case_size: "730,947 genomes",
    submitted_by_index: 6,
    status: "pending",
    upvotes_count: 0,
    monthly_downloads: 0,
  },
  {
    title: "Pathology Image Database",
    abstract:
      "A collection of histopathology images from various tissues and diseases. Includes annotations from pathologists and machine learning labels.",
    tags: ["histopathology", "tissue", "pathology", "biopsy", "cancer detection"],
    specialty: "pathology",
    dataset_link: "https://www.kaggle.com/datasets/paultimothymooney/pathology-dataset",
    cover_image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    sample_data: { image_id: "path001", tissue: "lung", diagnosis: "adenocarcinoma" },
    case_size: "10,000+ images",
    submitted_by_index: 7,
    status: "approved",
    upvotes_count: 198,
    monthly_downloads: 1120,
  },
  {
    title: "Blood Cell Classification Dataset",
    abstract:
      "This dataset contains 12,500 augmented images of blood cells (JPEG) with accompanying cell type labels (CSV). There are approximately 3,000 images for each of 4 different cell types grouped into 4 different folders.",
    tags: ["blood cells", "hematology", "classification", "microscopy", "complete blood count"],
    specialty: "pathology",
    dataset_link: "https://www.kaggle.com/datasets/paultimothymooney/blood-cell-images",
    cover_image_url: "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800",
    sample_data: { image_id: "blood_001", cell_type: "EOSINOPHIL", count: 1 },
    case_size: "12,500 images",
    submitted_by_index: 8,
    status: "approved",
    upvotes_count: 145,
    monthly_downloads: 780,
  },
  {
    title: "Tissue Microarray Dataset",
    abstract:
      "Digital pathology images from tissue microarrays representing various cancer types with immunohistochemistry staining patterns.",
    tags: ["tissue microarray", "cancer", "immunohistochemistry", "digital pathology"],
    specialty: "pathology",
    dataset_link: "https://www.kaggle.com/datasets/paultimothymooney/tissue-microarray",
    cover_image_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800",
    sample_data: { tma_id: "TMA001", tissue: "breast", stain: "HER2" },
    case_size: "5,000+ spots",
    submitted_by_index: 9,
    status: "pending",
    upvotes_count: 0,
    monthly_downloads: 0,
  },
  {
    title: "Knee Osteoarthritis Dataset from OAI",
    abstract:
      "The Osteoarthritis Initiative (OAI) is a multi-center, longitudinal, prospective observational study of knee osteoarthritis. Includes MRI images, X-rays, and clinical data.",
    tags: ["osteoarthritis", "knee", "MRI", "X-ray", "joint", "mobility"],
    specialty: "orthopedics",
    dataset_link: "https://nda.nih.gov/oai/",
    cover_image_url: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800",
    sample_data: { subject_id: "OAI001", kellgren_lawrence: 2, pain_score: 4 },
    case_size: "4,796 subjects",
    submitted_by_index: 0,
    status: "approved",
    upvotes_count: 267,
    monthly_downloads: 1450,
  },
  {
    title: "Bone Fracture Detection X-Ray Dataset",
    abstract:
      "A curated dataset of X-ray images for bone fracture detection. Includes annotated fractures across multiple bone types including wrist, ankle, and elbow.",
    tags: ["fractures", "X-ray", "bone", "trauma", "radiology"],
    specialty: "orthopedics",
    dataset_link: "https://www.kaggle.com/datasets/vuppalaadithyasairam/bone-fracture-detection-x-ray-dataset",
    cover_image_url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800",
    sample_data: { image_id: "fx001", bone_type: "wrist", fracture: true },
    case_size: "4,000+ images",
    submitted_by_index: 1,
    status: "approved",
    upvotes_count: 189,
    monthly_downloads: 980,
  },
  {
    title: "Spine MRI Dataset",
    abstract:
      "Magnetic resonance imaging dataset of the spine for detection of disc herniation, spinal stenosis, and other spinal conditions. Includes multi-planar views.",
    tags: ["spine", "MRI", "disc herniation", "spinal stenosis", "back pain"],
    specialty: "orthopedics",
    dataset_link: "https://www.kaggle.com/datasets/paultimothymooney/spine-mri-dataset",
    cover_image_url: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800",
    sample_data: { scan_id: "spine001", level: "L4-L5", finding: "herniation" },
    case_size: "2,500+ scans",
    submitted_by_index: 2,
    status: "pending",
    upvotes_count: 0,
    monthly_downloads: 0,
  },
];

async function seedDatasets(userIds: string[]) {
  console.log("Creating datasets...\n");

  let successCount = 0;
  let skippedCount = 0;
  
  for (const dataset of datasets) {
    const submittedBy = userIds[dataset.submitted_by_index];
    if (!submittedBy) {
      console.error(`Invalid user index for dataset: ${dataset.title}`);
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
      continue;
    }

    if (existing && existing.length > 0) {
      console.log(`→ Dataset already exists: ${dataset.title}`);
      skippedCount++;
      continue;
    }

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
      console.error(`Error creating dataset ${dataset.title}:`, error.message);
    } else {
      console.log(`✓ Created dataset: ${dataset.title}`);
      successCount++;
    }
  }

  console.log(`\n✓ Created ${successCount} datasets${skippedCount > 0 ? `, skipped ${skippedCount} existing` : ''}\n`);
}

async function main() {
  console.log("Starting database seeding...\n");
  console.log("=".repeat(50));

  try {
    const userIds = await seedUsers();
    if (userIds.length === 0) {
      console.error("No users were created. Cannot proceed with datasets.");
      process.exit(1);
    }

    await seedDatasets(userIds);

    console.log("=".repeat(50));
    console.log("\n✓ Seeding completed successfully!");
    console.log("\nNote: All users have password: Demo@Password123");
    console.log("Please change passwords after first login in production!\n");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  }
}

main();

