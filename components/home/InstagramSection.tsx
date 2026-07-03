import Image from "next/image"
import { Instagram } from "lucide-react"
import Reveal from "@/components/reveal"
import { CONTACT } from "@/lib/constants"
import { INSTAGRAM_PICKS } from "@/lib/dummy-data"

/**
 * „Sa Instagrama" (ZA-PUTERINU §3.8): 4–6 RUČNO kuriranih fotografija —
 * ne automatski feed. Kasnije se uređuje kroz Sanity (instagramPick tip).
 */
export default function InstagramSection() {
  return (
    <section className="section-block section-soft-white" aria-labelledby="ig-naslov">
      <div className="container-site">
        <Reveal className="mb-14 flex flex-col gap-2 md:mb-20 md:flex-row md:items-baseline md:justify-between">
          <h2 id="ig-naslov">Sa Instagrama</h2>
          <p className="body text-charcoal/60">{CONTACT.instagramHandle}</p>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
          {INSTAGRAM_PICKS.map((pick, i) => (
            <Reveal key={pick.image + i} delay={((i % 3) as 0 | 1 | 2)}>
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

        <Reveal className="mt-14">
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-outline"
          >
            <Instagram className="h-4 w-4" aria-hidden />
            Zapratite me
          </a>
        </Reveal>
      </div>
    </section>
  )
}
