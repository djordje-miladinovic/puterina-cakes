"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SelectOption {
  value: string
  label: string
}

export interface SelectProps {
  options: SelectOption[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  label?: string
  className?: string
}

/**
 * Custom select/dropdown component
 * Styled to match the Puterina Cakes design system
 */
export function Select({
  options,
  value,
  onChange,
  placeholder = "Izaberite...",
  label,
  className,
}: SelectProps) {
  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className={cn("relative", className)}>
      {label && (
        <label className="block text-sm font-medium text-warm-brown mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-md border border-light-gray bg-white",
            "px-3 py-2 pr-10 text-sm text-foreground",
            "focus:outline-none focus:ring-2 focus:ring-butter-gold focus:border-butter-gold",
            "hover:border-butter-gold transition-colors duration-200",
            "cursor-pointer",
            !value && "text-muted-foreground"
          )}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none"
        />
      </div>
    </div>
  )
}
