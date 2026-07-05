import type { Metadata } from "next"
import Link from "next/link"
import { Phone, Instagram } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Reveal from "@/components/reveal"
import { CONTACT, SITE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Česta pitanja | Puterina — butik torti Beograd",
  description:
    "Sve što Vas zanima pre poziva: rokovi, dostava, čuvanje torte, alergeni, avans. Puterina — butik torti, Beograd.",
}

/**
 * FAQ V3 — kurirani odgovori u 1. licu jednine (V3-COPY §9), usklađeni
 * sa Katarininom sveskom: min 10 dana, min 1 kg, avans radna verzija,
 * degustacija po dogovoru, dostava BEZ zona. Ovaj set je IZVOR ISTINE
 * za FAQPage JSON-LD (Sanity FAQ se vraća u F5 posle voice-audita).
 */

const FAQ_CATEGORIES = {
  porucivanje: "Poručivanje",
  proizvodi: "Proizvodi",
  dostava: "Dostava i čuvanje",
  uslovi: "Uslovi",
} as const

type FaqCategory = keyof typeof FAQ_CATEGORIES

interface FaqItem {
  question: string
  answer: string
  category: FaqCategory
}

const FAQ_ITEMS: FaqItem[] = [
  // Poručivanje
  {
    question:
      "Koliko dana unapred treba da poručim tortu? (Zato što se puter ne požuruje.)",
    answer:
      "Najmanje 10 dana unapred. Najsigurnije: čim znate datum — kalendar se puni po nedeljama.",
    category: "porucivanje",
  },
  {
    question: "Kolika torta je potrebna za 20 osoba?",
    answer:
      "Računajte oko 100–120 g po osobi — za 20 osoba torta od 2–2,5 kg. Najmanja porudžbina: 1 kg.",
    category: "porucivanje",
  },
  {
    question: "Zašto su cene po kilogramu?",
    answer:
      "Jer torta raste sa brojem gostiju, a Vi plaćate tačno koliko slavlja imate. Dekoracija (figurice, crtanje, jestivi papir) se dogovara i naplaćuje posebno — jer je svaka torta drugačija.",
    category: "porucivanje",
  },
  {
    question: "Koliko torti radite nedeljno?",
    answer:
      "Ograničen broj. Svaka torta prespava noć u frižideru i dobije svoj sat pod špatulom — to se ne ubrzava. Zato se javite čim znate datum.",
    category: "porucivanje",
  },
  {
    question: "Da li radite probanje ukusa (degustaciju)?",
    answer: "Povremeno, po dogovoru — pitajte kad se čujemo.",
    category: "porucivanje",
  },
  // Proizvodi
  {
    question: "Da li mogu da vidim kako torta izgleda iznutra?",
    answer:
      "Naravno — svaka torta na sajtu ima fotografiju preseka. Slojevi koje vidite na preseku — to su slojevi koje sečete.",
    category: "proizvodi",
  },
  {
    question: "Da li radite torte sa fondanom?",
    answer:
      "Fondan prekrivke ne radim — kod mene je samo puter krem. Fondan figurice kao dekoracija su moguće i naplaćuju se posebno.",
    category: "proizvodi",
  },
  {
    question: "Da li mogu da donesem svoju figuricu ili topper?",
    answer:
      "Naravno! Donesite je 2–3 dana ranije ili je predajte pri dogovoru.",
    category: "proizvodi",
  },
  {
    question: "Šta je sa alergenima?",
    answer:
      "Svaka torta na sajtu ima deklaraciju sa sastojcima i alergenima. U radionici se koriste gluten, jaja, mleko, soja i orašasti plodovi — ako imate alergiju, obavezno je pomenite pri porudžbini.",
    category: "proizvodi",
  },
  // Dostava i čuvanje
  {
    question: "Da li radite dostavu?",
    answer: `${SITE.deliveryNote} Lično preuzimanje je uvek moguće.`,
    category: "dostava",
  },
  {
    question: "Kako se torta čuva do posluženja?",
    answer:
      "U frižideru, na temperaturi do +5 °C. Izvadite je 30 minuta pre posluženja — da krem dobije svilenkastu teksturu.",
    category: "dostava",
  },
  // Uslovi
  {
    question: "Da li je potreban avans?",
    answer:
      "Za torte do 3 kg avans nije potreban. Za veće porudžbine dogovaramo se u razgovoru.",
    category: "uslovi",
  },
  {
    question: "Šta ako moram da otkažem ili izmenim porudžbinu?",
    answer:
      "Izmene su moguće najkasnije 5 dana pre termina. Za otkazivanja se dogovaramo — javite se što pre.",
    category: "uslovi",
  },
]

function generateFaqJsonLd(faqs: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  }
}

export default function FaqPage() {
  const jsonLd = generateFaqJsonLd(FAQ_ITEMS)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container-site max-w-4xl pb-16 pt-28 md:pt-36">
        <Reveal>
          <span className="label mb-4 block">Česta pitanja</span>
          <h1>Česta pitanja</h1>
          <p className="body-large mb-12 mt-4 max-w-xl text-ink-muted">
            Sve što Vas zanima pre poziva — na jednom mestu. Ako odgovor ipak
            nedostaje,{" "}
            <Link href="/kontakt" className="text-oliva hover:opacity-80">
              javite mi se
            </Link>
            .
          </p>
        </Reveal>

        {(Object.keys(FAQ_CATEGORIES) as FaqCategory[]).map((categoryKey) => {
          const categoryFaqs = FAQ_ITEMS.filter(
            (f) => f.category === categoryKey
          )
          if (categoryFaqs.length === 0) return null

          return (
            <Reveal key={categoryKey}>
              <section className="mb-12">
                <h2 className="mb-4 !text-2xl">
                  {FAQ_CATEGORIES[categoryKey]}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {categoryFaqs.map((faq, index) => (
                    <AccordionItem
                      key={faq.question}
                      value={`${categoryKey}-${index}`}
                    >
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-ink-muted">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </section>
            </Reveal>
          )
        })}

        <Reveal>
          <section className="mt-20 text-center">
            <h2>Niste pronašli odgovor?</h2>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a href={`tel:${CONTACT.phone}`} className="cta-primary">
                <Phone className="h-4 w-4" aria-hidden="true" />
                Pozovite
              </a>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="cta-outline"
              >
                <Instagram className="h-4 w-4" aria-hidden="true" />
                Instagram DM
              </a>
            </div>
            <p className="mt-5 text-[13px] text-ink-muted">
              {SITE.responseNote}
            </p>
          </section>
        </Reveal>
      </div>
    </>
  )
}
