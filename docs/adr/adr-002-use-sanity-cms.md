# ADR-002: Use Sanity CMS

## Status
Accepted

## Context
We need a Content Management System (CMS) to manage product information, including:
- Product details (name, description, price)
- Images
- Nutritional information
- Allergen data
- Ingredients

The CMS should be easy to use for non-technical staff and integrate well with Next.js.

## Decision
We will use Sanity.io as our headless CMS for the following reasons:
- Excellent TypeScript support
- Real-time collaboration
- Structured content with schemas
- Powerful query language (GROQ)
- Great Next.js integration
- Image optimization out of the box
- Generous free tier
- Studio can be customized and hosted anywhere

## Consequences

### Positive
- Content editors can manage products independently
- Real-time content updates
- Structured data ensures consistency
- Image optimization improves performance
- API-first approach enables future mobile app
- Strong TypeScript types from schemas

### Negative
- Additional service dependency
- Need to set up and configure Sanity project
- Learning curve for GROQ query language
- Cost considerations if traffic grows significantly
