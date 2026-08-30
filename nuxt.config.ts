export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      mediaApiBaseUrl: process.env.NUXT_PUBLIC_MEDIA_API_BASE_URL || '',
    },
  },
  tailwindcss: { cssPath: '~/assets/css/main.css' },
  app: {
    head: {
      htmlAttrs: { lang: 'id' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,700;1,700&family=Inter:wght@400;500;600&family=Poppins:wght@400;500;600;700&display=swap' },
      ],
    },
  },
  typescript: { strict: true, typeCheck: true },
})
