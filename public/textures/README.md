# Texture Assets

This folder contains subtle texture images used for backgrounds to add authenticity and warmth to the site. All textures are SVG-based for performance and scalability.

## Available Textures

| File | Description | Use Case |
|------|-------------|----------|
| `paper-light.svg` | Subtle paper texture | Main body background |
| `flour-grain.svg` | Fine flour/grain noise | Bakery-themed sections |
| `soft-grain.svg` | Soft grain texture | Cards, highlighted sections |
| `watercolor-accent.svg` | Soft watercolor wash | Decorative corner accents |

## Usage

### Method 1: Direct Background Classes

Apply textures directly as background:

```html
<!-- Paper texture -->
<div class="bg-paper-texture">Content</div>

<!-- Flour grain texture -->
<div class="bg-flour-texture">Content</div>

<!-- Soft grain texture -->
<div class="bg-soft-grain">Content</div>
```

### Method 2: Pseudo-Element Overlay (Recommended)

Use pseudo-elements for non-intrusive textures that don't affect layout:

```html
<!-- Base setup + texture modifier -->
<section class="texture-overlay texture-paper">
  Content unaffected by texture
</section>

<section class="texture-overlay texture-flour">
  Content with flour texture overlay
</section>

<section class="texture-overlay texture-grain">
  Content with soft grain overlay
</section>
```

### Method 3: Section Presets

Ready-made section styles with appropriate textures:

```html
<!-- Cream background with paper texture -->
<section class="section-textured py-16">
  Premium section content
</section>

<!-- Soft-white background with grain texture -->
<section class="section-soft py-16">
  Highlighted section content
</section>
```

### Decorative Watercolor Accent

Add subtle watercolor decoration to sections:

```html
<!-- Top-right watercolor accent -->
<section class="watercolor-accent">
  <!-- content -->
</section>

<!-- Bottom-left watercolor accent -->
<section class="watercolor-accent watercolor-accent-bl">
  <!-- content -->
</section>
```

### Body Default

The body element automatically has paper texture applied via `globals.css`:

```css
body {
  background-image: url('/textures/paper-light.svg');
  background-repeat: repeat;
  background-size: 300px 300px;
}
```

## Design Principles

As per Design DNA document:

- **Subtlety**: Textures use low opacity (4-8% in SVG, plus CSS opacity control)
- **Performance**: SVG format, small file sizes, seamless tiling
- **Accessibility**: Never interferes with text readability
- **Premium feel**: "Soul and texture (paper, flour, spatula stroke)"
- **Lazy loading**: Browser natively handles background-image loading

## Texture Opacity Guide

| Context | Recommended Opacity |
|---------|---------------------|
| Body background | 8% (built into SVG) |
| Section overlays | 30-50% (via CSS) |
| Card textures | 20-40% (via CSS) |
| Decorative accents | 50% max |

## Color Palette Reference

Textures complement the brand colors:

- Cream (#F5F0E8) - Main background, paper texture base
- Blush Pink (#F2D7D5) - Watercolor accent
- Soft White (#FDFBF7) - Cards and sections, soft grain base
- Warm Brown (#8B6F4E) - Flour grain color tint
- Butter Gold (#D4A574) - Soft grain accent color

## Performance Notes

- SVG-based textures loaded as background images (cached by browser)
- Uses `feTurbulence` SVG filter for noise generation (GPU-accelerated)
- Small tile sizes (200-300px) for efficient memory usage
- `pointer-events: none` ensures no interaction issues
- `isolation: isolate` creates stacking context for z-index safety
