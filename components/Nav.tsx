'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const LOGO_PATH = '/logos/navlogo.svg'
const HAS_LOGO = true

export default function Nav() {
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const isActive = (href: string) => path === href

  const links = [
    { href: '/', label: 'ANA SAYFA' },
    { href: '/about', label: 'HAKKIMDA' },
    { href: '/contact', label: 'İLETİŞİM' },
  ]

  return (
    <nav className="fixed top-[10px] left-1/2 -translate-x-1/2 z-[1000] pointer-events-none w-auto transition-all duration-500">
      <div
        className="nav-mobile-inner flex items-center justify-between pointer-events-auto bg-[#bfd730] rounded-[100px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] flex-wrap transition-all duration-500
          /* STANDART MASAÜSTÜ DEĞERLERİN (Senin orijinal ölçülerin) */
          gap-[70px] py-[14px] pl-[26px] pr-[16px] min-w-[1000px]
          /* 2K EKRANLAR İÇİN BÜYÜME DEĞERLERİ (2xl:) */
          2xl:gap-[120px] 2xl:py-[20px] 2xl:pl-[40px] 2xl:pr-[24px] 2xl:min-w-[1400px]
        "
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ana Sayfa"
          className="flex items-center shrink-0"
        >
          {HAS_LOGO ? (
            <div className="relative w-[100px] 2xl:w-[140px] transition-all duration-500">
              <Image
                src={LOGO_PATH}
                alt="Logo"
                width={140}
                height={40}
                priority
                className="w-full h-auto object-contain"
              />
            </div>
          ) : (
            <span className="text-[18px] 2xl:text-[24px] font-bold text-[#111321]">omer.work</span>
          )}
        </Link>

        {/* Hamburger (Mobilde çalışır, CSS'te ayarlı) */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menüyü aç/kapat"
        >
          <span />
          <span />
          <span />
        </button>

        {/* Links */}
        <ul className={`nav-links-mobile m-0 p-0 list-none ${menuOpen ? ' open' : ''}`}>
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`nav-link-hover flex items-center rounded-[50px] bg-transparent text-[#111321] no-underline uppercase tracking-[0.05em] font-extrabold transition-all duration-500
                  ${isActive(href) ? ' nav-link-active' : ''}
                  /* STANDART MASAÜSTÜ */
                  text-[15px] px-[22px] py-[10px]
                  /* 2K EKRANLAR */
                  2xl:text-[18px] 2xl:px-[30px] 2xl:py-[14px]
                `}
              >
                {label}
              </Link>
            </li>
          ))}

          {/* AI Butonu */}
          <li>
            <Link
              href="/ai-works"
              onClick={() => setMenuOpen(false)}
              className="btn-ai-hover inline-flex items-center justify-center leading-none rounded-[50px] uppercase tracking-[0.05em] font-extrabold no-underline transition-all duration-500
                bg-[#111321] text-[#bfd730] border border-[#111321]
                /* STANDART MASAÜSTÜ */
                text-[15px] px-[32px] py-[13px]
                /* 2K EKRANLAR */
                2xl:text-[18px] 2xl:px-[45px] 2xl:py-[18px]
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