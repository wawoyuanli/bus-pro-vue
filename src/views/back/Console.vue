<template>
    <div class="console">   
    欢迎{{username}}进入公交管理后台！！
      
 
  
    </div>
</template>
<script>
import { reactive, ref } from '@vue/composition-api';

//父组件给子组件传值，引入子组件

export default {
    name:'Console',
    setup(props,{root}){
    const username=ref(root.$store.state.app.username);
    return {
       username
     }
    }
    
}
</script>
<style scoped>

</style>