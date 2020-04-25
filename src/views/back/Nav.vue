<template>
  <div id="nav-wrap">

  <!-- <h1 class="logo"><img src="../../assets/back01.jpg" alt=""></h1> -->
    <el-menu
    default-active="2"
    class="el-menu-vertical-demo" 
    :isCollapse="isCollapse"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
        <template v-for="(item, index) in routers">
          <el-submenu v-if="!item.hidden" :key="item.id" :index="index + ''">

            <!-- 一级菜单 -->
            <template slot="title"> 
           <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon" />
                <span slot="title"> {{ item.meta.name }}</span>
            </template> 
          
            <!-- 子级菜单 -->
            <template v-for="subItem in item.children">
              <el-menu-item v-if="!subItem.hidden" :key="subItem.id" :index="subItem.path" >
                {{ subItem.meta.name }}
              </el-menu-item>
            </template>
            
          </el-submenu>
        </template>
      </el-menu>
   <!-- <svg-icon iconClass="culture" />  -->
  </div>
</template>
<script>
import { reactive, ref, isRef, toRefs, onMounted, watch ,computed} from '@vue/composition-api';
  export default {
    name:'Nav',
    //3.0 this 用root表示
      setup(props, { root }){
      /**
      * data 数据
      * 
      */
     // const isCollapse=ref(false);

      const routers = reactive(root.$router.options.routes);
      console.log(routers[8].meta.icon)

      /**
      * computed 监听
      */
    const isCollapse = computed(() => root.$store.state.app.isCollapse);
      return {
        isCollapse,
        routers
      }
    }
    
  }
</script>
<style lang="scss" scoped>
  @import "../../styles/config.scss";
  #nav-wrap{
  position: fixed;
  top:0;
  left:0;
  width:$navMenu;
  height:100vh;
  background-color:#0f0d0d;
  @include webkit(transition,all .3s ease 0s);
}
svg{
  font-size: 20px;
  margin-right: 10px;
}
.open{
  #nav-wrap{
    width:$navMenu;
  }
}
.close{
  #nav-wrap{
    width:64px;
  }
}
</style>