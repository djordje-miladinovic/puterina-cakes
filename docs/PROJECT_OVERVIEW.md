# Puterina Cakes - Project Overview

## Vision & Identity

### Brand Essence
**Puterina** is a premium home-made confectionery brand specializing in buttery, handcrafted cakes with an emphasis on quality ingredients and artisanal techniques.

- **Brand Name**: Puterina (from "puter" - butter) - evokes creamy, golden, warm tones
- **Positioning**: Premium home-made boutique cakes
- **Target Audience**: 
  - Mothers with children
  - High-end clients seeking exclusive celebration cakes
- **Key Emotions**: Family warmth, quality, handcrafted artistry
- **Signature Products**: 
  - Pistachio-Raspberry cake
  - Gianduja-Raspberry cake
- **Location**: Belgrade, Serbia

### Brand Personality
- Warm and approachable
- Elegant but not pretentious
- Rustic with touches of modern aesthetics
- "Homemade, but premium"

## Project Goals

### Primary Objectives
1. **Increase inquiries and orders**: Target 2x more orders within 3-6 months post-launch
2. **Streamline communication**: Reduce repetitive inquiries through FAQ and clear information architecture
3. **Establish digital presence**: Create a professional website that reflects the brand's premium positioning
4. **Attract target orders**: Focus on birthday cakes, children's cakes, and themed celebrations

### Success Metrics
- Doubled order volume within 3-6 months
- Reduced FAQ-related inquiries by 50%
- Increased direct phone inquiries
- Improved brand perception as premium boutique

## Technical Architecture

### Stack Overview

#### Frontend
- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS (utility-first approach)
- **UI Components**: shadcn/ui (accessible, customizable)
- **Icons**: Lucide React
- **Animations**: CSS transitions (GPU-accelerated, max 300ms)

#### Content Management
- **CMS**: Sanity (headless CMS)
- **Studio**: Embedded at `/app/studio`
- **Content Types**: Products, FAQs, testimonials
- **Asset Management**: Sanity's built-in media library

#### Deployment
- **Platform**: Vercel (optimized for Next.js)
- **Domain**: To be configured
- **Environment**: Production and staging environments
- **CDN**: Automatic via Vercel Edge Network

### Key Technical Decisions

See `/docs/adr/` for detailed Architecture Decision Records:
- **ADR-001**: Use Next.js App Router for modern React patterns
- **ADR-002**: Use Sanity CMS for flexible content management

## Design System

The complete design system is documented in `/docs/design/design-dna.md`, including:

### Design Principles (14 Core Principles)
1. Warm colors (butter, cream, gold)
2. Large full-screen images
3. Minimalism and simplicity
4. Textured images blended with backgrounds
5. Minimalist sketches and illustrations
6. Mandatory cake cross-section visuals
7. Hover effects with image changes
8. Rounded elements and backgrounds
9. Asymmetrical layouts
10. Vertical scroll galleries
11. Textured, authentic feel (not plastic)
12. Storytelling section (brand story)
13. Visual "How to Order" guide

### Color Palette

#### Primary Colors
- **Cream**: `#F5F0E8` - Main background
- **Butter Gold**: `#D4A574` - Accents, CTAs
- **Warm Brown**: `#8B6F4E` - Text, headings
- **Soft White**: `#FDFBF7` - Cards, sections

#### Secondary Colors
- **Blush Pink**: `#F2D7D5` - Accents, hovers
- **Pistachio**: `#C5D5C5` - Signature highlight
- **Raspberry**: `#D4738C` - Alternative CTAs

### Typography
- **Headings**: Serif font (Playfair Display, Cormorant Garamond, or Lora)
- **Body**: Clean sans-serif (Inter, Nunito Sans, or Source Sans Pro)
- **Scale**: Mobile-responsive from 12px to 48px

