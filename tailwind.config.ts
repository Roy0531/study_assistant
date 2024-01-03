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
      },
      screens :{
        'tablet': '640px',
        'laptop': '1024px',
        'desktop': '1280px',
      },
      colors : {
        'primary': '#123A76',
        'primary-hover': '#4E71A6',
        'primary-light': '#A7C0E5',
        'primary-light-hover': '#84A9E0',
        'secondary': '#80873A',
        'secondary-light': '#F4F9B8',
        'backgound': '#F4F4F4',
        'nav-edge': '#BEBEBE',
        'chart-base': '#AEAEAE',
        'drop-bg': '#EAEAEA',
        'drop-text': '#484848',
        'divider': '#F2F1F1',
        'sub-text': '#838383',
        'table-hd': '#F7F7F7',
        'up': '#41F1A7',
        'flat': '#41A7F1',
        'down': '#F14161',
        'bad': '#FF8B8B',
        'good': '#82D885',
        'perfect': '#6A8BFF',
      }
    },
  },
  plugins: [],
}
export default config
