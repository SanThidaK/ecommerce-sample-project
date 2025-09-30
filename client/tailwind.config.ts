import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dior-gold': '#C8A26A',
        'dark-gray-gradient': 'rgba(1, 1, 1, 0.5)',
        // 'light-gray': '#F5F5F5',
        'light-gray': '#F8F8F8',
        'primary-alt-1': '#7b8487',
        // 'dark-gray': '#1A1A1A',
        'dark': {
          400: '#33383c'
        }
      },
      backgroundImage: {
        // This creates a new utility class: bg-gradient-dark-gray
        'gradient-dark-gray': 'linear-gradient(to bottom, transparent, rgba(1, 1, 1, 0.5))',
        'cannage': "url('/assets/photos/cannage-bg.png')",
      },
    },
  },
  plugins: [],
};

export default config;

