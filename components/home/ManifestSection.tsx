import Reveal from "@/components/reveal"
import { SITE } from "@/lib/constants"

/**
 * Manifest (mockup v6-1): jedna velika serifna rečenica posle hero-a
 * + rukopisni potpis. Zamenjuje V2 „utiske" na vrhu toka — mir pre kataloga.
 */
export default function ManifestSection() {
  return (
    <section
      className="py-16 text-center md:py-32"
      aria-label="Puterina manifest"
    >
      <div className="container-narrow">
        <Reveal>
          <p className="manifest-line">{SITE.manifest}</p>
        </Reveal>
        <Reveal delay={1}>
          <span className="accent-script mt-7 !text-[2rem]">{SITE.signOff}</span>
        </Reveal>
      </div>
    </section>
  )
}
