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
          <div className="footer-left">
            <Image 
              src="/logos/workgreen.svg" // Logo dosya yolun
              alt="OMR Work" 
              width={110} 
              height={35} 
              className="footer-logo-img"
            />
            <p className="footer-copy">
              © {new Date().getFullYear()} — Tüm hakları saklıdır
            </p>
          </div>

          <a href="mailto:omr.workco@gmail.com" className="footer-contact">
            omr.workco@gmail.com
          </a>
        </footer>
      </body>
    </html>
  )
}