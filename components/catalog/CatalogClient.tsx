"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product"
import { FilterBar, ActiveFilterTags } from "./FilterBar"
import { FilterDrawer } from "./FilterDrawer"
import { INITIAL_FILTER_STATE, type FilterState } from "@/lib/filters"
import { toProductCardImage, type SanityImage } from "@/lib/sanity"

interface Product {
  _id: string
  title: string
  slug: { current: string }
  pricePerKg: number
  shortDescription?: string
  primaryImage?: SanityImage
  secondaryImage?: SanityImage
  isSignature?: boolean
  ukus?: string[]
  prilika?: string[]
  sezona?: string[]
}

interface CatalogClientProps {
  products: Product[]
}

/**
 * Client-side catalog component with filtering functionality
 * Handles all filter state and product filtering logic
 */
export function CatalogClient({ products }: CatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE)

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return filters.ukus.length + filters.prilika.length + filters.sezona.length
  }, [filters])

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // If no filters are active, show all products
      if (activeFilterCount === 0) return true

      // Check each filter category - product must match at least one option in each active category
      const matchesUkus = filters.ukus.length === 0 || 
        (product.ukus && filters.ukus.some((f) => product.ukus?.includes(f)))
      
      const matchesPrilika = filters.prilika.length === 0 || 
        (product.prilika && filters.prilika.some((f) => product.prilika?.includes(f)))
      
      const matchesSezona = filters.sezona.length === 0 || 
        (product.sezona && filters.sezona.some((f) => product.sezona?.includes(f)))

      return matchesUkus && matchesPrilika && matchesSezona
    })
  }, [products, filters])

  // Toggle a filter value
  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => {
      const currentValues = prev[category]
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value]
      
      return {
        ...prev,
        [category]: newValues,
      }
    })
  }

  // Remove a single filter
  const handleRemoveFilter = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: prev[category].filter((v) => v !== value),
    }))
  }

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE)
  }

  return (
    <>
      {/* Mobile filter button */}
      <FilterDrawer
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Desktop filter bar */}
      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Active filter tags (visible on both mobile and desktop when filters are active) */}
      <ActiveFilterTags
        filters={filters}
        onRemoveFilter={handleRemoveFilter}
        onResetFilters={handleResetFilters}
      />

      {/* Product grid or no results message */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12 bg-soft-white rounded-lg border border-light-gray">
          <p className="text-lg text-muted-foreground mb-4">
            Nema proizvoda za izabrane filtere.
          </p>
          <button
            onClick={handleResetFilters}
            className="text-butter-gold hover:text-butter-gold-hover underline underline-offset-4 transition-colors duration-200"
          >
            Resetuj filtere
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              title={product.title}
              slug={product.slug.current}
              description={product.shortDescription || ""}
              pricePerKg={product.pricePerKg}
              primaryImage={toProductCardImage(product.primaryImage, product.title)}
              secondaryImage={toProductCardImage(product.secondaryImage, `${product.title} - presek`)}
            />
          ))}
        </div>
      )}

      {/* Results count */}
      {activeFilterCount > 0 && filteredProducts.length > 0 && (
        <p className="text-sm text-muted-foreground mt-4">
          Prikazano {filteredProducts.length} od {products.length} proizvoda
        </p>
      )}
    </>
  )
}
