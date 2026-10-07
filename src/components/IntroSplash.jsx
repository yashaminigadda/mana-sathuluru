import React, { useState, useEffect } from 'react'
import { Sparkles } from 'lucide-react'

export default function IntroSplash() {
  const [isVisible, setIsVisible] = useState(true)
  const [isFading, setIsFading] = useState(false)

  useEffect(() => {
    // Elegant timing: 1.8s display, then 700ms graceful fade-out
    const fadeTimer = setTimeout(() => {
      setIsFading(true)
    }, 1800)

    const removeTimer = setTimeout(() => {
      setIsVisible(false)
    }, 2500)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div
      onClick={() => setIsFading(true)}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#050608] cursor-pointer transition-all duration-700 ease-out ${
        isFading ? 'opacity-0 pointer-events-none scale-105 backdrop-blur-2xl' : 'opacity-100'
      }`}
      aria-label="Welcome to Mana Sathuluru"
    >
      {/* Cinematic Golden Radial Bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-r from-amber-600/20 via-gold-500/30 to-amber-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />

      {/* Noise Texture */}
      <div className="absolute inset-0 film-grain opacity-30 pointer-events-none" />

      {/* Center Branding Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-xl">
        
        {/* Monogram Badge */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-gold-400/20 via-black to-gold-600/20 border border-gold-500/40 shadow-[0_0_40px_rgba(229,169,60,0.3)] flex items-center justify-center mb-6 animate-aesthetic-badge">
          <span className="font-serif font-black text-2xl sm:text-3xl text-gold-400 tracking-tighter">
            MS
          </span>
        </div>

        {/* Brand Name: MANA SATHULURU */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-3 select-none animate-aesthetic-title">
          <span className="text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.95)]">
            MANA{' '}
          </span>
          <span className="text-gold-gradient text-subtle-glow">
            SATHULURU
          </span>
        </h1>

        {/* Telugu Subtitle */}
        <p className="font-serif text-gold-400/90 text-lg sm:text-xl font-medium tracking-widest mb-4 animate-aesthetic-sub">
          మన సాతులూరు
        </p>

        {/* Tagline */}
        <p className="font-serif italic text-xs sm:text-sm md:text-base text-slate-300 tracking-wider mb-8 animate-aesthetic-cta">
          “Mana Ooru. Mana Gnapakalu. Mana Sathuluru.”
        </p>

        {/* Aesthetic Golden Loading Bar */}
        <div className="w-36 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-500 to-amber-300 w-full animate-[progress_1.6s_ease-in-out_infinite]" />
        </div>

        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mt-4">
          Click anywhere to enter
        </span>
      </div>
    </div>
  )
}
