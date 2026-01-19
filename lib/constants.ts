// Contact information - centralized constants
export const CONTACT = {
  phone: "+381653799334",
  email: "info@puterinacakes.rs",
  instagram: "https://instagram.com/puterinacakes",
  instagramHandle: "@puterinacakes",
  address: "Beograd, Srbija",
} as const

export const CANONICAL_BASE = "https://puterinacakes.rs"

// Navigation items
export const NAVIGATION = [
  { name: "Početna", href: "/" },
  { name: "Katalog", href: "/katalog" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
] as const

// Working hours
export const WORKING_HOURS = {
  weekdays: "Ponedeljak - Petak: 9:00 - 18:00",
  saturday: "Subota: 10:00 - 16:00",
  sunday: "Nedelja: Po dogovoru",
} as const
