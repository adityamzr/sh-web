export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    apiBaseUrl: process.env.NUXT_API_BASE_URL || '',
    public: { siteUrl: 'https://sudutharamain.id' },
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
  hooks: {
    'pages:extend'(pages) {
      // Reuse each page implementation while keeping distinct locale route names.
      const localize = (page: typeof pages[number], root = true): typeof pages[number] => ({
        ...page,
        name: `${page.name}-en`,
        path: root ? (page.path === '/' ? '/en' : `/en${page.path}`) : page.path,
        children: page.children?.map(child => localize(child, false)),
      })
      pages.push(...pages.map(page => localize(page)))
    },
  },
})
