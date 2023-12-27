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
          'accent': "var(--sheet-accent)",
          'shadow': "var(--sheet-shadow)",
          'chord-text': "var(--sheet-chord-text)",
        }
      }
    },
  },
  plugins: [],
}
export default config
