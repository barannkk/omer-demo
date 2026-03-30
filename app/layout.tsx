import type { Metadata } from 'next'
import './global.css'
import Nav from '@/components/Nav'
import localFont from 'next/font/local'
import Image from 'next/image'

const juturu = localFont({
  src: [
    { path: './font/Juturu-Thin.otf', weight: '100' },
    { path: './font/Juturu-Light.otf', weight: '300' },
    { path: './font/Juturu-Regular.otf', weight: '400' },
    { path: './font/Juturu-Medium.otf', weight: '500' },
    { path: './font/Juturu-Semibold.otf', weight: '600' },
    { path: './font/Juturu-Bold.otf', weight: '700' },
    { path: './font/Juturu-Extrabold.otf', weight: '800' },
    { path: './font/Juturu-Black.otf', weight: '900' },
  ],
  variable: '--font-juturu',
})

export const metadata: Metadata = {
  title: 'Ömer — Creative Design',
  description: 'Marka kimliği, ambalaj ve görsel iletişim tasarımı portfolyosu',
  openGraph: {
    title: 'Portfolio — Creative Design',
    description: 'Marka kimliği, ambalaj ve görsel iletişim tasarımı portfolyosu',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr">
      <body className={`${juturu.className} ${juturu.variable}`}>
        <Nav />

        <main>
          {children}
        </main>

       <footer className="footer-main">
  {/* SOL */}
  <div className="footer-left">
    <img src="/logos/workblack.svg" alt="OMR Work" className="footer-logo-img" />
  </div>

  {/* ORTA */}
 <div className="footer-social-wrapper">
  <div className="footer-social-card">
    {/* Instagram */}
    <a href="https://www.instagram.com/omr.work?igsh=MWNnaDNodnJ2aGRnMA%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">
      <img src="/icons/insta.svg" alt="Instagram" className="footer-social-icon" />
    </a>
    
    {/* LinkedIn */}
    <a href="https://www.linkedin.com/in/%C3%B6mer-faruk-geli%C5%9Fin-0427a1220/" target="_blank" rel="noreferrer">
      <img src="/icons/linkedin.svg" alt="LinkedIn" className="footer-social-icon" />
    </a>

    {/* Behance */}
    <a href="https://www.behance.net/gelisinfaruk" target="_blank" rel="noreferrer">
      <img src="/icons/behance.svg" alt="Behance" className="footer-social-icon" />
    </a>

    {/* WhatsApp */}
    <a href="https://wa.me/905511639133" target="_blank" rel="noreferrer">
      <img src="/icons/wp.svg" alt="WhatsApp" className="footer-social-icon" />
    </a>
  </div>
</div>

  {/* SAĞ */}
  <div className="footer-right">
    <a href="mailto:omr.workco@gmail.com" className="footer-contact">
      omr.workco@gmail.com
    </a>
  </div>

  {/* TELİF */}
  <p className="footer-copy">© 2026 — TÜM HAKLARI SAKLIDIR</p>
</footer>
      </body>
    </html>
  )
}