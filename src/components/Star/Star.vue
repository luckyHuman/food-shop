<template>
    <div class="star" :class="'star-' + size">
      <span class="star-item" v-for="(sc, index) in StarClasses" :class="sc" :key="index"></span>
    </div>
</template>

<script>
    const STAR_ON = 'on'
    const STAR_HALF = 'half'
    const STAR_OFF = 'off'

    export default {
        props: {
          score: Number,
          size: Number
        },
        computed: {
          StarClasses () {
            const {score} = this
            const scs = []
            //添加'on'
            const scoreInteger = Math.floor(score)
            for(let i = 0; i < scoreInteger; i++){
              scs.push(STAR_ON)
            }
            //添加'half'
            if(score*10 - scoreInteger*10 >= 5){
              scs.push(STAR_HALF)
            }
            //添加'off'
            while(scs.length <5){
              scs.push(STAR_OFF)
            }
            return scs
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

</style>
