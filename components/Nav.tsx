'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const LOGO_PATH = '/logos/omr_lime_logo.svg'
const HAS_LOGO = true

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { href: '/', label: 'ANA SAYFA' },
    { href: '/about', label: 'HAKKIMDA' },
    { href: '/works', label: 'ÇALIŞMALAR' },
    { href: '/contact', label: 'İLETİŞİM' },
  ]

  return (
    <nav
      className={`fixed z-[1000] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
        ${scrolled
          ? 'top-[10px] left-1/2 -translate-x-1/2 w-auto pointer-events-none'
          : 'top-0 left-0 right-0 w-full pointer-events-none'
        }
      `}
    >
      <div
        className={`pointer-events-auto flex items-center justify-between transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
          ${scrolled
            ? `rounded-[100px] border border-[rgba(194,226,0,0.18)]
               bg-[rgba(0,0,0,0.45)] backdrop-blur-[24px]
               px-[20px] py-[10px] min-w-[860px] gap-[8px]
               shadow-[0_8px_32px_rgba(0,0,0,0.5)]
               ${menuOpen ? 'rounded-[24px]' : ''}
              `
            : `rounded-none border-b border-[rgba(194,226,0,0.08)]
               bg-black/30 backdrop-blur-md
               px-[48px] py-[18px] w-full
               xl:px-[80px] 2xl:px-[100px]
              `
          }
        `}
      >
        {/* LOGO */}
        <Link href="/" aria-label="Ana Sayfa" className="flex items-center shrink-0">
          {HAS_LOGO ? (
            <div className={`relative transition-all duration-300 ${scrolled ? 'w-[80px]' : 'w-[90px] xl:w-[110px] 2xl:w-[130px]'}`}>
              <Image src={LOGO_PATH} alt="Logo" width={140} height={40} priority className="w-full h-auto object-contain" />
            </div>
          ) : (
            <span className={`font-black text-white transition-all duration-300 ${scrolled ? 'text-[17px]' : 'text-[19px] xl:text-[22px]'}`}>
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
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`nav-link-hover flex items-center rounded-[50px] text-[rgba(255,255,255,0.7)] no-underline uppercase tracking-[0.08em] font-bold transition-all duration-300
                  hover:text-white hover:bg-[rgba(255,255,255,0.06)]
                  ${scrolled
                    ? 'text-[12px] px-[16px] py-[8px]'
                    : 'text-[12px] px-[16px] py-[8px] xl:text-[13px] xl:px-[18px] xl:py-[9px] 2xl:text-[14px] 2xl:px-[22px] 2xl:py-[10px]'
                  }
                `}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* BİR PROJE BAŞLAT BUTONU */}
          <li>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className={`btn-proje inline-flex items-center gap-[6px] justify-center leading-none rounded-[50px] uppercase tracking-[0.06em] font-extrabold no-underline transition-all duration-300
                bg-[#c2e200] text-black hover:bg-[#d4f500] hover:translate-y-[-1px]
                ${scrolled
                  ? 'text-[12px] px-[22px] py-[11px]'
                  : 'text-[12px] px-[22px] py-[11px] xl:text-[13px] xl:px-[26px] xl:py-[12px] 2xl:text-[14px] 2xl:px-[32px] 2xl:py-[13px]'
                }
              `}
            >
              BİR PROJE BAŞLAT
              <span className="text-[14px] leading-none">↗</span>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}