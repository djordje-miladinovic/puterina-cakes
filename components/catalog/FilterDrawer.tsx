"use client"

import { useState } from "react"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { FILTER_CATEGORIES, type FilterState } from "@/lib/filters"

interface FilterDrawerProps {
  filters: FilterState
  onFilterChange: (category: keyof FilterState, value: string) => void
  onResetFilters: () => void
  activeFilterCount: number
}

/**
 * Mobile filter drawer/modal
 * Opens as a full-screen modal on mobile with all filter options
 */
export function FilterDrawer({
  filters,
  onFilterChange,
  onResetFilters,
  activeFilterCount,
}: FilterDrawerProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="md:hidden mb-4">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full justify-center gap-2"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filteri
            {activeFilterCount > 0 && (
              <span className="ml-1 px-2 py-0.5 text-xs rounded-full bg-butter-gold text-white">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="h-[100dvh] max-h-[100dvh] w-full max-w-full sm:max-w-full rounded-none flex flex-col">
          <DialogHeader className="border-b border-light-gray pb-4">
            <DialogTitle className="text-xl font-semibold text-warm-brown">
              Filteri
            </DialogTitle>
            <DialogDescription className="sr-only">
              Izaberite filtere za pretragu proizvoda
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto py-4 space-y-6">
            {FILTER_CATEGORIES.map((category) => (
              <div key={category.id} className="space-y-3">
                <h3 className="text-base font-medium text-warm-brown">
                  {category.label}
                </h3>
                <div className="space-y-2">
                  {category.options.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={filters[category.id as keyof FilterState].includes(option.value)}
                      onChange={() => onFilterChange(category.id as keyof FilterState, option.value)}
                      className="py-2"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <DialogFooter className="border-t border-light-gray pt-4 flex-row gap-3">
            {activeFilterCount > 0 && (
              <Button
                variant="outline"
                onClick={onResetFilters}
                className="flex-1"
              >
                Očisti ({activeFilterCount})
              </Button>
            )}
            <DialogClose asChild>
              <Button className="flex-1">
                Primeni
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
