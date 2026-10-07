import React from 'react'
import { Compass, MessageCircle, Sparkles } from 'lucide-react'
import SatuluruCanvas from './SatuluruCanvas'

export default function Hero3D() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="home" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#060709]">
      {/* 3D Background Canvas */}
      <SatuluruCanvas />

      {/* Cinematic Vignette Overlay */}
      <div className="absolute inset-0 cinematic-vignette z-[1]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#060709] via-transparent to-[#060709]/75 z-[2] pointer-events-none" />

      {/* Aesthetic Golden Aura Bloom behind Title */}
      <div className="absolute top-1/2 left-1/2 w-[500px] sm:w-[700px] h-[300px] bg-gradient-to-r from-amber-500/15 via-gold-500/25 to-amber-600/15 rounded-full blur-[110px] pointer-events-none z-[3] animate-aura-glow" />

      {/* Foreground Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center flex flex-col items-center">
        
        {/* Aesthetic Brand Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-500/25 bg-black/50 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(229,169,60,0.15)] animate-aesthetic-badge">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs uppercase tracking-[0.25em] text-gold-200 font-medium">
            Digital Identity & Community Hub
          </span>
        </div>

        {/* Main Brand Title - MANA SATHULURU */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tight text-white mb-6 select-none animate-aesthetic-title flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-6">
          <span className="drop-shadow-[0_12px_40px_rgba(0,0,0,0.95)]">
            MANA
          </span>
          <span className="text-gold-gradient text-subtle-glow">
            SATHULURU
          </span>
        </h1>

        {/* Tagline */}
        <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-slate-200/90 max-w-2xl mb-10 tracking-wide font-light drop-shadow-[0_4px_20px_rgba(0,0,0,0.85)] animate-aesthetic-sub">
          “Mana Ooru. Mana Gnapakalu. Mana Sathuluru.”
        </p>

        {/* CTA Action Buttons with Aesthetic Stagger */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full sm:w-auto animate-aesthetic-cta">
          <button
            onClick={() => scrollToSection('satuluru')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-slate-950 font-bold tracking-wide hover:shadow-[0_0_40px_rgba(229,169,60,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 group"
          >
            <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
            <span>Explore Sathuluru</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl glass-panel text-slate-100 font-semibold tracking-wide hover:text-gold-200 hover:border-gold-400/50 hover:bg-white/[0.08] active:scale-[0.98] transition-all duration-300 group"
          >
            <MessageCircle className="w-4 h-4 text-gold-400 transition-transform group-hover:scale-110" />
            <span>Connect With Us</span>
          </button>
        </div>
      </div>

      {/* Aesthetic Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-aesthetic-float">
        <button
          onClick={() => scrollToSection('about')}
          aria-label="Scroll down to About section"
          className="flex flex-col items-center gap-2 text-xs tracking-widest uppercase text-slate-400 hover:text-gold-300 transition-colors"
        >
          <span className="text-[10px] tracking-[0.25em] font-medium text-slate-400">Scroll</span>
          <div className="w-5 h-8 rounded-full border border-gold-500/30 flex items-start justify-center p-1 bg-black/40 backdrop-blur-sm">
            <div className="w-1 h-2 rounded-full bg-gold-400 opacity-80" />
          </div>
        </button>
      </div>
    </section>
  )
}
