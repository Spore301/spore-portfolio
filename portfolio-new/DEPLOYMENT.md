# Deployment Plan

A complete free-tier deployment strategy for your portfolio monorepo.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Vercel (Free)                        │
│  ┌─────────────────────┐      ┌─────────────────────┐       │
│  │   web (Portfolio)   │      │   cms (Admin)       │       │
│  │   nextjs-15.2.0     │      │   nextjs-16.1.6     │       │
│  │   your-domain.com   │      │   admin.your-domain │       │
│  └──────────┬──────────┘      └──────────┬──────────┘       │
└─────────────┼────────────────────────────┼─────────────────┘
              │                            │
              └────────────┬───────────────┘
                           │
              ┌────────────▼────────────┐
              │    Supabase (Free)      │
              │  - PostgreSQL Database  │
              │  - Row Level Security   │
              │  - Auth                 │
              │  - Storage (optional)   │
              └─────────────────────────┘
```

## Free Tier Limits

| Service | Free Tier Limits | Your Usage |
|---------|------------------|------------|
| **Vercel** | 100GB bandwidth, 6M function invocations/mo | ✅ Portfolio sites are lightweight |
| **Supabase** | 500MB DB, 2GB file storage, 5GB bandwidth/mo | ✅ Plenty for portfolio |
| **Vercel Postgres** | 60-day trial, then $0.6/mo | ❌ Use Supabase instead |

---

## Phase 1: Supabase Setup (Database)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose organization → Set project name (e.g., "portfolio-db")
4. Select region (choose closest to you: `us-east-1`, `ap-south-1`, etc.)
5. Choose "Free tier"
6. Wait for database provisioning (~2 minutes)

### 1.2 Get Connection Credentials

In your Supabase project dashboard:

1. Go to **Project Settings** → **API**
2. Copy these values:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` API key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. Go to **Project Settings** → **Data API** → Copy `service_role` key (keep this secret!)
   - This is for admin operations if needed

### 1.3 Initialize Database Schema

In Supabase Dashboard → **SQL Editor** → **New query**:

```sql
-- Run the contents of web/setup_db.sql here
-- This creates: projects, blogs, testimonials, homepage_sections tables
-- Plus RLS policies for public read + authenticated write
```

Or use Supabase CLI (optional):
```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase login
supabase link --project-ref your-project-ref

# Push schema (if you have migrations)
supabase db push
```

---

## Phase 2: Vercel Setup (Frontend)

### 2.1 Deploy the `web` App (Portfolio)

#### Option A: Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to web app
cd /Users/debarghabandyopadhyay/Dev/spore-portfolio/portfolio-new/web

# Login to Vercel
vercel login

# Deploy (follow prompts)
vercel

# Configure as production
vercel --prod
```

#### Option B: Git Integration (Recommended for CI/CD)

1. Push your repo to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com) → "Add New Project"
3. Import your repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `web`
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)

5. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   GEMINI_API_KEY=your_gemini_key
   ```

6. Click Deploy

### 2.2 Deploy the `cms` App (Optional - Legacy)

Since `cms` is legacy and `web/src/app/admin` has the active admin features, you can skip this. But if you want it:

