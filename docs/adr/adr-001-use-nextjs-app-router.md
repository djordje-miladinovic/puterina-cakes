# ADR-001: Use Next.js App Router

## Status
Accepted

## Context
We need a modern, performant framework for building the Puterina Cakes website. The framework should support:
- Server-side rendering for SEO
- TypeScript for type safety
- Easy integration with CMS
- Modern React features
- File-based routing

## Decision
We will use Next.js with the App Router architecture for the following reasons:
- Native support for React Server Components
- Improved data fetching patterns with async/await
- Better file-based routing with layouts
- Built-in SEO optimization
- Excellent TypeScript support
- Large ecosystem and community support

## Consequences

### Positive
- Better SEO out of the box
- Improved performance with server components
- Simplified data fetching
- Better code organization with layouts
- Strong TypeScript integration

### Negative
- Learning curve for App Router patterns
- Need to understand client vs server components
- Some third-party libraries may not be fully compatible yet
