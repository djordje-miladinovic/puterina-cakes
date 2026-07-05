import Image from "next/image"
import { Instagram } from "lucide-react"
import Reveal from "@/components/reveal"
import { CONTACT } from "@/lib/constants"
import { INSTAGRAM_PICKS } from "@/lib/products-data"

/**
 * „Sa Instagrama" (V3-COPY §4: 07 — Iz ateljea): RUČNO kurirane prave
 * fotografije (loose set — pravilo slika §8.1), ne automatski feed.
 */
export default function InstagramSection() {
  return (
    <section className="section-block section-cream" aria-labelledby="ig-naslov">
      <div className="container-site">
        <Reveal className="mb-14 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
          <div>
            <span className="label mb-4 block">07 — Iz ateljea</span>
            <h2 id="ig-naslov">Sa Instagrama</h2>
          </div>
          <p className="body text-ink-muted">{CONTACT.instagramHandle}</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {INSTAGRAM_PICKS.map((pick, i) => (
            <Reveal key={pick.image} delay={((i % 3) as 0 | 1 | 2)}>
              <a
                href={pick.href}
                target="_blank"
                rel="noopener noreferrer"
                className="img-frame relative block aspect-square"
                aria-label={`${pick.alt} — otvorite na Instagramu`}
              >
                <Image
                  src={pick.image}
                  alt={pick.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 33vw"
                  className="puterina-img object-cover"
                />
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="tlink inline-flex items-center gap-2"
          >
            <Instagram className="h-4 w-4" aria-hidden />
            Zapratite me
          </a>
        </Reveal>
      </div>
    </section>
  )
}
