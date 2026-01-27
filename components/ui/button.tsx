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
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        // Primary CTA - Butter Gold, consistent across all pages
        default: "bg-[#D4A574] text-white font-semibold hover:bg-[#C49464] hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(212,165,116,0.25)] active:translate-y-0 active:bg-[#B48454]",
        // Destructive - Raspberry for dangerous actions
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:-translate-y-0.5",
        // Outline - bordered style for secondary prominence
        outline:
          "border border-[#E5E5E5] bg-background text-foreground hover:bg-[#F2D7D5] hover:border-[#D4A574] hover:text-[#8B6F4E]",
        // Secondary - Blush Pink for secondary actions
        secondary:
          "bg-[#F2D7D5] text-[#8B6F4E] font-medium hover:bg-[#E8C7C5]",
        // Ghost - transparent with subtle hover
        ghost: "hover:bg-[#C5D5C5] hover:text-[#8B6F4E]",
        // Link - text link style
        link: "text-[#D4A574] underline-offset-4 hover:underline",
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
