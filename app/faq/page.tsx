import type { Metadata } from "next"
import { PortableText } from "@portabletext/react"
import type { PortableTextBlock } from "@portabletext/types"
import { Phone, Instagram } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { sanityFetch, FAQ_QUERY } from "@/lib/sanity"
import { CONTACT, CANONICAL_BASE } from "@/lib/constants"

// Revalidate every 60 seconds for fresh content
export const revalidate = 60

export const metadata: Metadata = {
  title: "Često Postavljana Pitanja",
  description:
    "Sve što Vas zanima pre poziva: rokovi, dostava, čuvanje torte, alergeni, avans. Puterina — butik torti, Beograd.",
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
            text: `Poručivanje je jednostavno i prijatno! Možete nas kontaktirati putem telefona (${CONTACT.phone}), WhatsApp-a, Viber-a ili Instagram DM-a. Zajedno ćemo osmisliti tortu koja će u potpunosti odgovarati Vašim željama – od ukusa i veličine do dizajna i dekoracije. Radujemo se svakoj novoj saradnji!`,
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 1,
  },
  {
    question: "Koliko unapred treba da poručim tortu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Za najbolji rezultat, preporučujemo da nas kontaktirate minimum 7 dana pre željenog datuma. Za manje torte i u mirnijem periodu, ponekad je dovoljno i 3-4 dana unapred. Složeniji dizajni i svadbene torte zahtevaju više vremena za planiranje – idealno 2-3 nedelje unapred. Što ranije nas kontaktirate, više vremena imamo da zajedno osmislimo nešto zaista posebno za Vašu proslavu.",
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
            text: `Sa zadovoljstvom ćemo odgovoriti na sva Vaša pitanja! Možete nas kontaktirati putem direktnog poziva na ${CONTACT.phone}, Instagram DM-a (${CONTACT.instagramHandle}), WhatsApp-a ili Viber-a. Trudimo se da odgovorimo u najkraćem mogućem roku, najčešće u toku istog dana.`,
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 3,
  },
  {
    question: "Da li radite torte po narudžbini i personalizovane dizajne?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Apsolutno! Upravo u tome je naša strast. Svaka torta koju pravimo je jedinstvena i prilagođena Vašim željama. Možete nam opisati svoju ideju, poslati fotografiju inspiracije, ili nam prepustiti kreativnu slobodu – uvek ćemo zajedno pronaći savršeno rešenje. Dekoracija po dogovoru je naša specijalnost, a radimo isključivo sa puter kremom koji omogućava prelepe i ukusne kreacije.",
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 4,
  },
  {
    question: "Da li nudite konsultacije pre porudžbine?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Naravno! Rado ćemo sa Vama razgovarati o svim detaljima pre nego što završite porudžbinu. Možemo Vam pomoći u odabiru ukusa, preporučiti veličinu torte prema broju gostiju, i predložiti dizajn koji će se uklopiti u temu Vaše proslave. Vaše zadovoljstvo nam je prioritet, i verujemo da dobra komunikacija čini svaku tortu posebnom.",
          },
        ],
      },
    ],
    category: "porucivanje",
    order: 5,
  },
  // Dostava
  {
    question: "Da li vršite dostavu i kako funkcioniše?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Da, vršimo dostavu na teritoriji Beograda. Cena dostave zavisi od lokacije i biće Vam saopštena prilikom porudžbine. Dostave se obavljaju od ponedeljka do subote, u terminu od 12:00 do 17:00 časova. Trudimo se da ispoštujemo izabrani termin isporuke, ali molimo za razumevanje ukoliko u periodu većeg obima posla dođe do manjih pomeranja. Za posebne prilike, moguća je i dostava van Beograda po dogovoru.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 1,
  },
  {
    question: "Gde se nalazite i da li mogu lično da preuzmem tortu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Nalazimo se u Beogradu. Lično preuzimanje je uvek moguće i dobrodošlo! Tačnu adresu i vreme preuzimanja dogovaramo nakon potvrde porudžbine. Ukoliko želite lično preuzimanje, obavestite nas unapred kako bismo osigurali da Vaša torta bude spremna u dogovorenom terminu.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 2,
  },
  {
    question: "Koliko košta dostava?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Cena dostave zavisi od zone dostave u okviru Beograda i biće Vam precizno saopštena prilikom porudžbine. Lično preuzimanje je besplatno. Za dostave van Beograda, cena se određuje individualno u zavisnosti od udaljenosti i specifičnih zahteva.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 3,
  },
  {
    question: "Šta ako nisam kod kuće kada torta stigne?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Molimo Vas da obezbedite da neko bude prisutan na adresi dostave u dogovorenom terminu. Torte su delikatan proizvod koji zahteva pažljivo rukovanje i promptno skladištenje. Ukoliko dođe do promene planova, kontaktirajte nas što pre kako bismo zajedno pronašli rešenje.",
          },
        ],
      },
    ],
    category: "dostava",
    order: 4,
  },
  // Proizvodi
  {
    question: "Koje ukuse torti nudite?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Nudimo širok spektar ukusa koji zadovoljavaju različite preference. Među najpopularnijim su čokolada, vanila, karamel, voćne kombinacije, te specijalne kreacije poput Ferrero, Raffaello i Oreo. Kompletan katalog ukusa sa detaljnim opisima možete pogledati na našoj stranici Katalog. Ukoliko imate posebnu želju ili ideju za ukus, rado ćemo razmotriti i prilagođene kombinacije.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 1,
  },
  {
    question: "Koje sastojke koristite i da li su kvalitetni?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Kvalitet sastojaka je temelj svega što radimo. Koristimo isključivo puter visoke kvalitete, sveža jaja, prvoklasnu čokoladu, prirodnu vanilu i sezonsko voće. Ne koristimo veštačke arome niti konzervanse. Svaki proizvod u našem katalogu ima detaljne informacije o sastojcima. Verujemo da pravi ukus dolazi samo od pravih sastojaka.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 2,
  },
  {
    question: "Da li torte sadrže alergene?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Da, naše torte standardno sadrže mleko, jaja, pšenično brašno (gluten) i puter. Pojedini ukusi mogu sadržati orašaste plodove, soju ili druge alergene. Informacije o alergenima za svaki proizvod nalaze se u našem katalogu. Ukoliko imate specifične alergije ili netolerancije, molimo Vas da nas obavestite prilikom porudžbine kako bismo Vam pružili detaljne informacije i eventualno prilagodili recept.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 3,
  },
  {
    question: "Da li radite torte bez glutena ili bez laktoze?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Trenutno se specijalizujemo za tradicionalne puter krem torte koje sadrže gluten i laktozu. Za goste sa specifičnim dijetetskim potrebama, preporučujemo da nas kontaktirate unapred kako bismo razmotrili mogućnosti prilagođavanja ili Vam pomogli u pronalaženju alternativnog rešenja.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 4,
  },
  {
    question: "Da li radite torte sa fondanom?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Ne radimo torte sa fondanom – ovo je naš svestan izbor. Specijalizovani smo isključivo za torte sa puter kremom (buttercream), koji pruža nenadmašan ukus i teksturu. Puter krem omogućava prelepe dekoracije, a istovremeno garantuje da Vaša torta bude ne samo vizuelno atraktivna, već i izuzetno ukusna.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 5,
  },
  {
    question: "Koliko torta može da stoji i kako se pravilno čuva?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Naše torte su najukusnije kada se konzumiraju u roku od 2-3 dana nakon preuzimanja. Čuvajte ih u frižideru na temperaturi 4-8°C, pokrivene originalnom kutijom ili poklopcem kako bi se sačuvala svežina i sprečilo upijanje mirisa. Pre serviranja, izvadite tortu iz frižidera 30-45 minuta ranije kako bi dostigla sobnu temperaturu – tada će puter krem biti savršene teksture i punog ukusa.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 6,
  },
  {
    question: "Da li mogu da donesem svoju figuricu ili topper za tortu?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Svakako! Sa zadovoljstvom ćemo na Vašu tortu postaviti topper, figuricu ili drugi ukras koji donesete. Ukoliko Vam je potrebna figurica od fondana, sarađujemo sa proverenim dobavljačima i možemo je nabaviti uz doplatu. Samo nas obavestite unapred o Vašim željama kako bismo sve savršeno uklopili u dizajn torte.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 7,
  },
  {
    question: "Da li nudite probanje ukusa pre poručivanja?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Trenutno ne nudimo zvanično probanje ukusa, ali verujemo da ćete se zaljubiti u naše torte već pri prvom zalogaju! Na stranici Katalog možete pronaći detaljne opise svakog ukusa. Ukoliko ste neodlučni, rado ćemo Vam dati personalizovane preporuke na osnovu Vaših preferencija – samo nam javite šta volite, a mi ćemo Vam predložiti savršen ukus.",
          },
        ],
      },
    ],
    category: "proizvodi",
    order: 8,
  },
  // Uslovi
  {
    question: "Kako se formira cena torte?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Cena torte se formira na osnovu nekoliko faktora: težine (cena po kilogramu), složenosti dekoracije i eventualnih dodatnih elemenata. Osnovna cena uključuje tortu sa standardnom puter krem dekoracijom. Složenija dekoracija (ručno crtanje, jestivi papir sa printom), kao i dodatni elementi (figurice, topperi, sveže cveće) naplaćuju se posebno. Dostava se takođe obračunava zasebno. Konačnu cenu uvek dogovaramo unapred, pre potvrde porudžbine.",
          },
        ],
      },
    ],
    category: "uslovi",
    order: 1,
  },
  {
    question: "Koji su načini plaćanja?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Plaćanje je moguće gotovinski prilikom preuzimanja ili dostave. Za potvrdu porudžbine potreban je avans koji se uplaćuje unapred. Detalje o avansu i načinu uplate dogovaramo prilikom porudžbine. Za posebne aranžmane ili veće porudžbine, mogući su i drugi načini plaćanja po dogovoru.",
          },
        ],
      },
    ],
    category: "uslovi",
    order: 2,
  },
  {
    question: "Koja je politika otkazivanja ili izmena porudžbine?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Razumemo da se planovi ponekad menjaju. Izmene porudžbine (veličina, ukus, dekoracija) su moguće najkasnije 5 dana pre dogovorenog datuma preuzimanja ili dostave. U slučaju otkazivanja u tom roku, avans se može iskoristiti za buduću porudžbinu. Za otkazivanja nakon navedenog roka, nažalost nismo u mogućnosti da vratimo avans jer je priprema već u toku. Molimo Vas za razumevanje i da nas što pre obavestite o eventualnim promenama.",
          },
        ],
      },
    ],
    category: "uslovi",
    order: 3,
  },
  {
    question: "Šta ako torta stigne oštećena?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: "Vaše zadovoljstvo nam je izuzetno važno. Ukoliko torta prilikom dostave stigne oštećena, molimo Vas da nas odmah kontaktirate uz fotografiju. Učinićemo sve da pronađemo odgovarajuće rešenje. Napominjemo da nakon preuzimanja odgovornost za rukovanje i čuvanje torte prelazi na Vas.",
          },
        ],
      },
    ],
    category: "uslovi",
    order: 4,
  },
  {
    question: "Kada i kako mogu da Vas kontaktiram?",
    answer: [
      {
        _type: "block",
        children: [
          {
            _type: "span",
            text: `Na pozive i poruke odgovaram radnim danima od 8 do 20h, najčešće u roku od nekoliko sati. Možete me pozvati na ${CONTACT.phoneDisplay}, pisati u DM na Instagramu (${CONTACT.instagramHandle}) ili poslati poruku na WhatsApp i Viber. Radujem se Vašoj poruci!`,
          },
        ],
      },
    ],
    category: "uslovi",
    order: 5,
  },
]

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
  } catch (error) {
    // If fetch fails (e.g., network error), use fallback data
    console.error("Error fetching FAQs from Sanity:", error)
    faqItems = []
  }

  // Spoji Sanity pitanja sa fallback setom (dedup po tekstu pitanja) —
  // 1 CMS unos ne sme da sakrije ostalih ~20 kuriranih pitanja.
  const cmsQuestions = new Set(
    (faqItems ?? []).map((f) => f.question.trim().toLowerCase())
  )
  const missingFallback = fallbackFaqItems
    .filter((f) => !cmsQuestions.has(f.question.trim().toLowerCase()))
    .map((item, index) => ({ ...item, _id: `fallback-${index}` }))
  faqItems = [...(faqItems ?? []), ...missingFallback]

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

      <div className="container-site max-w-4xl pt-28 pb-16 md:pt-36">
        <h1>Česta pitanja</h1>
        <p className="body-large mt-4 mb-12 max-w-xl text-charcoal/75">
          Sve što Vas zanima pre poziva — na jednom mestu. Ako odgovor ipak
          nedostaje,{" "}
          <a
            href="/kontakt"
            className="underline underline-offset-2 hover:text-warm-brown"
          >
            javite mi se
          </a>
          .
        </p>

        {/* FAQ sections by category */}
        {(Object.keys(FAQ_CATEGORIES) as FaqCategory[]).map((categoryKey) => {
          const categoryFaqs = groupedFaqs[categoryKey]
          if (categoryFaqs.length === 0) return null

          return (
            <section key={categoryKey} className="mb-12">
              <h2 className="!text-2xl mb-4">
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

        {/* Contact CTA — bez kartice, v2 stil */}
        <section className="mt-20 text-center">
          <h2>Niste pronašli odgovor?</h2>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <a href={`tel:${CONTACT.phone}`} className="cta-primary !px-10">
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
        </section>
      </div>
    </>
  )
}
