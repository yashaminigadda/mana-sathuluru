import React from 'react'
import IntroSplash from './components/IntroSplash'
import Navbar from './components/Navbar'
import Hero3D from './components/Hero3D'
import AboutSection from './components/AboutSection'
import SatuluruSection from './components/SatuluruSection'
import GallerySection from './components/GallerySection'
import PaymentScannerSection from './components/PaymentScannerSection'
import SocialSection from './components/SocialSection'
import ContactSection from './components/ContactSection'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-[#060709] text-slate-100 flex flex-col relative selection:bg-gold-500/30 selection:text-gold-200">
      {/* Cinematic Opening Splash: Displays MANA SATHULURU on open */}
      <IntroSplash />

      {/* Subtle Cinematic Grain Texture */}
      <div className="fixed inset-0 film-grain z-30 pointer-events-none opacity-40" />

      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-grow">
        <Hero3D />
        <AboutSection />
        <SatuluruSection />
        <GallerySection />
        <PaymentScannerSection />
        <SocialSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
