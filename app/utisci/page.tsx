import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Quote,
  Star,
  User,
  Calendar,
  Play,
  Instagram,
  ArrowRight,
  Phone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { CONTACT, CANONICAL_BASE } from "@/lib/constants"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Utisci",
  description:
    "Pročitajte utiske naših zadovoljnih klijenata o tortama i kolačima iz Puterina Cakes. Recenzije i iskustva kupaca.",
  alternates: {
    canonical: `${CANONICAL_BASE}/utisci`,
  },
}

// Testimonial interface
interface Testimonial {
  id: string
  quote: string
  author: string
  role?: string
  occasion?: string
  date?: string
  rating?: number
  avatarUrl?: string
  cakeImageUrl?: string
  isPlaceholder?: boolean
}

// Video testimonial interface
interface VideoTestimonial {
  id: string
  title: string
  thumbnailUrl?: string
  videoUrl?: string
  author: string
  isPlaceholder?: boolean
}

// Placeholder testimonials (clearly marked for replacement with real data)
const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Torta je bila ne samo prelepa, već i najukusnija koju smo probali! Hvala Puterini na divnom iskustvu. Svi gosti su bili oduševljeni, a dekoracija je bila tačno onakva kakvu sam zamislila.",
    author: "Ana Marković",
    role: "Mama slavljenice",
    occasion: "Torta za dečji rođendan",
    date: "Novembar 2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "2",
    quote:
      "Svaka torta je umetničko delo. Gosti su bili oduševljeni i ukusom i izgledom. Topla preporuka svima koji traže nešto posebno za svoju proslavu!",
    author: "Marko Petrović",
    role: "Zadovoljan kupac",
    occasion: "Torta za proslavu promocije",
    date: "Oktobar 2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "3",
    quote:
      "Konačno prava torta bez fondana! Puter krem je nešto najbolje što smo probali. Hvala vam što ste učinili naš poseban dan još posebnijim.",
    author: "Jelena Stojanović",
    role: "Verifikovan kupac",
    occasion: "Svadbena torta",
    date: "Septembar 2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "4",
    quote:
      "Profesionalnost, kvalitet i ukus — sve na najvišem nivou. Naručujem samo kod Puterine i nikada me nisu razočarali. Svaka torta je bila savršena.",
    author: "Milica Radović",
    role: "Redovna mušterija",
    occasion: "Više narudžbina",
    date: "2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "5",
    quote:
      "Torta za ćerkino venčanje je bila savršena. Svi gosti su pitali odakle je! Beskrajno hvala na tome što ste ulepšali naš najvažniji dan.",
    author: "Gordana Tomić",
    role: "Mama mlade",
    occasion: "Svadbena torta",
    date: "Avgust 2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "6",
    quote:
      "Izuzetna pažnja prema detaljima. Dobili smo tačno ono što smo zamislili, čak i bolje! Komunikacija je bila savršena od početka do kraja.",
    author: "Nikola Đorđević",
    role: "Zadovoljan kupac",
    occasion: "Torta za godišnjicu",
    date: "Jul 2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "7",
    quote:
      "Treća torta koju naručujemo i svaka je bila vrhunska. Deca obožavaju ukus, a ja obožavam što znam da jedu kvalitetne sastojke.",
    author: "Ivana Nikolić",
    role: "Mama",
    occasion: "Dečji rođendani",
    date: "Jun 2024",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "8",
    quote:
      "Našla sam Puterinu na Instagramu i od tada ne gledam dalje. Torta za moj 30. rođendan je bila spektakularna - ukus i izgled 10/10!",
    author: "Tamara J.",
    role: "Slavljenica",
    occasion: "Rođendanska torta",
    date: "Maj 2024",
    rating: 5,
    isPlaceholder: true,
  },
]

// Placeholder video testimonials
const videoTestimonials: VideoTestimonial[] = [
  {
    id: "v1",
    title: "Zadovoljni kupci o svadbenoj torti",
    author: "Marina i Stefan",
    isPlaceholder: true,
  },
  {
    id: "v2",
    title: "Reakcija na rođendansku tortu",
    author: "Porodica Jovanović",
    isPlaceholder: true,
  },
]

// Star rating component
function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      aria-label={`Ocena: ${rating} od 5 zvezdica`}
    >
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-4 h-4",
            i < rating
              ? "text-butter-gold fill-butter-gold"
              : "text-light-gray"
          )}
        />
      ))}
    </div>
  )
}

// Testimonial card component
function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className={cn(
        "bg-soft-white rounded-2xl p-6 md:p-8 border border-light-gray/50 shadow-sm",
        "hover:shadow-md transition-shadow duration-200",
        "flex flex-col h-full"
      )}
    >
      {/* Quote icon */}
      <div className="mb-4">
        <Quote className="w-8 h-8 text-butter-gold opacity-50" />
      </div>

      {/* Quote text */}
      <blockquote className="flex-1 mb-6">
        <p className="text-charcoal italic leading-relaxed">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </blockquote>

      {/* Rating */}
      {testimonial.rating && (
        <div className="mb-4">
          <StarRating rating={testimonial.rating} />
        </div>
      )}

      {/* Author info */}
      <div className="flex items-center gap-3 pt-4 border-t border-light-gray/50">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-blush-pink/50 flex items-center justify-center overflow-hidden shrink-0">
          {testimonial.avatarUrl ? (
            <Image
              src={testimonial.avatarUrl}
              alt={testimonial.author}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="w-6 h-6 text-warm-brown" />
          )}
        </div>

        {/* Name and details */}
        <div className="min-w-0">
          <cite className="not-italic font-medium text-warm-brown block">
            {testimonial.author}
          </cite>
          {testimonial.role && (
            <p className="text-sm text-muted-foreground">{testimonial.role}</p>
          )}
        </div>
      </div>

      {/* Occasion and date */}
      {(testimonial.occasion || testimonial.date) && (
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-medium-gray">
          {testimonial.occasion && (
            <span className="inline-flex items-center gap-1">
              <span className="text-butter-gold">•</span>
              {testimonial.occasion}
            </span>
          )}
          {testimonial.date && (
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {testimonial.date}
            </span>
          )}
        </div>
      )}

      {/* Placeholder indicator */}
      {testimonial.isPlaceholder && (
        <div className="mt-4 px-2 py-1 bg-blush-pink/30 rounded text-xs text-medium-gray text-center">
          Placeholder za pravu recenziju
        </div>
      )}
    </article>
  )
}

