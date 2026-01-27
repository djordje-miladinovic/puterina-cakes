"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, Phone, Instagram } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { NAVIGATION, CONTACT } from "@/lib/constants"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()
  
  // Proveri da li je homepage - header će biti transparentan samo na homepage-u
  const isHomepage = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      // Header postaje čvrst nakon 100px skrolovanja
      setIsScrolled(window.scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    // Proveri početno stanje
    handleScroll()
    
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Na homepage-u: transparentan dok nije skrolovan, beli tekst
  // Na ostalim stranicama: uvek sa pozadinom
  const headerClasses = cn(
    "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
    {
      // Homepage - nije skrolovan: transparentan
      "bg-transparent border-transparent": isHomepage && !isScrolled,
      // Homepage - skrolovan ili ostale stranice: sa pozadinom
      "bg-background/95 backdrop-blur-md border-b border-border shadow-sm": !isHomepage || isScrolled,
    }
  )

  const textClasses = cn(
    "transition-colors duration-300",
    {
      // Beli tekst na transparentnom headeru (homepage, nije skrolovan)
      "text-white hover:text-white/80": isHomepage && !isScrolled,
      // Normalni tekst
      "text-foreground hover:text-primary": !isHomepage || isScrolled,
    }
  )

  const logoClasses = cn(
    "text-xl font-bold transition-colors duration-300",
    {
      "text-white": isHomepage && !isScrolled,
      "text-foreground": !isHomepage || isScrolled,
    }
  )

  return (
    <header className={headerClasses}>
      <div className="container mx-auto px-4">
        <div className="flex h-16 md:h-20 items-center justify-between">
          <Link href="/" className={logoClasses}>
            Puterina Cakes
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide uppercase",
                  textClasses
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA Section - Instagram + Call */}
          <div className="hidden md:flex items-center gap-4">
            {/* Instagram Link */}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Posetite nas na Instagramu"
              className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200 hover:scale-110",
                isHomepage && !isScrolled 
                  ? "text-white hover:bg-white/20" 
                  : "text-foreground hover:bg-secondary"
              )}
            >
              <Instagram className="h-5 w-5" />
            </a>
            
            {/* Primary CTA - POZOVITE - Using Button component for consistency */}
            <Button
              asChild
              size="lg"
            >
              <a href={`tel:${CONTACT.phone}`} aria-label="Pozovite nas">
                <Phone className="h-4 w-4 mr-2" />
                POZOVITE
              </a>
            </Button>
          </div>

          {/* Mobile: CTA + Menu */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Primary CTA - POZOVITE - Using Button component for consistency */}
            <Button
              asChild
              size="sm"
            >
              <a href={`tel:${CONTACT.phone}`} aria-label="Pozovite nas">
                <Phone className="h-4 w-4" />
              </a>
            </Button>
            
            {/* Mobile Menu */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  aria-label="Otvori meni"
                  className={cn(
                    "transition-colors",
                    isHomepage && !isScrolled ? "text-white hover:text-white/80 hover:bg-white/10" : ""
                  )}
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-md transform-gpu">
                <DialogHeader>
                  <DialogTitle>Meni</DialogTitle>
                </DialogHeader>
                <nav className="flex flex-col gap-4 mt-4">
                  {NAVIGATION.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary py-2"
                    >
                      {item.name}
                    </Link>
                  ))}
                  
                  {/* Divider */}
                  <div className="border-t border-border my-2" />
                  
                  {/* Instagram Link in Mobile Menu */}
                  <a
                    href={CONTACT.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary py-2"
                  >
                    <Instagram className="h-5 w-5 text-pink-500" />
                    Instagram
                  </a>
                  
                  {/* Call Link in Mobile Menu */}
                  <a
                    href={`tel:${CONTACT.phone}`}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 text-lg font-medium transition-colors hover:text-primary py-2"
                  >
                    <Phone className="h-5 w-5 text-primary" />
                    Pozovite nas
                  </a>
                </nav>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  )
}
