# Texture Assets

This folder contains subtle texture images used for backgrounds to add authenticity and warmth to the site.

## Available Textures

- `paper-light.svg` - Subtle paper texture for main background
- `watercolor-accent.svg` - Soft watercolor wash for decorative elements

## Usage

Textures are referenced in CSS/Tailwind as background images:

### Paper Texture (Main Background)
Applied automatically to the body element via `globals.css`:
```css
body {
  background-image: url('/textures/paper-light.svg');
  background-repeat: repeat;
  background-size: 300px 300px;
}
```

### Watercolor Accent (Decorative Element)
Use the `.watercolor-accent` class to add a subtle watercolor decoration:
```html
<section class="watercolor-accent">
  <!-- content -->
</section>
```

### Utility Class
Use `.bg-paper-texture` class for explicit paper background:
```html
<div class="bg-paper-texture">
  <!-- content -->
</div>
```

## Design Principles

As per Design DNA document:
- Textures are subtle (opacity 5-15%)
- Must not interfere with text readability  
- SVG format for performance and scalability
- Supports the brand identity: "Soul and texture (paper, flour, spatula stroke)"

## Color Palette Reference

The textures complement the brand colors:
- Cream (#F5F0E8) - Main background
- Blush Pink (#F2D7D5) - Watercolor accent
- Soft White (#FDFBF7) - Cards and sections


