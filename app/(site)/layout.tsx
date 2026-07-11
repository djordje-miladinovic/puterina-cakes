import Header from "@/components/header"
import Footer from "@/components/footer"
import StickyButtons from "@/components/sticky-buttons"
import JsonLd from "@/components/json-ld"
import PauseBanner from "@/components/order/PauseBanner"
import { getSiteSettings } from "@/lib/site-settings"
import { SanityLive } from "@/lib/sanity"

export const revalidate = 60

/**
 * Layout SAJTA (route grupa — V4 #37a): Header/Footer/StickyButtons/JsonLd
 * žive ovde, pa /studio (van grupe) ostaje čist Sanity Studio bez sajt-školjke.
 * Root layout drži samo html/body/fontove/metadata.
 * PauseBanner (#35a) čita SiteSettings iz Sanity-ja — Katarina ga pali
 * jednim prekidačem u Studiju.
 */
export default async function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSiteSettings()

  return (
    <>
      {/* No-JS fallback: bez JS-a IntersectionObserver nikad ne doda
          .is-visible, pa bi sav .reveal sadržaj ostao na opacity 0. */}
      <noscript>
        <style>{`.reveal { opacity: 1 !important; transform: none !important; }`}</style>
      </noscript>
      <JsonLd />
      <PauseBanner
        aktivna={settings.pauzaAktivna}
        poruka={settings.pauzaPoruka}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <StickyButtons />
      <SanityLive />
    </>
  )
}
