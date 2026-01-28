/**
 * Filter options for catalog page
 * These match the Sanity schema options for product filters
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

export const UKUS_OPTIONS: FilterOption[] = [
  { value: 'cokoladni', label: 'Čokoladni' },
  { value: 'vocni', label: 'Voćni' },
  { value: 'kremasti', label: 'Kremasti' },
  { value: 'orasasti', label: 'Orašasti' },
  { value: 'karamel', label: 'Karamel' },
]

export const PRILIKA_OPTIONS: FilterOption[] = [
  { value: 'rodjendan', label: 'Rođendan' },
  { value: 'vencanje', label: 'Venčanje' },
  { value: 'korporativno', label: 'Korporativno' },
  { value: 'praznik', label: 'Praznik' },
  { value: 'svakodnevno', label: 'Svakodnevno' },
]

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
