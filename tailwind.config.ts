import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        sht: {
          olive: '#3A4428',
          'olive-dark': '#2D351F',
          gold: '#D3C168',
          sage: '#7F8968',
          'off-white': '#F6F4ED',
          stone: '#E4E3DE',
          charcoal: '#242822',
        },
      },
      fontFamily: {
        heading: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: { container: '72rem' },
    },
  },
}
