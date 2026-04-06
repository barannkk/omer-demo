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
    <div className="relative m-0 overflow-hidden bg-[#bfd730] transition-all duration-300
      py-[20px] md:py-[30px] xl:py-[60px] 2xl:py-[90px]
      
      before:pointer-events-none before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:bg-gradient-to-r before:from-[#bfd730] before:to-transparent
      before:w-[30px] md:before:w-[100px] xl:before:w-[250px] 2xl:before:w-[400px]
      
      
      after:pointer-events-none after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:bg-gradient-to-l after:from-[#bfd730] after:to-transparent
      after:w-[30px] md:after:w-[100px] xl:after:w-[250px] 2xl:after:w-[400px]
    ">
      <div className="flex w-max items-center animate-[marquee_50s_linear_infinite]">
        {quadrupled.map((logo, i) => (
          <div key={i} className="shrink-0">
            <div className="flex items-center justify-center opacity-100 brightness-0 invert transition-all duration-300 ease-in hover:scale-[1.15]
              mx-[10px] md:mx-[50px] xl:mx-[90px] 2xl:mx-[140px]
              h-[20px] md:h-[25px] xl:h-[30px] 2xl:h-[45px]
              w-[90px] md:w-[100px] xl:w-[120px] 2xl:w-[180px]
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
 <section className="relative w-full h-[100svh] xl:h-screen overflow-hidden bg-[#0a0a0f] font-juturu transition-all duration-300">
  
  {isClient && (
    <video autoPlay loop muted playsInline preload="auto" className="absolute inset-0 w-full h-full object-cover z-0">
      <source src="/videos/herovideo.mp4" type="video/mp4" />
    </video>
  )}
  <div className="absolute inset-0 z-[1] bg-black/30" />

  {/* SOL ALT LOGO: 
      Telefon sola kaydığı için logoyu eziyordu. 
      Logoyu mobilde ve tablette ufalttım (70px-90px) ve iyice köşeye (left-4 bottom-4) çektim. 
      Masaüstü ayarları orijinal! 
  */}
  <div className="absolute left-4 sm:left-6 xl:left-12 bottom-4 sm:bottom-6 xl:bottom-10 z-20 pointer-events-none">
    <Image 
      src="/logos/workgreen.svg" alt="OMR Work Logo" width={140} height={55} 
      className="opacity-90 hover:opacity-100 transition-opacity 
      w-[70px] sm:w-[85px] md:w-[100px] xl:w-[140px] 2xl:w-[180px] h-auto"
    />
  </div>

  <div className="relative z-10 w-full h-full max-w-[1500px] 2xl:max-w-[1920px] mx-auto flex flex-col xl:flex-row items-center justify-between px-6 md:px-12 2xl:px-16 transition-all duration-300">
    
    {/* ── SOL: YAZILAR ── */}
    <div className="flex flex-col justify-center text-left w-full xl:w-1/2 h-[50%] xl:h-full z-20 pb-4 xl:pb-0 
      /* Navbar'a yaklaşması için mobilde pt değerlerini düşürdüm. Masaüstü dokunulmadı. */
      pt-4 sm:pt-16 md:pt-24 
      portrait:lg:pt-32 landscape:lg:pt-16 xl:pt-0 landscape:xl:pt-0
    ">
      <h1 className="text-white font-bold leading-[1.05] tracking-tight mb-4 xl:mb-6">
        <span className="block animate-text-slide
          text-[42px] sm:text-[55px] md:text-[75px] 
          portrait:lg:text-[85px] landscape:lg:text-[55px] 
          xl:text-[100px] landscape:xl:text-[100px] 
          2xl:text-[130px] landscape:2xl:text-[130px]
        " style={{ animationDelay: '0.2s' }}>
          Design that
        </span>
        <span className="block animate-text-slide
          text-[42px] sm:text-[55px] md:text-[75px] 
          portrait:lg:text-[85px] landscape:lg:text-[55px] 
          xl:text-[100px] landscape:xl:text-[100px] 
          2xl:text-[130px] landscape:2xl:text-[130px]
        " style={{ animationDelay: '0.4s' }}>
          feels expensive
        </span>
      </h1>
      <p className="text-[#e0e0e0] font-light animate-text-slide
        text-[16px] sm:text-[18px] md:text-[22px] 
        portrait:lg:text-[22px] landscape:lg:text-[16px] 
        xl:text-[24px] landscape:xl:text-[24px] 
        2xl:text-[28px] landscape:2xl:text-[28px] 
        
        max-w-[320px] sm:max-w-[450px] md:max-w-[550px] 
        portrait:lg:max-w-[500px] landscape:lg:max-w-[400px] 
        xl:max-w-[500px] landscape:xl:max-w-[500px] 
        2xl:max-w-[600px] landscape:2xl:max-w-[600px]
      " style={{ animationDelay: '0.6s' }}>
        I build visuals that make brands stand out, not just exist.
      </p>
    </div>

   {/* ── SAĞ: TELEFON VE PİLLER ── */}
    <div className="w-full xl:w-1/2 h-[50%] xl:h-full flex items-center justify-center relative z-10">
      
      <div className="relative flex items-center justify-center shrink-0 pointer-events-none transition-all duration-300
        w-[900px] xl:w-[1300px]
        
        /* SENİN ORİJİNAL BOYUT AYARLARIN */
        scale-[0.85] sm:scale-[0.90] md:scale-[1.15] 
        portrait:lg:scale-[1.50] landscape:lg:scale-[0.75] 
        xl:scale-[1] landscape:xl:scale-[1] 
        2xl:scale-[1.25] landscape:2xl:scale-[1.25]
        
        /* SENİN ORİJİNAL KONUM AYARLARIN (Birebir kopyalandı) */
        translate-x-[-5%] sm:translate-x-[15%] md:translate-x-[-20%] 
        portrait:lg:translate-x-[-30%] landscape:lg:translate-x-[-10%] 
        xl:translate-x-0 landscape:xl:translate-x-0 
        2xl:translate-x-[10%] landscape:2xl:translate-x-[10%] 
       -translate-y-[15%] sm:-translate-y-[5%] md:-translate-y-[10%] lg:-translate-y-[5%] xl:translate-y-0
      ">
        
        {/* PİLLER KAPSAYICISI */}
        <div className="absolute z-10 left-[53%] flex flex-col gap-3 xl:gap-4 items-start pointer-events-none">
          {pillTexts.map((text, i) => {
            const gapMultiplier = pillTexts.length - i;
            return (
              <div 
                key={i} 
                className="pill-item-anim h-[45px] xl:h-[50px] 2xl:h-[60px] rounded-full bg-[#bfd730] text-[#111321] flex items-center shadow-xl transition-all hover:bg-white hover:scale-105 cursor-pointer pointer-events-auto w-fit border-2 border-white"
                style={{
                  animationDelay: `${0.8 + (i * 0.15)}s`,
                  paddingLeft: `${30 + (gapMultiplier * 15)}px`, 
                  paddingRight: '35px',
                  marginLeft: '-50px',
                  transform: `translateX(-${i * 10}px)`
                }}
              >
                <span className="text-[#FFFFFF] text-[18px] md:text-[18px] xl:text-[20px] 2xl:text-[26px] font-medium leading-none whitespace-nowrap">
                  {text}
                </span>
              </div>
            );
          })}
        </div>

        {/* TELEFON MOCKUP */}
        <div className="relative z-20 w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] pointer-events-auto left-[-4.5%]">
          <Image src="/images/mockup.png" alt="OMR Work Phone Mockup" width={1300} height={2600} className="w-full h-auto object-contain" priority />
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