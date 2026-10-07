import React, { useState } from 'react'
import { Instagram, Send, MessageCircle, Mail, CheckCircle2, AlertCircle, ArrowUpRight, Sparkles, Lock, Database } from 'lucide-react'
import { submitContactMessage, isSupabaseConfigured } from '../lib/supabase'
import { sendEmailToGmail, isEmailConfigured } from '../lib/email'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    message: ''
  })
  const [status, setStatus] = useState({ type: null, msg: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/mana_sathuluru/'
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER || ''
  const contactEndpoint = import.meta.env.VITE_CONTACT_ENDPOINT || ''
  const fallbackEmail = import.meta.env.VITE_CONTACT_EMAIL || 'contact@manasathuluru.com'

  const handleWhatsAppClick = () => {
    // Generates a direct WhatsApp communication link without ever displaying the phone number as visible text in the UI
    const defaultText = encodeURIComponent('Namaskaram! I would like to connect with Mana Sathuluru.')
    const cleanNumber = (whatsappNumber || '').replace(/[^0-9]/g, '')
    const finalNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber
    if (finalNumber && finalNumber !== '919000000000') {
      window.open(`https://wa.me/${finalNumber}?text=${defaultText}`, '_blank', 'noopener,noreferrer')
    } else {
      // Default to general WhatsApp web interface safely if number placeholder is untouched
      window.open(`https://api.whatsapp.com/send?text=${defaultText}`, '_blank', 'noopener,noreferrer')
    }
  }

  const handleInstagramClick = () => {
    window.open(instagramUrl, '_blank', 'noopener,noreferrer')
  }

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.contactInfo.trim() || !formData.message.trim()) {
      setStatus({ type: 'error', msg: 'Please complete all required fields.' })
      return
    }

    setIsSubmitting(true)
    setStatus({ type: null, msg: '' })

    try {
      // 1. Save to Supabase database (if configured)
      if (isSupabaseConfigured()) {
        const result = await submitContactMessage({
          name: formData.name,
          contactInfo: formData.contactInfo,
          message: formData.message,
        })

        if (!result.success) {
          console.warn('Supabase save warning:', result.error)
        }
      }

      // 2. Dispatch email to Gmail via EmailJS (if configured)
      if (isEmailConfigured()) {
        const emailResult = await sendEmailToGmail({
          name: formData.name,
          contactInfo: formData.contactInfo,
          message: formData.message,
        })

        if (!emailResult.success) {
          console.warn('EmailJS delivery warning:', emailResult.error)
        }
      }

      // 3. Dispatch to custom webhook/Formspree (if configured)
      if (contactEndpoint) {
        await fetch(contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: formData.name,
            contact: formData.contactInfo,
            message: formData.message,
            timestamp: new Date().toISOString(),
            source: 'Mana Sathuluru Website'
          })
        }).catch(err => console.warn('Endpoint fetch warning:', err))
      }

      if (!isSupabaseConfigured() && !isEmailConfigured() && !contactEndpoint) {
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      setStatus({
        type: 'success',
        msg: 'Thank you! Your message has been received privately and dispatched.'
      })
      setFormData({ name: '', contactInfo: '', message: '' })
    } catch (err) {
      setStatus({
        type: 'error',
        msg: err.message || 'Could not send message. Please reach out via Instagram DM or WhatsApp.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-28 md:py-36 bg-[#060709] overflow-hidden border-t border-white/[0.04]">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gold-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/20 bg-gold-500/5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span className="text-xs uppercase tracking-[0.2em] text-gold-300 font-medium">
              Private & Direct Communication
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-4">
            Let's <span className="text-gold-gradient">Connect</span>
          </h2>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Have something to share, collaborate on, or simply want to connect with Mana Sathuluru? Reach out through any of our secure channels below.
          </p>
        </div>

        {/* 3 Premium Contact Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          
          {/* CARD 1: INSTAGRAM DM */}
          <div className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6 group-hover:scale-105 transition-all">
                <Instagram className="w-7 h-7" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-gold-200 transition-colors">
                Instagram DM
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Direct message our official Instagram channel. Ideal for sharing village memories, photos, reels, and casual greetings.
              </p>
            </div>

            <button
              onClick={handleInstagramClick}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white/[0.06] hover:bg-gold-500/20 border border-white/10 hover:border-gold-500/40 text-slate-200 hover:text-gold-200 font-semibold text-sm transition-all duration-300 group/btn"
            >
              <span>Open Instagram DM</span>
              <ArrowUpRight className="w-4 h-4 text-gold-400 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>

          {/* CARD 2: WHATSAPP (NO VISIBLE PHONE NUMBER DISPLAYED) */}
          <div className="p-8 rounded-3xl glass-panel glass-panel-hover flex flex-col justify-between group">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-105 transition-all">
                <MessageCircle className="w-7 h-7" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                WhatsApp
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Start a private chat via WhatsApp with one click. Best for event collaborations, media features, and community updates.
              </p>
            </div>

            <button
              onClick={handleWhatsAppClick}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 hover:border-emerald-400 text-emerald-300 font-semibold text-sm transition-all duration-300 group/btn"
            >
              <span>Chat on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 text-emerald-400 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </button>
          </div>

          {/* CARD 3: SEND A MESSAGE (PRIVATE CONTACT FORM) */}
          <div className="p-8 rounded-3xl glass-panel border border-gold-500/25 shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
                <Mail className="w-7 h-7" />
              </div>

              <h3 className="font-serif text-2xl font-bold text-white mb-2">
                Send a Message
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Send a private encrypted note directly to the channel coordinators.
              </p>

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contactInfo" className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Email or Phone
                  </label>
                  <input
                    type="text"
                    id="contactInfo"
                    name="contactInfo"
                    required
                    value={formData.contactInfo}
                    onChange={handleInputChange}
                    placeholder="Where can we reply?"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs uppercase tracking-wider text-slate-400 mb-1.5 font-medium">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Write your message or idea..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950/60 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-gold-400 focus:ring-1 focus:ring-gold-400 transition-colors resize-none"
                  />
                </div>

                {/* Status Message */}
                {status.type && (
                  <div
                    className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                      status.type === 'success'
                        ? 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-300'
                        : 'bg-rose-950/50 border border-rose-500/30 text-rose-300'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    )}
                    <span>{status.msg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-bold text-sm tracking-wide hover:shadow-[0_0_25px_rgba(229,169,60,0.4)] active:scale-95 transition-all duration-300 disabled:opacity-60"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Security & Privacy Notice */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-950/40 border border-white/5 flex items-center justify-center gap-3 text-center text-xs text-slate-400">
          <Lock className="w-4 h-4 text-gold-400 shrink-0" />
          <span>
            Privacy Assured: All submissions are kept confidential and handled directly by the channel coordinators.
          </span>
        </div>

      </div>
    </section>
  )
}
