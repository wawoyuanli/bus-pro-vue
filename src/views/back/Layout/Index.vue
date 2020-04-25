<template>
    <div id="layout" :class="[menuStatus ? 'close' : 'open']">
  <LayoutHeader/>
  <LayoutMain/>
  <LayoutNav/>
    </div>
</template>
<script>
import LayoutHeader from '../Header.vue'
import LayoutMain from '../Main.vue'
import LayoutNav from '../Nav.vue'

import { reactive, ref, computed,watch } from '@vue/composition-api';
export default {
    name:'Index',
    components:{
        LayoutHeader,
        LayoutMain,
        LayoutNav
    },
    setup(props,{root}){
        const menuStatus=computed(()=>{
          return root.$store.state.app.isCollapse
        })
        return {
            menuStatus
        }

    }
    
}
</script>
<style scoped>
#layout{
    background-color: #f7f7f7;
}
</style>