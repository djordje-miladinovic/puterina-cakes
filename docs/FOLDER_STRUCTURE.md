# Folder Structure - Puterina Cakes

This document outlines the recommended agency folder structure for the Puterina Cakes project, following Next.js 16 App Router best practices and Sanity CMS integration patterns.

## Overview

```
puterina-cakes/
├── .github/              # GitHub configuration and workflows
├── .next/               # Next.js build output (ignored in git)
├── app/                 # Next.js App Router pages and layouts
├── components/          # React components
├── docs/                # Project documentation
├── lib/                 # Utility functions and helpers
├── node_modules/        # Dependencies (ignored in git)
├── public/              # Static assets
├── references/          # Design references and client requirements
├── sanity/              # Sanity CMS configuration
├── .env.example         # Environment variables template
├── .env.local           # Local environment variables (ignored in git)
├── .gitignore           # Git ignore rules
├── components.json      # shadcn/ui configuration
├── eslint.config.mjs    # ESLint configuration
├── next.config.ts       # Next.js configuration
├── package.json         # Project dependencies and scripts
├── postcss.config.mjs   # PostCSS configuration
├── README.md            # Project readme
├── sanity.cli.ts        # Sanity CLI configuration
├── sanity.config.ts     # Sanity Studio configuration
├── tailwind.config.ts   # Tailwind CSS configuration (if exists)
└── tsconfig.json        # TypeScript configuration
```

## Folder Descriptions

### `.github/` - GitHub Configuration

Contains GitHub-specific configuration files, templates, and automation.

```
.github/
├── ISSUE_TEMPLATE/           # Issue templates
│   ├── bug_report.md        # Bug report template
│   └── feature_request.md   # Feature request template
├── workflows/                # GitHub Actions workflows
│   └── ci.yml               # Continuous Integration workflow
└── pull_request_template.md # Pull request template
```

**Purpose**: 
- Standardize issue reporting
- Automate testing and deployment
- Enforce code quality standards

### `app/` - Next.js Pages (App Router)

Contains all application pages using Next.js 16 App Router pattern.

```
app/
├── (routes)/
│   ├── katalog/              # Product catalog page
│   │   └── page.tsx
│   ├── kontakt/              # Contact page
│   │   └── page.tsx
│   ├── faq/                  # FAQ page
│   │   └── page.tsx
│   └── proizvod/             # Product detail pages
│       └── [slug]/
│           └── page.tsx
├── studio/                   # Sanity Studio embedded route
│   ├── [[...tool]]/
│   │   └── page.tsx
│   └── layout.tsx
├── favicon.ico              # Site favicon
├── globals.css              # Global styles
├── layout.tsx               # Root layout (SEO, fonts, providers)
├── loading.tsx              # Loading UI
├── not-found.tsx            # 404 page
├── page.tsx                 # Home page
├── robots.ts                # Robots.txt generation
└── sitemap.ts               # Sitemap generation
```

**Conventions**:
- Each route is a folder with a `page.tsx` file
- `layout.tsx` for shared layouts
- `loading.tsx` for loading states
- `error.tsx` for error boundaries
- Dynamic routes use `[param]` syntax

### `components/` - React Components

Reusable React components organized by type.

```
components/
├── ui/                      # shadcn/ui components (auto-generated)
│   ├── accordion.tsx
│   ├── button.tsx
│   ├── dialog.tsx
│   └── ...
├── footer.tsx               # Site footer
├── header.tsx               # Site header with navigation
├── sticky-buttons.tsx       # Fixed contact buttons
└── [feature-components].tsx # Other feature components
```

**Conventions**:
- `ui/` folder for shadcn/ui components (auto-managed)
- Top-level for custom feature components
- Component names in PascalCase
- Each component is self-contained with styles

**Future Organization** (as project grows):
```
components/
├── ui/           # Base UI components
├── layout/       # Layout components (header, footer, nav)
├── product/      # Product-related components
├── contact/      # Contact-related components
└── common/       # Shared components
```

### `docs/` - Documentation

Project documentation, design specifications, and architecture decisions.

```
docs/
├── adr/                        # Architecture Decision Records
│   ├── README.md              # ADR index
│   ├── adr-001-use-nextjs-app-router.md
│   └── adr-002-use-sanity-cms.md
├── design/                     # Design specifications
│   └── design-dna.md          # Complete design system
├── DEVELOPMENT.md              # Development setup guide
├── FOLDER_STRUCTURE.md         # This file
└── PROJECT_OVERVIEW.md         # Project overview and vision
```

**Purpose**:
- Architectural decisions and rationale
- Design system and style guide
- Development workflows
- Onboarding documentation

### `lib/` - Utilities and Helpers

Utility functions, helpers, and shared logic.

```
lib/
├── sanity/               # Sanity client utilities
│   ├── client.ts        # Sanity client configuration
│   ├── index.ts         # Sanity exports
│   └── live.ts          # Live preview utilities
├── constants.ts         # Application constants
└── utils.ts             # Shared utility functions
```

**Conventions**:
- Pure functions when possible
- TypeScript type definitions included
- Each file has a single responsibility
- Commonly used utilities are exported from index

**Future Organization**:
```
lib/
├── sanity/          # Sanity-related utilities
├── validations/     # Form validation schemas
├── formatters/      # Data formatting utilities
├── helpers/         # General helper functions
└── hooks/           # Custom React hooks (if needed)
```

### `public/` - Static Assets

Static files served directly by Next.js.

