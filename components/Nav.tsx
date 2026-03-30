'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// Kendi logo dosyanın yolunu buraya yaz (public klasörü içinde olmalı)
const LOGO_PATH = '/logos/navlogo.svg' 
const HAS_LOGO = true // Logoyu ekledikten sonra true yap

export default function Nav() {
  const path = usePathname()

  // Aktif link kontrolü için basit bir fonksiyon
  const getLinkStyle = (href: string) => {
    return path === href ? { color: 'var(--black)' } : {} // Aktifse siyah yap (neon üzerinde)
  }

  return (
    <nav className="floating-nav">
      <div className="nav-inner">
        {/* Sol — Logo */}
        <Link href="/" className="nav-logo" aria-label="Ana Sayfa">
          {HAS_LOGO ? (
            <Image
              src={LOGO_PATH}
              alt="Ömer Faruk Gelişin Logo"
              width={100} // Logonun genişliği
              height={30} // Logonun yüksekliği
              priority
              className="nav-img"
            />
          ) : (
            // Logo yoksa fallback metin
            <span className="nav-logo-fallback">omer.work</span>
          )}
        </Link>

        {/* Sağ — Navigasyon Linkleri (Butonlar) */}
        <ul className="nav-links">
          {/* ANA SAYFA linki en başa eklendi */}
          <li>
            <Link href="/" className="glow-white" style={getLinkStyle('/')}>
              ANA SAYFA
            </Link>
          </li>
          <li>
            <Link href="/about" className="glow-white" style={getLinkStyle('/about')}>
              HAKKIMDA
            </Link>
          </li>
          <li>
            <Link href="/contact" className="glow-white" style={getLinkStyle('/contact')}>
              İLETİŞİM
            </Link>
          </li>
          <li>
            <Link href="/ai-works" className="btn-ai">
              AI ÇALIŞMALARI
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}