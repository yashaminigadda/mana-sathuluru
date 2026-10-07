import React from 'react'
import { Instagram, Youtube, Facebook, ArrowUpRight, Sparkles } from 'lucide-react'

export default function SocialSection() {
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/mana_sathuluru/'
  const youtubeUrl = import.meta.env.VITE_YOUTUBE_URL || ''
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL || ''

  // Build the list of active social links based on environment configuration
  const socialLinks = [
    {
      name: 'Instagram',
      handle: '@mana_sathuluru',
      desc: 'Daily village stories, reels, heritage snapshots & community updates.',
      url: instagramUrl,
      icon: Instagram,
      primary: true,
      badge: 'Main Digital Channel'
    },
    ...(youtubeUrl ? [{
      name: 'YouTube',
      handle: 'Mana Sathuluru',
      desc: 'Long-form documentary videos and festive village coverage.',
      url: youtubeUrl,
      icon: Youtube,
      primary: false,
      badge: 'Video Archive'
    }] : []),
    ...(facebookUrl ? [{
      name: 'Facebook',
      handle: 'Mana Sathuluru',
      desc: 'Community discussions and village family network.',
      url: facebookUrl,
      icon: Facebook,
      primary: false,
      badge: 'Community Group'
    }] : []),
  ]

  return (
    <section id="social" className="relative py-28 md:py-36 bg-[#080a0f] overflow-hidden border-t border-white/[0.04]">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-gold-600/10 via-pink-600/5 to-purple-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 mb-6">
          <Instagram className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-xs uppercase tracking-[0.2em] text-gold-300 font-medium">
            Social Presence
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Follow <span className="text-gold-gradient">Mana Sathuluru</span>
        </h2>

        <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto mb-12">
          Experience our village in motion. Join the growing community celebrating the timeless culture, memories, and stories of Sathuluru.
        </p>

        {/* Prominent Instagram Feature Card - Strictly Opening Mana Sathuluru */}
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-gold-500/25 shadow-[0_25px_60px_rgba(0,0,0,0.8)] mb-12 relative overflow-hidden group">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-gold-500/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-5 text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 p-[2px] shadow-lg shrink-0">
                <div className="w-full h-full rounded-2xl bg-slate-950 flex items-center justify-center">
                  <Instagram className="w-10 h-10 text-white" />
                </div>
              </div>

              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-widest bg-gold-500/15 text-gold-300 border border-gold-500/30 mb-1.5">
                  <Sparkles className="w-3 h-3" /> Official Identity
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  @mana_sathuluru
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Reels, Stories, Heritage & Everyday Village Moments
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-gold-500 via-gold-400 to-amber-500 text-slate-950 font-bold tracking-wide hover:shadow-[0_0_35px_rgba(229,169,60,0.4)] hover:scale-[1.02] active:scale-95 transition-all duration-300 shrink-0"
            >
              <span>Follow Our Journey</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Additional Provided Social Channels */}
        {socialLinks.length > 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {socialLinks.slice(1).map((link, idx) => {
              const Icon = link.icon
              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl glass-panel glass-panel-hover flex items-center justify-between text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 group-hover:text-gold-400 group-hover:border-gold-500/30 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif text-base font-semibold text-white group-hover:text-gold-200 transition-colors">
                        {link.name}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono">
                        {link.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-gold-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </a>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
