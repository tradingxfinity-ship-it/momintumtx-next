/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy:      '#043253',
          'navy-dark': '#021e33',
          'navy-mid':  '#0a4a73',
          yellow:    '#ffe100',
          'yellow-dark': '#e6c900',
        },
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'grid-white': `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
      },
      backgroundSize: {
        'grid': '56px 56px',
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        'photo-strip': 'ticker 40s linear infinite',
        'photo-strip-reverse': 'ticker-reverse 40s linear infinite',
      },
      keyframes: {
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker-reverse': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
