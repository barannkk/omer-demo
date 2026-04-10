'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

const LOGO_PATH = '/logos/omr_lime_logo.svg'
const HAS_LOGO = true

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setMenuOpen(false)
    if (pathname === '/') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    } else {
      router.push('/#contact')
    }
  }

  const links = [
    { href: '/', label: 'ANA SAYFA' },
    { href: '/about', label: 'HAKKIMDA' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[1000] flex justify-center pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${scrolled ? 'pt-[10px] px-4' : 'pt-0 px-0'}
      `}
    >
      <div
        className={`pointer-events-auto flex flex-wrap items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${scrolled
            ? `max-w-[860px] rounded-[100px] border border-[rgba(194,226,0,0.18)]
               bg-[rgba(0,0,0,0.45)] backdrop-blur-[24px]
               px-[20px] py-[10px] gap-[8px]
               shadow-[0_8px_32px_rgba(0,0,0,0.5)]
               ${menuOpen ? 'rounded-[24px]' : ''}
              `
            : `max-w-full rounded-none border-b border-[rgba(194,226,0,0.08)]
               bg-black/30 backdrop-blur-md
               px-[48px] py-[18px]
               xl:px-[80px] 2xl:px-[100px]
              `
          }
        `}
      >
        {/* LOGO */}
        <Link href="/" aria-label="Ana Sayfa" className="flex items-center shrink-0">
          {HAS_LOGO ? (
            <div className={`relative transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled ? 'w-[80px]' : 'w-[90px] xl:w-[110px] 2xl:w-[130px]'}`}>
              <Image src={LOGO_PATH} alt="Logo" width={140} height={40} priority className="w-full h-auto object-contain" />
            </div>
          ) : (
            <span className={`font-black text-white transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${scrolled ? 'text-[17px]' : 'text-[19px] xl:text-[22px]'}`}>
              o111<span className="text-[#c2e200]">work</span>.
            </span>
          )}
        </Link>

        {/* HAMBURGER — sadece mobilde */}
        <button className="nav-hamburger" onClick={() => setMenuOpen(v => !v)} aria-label="Menüyü aç/kapat">
          <span /><span /><span />
        </button>

        {/* LİNKLER */}
        <ul className={`nav-links-mobile m-0 p-0 list-none ${menuOpen ? 'open' : ''}`}>

          {/* ANA SAYFA + HAKKIMDA — normal Link */}
          {links.map(({ href, label }) => {
            const isActive = pathname === href
            return (
              <li key={href} className="max-[900px]:w-full flex flex-col relative">
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`nav-link-hover relative flex items-center max-[900px]:w-full max-[900px]:justify-center rounded-[50px] max-[900px]:rounded-[12px] no-underline uppercase tracking-[0.08em] font-bold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                    ${isActive
                      ? 'text-[#c2e200] drop-shadow-[0_0_8px_rgba(194,226,0,0.4)]'
                      : 'text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]'
                    }
                    ${scrolled
                      ? 'text-[12px] px-[16px] py-[8px] max-[900px]:py-[16px]'
                      : 'text-[12px] px-[16px] py-[8px] max-[900px]:py-[16px] xl:text-[13px] xl:px-[18px] xl:py-[9px] 2xl:text-[14px] 2xl:px-[22px] 2xl:py-[10px]'
                    }
                  `}
                >
                  {label}
                  {isActive && (
                    <span className="max-[900px]:hidden absolute bottom-[2px] xl:bottom-[4px] left-1/2 -translate-x-1/2 w-[70%] flex items-center justify-center pointer-events-none">
                      <span className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[#c2e200] to-transparent opacity-80" />
                      <span className="absolute w-[4px] h-[4px] rounded-full bg-[#c2e200] shadow-[0_0_12px_3px_rgba(194,226,0,1)]" />
                    </span>
                  )}
                </Link>
                <div className="hidden max-[900px]:block w-[80%] mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#c2e200]/60 to-transparent shadow-[0_0_10px_rgba(194,226,0,0.2)]" />
              </li>
            )
          })}

          {/* İLETİŞİM — smooth scroll */}
          <li className="max-[900px]:w-full flex flex-col relative">
            <a
              href="#contact"
              onClick={handleContactClick}
              className={`nav-link-hover relative flex items-center max-[900px]:w-full max-[900px]:justify-center rounded-[50px] max-[900px]:rounded-[12px] no-underline uppercase tracking-[0.08em] font-bold transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] cursor-pointer
                text-[rgba(255,255,255,0.7)] hover:text-white hover:bg-[rgba(255,255,255,0.06)]
                ${scrolled
                  ? 'text-[12px] px-[16px] py-[8px] max-[900px]:py-[16px]'
                  : 'text-[12px] px-[16px] py-[8px] max-[900px]:py-[16px] xl:text-[13px] xl:px-[18px] xl:py-[9px] 2xl:text-[14px] 2xl:px-[22px] 2xl:py-[10px]'
                }
              `}
            >
              İLETİŞİM
            </a>
            <div className="hidden max-[900px]:block w-[80%] mx-auto h-[1px] bg-gradient-to-r from-transparent via-[#c2e200]/60 to-transparent shadow-[0_0_10px_rgba(194,226,0,0.2)]" />
          </li>

          {/* TÜM İŞLERİ GÖR butonu */}
          <li className="max-[900px]:w-full max-[900px]:mt-4 max-[900px]:flex max-[900px]:justify-center">
            <Link
              href="/works"
              onClick={() => setMenuOpen(false)}
              className={`btn-proje group inline-flex items-center gap-[6px] leading-none rounded-[50px] uppercase tracking-[0.06em] font-extrabold no-underline transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                bg-[#c2e200] text-black hover:bg-[#d4f500] hover:translate-y-[-1px]
                ${scrolled
                  ? 'text-[12px] px-[24px] py-[12px] max-[900px]:px-[32px] max-[900px]:py-[14px]'
                  : 'text-[12px] px-[24px] py-[12px] max-[900px]:px-[32px] max-[900px]:py-[14px] xl:text-[13px] xl:px-[26px] xl:py-[12px] 2xl:text-[14px] 2xl:px-[32px] 2xl:py-[13px]'
                }
              `}
            >
              Tüm işleri gör
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[13px] h-[13px] transition-transform duration-300 group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  )
}