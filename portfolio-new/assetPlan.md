# Portfolio Asset & Animation Plan

**Project:** Debargha Portfolio Website  
**Date:** April 2026  
**Goal:** Minimal, tasteful visual assets and clean, purposeful animations

---

## Design Philosophy

- **Less is More:** Every asset must earn its place
- **Purposeful Motion:** Animations guide attention, never distract
- **Consistent Language:** Unified easing, timing, and visual vocabulary
- **Performance First:** Lightweight assets, GPU-accelerated animations

---

## Section 1: Global Assets

### 1.1 Navigation
**Current State:** Clean text-based navbar with underline hover
**Asset Needs:** NONE - Keep minimal as-is

**Animation Specifications:**
| Element | Animation | Trigger | Easing | Duration |
|---------|-----------|---------|--------|----------|
| Logo underline | width: 0 → 100% | hover | ease-out-expo | 300ms |
| Nav links | opacity: 0.6 → 1 | hover | ease-out-quart | 200ms |
| Navbar background | blur + bg opacity | scroll > 50px | ease-out-quart | 300ms |
| Mobile menu | slide + fade | toggle | ease-out-expo | 500ms |

**Enhancement:** Add subtle magnetic hover effect on logo (CSS transform on :hover, not JS mousemove tracking for performance)

---

### 1.2 Footer
**Current State:** Dark section with CTA button, grid layout
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `footer_pattern.svg` | SVG Pattern | `/public/assets/` | Subtle dot grid pattern, 5% opacity white on dark |
| `noise_texture.png` | PNG Overlay | `/public/assets/` | 200x200 seamless noise texture, 3% opacity |

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| CTA Button | scale: 1 → 1.02 + icon translate | hover | Subtle lift with arrow movement |
| Social icons | translateY: -4px | hover | Bounce-up effect |
| "Hire Me" circle | scale pulse subtle | on load | One-time 1 → 1.05 → 1 |
| Footer columns | stagger fade-up | in view | 100ms stagger between columns |

---

## Section 2: Homepage Assets

### 2.1 Hero Section
**Current State:** Large typography with fade-up text animation
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `hero_shape_01.svg` | SVG Illustration | `/public/assets/` | Abstract geometric shape, black stroke, minimal lines |
| `hero_gradient_blob.svg` | SVG | `/public/assets/` | Soft gradient blob for background depth |

**Animation Specifications:**
| Element | Animation | Trigger | Easing | Duration | Delay |
|---------|-----------|---------|--------|----------|-------|
| "Hello! I'm Debargha." | fadeUp: y: 40 → 0, opacity: 0 → 1 | page load | ease-out-expo | 800ms | 0ms |
| Headline lines | split-text reveal, y: 50 → 0 | page load | ease-out-expo | 1000ms | 100ms stagger |
| "visual design" | color shift: gray-400 → accent color | page load | ease-out-quart | 600ms | 800ms |
| CTA Button | fadeUp | page load | ease-out-expo | 600ms | 400ms |
| Description text | fadeUp | page load | ease-out-expo | 600ms | 500ms |
| Hero shape | slow float: y: 0 → -20 → 0 | continuous | ease-in-out | 8000ms | infinite |
| Gradient blob | scale pulse: 1 → 1.1 → 1 | continuous | ease-in-out | 12000ms | infinite |

**Enhancement - Text Scramble Effect:**
- On hover over "visual design" text: scramble characters briefly then settle
- Use only for this interactive element, sparingly

---

### 2.2 Stats Section
**Current State:** Three large numbers with border-left accents
**Asset Needs:** NONE - Keep typography-focused

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Border lines | height: 0 → 100% | in view | Draw from bottom, 600ms |
| Numbers | countUp: 0 → value | in view | 2s duration, easeOutExpo |
| Stat labels | fadeUp | in view | 400ms, 200ms after numbers |
| Section | stagger reveal | in view | 150ms delay between each stat |

**Enhancement:** Add subtle number "rolling" effect during count-up (like slot machine)

---

