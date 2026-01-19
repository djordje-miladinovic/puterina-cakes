# Setup Guide

This guide will help you set up the Puterina Cakes website for local development.

## Prerequisites

Ensure you have the following installed on your machine:
- **Node.js** (version 18.x or higher)
- **npm** (comes with Node.js)
- A **Sanity** account (free at [sanity.io](https://www.sanity.io/))

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/djordje-miladinovic/puterina-cakes.git
cd puterina-cakes
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Sanity CMS client

### 3. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your Sanity credentials:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
```

#### Getting Sanity Credentials

1. Go to [sanity.io](https://www.sanity.io/) and create a free account
2. Create a new project
3. Note your Project ID (found in project settings)
4. Use "production" as your dataset name (default)

### 4. Run the Development Server

```bash
npm run dev
```

The website will be available at [http://localhost:3000](http://localhost:3000)

### 5. Verify Installation

Open your browser and navigate to:
- Home: [http://localhost:3000](http://localhost:3000)
- Catalog: [http://localhost:3000/katalog](http://localhost:3000/katalog)
- FAQ: [http://localhost:3000/faq](http://localhost:3000/faq)
- Contact: [http://localhost:3000/kontakt](http://localhost:3000/kontakt)

## Available Scripts

- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npm run typecheck` - Run TypeScript type checking

## Project Structure

```
puterina-cakes/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Home page
│   ├── katalog/           # Product catalog page
│   ├── proizvod/[slug]/   # Dynamic product detail pages
│   ├── faq/               # FAQ page with accordions
│   └── kontakt/           # Contact page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Header with mobile menu
│   └── sticky-buttons.tsx # Floating CTA buttons
├── lib/                  # Utility functions
├── sanity/               # Sanity CMS configuration
│   ├── client.ts        # Sanity client setup
│   ├── image.ts         # Image URL builder
│   └── schemas/         # Content type schemas
├── docs/                # Documentation
│   ├── DEVELOPMENT.md   # Development guide
│   └── adr/            # Architecture Decision Records
├── .github/             # GitHub Actions & templates
│   └── workflows/      # CI/CD pipelines
└── public/             # Static assets
```

## Key Features

### Routes
- `/` - Home page with hero section and features
- `/katalog` - Product catalog (currently with mock data)
- `/proizvod/[slug]` - Dynamic product detail pages with nutrition info
- `/faq` - FAQ with accordion UI
- `/kontakt` - Contact page with multiple communication options

### Components
- **Header**: Responsive navigation with mobile slide-in menu
- **Sticky Buttons**: Fixed CTA buttons for Instagram, Phone, WhatsApp, and Viber
- **Product Detail**: Complete product information including allergens and nutrition

### Integrations
- **Sanity CMS**: Headless CMS for content management
- **shadcn/ui**: Beautiful, accessible UI components
- **Tailwind CSS**: Utility-first CSS framework

## Setting Up Sanity Studio (Optional)

To manage content through Sanity Studio:

1. Install Sanity CLI globally:
```bash
npm install -g @sanity/cli
```

2. Initialize Sanity in a separate directory:
```bash
sanity init
```

3. Use the schemas from `sanity/schemas/` directory
4. Deploy your studio:
```bash
sanity deploy
```

## Contact Information

Phone: +381653799334
WhatsApp: +381653799334
Viber: +381653799334
Instagram: [@puterinacakes](https://instagram.com/puterinacakes)

## Troubleshooting

### Build fails with Google Fonts error
The project uses system fonts by default to avoid external dependencies. If you want to use Google Fonts, ensure you have internet access during build.

### Sanity connection errors
Make sure your `.env` file has the correct `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` values.

### TypeScript errors
Run `npm run typecheck` to see detailed error messages.

## Next Steps

1. Set up your Sanity project and add product data
2. Replace mock data in catalog and product pages with real Sanity queries
3. Add product images to Sanity
4. Deploy to Vercel or your preferred hosting platform

For more information, see:
- [DEVELOPMENT.md](docs/DEVELOPMENT.md) - Development guidelines
- [docs/adr/](docs/adr/) - Architecture decisions
