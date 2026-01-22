import Image from "next/image"
import Link from "next/link"
import { Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen">
      {/* 
        FULL-SCREEN HERO IMAGE
        - Slika pokriva ceo viewport (100vw × 100vh minimum)
        - object-cover osigurava da slika ispunjava prostor bez deformacije
        - Na svim uređajima: slika ide od ivice do ivice ekrana
      */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-placeholder.svg"
          alt="Puterina signature torta - pistaci-malina"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* 
          Gradient overlay za bolju čitljivost teksta
          Koristi se subtilni gradient od dna ka gore
        */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
      </div>

      {/* 
        CONTENT OVERLAY
        - Pozicioniran preko slike
        - Centriran vertikalno i horizontalno
        - Flex container za raspored elemenata
      */}
      <div className="relative z-10 flex flex-col items-center justify-end min-h-screen pb-24 md:pb-32 px-4">
        {/* Text content - positioned at bottom for premium look */}
        <div className="text-center max-w-3xl mx-auto">
          {/* Headline - bela boja za kontrast na tamnom overlay-u */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl mb-4 md:mb-6 text-white drop-shadow-lg font-semibold tracking-tight">
            Puterina
          </h1>
          
          {/* Tagline */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-2 md:mb-3 font-light tracking-wide">
            Butik torti iz srca Beograda
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {/* Primary CTA - Phone call */}
            <Button 
              asChild 
              size="lg" 
              className="gap-2 bg-white text-warm-brown hover:bg-white/90 border-0 px-8 py-6 text-base font-medium"
            >
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="h-4 w-4" />
                Kontakt
              </a>
            </Button>
            
            {/* Secondary CTA - Catalog link */}
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white/80 text-white hover:bg-white/10 hover:text-white px-8 py-6 text-base font-medium"
            >
              <Link href="/katalog">
                Katalog
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* 
        Scroll indicator - animiran chevron
        Pozicioniran na dnu ekrana
      */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="h-8 w-8 md:h-10 md:w-10 text-white/70" />
        <span className="sr-only">Skrolujte nadole</span>
      </div>
    </section>
  )
}
