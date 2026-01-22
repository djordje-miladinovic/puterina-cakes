import Image from "next/image"
import Link from "next/link"
import { Phone, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT } from "@/lib/constants"

export default function HeroSection() {
  return (
    <section className="relative min-h-[50vh] md:min-h-[80vh] flex flex-col items-center justify-center overflow-hidden">
      {/* Background with warm cream texture */}
      <div className="absolute inset-0 bg-cream bg-paper-texture -z-10" />
      
      {/* Decorative watercolor accent */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] opacity-30 -z-5 pointer-events-none">
        <Image
          src="/textures/watercolor-accent.svg"
          alt=""
          fill
          className="object-contain"
          aria-hidden="true"
        />
      </div>
      
      {/* Main content container */}
      <div className="container mx-auto px-4 py-8 md:py-16 flex flex-col items-center text-center">
        {/* Signature cake image - full bleed style */}
        <div className="relative w-full max-w-2xl aspect-[3/2] mb-8 md:mb-12">
          <Image
            src="/images/hero-placeholder.svg"
            alt="Puterina signature torta - pistać-malina"
            fill
            priority
            className="object-contain drop-shadow-xl"
            sizes="(max-width: 768px) 100vw, 672px"
          />
        </div>
        
        {/* Text overlay box with rounded corners */}
        <div className="bg-soft-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg max-w-xl">
          {/* Headline */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
            Puterina — butik torti iz srca Beograda
          </h1>
          
          {/* Description - using "Vi" addressing */}
          <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-8 leading-relaxed">
            Vaša posebna prilika zaslužuje posebnu tortu. Ručno pravimo premium 
            torte sa najfinijim sastojcima i puno ljubavi.
          </p>
          
          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            {/* Primary CTA - Phone call */}
            <Button asChild size="lg" className="gap-2">
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="h-4 w-4" />
                Pozovite
              </a>
            </Button>
            
            {/* Secondary CTA - Catalog link */}
            <Button asChild variant="outline" size="lg">
              <Link href="/katalog">
                Pogledajte Katalog →
              </Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-warm-brown/60" />
        <span className="sr-only">Skrolujte nadole</span>
      </div>
    </section>
  )
}