```
public/
├── images/              # Static images (if any)
├── textures/            # Background textures
│   ├── paper-light.png
│   └── watercolor-subtle.png
├── fonts/               # Custom fonts (if not using Google Fonts)
├── file.svg            # Default Next.js icons (can be removed)
├── globe.svg
├── next.svg
├── vercel.svg
└── window.svg
```

**Conventions**:
- Images are typically managed by Sanity CMS
- Only static, rarely-changing assets go here
- Optimize all images (WebP format, < 100KB for textures)
- Accessible at `/filename.ext` in the application

**Note**: Product images should be uploaded to Sanity CMS, not stored here.

### `references/` - Design References

Client requirements, design references, and inspiration.

```
references/
├── pitanja-i-odgovori.ini  # Client Q&A and requirements
└── reference.yaml          # Website references and inspiration
```

**Purpose**:
- Document client requirements
- Track design inspiration sources
- Reference during development
- Maintain project context

### `sanity/` - Sanity CMS Configuration

Sanity Studio configuration and content schemas.

```
sanity/
├── schemaTypes/              # Content type definitions
│   ├── index.ts             # Schema exports
│   ├── product.ts           # Product schema
│   ├── faq.ts               # FAQ schema (future)
│   └── testimonial.ts       # Testimonial schema (future)
└── plugins/                  # Custom Sanity plugins (if needed)
```

**Conventions**:
- Each content type in its own file
- Export all schemas from `index.ts`
- Follow Sanity naming conventions
- Include validation rules

**Schema Organization**:
- `product.ts` - Cake and pastry products
- `faq.ts` - Frequently asked questions
- `category.ts` - Product categories
- `testimonial.ts` - Customer testimonials
- `siteSettings.ts` - Global site settings

### Configuration Files

#### `components.json`
shadcn/ui configuration for component installation and customization.

#### `eslint.config.mjs`
ESLint rules for code quality and consistency.

#### `next.config.ts`
Next.js configuration including:
- Image optimization settings
- Redirects and rewrites
- Environment variables
- Build optimization

#### `package.json`
Project metadata, dependencies, and npm scripts:
- `dev` - Development server
- `build` - Production build
- `start` - Production server
- `lint` - Run linting
- `typecheck` - TypeScript checking

#### `postcss.config.mjs`
PostCSS configuration for Tailwind CSS processing.

#### `sanity.cli.ts` & `sanity.config.ts`
Sanity CLI and Studio configuration.

#### `tsconfig.json`
TypeScript compiler options and path aliases.

## File Naming Conventions

### React Components
- **PascalCase**: `ProductCard.tsx`, `StickyButtons.tsx`
- **Exception**: Next.js special files use lowercase: `page.tsx`, `layout.tsx`

### Utilities and Helpers
- **camelCase**: `formatPrice.ts`, `validateEmail.ts`

### Documentation
- **UPPERCASE**: `README.md`, `DEVELOPMENT.md`
- **kebab-case**: `adr-001-use-nextjs.md`, `design-dna.md`

### CSS and Styles
- **kebab-case**: `globals.css`, `product-card.module.css`

## Environment Variables

```env
# Required
NEXT_PUBLIC_SANITY_PROJECT_ID=uo9eeei7
NEXT_PUBLIC_SANITY_DATASET=production

# Optional
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=<for-write-operations>
```

**Files**:
- `.env.example` - Template (committed to git)
- `.env.local` - Local development (ignored in git)
- `.env.production` - Production settings (Vercel)

## Ignored Folders and Files

The following are ignored in `.gitignore`:

```
# Dependencies
node_modules/
.pnp
.pnp.js

# Build output
.next/
out/
build/
dist/

# Environment variables
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Testing
coverage/
.nyc_output/

# Sanity
.sanity/
```

## Best Practices

### 1. Component Organization
- Keep components small and focused
- Extract reusable logic to hooks or utilities
- Co-locate related files (component + styles + tests)

### 2. Import Aliases
Use path aliases defined in `tsconfig.json`:
```typescript
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { client } from "@/lib/sanity/client"
```

### 3. Documentation
- Document complex logic with comments
- Keep README files up to date
- Use ADRs for architectural decisions
- Maintain design system documentation

### 4. Asset Management
- Product images → Sanity CMS
- Static assets → `/public`
- Icons → Lucide React library
- Fonts → Google Fonts or `/public/fonts`

## Scalability Considerations

As the project grows, consider:

### Additional Folders
```
├── middleware/       # Next.js middleware for auth, redirects
├── types/           # Shared TypeScript types
├── hooks/           # Custom React hooks
├── contexts/        # React context providers
├── services/        # API service layers
└── tests/           # Testing utilities and fixtures
```

### Component Sub-Organization
```
components/
├── ui/              # Base components
├── features/        # Feature-specific components
│   ├── products/
│   ├── contact/
│   └── testimonials/
├── layouts/         # Layout components
└── shared/          # Shared utilities
```

## Migration Path

If additional structure is needed:

1. **Add new folders** as requirements emerge
2. **Maintain consistency** with existing patterns
3. **Document changes** in this file
4. **Update imports** using path aliases
5. **Communicate changes** to team

## References

- [Next.js Project Structure](https://nextjs.org/docs/getting-started/project-structure)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Sanity Project Structure](https://www.sanity.io/docs/project-structure)
- [TypeScript Project Structure](https://www.typescriptlang.org/docs/handbook/project-references.html)

---

*Document created: January 2026*  
*Last updated: January 2026*  
*Version: 1.0*
