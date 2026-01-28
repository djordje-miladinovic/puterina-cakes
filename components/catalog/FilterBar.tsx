"use client"

import { X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { FILTER_CATEGORIES, type FilterState } from "@/lib/filters"

interface FilterBarProps {
  filters: FilterState
  onFilterChange: (category: keyof FilterState, value: string) => void
  onResetFilters: () => void
  activeFilterCount: number
}

/**
 * Desktop filter bar - horizontal layout above product grid
 * Shows filter categories with checkboxes in a clean, non-cluttered design
 */
export function FilterBar({
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
}: FilterBarProps) {
  return (
    <div className="hidden md:block mb-6">
      <div className="bg-soft-white border border-light-gray rounded-lg p-4">
        <div className="flex flex-wrap items-start gap-6">
          {FILTER_CATEGORIES.map((category) => (
            <div key={category.id} className="flex flex-col gap-2">
              <span className="text-sm font-medium text-warm-brown">
                {category.label}:
              </span>
              <div className="flex flex-wrap gap-3">
                {category.options.map((option) => (
                  <Checkbox
                    key={option.value}
                    label={option.label}
                    checked={filters[category.id as keyof FilterState].includes(option.value)}
                    onChange={() => onFilterChange(category.id as keyof FilterState, option.value)}
                    className="text-sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        
        {/* Active filters summary and reset */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-light-gray">
            <span className="text-sm text-muted-foreground">
              Aktivni filteri: {activeFilterCount}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              className="text-sm h-8 px-2 gap-1"
            >
              <X className="h-3 w-3" />
              Očisti sve
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

/**
 * Active filter tags displayed above the product grid
 * Shows which filters are currently active with option to remove individual filters
 */
interface ActiveFilterTagsProps {
  filters: FilterState
  onRemoveFilter: (category: keyof FilterState, value: string) => void
  onResetFilters: () => void
}

export function ActiveFilterTags({
  filters,
  onRemoveFilter,
  onResetFilters,
}: ActiveFilterTagsProps) {
  const activeFilters: { category: keyof FilterState; value: string; label: string }[] = []
  
  FILTER_CATEGORIES.forEach((category) => {
    const categoryFilters = filters[category.id as keyof FilterState]
    categoryFilters.forEach((value) => {
      const option = category.options.find((opt) => opt.value === value)
      if (option) {
        activeFilters.push({
          category: category.id as keyof FilterState,
          value,
          label: `${category.label}: ${option.label}`,
        })
      }
    })
  })

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {activeFilters.map(({ category, value, label }) => (
        <button
          key={`${category}-${value}`}
          onClick={() => onRemoveFilter(category, value)}
          className={cn(
            "inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm",
            "bg-blush-pink text-warm-brown",
            "hover:bg-blush-pink-hover transition-colors duration-200"
          )}
        >
          {label}
          <X className="h-3 w-3" />
        </button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={onResetFilters}
        className="text-sm h-8"
      >
        Očisti sve
      </Button>
    </div>
  )
}
