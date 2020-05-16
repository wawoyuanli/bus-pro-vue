<template>
<!--论坛-->
    <div class="culture">
        <MainHeader/>
        <div class="current-position">
        <h4>您当前所在位置：首页>公交动态>公交查询>公交文化>留言板>论坛 </h4>
        </div>
        <hr/>

    <!--数据列表-->
   <div class="list-wrapper">
    <ul>
      <li v-for="item in data.item" :key="item._id">
       <span @click="responseClick(item._id)">{{remove(item.content)}}</span>
       <div>创建时间：{{item.createTime}}</div>
      </li>
    </ul>
   </div>
  <!--分页-->
    <!-- <el-pagination
      background
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[3,4,5]"
      layout="total, sizes, prev, pager, next, jumper"
      class="pull-right">
    </el-pagination> -->
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
          pageSize:100
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
        //  console.log('response',response)
          var result=response.data.messsageList;
           //更新列表
            data.item=result
             console.log(data.item,'data')
            //数据总数
            total.value=response.data.total
          // console.log(data,'公告列表列表',total,'total')
           //加载状态
        }).catch(err=>{
          console.log(err)
        })
      }

      const responseClick=(_id)=>{
        console.log(_id)
        root.$router.push({
          path:'/front/responseDetail',
          query: {id:_id}
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
          total,
          responseClick
   }
  } 
}
</script>
<style lang="scss" scoped>
.culture .list-wrapper{
  margin:0 auto;
  text-align: center;
  ul{
 
    list-style: none;
    li{
       width: 100%;
       height: 90px;
       background-color: rgb(238, 228, 228);
       cursor: pointer;
       border-bottom: gray;
       margin-top: 20px;
      padding-top: 10px;
       :nth-child(2){
         font-size: 12px;
         color: gray;
         margin-top: 40px;
       }
    }
  }
}

</style>