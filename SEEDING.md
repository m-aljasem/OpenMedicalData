# Database Seeding Guide

This guide explains how to populate the OMeD database with dummy users and datasets.

## Method 1: Using the TypeScript Script (Recommended)

The automated script creates all users and datasets programmatically.

### Prerequisites

1. You need your Supabase **Service Role Key** (not the anon key) for admin operations
2. Add it to your `.env.local`:
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   ```

### Steps

1. Install dependencies (if not already done):
   ```bash
   npm install
   ```

2. Run the seeding script:
   ```bash
   npm run seed
   ```

This will:
- Create 10 users from different countries and affiliations
- Assign roles (1 superadmin, 2 moderators, 7 users)
- Create 30 medical datasets across all specialties
- Set realistic upvotes and download counts

**Default password for all demo users**: `Demo@Password123`

## Method 2: Manual SQL Insertion

If you prefer to use SQL directly or the script doesn't work, you can use the SQL file:

1. **Important**: You must first create the auth users manually in Supabase Dashboard (Auth → Users → Add User)
2. Copy the user IDs from the created users
3. Replace the UUIDs in `lib/database/seed.sql` with the actual user IDs
4. Run the SQL in Supabase SQL Editor

### Creating Users Manually

1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User" for each user
3. Use the email addresses from the seed.sql file
4. Copy each user's UUID
5. Update the seed.sql file with these UUIDs

## What Gets Created

### Users (10)

1. **Sarah Johnson** (USA) - Harvard Medical School - Superadmin
2. **David Chen** (UK) - Oxford University - Moderator
3. **Anna Mueller** (Germany) - Charité Berlin - Moderator
4. **Takashi Tanaka** (Japan) - University of Tokyo - User
5. **Emily Brown** (Canada) - University of Toronto - User
6. **James Wilson** (Australia) - University of Sydney - User
7. **Priya Sharma** (India) - AIIMS Delhi - User
8. **Pierre Martin** (France) - Sorbonne University - User
9. **Maria Silva** (Brazil) - University of São Paulo - User
10. **Thabo Mthembu** (South Africa) - University of Cape Town - User

### Datasets (30)

Covering specialties:
- **Cardiology**: 3 datasets (MIMIC-III, Chest X-Ray, ECG)
- **Neurology**: 4 datasets (ADNI, OpenNeuro, Epilepsy, Parkinson's)
- **Oncology**: 4 datasets (TCGA, Breast Cancer, Skin Cancer, Lung Cancer)
- **Ophthalmology**: 2 datasets (Diabetic Retinopathy, OCT)
- **General Medicine**: 4 datasets (Open-i, Clinical Trials, Medical Costs, COVID-19)
- **Pharmacology**: 3 datasets (DrugBank, ChEMBL, SIDER)
- **Genetics**: 3 datasets (1000 Genomes, ClinVar, gnomAD)
- **Pathology**: 3 datasets (Pathology Images, Blood Cells, Tissue Microarray)
- **Orthopedics**: 3 datasets (Knee Osteoarthritis, Fractures, Spine MRI)

**Status Distribution**:
- 23 datasets are **approved** (visible to all)
- 7 datasets are **pending** (awaiting moderator approval)

## After Seeding

1. Test the login with any user email (password: `Demo@Password123`)
2. Check the admin panel as a moderator (david.chen@oxford.ac.uk or anna.mueller@charite.de)
3. Approve pending datasets from the admin panel
4. Browse datasets on the homepage
5. Test search and filtering functionality

## Security Note

⚠️ **Important**: Change all user passwords before deploying to production!

The default password `Demo@Password123` is only for development/testing purposes.

