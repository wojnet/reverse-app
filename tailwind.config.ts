import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--fira-code)"],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-bg': "url('/images/background.jpg')"
      },
      colors: {
        'app': {
          'lighter-gray': "#343433",
          'light-gray': "#272726",
          'gray': "#1e1f1f",
          'text': "#ddd",
          'outline': "#64748b",
          'lighter-outline': "#f1f5f9",
          'darker-outline': "#404c5c",
        },
        'sheet': {
          'text': "var(--sheet-text)",
          'background': "var(--sheet-background)",
          'outline': "var(--sheet-outline)",
          'chord': "var(--sheet-chord)",
          'shadow': "var(--sheet-shadow)",
          'chord-text': "var(--sheet-chord-text)",
        }
      },
      keyframes: {
        wiggleAnimation: {
          '10%, 90%': { transform: 'translate3d(-1px, -4px, 0)' },
          '20%, 80%': { transform: 'translate3d(2px, 0, 6px)' },
          '30%, 50%, 70%': { transform: 'translate3d(-4px, -1px, 0)' },
          '40%, 60%': { transform: 'translate3d(3px, 2px, -6px)' },
        }
      },
      animation: {
        'wiggle': 'wiggleAnimation 10s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
export default config
