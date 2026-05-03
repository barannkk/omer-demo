'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import ContactSection from '@/components/ContactSection'

interface Project {
  id: string
  brand: string
  title: string
  category: string
  src: string
}

const categories = [
  { id: 'tumu', label: 'TÜMÜ' },
  { id: 'ai-video', label: 'AI VIDEO' },
  { id: 'social-media', label: 'SOCIAL MEDIA' },
  { id: 'packaging', label: 'PACKAGING' },
  { id: 'motion-design', label: 'MOTION DESIGN' },
  { id: 'app-design', label: 'APP DESIGN' },
]

const brands = [
  { id: 'tumu', label: 'TÜM MARKALAR' },
  { id: 'avon', label: 'AVON' },
  { id: 'codage', label: 'CODAGE' },
  { id: 'mavi', label: 'MAVI' },
  { id: 'oriflame', label: 'ORIFLAME' },
  { id: 'penti', label: 'PENTİ' },
  { id: 'watsons', label: 'WATSONS' },
]

const projects: Project[] = [
  { id: 'oriflame-app', brand: 'oriflame', title: 'Oriflame – App UI', category: 'app-design', src: '/images/vet_panel_kapak.jpg' },
  { id: 'mavi-motion', brand: 'mavi', title: 'Mavi – Motion', category: 'motion-design', src: '/images/omr1.post.jpeg' },
  { id: 'penti-anneler', brand: 'penti', title: 'Penti – Anneler Günü', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'omrwork-identity', brand: 'omrwork', title: 'OMRWORK – Brand Identity', category: 'ai-video', src: '/images/omr1.post.jpeg' },
  { id: 'codage-dashboard', brand: 'codage', title: 'Codage – Dashboard', category: 'ai-video', src: '/images/vet_panel_kapak.jpg' },
  { id: 'avon-far-away', brand: 'avon', title: 'Avon – Far Away Rebel', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'penti-packaging', brand: 'penti', title: 'Penti – Ambalaj', category: 'packaging', src: '/projects/avon_anneler_gunu.png' },
  { id: 'watsons-doldurkabi', brand: 'watsons', title: 'Watsons × DoldurKabı', category: 'ai-video', src: '/images/vet_panel_kapak.jpg' },
  { id: 'avon-love-beauty', brand: 'avon', title: 'Avon – Love Beauty', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'codage-klinik', brand: 'codage', title: 'Codage – Klinik Yazılım', category: 'ai-video', src: '/images/vet_panel_kapak.jpg' },
  { id: 'mavi-new-season', brand: 'mavi', title: 'Mavi – New Season', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'oriflame-eclat', brand: 'oriflame', title: 'Oriflame – Éclat Natural', category: 'social-media', src: '/images/omr1.post.jpeg' },
]

const INITIAL_COUNT = 8
type SortOption = 'newest' | 'oldest' | 'brand'
const sortLabels: Record<SortOption, string> = { newest: 'En Yeni', oldest: 'En Eski', brand: 'Markaya Göre' }

// ─── Scroll Bar Gizleme (paylaşılan style) ───
const noScrollbar: React.CSSProperties = { scrollbarWidth: 'none' }

