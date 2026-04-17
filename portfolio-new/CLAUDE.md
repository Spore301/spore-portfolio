# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a portfolio website monorepo with two Next.js applications:

- **`web/`** - Main portfolio website (Next.js 15.2.4, React 19.2.3) - The public-facing portfolio
- **`cms/`** - Content Management System (Next.js 16.2.0, React 19.2.3) - Legacy app; most admin features now in `web/src/app/admin`

Both apps share the same Supabase backend but are independent with separate `package.json` and `node_modules`.

## Development Commands

Each app must be run from its own directory:

```bash
cd web    # or cd cms

npm install
npm run dev          # web: localhost:3000, cms: localhost:3001
npm run build
npm run start
npm run lint         # ESLint 9 with flat config
```

## Tech Stack

- **Framework**: Next.js App Router
- **React**: 19.2.3
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS v4 with CSS-based configuration
- **UI**: shadcn/ui with base-nova style, `@base-ui/react` primitives
- **Database**: Supabase (PostgreSQL) with RLS policies
- **Auth**: Supabase Auth via `@supabase/ssr`
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **AI**: Google GenAI (Gemini) for content generation

## Architecture

### Supabase Client Pattern

The `web` app has three Supabase client configurations in `src/lib/supabase/`:

1. **`server.ts`** - Server Components and Server Actions
   ```typescript
   import { createClient } from '@/lib/supabase/server'
   ```

2. **`client.ts`** - Client Components (uses `@supabase/ssr`)
   ```typescript
   import { createClient } from '@/lib/supabase/client'
   ```

3. **`middleware.ts`** - Next.js middleware for auth session management

### Database Schema

Key tables (see `web/setup_db.sql` for full schema):

- **`projects`** - Portfolio projects with rich content (hero, problem, idea, architecture, design decisions, interface, prototype, impact, learnings, next_steps)
- **`blogs`** - Blog posts with markdown content and `content_blocks` JSONB
- **`testimonials`** - Client testimonials with visibility controls
- **`homepage_sections`** - Configurable homepage sections (hero, experience, testimonials, projects, blogs) with display_order and visibility

RLS Policies:
- Public read access for all tables
- Full access for authenticated users (admin)

### Admin Architecture

The `web` app includes an admin panel at `/admin`:

- **Middleware protection** (`src/middleware.ts`) - Redirects unauthenticated users to `/admin/login`
- **Routes**:
  - `/admin` - Projects list
  - `/admin/projects/new` - Create project
  - `/admin/projects/[slug]` - Edit project
  - `/admin/blogs` - Blog management
  - `/admin/testimonials` - Testimonial management
  - `/admin/sections` - Homepage section visibility/order
- **API Routes** (`src/app/api/admin/**`): RESTful endpoints for CRUD
- **Admin lib modules** (`src/lib/admin-*.ts`): Server-side data access using the server Supabase client

### Styling (Tailwind v4)

- No `tailwind.config.js` - configuration is CSS-based in `src/app/globals.css`
- Theme variables defined in `@theme` blocks using CSS custom properties
- Colors use OKLCH format
- Custom animations defined in `@theme` (e.g., `animate-marquee`)
- shadcn components use `tailwind-merge` and `clsx` via `cn()` utility

### Content Blocks

Projects and blogs use a block-based content system stored as JSONB:

- `content_blocks` array with typed blocks (text, image, metrics, etc.)
- `BlockRenderer` (`src/components/BlockRenderer.tsx`) for display
- `BlockEditor` (`src/components/admin/BlockEditor.tsx`) for editing

### AI Content Generation

The `/api/admin/projects/generate` endpoint uses Google Gemini to parse markdown project descriptions into structured project data matching the database schema.

## Key Files

- `web/setup_db.sql` - Database schema initialization
- `web/components.json` - shadcn/ui configuration
- `web/postcss.config.mjs` - Tailwind v4 PostCSS configuration
- `web/src/middleware.ts` - Auth middleware for admin routes
- `web/src/app/globals.css` - Tailwind v4 theme and global styles

## Environment Variables

Both apps require:
```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

`web` app additionally requires:
```bash
GEMINI_API_KEY=       # For AI content generation
```

## Port Configuration

- `web` dev server: localhost:3000
- `cms` dev server: localhost:3001 (configured in package.json)

## Notes

- The `cms` app is legacy; active development happens in `web/src/app/admin`
- Pages use `export const revalidate = 0` for fresh database reads
- Project data uses snake_case in DB, camelCase in TypeScript interfaces
