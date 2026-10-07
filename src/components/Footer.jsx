import React from 'react'
import { Instagram, Youtube, Facebook, ArrowUp } from 'lucide-react'

export default function Footer() {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/mana_sathuluru/'
  const youtubeUrl = import.meta.env.VITE_YOUTUBE_URL || ''
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL || ''

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Sathuluru', href: '#satuluru' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'Support', href: '#support' },
    { name: 'Contact', href: '#contact' },
  ]

  const handleLinkClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="relative bg-[#040507] border-t border-white/[0.06] pt-16 pb-12 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Tier: Brand, Tagline, & Quick Links */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand & Tagline */}
          <div className="text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold tracking-wider text-white mb-1">
              MANA SATHULURU
            </h3>
            <p className="font-serif italic text-sm text-gold-300/80">
              “Mana Ooru. Mana Gnapakalu. Mana Sathuluru.”
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap justify-center items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="text-xs uppercase tracking-widest text-slate-400 hover:text-gold-300 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-4">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-300 hover:border-gold-500/30 hover:scale-105 transition-all"
            >
              <Instagram className="w-4 h-4" />
            </a>

            {youtubeUrl && (
              <a
                href={youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-300 hover:border-gold-500/30 hover:scale-105 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            )}

            {facebookUrl && (
              <a
                href={facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:text-gold-300 hover:border-gold-500/30 hover:scale-105 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
            )}

            <button
              onClick={scrollToTop}
              aria-label="Back to top"
              className="w-10 h-10 rounded-xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 hover:bg-gold-500/20 hover:border-gold-400 transition-all"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Tier: Copyright & Village Heritage */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <p>© 2026 Mana Sathuluru. All rights reserved.</p>
          <p className="font-serif italic text-slate-400">
            Dedicated with pride to the soil, people & culture of Sathuluru.
          </p>
        </div>

      </div>
    </footer>
  )
}
