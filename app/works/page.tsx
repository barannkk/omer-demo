'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'

interface Project {
  id: string
  brand: string
  title: string
  category: string
  src: string
}

const categories = [
  { id: 'tumu', label: 'TÜMÜ' },
  { id: 'social-media', label: 'SOCIAL MEDIA' },
  { id: 'packaging', label: 'PACKAGING' },
  { id: 'motion-design', label: 'MOTION DESIGN' },
  { id: 'branding', label: 'BRANDING' },
  { id: 'app-design', label: 'APP DESIGN' },
  { id: 'ui-ux', label: 'UI/UX' },
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
  { id: 'oriflame-app', brand: 'ORIFLAME', title: 'Oriflame – App UI', category: 'app-design', src: '/images/vet_panel_kapak.jpg' },
  { id: 'mavi-motion', brand: 'MAVI', title: 'Mavi – Motion', category: 'motion-design', src: '/images/omr1.post.jpeg' },
  { id: 'penti-anneler', brand: 'PENTİ', title: 'Penti – Anneler Günü', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'omrwork-identity', brand: 'OMRWORK', title: 'OMRWORK – Brand Identity', category: 'branding', src: '/images/omr1.post.jpeg' },
  { id: 'codage-dashboard', brand: 'CODAGE', title: 'Codage – Dashboard', category: 'ui-ux', src: '/images/vet_panel_kapak.jpg' },
  { id: 'avon-far-away', brand: 'AVON', title: 'Avon – Far Away Rebel', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'penti-packaging', brand: 'PENTİ', title: 'Penti – Ambalaj', category: 'packaging', src: '/projects/avon_anneler_gunu.png' },
  { id: 'watsons-doldurkabi', brand: 'WATSONS', title: 'Watsons × DoldurKabı', category: 'branding', src: '/images/vet_panel_kapak.jpg' },
  { id: 'avon-love-beauty', brand: 'AVON', title: 'Avon – Love Beauty', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'codage-klinik', brand: 'CODAGE', title: 'Codage – Klinik Yazılım', category: 'ui-ux', src: '/images/vet_panel_kapak.jpg' },
  { id: 'mavi-new-season', brand: 'MAVI', title: 'Mavi – New Season', category: 'social-media', src: '/projects/avon_anneler_gunu.png' },
  { id: 'oriflame-eclat', brand: 'ORIFLAME', title: 'Oriflame – Éclat Natural', category: 'social-media', src: '/images/omr1.post.jpeg' },
]

const INITIAL_COUNT = 8
type SortOption = 'newest' | 'oldest' | 'brand'
const sortLabels: Record<SortOption, string> = { newest: 'En Yeni', oldest: 'En Eski', brand: 'Markaya Göre' }

