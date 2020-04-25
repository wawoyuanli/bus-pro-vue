<template>
    <div class="news">
      <!--头部-->
        <MainHeader/>
        <!--位置索引-->
         <div class="current-position">
            <h4>您当前所在位置：首页>公交动态</h4>
            <hr/>
        </div>
  <el-row>
    <el-col :span="8" v-for="newsItem in newsList.item" :key="newsItem.id">
      <div class="grid-content bg-purple">
        <div>标题:&nbsp;&nbsp;&nbsp;&nbsp;{{newsItem.title}}</div>
        <div>发布时间：&nbsp;&nbsp;&nbsp;&nbsp;{{newsItem.createTime}}</div>
        <div>作者:&nbsp;&nbsp;&nbsp;&nbsp;胡元丽</div>
        <div>内容:&nbsp;&nbsp;&nbsp;&nbsp;{{newsItem.content}}</div>
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
      class="pull-right">
    </el-pagination>
<!--底部-->
 <MainFooter/>
    </div>
</template>
<script>
import {GetNewsList} from '@/api/news.js'
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
import { reactive, ref, watch,onMounted } from '@vue/composition-api';
export default {
    name:'New',
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
      const newsList=reactive({
         item:[]
      })
    const handleSizeChange=(value)=>{
                  page.pageSize=value
                  console.log(value) 
          }
    const handleCurrentChange=(value)=>{
    page.pageIndex=value
    getNewsList()  
  }
     const getNewsList=()=>{
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          title:'',
          full:true,
          isEdit:false
        }

        //加载状态
       // loadingData.value=true
        GetNewsList(requestData).then(response=>{
         console.log('response',response)
          let data=response.data.newsList;
           //更新列表
            newsList.item=data
             console.log(  newsList.item,'newsList')
            //数据总数
            total.value=response.data.total
            console.log(total.value,'4')
          // console.log(data,'公告列表列表',total,'total')
           //加载状态
        //loadingData.value=false
        }).catch(err=>{
        //  loadingData.value = false;
        })
      }
        //生命周期
      onMounted(()=>{
        //获取列表
        getNewsList()
      })

       return {
         getNewsList,
         newsList,
         page,
         total,
         handleSizeChange,
         handleCurrentChange

       }
    }
    
}

</script>
<style scoped>
 .grid-content{
   box-shadow: 0px 0px 20px rgb(66, 66, 62);
   width: 420px;
   height: 400px;
   background:rgb(250, 251, 252);
   margin-top: 20px;
   font-family: 'Times New Roman",Times,serif';
   font-size: 20px;
   padding: 10px 10px;
 }
.content{
  width: 100%;
  height: 100%;
}
.pull-right{
  float: right;
  margin-top: 30px;
  margin-right: 50px;
}
</style>