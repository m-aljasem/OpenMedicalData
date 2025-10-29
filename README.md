# OMeD - Open Medical Datasets

A modern, production-ready, open-source web application that serves as a search engine and community platform for sharing links to real-world, open, and free medical datasets.

## Features

- 🔍 **Search & Browse**: Advanced search with specialty filtering
- 📊 **Dataset Management**: Submit, review, and manage medical datasets
- 👥 **User Profiles**: Customizable profiles with ORCID, LinkedIn, GitHub integration
- 💬 **Community Features**: Comments, upvotes, and download tracking
- 🔐 **Role-Based Access**: Superadmins, Admins, Moderators, and Users
- 🎨 **Modern UI**: Glassmorphism effects, responsive design, dark mode support

## Tech Stack

- **Frontend**: Next.js 16 with TypeScript
- **Styling**: TailwindCSS 4
- **Backend**: Supabase (Auth, Database, Storage)
- **Deployment**: Vercel (Frontend) + Supabase (Backend)

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd omedata
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_api_key
```

4. Set up the database:
- Go to your Supabase project dashboard
- Navigate to SQL Editor
- Run the schema from `lib/database/schema.sql`

5. (Optional) Seed the database with dummy data:
- See `SEEDING.md` for detailed instructions
- Run `npm run seed` after setting up `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`

6. Set up storage bucket:
- In Supabase, go to Storage
- Create a bucket named `dataset-covers`
- Set it to public

7. Run the development server:
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The application uses the following tables:
- `profiles`: User profile information
- `roles`: User role assignments
- `datasets`: Medical dataset metadata
- `comments`: Dataset comments
- `upvotes`: User upvotes for datasets
- `downloads`: Download tracking

See `lib/database/schema.sql` for the complete schema.

## User Roles

- **Superadmin**: Full platform control
- **Admin**: Technical/admin panel access
- **Moderator**: Approve/reject dataset submissions
- **User**: Submit datasets, comment, upvote
- **Guest**: Browse and search only

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Supabase Setup

- The database and authentication are handled by Supabase
- Make sure to configure Row Level Security policies (included in schema.sql)
- Set up storage buckets as mentioned in installation

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Developer

Developed by [Mohamad AlJasem](https://AlJasem.eu.org)
