/**
 * Filter options for catalog page
 * 
 * Filter options are now managed in Sanity CMS (filterOption document type).
 * These constants serve as fallbacks when Sanity data is not available.
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
 * Sanity filter option structure
 */
export interface SanityFilterOption {
  _id: string
  category: 'ukus' | 'prilika' | 'sezona'
  value: string
  label: string
  order?: number
}

/**
 * Fallback filter options when Sanity data is not available
 */
export const FALLBACK_UKUS_OPTIONS: FilterOption[] = [
  { value: 'cokoladni', label: 'Čokoladni' },
  { value: 'vocni', label: 'Voćni' },
  { value: 'kremasti', label: 'Kremasti' },
  { value: 'orasasti', label: 'Orašasti' },
  { value: 'karamel', label: 'Karamel' },
]

export const FALLBACK_PRILIKA_OPTIONS: FilterOption[] = [
  { value: 'rodjendan', label: 'Rođendan' },
  { value: 'vencanje', label: 'Venčanje' },
  { value: 'korporativno', label: 'Korporativno' },
  { value: 'praznik', label: 'Praznik' },
  { value: 'svakodnevno', label: 'Svakodnevno' },
]

export const FALLBACK_SEZONA_OPTIONS: FilterOption[] = [
  { value: 'prolece', label: 'Prolećne' },
  { value: 'leto', label: 'Letnje' },
  { value: 'jesen', label: 'Jesenje' },
  { value: 'zima', label: 'Zimske / Praznične' },
  { value: 'cele-godine', label: 'Cele godine' },
]

export const FALLBACK_FILTER_CATEGORIES: FilterCategory[] = [
  { id: 'ukus', label: 'Ukus', options: FALLBACK_UKUS_OPTIONS },
  { id: 'prilika', label: 'Prilika', options: FALLBACK_PRILIKA_OPTIONS },
  { id: 'sezona', label: 'Sezona', options: FALLBACK_SEZONA_OPTIONS },
]

/**
 * Convert Sanity filter options to FilterCategory array
 */
export function groupFilterOptions(sanityOptions: SanityFilterOption[]): FilterCategory[] {
  const categoryMap: Record<string, FilterOption[]> = {
    ukus: [],
    prilika: [],
    sezona: [],
  }

  sanityOptions.forEach((opt) => {
    if (categoryMap[opt.category]) {
      categoryMap[opt.category].push({
        value: opt.value,
        label: opt.label,
      })
    }
  })

  const categories: FilterCategory[] = [
    { id: 'ukus', label: 'Ukus', options: categoryMap.ukus.length > 0 ? categoryMap.ukus : FALLBACK_UKUS_OPTIONS },
    { id: 'prilika', label: 'Prilika', options: categoryMap.prilika.length > 0 ? categoryMap.prilika : FALLBACK_PRILIKA_OPTIONS },
    { id: 'sezona', label: 'Sezona', options: categoryMap.sezona.length > 0 ? categoryMap.sezona : FALLBACK_SEZONA_OPTIONS },
  ]

  return categories
}

/**
 * Filter state for catalog page
 * 
 * @property ukus - Selected taste filter value (single selection with dropdown)
 * @property prilika - Selected occasion filter value (single selection with dropdown)
 * @property sezona - Selected season filter value (single selection with dropdown)
 * 
 * Empty string indicates no filter is active for that category.
 */
export type FilterState = {
  ukus: string
  prilika: string
  sezona: string
}

export const INITIAL_FILTER_STATE: FilterState = {
  ukus: '',
  prilika: '',
  sezona: '',
}
