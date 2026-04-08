'use client'

import { useState, useMemo, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Play, Radio, Package, Fingerprint, Film, Sparkles } from "lucide-react";

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

// ─── Markalar ───
const brands: Brand[] = [
  {
    id: 'avon',
    name: 'AVON',
    projects: [
      { src: '/projects/avon_anneler_gunu.png', id: 1, title: 'Kit Design', year: '2024' },
      { src: '', id: 2, title: 'Packaging', year: '2024' },
      { src: '/projects/avon_anneler_gunu.png', id: 3, title: 'Campaign', year: '2023' },
      { src: '', id: 4, title: 'Social Media', year: '2023' },
      { src: '/projects/avon_anneler_gunu.png', id: 5, title: 'Visual System', year: '2022' },
      { src: '', id: 6, title: 'Identity', year: '2022' },
    ],
  },
  {
    id: 'marka2',
    name: 'DoldurKabı',
    projects: [
      { src: '/images/vet_panel_kapak.jpg', id: 1, title: 'Label Design', year: '2024' },
      { src: '/images/vet_panel_1.jpg', id: 2, title: 'Box System', year: '2024' },
      { src: '/images/vet_panel_2.jpg', id: 3, title: 'Print', year: '2023' },
      { src: '/images/vet_panel_3.jpg', id: 4, title: 'Campaign', year: '2023' },
      { src: '/images/vet_panel_4.jpg', id: 5, title: 'Social', year: '2022' },
      { src: '/images/vet_panel_5.jpg', id: 6, title: 'Social', year: '2022' },
    ],
  },
  {
    id: 'marka3',
    name: 'MARKA 3',
    projects: [
      { src: '', id: 1, title: 'Brand Book', year: '2024' },
      { src: '', id: 2, title: 'Guidelines', year: '2024' },
      { src: '', id: 3, title: 'Campaign', year: '2023' },
      { src: '', id: 4, title: 'Digital', year: '2023' },
      { src: '', id: 5, title: 'Social', year: '2022' },
    ],
  },
]

// ─── Marquee Logoları ───
const marqueeLogos = [
  { src: '/logos/avonlogo.svg', alt: 'Avon' },
  { src: '/logos/codagelogo.svg', alt: 'Codage' },
  { src: '/logos/avonlogo.svg', alt: 'Marka 3' },
  { src: '/logos/codagelogo.svg', alt: 'Marka 4' },
  { src: '/logos/omr_beyaz_logo.svg', alt: 'Marka 5' },
]

