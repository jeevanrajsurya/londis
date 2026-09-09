/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        londis: {
          green: '#016839',
          lime: '#84d400',
          'lime-light': '#94ed00',
          shade: '#014d28',
          tint: '#e8f7ee',
          black: '#111827',
        },
        conoco: {
          red: '#016839',
          'red-80': '#15803d',
          'red-10': '#e8f7ee',
          'red-shade': '#014d28',
          black: '#161616',
        },
        brand: {
          50: '#e8f7ee',
          100: '#c6ebd4',
          400: '#84d400',
          500: '#016839',
          600: '#014d28',
          700: '#013d20',
          900: '#062814',
        },
        ink: '#161616',
      },
      fontFamily: {
        sans: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        body: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        gotham: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        display: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        headings: ['"Gotham SSm"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        founders: ['"Founders Grotesk"', '"Gotham SSm"', 'sans-serif'],
        cta: ['"Founders Grotesk"', '"Gotham SSm"', 'sans-serif'],
        button: ['"Founders Grotesk"', '"Gotham SSm"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
