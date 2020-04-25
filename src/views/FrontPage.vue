<template>
    <div class="front">
        
    <el-container>
        <!--导航-->
    <el-header id="header">
     <el-row class="nav">
     <el-col :span="3" v-for="item in navs" :key="item.id">{{item.txt}}</el-col>
       </el-row>
    </el-header>

        <el-main id="main">
        <div class="opacity">
        <el-menu                                                               
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        text-color="FFCC00"
        > 
        <el-menu-item  v-for="item in navs" :key="item.id">{{item.txt}}</el-menu-item>
       </el-menu>
        </div>
        </el-main>


    <el-footer id="footer"
    >Copyright © 2013-2020 公交查询  runoob.com All Rights Reserved. 备案号：闽ICP备15012807号-1
    </el-footer>
    
    
    </el-container>
        </div>
</template>

<script>
import { reactive, ref, isRef, toRefs, onMounted, watch } from '@vue/composition-api';
  export default {
      setup(){
          //定义数据 
           const navs = reactive([
        { txt: '首页'},
        { txt: '线路查询'},
        { txt: '站点查询'},
        { txt: '换乘查询'},
        { txt: '留言板'},
      ]);

          //定义函数 

          

          //返回 
          return{
              navs
          }

      }
 }
</script>
<style lang="scss" scoped>
.front{
    margin:0;
     background-image: url('../assets/back02.jpg');
     background-size: cover;
}
#header{
   text-align: center;
  
   cursor: pointer;
   
}
.nav{
 margin-bottom: 10px;
   margin-top: 20px;
   }  
#main{
    height: 100vh;
    text-align: center;
}
#main .opacity{
  width:100%;
  height:400px;
  margin-top: 50px;
  background-color:#ffffff;
  border:1px solid rgb(221, 214, 214);
  text-align: center;
  opacity:0.4;
  filter:alpha(opacity=50);
  border-radius: 2px;
  box-shadow: 10px 10px 20px 10px rgba($color: #000000, $alpha: 1.0);
    }
 
#footer{

   text-align: center;
}
  .el-main {
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

</style>