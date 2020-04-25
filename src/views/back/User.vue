<template>
    <div id="wrap-news">
        <div class="main-header">
        <el-row>
      <el-col :span="9">
          <span>您当前所在位置：首页>用户管理</span>
      </el-col>
      <el-col :span="8" >
      <el-input  placeholder="请输入内容" v-model="search_keyWord"></el-input>
      </el-col>
        
      <el-col :span="4">
      <el-button type="primary" @click="getUserList">搜索</el-button>
      </el-col>
       
      <el-col :span="3">
      <el-button type="primary" @click="dialog_info=true">添加</el-button>
      </el-col>
    </el-row>
    </div>
    <!--表格-->
   <el-table
    :data="tableData.item"
    @selection-change="handleSelectionChange"
     style="width: 100%">
       <el-table-column
      type="selection"
      style="align:center">
    </el-table-column>
    <el-table-column prop="username" label="用户名" ></el-table-column>
    <el-table-column prop="password" label="密码" ></el-table-column>
      <el-table-column
      fixed="right"
      label="操作">
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
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
       </el-col>
    </el-row>
  
  <!--添加弹窗 :父组件往子组件传参  ：绑定属性-->
    <UserDialog  :flag.sync="dialog_info" @click="closeDialog"/>
      <UserEditDialog  :flag.sync="dialog_info_edit" :id="userid" @getUserList="getUserList"/>
    </div>
</template>
<script>
import {GetUserList,DeleteUser,EditUser} from '@/api/user'
import { reactive, ref,onMounted } from '@vue/composition-api';
import UserDialog from '../dialog/UserDialog.vue';
import UserEditDialog from '../dialog/UserEditDialog.vue'

//引入全局方法
import { global } from "@/utils/global_V3.0";
export default {
    name:'line',
    components:{
    UserDialog,
    UserEditDialog
    },
      setup(props,{root}){
         
        //全局方法定义
        const { str: aaa, confirm } = global();
        //数据的定义
        const deleteInfoId=ref('');
        const userid=ref('');
        const dialog_info_edit=ref(false);
        const dialog_info=ref(false);
        const search_keyWord=ref('');
        var total=ref(0);
         const tableData=reactive({
          item:[]
        })
         //页码
          const page=reactive({
            pageIndex:1,
            pageSize:10
          })
         
          //加载状态
         const loadingData=ref(false)
           //函数定义
         const handleSizeChange=(value)=>{
                  page.pageSize=value
                  console.log(value) 
          }
            const handleCurrentChange=(value)=>{
              page.pageIndex=value
              getUserList()  
            }
          const closeDialog=()=>{
             dialog_info.value=false
            }
           const handleSelectionChange=(value)=>{
                let id=value.map(item=>item._id);
                deleteInfoId.value=id
                console.log(id,'handleSelectionChange')
            }
             //删除提醒
           const deleteItem = (_id) => {
            deleteInfoId.value = [_id];
            console.log(_id,'_id user')
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
            DeleteUser({_id: deleteInfoId.value}).then(response => {
              console.log(response,'删除方法 user')
                deleteInfoId.value = '';
                getUserList()
            })
        }
        //编辑站点信息
       const editItem=(_id)=>{
          console.log('编辑站点信息',_id)
         dialog_info_edit.value=true;
         userid.value=_id;

       }
         //用户列表
      const getUserList=()=>{
          // 单独处理数据
            //let requestData = formatData();
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          username:search_keyWord.value,
          full:true,
          isEdit:false
        }
        console.log(requestData.username,'关键字')
        //加载状态
        loadingData.value=true
        GetUserList(requestData).then(response=>{
      //    console.log('response',response)
          let data=response.data.userList;
           //更新列表
            tableData.item=data
            //数据总数
            total.value=response.data.total
        //    console.log(data,'用户列表',total,'total')
            //加载状态
        loadingData.value=false
        }).catch(err=>{
          loadingData.value = false;
        })
      }
      //生命周期
      onMounted(()=>{
        //获取列表
        getUserList()
      })
            
            //数据的返回
            return {
              dialog_info,
              dialog_info_edit,
              tableData,
              handleSizeChange,
              handleCurrentChange,
              closeDialog,
              deleteItem,
              deleteAll,
              search_keyWord,
              getUserList,
              total,
              page,
              loadingData,
              editItem,
              handleSelectionChange,
              userid

           
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