import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Button variants following Design DNA specifications:
 * - Primary: Butter Gold (#D4A574) for main CTAs
 * - Secondary: Blush Pink (#F2D7D5) for secondary actions
 * - Outline: Bordered style for less prominent actions
 * - Ghost: Transparent with hover state
 * - Link: Text link style
 * 
 * All hover effects use GPU-accelerated transforms (translateY, scale)
 * with max 300ms transitions as per motion rules.
 * 
 * Colors reference design tokens from globals.css for consistency.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA - Butter Gold, consistent across all pages
        default: "bg-butter-gold text-white font-semibold hover:bg-butter-gold-hover hover:-translate-y-0.5 hover:shadow-[var(--shadow-butter)] active:translate-y-0 active:bg-[#B48454]",
        // Destructive - Raspberry for dangerous actions
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
        // Outline - bordered style for secondary prominence
        outline:
          "border border-light-gray bg-background text-foreground hover:bg-blush-pink hover:border-butter-gold hover:text-warm-brown",
        // Secondary - Blush Pink for secondary actions
        secondary:
          "bg-blush-pink text-warm-brown font-medium hover:bg-blush-pink-hover",
        // Ghost - transparent with subtle hover
        ghost: "hover:bg-pistachio hover:text-warm-brown",
        // Link - text link style
        link: "text-butter-gold underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-12 rounded-md px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
