import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      aspectRatio: {
        '7/8': '7 / 8',
      },
      fontFamily: {
        comforter: ['var(--font-comforter)'],
        poiretOne: ['var(--font-poiret-one)'],
      },
      container: {
        padding: {
          DEFAULT: '2rem',
          sm: '4rem',
          lg: '8rem',
          xl: '10rem',
          '2xl': '12rem',
        },
      },
    },
  },
  plugins: [],
}
export default config
