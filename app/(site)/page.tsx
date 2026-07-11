import HeroSection from "@/components/home/HeroSection"
import ManifestSection from "@/components/home/ManifestSection"
import SignatureSection from "@/components/home/SignatureSection"
import OrderStepsSection from "@/components/home/OrderStepsSection"
import WhatIDontDoSection from "@/components/home/WhatIDontDoSection"
import StoryTeaserSection from "@/components/home/StoryTeaserSection"
import InstagramSection from "@/components/home/InstagramSection"
import FinalCTASection from "@/components/home/FinalCTASection"
import SectionDivider from "@/components/section-divider"
import { getAllProducts } from "@/lib/products"

export const revalidate = 60

/**
 * Naslovna V5 — redosled B bez skice (sekcija „torta se gradi" uklonjena
 * na Đorđev zahtev 2026-07-11):
 * hero → manifest → signature (tint) → 3 koraka (krem) → „šta ne radim"
 * (dark) → priča (tint) → sa Instagrama (krem) → divider → finale (tint).
 * Labele bez numeracije. Utisci NISU na naslovnoj (samo 2 prava citata — /utisci).
 */
export default async function Home() {
  const products = await getAllProducts()

  return (
    <>
      <HeroSection />
      <ManifestSection />
      <SignatureSection products={products} />
      <OrderStepsSection />
      <WhatIDontDoSection />
      <StoryTeaserSection />
      <InstagramSection />
      <SectionDivider className="container-site" />
      <FinalCTASection />
    </>
  )
}
