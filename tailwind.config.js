/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mds: {
          dark: '#142c1b',        // Deepest forest green
          primary: '#1c3e27',     // Deep natural green
          accent: '#2f7d49',      // Fresh green
          light: '#eef6f0',       // Tinted soft green
          cream: '#fbf9f4',       // Warm cream background
          sand: '#f3efe6',        // Soft off-white card bg
          border: '#e4ddd0',      // Natural earthy border
          charcoal: '#1c221e',    // Deep readable charcoal text
          muted: '#526056',       // Muted earthy text
          amber: '#d97706',       // Warm fruit amber accent
        }
      },
      fontFamily: {
        heading: ['Poppins', 'Manrope', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(28, 62, 39, 0.06), 0 2px 6px -1px rgba(28, 62, 39, 0.04)',
        'card': '0 10px 30px -4px rgba(28, 62, 39, 0.08), 0 4px 12px -2px rgba(28, 62, 39, 0.04)',
        'elevated': '0 20px 40px -6px rgba(28, 62, 39, 0.12)',
      }
    },
  },
  plugins: [],
}