### Key References
- **Primary Inspiration**: [tarte.com.sg](https://www.tarte.com.sg) - Colors, minimalism, split layout
- **Product Details**: [yanncouvreur.com](https://www.yanncouvreur.com), [pierreherme.com](https://www.pierreherme.com)
- **Home Design**: [maisonlandemaine.com](https://maisonlandemaine.com), [laduree.com](https://laduree.com)

See `/docs/design/design-dna.md` for complete reference mapping and specifications.

## Feature Set

### Core Features

#### 1. Home Page
- Hero section with full-screen cake image
- Featured signature products
- Brand story/about section
- "How to Order" visual guide (3 steps)
- Customer testimonials
- Contact CTAs

#### 2. Product Catalog (`/katalog`)
- Grid layout with product cards
- Hover effects showing cake cross-sections
- Filter by category (cakes, pastries)
- Premium products with larger images
- Direct inquiry CTAs

#### 3. Product Detail Pages (`/proizvod/[slug]`)
- Vertical scroll gallery with main image
- Mandatory cake cross-section images
- Product information:
  - Name and description
  - Price (per kilogram)
  - Ingredients list
  - Nutritional values (per 100g)
  - Allergen icons
  - Storage instructions
- Contact inquiry buttons
- Related products

#### 4. Contact Page (`/kontakt`)
- Primary CTA: Phone call button
- Secondary CTA: Instagram DM
- Contact form (optional)
- Working hours: Mon-Fri, 08:00-20:00
- Service area: Belgrade (flexible for special orders)
- No physical address (by design)

#### 5. FAQ Page (`/faq`)
- Common questions about:
  - Ordering process
  - Pricing and customization
  - Delivery and pickup
  - Storage and handling
  - Ingredient quality
  - Lead times (minimum 10 days)
- Expandable accordion format

#### 6. Sticky Contact Buttons
Fixed buttons in bottom-right corner:
1. Phone (primary)
2. Instagram

### Business Rules

#### Ordering Process
- **No e-commerce**: No shopping cart or online checkout
- **Contact-based**: All orders via phone or Instagram
- **Lead time**: Minimum 10 days advance notice
- **Customization**: Fully customizable with butter cream only (no fondant)
- **Pricing**: Per kilogram base price + custom decoration charges

#### Delivery & Pickup
- **Service area**: Belgrade (extendable for valuable clients)
- **Delivery**: Available with zone-based pricing
- **Pickup**: Available (location shared after order confirmation)
- **Schedule**: Monday-Saturday, 12:00-17:00

#### Content Management
- **Update frequency**: Approximately once per year
- **Product images**: Professional photography only
- **Price changes**: Manual updates as needed
- **Seasonal menu**: Products change seasonally

## Development Workflow

### Milestone Methodology

We follow an agile, milestone-based approach:

#### Phase 1: Foundation (Completed)
- [x] Project setup and configuration
- [x] Next.js + Sanity integration
- [x] Basic routing structure
- [x] Component library setup (shadcn/ui)
- [x] Design system documentation

#### Phase 2: Core Pages (In Progress)
- [ ] Home page implementation
- [ ] Product catalog with CMS integration
- [ ] Product detail page template
- [ ] Contact and FAQ pages
- [ ] Mobile responsive design

#### Phase 3: Features & Polish
- [ ] Sticky contact buttons
- [ ] Image galleries with hover effects
- [ ] Testimonials section
- [ ] Performance optimization

#### Phase 4: Content & Launch
- [ ] Professional product photography integration
- [ ] SEO optimization
- [ ] Google My Business setup
- [ ] Analytics integration
- [ ] Production deployment

### Development Standards

#### Code Quality
- TypeScript strict mode enabled
- ESLint for code linting
- Type checking before commits
- Component-based architecture
- Reusable utility functions in `/lib`

#### Git Workflow
- Feature branches for new work
- Descriptive commit messages
- Pull request reviews
- CI/CD via GitHub Actions
- Automated testing and linting

#### Performance Standards
- Lighthouse score > 90
- Core Web Vitals optimized
- Image optimization (WebP format)
- Lazy loading for images
- GPU-accelerated animations only

## Contact Information

### Client
- **Phone**: +381 65 379 9334
- **Instagram**: [@puterinacakes](https://instagram.com/puterinacakes)

### Development Team
- **Repository**: [github.com/djordje-miladinovic/puterina-cakes](https://github.com/djordje-miladinovic/puterina-cakes)
- **Lead Developer**: Djordje Miladinovic

## References & Resources

### Documentation
- `/docs/design/design-dna.md` - Complete design system
- `/docs/copy/PRODUCT_DETAIL_COPY_TEMPLATE.md` - Product description copy template
- `/docs/adr/` - Architecture decision records
- `/docs/DEVELOPMENT.md` - Development setup guide
- `/references/` - Client requirements and site references

### External Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

---

*Document created: January 2026*  
*Last updated: January 2026*  
*Version: 1.0*
