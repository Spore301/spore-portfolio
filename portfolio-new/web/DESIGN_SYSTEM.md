# Design System

This document defines the complete design system for the portfolio website. All components and pages should follow these standards.

## Design Principles

- **Minimal & Elegant**: Clean whitespace, refined typography, subtle interactions
- **Consistent Rhythm**: 8px base grid, predictable spacing scale
- **Purposeful Motion**: Smooth transitions that guide attention, never distract
- **High Contrast**: Black/white foundation with grayscale accents

---

## Color System

### Background Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `bg-primary` | `#000000` | Primary dark backgrounds (footer) |
| `bg-secondary` | `#0f0f0f` | Secondary dark (cards on dark) |
| `bg-tertiary` | `#1a1a1a` | Tertiary dark (hover states) |
| `bg-muted` | `#f4f4f0` | Section backgrounds (testimonials, stats) |
| `bg-subtle` | `#fafafa` | Alternate section backgrounds (experience) |
| `bg-white` | `#ffffff` | Primary light background |

### Text Colors

| Token | Tailwind | Usage |
|-------|----------|-------|
| `text-primary` | `text-black` | Primary headings, important text |
| `text-secondary` | `text-gray-600` | Body text, descriptions |
| `text-muted` | `text-gray-400` | Subtle text, captions, meta |
| `text-inverse` | `text-white` | Text on dark backgrounds |
| `text-inverse-muted` | `text-gray-400` | Secondary text on dark |

### Border Colors

| Token | Tailwind | Usage |
|-------|----------|-------|
| `border-default` | `border-gray-200` | Standard borders |
| `border-subtle` | `border-gray-100` | Light borders |
| `border-inverse` | `border-white/10` | Borders on dark backgrounds |

---

## Typography System

### Font Families

- **Primary**: Geist (sans-serif) - Used for all text
- **Mono**: Geist Mono (if needed for labels) - Not currently loaded

### Type Scale

| Style | Size | Line Height | Tracking | Weight | Usage |
|-------|------|-------------|----------|--------|-------|
| Display XL | 6rem (96px) | 1.0 | -0.04em | 600 | Hero headlines |
| Display | 4.5rem (72px) | 1.0 | -0.04em | 600 | Section headlines |
| Display SM | 3rem (48px) | 1.1 | -0.02em | 600 | Subsection headlines |
| H1 | 2.5rem (40px) | 1.2 | -0.02em | 600 | Page titles |
| H2 | 1.875rem (30px) | 1.3 | -0.01em | 500 | Card titles |
| H3 | 1.5rem (24px) | 1.4 | normal | 500 | Subheadings |
| Body Large | 1.25rem (20px) | 1.6 | normal | 400 | Featured paragraphs |
| Body | 1rem (16px) | 1.6 | normal | 400 | Standard text |
| Body Small | 0.875rem (14px) | 1.5 | normal | 400 | Secondary text |
| Caption | 0.75rem (12px) | 1.4 | 0.05em | 500 | Labels, tags (uppercase) |

### Typography Patterns

```tsx
// Hero headline
<h1 className="text-display-xl font-semibold tracking-tight leading-none">

// Section headline
<h2 className="text-display font-semibold tracking-tight leading-tight">

// Card title
<h3 className="text-h2 font-medium tracking-tight">

// Body text
<p className="text-body text-secondary leading-relaxed">

// Label/Caption
<span className="text-caption font-medium tracking-wide uppercase">
```

---

## Spacing System

### Section Spacing

| Size | Value | Usage |
|------|-------|-------|
| Section SM | py-16 (64px) | Compact sections |
| Section MD | py-24 (96px) | Standard sections |
| Section LG | py-32 (128px) | Major sections |

### Content Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Micro spacing |
| `space-2` | 8px | Tight spacing |
| `space-3` | 12px | Default component gap |
| `space-4` | 16px | Standard gap |
| `space-6` | 24px | Medium gap |
| `space-8` | 32px | Large gap |
| `space-12` | 48px | Section content gap |
| `space-16` | 64px | Major content divisions |

### Container

```tsx
// Standard container
<div className="container mx-auto max-w-7xl px-6">
```

---

## Border Radius System

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements, tags |
| `rounded-md` | 8px | Buttons, inputs |
| `rounded-lg` | 12px | Small cards |
| `rounded-xl` | 16px | Cards, panels |
| `rounded-2xl` | 24px | Large cards, sections |
| `rounded-full` | 9999px | Pills, avatars, circular buttons |

