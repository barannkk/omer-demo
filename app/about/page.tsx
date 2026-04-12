'use client'

import { Play, Radio, Package, Fingerprint, Film, Sparkles, Store } from "lucide-react"

const services = [
  { icon: <Play size={18} />, label: "AI Video Creation", description: "Yapay zeka destekli, etkileyici gelen videolar." },
  { icon: <Radio size={18} />, label: "Social Media Ads", description: "Sosyal medyada fark yaratan reklamlar." },
  { icon: <Package size={18} />, label: "Product Packing", description: "Ürününüzü öne çıkaran ambalaj tasarımı." },
  { icon: <Fingerprint size={18} />, label: "Event Identity", description: "Etkinlikler için güçlü görsel anlatma, kimlik." },
  { icon: <Film size={18} />, label: "Motion Design", description: "Hareketli grafiklerle hikaye anlatımı." },
  { icon: <Sparkles size={18} />, label: "AI Image Gen", description: "Yapay zeka ile özgün görseller." },
  { icon: <Store size={18} />, label: "AppStore", description: "Mobil uygulamanız için orjinal tasarımlar." },
]

const appProjects = [
  { name: "OMR Work App", category: "Portfolyo & Tasarım", description: "Tüm projelerimi ve hizmetlerimi keşfedebileceğiniz mobil deneyim.", badge: "App Store", color: "#c2e200" },
  { name: "Brand Kit", category: "Marka Araçları", description: "Markanız için hazır şablonlar, renkler ve tipografi kılavuzu.", badge: "Yakında", color: "rgba(255,255,255,0.2)" },
  { name: "Motion Pack", category: "Animasyon", description: "Sosyal medya için hazır motion design template paketi.", badge: "Yakında", color: "rgba(255,255,255,0.2)" },
]

const GlowLine = () => (
  <span
    className="absolute bottom-[-1px] left-1/2 -translate-x-1/2 pointer-events-none"
    style={{
      width: "70%",
      height: "2px",
      background: "radial-gradient(ellipse at center, rgba(194,226,0,0.95) 0%, transparent 70%)",
      filter: "blur(1px)",
    }}
  />
)

