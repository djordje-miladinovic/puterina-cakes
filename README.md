# Puterina Cakes

Official website for Puterina Cakes - premium confectionery products.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **CMS**: Sanity
- **Deployment**: Vercel

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production bundle
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking
- `npm run sanity:dev` - Start Sanity Studio development server
- `npm run sanity:build` - Build Sanity Studio for deployment

## Sanity Studio

The Sanity Studio is located in the `/sanity` folder and runs as a separate application.

> **Note:** The Next.js runtime Sanity client code (`client.ts`, `index.ts`) lives in `/lib/sanity`, while the Studio project (schemas, config) lives in `/sanity`.

### Starting the Studio

```bash
# Install studio dependencies (first time only)
npm run sanity:install

# Start the studio
npm run sanity:dev
```

This will start the studio at [http://localhost:3333](http://localhost:3333).

### Starting the Next.js App

```bash
npm run dev
```

This will start the Next.js app at [http://localhost:3000](http://localhost:3000).

### Environment Variables

Required environment variables (in `.env.local`):

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=uo9eeei7
NEXT_PUBLIC_SANITY_DATASET=production
```

### Verifying Studio Setup

1. Run `npm run sanity:install` (first time)
2. Run `npm run sanity:dev`
3. Open [http://localhost:3333](http://localhost:3333)
4. Log in with your Sanity account
5. Confirm "Product" document type appears in the sidebar
6. Click "Product" → you should be able to create new product documents

## Routes

- `/` - Home page
- `/katalog` - Product catalog
- `/proizvod/[slug]` - Product detail page
- `/faq` - Frequently asked questions
- `/kontakt` - Contact page

## Contact

- Phone: +381653799334
- WhatsApp: +381653799334
- Viber: +381653799334
- Instagram: [@puterinacakes](https://instagram.com/puterinacakes)
