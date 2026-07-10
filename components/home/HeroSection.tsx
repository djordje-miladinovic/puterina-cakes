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
        alt="Bela puter-krem torta sa jestivim cvećem na postolju — Puterina, butik torti Beograd"
        fill
        priority
        sizes="100vw"
        className="puterina-img object-cover"
        style={{ objectPosition: "var(--hero-pos)" }}
      />
      {/* Svetli scrim pri dnu — čitljivost bez tamnog gradijenta (v6-1);
          na mobilnom jači i viši (label + naslov preko fotografije) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--bg) 84%, transparent) 0%, transparent 52%)",
        }}
        aria-hidden
      />

      {/* pb-28 na mobilnom: prostor za sticky „Poručite" traku (ne sme
          da prekrije hero linkove); od sm naviše mockup ritam 9vh */}
      <div className="container-site relative w-full pb-28 sm:pb-[9vh]">
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
          <div className="mt-7 flex flex-wrap items-center gap-7 sm:mt-9">
            {/* CTA hijerarhija na mobilnom: JEDNO malina dugme po ekranu —
                sticky „Poručite" pri dnu. Zato je hero malina CTA sakriven
                ispod sm, a ostaje samo tihi link ka ukusima. */}
            <a
              href={`tel:${CONTACT.phone}`}
              className="cta-primary hidden sm:inline-flex"
            >
              Poručite tortu
            </a>
            <Link href="/katalog" className="tlink tlink-tap">
              Pogledajte ukuse
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
