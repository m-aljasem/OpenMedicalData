# Deployment Guide

This guide will walk you through deploying OMeD (Open Medical Datasets) to production.

## Prerequisites

- ✅ Supabase project already set up (you have your URL and keys)
- ✅ Database schema executed in Supabase SQL Editor
- ✅ GitHub account (for version control and Vercel integration)
- ✅ Vercel account (free tier works fine)

## Deployment Steps

### 1. Prepare Your Repository

First, make sure your code is committed to a Git repository:

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit your changes
git commit -m "Initial commit"

# Create a repository on GitHub and push
git remote add origin https://github.com/yourusername/omedata.git
git branch -M main
git push -u origin main
```

### 2. Complete Supabase Setup

Before deploying, ensure your Supabase project is fully configured:

#### 2.1 Database Schema
- ✅ Already done if you ran `lib/database/schema.sql` in SQL Editor

#### 2.2 Storage Bucket
1. Go to your Supabase Dashboard → **Storage**
2. Click **New bucket**
3. Name it: `dataset-covers`
4. Set to **Public bucket**
5. Click **Create bucket**

#### 2.3 (Optional) Seed Database
If you want sample data:
```bash
npm run seed
```

### 3. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Sign up/Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click **Add New** → **Project**
   - Select your `omedata` repository
   - Click **Import**

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Add Environment Variables**
   
   Click **Environment Variables** and add:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | `https://ughawsxkzqzilbhzsbph.supabase.co` | Production, Preview, Development |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your anon key from Supabase | Production, Preview, Development |
   | `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY` | Your Unsplash API key (optional) | Production, Preview, Development |
   
   **To get Unsplash API key** (optional but recommended):
   - Sign up at [unsplash.com/developers](https://unsplash.com/developers)
   - Create a new application
   - Copy the Access Key
   
   ⚠️ **Important**: The `SUPABASE_SERVICE_ROLE_KEY` should NOT be added to Vercel (it's only for local seeding scripts).

5. **Deploy**
   - Click **Deploy**
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

#### Option B: Deploy via CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts to:
   - Link to existing project or create new
   - Set up environment variables when prompted

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### 4. Post-Deployment Configuration

#### 4.1 Update Supabase Auth Settings

1. Go to Supabase Dashboard → **Authentication** → **URL Configuration**
2. Add your Vercel URL to **Site URL**: `https://your-project.vercel.app`
3. Add to **Redirect URLs**:
   ```
   https://your-project.vercel.app/**
   https://your-project.vercel.app/auth/callback
   ```

#### 4.2 Custom Domain (Optional)

1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your custom domain
3. Update Supabase redirect URLs with your custom domain

### 5. Verify Deployment

After deployment, verify everything works:

1. ✅ Visit your live URL
2. ✅ Try signing up a new user
3. ✅ Check if you can view datasets
4. ✅ Test submitting a dataset (if logged in)
5. ✅ Verify storage bucket is accessible

### 6. Monitoring & Maintenance

#### View Logs
- Vercel Dashboard → **Deployments** → Click on deployment → **Functions** tab

#### View Analytics
- Vercel Dashboard → **Analytics** tab (requires Pro plan for detailed analytics)

#### Database Monitoring
- Supabase Dashboard → **Logs** → Check for errors

## Environment Variables Reference

### Required Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Optional Variables

```env
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_key_here
```

### Development Only (Never commit to Vercel)

```env
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

## Troubleshooting

### Build Errors

**Error: Module not found**
- Ensure all dependencies are in `package.json`
- Run `npm install` locally to verify

**Error: Environment variable missing**
- Check all required variables are set in Vercel
- Redeploy after adding variables

### Runtime Errors

**Auth not working**
- Verify redirect URLs in Supabase match your Vercel domain
- Check environment variables are set correctly

**Storage not accessible**
- Verify `dataset-covers` bucket exists and is public
- Check RLS policies allow public access

**Database errors**
- Verify schema is executed
- Check Supabase project is active (not paused)

### Common Issues

**"Could not find the table 'public.profiles'"**
- Solution: Run `lib/database/schema.sql` in Supabase SQL Editor

**Images not loading**
- Check Unsplash API key is set (optional, won't break app)
- Verify storage bucket is configured

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

## Security Checklist

Before going live:

- [ ] Environment variables are set in Vercel (not in code)
- [ ] Service Role Key is NOT in Vercel (only in local `.env.local`)
- [ ] Supabase RLS policies are properly configured
- [ ] Redirect URLs are restricted to your domain
- [ ] Storage bucket permissions are appropriate
- [ ] All user passwords are changed from defaults (if seeded)

---

**Need Help?** Open an issue on GitHub or check the project README.

