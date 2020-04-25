<template>
<svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
</svg>
    
</template>
<script>
import { ref, computed, onMounted } from '@vue/composition-api';
export default {
    name: "svg-icon",
 
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    }
  },
  computed: {
    iconName () {
      return `#icon-${this.iconClass}`
    },
    svgClass () {
      if (this.className) {
        return 'svg-icon ' + this.className
      } else {
        return 'svg-icon'
      }
    }
  }
    // setup(props){
      

    //     // 计算属性，得出最终结果，并返回
    //     const iconName = computed(() => `#icon-${props.iconClass}`)
    //     const svgClass = computed(() => {
    //         if(props.className) {
    //             return `svg-icon ${props.className}`
    //         }else{
    //             return `svg-icon`
    //         }
    //     })

    //     return {
    //         msg,
    //         iconName,
    //         svgClass
    //     }
    // }
}
</script>
<style lang="scss" scoped>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>