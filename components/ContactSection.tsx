'use client'

import { useState } from 'react'

export default function ContactSection({ id }: { id?: string }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    // Buraya kendi form submit logic'ini ekle
    setTimeout(() => setStatus('sent'), 1500)
  }

  return (
    <section id={id} className="relative w-full bg-black overflow-hidden px-6 sm:px-10 md:px-16 xl:px-20 py-[40px] md:py-[60px]">

      {/* Arka plan efekti */}
      <div
        className="absolute top-[-200px] right-[-200px] w-[800px] h-[800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(194,226,0,0.10) 0%, rgba(194,226,0,0.03) 45%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20">

          {/* SOL */}
          <div className="w-full lg:w-[45%] flex flex-col justify-start">
            <span className="text-[#c2e200] text-[11px] tracking-[0.22em] font-medium uppercase mb-6">
              İLETİŞİM
            </span>

            <h2 className="text-white font-medium leading-[1.05] tracking-tight mb-6 text-[40px] sm:text-[48px] lg:text-[56px] xl:text-[64px]">
              Birlikte harika <br />
              bir şeyler{' '}
              <em className="font-canela font-medium text-[#c2e200]">üretelim.</em>
            </h2>

            <p className="text-white/55 text-[15px] lg:text-[16px] leading-[1.75] max-w-[340px] mb-10">
              Projenizden bahsetmek için bana ulaşın.
            </p>

            {/* İletişim bilgileri */}
            <div className="flex flex-col sm:flex-row gap-8">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-[2px]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/50">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m2 7 10 7 10-7" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-[14px]">omr.workco@gmail.com</p>
                  <p className="text-[13px] mt-[2px]">
                    Uygunluk: <span className="text-[#c2e200]">Müsait</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center shrink-0 mt-[2px]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 text-white/50">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                    <circle cx="12" cy="9" r="2.5" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-[14px]">İstanbul, Türkiye</p>
                  <p className="text-white/40 text-[13px] mt-[2px]">Dünya çapında çalışıyorum</p>
                </div>
              </div>
            </div>
          </div>

          {/* SAĞ: FORM */}
          <div className="w-full lg:w-[55%]">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">

              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Ad Soyad"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-5 py-4 text-white text-[14px] placeholder:text-white/30 outline-none focus:border-[#c2e200]/50 transition-colors duration-300"
                />
                <input
                  type="email"
                  placeholder="E-posta"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="flex-1 bg-white/5 border border-white/10 rounded-[12px] px-5 py-4 text-white text-[14px] placeholder:text-white/30 outline-none focus:border-[#c2e200]/50 transition-colors duration-300"
                />
              </div>

              <textarea
                placeholder="Projenizden bahseder misiniz?"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                rows={5}
                className="w-full bg-white/5 border border-white/10 rounded-[12px] px-5 py-4 text-white text-[14px] placeholder:text-white/30 outline-none focus:border-[#c2e200]/50 transition-colors duration-300 resize-none"
              />

              <button
                type="submit"
                disabled={status === 'sending' || status === 'sent'}
                className="w-full bg-[#c2e200] hover:bg-[#d4f500] text-black font-bold uppercase tracking-[0.12em] text-[13px] py-[18px] rounded-[12px] transition-all duration-300 hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'GÖNDERİLİYOR...' : status === 'sent' ? 'GÖNDERİLDİ ✓' : 'GÖNDER'}
              </button>

            </form>
          </div>

        </div>
      </div>
    </section>
  )
}