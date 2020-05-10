<template>
<!--论坛-->
    <div class="culture">
        <MainHeader/>
        <div class="current-position">
        <h4>您当前所在位置：首页>公交动态>公交查询>公交文化>留言板>论坛 </h4>
        </div>
        <hr/>
<el-row>
    <!-- <el-col :span="8" v-for="newsItem in newsList.item" :key="newsItem.id">
      <div class="grid-content bg-purple">
        <div>标题:&nbsp;&nbsp;&nbsp;&nbsp;{{newsItem.title}}</div>
        <div>发布时间：&nbsp;&nbsp;&nbsp;&nbsp;{{newsItem.createTime}}</div>
        <div>作者:&nbsp;&nbsp;&nbsp;&nbsp;胡元丽</div>
        <div>内容:&nbsp;&nbsp;&nbsp;&nbsp;{{newsItem.content}}</div>
        </div>
        </el-col> -->
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
        <MainFooter/>
    </div>
</template>
<script>
import {GetforumData} from '@/api/message.js'
import { reactive, ref, watch,onMounted,computed } from '@vue/composition-api';
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
export default {
    name:'Culture',
    components:{
     MainHeader,
     MainFooter
    },
    setup(props,{root}){
        const data=reactive({
            item:[]
        })
        const total=ref(0)
    const page=reactive({
        pageIndex:1,
        pageSize:3
    });
    const handleSizeChange=(value)=>{
        page.pageSize=value
        console.log(value) 
    }
    const handleCurrentChange=(value)=>{
        page.pageIndex=value
        getNewsList()  
    }
        const getForumList=()=>{

         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          title:'',
          full:true,
          isEdit:false
        }
        GetforumData(requestData).then(response=>{
         console.log('response',response)
          let data=response.data.messageList;
           //更新列表
            data.item=data
             console.log(  data.item,'data')
            //数据总数
            total.value=response.data.total
          // console.log(data,'公告列表列表',total,'total')
           //加载状态
        }).catch(err=>{
          console.log(err)
        })
      }
      const remove=(str)=>{
        return str.replace(/<[^>]+>/g, "");
      }
      onMounted(()=>{
          getForumList()
      })
      return{
          getForumList,
          remove,
          data,
          page,
          handleSizeChange,
          handleCurrentChange,
          total
   }
  } 
}
</script>
<style scoped>

</style>