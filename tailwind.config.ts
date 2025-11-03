import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Make sure your colors are inside 'extend'
    extend: {
      colors: {
        'beige': '#F5F5DC',
        'brown': '#A0522D',
        'burnt-sienna': '#E35336',
        'sandy-neutral': '#F4A460',
      },
      // ... other 'extend' properties
    },
  },
  plugins: [],
}
export default config