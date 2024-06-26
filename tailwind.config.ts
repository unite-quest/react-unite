/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './@/components/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      fontFamily: {
        'sacramento': ['Sacramento'],
        'roboto': ['Roboto'],
        'pt-serif': ['PT Serif'],
        'osd': ['osd'],
        'bitmap-pixel': ['Bitmap Pixel'],
      },
      colors: {
        'separator': '#A0A0A0',
        'beige': '#F4E9CD',
        'light-beige': '#FFFEFB',
        'cool-green': '#DBF0EE',
        'light-green': '#9DBEBB',
        'medium-green': '#77ACA2',
        'dark-green': '#468189',
        'black': '#031926',
        'blue': '#017BFD',
        'light-blue': '#ECF7FF',
        'border': 'hsl(var(--border))',
        'input': 'hsl(var(--input))',
        'ring': 'hsl(var(--ring))',
        'background': 'hsl(var(--background))',
        'foreground': 'hsl(var(--foreground))',
        'primary': {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        'secondary': {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        'destructive': {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        'muted': {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'accent': {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        'popover': {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        'card': {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'bounce2': {
          '0%, 80%, 90%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
          '85%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '95%': {
            transform: 'translateY(-15%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
        },
        'credits': {
          '0%': {
            top: '100vh', // Starts just below the viewport
          },
          '100%': {
            top: '-320vh', // Moves up far enough to accommodate different screen heights
          },
        },
        'credits-with-color': {
          '0%': {
            backgroundColor: '#DBF0EE',
          },
          '20%': {
            backgroundColor: '#F0EFDB',
          },
          '40%': {
            backgroundColor: '#F7E5DF',
          },
          '60%': {
            backgroundColor: '#E5DFF7',
          },
          '80%': {
            backgroundColor: '#E5F7DF',
          },
          '100%': {
            backgroundColor: '#B1B1FF',
          },
        },
      },
      animation: {
        'bounce2': 'bounce2 10s infinite',
        'credits': 'credits 40s linear forwards',
        'credits-with-color': 'credits-with-color 40s linear forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
