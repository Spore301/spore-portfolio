# Deployment Guide

## Free Deployment Options

### Option 1: Vercel (Recommended - FREE)
Vercel is the best fit for this Next.js app with **no cost for hobby projects**.

**Why Vercel?**
- Free Next.js hosting with server-side rendering
- Free custom domain (with DNS)
- Free SSL/TLS
- Server Actions (required for `/api/admin/*` routes)
- Automatic builds from git
- Edge functions available

**Free Tier Limits:**
- 100 GB bandwidth/month (sufficient for portfolio)
- 100 GB storage
- Serverless functions (10s timeout)

### Option 2: Supabase Edge Functions (FREE)
If you want to host everything in Supabase:
- Use Supabase Edge Functions for the web app
- Free tier: 100k requests/month
- Runs on Deno runtime

### Option 3: Cloudflare Pages (FREE)
- Free static site hosting
- Free SSL/custom domain
- 100 GB bandwidth/month
- Global CDN

---

## Required Environment Variables (FREE for Supabase)

| Variable | Required | Cost |
|----------|----------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | FREE |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | FREE |
| `GEMINI_API_KEY` | For AI features | FREE tier (50 calls/min) |

**Supabase Free Tier:**
- 500 MB database storage
- 2 GB file storage (storage free)
- 1000 daily active users
- 2 GB bandwidth out

**Google Gemini Free Tier:**
- 15 requests per minute
- Sufficient for admin content generation

---

## Step-by-Step Deployment (Vercel - FREE)

### 1. Prepare Database
```bash
# Run on Supabase SQL Editor
# Copy contents of web/setup_db.sql
```

### 2. Create Supabase Auth User
```sql
-- In Supabase SQL Editor:
-- Create admin user (replace with your email)
select auth.signup('your-email@example.com', 'your-password');
```

### 3. Deploy to Vercel (FREE)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from web directory
cd web
vercel login
vercel --prod
```

### 4. Set Environment Variables in Vercel
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Enter your Supabase URL

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Enter your Supabase anon key

vercel env add GEMINI_API_KEY
# Enter your Gemini API key (optional)
```

### 5. Configure Custom Domain (FREE)
```bash
# In Vercel dashboard
# Add your domain and update DNS records
```

---

## Database Schema Summary

| Table | Purpose | Free Tier |
|-------|---------|-----------|
| `projects` | Portfolio projects | Included |
| `blogs` | Blog posts | Included |
| `testimonials` | Client testimonials | Included |
| `homepage_sections` | Homepage layout | Included |
| `contact_messages` | Contact form submissions | Included |

**Row Level Security (RLS):**
- Public read access for all tables
- Admin access via Supabase Auth

---

## Cost Breakdown (FULLY FREE)

| Service | Tier | Monthly Cost |
|---------|------|--------------|
| Supabase | Free | $0 |
| Vercel | Hobby | $0 |
| Gemini API | Free tier | $0 |
| Custom Domain | DNS-only | $0 (using Cloudflare free tier) |

**Total: $0/month**

---

## Verification Checklist

- [ ] Supabase database created and seeded
- [ ] Admin user created in Supabase Auth
- [ ] Environment variables set in Vercel
- [ ] Build succeeds: `npm run build`
- [ ] Test locally: `npm run start`
- [ ] Deploy: `vercel --prod`
- [ ] Test public routes
- [ ] Test admin routes with credentials
- [ ] Configure custom domain (optional)

---

## Troubleshooting

**Build fails with "missing environment variables"**
- Ensure `.env.local` exists in `web/` with required variables
- Or set variables in Vercel dashboard

**Admin routes return 401**
- Create user in Supabase Auth
- Verify Supabase URL and key are correct

**Pages not updating**
- Vercel auto-rebuilds on git push
- Use `vercel --prod` for manual rebuild
