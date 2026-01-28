"use client"

import { useState, useMemo } from "react"
import { ProductCard } from "@/components/product"
import { FilterBar, ActiveFilterTags } from "./FilterBar"
import { INITIAL_FILTER_STATE, type FilterState, type FilterCategory } from "@/lib/filters"
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
  filterCategories: FilterCategory[]
}

/**
 * Create a lookup map for filter options (category -> value -> label)
 * This is more efficient than repeated array.find operations
 */
function createFilterLookup(filterCategories: FilterCategory[]): Map<string, Map<string, string>> {
  const lookup = new Map<string, Map<string, string>>()
  
  filterCategories.forEach(category => {
    const optionMap = new Map<string, string>()
    category.options.forEach(option => {
      optionMap.set(option.value, option.label)
    })
    lookup.set(category.id, optionMap)
  })
  
  return lookup
}

/**
 * Convert filter values to human-readable tag labels
 * Uses a lookup map for efficient label resolution
 */
function getTagLabels(
  product: Product, 
  filterLookup: Map<string, Map<string, string>>
): string[] {
  const tags: string[] = []
  
  // Get labels for ukus values
  const ukusLookup = filterLookup.get('ukus')
  if (ukusLookup && product.ukus) {
    product.ukus.forEach(value => {
      const label = ukusLookup.get(value)
      if (label) tags.push(label)
    })
  }
  
  // Get labels for prilika values
  const prilikaLookup = filterLookup.get('prilika')
  if (prilikaLookup && product.prilika) {
    product.prilika.forEach(value => {
      const label = prilikaLookup.get(value)
      if (label) tags.push(label)
    })
  }
  
  // Get labels for sezona values
  const sezonaLookup = filterLookup.get('sezona')
  if (sezonaLookup && product.sezona) {
    product.sezona.forEach(value => {
      const label = sezonaLookup.get(value)
      if (label) tags.push(label)
    })
  }
  
  return tags
}

/**
 * Client-side catalog component with filtering functionality
 * Handles all filter state and product filtering logic
 */
export function CatalogClient({ products, filterCategories }: CatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE)

  // Create memoized lookup map for efficient tag label resolution
  const filterLookup = useMemo(() => createFilterLookup(filterCategories), [filterCategories])

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0
    if (filters.ukus) count++
    if (filters.prilika) count++
    if (filters.sezona) count++
    return count
  }, [filters])

  // Filter products based on selected filters
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // If no filters are active, show all products
      if (activeFilterCount === 0) return true

      // Check each filter category - product must match the selected option
      const matchesUkus = !filters.ukus || 
        (product.ukus && product.ukus.includes(filters.ukus))
      
      const matchesPrilika = !filters.prilika || 
        (product.prilika && product.prilika.includes(filters.prilika))
      
      const matchesSezona = !filters.sezona || 
        (product.sezona && product.sezona.includes(filters.sezona))

      return matchesUkus && matchesPrilika && matchesSezona
    })
  }, [products, filters, activeFilterCount])

  // Set a filter value (single selection with dropdown)
  const handleFilterChange = (category: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: value,
    }))
  }

  // Remove a single filter
  const handleRemoveFilter = (category: keyof FilterState) => {
    setFilters((prev) => ({
      ...prev,
      [category]: '',
    }))
  }

  // Reset all filters
  const handleResetFilters = () => {
    setFilters(INITIAL_FILTER_STATE)
  }

  return (
    <>
      {/* Single Filteri button with dropdown filters */}
      <FilterBar
        filters={filters}
        filterCategories={filterCategories}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Active filter tags */}
      <ActiveFilterTags
        filters={filters}
        filterCategories={filterCategories}
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
              tags={getTagLabels(product, filterLookup)}
              isSignature={product.isSignature}
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