```bash
cd /Users/debarghabandyopadhyay/Dev/spore-portfolio/portfolio-new/cms

# Deploy as separate project
vercel

# Set same environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**Note**: If using both, deploy `cms` to a subdomain like `admin.yourdomain.com`.

---

## Phase 3: Environment Variables

### Required Variables

| Variable | Source | App | Description |
|----------|--------|-----|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase Dashboard → API | web, cms | Database URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase Dashboard → API | web, cms | Public API key |
| `GEMINI_API_KEY` | Google AI Studio | web | AI content generation |

### Setting in Vercel Dashboard

1. Go to your project → **Settings** → **Environment Variables**
2. Add each variable
3. For `NEXT_PUBLIC_*` variables, they are exposed to browser (required for Supabase client)

### Local Development

Keep using `.env.local` files (already in `.gitignore`):

```bash
# web/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
GEMINI_API_KEY=AI...
```

---

## Phase 4: Domain Configuration (Optional)

### Custom Domain on Vercel (Free)

1. Buy domain from any registrar (Namecheap, Cloudflare, etc.)
2. In Vercel Dashboard → **Domains**
3. Add your domain
4. Follow DNS configuration instructions:
   - Add `A` record pointing to Vercel IPs
   - Or use Nameservers delegation

### Free Subdomain Options

If you don't want to buy a domain:
- `yourname.vercel.app` (automatically provided)
- `yourname.github.io` (if using GitHub Pages for static parts)

---

## Phase 5: Monorepo Configuration

### Root-level Configuration (Optional)

If you want to manage both apps from root, create:

```json
// package.json (root)
{
  "name": "portfolio-monorepo",
  "private": true,
  "workspaces": ["web", "cms"],
  "scripts": {
    "web:dev": "cd web && npm run dev",
    "web:build": "cd web && npm run build",
    "cms:dev": "cd cms && npm run dev",
    "cms:build": "cd cms && npm run build",
    "install:all": "npm install && cd web && npm install && cd ../cms && npm install"
  }
}
```

### Vercel Monorepo Settings

For each Vercel project, set:
- **Root Directory**: `web` or `cms`
- **Install Command**: `npm install` (runs in root directory)

Vercel automatically detects the build settings from `package.json`.

---

## Phase 6: Post-Deployment Checklist

### Verify Database Connection

1. Visit your deployed site
2. Check browser console for Supabase connection errors
3. Test a page that fetches data (e.g., projects list)

### Verify Admin Access

1. Navigate to `/admin/login`
2. Sign up/in with Supabase Auth
3. Verify you can access admin dashboard

### Test AI Features (if using)

1. Go to `/admin/projects/new`
2. Try the "Generate with AI" feature
3. Verify Gemini API key is working

---

## Phase 7: Optimization & Monitoring

### Enable Vercel Analytics (Free)

1. In Vercel Dashboard → **Analytics**
2. Enable Web Analytics
3. Add script to `web/src/app/layout.tsx` if not auto-injected

### Speed Insights

1. Vercel Dashboard → **Speed Insights**
2. Enable for performance monitoring

### Supabase Monitoring

1. Supabase Dashboard → **Reports**
2. Monitor database usage (stay under 500MB free tier)

---

## Cost Summary (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Vercel (Hobby) | $0 | 100GB bandwidth, 6M function calls |
| Supabase (Free) | $0 | 500MB DB, 2GB storage, 5GB bandwidth |
| Custom Domain | $10-15/yr | Optional (can use .vercel.app free) |
| **Total** | **$0** | With free subdomain |

---

## Troubleshooting

### Build Failures

**Error**: `Module not found` or `Cannot resolve`
```bash
# Clear node_modules and reinstall
rm -rf web/node_modules web/package-lock.json
cd web && npm install
```

**Error**: `Tailwind CSS v4` issues
```bash
# Ensure correct Tailwind v4 setup
cd web && npm install tailwindcss@^4 @tailwindcss/postcss@^4
```

### Database Connection Issues

**Error**: `Failed to fetch` or CORS errors
- Verify `NEXT_PUBLIC_SUPABASE_URL` is correct
- Check Supabase Dashboard → **API** → **URL configuration**
- Ensure RLS policies allow public read

**Error**: `JWT expired` on admin
- Check Supabase Auth settings
- Verify `NEXT_PUBLIC_SUPABASE_ANON_KEY` is current (keys rotate)

### Environment Variables Not Loading

- Vercel redeploy required after env var changes
- Check spelling of variable names
- Ensure `NEXT_PUBLIC_` prefix for client-side variables

---

## Alternative Deployment Options

### Option: Netlify (Instead of Vercel)

Similar process:
1. Connect GitHub repo to Netlify
2. Set build command: `cd web && npm run build`
3. Set publish directory: `web/dist` or `web/.next`
4. Add environment variables

**Note**: Vercel has better Next.js App Router support.

### Option: Railway (Full-stack)

Railway can host both Next.js + PostgreSQL:
- More complex setup
- $5/mo credit (may cover small usage)
- Good for learning containerization

### Option: Cloudflare Pages

- Good for static export
- Requires `output: 'export'` in `next.config.js`
- Limited dynamic functionality

---

## Quick Start Commands

```bash
# 1. Deploy web app
cd web
vercel --prod

# 2. Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
vercel env add GEMINI_API_KEY

# 3. Redeploy with env vars
vercel --prod

# 4. Open deployed site
vercel open
```

---

## Security Checklist

- [ ] `GEMINI_API_KEY` is NOT prefixed with `NEXT_PUBLIC_` (keep server-side)
- [ ] Supabase RLS policies are enabled
- [ ] Admin routes protected by middleware (`web/src/middleware.ts`)
- [ ] No `.env.local` files committed to git
- [ ] Supabase `service_role` key never exposed to frontend

---

## Next Steps

1. **Deploy the web app first** - It's your main portfolio
2. **Skip cms deployment** - Use `/admin` in web instead (already built-in)
3. **Set up custom domain** once you're happy with the deployment
4. **Enable analytics** to track portfolio visitors

Your portfolio will be live at: `https://your-project.vercel.app`
