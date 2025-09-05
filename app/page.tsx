import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import WhoWeServeSection from '@/components/WhoWeServeSection'
import WhatWeDoSection from '@/components/WhatWeDoSection'
import ProductsSection from '@/components/ProductsSection'
import AIReadinessBanner from '@/components/AIReadinessBanner'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <WhatWeDoSection />
      <WhoWeServeSection />
      <ProductsSection />
      <AIReadinessBanner />
      <ContactSection />
      <Footer />
    </main>
  )
}