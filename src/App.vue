<template>
  <div id="app">
    <router-view></router-view>
    <footer-guide v-show="$route.meta.showFooter"/>
  </div>
</template>

<script>
    import FooterGuide from './components/FooterGuide/FooterGuide.vue'
    import {mapActions} from 'vuex'

    export default {
      components: {
        FooterGuide
      },
      mounted () {
        //this.$store.dispatch('getAddress')
        this.getAddress()
      },
      methods: {
        ...mapActions(['getAddress'])
      }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">>
  .app
    width 100%
    height 100%
    background #f5f5f5
</style>
