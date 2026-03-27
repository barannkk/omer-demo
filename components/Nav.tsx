'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

// Logo dosyasını /public/logo.png veya /public/logo.svg olarak ekle
// Eğer henüz yoksa fallback metin görünür
const LOGO_PATH = '/logo.png' // kendi logo yolunu buraya yaz
const HAS_LOGO = false        // logoyu ekledikten sonra true yap

export default function Nav() {
  const path = usePathname()

  const isActive = (href: string) => path === href

  return (
    <nav>
      {/* Sol — boş veya ek linkler eklenebilir */}
      <ul className="nav-left">
        {/* İstersen buraya başka linkler ekle, şimdilik boş */}
      </ul>

      {/* Merkez — Logo */}
      <Link href="/" className="nav-logo" aria-label="Ana Sayfa">
        {HAS_LOGO ? (
          <Image
            src={LOGO_PATH}
            alt="Logo"
            width={120}
            height={38}
            priority
            style={{ height: 38, width: 'auto', objectFit: 'contain' }}
          />
        ) : (
          /* Logo yokken fallback — kendi adını yaz */
          <span className="nav-logo-fallback">
            ÖMER<span>.</span>FARUK GELİŞİN
          </span>
        )}
      </Link>

      {/* Sağ — navigasyon linkleri */}
      <ul className="nav-right">
        <li>
          <Link
            href="/about"
            style={isActive('/about') ? { color: 'var(--accent)' } : {}}
          >
            Hakkımda
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            style={isActive('/contact') ? { color: 'var(--accent)' } : {}}
          >
            İletişim
          </Link>
        </li>
      </ul>
    </nav>
  )
}