function Marquee() {
  const quadrupled = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos];
  return (
    <div className="relative m-0 overflow-hidden bg-transparent transition-all duration-300
      py-[20px] md:py-[30px] xl:py-[40px]
      
      /* Sol Gradient (Siyah'tan şeffafa) */
      before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:bg-gradient-to-r before:from-black before:to-transparent
      before:w-[30px] md:before:w-[100px] xl:before:w-[250px]
      
      /* Sağ Gradient (Siyah'tan şeffafa) */
      after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:bg-gradient-to-l after:from-black after:to-transparent
      after:w-[30px] md:after:w-[100px] xl:after:w-[250px]
    ">
      <div className="flex w-max items-center animate-[marquee_50s_linear_infinite]">
        {quadrupled.map((logo, i) => (
          <div key={i} className="shrink-0">
            {/* brightness-0 invert kısmı logoları zaten bembeyaz yapıyor */}
            <div className="flex items-center justify-center opacity-100 brightness-0 invert transition-all duration-300 ease-in hover:scale-[1.15]
              mx-[10px] md:mx-[50px] xl:mx-[90px]
              h-[20px] md:h-[25px] xl:h-[30px]
              w-[90px] md:w-[100px] xl:w-[120px]
            ">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={200}
                height={80}
                className="w-full h-full object-contain scale-[1.0] md:scale-[1.5] xl:scale-[1.7]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BrandShowcase({ brand }: { brand: Brand }) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const total = brand.projects.length

  const nextIdx = useMemo(() => (current + 1) % total, [current, total]);
  const nextNextIdx = useMemo(() => (current + 2) % total, [current, total]);

  const handleNext = () => {
    setDirection(-1)
    setCurrent(nextIdx)
  }

  const handlePrev = () => {
    setDirection(1)
    setCurrent((c) => (c - 1 + total) % total)
  }

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
        ease: "easeIn"
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
                  src={brand.projects[nextNextIdx].src || '/placeholder.jpeg'}
                  alt="" fill className="object-cover" draggable="false"
                />
              </div>
              <div className="bg-layer layer-near">
                <Image
                  src={brand.projects[nextIdx].src || '/placeholder.jpeg'}
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const services = [
    { icon: <Play size={16} />, label: "AI Video Creation" },
    { icon: <Radio size={16} />, label: "Social Media Ads" },
    { icon: <Package size={16} />, label: "Product Packing" },
    { icon: <Fingerprint size={16} />, label: "Event Identity" },
    { icon: <Film size={16} />, label: "Motion Design" },
    { icon: <Sparkles size={16} />, label: "AI Image Gen" },
  ];

  return (
    <>
      <section className="relative w-full h-[100svh] overflow-hidden bg-black">

  <div className="relative z-10 w-full h-full max-w-[1920px] mx-auto flex flex-col lg:flex-row items-center px-6 sm:px-10 md:px-16 xl:px-20">

    {/* SOL: BAŞLIK + BUTONLAR */}
    <div className="flex flex-col justify-center w-full lg:w-[45%] h-1/2 lg:h-full
      pb-0 sm:pb-4 lg:pb-0
      pt-[var(--nav-h)] lg:pt-0
    ">
      <h1 className="font-medium leading-[0.95] tracking-tight text-white mb-4 sm:mb-6 xl:mb-8">
        <span className="block animate-text-slide
          text-[56px] sm:text-[68px] md:text-[76px] lg:text-[86px]
          portrait:lg:text-[100px] landscape:lg:text-[70px]
          xl:text-[clamp(90px,8vw,130px)]
        " style={{ animationDelay: '0.1s' }}>
          Design that
        </span>
        <span className="block animate-text-slide
          text-[56px] sm:text-[68px] md:text-[76px] lg:text-[86px]
          portrait:lg:text-[100px] landscape:lg:text-[70px]
          xl:text-[clamp(90px,8vw,130px)]
        " style={{ animationDelay: '0.3s' }}>
          feels{' '}
          <em className="font-canela font-medium text-[#c2e200]">
            expensive.
          </em>
        </span>
      </h1>

      <p className="-mt-[5px] sm:-mt-[10px] xl:-mt-[20px] text-white/60 font-light animate-text-slide mb-6 sm:mb-8 xl:mb-12
        text-[16px] sm:text-[18px] md:text-[20px]
        portrait:lg:text-[26px] landscape:lg:text-[18px]
        xl:text-[clamp(20px,1.7vw,28px)]
        max-w-[320px] sm:max-w-[420px] md:max-w-[500px] xl:max-w-[600px]
        leading-relaxed
      " style={{ animationDelay: '0.5s' }}>
        I build visuals that make brands stand out, not just exist.
      </p>

      <div className="-mt-[5px] sm:-mt-[10px] xl:-mt-[20px] flex items-center gap-3 sm:gap-4 xl:gap-6 flex-wrap animate-text-slide" style={{ animationDelay: '0.7s' }}>
        <Link
          href="/contact"
          className="group inline-flex items-center gap-[8px] xl:gap-[8px] justify-center rounded-full bg-[#c2e200] text-black font-extrabold uppercase tracking-[0.07em] transition-all duration-300 hover:bg-[#d4f500] hover:-translate-y-[2px]
            text-[13px] px-[26px] py-[14px]
            sm:text-[13px] sm:px-[26px] sm:py-[14px]
            xl:text-[16px] xl:px-[40px] xl:py-[19px]
          "
        >
          Bir Proje Başlat
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-[14px] h-[14px] xl:w-[16px] xl:h-[16px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </Link>
        <Link
          href="/works"
          className="inline-flex items-center justify-center rounded-full border border-white/25 text-white font-bold uppercase tracking-[0.07em] transition-all duration-300 hover:border-white/60 hover:-translate-y-[2px]
            text-[13px] px-[26px] py-[13px]
            sm:text-[13px] sm:px-[26px] sm:py-[13px]
            xl:text-[16px] xl:px-[40px] xl:py-[18px]
          "
        >
          Çalışmalar
        </Link>
      </div>
    </div>

    {/* SAĞ: TELEFON + SERVİS LİSTESİ */}
    <div className="w-full lg:w-[55%] h-1/2 lg:h-full flex items-center justify-center lg:justify-end relative z-10 pt-8 sm:pt-6 md:pt-4 lg:pt-0
      -translate-x-[15%] sm:-translate-x-[12%] md:-translate-x-[8%] lg:-translate-x-[4%] xl:translate-x-0
    ">
      <div className="relative flex items-center justify-center shrink-0 transition-all duration-500
        w-[600px] sm:w-[620px] md:w-[700px] lg:w-[820px] xl:w-[min(990px,52vw)]
        scale-100 xl:scale-110
      ">

        {/* ARKAPLAN GRADIENT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[70%] bg-[#c2e200] rounded-full blur-[60px] sm:blur-[80px] xl:blur-[100px] opacity-30 z-0 pointer-events-none" />

        {/* TELEFON MOCKUP */}
        <div className="relative z-20 w-full h-auto drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)] animate-float">
          <Image
            src="/images/mockup.png"
            alt="OMR Work Phone Mockup"
            width={1600}
            height={3200}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* SERVİS LİSTESİ */}
        <div className="absolute top-1/2 -translate-y-1/2 flex flex-col z-30
          left-[67%] sm:left-[68%] md:left-[69%] lg:left-[70%] xl:left-[72%]
          w-[140px] sm:w-[155px] md:w-[170px] lg:w-[185px] xl:w-[min(200px,10vw)]
        ">
          {services.map((item, i) => (
            <div
              key={i}
              className="service-item-anim flex flex-col w-full"
              style={{ animationDelay: `${0.3 + i * 0.2}s` }}
            >
              <div className="flex items-center group cursor-pointer w-full justify-start
                gap-[5px] sm:gap-[7px] md:gap-[9px] lg:gap-[11px] xl:gap-[14px]
                py-[7px] sm:py-[8px] md:py-[11px] lg:py-[13px] xl:py-[16px]
              ">
                <span className="flex items-center justify-center text-white translate-y-[2px] xl:translate-y-[4px] group-hover:text-white/80 transition-colors duration-300 shrink-0
                  [&>svg]:w-[13px] [&>svg]:h-[13px]
                  sm:[&>svg]:w-[14px] sm:[&>svg]:h-[14px]
                  md:[&>svg]:w-[15px] md:[&>svg]:h-[15px]
                  lg:[&>svg]:w-[16px] lg:[&>svg]:h-[16px]
                  xl:[&>svg]:w-[18px] xl:[&>svg]:h-[18px]
                ">
                  {item.icon}
                </span>

                <span className="text-white group-hover:text-white/90 transition-colors duration-300
                  font-extralight tracking-wider leading-none whitespace-nowrap
                  text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] xl:text-[24px]
                ">
                  {item.label}
                </span>
              </div>

              {i < services.length - 1 && (
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c2e200]/60 to-transparent shadow-[0_0_10px_rgba(194,226,0,0.2)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

  </div>
</section>
      <div>
        <Marquee />
      </div>

      <section id="work">
        {brands.map((brand) => (
          <BrandShowcase key={brand.id} brand={brand} />
        ))}
      </section>
    </>
  );
}