"use client"

import { Instagram, Phone, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const PHONE = "+381653799334"
const INSTAGRAM_URL = "https://instagram.com/puterinacakes"

export default function StickyButtons() {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      {/* Instagram */}
      <Button
        asChild
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        title="Instagram"
      >
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <Instagram className="h-5 w-5" />
        </a>
      </Button>

      {/* Phone */}
      <Button
        asChild
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-green-600 hover:bg-green-700"
        title="Telefon"
      >
        <a href={`tel:${PHONE}`} aria-label="Pozovite nas">
          <Phone className="h-5 w-5" />
        </a>
      </Button>

      {/* WhatsApp */}
      <Button
        asChild
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-green-500 hover:bg-green-600"
        title="WhatsApp"
      >
        <a
          href={`https://wa.me/${PHONE.replace(/\+/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </Button>

      {/* Viber */}
      <Button
        asChild
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg bg-purple-600 hover:bg-purple-700"
        title="Viber"
      >
        <a
          href={`viber://chat?number=${PHONE.replace(/\+/g, "")}`}
          aria-label="Viber"
        >
          <MessageCircle className="h-5 w-5" />
        </a>
      </Button>
    </div>
  )
}
