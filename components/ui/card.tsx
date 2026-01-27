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
 * and responsive padding (24px mobile, 32px desktop).
 */
const cardVariants = cva(
  "rounded-xl transition-all duration-200 ease-out",
  {
    variants: {
      variant: {
        // Standard card with subtle border
        base: "bg-[#FDFBF7] border border-[#E5E5E5] p-6 md:p-8 hover:shadow-lg",
        // Elevated card with shadow
        elevated: "bg-[#FDFBF7] p-6 md:p-8 shadow-md hover:shadow-xl hover:-translate-y-0.5",
        // Interactive/clickable card
        interactive: "bg-[#FDFBF7] border border-[#E5E5E5] p-6 md:p-8 cursor-pointer hover:border-[#D4A574] hover:shadow-[0_4px_12px_rgba(212,165,116,0.25)] hover:-translate-y-0.5",
        // Cream tinted for subtle sections
        cream: "bg-[#F5F0E8]/50 border border-[#E5E5E5]/30 p-5 md:p-6 hover:bg-[#F5F0E8]/80",
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
      "text-lg md:text-xl font-semibold leading-none tracking-tight text-[#8B6F4E]",
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
    className={cn("text-sm md:text-base text-[#666666]", className)}
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