const PsIcon = ({ size = 72 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="11" fill="#001E36"/>
    <path d="M15 36V18H22C23.8 18 25.3 18.5 26.4 19.5C27.5 20.5 28.05 21.85 28.05 23.55C28.05 25.25 27.5 26.6 26.4 27.6C25.3 28.6 23.8 29.1 22 29.1H18.4V36H15ZM18.4 26.1H21.7C22.75 26.1 23.575 25.825 24.175 25.275C24.775 24.725 25.075 23.975 25.075 23.025C25.075 22.075 24.775 21.325 24.175 20.775C23.575 20.225 22.75 19.95 21.7 19.95H18.4V26.1Z" fill="#31A8FF"/>
    <path d="M33.2 36.5C31.75 36.5 30.5 36.225 29.45 35.675C28.4 35.125 27.65 34.325 27.2 33.275L29.8 32C30.075 32.675 30.525 33.175 31.15 33.5C31.775 33.825 32.45 33.988 33.175 33.988C33.9 33.988 34.475 33.825 34.875 33.5C35.275 33.175 35.475 32.762 35.475 32.262C35.475 31.762 35.275 31.35 34.875 31.025C34.475 30.7 33.75 30.375 32.7 30.05C31.35 29.65 30.325 29.125 29.625 28.475C28.925 27.825 28.575 26.975 28.575 25.925C28.575 25.075 28.8 24.325 29.25 23.675C29.7 23.025 30.325 22.512 31.125 22.137C31.925 21.762 32.825 21.575 33.825 21.575C35.1 21.575 36.2 21.85 37.1 22.4C38 22.95 38.65 23.7 39.05 24.65L36.525 25.9C36.3 25.35 35.95 24.938 35.45 24.662C34.95 24.387 34.425 24.25 33.875 24.25C33.275 24.25 32.775 24.387 32.375 24.662C31.975 24.938 31.775 25.3 31.775 25.75C31.775 26.2 31.975 26.562 32.375 26.837C32.775 27.112 33.475 27.4 34.475 27.7C35.375 27.975 36.1 28.275 36.65 28.6C37.2 28.925 37.638 29.338 37.963 29.838C38.288 30.338 38.45 30.95 38.45 31.675C38.45 32.525 38.225 33.275 37.775 33.925C37.325 34.575 36.688 35.088 35.863 35.463C35.038 35.838 34.175 36.5 33.2 36.5Z" fill="#31A8FF"/>
  </svg>
)

const AiIcon = ({ size = 72 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="56" height="56" rx="11" fill="#1A0A00"/>
    <path d="M24.5 32H17.5L16.2 36H13L19.5 18H22.5L29 36H25.8L24.5 32ZM18.4 29.3H23.6L21 21.8L18.4 29.3Z" fill="#FF9A00"/>
    <path d="M32 18H35.2V36H32V18Z" fill="#FF9A00"/>
    <circle cx="33.6" cy="14.5" r="2" fill="#FF9A00"/>
  </svg>
)

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen pt-[var(--nav-h)]">
      <style>{`
        @keyframes floatA {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes floatB {
          0%, 100% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(10px) rotate(-2deg); }
        }
        .icon-float-ps { animation: floatA 4s ease-in-out infinite; }
        .icon-float-ai { animation: floatB 3.5s ease-in-out infinite; }
      `}</style>

      {/* ── BÖLÜM 1: HAKKIMDA ── */}
      <section className="relative w-full border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 xl:px-20 py-[60px] sm:py-[80px] md:py-[100px] flex flex-col items-center justify-center text-center">

          <span className="text-[#c2e200] text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase mb-6 sm:mb-8 block">
            HAKKIMDA
          </span>

          {/* Photoshop ikonu — sol, sadece lg+ */}
          <div className="icon-float-ps absolute left-[3%] lg:left-[6%] xl:left-[10%] top-1/2 -translate-y-1/2 opacity-75 hidden lg:block">
            <div className="hidden xl:block"><PsIcon size={88} /></div>
            <div className="block xl:hidden"><PsIcon size={72} /></div>
          </div>

          {/* Illustrator ikonu — sağ, sadece lg+ */}
          <div className="icon-float-ai absolute right-[3%] lg:right-[6%] xl:right-[10%] top-1/2 -translate-y-1/2 opacity-75 hidden lg:block">
            <div className="hidden xl:block"><AiIcon size={88} /></div>
            <div className="block xl:hidden"><AiIcon size={72} /></div>
          </div>

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

            {/* İsim */}
            <div className="mb-5">
              <p className="text-white font-semibold text-[14px] sm:text-[15px]">Ömer</p>
              <p className="text-white/40 text-[12px] sm:text-[13px] mt-[2px]">Creative Designer & AI Artist</p>
            </div>

            {/* Badge'ler */}
            <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">

              {/* 3 Yıl Deneyim */}
              <div
                className="relative overflow-hidden flex items-center gap-2 rounded-full px-3 sm:px-4 py-2 cursor-default transition-all duration-300 hover:-translate-y-1"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.10)" }}
              >
                <div className="w-2 h-2 rounded-full bg-[#c2e200] shadow-[0_0_8px_rgba(194,226,0,0.8)]" />
                <span className="text-white font-semibold text-[12px] sm:text-[13px]">3 yıl</span>
                <span className="text-white/50 text-[11px] sm:text-[12px]">Deneyim</span>
                <GlowLine />
              </div>

              {/* İstatistikler */}
              {[
                { number: "50+", label: "Proje" },
                { number: "10+", label: "Marka" },
                { number: "%100", label: "Memnuniyet", highlight: true },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full cursor-default transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <span className={`font-bold text-[13px] sm:text-[14px] ${stat.highlight ? 'text-[#c2e200] drop-shadow-[0_0_8px_rgba(194,226,0,0.6)]' : 'text-white'}`}>
                    {stat.number}
                  </span>
                  <span className="text-white/50 text-[11px] sm:text-[12px]">{stat.label}</span>
                  <GlowLine />
                </div>
              ))}

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
                className="group flex flex-col gap-3 sm:gap-4 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#c2e200]/30 rounded-[14px] sm:rounded-[16px] p-4 sm:p-5 transition-all duration-300 cursor-default hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(194,226,0,0.07)]"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-[8px] sm:rounded-[10px] bg-white/5 border border-white/[0.08] flex items-center justify-center text-white/50 group-hover:text-[#c2e200] group-hover:border-[#c2e200]/25 group-hover:bg-[#c2e200]/5 transition-all duration-300 shrink-0 group-hover:scale-110">
                  {service.icon}
                </div>
                <div>
                  <p className="text-white/80 group-hover:text-white font-semibold text-[12px] sm:text-[13px] leading-[1.3] mb-1 sm:mb-2 transition-colors duration-300">
                    {service.label}
                  </p>
                  <p className="text-white/35 group-hover:text-white/50 text-[11px] sm:text-[12px] leading-[1.6] transition-colors duration-300">
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