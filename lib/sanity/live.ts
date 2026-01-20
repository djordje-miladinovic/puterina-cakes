import { client } from './client'

// Placeholder za Live Content API
// U budućnosti možeš dodati defineLive iz next-sanity v12+ ako je potrebno
// Za sada koristimo običan sanityFetch wrapper

export async function sanityFetch<T>({
  query,
  params = {},
}: {
  query: string
  params?: Record<string, unknown>
}): Promise<T> {
  return client.fetch<T>(query, params)
}

// Dummy SanityLive komponenta za sada
export function SanityLive() {
  return null
}

