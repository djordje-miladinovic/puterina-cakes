import HeroSection from "@/components/home/HeroSection"
import SignatureSection from "@/components/home/SignatureSection"
import OrderStepsSection from "@/components/home/OrderStepsSection"
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection"
import StoryTeaserSection from "@/components/home/StoryTeaserSection"
import WhatIDontDoSection from "@/components/home/WhatIDontDoSection"
import TestimonialsSection from "@/components/home/TestimonialsSection"
import InstagramSection from "@/components/home/InstagramSection"
import FinalCTASection from "@/components/home/FinalCTASection"
import { getAllProducts } from "@/lib/products"

export const revalidate = 60

/**
 * Naslovna — 9 sekcija po ZA-PUTERINU-pregled-dizajna.md §3:
 * hero → signature → 3 koraka → ponuda → priča → šta ne radim →
 * utisci → sa Instagrama → završni CTA.
 * Color-block ritam: krem → blush → soft-white → pistać → krem → krem → soft-white → gold.
 */
export default async function Home() {
  const products = await getAllProducts()

  return (
    <>
      <HeroSection />
      <SignatureSection products={products} />
      <OrderStepsSection />
      <FeaturedProductsSection products={products} />
      <StoryTeaserSection />
      <WhatIDontDoSection />
      <TestimonialsSection />
      <InstagramSection />
      <FinalCTASection />
    </>
  )
}
