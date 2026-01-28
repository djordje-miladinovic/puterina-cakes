"use client"

import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, ...props }, ref) => {
    const inputId = id || React.useId()
    
    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex items-center gap-2 cursor-pointer select-none",
          "text-sm text-foreground hover:text-warm-brown transition-colors duration-200",
          className
        )}
      >
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            ref={ref}
            id={inputId}
            checked={checked}
            className="peer sr-only"
            {...props}
          />
          <div
            className={cn(
              "h-5 w-5 rounded border border-light-gray bg-white flex items-center justify-center",
              "transition-all duration-200 ease-out",
              "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
              checked ? "bg-butter-gold border-butter-gold" : "peer-hover:border-butter-gold"
            )}
          >
            <Check
              className={cn(
                "h-3.5 w-3.5 text-white transition-opacity duration-200",
                checked ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>
        {label && <span>{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