// ─── Lightbox ───
function Lightbox({
  projects,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  projects: Project[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const project = projects[index]
  // Scroll pozisyonunu kaydet/geri yükle
  const scrollYRef = useRef(0)

  useEffect(() => {
    // Açılırken scroll'u kilitle, pozisyonu kaydet
    scrollYRef.current = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollYRef.current}px`
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    return () => {
      // Kapanırken geri yükle
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
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
        className="absolute top-5 right-5 w-[44px] h-[44px] rounded-full border border-white/15 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-200 z-10"
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

      {/* Sol ok */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev() }}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#c2e200] hover:border-[#c2e200]/50 transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      {/* Sağ ok */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext() }}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-[48px] h-[48px] rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#c2e200] hover:border-[#c2e200]/50 transition-all duration-200 z-10"
        style={{ background: 'rgba(255,255,255,0.05)' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      {/* Görsel — 1080x1350 oranı (4:5) */}
      <div
        className="flex flex-col items-center gap-4 px-[72px] sm:px-[88px]"
        style={{ maxWidth: '520px', width: '100%' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="relative w-full rounded-[20px] overflow-hidden"
          style={{ aspectRatio: '1080 / 1350' }}
        >
          <Image
            src={project.src}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
          {/* Brand badge üstte */}
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-black bg-[#c2e200] px-[10px] py-[5px] rounded-full">
              {project.brand}
            </span>
          </div>
        </div>

        {/* Alt bilgi — sadece başlık, proje linki yok */}
        <div className="flex items-center justify-center w-full">
          <p className="text-white/70 font-medium text-[14px] text-center">{project.title}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Project Card — 1080x1350 oranı (4:5) ───
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
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        draggable={false}
      />

      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.1) 50%, transparent 70%)',
          opacity: hovered ? 1 : 0.55,
        }}
      />

      {/* Brand badge */}
      <div className="absolute top-3 left-3">
        <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-black bg-[#c2e200] px-[10px] py-[5px] rounded-full">
          {project.brand}
        </span>
      </div>

      {/* Büyüt ikonu */}
      <div
        className="absolute top-3 right-3 w-[36px] h-[36px] rounded-full flex items-center justify-center transition-all duration-300"
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scale(1)' : 'scale(0.6)',
          background: '#c2e200',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-[13px] h-[13px]">
          <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
        </svg>
      </div>

      {/* Alt bilgi */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p
          className="text-white font-semibold text-[14px] leading-[1.3] mb-[3px] transition-all duration-300"
          style={{ transform: hovered ? 'translateY(0)' : 'translateY(6px)', opacity: hovered ? 1 : 0.85 }}
        >
          {project.title}
        </p>
        <p
          className="text-white/50 text-[11px] uppercase tracking-[0.1em] transition-all duration-300"
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
  const [activeCategory, setActiveCategory] = useState('tumu')
  const [activeBrand, setActiveBrand] = useState('tumu')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [sortOpen, setSortOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filtered = projects.filter(p => {
    const catOk = activeCategory === 'tumu' || p.category === activeCategory
    const brandOk = activeBrand === 'tumu' || p.brand.toLowerCase() === activeBrand
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
  const prevLightbox = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i - 1 + visible.length) % visible.length : null),
    [visible.length])
  const nextLightbox = useCallback(() =>
    setLightboxIndex(i => i !== null ? (i + 1) % visible.length : null),
    [visible.length])

  return (
    <main className="bg-black min-h-screen pt-[var(--nav-h)]">

      {lightboxIndex !== null && (
        <Lightbox
          projects={visible}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevLightbox}
          onNext={nextLightbox}
        />
      )}

      <div
        className="fixed top-0 right-0 w-[800px] h-[800px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(194,226,0,0.07) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 xl:px-20 py-[48px] sm:py-[64px] md:py-[80px]">

        {/* BAŞLIK + SORT */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <span className="text-[#c2e200] text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase mb-3 block">
              PORTFOLYO
            </span>
            <h1 className="text-white font-medium leading-[1.0] tracking-tight text-[40px] sm:text-[52px] md:text-[64px]">
              Tüm{' '}
              <em className="font-canela font-medium text-[#c2e200]">işlerim.</em>
            </h1>
            <p className="text-white/40 text-[14px] sm:text-[15px] mt-3 leading-[1.7]">
              Markalara değer katan yaratıcı işler.<br className="hidden sm:block" />
              Tüm projelerimi aşağıda görebilirsiniz.
            </p>
          </div>

          <div className="relative">
            <button
              onClick={() => setSortOpen(v => !v)}
              className="flex items-center gap-2 border border-white/15 hover:border-[#c2e200]/50 rounded-full px-5 py-[10px] text-white/70 hover:text-white text-[12px] font-semibold uppercase tracking-[0.12em] transition-all duration-300"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              SIRALAMA: {sortLabels[sortBy]}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-[14px] h-[14px] transition-transform duration-300" style={{ transform: sortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            {sortOpen && (
              <div className="absolute right-0 top-[calc(100%+8px)] z-50 rounded-[14px] border border-white/10 overflow-hidden" style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)', minWidth: '180px' }}>
                {(['newest', 'oldest', 'brand'] as SortOption[]).map((opt) => (
                  <button key={opt} onClick={() => { setSortBy(opt); setSortOpen(false) }} className="w-full text-left px-5 py-3 text-[13px] font-medium transition-all duration-200 hover:bg-white/5" style={{ color: sortBy === opt ? '#c2e200' : 'rgba(255,255,255,0.6)' }}>
                    {sortLabels[opt]}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* KATEGORİ */}
        <div className="flex items-center gap-2 flex-wrap mb-5">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setVisibleCount(INITIAL_COUNT) }}
              className="rounded-full px-4 py-[8px] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300"
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

        {/* MARKA TAB BAR */}
        <div className="flex items-center gap-2 mb-10 sm:mb-12">
          <button className="shrink-0 w-[32px] h-[32px] rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200" onClick={() => { const el = document.getElementById('brand-scroll'); if (el) el.scrollLeft -= 160 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <div id="brand-scroll" className="flex items-center gap-2 overflow-x-auto flex-1" style={{ scrollbarWidth: 'none' }}>
            {brands.map((brand) => {
              const isActive = activeBrand === brand.id
              return (
                <button key={brand.id} onClick={() => { setActiveBrand(brand.id); setVisibleCount(INITIAL_COUNT) }}
                  className="shrink-0 flex items-center gap-2 rounded-full px-4 py-[8px] text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.1em] transition-all duration-300 whitespace-nowrap"
                  style={{ background: isActive ? '#c2e200' : 'rgba(255,255,255,0.04)', color: isActive ? '#000' : 'rgba(255,255,255,0.5)', border: isActive ? '1px solid #c2e200' : '1px solid rgba(255,255,255,0.08)' }}
                >
                  {brand.id !== 'tumu' && <span className="w-[6px] h-[6px] rounded-full shrink-0" style={{ background: isActive ? '#000' : '#c2e200', opacity: isActive ? 0.7 : 0.6 }} />}
                  {brand.label}
                </button>
              )
            })}
          </div>
          <button className="shrink-0 w-[32px] h-[32px] rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/30 transition-all duration-200" onClick={() => { const el = document.getElementById('brand-scroll'); if (el) el.scrollLeft += 160 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4"><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>

        {/* GRID — 1080x1350 (4:5) oranında eşit kartlar */}
        {visible.length > 0 ? (
          <div className="grid gap-3 sm:gap-4" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
            {visible.map((project, i) => (
              <ProjectCard key={project.id} project={project} onClick={() => setLightboxIndex(i)} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-[100px] gap-4">
            <div className="w-[60px] h-[60px] rounded-full border border-white/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" className="w-6 h-6">
                <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
              </svg>
            </div>
            <p className="text-white/30 text-[14px]">Bu filtreler için proje bulunamadı.</p>
            <button onClick={() => { setActiveCategory('tumu'); setActiveBrand('tumu') }} className="text-[#c2e200] text-[13px] font-semibold hover:underline">
              Filtreleri temizle
            </button>
          </div>
        )}

        {/* DAHA FAZLA YÜKLE */}
        {hasMore && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="group inline-flex items-center gap-3 border border-white/15 hover:border-[#c2e200]/60 rounded-full px-8 py-4 text-white/60 hover:text-[#c2e200] text-[12px] font-bold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-[#c2e200]/5"
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
    </main>
  )
}