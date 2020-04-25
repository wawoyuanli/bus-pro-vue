<template>
    <div id="wrap-news">
        <div class="main-header">
        <el-row>
      <el-col :span="9">
          <span>您当前所在位置：首页>新闻公告</span>
      </el-col>
      <el-col :span="8" >
      <el-input  placeholder="请输入内容"  v-model="search_keyWork"></el-input>
      </el-col>
        
      <el-col :span="4">
      <el-button type="primary" @click="getNewsList">搜索</el-button>
      </el-col>
       
      <el-col :span="3">
      <el-button type="primary" @click="dialog_info=true" >添加</el-button>
      </el-col>
    </el-row>
    </div>
    <!--表格-->
   <el-table
    :data="tableData.item"
    v-loading="loadingData"
     @selection-change="handleSelectionChange"
     style="width: 100%"
     fixed
     >
       <el-table-column
      type="selection"
      style="align:center">
    </el-table-column>
    <el-table-column prop="title" label="标题" width="200px"></el-table-column>
    <el-table-column prop="content" label="内容"  width="800px"></el-table-column>
    <el-table-column prop="username" label="作者" width="100px" >张梦圆 </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="100px"> </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="100px">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="deleteItem(scope.row._id)">删除</el-button>
        <el-button type="text" size="small" @click="editItem(scope.row._id)">编辑</el-button>
      </template>
    </el-table-column>
    
   </el-table> 
   
    <!--底部分页-->
    <el-row class="el-row">
       <el-col :span="12">
         <el-button size="medium" @click="deleteAll">批量删除</el-button>
       </el-col>
         <el-col :span="12">
          <el-pagination
      class="pull-right"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5,10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
       </el-col>
    </el-row>
  
  <!--添加弹窗 :父组件往子组件传参  ：绑定属性-->
    <NewsDialog  :flag.sync="dialog_info" @click="closeDialog"/>
     <NewsEditDialog  :flag.sync="dialog_info_edit" :id="newsid" @getNewsList="getNewsList"/>
    </div>
</template>
<script>
//接口引入
import {GetNewsList,DeleteNews} from '@/api/news.js'
import { reactive, ref ,onMounted} from '@vue/composition-api';
import NewsDialog from '../dialog/NewsDialog.vue';
import NewsEditDialog from '../dialog/NewsEditDialog.vue';
//引入全局方法
import { global } from "@/utils/global_V3.0";
export default {
    name:'line',
    components:{
    NewsDialog,
    NewsEditDialog
    },
      setup(props,{root}){
        //全局方法定义
        const { str: aaa, confirm } = global();
        //数据的定义
        const deleteInfoId=ref('');
        const dialog_info=ref(false);
        const loadingData=ref(false);
        const dialog_info_edit=ref(false);
        const newsid=ref('');
        var total=ref(0);
        
        const search_keyWork = ref('');//搜索关键字绑定
       //查询显示数据位置
        const tableData=reactive({
           item:[]
          
          });
          //页码
          const page=reactive({
            pageIndex:1,
            pageSize:5
          });
          const handleSizeChange=(value)=>{
                  page.pageSize=value
                  console.log(value) 
          }
            const handleCurrentChange=(value)=>{
              page.pageIndex=value
              getNewsList()  
            }
                 const handleSelectionChange=(value)=>{
                let id=value.map(item=>item._id);
                deleteInfoId.value=id
                console.log(id,'handleSelectionChange')
            }
          const closeDialog=()=>{
             dialog_info.value=false
            }
              //删除提醒
           const deleteItem = (_id) => {
            deleteInfoId.value = [_id];
            console.log('_id99999999999999',_id)
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete
            });
        }
          //删除全部
            const deleteAll=()=>{
            console.log('----开始执行批量删除操作')
                 if(!deleteInfoId.value ||deleteInfoId.value.length===0){
                root.$message({
                    message:'请选择要删除的数据',
                    type: 'error'
                })
               return false;
              }else{
               confirm({
               content:"确认删除当前信息，确认后将无法恢复",
               tip:"警告",
               fn:confirmDelete,
              })
              }
         }
 
         const confirmDelete = (value) => {
           console.log('----开始执行删除方法 --------')
            DeleteNews({_id: deleteInfoId.value}).then(response => {
              let data=response.data;
              root.$message({
                message:data.message,
                type:data.type
              })
                deleteInfoId.value = '';
                getNewsList()
            })
        }
        //编辑站点信息
       const editItem=(_id)=>{
          console.log('编辑站点信息',_id)
         dialog_info_edit.value=true;
         newsid.value=_id;

       }
         //公告列表
       const getNewsList=()=>{
          // 单独处理数据
            //let requestData = formatData();
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          title:search_keyWork.value,
          full:true,
          isEdit:false
      
        }
        console.log(requestData.title,'关键字')
        //加载状态
        loadingData.value=true
        GetNewsList(requestData).then(response=>{
         // console.log('response',response)
          let data=response.data.newsList;
           //更新列表
            tableData.item=data
            //数据总数
            total.value=response.data.total
        //   console.log(data,'公告列表列表',total,'total')
           //加载状态
        loadingData.value=false
        }).catch(err=>{
          loadingData.value = false;
        })
      }
   
      //生命周期
      onMounted(()=>{
        //获取列表
        getNewsList()
      })
            //数据的返回
            return {
              dialog_info_edit,
              newsid,
              dialog_info,
              tableData,
              handleSizeChange,
              handleCurrentChange,
              handleSelectionChange,
              closeDialog,
              deleteItem,
              deleteAll,
              total,
              loadingData,
              page,
              search_keyWork,
              getNewsList,
              editItem
           
            }
      }
}

  
</script>
 
<style lang="scss" scoped>
@import "../../styles/config.scss";
.el-table .warning-row {
background: oldlace;
}

.el-table .success-row {
background: #f0f9eb;
}
</style>