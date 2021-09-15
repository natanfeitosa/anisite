const isDev = process.env.NODE_ENV == 'development';

const lang = 'pt'

module.exports = {
  dev: isDev,

  srcDir: 'client/',
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang
    },
    title: 'anisite',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  
  loading: {
    color: 'orange',
    height: '3.6px',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    './assets/scss/index.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      regular: true,
      brands: true,
    },
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    'vue-sweetalert2/nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: 'https://all-animes.herokuapp.com/v1',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang
    },
    icon: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: !isDev
  }
}
