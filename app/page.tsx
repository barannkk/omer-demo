'use client'

import { useState, useMemo, useEffect } from 'react'
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

// ─── Markalar ───
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
    name: 'DoldurKabı',
    projects: [
      { src:'/images/vet_panel_kapak.jpg',id: 1, title: 'Label Design', year: '2024' },
      { src:'/images/vet_panel_1.jpg',id: 2, title: 'Box System', year: '2024' },
      { src:'/images/vet_panel_2.jpg',id: 3, title: 'Print', year: '2023' },
      { src:'/images/vet_panel_3.jpg',id: 4, title: 'Campaign', year: '2023' },
      { src:'/images/vet_panel_4.jpg',id: 5, title: 'Social', year: '2022' },
      { src:'/images/vet_panel_5.jpg',id: 6, title: 'Social', year: '2022' },
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

function Marquee() {
  const quadrupled = [...marqueeLogos, ...marqueeLogos, ...marqueeLogos, ...marqueeLogos];
  return (
    <div className="relative m-0 overflow-hidden bg-[#bfd730] py-[60px] before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-[250px] before:bg-gradient-to-r before:from-[#bfd730] before:to-transparent after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-[250px] after:bg-gradient-to-l after:from-[#bfd730] after:to-transparent">
      <div className="flex w-max items-center animate-[marquee_50s_linear_infinite]">
        {quadrupled.map((logo, i) => (
          <div key={i} className="shrink-0">
            {/* Kutu boyutları (120x30) ve boşluklar (90px) orijinaliyle tamamen aynı */}
            <div className="mx-[90px] flex h-[30px] w-[120px] shrink-0 items-center justify-center opacity-100 brightness-0 invert transition-all duration-300 ease-in hover:scale-[1.15]">
              <Image 
                src={logo.src} 
                alt={logo.alt} 
                width={200} 
                height={80} 
                /* İŞTE SADECE BURASI DEĞİŞTİ: scale-[1.5] ile sadece logoyu görsel olarak büyütüyoruz */
                className="scale-[1.7]" 
                style={{ objectFit: 'contain' }}
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
  const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

 const pillTexts = [
    "AI Video Creation",
    "Social Media Ads",
    "Product Packing",
    "Event Identity",
    "Motion Design",
    "AI Image Gen"
    
  ];
   return (
    <>
 <section className="relative w-full h-screen overflow-hidden bg-[#0a0a0f] pt-20 pb-10 font-juturu">
  
  {isClient && (
  <video 
    autoPlay 
    loop 
    muted 
    playsInline 
    preload="auto" 
    className="absolute inset-0 w-full h-full object-cover z-0"
  >
    <source src="/videos/herovideo.mp4" type="video/mp4" />
  </video>
)}

  {/* Video Üstü Karartma */}
  <div className="absolute inset-0 z-[1] bg-black/30" />

  {/* SOL ALT LOGO */}
  <div className="absolute left-6 lg:left-12 bottom-6 lg:bottom-10 z-20">
    <Image 
      src="/logos/workgreen.svg"
      alt="OMR Work Logo" 
      width={140} 
      height={55} 
      className="opacity-90 hover:opacity-100 transition-opacity"
    />
  </div>

  {/* 2. ANA İÇERİK ALANI */}
  <div className="relative z-10 w-full h-full max-w-[1500px] mx-auto flex flex-col lg:flex-row items-center justify-between px-6 md:px-12">
    
    {/* ── SOL: YAZILAR ── */}
    <div className="flex flex-col justify-center text-left w-full lg:w-1/2 pb-10 lg:pb-0 z-20">
      <h1 className="text-white font-bold leading-[1.05] tracking-tight mb-4 lg:mb-6">
        <span className="block text-[50px] md:text-[80px] lg:text-[100px] animate-text-slide" style={{ animationDelay: '0.2s' }}>
          Design that
        </span>
        <span className="block text-[50px] md:text-[80px] lg:text-[100px] animate-text-slide" style={{ animationDelay: '0.4s' }}>
          feels expensive
        </span>
      </h1>
      <p className="text-[#e0e0e0] text-[18px] lg:text-[22px] font-light max-w-[450px] animate-text-slide" style={{ animationDelay: '0.6s' }}>
        I build visuals that make brands stand out, not just exist.
      </p>
    </div>

    {/* ── SAĞ: TELEFON VE PİLLER ── */}
    <div className="w-full lg:w-1/2 h-full relative z-10">
      {/* TELEFONUN ANA KAPSAYICISI - HİÇ DOKUNULMADI */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[-30%] lg:right-[-50%] w-[900px] lg:w-[1300px] flex items-center justify-center pointer-events-none">
        
  {/* PİLLER KAPSAYICISI */}
<div className="absolute z-10 left-[48%] lg:left-[53%] flex flex-col gap-3 lg:gap-4 items-start pointer-events-none">
  
  {pillTexts.map((text, i) => {
    // Toplam eleman sayısından i'yi çıkararak ters bir çarpan oluşturuyoruz
    // i = 0 (en üst) -> çarpan en büyük
    // i = son (en alt) -> çarpan en küçük
    const gapMultiplier = pillTexts.length - i;

    return (
      <div 
        key={i} 
        className="pill-item-anim h-[45px] lg:h-[50px] rounded-full bg-[#bfd730] text-[#111321] flex items-center shadow-xl transition-all hover:bg-white hover:scale-105 cursor-pointer pointer-events-auto w-fit border-2 border-white"
        style={{
          animationDelay: `${0.8 + (i * 0.15)}s`,
          
          // SOLDAN BOŞLUK: Aşağı indikçe (i arttıkça) bu değer azalır.
          // En üstteki pill'de boşluk: 30 + (6 * 15) = 120px
          // En alttaki pill'de boşluk: 30 + (1 * 15) = 45px
          paddingLeft: `${30 + (gapMultiplier * 15)}px`, 
          
          // Sağ tarafta metinden sonraki sabit boşluk
          paddingRight: '35px',
          
          // Pill'in sol ucunu telefonun arkasına gömen negatif marj
          // Bunu sabit tutuyoruz ki hepsi telefonun içinden çıkıyormuş gibi görünsün
          marginLeft: '-50px',
          
          // Eğer pillerin sağ tarafları da merdiven gibi (diagonal) kalsın istersen 
          // ufak bir transform ekleyebiliriz:
          transform: `translateX(-${i * 10}px)`
        }}
      >
        <span className="text-white text-[16px] md:text-[18px] lg:text-[22px] font-bold leading-none tracking-tighter whitespace-nowrap">
          {text}
        </span>
      </div>
    );
  })}

</div>

        {/* TELEFON MOCKUP - HİÇ DOKUNULMADI */}
        <div className="relative z-20 w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto left-[-30%] lg:left-[-4.5%]">
          <Image 
            src="/images/mockup.png" 
            alt="OMR Work Phone Mockup" 
            width={1300} 
            height={2600} 
            className="w-full h-auto object-contain" 
            priority
          />
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