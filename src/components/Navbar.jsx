import React, { useState, useEffect } from 'react'
import { Instagram, Menu, X, ArrowUpRight } from 'lucide-react'

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/mana_sathuluru/'

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
    setMobileMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-3.5 bg-[#06080dc2] backdrop-blur-xl border-b border-gold-500/15 shadow-[0_10px_30px_rgba(0,0,0,0.6)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo / Text */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, '#home')}
            className="group flex items-center gap-3 focus:outline-none"
            aria-label="Mana Sathuluru Home"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gold-400/20 to-gold-600/10 border border-gold-500/30 flex items-center justify-center text-gold-400 group-hover:border-gold-400 group-hover:scale-105 transition-all">
              <span className="font-serif font-black text-sm tracking-tighter">MS</span>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-wider font-bold text-white group-hover:text-gold-300 transition-colors">
                MANA SATHULURU
              </span>
              <span className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-sans -mt-0.5">
                సాతులూరు
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/60 border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest text-slate-300 hover:text-white hover:bg-white/[0.08] transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action: Instagram Link */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Mana Sathuluru on Instagram"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-gold-300 bg-gold-500/10 border border-gold-500/30 hover:bg-gold-500/20 hover:border-gold-400 hover:shadow-[0_0_20px_rgba(229,169,60,0.25)] transition-all duration-300 group"
            >
              <Instagram className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
              <span>Instagram</span>
              <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="md:hidden p-2 rounded-xl bg-slate-900/80 border border-white/10 text-slate-200 hover:text-gold-300 hover:border-gold-500/30 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden bg-black/85 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 transition-all duration-300">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.25em] text-gold-400/80 font-medium px-4 mb-2">
              Menu Navigation
            </p>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-3.5 rounded-xl font-serif text-xl text-slate-100 hover:text-gold-300 hover:bg-white/[0.05] border border-transparent hover:border-gold-500/20 transition-all"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-gold-500 to-amber-600 text-slate-950 font-semibold tracking-wide"
            >
              <Instagram className="w-4 h-4" />
              <span>Follow on Instagram</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="text-center text-xs text-slate-400 font-serif italic">
              “Mana Ooru. Mana Gnapakalu. Mana Sathuluru.”
            </p>
          </div>
        </div>
      )}
    </>
  )
}