// Video testimonial card component
function VideoTestimonialCard({
  video,
}: {
  video: VideoTestimonial
}) {
  return (
    <article className="bg-soft-white rounded-2xl overflow-hidden border border-light-gray/50 shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Video thumbnail */}
      <div className="relative aspect-video bg-charcoal/10 flex items-center justify-center">
        {video.thumbnailUrl ? (
          <>
            <Image
              src={video.thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-blush-pink/30 to-butter-gold/30" />
        )}

        {/* Play button */}
        <button
          className={cn(
            "relative z-10 w-16 h-16 rounded-full",
            "bg-butter-gold flex items-center justify-center",
            "hover:bg-butter-gold-hover transition-colors duration-200",
            "shadow-lg hover:shadow-xl"
          )}
          aria-label={`Pusti video: ${video.title}`}
        >
          <Play className="w-6 h-6 text-white ml-1" fill="white" />
        </button>
      </div>

      {/* Video info */}
      <div className="p-4">
        <h3 className="font-medium text-warm-brown mb-1">{video.title}</h3>
        <p className="text-sm text-muted-foreground">{video.author}</p>

        {/* Placeholder indicator */}
        {video.isPlaceholder && (
          <div className="mt-3 px-2 py-1 bg-blush-pink/30 rounded text-xs text-medium-gray text-center">
            Placeholder za pravi video
          </div>
        )}
      </div>
    </article>
  )
}

export default function UtisciPage() {
  return (
    <div className="pt-24 md:pt-28 pb-16">
      {/* Page Header */}
      <header className="container mx-auto px-4 text-center mb-12 md:mb-16">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Utisci Naših Klijenata
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Hvala vam na poverenju! U nastavku možete pročitati utiske naših
          zadovoljnih kupaca koji su podelili svoja iskustva sa Puterina
          tortama. Svaki komentar nam mnogo znači i motiviše nas da budemo
          još bolji.
        </p>
      </header>

      {/* Main Testimonials Grid */}
      <section
        className="container mx-auto px-4 mb-16 md:mb-20"
        aria-label="Pisani utisci"
      >
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Note about real testimonials */}
        <div className="mt-8 p-4 bg-pistachio/20 rounded-xl text-center">
          <p className="text-sm text-medium-gray">
            <strong>Napomena:</strong> Prikazani utisci su placeholder sadržaj
            koji će biti zamenjen pravim recenzijama nakon prikupljanja od
            strane klijenata.
          </p>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section
        className="bg-blush-pink/20 py-12 md:py-16 mb-16 md:mb-20"
        aria-label="Video utisci"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">
            Video Utisci
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            Pogledajte reakcije naših zadovoljnih kupaca. Video snimci govore
            više od hiljadu reči!
          </p>

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {videoTestimonials.map((video) => (
              <VideoTestimonialCard key={video.id} video={video} />
            ))}
          </div>

          {/* Placeholder note */}
          <div className="mt-8 text-center">
            <p className="text-sm text-medium-gray">
              Video sekcija će biti popunjena pravim snimcima zadovoljnih
              kupaca.
            </p>
          </div>
        </div>
      </section>

      {/* Instagram Gallery Section */}
      <section
        className="container mx-auto px-4 mb-16 md:mb-20"
        aria-label="Instagram utisci"
      >
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Instagram Priče
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Pogledajte šta naši kupci dele na Instagramu. Tagujte nas sa{" "}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-butter-gold hover:underline font-medium"
            >
              {CONTACT.instagramHandle}
            </a>{" "}
            da bi vaša torta bila prikazana!
          </p>
        </div>

        {/* Instagram placeholder grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                "aspect-square rounded-xl overflow-hidden",
                "bg-gradient-to-br from-blush-pink/30 to-butter-gold/20",
                "border border-light-gray/50",
                "flex items-center justify-center"
              )}
            >
              <Instagram className="w-8 h-8 text-medium-gray/50" />
            </div>
          ))}
        </div>

        {/* Instagram CTA */}
        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram className="mr-2 h-5 w-5" />
              Pratite nas na Instagramu
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </section>

      {/* Share Your Experience CTA */}
      <section
        className="container mx-auto px-4"
        aria-label="Podelite vaš utisak"
      >
        <div className="bg-soft-white rounded-2xl p-8 md:p-12 border border-butter-gold/30 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">
            Podelite Vaše Iskustvo
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Da li ste naručili tortu kod nas? Voleli bismo da čujemo vaše
            mišljenje! Pošaljite nam vašu recenziju ili nas tagujte na
            Instagramu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <a href={`tel:${CONTACT.phone}`}>
                <Phone className="mr-2 h-5 w-5" />
                Pozovite Nas
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="mr-2 h-5 w-5" />
                Pošaljite DM
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
