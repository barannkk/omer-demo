'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react' // usePathname'e artık gerek kalmadı sildik

const LOGO_PATH = '/logos/navlogo.svg'
const HAS_LOGO = true

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { href: '/', label: 'ANA SAYFA' },
    { href: '/about', label: 'HAKKIMDA' },
    { href: '/contact', label: 'İLETİŞİM' },
  ]

  return (
    <nav className="fixed top-[10px] left-1/2 -translate-x-1/2 z-[1000] pointer-events-none w-auto transition-all duration-300">
      <div
        className={`nav-mobile-inner flex items-center justify-between pointer-events-auto bg-[#bfd730] shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex-wrap transition-all duration-300

          ${menuOpen ? 'rounded-[24px]' : 'rounded-[100px]'}
          
          /* Standart Masaüstü / Tablet (1024px) */
          gap-[40px] py-[12px] pl-[20px] pr-[14px] min-w-[900px]
          
          /* Yatay Basık Ekranlar (1024x600 vb.) */
          landscape:lg:py-[8px] landscape:lg:min-w-[850px] landscape:lg:gap-[30px]
          
          /* Orta-Büyük Ekranlar (1280px+) */ 
          xl:gap-[70px] landscape:xl:gap-[70px] xl:py-[14px] landscape:xl:py-[14px] xl:pl-[26px] xl:pr-[16px] xl:min-w-[1000px] landscape:xl:min-w-[1000px]
          
          /* Dev Ekranlar (1536px+ ve 1920x1080) */ 
          2xl:gap-[100px] landscape:2xl:gap-[100px] 2xl:py-[18px] landscape:2xl:py-[18px] 2xl:pl-[32px] 2xl:pr-[20px] 2xl:min-w-[1250px] landscape:2xl:min-w-[1250px]
        `}
      >
        {/* LOGO */}
        <Link href="/" aria-label="Ana Sayfa" className="flex items-center shrink-0">
          {HAS_LOGO ? (
            <div className="relative transition-all duration-300
              w-[90px] 
              landscape:lg:w-[85px] 
              xl:w-[100px] landscape:xl:w-[100px] 
              2xl:w-[130px] landscape:2xl:w-[130px]
            ">
              <Image src={LOGO_PATH} alt="Logo" width={140} height={40} priority className="w-full h-auto object-contain" />
            </div>
          ) : (
            <span className="font-bold text-[#111321]
              text-[16px] 
              landscape:lg:text-[15px] 
              xl:text-[18px] landscape:xl:text-[18px] 
              2xl:text-[22px] landscape:2xl:text-[22px]
            ">omer.work</span>
          )}
        </Link>

        {/* HAMBURGER MENÜ */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menüyü aç/kapat">
          <span /><span /><span />
        </button>

        {/* LİNKLER */}
        <ul className={`nav-links-mobile m-0 p-0 list-none ${menuOpen ? ' open' : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href} onClick={() => setMenuOpen(false)}
                className={`nav-link-hover flex items-center rounded-[50px] bg-transparent text-[#111321] no-underline uppercase tracking-[0.05em] font-extrabold transition-all duration-300
                  
                  /* Etrafındaki çizgiyi kaldırmak için isActive sildik */
                  
                  /* Boyut Ayarları */
                  text-[14px] px-[16px] py-[8px]
                  landscape:lg:text-[13px] landscape:lg:px-[14px] landscape:lg:py-[6px]
                  xl:text-[15px] landscape:xl:text-[15px] xl:px-[22px] landscape:xl:px-[22px] xl:py-[10px] landscape:xl:py-[10px]
                  2xl:text-[17px] landscape:2xl:text-[17px] 2xl:px-[28px] landscape:2xl:px-[28px] 2xl:py-[12px] landscape:2xl:py-[12px]
                `}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* AI ÇALIŞMALARI BUTONU */}
          <li>
            <Link
              href="/ai-works" onClick={() => setMenuOpen(false)}
              className="btn-ai-hover inline-flex items-center justify-center leading-none rounded-[50px] uppercase tracking-[0.05em] font-extrabold no-underline transition-all duration-300 bg-[#111321] text-[#bfd730] border border-[#111321]
                
                /* Boyut Ayarları */
                text-[14px] px-[24px] py-[11px]
                landscape:lg:text-[13px] landscape:lg:px-[20px] landscape:lg:py-[9px]
                xl:text-[15px] landscape:xl:text-[15px] xl:px-[32px] landscape:xl:px-[32px] xl:py-[13px] landscape:xl:py-[13px]
                2xl:text-[17px] landscape:2xl:text-[17px] 2xl:px-[40px] landscape:2xl:px-[40px] 2xl:py-[15px] landscape:2xl:py-[15px]
              "
            >
              AI ÇALIŞMALARI
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}