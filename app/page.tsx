'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'


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
  projects: Project[]
}

// ─── Markalar — kendi projelerinle doldur ───
const brands: Brand[] = [
  {
    id: 'avon',
    name: 'AVON',
    projects: [
      { src:'/projects/avon_anneler_gunu.png', id: 1, title: 'Kit Design', year: '2024' },
      { src:'', id: 2, title: 'Packaging', year: '2024' },
      { src:'/projects/avon_anneler_gunu.png',id: 3, title: 'Campaign', year: '2023' },
      { src:'',id: 4, title: 'Social Media', year: '2023' },
      { src:'/projects/avon_anneler_gunu.png',id: 5, title: 'Visual System', year: '2022' },
      { src:'',id: 6, title: 'Identity', year: '2022' },
    ],
  },
  {
    id: 'marka2',
    name: 'MARKA 2',
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
    projects: [
      { src:'',id: 1, title: 'Brand Book', year: '2024' },
      { src:'',id: 2, title: 'Guidelines', year: '2024' },
      { src:'',id: 3, title: 'Campaign', year: '2023' },
      { src:'',id: 4, title: 'Digital', year: '2023' },
      { src:'',id: 5, title: 'Social', year: '2022' },
    ],
  },
]

// ─── Marquee Logoları ───
const marqueeLogos = [
  { src: '/logos/avonlogo.svg', alt: 'Avon' },
  { src: '/logos/codagelogo.svg', alt: 'Codage' },
  { src: '/logos/avonlogo.svg', alt: 'Marka 3' },
  { src: '/logos/codagelogo.svg', alt: 'Marka 4' },
  { src: '/logos/navlogo.svg', alt: 'Marka 5' },
]

// ─── Marquee ───
function Marquee() {
  const quadrupled = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos];
  return (
  <div className="marquee-wrapper">
      <div className="marquee-track">
        {quadrupled.map((logo, i) => (
          <div key={i} className="marquee-item">
            <div className="logo-container">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={200} 
                height={80} 
                style={{ objectFit: 'contain' }}
                className="marquee-img"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Brand Showcase ───
function BrandShowcase({ brand }: { brand: Brand }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = brand.projects.length

  const nextIdx = useMemo(() => (current + 1) % total, [current, total]);
  const nextNextIdx = useMemo(() => (current + 2) % total, [current, total]);

  const handleNext = () => {
    setDirection(-1) // Sola fırlat
    setCurrent(nextIdx)
  }
  
  const handlePrev = () => {
    setDirection(1) // Sağa fırlat
    setCurrent((c) => (c - 1 + total) % total)
  }

  // Animasyon varyantları - custom (direction) parametresini kullanır
  const variants: any = {
    enter: (direction: number) => ({
      x: direction * 100,
      opacity: 0,
      scale: 0.9,
      rotate: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: { duration: 0.4 }
    },
    exit: (direction: number) => ({
      x: direction * 450,
      opacity: 0,
      rotate: direction * -15,
      scale: 0.8,
      transition: { 
        duration: 0.35, 
        ease: "easeIn" // Buradaki string bazen TS'i yorar, o yüzden 'any' kurtarıcıdır
      }
    })
  };

  return (
    <section className="brand-section">
      <div className="section-container">
        
        <div className="project-visual-side">
          <div className="image-stack-container">
            
            <div className="static-stack-bg">
              <div className="bg-layer layer-far">
                <Image 
                  src={brand.projects[nextNextIdx].src || '/placeholder.jpg'} 
                  alt="" fill className="object-cover" draggable="false"
                />
              </div>
              <div className="bg-layer layer-near">
                <Image 
                  src={brand.projects[nextIdx].src || '/placeholder.jpg'} 
                  alt="" fill className="object-cover" draggable="false"
                />
              </div>
            </div>

            <AnimatePresence mode="popLayout" custom={direction}>
              <motion.div
                key={`${brand.id}-${current}`}
                custom={direction} 
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                className="active-card-wrapper"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, info) => {
                  if (info.offset.x > 80) handlePrev()
                  else if (info.offset.x < -80) handleNext()
                }}
                whileTap={{ cursor: "grabbing" }}
              >
                {brand.projects[current].src ? (
                  <Image 
                    src={brand.projects[current].src} 
                    alt={brand.projects[current].title} 
                    fill 
                    className="main-img"
                    draggable="false"
                    priority
                  />
                ) : (
                  <div className="img-placeholder" style={{ background: '#222', width: '100%', height: '100%' }} />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="stack-dots">
            {brand.projects.map((_, i) => (
              <span 
                key={i} 
                className={`dot ${i === current ? 'active' : ''}`} 
                onClick={() => {
                  setDirection(i > current ? -1 : 1)
                  setCurrent(i)
                }} 
              />
            ))}
          </div>
        </div>

        <div className="project-info-side">
          <div className="info-content">
            <h2 className="brand-title">{brand.name}</h2>
            <p className="brand-desc">
              Hikayelerini anlattığımız, kariyer stratejilerini şekillendirdiğimiz ve başarılarına ortak olduğumuz, sektörün en parlak ve en yaratıcı isimleri.
            </p>
            <Link href={`/work/${brand.id}`} className="btn-all-work">
              TÜM İŞLER
            </Link>
          </div>
        </div>

      </div>
    </section>
  )
}

// ─── Ana Sayfa ───
export default function HomePage() {
  return (
    <>
  {/* Hero */}
      <section className="hero-center-focus">
        <div className="hero-glow-top-left"></div>
        <div className="hero-glow-bottom-right"></div>

        <div className="hero-main-layout">
          
          <div className="side-pills left-side">
            <div className="pill-item">Social Media Ads</div>
            <div className="pill-item">AI Image Gen</div>
            <div className="pill-item">Product Packaging</div>
          </div>

          {/* ORTA KART ALANI: Metinler ve gölgeler silindi, sadece butonlar kaldı */}
          <div className="card-unit">
            <div className="card-action-buttons">
              <a href="#work" className="pill-btn-green">Çalışmaları Gör</a>
              <a href="/contact" className="pill-btn-green">İletişime Geç</a>
            </div>
          </div>

          <div className="side-pills right-side">
            <div className="pill-item">Motion Design</div>
            <div className="pill-item">Event Identity</div>
            <div className="pill-item">AI Video Creation</div>
          </div>
        </div>

        <button 
    className="floating-up-arrow" 
    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  >
    ↑
  </button>
        <div className="hero-corner-logo">
          <Image
            src="/logos/workgreen.svg"
            alt="OMR Work"
            width={130}
            height={52}
          />
        </div>
      </section>
    
      <div className="pre-footer-marquee">
        <Marquee />
      </div>

      {/* Marka Slider'ları */}
      <section id="work">
        {brands.map((brand) => (
          <BrandShowcase key={brand.id} brand={brand} />
        ))}
      </section>

      
    </>
  )
}

