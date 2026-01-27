import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Card component variants following Design DNA specifications:
 * - base: Standard card with border
 * - elevated: Card with shadow for prominence
 * - interactive: Clickable card with hover effects
 * - cream: Subtle cream-tinted card for sections
 * 
 * All variants use consistent border-radius (--radius-lg = 12px)
 * and responsive padding (p-6 = 24px mobile, p-8 = 32px desktop).
 * Note: cream variant uses p-5/p-6 for tighter spacing in nested contexts.
 */
const cardVariants = cva(
  "rounded-xl transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // Standard card with subtle border - uses design tokens
        base: "bg-soft-white border border-light-gray p-6 md:p-8 hover:shadow-lg",
        // Elevated card with shadow
        elevated: "bg-soft-white p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-0.5",
        // Interactive/clickable card with butter-gold hover
        interactive: "bg-soft-white border border-light-gray p-6 md:p-8 cursor-pointer hover:border-butter-gold hover:shadow-[var(--shadow-butter)] hover:-translate-y-0.5",
        // Cream tinted for subtle sections (smaller padding for nested contexts)
        cream: "bg-cream/50 border border-light-gray/30 p-5 md:p-6 hover:bg-cream/80",
        // Ghost card - minimal styling
        ghost: "p-6 md:p-8",
      },
    },
    defaultVariants: {
      variant: "base",
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(cardVariants({ variant, className }))}
        {...props}
      />
    )
  }
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 pb-4 md:pb-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-lg md:text-xl font-semibold leading-none tracking-tight text-warm-brown",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm md:text-base text-medium-gray", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center pt-4 md:pt-6", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants }
