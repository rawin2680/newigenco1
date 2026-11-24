// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxtjs/tailwindcss'
  ],

  runtimeConfig: {
    public: {
      strapiUrl: process.env.NUXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
      siteName: 'VERDANT // LABS',
      siteDescription: 'Spatial Enterprise & AI Architecture'
    }
  },

  css: [
    '~/assets/css/main.css'
  ],

  app: {
    head: {
      title: 'VERDANT // LABS — Spatial Enterprise & AI Architecture',
      htmlAttrs: {
        lang: 'th',
        class: 'scroll-smooth'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'สถาปัตยกรรมดิจิทัลยุคใหม่สำหรับองค์กร เว็บไซต์ 3D Spatial และโครงสร้าง AI อัจฉริยะ' },
        { name: 'theme-color', content: '#00C864' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.cdnfonts.com/css/sf-pro-display'
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        }
      ]
    }
  },

  typescript: {
    strict: true,
    typeCheck: false
  },

  devServer: {
    host: '0.0.0.0',
    port: 3000
  },

  vite: {
    server: {
      watch: {
        usePolling: true,
      },
      hmr: {
        clientPort: Number(process.env.FRONTEND_PORT) || 3001,
      },
    },
  }
})