### 2.3 Tools Marquee
**Current State:** Infinite scrolling tool icons
**Asset Needs:** NONE - Using devicon CDN (current approach is good)

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Marquee | translateX: 0 → -50% | continuous | 30s linear infinite |
| Individual tool cards | scale: 1 → 1.02 | hover | Subtle lift, 300ms |
| Tool icons | rotate: 0 → 5deg | hover | Playful tilt |
| Gradient masks | opacity fade | always | Left/right edge fade (existing) |

**Enhancement:** Pause marquee on hover (already implemented with hover:animation-paused)

---

### 2.4 Services Section
**Current State:** 4 service cards in grid, hover flips to dark theme
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `service_icon_pm.svg` | Icon | `/public/assets/` | Minimal line icon for Product Management |
| `service_icon_strategy.svg` | Icon | `/public/assets/` | Minimal line icon for Product Strategy |
| `service_icon_analysis.svg` | Icon | `/public/assets/` | Minimal line icon for Business Analysis |
| `service_icon_design.svg` | Icon | `/public/assets/` | Minimal line icon for UI/UX Design |
| `card_hover_circle.svg` | SVG | `/public/assets/` | Concentric circles that appear on hover (already referenced in code) |

**Animation Specifications:**
| Element | Animation | Trigger | Easing | Duration |
|---------|-----------|---------|--------|----------|
| Service cards | background: white → #111 | hover | ease-out-quart | 300ms |
| Card text | color transition | hover | ease-out-quart | 300ms |
| Concentric circles | scale: 0 → 1 + opacity: 0 → 1 | hover | ease-out-expo | 500ms |
| Arrow icon | translate: (0,0) → (4px, -4px) + rotate: 0 → -45deg | hover | ease-out-expo | 300ms |
| Horizontal line | width expansion | hover | ease-out-quart | 300ms |
| Cards container | stagger fadeUp | in view | 100ms stagger, ease-out-expo |

**Card Dialog Animation:**
- Open: scale from 0.95 + fade, ease-out-expo, 400ms
- Close: scale to 0.98 + fade, ease-in-quart, 300ms
- Backdrop: opacity 0 → 0.5, fade only

---

### 2.5 Experience Section
**Current State:** Timeline-style list with hover background
**Asset Needs:** NONE - Keep minimal

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Section header | fadeUp | in view | 600ms |
| Experience rows | slideIn from left | in view | 100ms stagger, x: -30 → 0 |
| Row background | opacity: 0 → 1 | hover | Subtle gray-200/50 fill |
| Year text | scale: 1 → 1.02 | hover | Subtle emphasis |
| Border lines | width: 0 → 100% | in view | Draw animation, left to right |

---

### 2.6 Testimonials Section
**Current State:** Carousel with 3 visible cards
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `quote_mark.svg` | Icon | `/public/assets/` | Large decorative quote mark, light gray |

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Section header | fadeUp | in view | 600ms |
| Testimonial cards | fadeUp + stagger | in view | 150ms stagger, y: 40 → 0 |
| Navigation buttons | scale: 1 → 0.95 | active click | Press feedback |
| Carousel transition | fade + slideX | pagination | 500ms ease-out-expo |
| Quote marks | opacity: 0 → 1 | in view | Delayed fade, 400ms |

**Avatar Enhancement:**
- Subtle scale on hover: 1 → 1.05
- Optional: colored ring on hover (matches category color)

---

### 2.7 Contact Section
**Current State:** Dark section with form, gradient blobs
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `hero_bg.png` | Existing | `/public/assets/` | Keep - texture overlay |
| `abstract_shape.png` | Existing | `/public/assets/` | Keep - decorative shape |
| `contact_pattern.svg` | SVG | `/public/assets/` | Subtle grid pattern overlay |

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Background blobs | slow float + scale pulse | continuous | 15s infinite, subtle |
| Section content | fadeUp | in view | 600ms, 100ms stagger |
| Form card | slideIn from right | in view | x: 40 → 0, 800ms |
| Form inputs | border glow | focus | ring: white/20, 200ms |
| Submit button | scale + icon translate | hover | Arrow moves up-right |
| Success message | fadeUp + checkmark draw | on success | Icon stroke draws in |
| Error shake | translateX: -5px → 5px → 0 | on error | 300ms, 3 iterations |

