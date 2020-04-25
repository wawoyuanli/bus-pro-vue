<template>
    <div class="main-header">

        <div class="header">
        <el-row>
        <el-col :span="6"><div class="grid-content bg-purple">欢迎{{username}}进入</div></el-col>
        <el-col :span="8"><div class="grid-content bg-purple-light"><img src="../assets/images/font.png" alt="font"/></div></el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple">
            您当前所在的位置 <img src="../assets/images/position.png" alt="position logo" width="50px" height="50px"/>{{position}}
            </div>
            </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple">
                退出<img src="../assets/images/exit.png" alt="exit" width="30px" height="30px" @click="exit"/>
            </div>
        </el-col>
        </el-row>
        </div>

        <!--头部导航-->
        <div class="nav">

            <el-menu  class="el-menu-demo" mode="horizontal">
            
            <el-menu-item index="1"><a href="/front">首页 </a></el-menu-item>
            <el-menu-item index="2"><a href="/front/new">新闻公告</a></el-menu-item>
            <el-menu-item index="3"><a href="/front/busSearch">公交查询</a></el-menu-item>

            <el-submenu index="4">
            <template slot="title"><a href="/front/busCulture">公交文化</a></template>
            <el-menu-item index="4-1"><a href="/front/workShow">员工风采</a></el-menu-item>
            </el-submenu>

            <el-menu-item index="5"><a href="/front/message">留言板</a></el-menu-item>
                    <!--
                        target:
                        _blank:在新窗口中打开被链接文档。
                        _self: 	默认。在相同的框架中打开被链接文档。
                        _parent:在父框架集中打开被链接文档。
                        _top: 在整个窗口中打开被链接文档。
                        framename: 在指定的框架中打开被链接文档。
                        -->
            </el-menu>
        </div>
    </div>
</template>
<script>
import { reactive, ref, isRef, computed, onMounted, watch } from '@vue/composition-api';
export default {
    name:'Header',
    setup(propes,{root}){
   const username = computed(() =>  root.$store.state.app.username);   
   const exit=()=>{
       root.$store.dispatch('app/exit').then(() => {
                root.$router.push({
                    name: 'Login'
                })
            })
     }
        return {
            username,
            position:'杭州',
            exit
        }

    }
     
}
</script>
<style >

.header{
    margin-top: 40px;
    color: rgb(43, 3, 33);
    font-family: '行书';
    font-size: 18px;

}
 .el-menu{
    background-color:#CC99CC;
    border-radius: 4px;
}
.el-menu-item {
    font-size: 18px;
    font-family: 'Times New Roman';
    border-bottom: rgb(56, 58, 58);
}
.el-menu--horizontal>.el-menu-item {
    color: black;
    border-bottom: 1px solid rgb(71, 72, 73);
}
.el-submenu__title{
    font-size: 18px;
 
}
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{
        border-bottom: 1px solid rgb(71, 72, 73);
        color:black;
}
.grid-content bg-purple img{
    cursor: pointer;
}

</style>