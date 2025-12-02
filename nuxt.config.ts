// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts'
  ],

  googleFonts: {
    families: {
      'Noto+Sans+SC': [300, 400, 500, 600, 700],
      'Orbitron': [400, 500, 600, 700, 800, 900],
    },
    display: 'swap',
  },

  app: {
    head: {
      title: '智启教育 - AI赋能教育新时代',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '智启教育是领先的AI教育平台，提供人工智能、机器人编程、STEAM教育等创新课程，培养面向未来的科技人才。' },
        { name: 'keywords', content: 'AI教育,人工智能,机器人编程,STEAM教育,在线教育,编程培训' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    },
    pageTransition: { name: 'page', mode: 'out-in' }
  },

  css: ['~/assets/css/main.css'],

  devServer: {
    host: '127.0.0.1',
    port: 3000
  },

  // 运行时配置
  runtimeConfig: {
    // 仅服务端可用
    apiSecret: '',
    // 客户端也可用
    public: {
      apiBase: '', // 留空则使用相对路径，生产环境可设置为 'https://api.example.com'
      wsUrl: '', // WebSocket 服务器地址，生产环境设置为 'wss://your-ws-server.railway.app'
    }
  },

  compatibilityDate: '2024-11-26'
})

