import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"

/**
 * Globalni 404 — renderuje se u ROOT layoutu (van (site) grupe),
 * pa Header/Footer uvozi direktno da stranica ne ostane bez školjke.
 */
export default function NotFound() {
  return (
    <>
      <Header />
      <div className="section-cream flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="display-hero" aria-hidden>
        404
      </p>
      <h1 className="!text-2xl md:!text-3xl mt-4">
        Ova stranica se istopila kao puter.
      </h1>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        {/* Mobilni: outline — malina nosi samo sticky „Poručite" */}
        <Link href="/" className="cta-outline sm:hidden">
          Nazad na početnu
        </Link>
        <Link href="/" className="cta-primary hidden sm:inline-flex">
          Nazad na početnu
        </Link>
        <Link href="/katalog" className="cta-outline">
          Pogledajte katalog
        </Link>
      </div>
      </div>
      <Footer />
    </>
  )
}
