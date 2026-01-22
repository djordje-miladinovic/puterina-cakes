import { cn } from "@/lib/utils"

// All possible allergens
export type AllergenType = "gluten" | "milk" | "eggs" | "nuts" | "soy" | "sesame" | "peanuts"

interface AllergenIconsProps {
  /** Allergens that the product contains */
  contains: AllergenType[]
  /** Show all possible allergens with crossed-out display for those not present */
  showAll?: boolean
}

// Serbian labels for allergens
const allergenLabels: Record<AllergenType, string> = {
  gluten: "Gluten",
  milk: "Mleko",
  eggs: "Jaja",
  nuts: "Orašasti plodovi",
  soy: "Soja",
  sesame: "Susam",
  peanuts: "Kikiriki",
}

// All allergen types for display
const allAllergens: AllergenType[] = ["gluten", "milk", "eggs", "nuts", "soy", "sesame", "peanuts"]

// SVG icons for each allergen type
function GlutenIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C11.3 2 10.7 2.3 10.3 2.8L3 12L10.3 21.2C10.7 21.7 11.3 22 12 22C12.7 22 13.3 21.7 13.7 21.2L21 12L13.7 2.8C13.3 2.3 12.7 2 12 2M12 4C12.2 4 12.4 4.1 12.5 4.2L17.8 11H14V8C14 7.4 13.6 7 13 7H11C10.4 7 10 7.4 10 8V11H6.2L11.5 4.2C11.6 4.1 11.8 4 12 4M10 13H14V16C14 16.6 13.6 17 13 17H11C10.4 17 10 16.6 10 16V13M12 20C11.8 20 11.6 19.9 11.5 19.8L7.2 14H10V16C10 16.6 10.4 17 11 17H13C13.6 17 14 16.6 14 16V14H16.8L12.5 19.8C12.4 19.9 12.2 20 12 20Z"/>
    </svg>
  )
}

function MilkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M8 2V4H16V2H8M8 5L5 8V20C5 21.1 5.9 22 7 22H17C18.1 22 19 21.1 19 20V8L16 5H8M8.5 6H15.5L17.5 8H6.5L8.5 6M7 10H17V20H7V10M9 12V14H11V12H9M13 12V14H15V12H13Z"/>
    </svg>
  )
}

function EggsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 3C8.5 3 5 8.58 5 13.5C5 17.09 7.69 20 12 20C16.31 20 19 17.09 19 13.5C19 8.58 15.5 3 12 3M12 18C9.24 18 7 15.76 7 13.5C7 10.87 9.46 6 12 6C14.54 6 17 10.87 17 13.5C17 15.76 14.76 18 12 18M12 8C10.34 8 9 10.24 9 13C9 14.66 10.34 16 12 16C13.66 16 15 14.66 15 13C15 10.24 13.66 8 12 8Z"/>
    </svg>
  )
}

function NutsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.5 12A5.5 5.5 0 0 1 12 17.5A5.5 5.5 0 0 1 6.5 12A5.5 5.5 0 0 1 12 6.5A5.5 5.5 0 0 1 17.5 12M12 2A10 10 0 0 0 2 12A10 10 0 0 0 12 22A10 10 0 0 0 22 12A10 10 0 0 0 12 2M12 4A8 8 0 0 1 20 12A8 8 0 0 1 12 20A8 8 0 0 1 4 12A8 8 0 0 1 12 4Z"/>
    </svg>
  )
}

function SoyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.75 4.09L15.22 6.03L16.13 9.09L13.5 7.28L10.87 9.09L11.78 6.03L9.25 4.09L12.44 4L13.5 1L14.56 4L17.75 4.09M21.25 11L19.61 12.25L20.2 14.23L18.5 13.06L16.8 14.23L17.39 12.25L15.75 11L17.81 10.95L18.5 9L19.19 10.95L21.25 11M18.97 15.95C19.8 15.87 20.69 17.05 20.16 17.8C19.84 18.25 19.5 18.67 19.08 19.07C15.17 23 8.84 23 4.94 19.07C1.03 15.17 1.03 8.83 4.94 4.93C5.34 4.53 5.76 4.17 6.21 3.85C6.96 3.32 8.14 4.21 8.06 5.04C7.79 7.9 8.75 10.87 10.95 13.06C13.14 15.26 16.1 16.22 18.97 15.95M17.33 17.97C14.5 17.81 11.7 16.64 9.53 14.5C7.36 12.31 6.2 9.5 6.04 6.68C3.23 9.82 3.34 14.64 6.35 17.66C9.37 20.67 14.19 20.78 17.33 17.97Z"/>
    </svg>
  )
}

function PeanutsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C14.2 2 16 3.8 16 6C16 7.2 15.5 8.3 14.7 9.1L15.6 9.6C16.4 8.7 17.6 8.2 18.9 8.3C21 8.5 22.6 10.4 22.4 12.5C22.2 14.6 20.3 16.2 18.2 16C16.5 15.8 15.2 14.5 14.9 12.9L13.4 12.1C13 13 12.1 13.6 11 13.6C10.1 13.6 9.3 13.2 8.8 12.5L7.3 13.3C7.1 15 5.7 16.3 4 16.5C1.9 16.7 0 15.1 -0.2 12.9C-0.4 10.8 1.2 8.9 3.3 8.7C4.5 8.6 5.6 9.1 6.4 9.9L7.3 9.4C6.5 8.6 6 7.4 6 6C6 3.8 7.8 2 10 2C10.7 2 11.4 2.2 12 2.5C12.6 2.2 13.3 2 14 2M10 4C8.9 4 8 4.9 8 6C8 6.7 8.3 7.4 8.9 7.8L10 7.2V6C10 5.4 10.4 5 11 5C11.6 5 12 5.4 12 6V7.2L13.1 7.8C13.7 7.4 14 6.7 14 6C14 4.9 13.1 4 12 4H10M4.1 10.7C2.9 10.8 2 11.9 2.1 13.1C2.2 14.3 3.3 15.2 4.5 15.1C5.4 15 6.2 14.3 6.4 13.4L6.5 12.8L5.1 11.5L4.5 11.8C4.4 10.9 4.1 10.7 4.1 10.7M18.4 10.3C17.5 10.4 16.7 11.1 16.5 12L16.4 12.6L17.8 13.9L18.4 13.6C18.5 14.5 19.3 15.2 20.3 15.1C21.5 15 22.4 13.9 22.3 12.7C22.2 11.5 21.1 10.6 19.9 10.7L18.4 10.3Z"/>
    </svg>
  )
}

function SesameIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M7 3C4.24 3 2 5.24 2 8C2 10.76 4.24 13 7 13C9.76 13 12 10.76 12 8C12 5.24 9.76 3 7 3M7 11C5.35 11 4 9.65 4 8C4 6.35 5.35 5 7 5C8.65 5 10 6.35 10 8C10 9.65 8.65 11 7 11M17 11C14.24 11 12 13.24 12 16C12 18.76 14.24 21 17 21C19.76 21 22 18.76 22 16C22 13.24 19.76 11 17 11M17 19C15.35 19 14 17.65 14 16C14 14.35 15.35 13 17 13C18.65 13 20 14.35 20 16C20 17.65 18.65 19 17 19Z"/>
    </svg>
  )
}

// Get the icon component for an allergen type
function getAllergenIcon(type: AllergenType) {
  switch (type) {
    case "gluten":
      return GlutenIcon
    case "milk":
      return MilkIcon
    case "eggs":
      return EggsIcon
    case "nuts":
      return NutsIcon
    case "soy":
      return SoyIcon
    case "peanuts":
      return PeanutsIcon
    case "sesame":
      return SesameIcon
  }
}

export default function AllergenIcons({ contains, showAll = true }: AllergenIconsProps) {
  const allergensToShow = showAll ? allAllergens : contains
  
  if (allergensToShow.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
      {allergensToShow.map((allergen) => {
        const isPresent = contains.includes(allergen)
        const Icon = getAllergenIcon(allergen)
        
        return (
          <div
            key={allergen}
            className={cn(
              "flex flex-col items-center gap-2 p-3 rounded-lg transition-colors",
              isPresent 
                ? "bg-amber-50 border border-amber-200" 
                : "bg-muted/30 border border-transparent"
            )}
          >
            <div className="relative">
              <Icon 
                className={cn(
                  "w-8 h-8",
                  isPresent ? "text-amber-700" : "text-muted-foreground/40"
                )} 
              />
              {/* Crossed out line for allergens NOT present */}
              {!isPresent && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-0.5 bg-muted-foreground/40 rotate-45 transform" />
                </div>
              )}
            </div>
            <span 
              className={cn(
                "text-xs text-center font-medium",
                isPresent ? "text-amber-900" : "text-muted-foreground/60 line-through"
              )}
            >
              {allergenLabels[allergen]}
            </span>
          </div>
        )
      })}
    </div>
  )
}
