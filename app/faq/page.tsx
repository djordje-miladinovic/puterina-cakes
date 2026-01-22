import type { Metadata } from "next"
import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { sanityFetch } from "@/lib/sanity"
import { CONTACT, CANONICAL_BASE } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Često Postavljana Pitanja",
  description:
    "Odgovori na najčešća pitanja o poručivanju, dostavi, proizvodima i uslovima saradnje sa Puterina Cakes.",
}

// FAQ categories with display labels
const FAQ_CATEGORIES = {
  porucivanje: "Poručivanje",
  dostava: "Dostava",
  proizvodi: "Proizvodi",
  uslovi: "Uslovi",
} as const

type FaqCategory = keyof typeof FAQ_CATEGORIES

interface FaqItem {
  _id: string
  question: string
  answer: PortableTextBlock[]
  category: FaqCategory
  order: number
}

// Fallback FAQ items when CMS has no data
const fallbackFaqItems: Omit<FaqItem, "_id">[] = [
  // Poručivanje
  {
    question: "Kako mogu da poručim tortu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: `Možete nas kontaktirati putem telefona (${CONTACT.phone}), WhatsApp-a, Viber-a ili Instagram DM-a. Biće nam zadovoljstvo da zajedno osmislimo Vašu savršenu tortu.`,
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 1,
  },
  {
    question: "Koliko unapred treba da naručim tortu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Preporučujemo da nas kontaktirate minimum 10 dana pre željenog datuma. Za složenije dizajne ili veće porudžbine, što ranije to bolje.",
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 2,
  },
  {
    question: "Koje su opcije za kontakt?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: `Možete nas kontaktirati putem direktnog poziva na ${CONTACT.phone}, Instagram DM-a (${CONTACT.instagramHandle}), WhatsApp-a ili Viber-a. Odgovaramo radnim danima od 08:00 do 20:00.`,
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 3,
  },
  {
    question: "Da li radite torte po narudžbini / personalizovane?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Apsolutno! Specijalizovani smo za potpuno personalizovane torte. Možete nam opisati ili poslati fotografiju željene torte, i naš tim će je realizovati. Radimo isključivo sa puter kremom – ne koristimo fondan.",
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 4,
  },
  // Dostava
  {
    question: "Da li vršite dostavu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Da, vršimo dostavu na teritoriji Beograda. Cena dostave zavisi od zone i biće Vam saopštena prilikom porudžbine. Za posebne klijente, moguća je i dostava van Beograda po dogovoru.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 1,
  },
  {
    question: "Gde se nalazite?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Nalazimo se u Beogradu. Tačnu adresu za preuzimanje delimo nakon potvrde porudžbine.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 2,
  },
  {
    question: "Da li mogu lično da preuzmem tortu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Naravno! Lično preuzimanje je moguće. Tačnu adresu i vreme preuzimanja dogovaramo nakon potvrde porudžbine. Dostava je dostupna ponedeljkom do subote, između 12:00 i 17:00.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 3,
  },
  // Proizvodi
  {
    question: "Koje sastojke koristite?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Koristimo isključivo kvalitetne i sveže sastojke. Svaki proizvod u našem katalogu ima detaljne informacije o sastojcima, alergenima i nutritivnim vrednostima. Kvalitet sastojaka je naš prioritet.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 1,
  },
  {
    question: "Da li radite fondan torte?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Ne radimo torte sa fondanom. Specijalizovani smo isključivo za torte sa puter kremom (buttercream), koji daje autentičan ukus i teksturu. Ovo je svestan izbor koji garantuje kvalitet i ukus naših proizvoda.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 2,
  },
  {
    question: "Koliko torta može da stoji i kako se čuva?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Naše torte su najukusnije ako se konzumiraju u roku od 2-3 dana od preuzimanja. Čuvajte ih u frižideru na temperaturi 4-8°C. Pre serviranja, izvadite tortu iz frižidera 30 minuta ranije kako bi dostigla sobnu temperaturu.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 3,
  },
  {
    question: "Da li mogu da donesem svoju figuricu ili topper?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Da, možete doneti svoj topper ili figuricu. Za figurice od fondana, sarađujemo sa proverenim dobavljačima i mogu se naručiti uz doplatu. Ukoliko imate specifične zahteve, javite nam unapred.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 4,
  },
  {
    question: "Da li radite probanje ukusa (tasting)?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Trenutno ne nudimo probanje ukusa pre poručivanja. Međutim, možete pogledati naš katalog proizvoda sa detaljnim opisima svakog ukusa, ili nas kontaktirati za preporuke na osnovu Vaših preferencija.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 5,
  },
  // Uslovi
  {
    question: "Koja je politika otkazivanja ili izmena porudžbine?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Izmene porudžbine su moguće najkasnije 5 dana pre dogovorenog datuma preuzimanja/dostave. U slučaju otkazivanja, avans se ne vraća ako se otkaže kasnije od navedenog roka. Za sve detalje, kontaktirajte nas direktno.",
          },
        ],
      },
    ],
    category: "uslovi",
    order: 1,
  },
  {
    question: "Šta sve uključuje cena?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Osnovna cena se računa po kilogramu i uključuje tortu sa standardnom dekoracijom. Složenija dekoracija (crtanje na torti, jestivi papir) i dodatni elementi (figurice, cvetovi, topperi) se naplaćuju posebno. Dostava se takođe dogovara posebno.",
          },
        ],
      },
    ],
    category: "uslovi",
    order: 2,
  },
  {
    question: "Kada mogu da Vas kontaktiram?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: `Dostupni smo za poruke i pozive radnim danima od 08:00 do 20:00. Možete nas kontaktirati putem telefona (${CONTACT.phone}), WhatsApp-a, Viber-a ili Instagram DM-a.`,
          },
        ],
      },
    ],
    category: "uslovi",
    order: 3,
  },
]

