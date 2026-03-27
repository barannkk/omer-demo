'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'


// ─── Types ───
interface Project {
  id: number
  title: string
  year: string
  src: string 
}

interface Brand {
  id: string
  name: string
  category: string
  projects: Project[]
}

// ─── Markalar — kendi projelerinle doldur ───
const brands: Brand[] = [
  {
    id: 'avon',
    name: 'AVON',
    category: 'Brand Identity & Packaging',
    projects: [
      { src:'/projects/avon_anneler_gunu.png', id: 1, title: 'Kit Design', year: '2024' },
      { src:'', id: 2, title: 'Packaging', year: '2024' },
      { src:'',id: 3, title: 'Campaign', year: '2023' },
      { src:'',id: 4, title: 'Social Media', year: '2023' },
      { src:'',id: 5, title: 'Visual System', year: '2022' },
      { src:'',id: 6, title: 'Identity', year: '2022' },
    ],
  },
  {
    id: 'marka2',
    name: 'MARKA 2',
    category: 'Packaging Design',
    projects: [
      { src:'',id: 1, title: 'Label Design', year: '2024' },
      { src:'',id: 2, title: 'Box System', year: '2024' },
      { src:'',id: 3, title: 'Print', year: '2023' },
      { src:'',id: 4, title: 'Campaign', year: '2023' },
      { src:'',id: 5, title: 'Social', year: '2022' },
    ],
  },
  {
    id: 'marka3',
    name: 'MARKA 3',
    category: 'Creative Direction',
    projects: [
      { src:'',id: 1, title: 'Brand Book', year: '2024' },
      { src:'',id: 2, title: 'Guidelines', year: '2024' },
      { src:'',id: 3, title: 'Campaign', year: '2023' },
      { src:'',id: 4, title: 'Digital', year: '2023' },
    ],
  },
]

// ─── Marquee loglari ───
const marqueeItems = [
  'AVON', 'MARKA 2', 'MARKA 3', 'MARKA 4', 'MARKA 5',
  'MARKA 6', 'MARKA 7', 'MARKA 8', 'MARKA 9', 'MARKA 10',
]

// ─── Marquee ───
function Marquee() {
  const doubled = [...marqueeItems, ...marqueeItems]
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div key={i} className="marquee-item">
            <span>{item}</span>
            <div className="marquee-dot" />
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Brand Slider ───
function BrandSlider({ brand }: { brand: Brand }) {
  const [current, setCurrent] = useState(0)
  const visibleCount = 5
  const maxIndex = Math.max(0, brand.projects.length - visibleCount)

  const prev = () => setCurrent(c => Math.max(0, c - 1))
  const next = () => setCurrent(c => Math.min(maxIndex, c + 1))

  return (
    <div className="brand-section">
      {/* Section header */}
      <div className="section-header">
        <div>
          <div style={{
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--mid)',
            marginBottom: 6,
          }}>
            {brand.category}
          </div>
          <h2 className="section-brand">{brand.name}</h2>
        </div>
        <div className="section-meta">
          <Link href={`/work/${brand.id}`} className="btn-primary">
            Tüm İşler
          </Link>
        </div>
      </div>

      {/* Slider */}
      <div className="slider-outer" >
        <div className="slider-arrows">
          <button
            className="slider-btn"
            onClick={prev}
            disabled={current === 0}
            aria-label="Önceki"
          >
            ←
          </button>
          <button
            className="slider-btn"
            onClick={next}
            disabled={current >= maxIndex}
            aria-label="Sonraki"
          >
            →
          </button>
        </div>

        {/* Track */}
        <div
          className="slider-track"
          style={{
            transform: `translateX(calc(-${current} * (100% / ${visibleCount})))`,
          }}
        >
          {brand.projects.map((project) => (
  <div key={project.id} className="slide">
    
    {project.src ? (
      <Image 
        src={project.src} 
        alt={project.title} 
        fill 
        style={{ objectFit: 'cover' }} 
      />
    ) : (
      
      <div className="slide-placeholder-inner" style={{ backgroundColor: '#222', width: '100%', height: '100%' }} />
    )}

    <div className="slide-placeholder">
      <div className="slide-placeholder-inner" />
    </div>
    
    <div className="slide-overlay">
      <div>
        <div className="slide-label">{project.title}</div>
        <div style={{ fontSize: 10, color: 'var(--mid)', letterSpacing: '0.1em', marginTop: 3 }}>
          {project.year}
        </div>
      </div>
    </div>
  </div>
))}
        </div>

        {/* OK Badge */}
        <div className="ok-badge">
          <span>OK</span>
        </div>
      </div>
    </div>
  )
}

// ─── Ana Sayfa ───
export default function HomePage() {
  return (
    <>
      <Marquee />

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg-text" aria-hidden="true">DESIGN</div>

        <div className="hero-label fade-up fade-up-1">
          Istanbul — Creative Designer
        </div>

        <h1 className="hero-title fade-up fade-up-2">
          Markaları<br />
          <em>Görünür</em>{' '}
          <span className="outlined">Kılıyorum</span>
        </h1>

        <div className="hero-bottom fade-up fade-up-3">
          <p className="hero-sub">
            Marka kimliği, ambalaj ve görsel iletişim tasarımı.
            Her projeye özgün bir bakış açısı, her markaya kalıcı bir his.
          </p>
          <div className="hero-cta fade-up fade-up-4">
            <a href="#work" className="btn-primary">
              İşleri Keşfet ↓
            </a>
            <Link href="/contact" className="btn-ghost">
              Çalışalım →
            </Link>
          </div>
        </div>
      </section>

      {/* Marka Slider'ları */}
      <section id="work">
        {brands.map((brand) => (
          <BrandSlider key={brand.id} brand={brand} />
        ))}
      </section>
    </>
  )
}