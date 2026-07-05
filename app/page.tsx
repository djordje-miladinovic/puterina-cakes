import HeroSection from "@/components/home/HeroSection"
import ManifestSection from "@/components/home/ManifestSection"
import SignatureSection from "@/components/home/SignatureSection"
import OrderStepsSection from "@/components/home/OrderStepsSection"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import WhatIDontDoSection from "@/components/home/WhatIDontDoSection"
import StoryTeaserSection from "@/components/home/StoryTeaserSection"
import InstagramSection from "@/components/home/InstagramSection"
import FinalCTASection from "@/components/home/FinalCTASection"
import { getAllProducts } from "@/lib/products"

export const revalidate = 60

/**
 * Naslovna V3 — tok po mockup-u v6-1 (V3-DIZAJN-PRAVAC):
 * hero → manifest → signature (tint) → 3 koraka → iz radionice (tint) →
 * „šta ne radim" (NUD terakota predah) → priča → sa Instagrama → finale (tint).
 * Utisci NISU na naslovnoj (postoje samo 2 prava citata — /utisci).
 */
export default async function Home() {
  const products = await getAllProducts()

  return (
    <>
      <HeroSection />
      <ManifestSection />
      <SignatureSection products={products} />
      <OrderStepsSection />
      <FeaturedProductsSection products={products} />
      <WhatIDontDoSection />
      <StoryTeaserSection />
      <InstagramSection />
      <FinalCTASection />
    </>
  )
}
