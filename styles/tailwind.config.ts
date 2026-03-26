import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        vetra: {
          bg: '#eef2f8',
          ink: '#1f2a3d',
          storm: '#2a3f5f',
          parchment: '#f5ede0',
        },
      },
    },
  },
  plugins: [],
};

export default config;
