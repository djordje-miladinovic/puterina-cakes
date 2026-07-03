import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** "3700" → "3.700" (sr-RS format za cene u RSD) */
export function formatPrice(value: number): string {
  return new Intl.NumberFormat("sr-RS").format(value)
}