// GROQ query to fetch FAQs from Sanity
const FAQ_QUERY = `*[_type == "faq"] | order(category asc, order asc) {
  _id,
  question,
  answer,
  category,
  order
}`

// Convert block content to plain text for JSON-LD
function blockContentToPlainText(blocks: PortableTextBlock[]): string {
  if (!blocks || !Array.isArray(blocks)) return ""
  return blocks
    .map((block) => {
      if (block._type !== "block" || !block.children) return ""
      return block.children
        .map((child) => ("text" in child ? child.text : ""))
        .join("")
    })
    .join("\n")
}

// Group FAQs by category
function groupFaqsByCategory(
  faqs: FaqItem[]
): Record<FaqCategory, FaqItem[]> {
  const grouped: Record<FaqCategory, FaqItem[]> = {
    porucivanje: [],
    dostava: [],
    proizvodi: [],
    uslovi: [],
  }

  faqs.forEach((faq) => {
    if (faq.category in grouped) {
      grouped[faq.category].push(faq)
    }
  })

  return grouped
}

// Generate JSON-LD FAQPage structured data
function generateFaqJsonLd(faqs: FaqItem[]): object {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: blockContentToPlainText(faq.answer),
      },
    })),
  }
}

export default async function FaqPage() {
  // Fetch FAQs from Sanity CMS with error handling
  let faqItems: FaqItem[]
  try {
    faqItems = await sanityFetch<FaqItem[]>({
      query: FAQ_QUERY,
    })
  } catch {
    // If fetch fails (e.g., network error), use fallback data
    faqItems = []
  }

  // Use fallback data if CMS returns empty or fetch failed
  if (!faqItems || faqItems.length === 0) {
    faqItems = fallbackFaqItems.map((item, index) => ({
      ...item,
      _id: `fallback-${index}`,
    }))
  }

  // Group FAQs by category
  const groupedFaqs = groupFaqsByCategory(faqItems)

  // Generate JSON-LD structured data
  const jsonLd = generateFaqJsonLd(faqItems)

  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4">Često Postavljana Pitanja</h1>
        <p className="text-muted-foreground mb-8">
          Pronađite odgovore na najčešća pitanja o poručivanju, dostavi,
          proizvodima i uslovima saradnje. Ukoliko ne pronađete odgovor koji
          tražite, slobodno nas{" "}
          <a href="/kontakt" className="text-primary hover:underline">
            kontaktirajte
          </a>
          .
        </p>

        {/* FAQ sections by category */}
        {(Object.keys(FAQ_CATEGORIES) as FaqCategory[]).map((categoryKey) => {
          const categoryFaqs = groupedFaqs[categoryKey]
          if (categoryFaqs.length === 0) return null

          return (
            <section key={categoryKey} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">
                {FAQ_CATEGORIES[categoryKey]}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {categoryFaqs.map((faq, index) => (
                  <AccordionItem
                    key={faq._id}
                    value={`${categoryKey}-${index}`}
                  >
                    <AccordionTrigger className="text-left">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      <PortableText value={faq.answer} />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )
        })}

        {/* Contact CTA */}
        <section className="mt-12 p-6 bg-muted rounded-lg text-center">
          <h2 className="text-xl font-semibold mb-2">
            Imate dodatno pitanje?
          </h2>
          <p className="text-muted-foreground mb-4">
            Slobodno nas kontaktirajte – radujemo se Vašoj poruci!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${CONTACT.phone}`}
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Pozovite nas
            </a>
            <a
              href={`https://wa.me/${CONTACT.phone.replace(/\+/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-sm font-medium text-white hover:bg-green-700 transition-colors"
            >
              WhatsApp
            </a>
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md border border-input bg-background px-6 py-3 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              Instagram
            </a>
          </div>
        </section>
      </div>
    </>
  )
}
