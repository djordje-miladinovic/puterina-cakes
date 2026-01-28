// Contact information - centralized constants
export const CONTACT = {
  phone: "+381653799334",
  email: "info@puterinacakes.rs",
  instagram: "https://instagram.com/puterinacakes",
  instagramHandle: "@puterinacakes",
  address: "Beograd, Srbija",
  // WhatsApp and Viber links with pre-filled message
  whatsapp: "https://wa.me/381653799334?text=Zdravo%2C%20zanima%20me%20va%C5%A1a%20ponuda%20torti%20i%20kola%C4%8Da.",
  viber: "viber://chat?number=%2B381653799334",
} as const

export const CANONICAL_BASE = "https://puterinacakes.rs"

// Navigation items
export const NAVIGATION = [
  { name: "Početna", href: "/" },
  { name: "Katalog", href: "/katalog" },
  { name: "Utisci", href: "/utisci" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/kontakt" },
] as const

// Working hours
export const WORKING_HOURS = {
  weekdays: "Ponedeljak - Petak: 9:00 - 18:00",
  saturday: "Subota: 10:00 - 16:00",
  sunday: "Nedelja: Po dogovoru",
} as const