// ─── Lightbox ───
function Lightbox({ projects, index, onClose, onPrev, onNext }: {
  projects: Project[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const project = projects[index]
  const scrollYRef = useRef(0)

  useEffect(() => {
    scrollYRef.current = window.scrollY
    document.body.style.cssText = `position:fixed;top:-${scrollYRef.current}px;width:100%;overflow:hidden`
    return () => {
      document.body.style.cssText = ''
      window.scrollTo(0, scrollYRef.current)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, onNext, onPrev])

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      {/* Kapat */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-[44px] h-[44px] rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.06)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Sayaç */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
        <span className="text-[#c2e200] text-[14px] font-bold tabular-nums">{index + 1}</span>
        <span className="text-white/25 text-[14px]">/</span>
        <span className="text-white/40 text-[14px]">{projects.length}</span>
      </div>

      {/* Önceki / Sonraki */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#c2e200] hover:border-[#c2e200]/50 transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M15 18l-6-6 6-6" /></svg>
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-[44px] h-[44px] sm:w-[48px] sm:h-[48px] rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#c2e200] hover:border-[#c2e200]/50 transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5"><path d="M9 18l6-6-6-6" /></svg>
      </button>

      {/* İçerik — ok butonlarıyla çakışmayacak şekilde padding ayarlı */}
      <div
        className="flex flex-col items-center gap-4 px-[56px] sm:px-[80px]"
        style={{ maxWidth: '480px', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-[20px] overflow-hidden" style={{ aspectRatio: '1080 / 1350' }}>
          <Image src={project.src} alt={project.title} fill className="object-cover" priority />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-black bg-[#c2e200] px-[10px] py-[5px] rounded-full">
              {project.brand.toUpperCase()}
            </span>
          </div>
        </div>
        <p className="text-white/70 font-medium text-[14px] text-center">{project.title}</p>
      </div>
    </div>
  )
}

// ─── Project Card ───
function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      className="group relative overflow-hidden rounded-[16px] bg-[#111] cursor-pointer"
      style={{ aspectRatio: '1080 / 1350' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <Image
        src={project.src}
        alt={project.title}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        draggable={false}
      />
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)', opacity: hovered ? 1 : 0.55 }}
      />
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-black bg-[#c2e200] px-[10px] py-[5px] rounded-full">
          {project.brand.toUpperCase()}
        </span>
      </div>
      <div
        className="absolute top-3 right-3 w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300"
        style={{ opacity: hovered ? 1 : 0, transform: hovered ? 'scale(1)' : 'scale(0.6)', background: '#c2e200' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        <p
          className="text-white font-semibold text-[13px] sm:text-[14px] leading-[1.3] mb-[3px] transition-all duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(6px)', opacity: hovered ? 1 : 0.85 }}
        >
          {project.title}
        </p>
        <p
          className="text-white/50 text-[10px] sm:text-[11px] uppercase tracking-[0.1em] transition-all duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(6px)', opacity: hovered ? 0.7 : 0 }}
        >
          {categories.find(c => c.id === project.category)?.label ?? project.category}
        </p>
      </div>
    </div>
  )
}

// ─── Works Page ───
export default function WorksPage() {
  const searchParams = useSearchParams()

  const initCategory = searchParams.get('category') ?? 'tumu'
  const initBrand = searchParams.get('brand') ?? 'tumu'

  const [activeCategory, setActiveCategory] = useState(initCategory)
  const [activeBrand, setActiveBrand] = useState(initBrand)
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const categoryScrollRef = useRef<HTMLDivElement>(null)
  const brandScrollRef = useRef<HTMLDivElement>(null)
  const sortRef = useRef<HTMLDivElement>(null)

  // URL param değişince state güncelle
  useEffect(() => {
    setActiveCategory(searchParams.get('category') ?? 'tumu')
    setActiveBrand(searchParams.get('brand') ?? 'tumu')
    setVisibleCount(INITIAL_COUNT)
  }, [searchParams])

  // Aktif markayı tab bar'da görünür yap
  useEffect(() => {
    if (!brandScrollRef.current || activeBrand === 'tumu') return
    const btn = brandScrollRef.current.querySelector(`[data-brand="${activeBrand}"]`) as HTMLElement
    btn?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  }, [activeBrand])

  // Sort dropdown dışına tıklayınca kapat
  useEffect(() => {
    if (!sortOpen) return
    const handler = (e: MouseEvent) => {
      if (!sortRef.current?.contains(e.target as Node)) setSortOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [sortOpen])

  const filtered = projects.filter(p => {
    const catOk = activeCategory === 'tumu' || p.category === activeCategory
    const brandOk = activeBrand === 'tumu' || p.brand === activeBrand
    return catOk && brandOk
  })

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'brand') return a.brand.localeCompare(b.brand)
    if (sortBy === 'oldest') return projects.indexOf(a) - projects.indexOf(b)
    return projects.indexOf(b) - projects.indexOf(a)
  })

  const visible = sorted.slice(0, visibleCount)
  const hasMore = visibleCount < sorted.length

  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevLightbox = useCallback(() => setLightboxIndex(i => i !== null ? (i - 1 + visible.length) % visible.length : null), [visible.length])
  const nextLightbox = useCallback(() => setLightboxIndex(i => i !== null ? (i + 1) % visible.length : null), [visible.length])



  return (
    <main className="bg-black min-h-screen pt-[var(--nav-h)]">

      {lightboxIndex !== null && (
        <Lightbox projects={visible} index={lightboxIndex} onClose={closeLightbox} onPrev={prevLightbox} onNext={nextLightbox} />
      )}

      {/* Arka plan efekti */}
      <div
        className="fixed top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none z-0"
        style={{ background: 'radial-gradient(circle, rgba(194,226,0,0.07) 0%, transparent 70%)', filter: 'blur(100px)' }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 xl:px-20 py-[48px] sm:py-[64px] md:py-[80px]">

        {/* BAŞLIK + SORT */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[#c2e200] text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase mb-3 block">
              PORTFOLYO
            </span>
            <h1 className="text-white font-medium leading-[1.0] tracking-tight text-[36px] sm:text-[52px] md:text-[64px]">
              Tüm <em className="font-canela font-medium text-[#c2e200]">işlerim.</em>
            </h1>
            <p className="text-white/40 text-[13px] sm:text-[15px] mt-3 leading-[1.7]">
              Markalara değer katan yaratıcı işler.
              <br className="hidden sm:block" />
              Tüm projelerimi aşağıda görebilirsiniz.
            </p>
          </div>

          {/* Sort dropdown */}
          <div className="relative shrink-0" ref={sortRef}>
            <button
              onClick={() => setSortOpen(v => !v)}
              className="flex items-center gap-2 border border-white/15 hover:border-[#c2e200]/50 rounded-full px-4 sm:px-5 py-[10px] text-white/70 hover:text-white text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              <span className="hidden xs:inline">SIRALAMA: </span>{sortLabels[sortBy]}
              <svg
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="w-[14px] h-[14px] transition-transform duration-300"
                style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {sortOpen && (
              <div
                className="absolute right-0 top-[calc(100%+8px)] z-50 rounded-[14px] border border-white/10 overflow-hidden"
                style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)', minWidth: '160px' }}
              >
                {(['newest', 'oldest', 'brand'] as SortOption[]).map(opt => (
                  <button
                    key={opt}
                    onClick={() => { setSortBy(opt); setSortOpen(false) }}
                    className="w-full text-left px-5 py-3 text-[13px] font-medium transition-all duration-200 hover:bg-white/5"
                    style={{ color: sortBy === opt ? '#c2e200' : 'rgba(255,255,255,0.6)' }}
                  >
                    {sortLabels[opt]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KATEGORİ FİLTRELER — yatay scroll, mobilde taşmaz */}
        <div className="flex items-center gap-2 mb-5">
          <button
            className="shrink-0 w-[28px] h-[28px] rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            onClick={() => { if (categoryScrollRef.current) categoryScrollRef.current.scrollLeft -= 160 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div
            ref={categoryScrollRef}
            className="flex items-center gap-2 overflow-x-auto flex-1"
            style={noScrollbar}
          >
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setVisibleCount(INITIAL_COUNT) }}
                className="shrink-0 rounded-full px-3 sm:px-4 py-[7px] sm:py-[8px] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300 whitespace-nowrap"
                style={{
                  background: activeCategory === cat.id ? '#c2e200' : 'rgba(255,255,255,0.05)',
                  color: activeCategory === cat.id ? '#000' : 'rgba(255,255,255,0.55)',
                  border: activeCategory === cat.id ? '1px solid #c2e200' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <button
            className="shrink-0 w-[28px] h-[28px] rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            onClick={() => { if (categoryScrollRef.current) categoryScrollRef.current.scrollLeft += 160 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* MARKA TAB BAR */}
        <div className="flex items-center gap-2 mb-10 sm:mb-12">
          <button
            className="shrink-0 w-[32px] h-[32px] rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            onClick={() => { if (brandScrollRef.current) brandScrollRef.current.scrollLeft -= 160 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div
            ref={brandScrollRef}
            className="flex items-center gap-2 overflow-x-auto flex-1"
            style={noScrollbar}
          >
            {brands.map(brand => {
              const isActive = activeBrand === brand.id
              return (
                <button
                  key={brand.id}
                  data-brand={brand.id}
                  onClick={() => { setActiveBrand(brand.id); setVisibleCount(INITIAL_COUNT) }}
                  className="shrink-0 flex items-center gap-2 rounded-full px-3 sm:px-4 py-[7px] sm:py-[8px] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap"
                  style={{
                    background: isActive ? '#c2e200' : 'rgba(255,255,255,0.04)',
                    color: isActive ? '#000' : 'rgba(255,255,255,0.5)',
                    border: isActive ? '1px solid #c2e200' : '1px solid rgba(255,255,255,0.08)',
                  }}
                >
                  {brand.id !== 'tumu' && (
                    <span
                      className="w-[6px] h-[6px] rounded-full shrink-0"
                      style={{ background: isActive ? '#000' : '#c2e200', opacity: isActive ? 0.7 : 0.6 }}
                    />
                  )}
                  {brand.label}
                </button>
              )
            })}
          </div>
          <button
            className="shrink-0 w-[32px] h-[32px] rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200"
            onClick={() => { if (brandScrollRef.current) brandScrollRef.current.scrollLeft += 160 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* GRID */}
        {visible.length > 0 ? (
          <div
            className="grid gap-3 sm:gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' }}
          >
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} onClick={() => setLightboxIndex(i)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-[80px] sm:py-[100px] gap-4">
            <div className="w-[60px] h-[60px] rounded-full border border-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="w-6 h-6">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-white/30 text-[14px]">Bu filtreler için proje bulunamadı.</p>
            <button
              onClick={() => { setActiveCategory('tumu'); setActiveBrand('tumu') }}
              className="text-[#c2e200] text-[13px] font-semibold hover:underline"
            >
              Filtreleri temizle
            </button>
          </div>
        )}

        {/* DAHA FAZLA YÜKLE */}
        {hasMore && (
          <div className="flex justify-center mt-10 sm:mt-12">
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="group inline-flex items-center gap-3 border border-white/15 hover:border-[#c2e200]/60 rounded-full px-6 sm:px-8 py-3 sm:py-4 text-white/60 hover:text-[#c2e200] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#c2e200]/5"
            >
              DAHA FAZLA YÜKLE
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] transition-transform duration-300 group-hover:translate-y-[3px]">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </button>
          </div>
        )}

        <p className="text-center text-white/20 text-[12px] mt-6 tracking-wider">
          {visible.length} / {sorted.length} proje gösteriliyor
        </p>
      </div>

      <ContactSection id="contact" />
    </main>
  )
}