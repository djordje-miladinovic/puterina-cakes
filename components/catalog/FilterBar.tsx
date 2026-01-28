"use client"

import { useState } from "react"
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { type FilterState, type FilterCategory } from "@/lib/filters"

interface FilterBarProps {
  filters: FilterState
  filterCategories: FilterCategory[]
  onFilterChange: (category: keyof FilterState, value: string) => void
  onResetFilters: () => void
  activeFilterCount: number
}

/**
 * Filter bar component with single "Filteri" button
 * When clicked, reveals a row of dropdown filters
 * Works on both desktop and mobile
 */
export function FilterBar({
  filters,
  filterCategories,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
}: FilterBarProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-6">
      {/* Filteri button */}
      <Button
        variant="outline"
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full md:w-auto justify-center gap-2"
      >
        <SlidersHorizontal className="h-4 w-4" />
        Filteri
        {activeFilterCount > 0 && (
          <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-butter-gold text-white">
            {activeFilterCount}
          </span>
        )}
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 ml-1" />
        ) : (
          <ChevronDown className="h-4 w-4 ml-1" />
        )}
      </Button>

      {/* Dropdown filters row - shown when expanded */}
      {isExpanded && (
        <div className="mt-4 p-4 bg-soft-white border border-light-gray rounded-lg">
          <div className="flex flex-col md:flex-row md:items-end gap-4">
            {filterCategories.map((category) => (
              <div key={category.id} className="flex-1 min-w-0 md:max-w-[200px]">
                <Select
                  label={category.label}
                  options={category.options}
                  value={filters[category.id as keyof FilterState]}
                  onChange={(value) => onFilterChange(category.id as keyof FilterState, value)}
                  placeholder={`Sve`}
                />
              </div>
            ))}
            
            {/* Reset button */}
            {activeFilterCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onResetFilters}
                className="text-sm h-10 px-3 gap-1 whitespace-nowrap"
              >
                <X className="h-3 w-3" />
                Očisti sve
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Active filter tags displayed above the product grid
 * Shows which filters are currently active with option to remove individual filters
 */
interface ActiveFilterTagsProps {
  filters: FilterState
  filterCategories: FilterCategory[]
  onRemoveFilter: (category: keyof FilterState) => void
  onResetFilters: () => void
}

export function ActiveFilterTags({
  filters,
  filterCategories,
  onRemoveFilter,
  onResetFilters,
}: ActiveFilterTagsProps) {
  const activeFilters: { category: keyof FilterState; label: string }[] = []
  
  filterCategories.forEach((category) => {
    const filterValue = filters[category.id as keyof FilterState]
    if (filterValue) {
      const option = category.options.find((opt) => opt.value === filterValue)
      if (option) {
        activeFilters.push({
          category: category.id as keyof FilterState,
          label: `${category.label}: ${option.label}`,
        })
      }
    }
  })

  if (activeFilters.length === 0) return null

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {activeFilters.map(({ category, label }) => (
        <button
          key={category}
          onClick={() => onRemoveFilter(category)}
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
      {activeFilters.length > 1 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onResetFilters}
          className="text-sm h-8"
        >
          Očisti sve
        </Button>
      )}
    </div>
  )
}