---

## Shadow & Elevation System

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px rgba(0,0,0,0.07)` | Cards default |
| `shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Elevated cards |
| `shadow-xl` | `0 20px 25px rgba(0,0,0,0.12)` | Hover states, modals |

---

## Animation System

### Duration Standards

| Token | Value | Usage |
|-------|-------|-------|
| `duration-fast` | 150ms | Micro-interactions (hover states) |
| `duration-base` | 300ms | Standard transitions |
| `duration-slow` | 500ms | Page transitions, reveals |
| `duration-slower` | 800ms | Hero animations, major reveals |

### Easing Functions

| Token | Value | Usage |
|-------|-------|-------|
| `ease-default` | `ease-in-out` | Standard transitions |
| `ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Reveals, entrances |
| `ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Smooth exits |

### Standard Animation Patterns

```tsx
// Fade up (most common)
const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

// Fade in
const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5 }
};

// Scale in
const scaleIn = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

// Stagger children
const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } }
};
```

---

## Component Patterns

### Buttons

```tsx
// Primary button (dark)
<Button className="bg-black text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-black/80 transition-colors">

// Secondary button (outline)
<Button variant="outline" className="rounded-full border-gray-200">

// Icon button (circular)
<button className="w-16 h-16 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors">
```

### Cards

```tsx
// Project card (large, image-heavy)
<div className="border border-black/10 bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
  {/* Image area: aspect-[16/10] */}
  {/* Content area: px-8 py-5 */}
</div>

// Service card (hover invert)
<Card className="h-[300px] border border-gray-100 bg-white hover:bg-[#111] hover:text-white transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-xl rounded-2xl">

// Testimonial card (minimal, bordered)
<div className="flex flex-col border-l border-black/80 px-8 md:px-12 py-8 md:py-0 min-h-[320px] justify-between">
```

### Section Headers

```tsx
// Standard section header
<div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
  <div className="max-w-xl">
    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium mb-6">
      Section Label
    </div>
    <h2 className="text-display font-semibold tracking-tight leading-tight">
      Section Headline
    </h2>
  </div>
  <p className="text-secondary max-w-md text-body leading-relaxed pb-2">
    Section description text
  </p>
</div>
```

### Labels/Tags

```tsx
// Section label (pill)
<div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-sm font-medium mb-6">
  Label Text
</div>

// Category tag (small pill)
<span className="text-caption font-mono uppercase tracking-widest bg-white/90 backdrop-blur-sm border border-black/10 px-3 py-1.5 rounded-full text-black/60">
  Category
</span>
```

---

## Layout Patterns

### Grid System

```tsx
// Two column grid (projects, services)
<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">

// Three column grid (testimonials, blogs)
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">

// Asymmetric grid (hero, complex layouts)
<div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
  <div className="md:col-span-5">...</div>
  <div className="md:col-span-7">...</div>
</div>
```

### Section Structure

```tsx
<section className="py-24 md:py-32 bg-muted">
  <div className="container mx-auto max-w-7xl px-6">
    {/* Content */}
  </div>
</section>
```

---

## Dark Mode Patterns

For dark sections (like footer):

```tsx
// Dark section wrapper
<div className="bg-primary text-inverse">
  {/* Cards on dark */}
  <div className="bg-secondary border border-inverse">

  {/* Text on dark */}
  <p className="text-inverse-muted">

  {/* Hover on dark */}
  <div className="hover:bg-tertiary transition-colors">
</div>
```

---

## Do's and Don'ts

### Do

- Use the spacing scale consistently
- Apply animations with `viewport={{ once: true }}` for scroll reveals
- Use CSS custom properties from globals.css when available
- Keep animations subtle and purposeful
- Maintain consistent section padding

### Don't

- Don't use arbitrary values (e.g., `top-[53px]`, `text-[17px]`)
- Don't hardcode colors; use the semantic tokens
- Don't mix different border radius patterns in the same context
- Don't use different animation timings without purpose
- Don't override component styles inline; extend the component

---

## CSS Custom Properties

These are available in `globals.css`:

```css
/* Backgrounds */
--bg-primary: #000000;
--bg-secondary: #0f0f0f;
--bg-tertiary: #1a1a1a;
--bg-muted: #f4f4f0;
--bg-subtle: #fafafa;

/* Animation */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--duration-base: 300ms;
--duration-slow: 500ms;
--duration-slower: 800ms;
```
