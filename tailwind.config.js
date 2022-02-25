module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-0': '#ffffff',
        'primary-1': '#D9D9D9',
        'primary-2': '#A1A5A6',
        'primary-3': '#353D40',
        'accent-1': '#003F63',
        'accent-2': '#F2B138',
      },
      fontFamily: {
        sans: ['Source Code Pro', 'Tahoma', 'sans-serif'],
        heading: ['Montserrat Alternates', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
