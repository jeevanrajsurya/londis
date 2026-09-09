/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Londis Forecourt Green & Eco-Lime Design Palette (Client Reference)
        londis: {
          green: '#016839',       // Primary Brand Forest Green
          lime: '#84d400',        // Dynamic Vibrant Lime Swoosh
          'lime-light': '#94ed00',
          shade: '#014d28',       // Dark Forest Green Hover State
          tint: '#e8f7ee',        // Soft Eco Mint Tint
          black: '#111827',
        },
        conoco: {
          red: '#016839',         // Mapped to Londis Forest Green
          'red-80': '#15803d',
          'red-10': '#e8f7ee',
          'red-shade': '#014d28',
          black: '#161616',
        },
        brand: {
          50: '#e8f7ee',
          100: '#c6ebd4',
          400: '#84d400',
          500: '#016839',         // Primary Forest Green
          600: '#014d28',         // Forest Dark Hover
          700: '#013d20',
          900: '#062814',
        },
        webgray: '#ebebef',
        uigray: '#797979',
        inactive: '#c9c9c9',
        darkblack: '#000000',
        darkbtn: '#232323',
        ink: '#161616',
        p66: {
          red: '#016839',
          shade: '#014d28',
          tint: '#e8f7ee',
        },
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
      fontSize: {
        'headline-1': ['var(--wp--custom--typography--headline-1--font-size, 60px)', { lineHeight: 'var(--wp--custom--typography--headline-1--line-height, 1.167)', fontWeight: '700' }],
        'headline-2': ['var(--wp--custom--typography--headline-2--font-size, 42px)', { lineHeight: 'var(--wp--custom--typography--headline-2--line-height, 1.095)', fontWeight: '700' }],
        'headline-3': ['var(--wp--custom--typography--headline-3--font-size, 34px)', { lineHeight: 'var(--wp--custom--typography--headline-3--line-height, 1.294)', fontWeight: '700' }],
        'headline-4': ['var(--wp--custom--typography--headline-4--font-size, 26px)', { lineHeight: 'var(--wp--custom--typography--headline-4--line-height, 1.154)', fontWeight: '700' }],
        'headline-5': ['var(--wp--custom--typography--headline-5--font-size, 20px)', { lineHeight: 'var(--wp--custom--typography--headline-5--line-height, 1.4)', fontWeight: '700' }],
        'headline-6': ['var(--wp--custom--typography--headline-6--font-size, 14px)', { lineHeight: 'var(--wp--custom--typography--headline-6--line-height, 1.429)', fontWeight: '400' }],
        'button-text': ['var(--wp--custom--typography--button-text--font-size, 18px)', { lineHeight: 'var(--wp--custom--typography--button-text--line-height, 20px)', fontWeight: '600', letterSpacing: '-0.15px' }],
        'nav-1': ['var(--wp--custom--typography--nav-1--font-size, 16px)', { lineHeight: 'var(--wp--custom--typography--nav-1--line-height, 1.5)', fontWeight: '500' }],
        'body-1': ['var(--wp--custom--typography--paragraph-1--font-size, 16px)', { lineHeight: 'var(--wp--custom--typography--paragraph-1--line-height, 1.625)', fontWeight: '400', letterSpacing: '0.02em' }],
        'body-2': ['var(--wp--custom--typography--paragraph-2--font-size, 12px)', { lineHeight: 'var(--wp--custom--typography--paragraph-2--line-height, 1.667)', fontWeight: '400', letterSpacing: '0.02em' }],
        'body-3': ['var(--wp--custom--typography--paragraph-3--font-size, 20px)', { lineHeight: 'var(--wp--custom--typography--paragraph-3--line-height, 1.6)', fontWeight: '400', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
    },
  },
  plugins: [],
};
