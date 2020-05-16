<template>
    <div id="wrap-news">
        <div class="main-header">
        <el-row>
      <el-col :span="9">
          <span>您当前所在位置：首页>留言板</span>
      </el-col>
      <el-col :span="8" >
      <el-input  placeholder="请输入内容" v-model="search_keyWord"></el-input>
      </el-col>
        
      <el-col :span="4">
      <el-button type="primary" @click="getMessageList">搜索</el-button>
      </el-col>
    </el-row>
    </div>
    <!--表格-->
   <el-table
    :data="tableData.item"
     v-loading="loadingData"
     @selection-change="handleSelectionChange"
     style="width: 100%">
      <el-table-column
      type="selection"
      style="align:center">
    </el-table-column>
    <el-table-column prop="content" label="内容"  ></el-table-column>
    <el-table-column prop="username" label="作者" > </el-table-column>
    <el-table-column prop="createTime" label="创建时间" > </el-table-column>
       <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="deleteItem(scope.row._id)">删除</el-button>
        <el-button type="text" size="small" @click="responseMessage(scope.row._id)">回复</el-button>
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
      :page-sizes="[5, 10, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
       </el-col>
    </el-row>
  
  <!--添加弹窗 :父组件往子组件传参  ：绑定属性-->
    <MessageResponse  :flag.sync="dialog_info_edit" :id="messageid"  @click="closeDialog"/>
  
    </div>
</template>
<script>
import { reactive, ref ,onMounted} from '@vue/composition-api';
import MessageResponse from '../dialog/MessageResponse.vue';
//引入全局方法
import { global } from "@/utils/global_V3.0";
import {GetMessageList,DeleteMessage} from '@/api/message.js'
export default {
    name:'line',
    components:{
    MessageResponse
    },
      setup(props,{root}){
        //全局方法定义
        const { str: aaa, confirm } = global();
        //数据的定义
        const deleteInfoId=ref('');
        const dialog_info_edit=ref(false);
        const messageid=ref('');
        const authorid=ref('');
        const author=ref('');
        const search_keyWord=ref('');
        const loadingData=ref(false);
        var total=ref(0);
        const page={
          pageIndex:1,
          pageSize:5
        }
        const tableData=reactive({
          item:[]
        })
      
           //函数定义
          
            //函数定义
         const handleSizeChange=(value)=>{
                  page.pageSize=value
                  console.log(value) 
          }
            const handleCurrentChange=(value)=>{
              page.pageIndex=value
              getMessageList()  
            }
          const closeDialog=()=>{
             dialog_info.value=false
            }
            //删除提醒
            const handleSelectionChange=(value)=>{
                let id=value.map(item=>item._id);
                deleteInfoId.value=id
                console.log(id,'handleSelectionChange')
            }
            //删除提醒
           const deleteItem = (_id) => {
            deleteInfoId.value = [_id];
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete
            });
        }
          //删除全部
            const deleteAll=()=>{
            console.log('----开始执行批量删除操作')
           console.log('888888888888888888',deleteInfoId.value.length,'22222222222');
                 if(!deleteInfoId.value ||deleteInfoId.value.length===0){
                root.$message({
                    message:'请选择要删除的数据',
                    type: 'error'
                })
                return false
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
            DeleteMessage({_id: deleteInfoId.value}).then(response => {
                deleteInfoId.value = '';
                getMessageList()
            })
        }
        //留言
      const getMessageList=()=>{
          // 单独处理数据
            //let requestData = formatData();
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          content:search_keyWord.value
        }
        console.log(requestData.station_name,'关键字')
        //加载状态
        loadingData.value=true
        GetMessageList(requestData).then(response=>{
          console.log('response',response)
          let data=response.data.messageList;

          for(let i in data){
            remove(data[i].content)
          }
           //更新列表
            tableData.item=data
            //数据总数
            total.value=response.data.total
           console.log(data,'留言列表',total,'total')
           //加载状态
        loadingData.value=false
        }).catch(err=>{
          loadingData.value = false;
        })
      }
      //回复留言
      const responseMessage=(_id,userid)=>{
           console.log('回复留言',_id)
         dialog_info_edit.value=true;
         authorid.value=tableData.item.userid;
         author.value=tableData.item.username;
         messageid.value=_id;
         console.log('author',author.value)
         console.log('userid',userid)
         console.log('tableData.item.userid',tableData.item.userid)
      }
        const remove=(str)=>{
        return str.replace(/<[^>]+>/g, "");
      }
      //生命周期
      onMounted(()=>{
        //获取列表
        getMessageList()
      })
            //数据的返回
            return {
           
              dialog_info_edit,
              tableData,
              handleSizeChange,
              handleCurrentChange,
              handleSelectionChange,
              closeDialog,
              deleteItem,
              deleteAll,
              search_keyWord,
              getMessageList,
              loadingData,
              total,
              responseMessage,
              messageid,
              authorid,
              author,
              remove
           
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