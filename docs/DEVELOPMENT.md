# Development Guide

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Sanity account (for CMS)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/djordje-miladinovic/puterina-cakes.git
cd puterina-cakes
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and add your Sanity project credentials.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
puterina-cakes/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with SEO
│   ├── page.tsx           # Home page
│   ├── katalog/           # Product catalog
│   ├── proizvod/[slug]/   # Product detail pages
│   ├── faq/               # FAQ page
│   └── kontakt/           # Contact page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── header.tsx        # Header with navigation
│   └── sticky-buttons.tsx # CTA buttons
├── lib/                  # Utility functions
├── sanity/               # Sanity CMS configuration
│   ├── client.ts        # Sanity client
│   ├── image.ts         # Image URL builder
│   └── schemas/         # Content schemas
├── docs/                # Documentation
│   └── adr/            # Architecture Decision Records
└── public/             # Static assets
```

## Key Technologies

- **Next.js 16**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **shadcn/ui**: Component library
- **Sanity**: Headless CMS
- **Lucide React**: Icon library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript compiler check

## Sanity Setup

1. Create a Sanity project at [sanity.io](https://www.sanity.io/)
2. Note your project ID and dataset name
3. Add them to `.env`:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
```

## Deployment

The project is configured for easy deployment on Vercel:

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables
4. Deploy

## Contact Information

For development questions, contact the team or refer to the [README](../README.md).
