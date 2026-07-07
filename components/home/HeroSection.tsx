import Image from "next/image"
import Link from "next/link"
import { CONTACT, SITE } from "@/lib/constants"
import Reveal from "@/components/reveal"

/**
 * Full-bleed hero (mockup v6-1): prava fotografija preko celog ekrana,
 * svetli krem scrim pri dnu (bez tamnih preliva), sadržaj dole-levo:
 * label → slogan (italic „dušom") → CTA par. Response linija je UKLONJENA
 * (Đorđeva odluka 2026-07-06) — ne vraćati je.
 */
export default function HeroSection() {
  return (
    <section
      className="relative flex min-h-[640px] w-full items-end"
      style={{ height: "100svh" }}
      aria-label="Puterina — butik torti"
    >
      <Image
        src="/images/site/hero.jpg"
        alt="Bela puter-krem torta sa anturijumom — Puterina, butik torti Beograd"
        fill
        priority
        sizes="100vw"
        className="puterina-img object-cover"
        style={{ objectPosition: "var(--hero-pos)" }}
      />
      {/* Svetli scrim pri dnu — čitljivost bez tamnog gradijenta (v6-1) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 78%, transparent) 0%, transparent 42%)",
        }}
        aria-hidden
      />

      <div className="container-site relative w-full pb-[9vh]">
        <Reveal>
          <span className="label mb-5 block">{SITE.heroEyebrow}</span>
        </Reveal>
        <Reveal delay={1}>
          <h1 className="display-hero max-w-[15ch]">
            Torte sa <em>dušom</em>
            <br />i puterom.
          </h1>
        </Reveal>
        <Reveal delay={2}>
          <div className="mt-9 flex flex-wrap items-center gap-7">
            <a href={`tel:${CONTACT.phone}`} className="cta-primary">
              Poručite tortu
            </a>
            <Link href="/katalog" className="tlink">
              Pogledajte ukuse
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
