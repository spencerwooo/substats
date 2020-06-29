import Toasted from 'vue-toasted'
import Clipboard from 'v-clipboard'

export default ({ Vue, options, router, siteData }) => {
  Vue.use(Toasted, {
    position: 'top-center',
    duration: 3000,
    keepOnHover: true,
    theme: 'bubble',
  })
  Vue.use(Clipboard)
}
