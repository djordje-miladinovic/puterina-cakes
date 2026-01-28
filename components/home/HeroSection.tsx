import Image from "next/image"
import { Phone, Instagram } from "lucide-react"
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
          alt="Puterina signature torta - ručno dekorisana premium torta sa prirodnim sastojcima"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        {/* 
          Gradient overlay za bolju čitljivost teksta
          Premium look sa jačim gradientom za kontrast
        */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
      </div>

      {/* 
        CONTENT OVERLAY
        - Centriran vertikalno i horizontalno
        - Flex container za raspored elemenata
        - CTAs above the fold
      */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">
        {/* Text content - centered for premium impact */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Brand name - elegantna tipografija */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl mb-4 md:mb-6 text-white drop-shadow-lg font-semibold tracking-tight">
            Puterina
          </h1>
          
          {/* Main Tagline - komunikacija premium kvaliteta */}
          <p className="text-xl md:text-2xl lg:text-3xl text-white mb-3 md:mb-4 font-light tracking-wide drop-shadow-md">
            Torte od <span className="underline">pravih</span> sastojaka, ručno dekorisane s ljubavlju
          </p>
          
          {/* Sub-tagline - USP (Unique Selling Proposition) */}
          <p className="text-base md:text-lg lg:text-xl text-white/85 mb-8 md:mb-10 font-light tracking-wider">
            Puter krem umesto fondana • Domaće kore pečene od nule • Butik torti u srcu Beograda
          </p>
          
          {/* CTA Buttons - above the fold, minimum 44px touch target */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA - POZOVITE NAS */}
            <Button
              asChild
              size="xl"
              className="w-full sm:w-auto min-h-[48px] text-base md:text-lg px-8 md:px-10 shadow-lg hover:shadow-xl"
            >
              <a href={`tel:${CONTACT.phone}`} aria-label="Pozovite nas za Vašu porudžbinu">
                <Phone className="h-5 w-5 mr-2" />
                Naručite
              </a>
            </Button>
            
            {/* Secondary CTA - Instagram DM */}
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full sm:w-auto min-h-[48px] text-base md:text-lg px-8 md:px-10 bg-white/10 border-white/40 text-white hover:bg-white/20 hover:border-white/60 hover:text-white backdrop-blur-sm"
            >
              <a 
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pišite nam putem Instagrama"
              >
                <Instagram className="h-5 w-5 mr-2" />
                Pišite nam
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
