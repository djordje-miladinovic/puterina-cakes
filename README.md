# Puterina Cakes 🍰

Official website for **Puterina Cakes** - a premium home-made confectionery boutique specializing in handcrafted, buttery cakes made with exceptional ingredients.

> *"Puteraste torte za vaše najvažnije trenutke"*  
> *Premium home-made cakes for your most important moments*

## 📖 About the Project

Puterina Cakes is a Belgrade-based artisanal bakery offering exclusive, customized celebration cakes. The brand emphasizes:

- **Quality Ingredients**: Only the finest ingredients for exceptional taste
- **Artisanal Craft**: Handmade with attention to every detail
- **Butter Cream Excellence**: Signature butter cream (no fondant)
- **Unique Flavors**: Signature combinations like Pistachio-Raspberry and Gianduja-Raspberry
- **Personalization**: Custom designs tailored to each celebration

### Target Audience
- Mothers seeking premium cakes for children's celebrations
- High-end clients for exclusive events and weddings
- Anyone appreciating quality, handcrafted confectionery

### Brand Personality
Warm and approachable, elegant but not pretentious, rustic with modern touches—"Domaće, ali premium" (Homemade, but premium).

## 🛠 Tech Stack

### Core Technologies
- **Framework**: [Next.js 16](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) for type-safe development
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (utility-first CSS framework)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) (accessible, customizable components)
- **CMS**: [Sanity](https://www.sanity.io/) (headless content management)
- **Deployment**: [Vercel](https://vercel.com/) (optimized for Next.js)

### Additional Libraries
- **Icons**: Lucide React
- **Image Optimization**: Sanity Image URLs + Next.js Image
- **Animations**: CSS transitions (GPU-accelerated, < 300ms)

### Why This Stack?

See our [Architecture Decision Records (ADRs)](/docs/adr/) for detailed technical decisions:
- **ADR-001**: Why Next.js App Router
- **ADR-002**: Why Sanity CMS

## 🎯 Project Methodology

### Milestone-Based Development

This project follows an **agile, milestone-based approach** to ensure steady progress and clear deliverables.

#### Phase 1: Foundation ✅ (Completed)
- [x] Project setup and configuration
- [x] Next.js + TypeScript + Tailwind setup
- [x] Sanity CMS integration
- [x] Basic routing structure
- [x] Component library (shadcn/ui) setup
- [x] Design system documentation

#### Phase 2: Core Pages 🚧 (In Progress)
- [ ] Home page with hero and featured products
- [ ] Product catalog (`/katalog`) with CMS integration
- [ ] Product detail pages (`/proizvod/[slug]`)
- [ ] Contact page (`/kontakt`)
- [ ] FAQ page (`/faq`)
- [ ] Mobile-responsive design

#### Phase 3: Features & Polish 📋 (Upcoming)
- [ ] Sticky contact buttons (Phone, WhatsApp, Viber, Instagram)
- [ ] WhatsApp pre-fill integration
- [ ] Image galleries with hover effects
- [ ] Customer testimonials section
- [ ] Performance optimization (Lighthouse > 90)

#### Phase 4: Content & Launch 🚀 (Upcoming)
- [ ] Professional product photography integration
- [ ] SEO optimization (local SEO for Belgrade)
- [ ] Google My Business setup
- [ ] Analytics integration
- [ ] Production deployment

### Development Standards

#### Code Quality
- ✅ TypeScript strict mode enabled
- ✅ ESLint for code consistency
- ✅ Type checking before commits
- ✅ Component-based architecture
- ✅ Reusable utilities in `/lib`

#### Performance Standards
- 🎯 Lighthouse score > 90
- 🎯 Core Web Vitals optimized
- 🎯 Image optimization (WebP format)
- 🎯 Lazy loading for images
- 🎯 GPU-accelerated animations only (max 300ms)

#### Design Standards
- 🎨 Follow Design DNA principles (see `/docs/design/design-dna.md`)
- 🎨 Warm, creamy color palette
- 🎨 Minimalist, elegant aesthetic
- 🎨 Textured backgrounds for authenticity
- 🎨 Mobile-first responsive design

## 🚀 Getting Started

### Prerequisites
- **Node.js**: 18+ 
- **npm** or **yarn**
- **Sanity account**: For CMS access

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/djordje-miladinovic/puterina-cakes.git
   cd puterina-cakes
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Sanity credentials:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=uo9eeei7
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. **Open your browser**:
   Visit [http://localhost:3000](http://localhost:3000) to see the site.

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build optimized production bundle |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint for code quality |
| `npm run typecheck` | Run TypeScript type checking |

## 📂 Project Structure

This project follows a recommended **agency folder structure** optimized for Next.js App Router and Sanity CMS.

```
puterina-cakes/
├── .github/              # GitHub workflows and templates
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout with SEO
│   ├── page.tsx         # Home page
│   ├── katalog/         # Product catalog
│   ├── proizvod/[slug]/ # Product detail pages
│   ├── faq/             # FAQ page
│   ├── kontakt/         # Contact page
│   └── studio/          # Sanity Studio (embedded)
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── header.tsx      # Site header
│   ├── footer.tsx      # Site footer
│   └── sticky-buttons.tsx
├── docs/                # Documentation
│   ├── adr/            # Architecture Decision Records
│   ├── design/         # Design system specifications
│   ├── DEVELOPMENT.md  # Development guide
│   ├── FOLDER_STRUCTURE.md
│   └── PROJECT_OVERVIEW.md
├── lib/                 # Utilities and helpers
│   ├── sanity/         # Sanity client utilities
│   ├── constants.ts    # App constants
│   └── utils.ts        # Helper functions
├── public/              # Static assets
│   └── textures/       # Background textures
├── references/          # Design references
├── sanity/              # Sanity CMS schemas
│   └── schemaTypes/    # Content type definitions
├── .env.example         # Environment variables template
├── components.json      # shadcn/ui configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Dependencies and scripts
├── sanity.config.ts     # Sanity Studio configuration
└── tsconfig.json        # TypeScript configuration
```

### Key Folders

| Folder | Purpose |
|--------|---------|
| `/app` | Next.js pages using App Router pattern |
| `/components` | Reusable React components |
| `/docs` | Project documentation and design specs |
| `/lib` | Utility functions and shared logic |
| `/public` | Static assets (textures, icons) |
| `/sanity` | CMS content schemas |
| `/references` | Client requirements and design references |

📚 For detailed folder structure documentation, see [`/docs/FOLDER_STRUCTURE.md`](/docs/FOLDER_STRUCTURE.md).

## 🎨 Design System

The complete design system is documented in [`/docs/design/design-dna.md`](/docs/design/design-dna.md), including:

### Design Principles
- ✨ Warm, creamy color palette (butter, cream, gold)
- ✨ Large full-screen hero images
- ✨ Minimalist, elegant design
- ✨ Textured backgrounds for authenticity
- ✨ Mandatory cake cross-section photos
- ✨ Hover effects with image transitions
- ✨ Asymmetrical, organic layouts
- ✨ Storytelling and brand narrative

### Color Palette

#### Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Cream | `#F5F0E8` | Main background |
| Butter Gold | `#D4A574` | Accents, CTAs |
| Warm Brown | `#8B6F4E` | Text, headings |
| Soft White | `#FDFBF7` | Cards, sections |

#### Secondary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Blush Pink | `#F2D7D5` | Accents, hovers |
| Pistachio | `#C5D5C5` | Signature highlight |
| Raspberry | `#D4738C` | Alternative CTAs |

### Typography
- **Headings**: Serif font (Playfair Display, Cormorant Garamond, Lora)
- **Body**: Sans-serif (Inter, Nunito Sans, Source Sans Pro)
- **Scale**: 12px to 48px, mobile-responsive

### Key Design References
1. **[tarte.com.sg](https://www.tarte.com.sg)** - Primary inspiration (colors, minimalism, layout)
2. **[yanncouvreur.com](https://www.yanncouvreur.com)** - Product details, hover effects
3. **[pierreherme.com](https://www.pierreherme.com)** - Best-in-class product pages
4. **[maisonlandemaine.com](https://maisonlandemaine.com)** - Home page design, textured images

📚 For complete design specifications, see [`/docs/design/design-dna.md`](/docs/design/design-dna.md).

## 🗂 Sanity CMS

### What is Sanity?

Sanity is a headless CMS that allows content editors to manage products, FAQs, and other content through an intuitive Studio interface, while developers fetch data via APIs.

### Sanity Studio (Embedded)

The Sanity Studio is embedded in the Next.js app at `/app/studio` and accessible at:
- **Development**: [http://localhost:3000/studio](http://localhost:3000/studio)
- **Production**: `https://yourdomain.com/studio`

### Content Types

Current schemas in `/sanity/schemaTypes/`:
- **Product** (`product.ts`): Cakes and pastries with images, descriptions, prices, ingredients, allergens

Future schemas:
- **FAQ**: Frequently asked questions
- **Testimonial**: Customer reviews
- **Category**: Product categorization

### Working with Sanity

1. **Access Studio**: Visit `/studio` route in your browser
2. **Login**: Use your Sanity account credentials
3. **Manage Content**: Create, edit, and publish products
4. **Preview**: Changes appear immediately on the site (with revalidation)

### Environment Variables

Required in `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=uo9eeei7
NEXT_PUBLIC_SANITY_DATASET=production
```

📚 For Sanity setup details, see [`/docs/DEVELOPMENT.md`](/docs/DEVELOPMENT.md).

## 🌐 Routes

| Route | Description |
|-------|-------------|
| `/` | Home page with hero, featured products, about |
| `/katalog` | Product catalog with filters |
| `/proizvod/[slug]` | Individual product detail pages |
| `/faq` | Frequently asked questions |
| `/kontakt` | Contact information and inquiry options |
| `/studio` | Sanity CMS Studio (admin only) |

## 📞 Contact Features

### Smart Contact System
The site implements a **contact-first** approach (no e-commerce):

- **Sticky Buttons**: Fixed in bottom-right corner
  1. 📞 Phone (primary)
  2. 💬 WhatsApp
  3. 📱 Viber
  4. 📷 Instagram

- **WhatsApp Pre-fill**: Inquiry button opens WhatsApp with pre-filled message:
  ```
  Zdravo, zanima me torta za [DATUM], 
  sviđa mi se model [PROIZVOD]...
  ```

- **Working Hours**: Monday-Friday, 08:00-20:00
- **Service Area**: Belgrade (flexible for special orders)

## 🧪 Testing & Quality

### Manual Testing Checklist
- [ ] Home page loads correctly
- [ ] Products display from Sanity CMS
- [ ] Product detail pages render with all information
- [ ] Contact buttons work (WhatsApp pre-fill)
- [ ] Mobile responsive on all pages
- [ ] Images load optimized (WebP)
- [ ] Navigation smooth (no fade animations)

### Build Verification
```bash
npm run build
npm run start
```
Visit [http://localhost:3000](http://localhost:3000) to test production build.

### Type Safety
```bash
npm run typecheck
```

### Code Quality
```bash
npm run lint
```

## 📚 Documentation

Comprehensive documentation is available in the `/docs` folder:

| Document | Description |
|----------|-------------|
| [`PROJECT_OVERVIEW.md`](/docs/PROJECT_OVERVIEW.md) | Complete project vision, goals, and architecture |
| [`FOLDER_STRUCTURE.md`](/docs/FOLDER_STRUCTURE.md) | Detailed folder organization and conventions |
| [`DEVELOPMENT.md`](/docs/DEVELOPMENT.md) | Development setup and workflows |
| [`design/design-dna.md`](/docs/design/design-dna.md) | Complete design system specifications |
| [`adr/`](/docs/adr/) | Architecture Decision Records |

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect Repository**: Import project in Vercel dashboard
2. **Configure Environment Variables**:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
3. **Deploy**: Vercel automatically builds and deploys

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm run start
```

### Environment
- **Node.js**: 18+
- **Output**: Standalone Next.js app

## 👥 Team & Contribution

### Development Team
- **Lead Developer**: Djordje Miladinovic
- **Repository**: [github.com/djordje-miladinovic/puterina-cakes](https://github.com/djordje-miladinovic/puterina-cakes)

### Contributing
This is a private project for Puterina Cakes. For development inquiries, please contact the team.

## 📞 Contact Information

### Client (Puterina Cakes)
- **Phone**: [+381 65 379 9334](tel:+381653799334)
- **WhatsApp**: [+381 65 379 9334](https://wa.me/381653799334)
- **Viber**: +381 65 379 9334
- **Instagram**: [@puterinacakes](https://instagram.com/puterinacakes)
- **Location**: Belgrade, Serbia

---

## 📄 License

This project is private and proprietary. All rights reserved.

**© 2026 Puterina Cakes. All rights reserved.**

---

*Built with ❤️ using Next.js, Sanity, and Tailwind CSS*
