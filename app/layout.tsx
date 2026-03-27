import type { Metadata } from 'next'
import './global.css'
import Nav from '@/components/Nav'

export const metadata: Metadata = {
  title: 'Portfolio — Creative Design',
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
      <body>
        <Nav />
        <main>
          {children}
        </main>
        <footer>
          <span className="footer-logo">PORTFOLIO<span style={{ color: 'var(--accent)' }}>.</span></span>
          <span className="footer-copy">© {new Date().getFullYear()} — Tüm hakları saklıdır</span>
          <a href="mailto:hello@email.com" className="footer-contact">hello@email.com</a>
        </footer>
      </body>
    </html>
  )
}