<template>
    <div class="workShow">
        <MainHeader/>
        <div class="img-demo">
            <img src="../../assets/images/show.jpg" alt="img"/>
        </div>
         <div class="current-position">
            <h4>您当前所在位置：首页>公交动态>公交查询>公交文化>员工风采 </h4>
            <hr/>
        </div>
  <el-row>
    <el-col :span="8" v-for="workItem in workList.item" :key="workItem.id">
      <div class="grid-content bg-purple">
          <img src="../../assets/people.jpg" width="200px" height="200px" />
          <div><span style="color:blue">作者:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{workItem.name}}</div>
          <div><span style="color:blue">职位:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{workItem.position}}</div>
          <div><span style="color:blue">部门:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{workItem.department}}</div>
          <div><span style="color:blue">创建时间:</span>&nbsp;&nbsp;&nbsp;&nbsp;{{workItem.createTime}}</div>
          <div><span style="color:blue">简介:</span>&nbsp;&nbsp;&nbsp;&nbsp;<a href="/front/workDetail">{{remove(workItem.content)}}</a></div>
        </div>
        </el-col>
  </el-row>
<!--分页-->

    <el-pagination
      background
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[3,4,5]"
      layout="total, sizes, prev, pager, next, jumper"
      class="page">
    </el-pagination>
<!--底部-->
<MainFooter/>
    </div>
</template>
<script>
import {GetWorkList} from '@/api/work.js'
import { reactive, ref, watch,onMounted } from '@vue/composition-api';
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
export default {
    name:'work',
    components:{
     MainHeader,
     MainFooter
    },
    setup(props,{root}){
    const total=ref(0);
       const page=reactive({
            pageIndex:1,
            pageSize:3
          });
      const workList=reactive({
         item:[]
      })

    const handleSizeChange=(value)=>{
                  page.pageSize=value
                  console.log(value) 
          }
    const handleCurrentChange=(value)=>{
    page.pageIndex=value
    getWorkList()  
  }
     const getWorkList=()=>{
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          title:'',
          full:true,
          isEdit:false
        }

        //加载状态
       // loadingData.value=true
        GetWorkList(requestData).then(response=>{
         console.log('response',response)
          let data=response.data.workList;
           //更新列表
            workList.item=data
             console.log(  workList.item,'workList')
            //数据总数
            total.value=response.data.total
          // console.log(data,'公告列表列表',total,'total')
           //加载状态
        //loadingData.value=false
        }).catch(err=>{
        //  loadingData.value = false;
        })
      }
      const remove=(str)=>{
        return str.replace(/<[^>]+>/g, "");
      }
        //生命周期
      onMounted(()=>{
        //获取列表
        getWorkList()
      })

       return {
         getWorkList,
         workList,
         page,
         total,
         handleSizeChange,
         handleCurrentChange,
         remove
       }
    }    
}
</script>
<style lang="scss" scoped>
@import '../../styles/config.scss';
.img-demo img{
width: 100%;
border-radius: 2px; 
}
.person-info {
    text-align: center;
}
.content{
    margin-top: 20px;

}
  .grid-content{
   box-shadow: 0px 0px 20px rgb(66, 66, 62);
   width: 420px;
   height: 400px;
   background:rgb(250, 251, 252);
   margin-top: 20px;
   font-family: 'Times New Roman",Times,serif';
   font-size: 18px;
   padding: 10px 10px;
 }
 .page{
     margin-top: 100px;
     margin-left: 40%;

 }
</style>