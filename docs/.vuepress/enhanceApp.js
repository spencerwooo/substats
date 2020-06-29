import Clipboard from 'v-clipboard'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Clipboard)

  // SSR compatible
  import('vue-toasted').then(Toasted => {
    Vue.use(Toasted.default, {
      position: 'top-center',
      duration: 3000,
      keepOnHover: true,
      theme: 'bubble',
    })
  })
}
