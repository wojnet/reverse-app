import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
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
          'text': "#ddd"
        }
      }
    },
  },
  plugins: [],
}
export default config
