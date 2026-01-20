import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: 'uo9eeei7',
  dataset: 'production',
  apiVersion: '2025-01-19',
  useCdn: true, // Set to false for server-side or if you need guaranteed fresh data
})

