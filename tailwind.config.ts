import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}", // Eğer src klasörü kullanıyorsan garantiye alalım
  ],
  theme: {
    extend: {
      // Mevcut renklerini koruyoruz
      colors: {
        black: "#000000",
        white: "#f0f0f0",
        accent: "#c2e200",
        gray: "#0a0a2e",
        mid: "#6b6b9a",
        border: "rgba(191, 255, 0, 0.1)",
      },
      // Yazı tipini CSS değişkenine bağlayalım (Layout'taki Juturu için)
      fontFamily: {
        juturu: ["var(--font-juturu)", "sans-serif"],
        canela: ["var(--font-canela)", "serif"],
      },
      // Marquee ve Hover efektleri için özel değerler
      scale: {
        '115': '1.15',
      },
      // Animasyon Tanımları
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        textSlideInSoft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pillSlideOutSoft: {
          '0%': { opacity: '0', transform: 'translateX(-150px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        }
      },
      // Animasyon Sınıfları (Duration ve Timing'leri CSS'tekiyle aynı tuttum)
      animation: {
        marquee: 'marquee 50s linear infinite',
        'text-slide': 'textSlideInSoft 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pill-item-anim': 'pillSlideOutSoft 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
};



export default config;