import type { Metadata } from 'next'
import './global.css'
import Nav from '@/components/Nav'
import localFont from 'next/font/local'
import Image from 'next/image'

const juturu = localFont({
  src: [
    { path: './font/juturu/Juturu-Thin.otf', weight: '100' },
    { path: './font/juturu/Juturu-Light.otf', weight: '300' },
    { path: './font/juturu/Juturu-Regular.otf', weight: '400' },
    { path: './font/juturu/Juturu-Medium.otf', weight: '500' },
    { path: './font/juturu/Juturu-Semibold.otf', weight: '600' },
    { path: './font/juturu/Juturu-Bold.otf', weight: '700' },
    { path: './font/juturu/Juturu-Extrabold.otf', weight: '800' },
    { path: './font/juturu/Juturu-Black.otf', weight: '900' },
  ],
  variable: '--font-juturu',
})

const canela = localFont({
  src: [
    { path: './font/canela/Canela-ThinItalic-Trial.otf', weight: '100', style: 'italic' },
    { path: './font/canela/Canela-LightItalic-Trial.otf', weight: '300', style: 'italic' },
    { path: './font/canela/Canela-RegularItalic-Trial.otf', weight: '400', style: 'italic' },
    { path: './font/canela/Canela-MediumItalic-Trial.otf', weight: '500', style: 'italic' },
    { path: './font/canela/Canela-BoldItalic-Trial.otf', weight: '700', style: 'italic' },
    { path: './font/canela/Canela-BlackItalic-Trial.otf', weight: '900', style: 'italic' },
  ],
  variable: '--font-canela',
})

export const metadata: Metadata = {
  title: 'Ömer — Creative Design',
  description: 'Marka kimliği, ambalaj ve görsel iletişim tasarımı portfolyosu',
  icons: {
    icon: '/logos/omr_lime_logo.svg',
  },
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
    <html lang="tr" style={{ colorScheme: 'dark' }}>
      <body className={`${juturu.className} ${juturu.variable} ${canela.variable}`}>
        <Nav />

        <main>
          {children}
        </main>

        <footer className="relative bg-black border-t border-white/[0.06] px-[6%] py-[22px]">

          {/* ANA SATIR: logo + telif | boşluk | ikonlar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* SOL: Logo + telif yan yana */}
            <div className="flex items-center gap-4">
              <img
                src="/logos/omr_lime_logo.svg"
                alt="OMR Work"
                className="h-[28px] w-auto"
              />
              <span className="text-white/25 text-[12px] tracking-wide whitespace-nowrap">
                © 2026 OMRWORK. Tüm hakları saklıdır.
              </span>
            </div>

            {/* SAĞ: Sosyal medya ikonları */}
            <div className="flex items-center gap-6">
              <a
                href="https://www.instagram.com/omr.work?igsh=MWNnaDNodnJ2aGRnMA%3D%3D&utm_source=qr"
                target="_blank"
                rel="noreferrer"
                className="opacity-40 hover:opacity-100 transition-opacity duration-200"
              >
                <img src="/icons/insta.svg" alt="Instagram" className="w-[18px] h-[18px] brightness-0 invert" />
              </a>

              <a
                href="https://www.behance.net/gelisinfaruk"
                target="_blank"
                rel="noreferrer"
                className="opacity-40 hover:opacity-100 transition-opacity duration-200 text-white font-semibold text-[14px] tracking-wide"
              >
                Bē
              </a>

              <a
                href="https://www.linkedin.com/in/%C3%B6mer-faruk-geli%C5%9Fin-0427a1220/"
                target="_blank"
                rel="noreferrer"
                className="opacity-40 hover:opacity-100 transition-opacity duration-200"
              >
                <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-[18px] h-[18px] brightness-0 invert" />
              </a>

              <a
                href="https://wa.me/905511639133"
                target="_blank"
                rel="noreferrer"
                className="opacity-40 hover:opacity-100 transition-opacity duration-200"
              >
                <img src="/icons/wp.svg" alt="WhatsApp" className="w-[18px] h-[18px] brightness-0 invert" />
              </a>
            </div>

          </div>

        </footer>
      </body>
    </html>
  )
}