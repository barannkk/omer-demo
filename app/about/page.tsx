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

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen pt-[var(--nav-h)]">
      <style>{`
        @keyframes float1 {
          0%, 100% { transform: translateY(0px) rotate(-2deg); }
          50% { transform: translateY(-16px) rotate(2deg); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(-8px) rotate(2deg); }
          50% { transform: translateY(12px) rotate(-1deg); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(5px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(-3deg); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(-12px) rotate(-2deg); }
          50% { transform: translateY(8px) rotate(2deg); }
        }
        .icon-float-1 { animation: float1 4s ease-in-out infinite; }
        .icon-float-2 { animation: float2 3.5s ease-in-out infinite; }
        .icon-float-3 { animation: float3 4.2s ease-in-out infinite; }
        .icon-float-4 { animation: float4 3.8s ease-in-out infinite; }
      `}</style>

      {/* ── BÖLÜM 1: HAKKIMDA ── */}
      <section className="relative w-full border-b border-white/[0.06] overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 xl:px-20 py-[60px] sm:py-[80px] md:py-[100px] flex flex-col items-center justify-center text-center">

          <span className="text-[#c2e200] text-[10px] sm:text-[11px] tracking-[0.22em] font-medium uppercase mb-6 sm:mb-8 block">
            HAKKIMDA
          </span>

          {/* SOL TARAFTAKİ 2 İKON */}
          <div className="icon-float-1 absolute left-[3%] lg:left-[5%] xl:left-[8%] top-[25%] opacity-75 hidden lg:block">
            <img src="/icons/ps.svg" alt="icon" className="w-[72px] h-[72px] xl:w-[88px] xl:h-[88px] object-contain" />
          </div>
          <div className="icon-float-2 absolute left-[8%] lg:left-[12%] xl:left-[15%] top-[65%] opacity-75 hidden lg:block">
            <img src="/icons/ai.svg" alt="icon" className="w-[72px] h-[72px] xl:w-[88px] xl:h-[88px] object-contain" />
          </div>

          {/* SAĞ TARAFTAKİ 2 İKON */}
          <div className="icon-float-3 absolute right-[3%] lg:right-[5%] xl:right-[8%] top-[25%] opacity-75 hidden lg:block">
            <img src="/icons/ae.svg" alt="icon" className="w-[72px] h-[72px] xl:w-[88px] xl:h-[88px] object-contain" />
          </div>
          <div className="icon-float-4 absolute right-[8%] lg:right-[12%] xl:right-[15%] top-[65%] opacity-75 hidden lg:block">
            <img src="/icons/artificial.svg" alt="icon" className="w-[72px] h-[72px] xl:w-[88px] xl:h-[88px] object-contain" />
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