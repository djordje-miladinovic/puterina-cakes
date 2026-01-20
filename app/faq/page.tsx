import type { Metadata } from "next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { CONTACT } from "@/lib/constants"

export const metadata: Metadata = {
  title: "Često Postavljana Pitanja",
  description: "Odgovori na najčešća pitanja o našim proizvodima i uslugama",
}

const faqItems = [
  {
    question: "Kako mogu da poručim tortu?",
    answer: `Možete nas kontaktirati putem telefona (${CONTACT.phone}), WhatsApp-a, Viber-a ili kroz našu kontakt formu. Preporučujemo da narudžbinu napravite najmanje 2-3 dana unapred.`,
  },
  {
    question: "Da li vršite dostavu?",
    answer:
      "Da, vršimo dostavu na teritoriji Beograda i okoline. Cena dostave zavisi od lokacije i biće vam saopštena prilikom porudžbine.",
  },
  {
    question: "Koliko torta može da stoji?",
    answer:
      "Naše torte su najukusnije ako se konzumiraju u roku od 2-3 dana. Čuvajte ih u frižideru na temperaturi 4-8°C.",
  },
  {
    question: "Da li radite torte po narudžbini?",
    answer:
      "Apsolutno! Specijalizovani smo za torte po narudžbini. Možete nam poslati fotografiju ili opis željene torte i naš tim će je realizovati.",
  },
  {
    question: "Koje sastojke koristite?",
    answer:
      "Koristimo isključivo kvalitetne i sveže sastojke. Detaljne informacije o sastojcima i alergenima možete pronaći na stranici svakog proizvoda.",
  },
]

export default function FaqPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8">Često Postavljana Pitanja</h1>

      <section className="mb-12">
        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  )
}
