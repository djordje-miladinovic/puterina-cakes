import Image from "next/image"

export default function AboutUsSection() {
  return (
    <section
      className="py-16 md:py-20 lg:py-24 section-textured overflow-hidden"
      aria-label="O nama"
    >
      <div className="container mx-auto px-4">
        {/* Main content box */}
        <div className="bg-soft-white rounded-2xl md:rounded-3xl p-8 md:p-12 lg:p-16 border border-light-gray/50 relative">
          {/* Decorative nut sketch in background */}
          <div
            className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl md:rounded-3xl"
            aria-hidden="true"
          >
            <div
              className="absolute -left-10 md:-left-5 top-1/2 -translate-y-1/2 w-[200px] md:w-[280px] lg:w-[320px] h-[200px] md:h-[280px] lg:h-[320px] opacity-40"
              style={{
                backgroundImage: "url('/textures/nut-sketch.svg')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              }}
            />
          </div>

          {/* Grid layout: image left, text right */}
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center relative z-10">
            {/* Image container */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/about-placeholder.svg"
                  alt="Puterina - domaći puteri od orašastih plodova, ručno pravljeni sa ljubavlju"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                />
              </div>
            </div>

            {/* Text content */}
            <div className="order-1 lg:order-2">
              {/* Section header */}
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
                  O nama
                </h2>
                <div className="w-16 h-1 bg-butter-gold rounded-full" />
              </div>

              {/* Brand story */}
              <div className="space-y-4 md:space-y-5">
                <p className="text-base md:text-lg text-charcoal leading-relaxed">
                  <strong className="text-warm-brown">Puterina</strong> je nastala iz ljubavi prema zdravoj ishrani 
                  i želje da svaki zalogaj bude čist, prirodan i ukusan. Sve je počelo u mojoj kuhinji, 
                  sa jednostavnom idejom — napraviti puter od orašastih plodova kakav se ne može kupiti u prodavnicama.
                </p>

                <p className="text-base md:text-lg text-charcoal leading-relaxed">
                  Danas, svaka tegla Puterine je <em className="text-warm-brown">ručno pravljena sa ljubavlju</em>, 
                  bez ikakvih aditiva, konzervansa ili dodatog šećera. Koristim samo najkvalitetnije 
                  orašaste plodove, pažljivo odabrane i pržene do savršenstva.
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed italic">
                  Moja misija je jednostavna: doneti Vam ukus pravog, domaćeg putera — onakav kakav je nekada bio.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 md:mt-8 pt-6 border-t border-light-gray/50">
                <p className="text-sm md:text-base text-warm-brown font-medium">
                  Sa ljubavlju,
                </p>
                <p className="text-lg md:text-xl text-warm-brown font-semibold mt-1">
                  Vaša Puterina
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
