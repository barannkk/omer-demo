'use client'

import { Play, Radio, Package, Fingerprint, Film, Sparkles, AppWindow } from "lucide-react"

const services = [
  {
    icon: <Play size={18} />,
    label: "AI Video Creation",
    description: "Yapay zeka destekli, etkileyici gelen videolar.",
  },
  {
    icon: <Radio size={18} />,
    label: "Social Media Ads",
    description: "Sosyal medyada fark yaratan reklamlar.",
  },
  {
    icon: <Package size={18} />,
    label: "Product Packing",
    description: "Ürününüzü öne çıkaran ambalaj tasarımı.",
  },
  {
    icon: <Fingerprint size={18} />,
    label: "Event Identity",
    description: "Etkinlikler için güçlü görsel anlatma, kimlik.",
  },
  {
    icon: <Film size={18} />,
    label: "Motion Design",
    description: "Hareketli grafiklerle hikaye anlatımı.",
  },
  {
    icon: <Sparkles size={18} />,
    label: "AI Image Gen",
    description: "Yapay zeka ile özgün görseller.",
  },
  {
    icon: <Sparkles size={18} />,
    label: "AI Image Gen",
    description: "Yapay zeka ile özgün görseller.",
  },
]

const appProjects = [
  {
    name: "OMR Work App",
    category: "Portfolyo & Tasarım",
    description: "Tüm projelerimi ve hizmetlerimi keşfedebileceğiniz mobil deneyim.",
    badge: "App Store",
    color: "#c2e200",
  },
  {
    name: "Brand Kit",
    category: "Marka Araçları",
    description: "Markanız için hazır şablonlar, renkler ve tipografi kılavuzu.",
    badge: "Yakında",
    color: "rgba(255,255,255,0.2)",
  },
  {
    name: "Motion Pack",
    category: "Animasyon",
    description: "Sosyal medya için hazır motion design template paketi.",
    badge: "Yakında",
    color: "rgba(255,255,255,0.2)",
  },
]

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen pt-[var(--nav-h)]">

      {/* ── BÖLÜM 1: HAKKIMDA ── */}
      <section className="relative w-full border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 xl:px-20 py-[60px] sm:py-[80px] md:py-[100px] flex flex-col items-center justify-center text-center">

          <span className="text-[#c2e200] text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase mb-6 sm:mb-8 block">
            HAKKIMDA
          </span>

          <div className="w-full max-w-[560px] flex flex-col items-center">

            <h1 className="text-white font-medium leading-[1.0] tracking-tight mb-6 sm:mb-8 text-[42px] sm:text-[56px] md:text-[72px]">
              Ben{' '}
              <em className="font-canela font-medium text-[#c2e200]">kimim?</em>
            </h1>

            <p className="text-white/55 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.8] mb-4 sm:mb-6">
              Ben, markaların sıradanlıktan sıyrılıp akılda kalıcı hale gelmesini sağlayan bir yaratıcıyım. Tasarım benim için sadece estetik değil, strateji ve iletişim.
            </p>

            <p className="text-white/55 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.8] mb-10 sm:mb-12">
              Her projede stratejiyle yaratıcılığı birleştiriyor, markanızı sadece göstermekle kalmıyor, hissettiriyorum.
            </p>

            <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
              <div className="text-center sm:text-left">
                <p className="text-white font-semibold text-[14px] sm:text-[15px]">Ömer</p>
                <p className="text-white/40 text-[12px] sm:text-[13px] mt-[2px]">Creative Designer & AI Artist</p>
              </div>

              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 sm:px-4 py-2 shrink-0">
                <div className="w-2 h-2 rounded-full bg-[#c2e200] shadow-[0_0_8px_rgba(194,226,0,0.8)]" />
                <span className="text-white font-semibold text-[12px] sm:text-[13px]">3 yıl</span>
                <span className="text-white/50 text-[11px] sm:text-[12px]">Deneyim</span>
              </div>
            </div>

          </div>
        </div>

        <div
          className="absolute top-0 right-0 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(194,226,0,0.08) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
      </section>

      {/* ── BÖLÜM 2: HİZMETLERİM ── */}
      <section className="relative w-full border-b border-white/[0.06]">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 xl:px-20 py-[60px] sm:py-[80px] md:py-[100px]">

          <span className="text-[#c2e200] text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase mb-6 sm:mb-8 block">
            HİZMETLERİM
          </span>

          <h2 className="text-white font-medium leading-[1.0] tracking-tight mb-3 sm:mb-4 text-[34px] sm:text-[48px] md:text-[60px]">
            Markan için{' '}
            <em className="font-canela font-medium text-[#c2e200]">neler yapabilirim?</em>
          </h2>

          <p className="text-white/40 text-[14px] sm:text-[15px] md:text-[16px] leading-[1.75] mb-10 sm:mb-16 max-w-[400px]">
            Görsel dünyayı baştan yaratacak hizmetler.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 sm:gap-3">
            {services.map((service, i) => (
              <div
                key={i}
                className="group flex flex-col gap-3 sm:gap-4 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-white/[0.12] rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 transition-all duration-300 cursor-default"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px] bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/60 group-hover:text-[#c2e200] group-hover:border-[#c2e200]/20 transition-all duration-300 shrink-0">
                  {service.icon}
                </div>
                <div>
                  <p className="text-white font-semibold text-[12px] sm:text-[13px] leading-[1.3] mb-1 sm:mb-2">
                    {service.label}
                  </p>
                  <p className="text-white/35 text-[11px] sm:text-[12px] leading-[1.6]">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        <div
          className="absolute bottom-0 left-[-100px] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(194,226,0,0.06) 0%, transparent 70%)',
            filter: 'blur(90px)',
          }}
        />
      </section>

      

    </main>
  )
}