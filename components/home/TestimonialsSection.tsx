import Link from "next/link"
import Reveal from "@/components/reveal"
import { DUMMY_TESTIMONIALS } from "@/lib/dummy-data"

/**
 * Utisci (ZA-PUTERINU §3.7): tri poruke kupaca kao nežni chat-oblačići
 * (jedina dozvoljena "kartica" forma), toplo i prirodno, sa imenima.
 */
export default function TestimonialsSection() {
  const testimonials = DUMMY_TESTIMONIALS.slice(0, 3)

  return (
    <section className="section-block section-cream" aria-labelledby="utisci-naslov">
      <div className="container-site">
        <Reveal>
          <h2 id="utisci-naslov" className="mb-14 md:mb-20">
            Utisci
          </h2>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={(i as 0 | 1 | 2)}
              className={i === 1 ? "md:mt-10" : ""}
            >
              <figure>
                <blockquote className="bubble body text-charcoal/85">
                  „{t.quote}”
                </blockquote>
                <figcaption className="mt-6 pl-6 text-warm-brown">
                  <span className="font-semibold">{t.name}</span>
                  <span className="text-charcoal/60"> · {t.occasion}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <Link href="/utisci" className="cta-ghost">
            Svi utisci →
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
