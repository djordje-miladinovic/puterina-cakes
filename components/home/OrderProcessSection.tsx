import Link from "next/link"
import { CONTACT } from "@/lib/constants"

const MINIMUM_ORDER_DAYS = 10

interface Step {
  id: string
  number: number
  title: string
  description: string
  icon: React.ReactNode
  link?: {
    href: string
    label: string
  }
}

// Hand-drawn style cake/pastry icon
const CakeIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 md:w-16 md:h-16"
    aria-hidden="true"
  >
    {/* Cake base - hand drawn style with slightly irregular strokes */}
    <path
      d="M12 42c0-2 2-4 4-4h32c2 0 4 2 4 4v8c0 2-2 4-4 4H16c-2 0-4-2-4-4v-8z"
      fill="var(--color-blush-pink)"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Middle layer */}
    <path
      d="M16 38c0-2 1.5-3.5 3.5-3.5h25c2 0 3.5 1.5 3.5 3.5"
      fill="var(--color-soft-white)"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Top layer with cream swirls */}
    <path
      d="M20 34.5c0-3 2-5 5-5s5 2 5 5M34 34.5c0-3 2-5 5-5s5 2 5 5"
      fill="none"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Cherry on top */}
    <circle
      cx="32"
      cy="22"
      r="5"
      fill="var(--color-raspberry)"
      stroke="var(--color-warm-brown)"
      strokeWidth="1.5"
    />
    {/* Cherry stem */}
    <path
      d="M32 17c2-3 5-4 7-3"
      fill="none"
      stroke="var(--color-warm-brown)"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
)

// Hand-drawn style message/contact icon
const ContactIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 md:w-16 md:h-16"
    aria-hidden="true"
  >
    {/* Message bubble */}
    <path
      d="M10 18c0-2 2-4 4-4h36c2 0 4 2 4 4v22c0 2-2 4-4 4H28l-10 8v-8h-4c-2 0-4-2-4-4V18z"
      fill="var(--color-pistachio)"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Heart inside message */}
    <path
      d="M32 34c-4-4-8-2-8 2 0 3 4 6 8 10 4-4 8-7 8-10 0-4-4-6-8-2z"
      fill="var(--color-raspberry)"
      stroke="var(--color-warm-brown)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// Hand-drawn style gift box/delivery icon
const DeliveryIcon = () => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="w-12 h-12 md:w-16 md:h-16"
    aria-hidden="true"
  >
    {/* Gift box base */}
    <rect
      x="12"
      y="28"
      width="40"
      height="24"
      rx="3"
      fill="var(--color-butter-gold)"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Box lid */}
    <rect
      x="10"
      y="22"
      width="44"
      height="8"
      rx="2"
      fill="var(--color-blush-pink)"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Ribbon vertical */}
    <path
      d="M32 22v30"
      stroke="var(--color-warm-brown)"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Ribbon bow */}
    <path
      d="M26 18c-3-4-2-8 1-8s5 3 5 8c0-5 2-8 5-8s4 4 1 8"
      fill="var(--color-raspberry)"
      stroke="var(--color-warm-brown)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const steps: Step[] = [
  {
    id: "choose",
    number: 1,
    title: "Izaberite ukus",
    description: "Pregledajte naš katalog i odaberite omiljeni ukus koji Vam se najviše dopada.",
    icon: <CakeIcon />,
    link: {
      href: "/katalog",
      label: "Pogledajte katalog",
    },
  },
  {
    id: "contact",
    number: 2,
    title: "Kontaktirajte nas",
    description: "Pozovite ili pišite na Instagram da dogovorimo detalje Vaše porudžbine.",
    icon: <ContactIcon />,
    link: {
      href: CONTACT.instagram,
      label: "Pišite nam",
    },
  },
  {
    id: "pickup",
    number: 3,
    title: "Preuzmite tortu",
    description: "Lično preuzimanje u Beogradu ili dostava na Vašu adresu.",
    icon: <DeliveryIcon />,
  },
]

export default function OrderProcessSection() {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3 md:mb-4">
            Kako do torte u 3 koraka
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
            Jednostavan proces poručivanja — od ideje do Vaše savršene torte.
          </p>
        </div>

        {/* Steps container */}
        <div className="relative">
          {/* Connector line - visible only on desktop */}
          <div
            className="hidden md:block absolute top-16 left-1/2 -translate-x-1/2 w-2/3 h-0.5 dashed-line-horizontal"
            aria-hidden="true"
          />

          {/* Steps grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-10">
            {steps.map((step, index) => (
              <div key={step.id} className="relative">
                {/* Mobile connector line - between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="md:hidden absolute left-1/2 -translate-x-1/2 top-full h-8 w-0.5 dashed-line-vertical"
                    aria-hidden="true"
                  />
                )}

                {/* Step card */}
                <div className="flex flex-col items-center text-center bg-soft-white rounded-2xl p-6 md:p-8 border border-light-gray/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  {/* Step number badge */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-butter-gold text-soft-white text-sm font-semibold flex items-center justify-center shadow-sm">
                    {step.number}
                  </div>

                  {/* Icon container with subtle background */}
                  <div className="mb-4 md:mb-5 p-4 rounded-full bg-cream/70">
                    {step.icon}
                  </div>

                  {/* Step title */}
                  <h3 className="text-lg md:text-xl font-medium mb-2 text-warm-brown">
                    {step.title}
                  </h3>

                  {/* Step description */}
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Optional CTA link */}
                  {step.link && (
                    <Link
                      href={step.link.href}
                      className="text-sm font-medium text-butter-gold hover:text-warm-brown transition-colors underline underline-offset-4 decoration-butter-gold/40 hover:decoration-warm-brown/60"
                      {...(step.link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {step.link.label} →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
