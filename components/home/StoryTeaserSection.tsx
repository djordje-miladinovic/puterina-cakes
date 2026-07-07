import Image from "next/image"
import Link from "next/link"
import Reveal from "@/components/reveal"
import { SITE } from "@/lib/constants"

/**
 * „Ja sam Katarina" teaser (mockup v6-1): pravougaona fotografija +
 * tekst u 1. licu sa imenom i rukopisnim potpisom. Bez blob formi.
 */
export default function StoryTeaserSection() {
  return (
    <section className="section-block section-tint" aria-labelledby="prica-naslov">
      <div className="container-site grid items-center gap-8 md:grid-cols-2 md:gap-16">
        <Reveal>
          <div className="img-frame relative aspect-[4/5]">
            <Image
              src="/images/site/prica.jpg"
              alt="Torta iz Puterina radionice — Puterina, butik torti Beograd"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="puterina-img object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={1}>
          <span className="label mb-4 block">Priča</span>
          <h2 id="prica-naslov">Ja sam Katarina</h2>
          <p className="body mt-5 max-w-[42ch] text-ink-muted">
            Puterina je nastala u mojoj kuhinji — tortom za najdraže. Danas je
            butik torti u Beogradu, u kome i dalje sve prolazi kroz moje ruke.
          </p>
          <p className="body mt-4 max-w-[42ch] text-ink-muted">
            Pravi puter, prave maline i noć u kojoj torta mirno spava u
            frižideru. Prečica nema.
          </p>
          <div className="mt-7 flex flex-col items-start gap-6">
            <Link href="/o-meni" className="tlink">
              Moja priča
            </Link>
            <span className="accent-script" aria-hidden>
              {SITE.ownerName}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
