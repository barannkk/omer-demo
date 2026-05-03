'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Play, Radio, Package, Film, Store, Sparkles, Fingerprint } from "lucide-react"
import ContactSection from '@/components/ContactSection'

// ─── Types ───
interface Brand {
  id: string
  name: string
  label: string
  description: string
  src: string
}

// ─── Markalar ───
const brands: Brand[] = [
  { id: 'omrwork', name: 'OMRWORK', label: 'DESIGNED BY OMER', description: 'WORK OF ART', src: '/images/omr1.post.jpeg' },
  { id: 'avon', name: 'AVON', label: 'Beauty Campaign', description: 'Koku serisinin lansmanı için 360° dijital kampanya tasarımı.', src: '/projects/avon_anneler_gunu.png' },
  { id: 'vitara', name: 'VITARA', label: 'Doğal İçecek Serisi', description: 'Ambalaj tasarımı ve ürün görselleri.', src: '/projects/avon_anneler_gunu.png' },
  { id: 'doldurkabi', name: 'DoldurKabı', label: 'Label Design', description: 'Sürdürülebilir ambalaj sistemi ve marka kimliği.', src: '/images/vet_panel_kapak.jpg' },
  { id: 'codage', name: 'CODAGE', label: 'Brand Identity', description: 'Premium cilt bakım markası için kimlik tasarımı.', src: '/projects/avon_anneler_gunu.png' },
  { id: 'marka6', name: 'MARKA 6', label: 'Campaign Design', description: 'Sosyal medya ve dijital kampanya görselleri.', src: '/images/vet_panel_kapak.jpg' },
]

// ─── Servisler — category id'leri works sayfasıyla eşleşiyor ───
const services = [
  { icon: <Play size={16} />, label: "AI Video Creation", category: "ai-video" },
  { icon: <Radio size={16} />, label: "Social Media Ads", category: "social-media" },
  { icon: <Package size={16} />, label: "Product Packing", category: "packaging" },
  { icon: <Film size={16} />, label: "Motion Design", category: "motion-design" },
  { icon: <Store size={16} />, label: "AppStore", category: "app-design" },
]

