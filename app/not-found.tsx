import Link from "next/link"

export default function NotFound() {
  return (
    <div className="section-cream flex min-h-[70vh] flex-col items-center justify-center px-4 pt-24 text-center">
      <p className="display-hero" aria-hidden>
        404
      </p>
      <h1 className="!text-2xl md:!text-3xl mt-4">
        Ova stranica se istopila kao puter.
      </h1>
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Link href="/" className="cta-primary">
          Nazad na početnu
        </Link>
        <Link href="/katalog" className="cta-outline">
          Pogledajte katalog
        </Link>
      </div>
    </div>
  )
}
