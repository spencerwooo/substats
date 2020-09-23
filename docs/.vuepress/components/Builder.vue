<template>
  <Layout>
    <template slot="page-top">
      <div class="builder-container">
        <h1>🍍 Badge Builder</h1>
        <p>
          Use this tool to customize, build and copy a <b>realtime SVG subscriber count badge</b> powered by
          <a href="https://shields.io/">Shields.io</a> and <b>Substats!</b> 📇 Paste the generated badge directly inside
          markdown files like your GitHub README to use.
        </p>

        <dropdown-menu
          v-model="toggle"
          transition="translate-fade-down"
          :interactive="true"
          style="display: inline-block;"
        >
          <div class="key-tip">Source</div>
          <div class="input-container">
            <button :class="toggle ? 'dropdown-toggle show' : 'dropdown-toggle'">{{ selectedItem.text }}</button>
            <div class="dropdown-icon" />
          </div>
          <div slot="dropdown">
            <div class="dropdown-item" @click="select(item)" v-for="item in items" :key="item.id">{{ item.text }}</div>
          </div>
        </dropdown-menu>

        <div class="key-tip">Query Key</div>
        <input class="key-input" type="text" v-model="queryKey" @input="updateBadge" />

        <div class="key-tip">Badge Preview</div>
        <a :href="badge.link"><img :src="badge.image" alt="Shields.io badge"/></a>

        <div class="key-tip">API URL</div>
        <div class="input-container">
          <input class="key-input" type="text" readonly="readonly" v-model="badge.api" />
          <button class="copy-icon" @click="copyToClipboard(badge.api)" />
        </div>

        <div class="key-tip">Image URL</div>
        <div class="input-container">
          <input class="key-input" type="text" readonly="readonly" v-model="badge.image" />
          <button class="copy-icon" @click="copyToClipboard(badge.image)" />
        </div>

        <div class="key-tip">Markdown</div>
        <div class="input-container">
          <input class="key-input" type="text" readonly="readonly" v-model="badge.markdown" />
          <button class="copy-icon" @click="copyToClipboard(badge.markdown)" />
        </div>

        <p class="footer">
          Special thanks to <a href="https://github.com/kidonng">@kidonng</a> who contributed in a
          <a href="https://swiss.xuann.wang/substats-badge-creator">prototype here</a>.
        </p>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import DropdownMenu from '@innologica/vue-dropdown-menu'
import { sources, badge } from './builderUtil'

export default {
  name: 'Builder',
  components: { Layout, DropdownMenu },
  data() {
    return {
      items: [],
      selectedItem: { text: '' },
      queryKey: 'spencerwooo',
      badge: {},
      toggle: false,
    }
  },
  mounted() {
    this.items = Object.entries(sources).map(([value, { category, title }]) => ({
      text: `${category} - ${title}`,
      value,
    }))
    this.selectedItem = this.items[13]
    this.badge = badge(this.selectedItem.value, this.queryKey)
  },
  methods: {
    select: function(item) {
      this.selectedItem = {
        text: item.text,
        value: item.value,
      }
      this.badge = badge(item.value, this.queryKey)
      this.toggle = !this.toggle
    },
    updateBadge: function() {
      this.badge = badge(this.selectedItem.value, this.queryKey)
    },

    // copy badge references to clipboard
    copyToClipboard: function(value) {
      this.$clipboard(value)
      this.$toasted.show('🎉 Copied to clipboard!')
    },
  },
}
</script>

<style lang="stylus">
// VueToasted Styles
.toasted-container .toasted
  top 0px !important

.toasted.bubble
  background-color #faad3f !important
  font-weight 500 !important

// Main style
.builder-container
  max-width 600px
  margin 0 auto
  padding 2rem 2.5rem

  > *:first-child
    margin-top 3.6rem

.key-tip
  font-weight bold
  font-size 14px
  line-height 1.4rem
  text-transform uppercase
  opacity 0.5
  padding 1.3rem 0 0.4rem 0

.dropdown
  width 100%

.input-container
  display flex
  align-items center

.dropdown-toggle, .key-input
  display inline-block
  border none
  font-size 0.9rem
  line-height 2rem
  outline none
  border-bottom 1px solid #cfd4db
  transition all 0.2s ease

.dropdown-icon
  display inline-block
  margin-left .255rem
  vertical-align .255rem
  content ""
  border-top .3rem solid
  border-right .3rem solid transparent
  border-bottom 0
  border-left .3rem solid transparent

.copy-icon
  background-color transparent
  background-image url(copy.svg)
  background-size 100% 100%
  padding 0.6rem 0.6rem
  margin 0 0 0 0.4rem
  border 0
  cursor pointer
  transition all 0.2s ease

  &:hover
    opacity 0.6

  &:focus
    outline: none

.dropdown-toggle
  position relative
  cursor pointer
  flex 1
  text-align left
  background none
  padding 0 0

  &.show
    border-color #faad3f

.dropdown-menu
  position absolute
  font-size 1rem
  z-index 1000
  background-color #ffffff
  border 1px solid rgba(0, 0, 0, 0.15)
  border-radius 0.25rem
  max-height 400px
  overflow auto

.dropdown-item
  display block
  padding .65rem 1.25rem
  font-weight 400
  text-align inherit
  border none
  cursor pointer
  transition all 0.2s ease

  &:hover
    background-color #f2f2f2

.key-input
  cursor text
  width 100%

  &:focus
    cursor auto
    border-color #faad3f

.footer
  margin-top 2.4rem
  font-size 0.9rem
  opacity 0.7

.translate-fade-down-enter-active, .translate-fade-down-leave-active
  transition all 250ms
  transition-timing-function cubic-bezier(.53,2,.36,.85)

.translate-fade-down-enter, .translate-fade-down-leave-active
  opacity 0

.translate-fade-down-enter, .translate-fade-down-leave-to
  position absolute

.translate-fade-down-enter
  transform translateY(-10px)

.translate-fade-down-leave-active
  transform translateY(10px)
</style>
