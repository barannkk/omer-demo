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
    <nav style={{
      position: 'fixed',
      top: '10px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      pointerEvents: 'none',
      width: 'auto',
    }}>
      <div
        className="nav-mobile-inner"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '70px',
          padding: '14px 16px 14px 26px',
          pointerEvents: 'auto',
          background: '#bfd730',
          borderRadius: '100px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          minWidth: '1000px',
          flexWrap: 'wrap',
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          aria-label="Ana Sayfa"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}
        >
          {HAS_LOGO ? (
            <Image
              src={LOGO_PATH}
              alt="Logo"
              width={100}
              height={30}
              priority
              style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
            />
          ) : (
            <span>omer.work</span>
          )}
        </Link>

        {/* Hamburger */}
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
        <ul
          className={`nav-links-mobile${menuOpen ? ' open' : ''}`}
          style={{ listStyle: 'none', padding: 0, margin: 0 }}
        >
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`nav-link-hover${isActive(href) ? ' nav-link-active' : ''}`}
                style={{
                  fontSize: '15px',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: '#111321',
                  padding: '10px 22px',
                  display: 'flex',
                  alignItems: 'center',
                  borderRadius: '50px',
                  background: 'transparent',
                }}
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
              className="btn-ai-hover"
              style={{
                background: '#111321',
                color: '#bfd730',
                border: '1px solid #111321',
                padding: '13px 32px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
                borderRadius: '50px',
                fontSize: '15px',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              AI ÇALIŞMALARI
            </Link>
          </li>
        </ul>

      </div>
    </nav>
  )
}