// ─── Card ───
function Card({ brand, isActive }: { brand: Brand; isActive: boolean }) {
  return (
    <div
      className="relative w-full h-full rounded-[24px] overflow-hidden"
      style={{ background: '#111', boxShadow: isActive ? '0 20px 60px rgba(0,0,0,0.6)' : '0 8px 30px rgba(0,0,0,0.3)' }}
    >
      {brand.src ? (
        <Image src={brand.src} alt={brand.name} fill className="object-cover" draggable={false} />
      ) : (
        <div className="w-full h-full bg-[#1a1a1a]" />
      )}

      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.3) 30%, transparent 50%)' }} />

      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-row items-end justify-between gap-4">
        <div className="flex flex-col gap-0 flex-1">
          <span className="text-accent text-[22px] font-bold uppercase">{brand.name}</span>
          <span className="text-white font-medium text-[20px] leading-[1.2]">{brand.label}</span>
          {isActive && <p className="text-white/65 text-[13px] leading-[1.5] mt-0">{brand.description}</p>}
        </div>

        {isActive && (
          // ✅ Marka id'sini ?brand= param olarak gönder
          <Link
            href={`/works?brand=${brand.id.toLowerCase()}`}
            className="w-[44px] h-[44px] rounded-full bg-[#c2e200] flex items-center justify-center transition-all duration-300 hover:bg-[#d4f500] hover:scale-110 shrink-0"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[14px] h-[14px]">
              <path d="M7 17L17 7" /><path d="M7 7h10v10" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}

const mod = (n: number, m: number): number => ((n % m) + m) % m

function BrandShowcase() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const total = brands.length
  const touchStartX = useRef<number>(0)
  const touchEndX = useRef<number>(0)

  const go = useCallback((dir: 'next' | 'prev') => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(prev => dir === 'next' ? mod(prev + 1, total) : mod(prev - 1, total))
    setTimeout(() => setIsAnimating(false), 800)
  }, [isAnimating, total])

  const goNext = useCallback(() => go('next'), [go])
  const goPrev = useCallback(() => go('prev'), [go])

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.changedTouches[0].screenX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX
    const diff = touchStartX.current - touchEndX.current
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
  }

  const progress = ((current + 1) / total) * 100

  const getOffset = (index: number) => {
    let offset = (index - current) % total
    if (offset > Math.floor(total / 2)) offset -= total
    if (offset < -Math.floor(total / 2)) offset += total
    return offset
  }

  const getCardStyle = (offset: number): React.CSSProperties => {
    const isCenter = offset === 0
    const isLeft = offset === -1
    const isRight = offset === 1
    const transition = 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1), opacity 600ms ease'
    const base: React.CSSProperties = { position: 'absolute', top: '50%', left: '50%', width: 'clamp(240px, 70vw, 380px)', aspectRatio: '4 / 5', transformOrigin: 'center center', transition }

    if (isCenter) return { ...base, transform: 'translate(-50%, -50%) scale(1)', opacity: 1, zIndex: 20 }
    if (isLeft) return { ...base, transform: 'translate(calc(-50% - 68%), -50%) scale(0.85)', opacity: 0.4, zIndex: 10, cursor: 'pointer' }
    if (isRight) return { ...base, transform: 'translate(calc(-50% + 68%), -50%) scale(0.85)', opacity: 0.4, zIndex: 10, cursor: 'pointer' }
    return { ...base, transform: offset < 0 ? 'translate(calc(-50% - 200%), -50%) scale(0.7)' : 'translate(calc(-50% + 200%), -50%) scale(0.7)', opacity: 0, zIndex: 0, pointerEvents: 'none' }
  }

  return (
    <section className="relative w-full min-h-[100dvh] bg-black overflow-hidden flex items-center px-[4%]">
      <div className="absolute top-1/2 right-[-100px] -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(194,226,0,0.18) 0%, rgba(194,226,0,0.06) 45%, transparent 70%)', filter: 'blur(70px)' }} />
      <div className="absolute bottom-[-300px] left-[-200px] w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(194,226,0,0.15) 0%, rgba(194,226,0,0.05) 45%, transparent 70%)', filter: 'blur(80px)' }} />

      <div className="relative z-10 w-full max-w-[1700px] mx-auto flex flex-col justify-between min-h-[100dvh] py-[30px] lg:py-[60px]">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-20 flex-1">

          {/* SOL ALAN */}
          <div className="flex flex-col justify-start w-full lg:w-[26%] shrink-0 py-2 lg:py-4 pr-4">
            <div className="flex flex-col pt-[20px] lg:pt-[80px]">
              <span className="flex items-center gap-2 text-[#c2e200] text-[11px] tracking-[0.22em] font-medium uppercase mb-3 lg:mb-6">
                <span className="w-2 h-2 rounded-full bg-[#c2e200] inline-block" />
                SEÇİLMİŞ İŞLERİM
              </span>
              <h2 className="text-white font-medium leading-[1.0] tracking-tight mb-3 lg:mb-6 text-[48px] sm:text-[56px] lg:text-[64px] xl:text-[80px]">
                <span className="whitespace-nowrap">Ideas become</span> <br />
                <em className="font-canela font-medium text-[#c2e200]">visuals</em>
              </h2>
              <p className="text-white/55 text-[15px] lg:text-[16px] leading-[1.75] max-w-[320px] mb-4 lg:mb-8">
                Markaların hedeflerine ulaşması için yaratıcı, etkili ve akılda kalıcı işler üretiyorum.
              </p>
              <div className="mt-0 lg:mt-2">
                <Link href="/works" className="group inline-flex items-center gap-3 border border-[#c2e200] text-[#c2e200] font-medium uppercase tracking-[0.1em] text-[12px] px-[24px] py-[12px] rounded-full transition-all duration-300 hover:bg-[#c2e200]/10 shrink-0 w-max">
                  TÜM İŞLERİ GÖR
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px] transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
                    <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* SAĞ ALAN (Kartlar) */}
          <div className="relative flex-1">
            <div className="relative w-full h-full" style={{ minHeight: 'clamp(400px, 60vh, 800px)' }} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
              {brands.map((brand, index) => {
                const offset = getOffset(index)
                const style = getCardStyle(offset)
                const isActive = offset === 0
                return (
                  <div key={brand.id || index} style={style} onClick={() => { if (offset === -1) goPrev(); if (offset === 1) goNext() }}>
                    <Card brand={brand} isActive={isActive} />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* ALT BAR */}
        <div className="flex items-center w-full -mt-10 pb-4 gap-8 relative z-20">
          <div className="shrink-0">
            <span className="text-white tabular-nums flex items-baseline gap-[2px]">
              <span className="text-[24px] font-medium text-[#c2e200]">{String(current + 1).padStart(2, '0')}</span>
              <span className="text-white/20 text-[18px] mx-1">/</span>
              <span className="text-white/40 text-[18px]">{String(total).padStart(2, '0')}</span>
            </span>
          </div>
          <div className="flex-1 h-[1px] bg-white/10 relative">
            <div className="absolute top-0 left-0 h-full bg-[#c2e200] transition-all duration-700 ease-out shadow-[0_0_10px_rgba(194,226,0,0.3)]" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={goPrev} disabled={isAnimating} className="w-[50px] h-[50px] rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 hover:border-[#c2e200] hover:text-[#c2e200] disabled:opacity-20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button onClick={goNext} disabled={isAnimating} className="w-[50px] h-[50px] rounded-full border border-white/10 flex items-center justify-center text-white/50 transition-all duration-300 hover:border-[#c2e200] hover:text-[#c2e200] disabled:opacity-20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Marquee ───
const marqueeLogos = [
  { src: '/logos/avonlogo.svg', alt: 'Avon' },
  { src: '/logos/codagelogo.svg', alt: 'Codage' },
  { src: '/logos/avonlogo.svg', alt: 'Marka 3' },
  { src: '/logos/codagelogo.svg', alt: 'Marka 4' },
  { src: '/logos/omr_beyaz_logo.svg', alt: 'Marka 5' },
]

function Marquee() {
  const quadrupled = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos]
  return (
    <div className="relative m-0 overflow-hidden bg-transparent transition-all duration-300 py-[20px] md:py-[30px] xl:py-[40px] before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:bg-gradient-to-r before:from-black before:to-transparent before:w-[30px] md:before:w-[100px] xl:before:w-[250px] after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:bg-gradient-to-l after:from-black after:to-transparent after:w-[30px] md:after:w-[100px] xl:after:w-[250px]">
      <div className="flex w-max items-center animate-[marquee_50s_linear_infinite]">
        {quadrupled.map((logo, i) => (
          <div key={i} className="shrink-0">
            <div className="flex items-center justify-center opacity-40 hover:opacity-100 brightness-0 invert transition-all duration-300 ease-in hover:scale-[1.15] mx-[10px] md:mx-[50px] xl:mx-[90px] h-[20px] md:h-[25px] xl:h-[30px] w-[90px] md:w-[100px] xl:w-[120px]">
              <Image src={logo.src} alt={logo.alt} width={200} height={80} className="w-full h-full object-contain scale-[1.0] md:scale-[1.5] xl:scale-[1.7]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Ana Sayfa ───
export default function HomePage() {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => { setIsClient(true) }, [])

  return (
    <>
      <section className="relative w-full h-[100svh] overflow-hidden bg-black">
        <div className="absolute bottom-[-200px] left-[-200px] w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(194,226,0,0.12) 0%, rgba(194,226,0,0.04) 45%, transparent 70%)', filter: 'blur(90px)' }} />

        <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto flex flex-col lg:flex-row items-center px-6 sm:px-10 md:px-16 xl:px-20">

          {/* SOL: BAŞLIK + BUTONLAR */}
          <div className="flex flex-col justify-center w-full lg:w-[45%] h-1/2 lg:h-full pb-0 sm:pb-4 lg:pb-0 pt-[var(--nav-h)] lg:pt-0">
            <h1 className="font-medium leading-[0.95] tracking-tight text-white mb-4 sm:mb-6 xl:mb-8">
              <span className="block animate-text-slide text-[56px] sm:text-[68px] md:text-[76px] lg:text-[86px] portrait:lg:text-[100px] landscape:lg:text-[70px] xl:text-[clamp(90px,8vw,130px)]" style={{ animationDelay: '0.1s' }}>Design that</span>
              <span className="block animate-text-slide text-[56px] sm:text-[68px] md:text-[76px] lg:text-[86px] portrait:lg:text-[100px] landscape:lg:text-[70px] xl:text-[clamp(90px,8vw,130px)]" style={{ animationDelay: '0.3s' }}>
                feels <em className="font-canela font-medium text-[#c2e200]">expensive.</em>
              </span>
            </h1>
            <p className="-mt-[5px] sm:-mt-[10px] xl:-mt-[20px] text-white/60 font-light animate-text-slide mb-6 sm:mb-8 xl:mb-12 text-[16px] sm:text-[18px] md:text-[20px] portrait:lg:text-[26px] landscape:lg:text-[18px] xl:text-[clamp(20px,1.7vw,28px)] max-w-[320px] sm:max-w-[420px] md:max-w-[500px] xl:max-w-[600px] leading-relaxed" style={{ animationDelay: '0.5s' }}>
              I build visuals that make brands stand out, not just exist.
            </p>
            <div className="-mt-[5px] sm:-mt-[10px] xl:-mt-[20px] flex items-center gap-3 sm:gap-4 xl:gap-6 flex-wrap animate-text-slide" style={{ animationDelay: '0.7s' }}>
              <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="group inline-flex items-center gap-[8px] justify-center rounded-full bg-[#c2e200] text-black font-extrabold uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[#d4f500] hover:-translate-y-[2px] text-[12px] px-[22px] py-[12px] sm:text-[12px] sm:px-[24px] sm:py-[13px] xl:text-[14px] xl:px-[35px] xl:py-[16px]"
              >
                Bir Proje Başlat
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] xl:w-[14px] xl:h-[14px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </a>
              <Link href="/works" className="group inline-flex items-center gap-[8px] justify-center rounded-full border border-[#c2e200] bg-black text-[#c2e200] font-bold uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[#c2e200]/10 hover:-translate-y-[2px] text-[12px] px-[22px] py-[11.5px] sm:text-[12px] sm:px-[24px] sm:py-[12.5px] xl:text-[14px] xl:px-[35px] xl:py-[15.5px]">
                TÜM İŞLERİ GÖR
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[12px] h-[12px] xl:w-[14px] xl:h-[14px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]">
                  <path d="M7 17L17 7" /><path d="M7 7h10v10" />
                </svg>
              </Link>
            </div>
          </div>

          {/* SAĞ: TELEFON + SERVİS LİSTESİ */}
          <div className="w-full lg:w-[55%] h-1/2 lg:h-full flex items-center justify-center lg:justify-end relative z-10 pt-8 sm:pt-6 md:pt-4 lg:pt-0 -translate-x-[15%] sm:-translate-x-[12%] md:-translate-x-[8%] lg:-translate-x-[4%] xl:translate-x-0">
            <div className="relative flex items-center justify-center shrink-0 transition-all duration-500 w-[600px] sm:w-[620px] md:w-[700px] lg:w-[820px] xl:w-[min(990px,52vw)] scale-100 xl:scale-110">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[70%] bg-[#c2e200] rounded-full blur-[60px] sm:blur-[80px] xl:blur-[100px] opacity-30 z-0 pointer-events-none" />
              <div className="relative z-20 w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-float">
                <Image src="/images/mockup.png" alt="OMR Work Phone Mockup" width={1600} height={3200} className="w-full h-auto object-contain" priority />
              </div>

              {/* ✅ Servis listesi — her biri tıklanabilir Link, category param ile yönlendirir */}
              <div className="absolute top-1/2 -translate-y-1/2 flex flex-col z-30 left-[67%] sm:left-[68%] md:left-[69%] lg:left-[70%] xl:left-[72%] w-[140px] sm:w-[155px] md:w-[170px] lg:w-[185px] xl:w-[min(200px,10vw)]">
                {services.map((item, i) => (
                  <Link
                    key={i}
                    href={`/works?category=${item.category}`}
                    className="service-item-anim flex flex-col w-full group"
                    style={{ animationDelay: `${0.3 + i * 0.2}s` }}
                  >
                    <div className="flex items-center w-full justify-start gap-[5px] sm:gap-[7px] md:gap-[9px] lg:gap-[11px] xl:gap-[14px] py-[7px] sm:py-[8px] md:py-[11px] lg:py-[13px] xl:py-[16px]">
                      <span className="flex items-center justify-center text-white translate-y-[2px] xl:translate-y-[4px] group-hover:text-[#c2e200] transition-colors duration-300 shrink-0 [&>svg]:w-[13px] [&>svg]:h-[13px] sm:[&>svg]:w-[14px] sm:[&>svg]:h-[14px] md:[&>svg]:w-[15px] md:[&>svg]:h-[15px] lg:[&>svg]:w-[16px] lg:[&>svg]:h-[16px] xl:[&>svg]:w-[18px] xl:[&>svg]:h-[18px]">
                        {item.icon}
                      </span>
                      <span className="text-white group-hover:text-[#c2e200] transition-colors duration-300 font-extralight tracking-wider leading-none whitespace-nowrap text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]">
                        {item.label}
                      </span>
                    </div>
                    {i < services.length - 1 && (
                      <div className="w-full lg:w-[125%] h-[1px] bg-gradient-to-r from-transparent via-[#c2e200]/60 to-transparent shadow-[0_0_10px_rgba(194,226,0,0.2)]" />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div><Marquee /></div>

      <section id="work">
        <BrandShowcase />
      </section>

      <ContactSection id="contact" />
    </>
  )
}