**Input Micro-interactions:**
- Label float animation on focus (if floating labels added)
- Border color transition: white/10 → white/30

---

### 2.8 Selected Works / Projects Grid
**Current State:** Grid with project cards, placeholder thumbnails
**Asset Needs:** Abstract generative-style visuals for each project card

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `projects/project_01.svg` | Abstract Art | `/public/assets/projects/` | Geometric composition - overlapping circles, arc sections, subtle gradients |
| `projects/project_02.svg` | Abstract Art | `/public/assets/projects/` | Linear composition - intersecting lines, grid fragments, minimal nodes |
| `projects/project_03.svg` | Abstract Art | `/public/assets/projects/` | Organic shapes - flowing curves, soft blobs, asymmetric balance |
| `projects/project_04.svg` | Abstract Art | `/public/assets/projects/` | Architectural - angular blocks, perspective lines, structural elements |
| `projects/project_05.svg` | Abstract Art | `/public/assets/projects/` | Radial composition - concentric elements, rotational symmetry, precise |
| `projects/project_06.svg` | Abstract Art | `/public/assets/projects/` | Fragmented - broken shapes, negative space, dynamic tension |

**Abstract Asset Design Guidelines:**
- **Style:** Brutalist minimalism meets generative art
- **Color:** Monochromatic black (#000000) at 8-15% opacity on white background
- **Format:** SVG with clean paths, no bitmaps
- **Complexity:** 5-15 distinct elements per composition
- **Treatment:** Should feel like architectural sketches, wireframes, or system diagrams
- **Common Motifs:** Grid fragments, circular nodes, connecting lines, geometric shapes, flow arrows

**Per-Card Abstract Visual Treatment:**
Each project card gets a unique abstract composition that hints at the project type:
- **UI/UX Projects:** Interface fragments, component outlines, grid systems
- **Strategy Projects:** Flow diagrams, node connections, pathway visualizations
- **Development Projects:** Code-like structures, modular blocks, system layers

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Section title | slideIn from left | in view | x: -30 → 0, 800ms |
| Project cards | fadeUp + stagger | in view | 100ms stagger |
| Card hover | translateY: -4px + shadow increase | hover | 500ms ease-out-expo |
| Abstract artwork | scale: 1 → 1.03 + subtle rotate | hover | 700ms ease-out-expo, ±2deg rotation |
| Abstract opacity | 0.08 → 0.15 | hover | Fade in slightly more |
| Arrow reveal | translateY: -8px → 0 + opacity: 0 → 1 | hover | 300ms |
| Category badge | subtle pulse | hover | scale: 1 → 1.02 |
| Grid pattern | opacity increase | hover | 0.03 → 0.08 (existing, keep) |
| Gradient blob | opacity + scale | hover | Existing effect, enhance to 0.08 |

**Fallback Strategy:**
If no custom abstract asset exists for a project, use the existing CSS grid pattern + gradient blob treatment (current behavior).

---

### 2.9 Blogs Section
**Current State:** 3 blog cards with cover images
**Asset Needs:** Cover images managed via CMS (user uploads)

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Section header | fadeUp | in view | 600ms |
| Blog cards | fadeUp + stagger | in view | 100ms stagger |
| Card images | scale: 1 → 1.05 | hover | 700ms ease-out-quart |
| Card title | underline reveal | hover | width: 0 → 100% |
| Read more arrow | translateX: 0 → 4px | hover | 300ms |

---

## Section 3: Projects Page Assets

### 3.1 Projects Listing
**Current State:** Same cards as homepage grid
**Asset Needs:** NONE - Same minimal treatment

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Page header | fadeUp | page load | 600ms |
| Project grid | stagger fadeUp | page load | 100ms stagger between cards |
| Cards | Same hover effects as homepage | - | - |

---

## Section 4: Project Detail Page Assets

### 4.1 Header / Hero Bento
**Current State:** Large title with dashboard-style meta widgets
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `project_grid_bg.svg` | Pattern | `/public/assets/` | Dashboard-style grid pattern (code currently generates this) |

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Title | fadeUp | page load | y: 50 → 0, 800ms |
| Category badge | fadeIn + scale | page load | 100ms delay |
| Meta widgets | stagger fadeUp | page load | 100ms stagger |
| Grid background | subtle parallax | scroll | translateY at 0.1x scroll speed |

---

### 4.2 Problem/Solution Cards
**Current State:** Two-column bento grid
**Asset Needs:** NONE

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Problem card | slideIn from left | in view | x: -40 → 0, 800ms |
| Solution card | slideIn from right | in view | x: 40 → 0, 800ms |
| Pain points | stagger fadeUp | in view | 100ms stagger |
| Solution glow | opacity pulse | in view | Subtle white glow pulse |

---

### 4.3 Impact Metrics
**Current State:** 3 metric cards with charts
**Asset Needs:** NONE - Charts are code-generated

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Metric cards | fadeUp + stagger | in view | 150ms stagger |
| Numbers | countUp | in view | 1.5s duration |
| Chart bars | height: 0 → random | in view | Staggered grow, 600ms |
| Hover state | border color shift + arrow opacity | hover | #89CFF0 accent |

---

### 4.4 Architecture Flow
**Current State:** Input → Processing → Output nodes
**Asset Needs:**

| Asset | Type | Location | Description |
|-------|------|----------|-------------|
| `flow_arrow.svg` | Icon | `/public/assets/` | Arrow connectors between nodes (or use CSS) |

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Container | fadeUp | in view | 600ms |
| Nodes | stagger scale + fade | in view | 150ms stagger, scale: 0.9 → 1 |
| Connecting line | draw: width 0 → 100% | in view | 800ms, dashed line draws |
| Processing steps | cascade fadeUp | in view | 100ms stagger |
| Node hover | subtle lift | hover | translateY: -4px |

---

### 4.5 Design Decisions & Learnings
**Current State:** Timeline-style list and check-list
**Asset Needs:** NONE

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Cards | fadeUp | in view | 600ms |
| Decision items | slideIn from left | in view | 100ms stagger, border-left draws |
| Timeline dots | scale: 0 → 1 | in view | Pop in with bounce |
| Learning items | fadeUp stagger | in view | 100ms stagger |
| Checkmarks | draw stroke | in view | SVG path animation |

---

### 4.6 Interface Previews
**Current State:** Placeholder boxes for screenshots
**Asset Needs:** Project screenshots (user-managed via CMS)

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Container | fadeUp | in view | 600ms |
| Primary viewport | scale: 0.98 → 1 + opacity | in view | 800ms |
| Secondary panels | fadeUp stagger | in view | 150ms stagger |
| Image hover | scale: 1 → 1.02 | hover | Subtle zoom |

---

### 4.7 Next Project Footer
**Current State:** Dark footer with large next project title
**Asset Needs:** NONE

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Section | fadeUp | in view | 600ms |
| Background | gradient pulse | continuous | Subtle radial shift |
| Title | translateY: 0 → -8px | hover | 500ms ease-out-expo |
| Circle border | scale: 1 → 1.1 | hover | 500ms |
| Arrow | translateX: 0 → 16px | hover | 500ms ease-out-expo |
| "Up Next" label | color shift | hover | gray-400 → emerald-400 |

---

## Section 5: Blogs Page Assets

### 5.1 Blog Listing
**Current State:** List of blog posts with cover images
**Asset Needs:** Cover images (user-managed via CMS)

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Page title | fadeUp | page load | 800ms |
| Blog items | stagger fadeUp | in view | 100ms stagger |
| Cover images | grayscale → color + scale | hover | 700ms, grayscale off |
| Title | color shift + underline | hover | 300ms |
| Border | color: gray-200 → black | hover | 300ms |

---

### 5.2 Blog Detail
**Asset Needs:** Content images managed via BlockRenderer

**Animation Specifications:**
| Element | Animation | Trigger | Details |
|---------|-----------|---------|---------|
| Title | fadeUp | page load | 600ms |
| Content blocks | stagger fadeUp | in view | 100ms stagger |
| Media blocks | scale: 0.98 → 1 + fade | in view | 600ms |
| CTA buttons | slideUp | in view | 400ms |

---

## Section 6: Technical Animation Specifications

### 6.1 Easing Functions (CSS Custom Properties)
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-out-circ: cubic-bezier(0.075, 0.82, 0.165, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

### 6.2 Duration Scale
| Type | Duration | Use Case |
|------|----------|----------|
| Micro | 150ms | Button states, icon transitions |
| Base | 300ms | Hovers, toggles |
| Medium | 500ms | Card interactions |
| Slow | 800ms | Section reveals |
| Continuous | 8000-15000ms | Ambient floating |

### 6.3 Scroll-Triggered Animations
- Use Intersection Observer with threshold 0.1
- Add 50px root margin for early trigger
- Apply `once: true` to prevent re-animation
- Respect `prefers-reduced-motion`

### 6.4 Performance Rules
- Only animate `transform` and `opacity`
- Use `will-change` sparingly, remove after animation
- Avoid blur filters during scroll
- Use CSS animations for continuous effects
- Reserve Framer Motion for complex sequences

---

## Section 7: Asset File Structure

```
/public/assets/
├── patterns/
│   ├── dot_grid.svg           # Subtle dot pattern for sections
│   ├── grid_faint.svg         # Faint grid overlay
│   └── noise.png              # Seamless noise texture
├── shapes/
│   ├── hero_blob.svg          # Floating gradient blob
│   ├── hero_shape.svg         # Geometric accent
│   └── footer_pattern.svg     # Footer dot pattern
├── icons/
│   ├── service_pm.svg         # Product Management icon
│   ├── service_strategy.svg   # Strategy icon
│   ├── service_analysis.svg   # Analysis icon
│   └── service_design.svg     # Design icon
└── textures/
    ├── hero_bg.png            # Existing - keep
    └── abstract_shape.png     # Existing - keep
```

---

## Section 8: Priority Implementation Order

### Phase 1: Foundation (Essential)
1. Global navbar animations
2. Hero section text animations
3. Stats counter animations
4. Footer animations

### Phase 2: Content Sections
1. Services card hover effects
2. Experience timeline animations
3. Testimonials carousel
4. Contact form micro-interactions

### Phase 3: Project Pages
1. Project detail header animations
2. Architecture flow diagram
3. Impact metrics count-up
4. Next project footer hover

### Phase 4: Polish
1. Background ambient animations
2. Scroll-triggered parallax effects
3. Advanced hover states
4. Reduced motion fallbacks

---

## Section 9: Content Guidelines for Gemini

When generating this content:

### For SVG Icons (Services):
- Minimal line art, 1.5px stroke
- Single color: black or currentColor
- Viewbox: 48x48 or 64x64
- No fills, only strokes
- Geometric, abstract representations

### For Background Patterns:
- Extremely subtle (3-8% opacity)
- Seamless/repeatable
- Monochromatic or near-monochromatic
- Prefer CSS-generated patterns over images where possible

### For Decorative Shapes:
- Abstract, non-representational
- Single accent color or gradient
- Vector format (SVG)
- Max 3 distinct elements per section

### Animation Principles:
- Purposeful: Every animation guides or informs
- Restrained: One primary effect per element
- Consistent: Same easing and timing language
- Performant: 60fps on mid-tier devices
- Accessible: Respects reduced-motion preferences

---

## Summary

**Total New Assets Required:** ~10-12 SVG files  
**Heavy Images:** None (intentionally minimal)  
**Animation Coverage:** All sections  
**Estimated Implementation Time:** 2-3 dev days

**Key Design Decisions:**
1. Abstract generative art for project cards - unique visual identity per project
2. No blog cover images (user-managed via CMS)
3. No testimonials photos (use generative avatars or initials)
4. All decorative assets are SVG for crispness
5. Animations enhance, never distract

---

## Section 10: MCP Integration Plan for Animations & Assets

### What are MCPs?
MCPs (Model Context Protocols) are external AI services/tools that Claude can invoke to extend capabilities. For this portfolio, we can leverage MCPs for generative assets, animation code, and design automation.

---

### MCP Option 1: Cloudflare Agents SDK (Recommended for Animation Logic)
**Use Case:** Generate complex animation patterns, scroll-triggered behaviors, and reusable animation components

**What it does:**
- Generates React animation components using Framer Motion patterns
- Creates scroll-triggered hooks and intersection observer logic
- Builds reusable animation variants and transition presets
- Generates CSS keyframe animations optimized for performance

**Prompts to use:**
```
"Generate a Framer Motion stagger animation component for a grid of cards with fadeUp variants"
"Create a custom useScrollAnimation hook that tracks element position and triggers callbacks at thresholds"
"Build a text reveal component with split-text animation that works with the ease-out-expo easing"
```

**Output:** TypeScript React components with proper types, performance optimizations, and reduced-motion support

**Integration:** Direct component generation → paste into `/web/src/components/animations/`

---

### MCP Option 2: Stitch MCP (for Design-to-Code Asset Pipeline)
**Use Case:** Extract design tokens, export SVGs, generate React components from designs, and sync design system with code

**What it does:**
- Connects to Figma/Sketch/Adobe XD files and extracts design tokens (colors, spacing, typography)
- Exports SVG assets directly from design files
- Generates React/TypeScript components matching design specifications
- Creates Tailwind configuration from design system
- Compares designs with current implementation and suggests updates
- Converts design layers directly to code (including animations)

**Prompts to use:**
```
"Extract all SVG icons from the Services section in my design file"
"Sync my design tokens to the Tailwind config - get colors, fonts, and spacing"
"Export the abstract project card backgrounds as optimized SVGs"
"Generate a React component for this card design with hover animations"
"Convert this hero section design to Framer Motion code"
```

**Output:** Ready-to-use SVG files, React components, updated CSS variables, design token JSON

**Integration:** Automated asset pipeline → `/public/assets/`, component files → `/web/src/components/`, synced theme files

---

### MCP Option 3: Replicate/Stable Diffusion MCP (for Abstract Asset Generation)
**Use Case:** Generate unique abstract artwork for project cards

**What it does:**
- Generates SVG or PNG abstract compositions based on text prompts
- Creates variations of geometric patterns, line art, and generative designs
- Optimizes outputs for web (small file sizes, clean paths)

**Prompts to use:**
```
"Generate a minimal brutalist SVG composition with overlapping circles and arc sections, monochromatic black on white, 8% opacity elements"
"Create an abstract generative art piece with intersecting grid lines and nodes, architectural feel, minimal stroke weight"
"Produce an organic flowing shapes composition with asymmetric balance, soft curves, subtle gradients"
```

**Output:** Optimized SVG files ready for `/public/assets/projects/`

**Integration:** Batch generate → manual curation → deploy to public assets

---

### MCP Option 4: GitHub MCP (for Animation Library Research)
**Use Case:** Research and integrate best-in-class animation libraries and patterns

**What it does:**
- Searches GitHub for popular animation libraries and components
- Finds reference implementations of specific animation patterns
- Discovers optimized scroll-triggered animation solutions

**Prompts to use:**
```
"Find the most performant scroll-triggered animation libraries for React with TypeScript support"
"Search for Framer Motion patterns for staggered grid animations"
"Look up GSAP ScrollTrigger alternatives that are lighter weight"
```

**Output:** Library recommendations, code snippets, implementation guides

**Integration:** Research findings → dependency installation → implementation

---

### MCP Option 5: Browser Rendering MCP (for Animation Testing)
**Use Case:** Test and optimize animation performance

**What it does:**
- Captures performance metrics (FPS, layout shifts, paint times)
- Identifies animation bottlenecks and jank
- Generates performance reports with recommendations
- Tests animations across different viewport sizes

**Prompts to use:**
```
"Run a performance audit on the project cards hover animations"
"Test the scroll-triggered animations for frame drops"
"Generate a Core Web Vitals report for the homepage"
```

**Output:** Performance reports, optimization recommendations, before/after metrics

**Integration:** Test runs → optimization fixes → re-test validation

---

### MCP Option 6: Web Search MCP (for Animation Inspiration)
**Use Case:** Research current animation trends and implementation techniques

**What it does:**
- Searches for latest CSS animation techniques and best practices
- Finds inspiration from award-winning portfolio sites
- Discovers new Framer Motion features and patterns

**Prompts to use:**
```
"Find examples of minimal brutalist portfolio animations from 2025-2026"
"Research the latest CSS scroll-driven animations browser support"
"Look up text reveal animation techniques using only CSS"
```

**Output:** Links, code examples, trend analysis, technique guides

**Integration:** Research → inspiration → implementation

---

### Recommended MCP Stack for This Project

| Phase | MCP | Purpose | Priority |
|-------|-----|---------|----------|
| 1 | Cloudflare Agents SDK | Generate animation component boilerplate | HIGH |
| 2 | Stitch MCP | Extract design tokens, export SVGs, generate components from designs | HIGH |
| 3 | Replicate/SD MCP | Generate abstract project card SVGs | HIGH |
| 4 | Browser Rendering MCP | Test and optimize animation performance | MEDIUM |
| 5 | Web Search MCP | Research trends and validate approaches | LOW |

---

### MCP Workflow for Asset Generation

```
1. DESIGN BRIEF → Cloudflare Agents SDK
   "Generate a minimal abstract SVG for a UI/UX project card. 
    Theme: Grid systems, interface fragments, component outlines. 
    Style: Brutalist, monochromatic black at 10% opacity on white."

2. GENERATION → Replicate/SD MCP
   Produce 3-4 variations per project
   
3. CURATION → Manual review
   Select best options, ensure variety across projects
   
4. OPTIMIZATION → Browser Rendering MCP
   Verify SVG loads fast, doesn't cause layout shift
   
5. INTEGRATION → Code implementation
   Update project cards to reference new assets
```

---

### MCP Workflow for Animation Implementation

```
1. SPEC → Cloudflare Agents SDK
   "Create a scroll-triggered counter animation component 
    that counts up when in viewport, with easeOutExpo easing"

2. GENERATE → Receive TypeScript component
   Review types, performance optimizations, accessibility
   
3. TEST → Browser Rendering MCP
   Verify 60fps, no jank on scroll
   
4. REFINE → Iterate with Agents SDK
   "Add prefers-reduced-motion support to the counter component"
   
5. DEPLOY → Add to codebase
   Import and use in Stats section
```

---

### Important Notes on MCP Usage

- **Always review generated code** - MCPs accelerate but don't replace engineering judgment
- **Test on real devices** - MCPs can't simulate all hardware capabilities
- **Keep fallbacks** - Generated assets should degrade gracefully
- **Version control** - Commit MCP outputs for review before production
- **Accessibility first** - Verify all MCP-generated animations respect `prefers-reduced-motion`

---

## Summary

**Total New Assets Required:** ~16-18 SVG files (includes 6 project abstracts)  
**Heavy Images:** None (intentionally minimal)  
**Animation Coverage:** All sections with scroll-triggered reveals  
**MCP Integration:** Recommended for asset generation and animation boilerplate  
**Estimated Implementation Time:** 2-3 dev days (with MCP acceleration: 1-2 days)

**Key Design Decisions:**
1. Abstract generative art for project cards - unique visual identity per project
2. No blog cover images (user-managed via CMS)
3. No testimonials photos (use generative avatars or initials)
4. All decorative assets are SVG for crispness
5. Animations enhance, never distract
6. MCPs accelerate but don't replace thoughtful implementation
