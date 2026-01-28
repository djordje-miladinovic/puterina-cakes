/**
 * Filter options for catalog page
 * 
 * IMPORTANT: These options must be kept in sync with the Sanity product schema
 * defined in sanity/schemaTypes/product.ts. If you add, remove, or modify
 * filter options here, ensure the same changes are made in the schema.
 */

export interface FilterOption {
  value: string
  label: string
}

export interface FilterCategory {
  id: string
  label: string
  options: FilterOption[]
}

/**
 * Ukus (Taste) filter options
 * Keep in sync with: sanity/schemaTypes/product.ts - 'ukus' field
 */
export const UKUS_OPTIONS: FilterOption[] = [
  { value: 'cokoladni', label: 'Čokoladni' },
  { value: 'vocni', label: 'Voćni' },
  { value: 'kremasti', label: 'Kremasti' },
  { value: 'orasasti', label: 'Orašasti' },
  { value: 'karamel', label: 'Karamel' },
]

/**
 * Prilika (Occasion) filter options
 * Keep in sync with: sanity/schemaTypes/product.ts - 'prilika' field
 */
export const PRILIKA_OPTIONS: FilterOption[] = [
  { value: 'rodjendan', label: 'Rođendan' },
  { value: 'vencanje', label: 'Venčanje' },
  { value: 'korporativno', label: 'Korporativno' },
  { value: 'praznik', label: 'Praznik' },
  { value: 'svakodnevno', label: 'Svakodnevno' },
]

/**
 * Sezona (Season) filter options
 * Keep in sync with: sanity/schemaTypes/product.ts - 'sezona' field
 */
export const SEZONA_OPTIONS: FilterOption[] = [
  { value: 'prolece', label: 'Prolećne' },
  { value: 'leto', label: 'Letnje' },
  { value: 'jesen', label: 'Jesenje' },
  { value: 'zima', label: 'Zimske / Praznične' },
  { value: 'cele-godine', label: 'Cele godine' },
]

export const FILTER_CATEGORIES: FilterCategory[] = [
  { id: 'ukus', label: 'Ukus', options: UKUS_OPTIONS },
  { id: 'prilika', label: 'Prilika', options: PRILIKA_OPTIONS },
  { id: 'sezona', label: 'Sezona', options: SEZONA_OPTIONS },
]

/**
 * Filter state for catalog page
 * 
 * @property ukus - Array of selected taste filter values (e.g., ['cokoladni', 'vocni'])
 * @property prilika - Array of selected occasion filter values (e.g., ['rodjendan'])
 * @property sezona - Array of selected season filter values (e.g., ['leto', 'cele-godine'])
 * 
 * Empty arrays indicate no filters are active for that category.
 * Multiple selections within a category use OR logic (matches any selected option).
 * Selections across categories use AND logic (must match all active categories).
 */
export type FilterState = {
  ukus: string[]
  prilika: string[]
  sezona: string[]
}

export const INITIAL_FILTER_STATE: FilterState = {
  ukus: [],
  prilika: [],
  sezona: [],
}
