<template>
    <div id="wrap-work">
        <div class="main-header">
        <el-row>
      <el-col :span="9">
          <span>您当前所在位置：首页>工作展示</span>
      </el-col>
      <el-col :span="8" >
      <el-input  placeholder="请输入内容"></el-input>
      </el-col>
        
      <el-col :span="4">
      <el-button type="primary">搜索</el-button>
      </el-col>
       
      <el-col :span="3">
      <el-button type="primary" @click="dialog_info=true" >添加</el-button>
      </el-col>
    </el-row>
    </div>
    <!--表格-->
   <el-table
   border
    v-loading="loadingData"
    :data="tableData.item"
    @selection-change="handleSelectionChange"
     style="width: 100%">
       
     <el-table-column
      type="selection"
      style="align:center"
      fixed>
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="100px" ></el-table-column>
    <el-table-column prop="imageUrl" label="图片" width="300px" ></el-table-column>
    <el-table-column prop="position" label="承担岗位" width="100px"> </el-table-column>
    <el-table-column prop="department" label="所属部门"  width="100px"> </el-table-column>
    <el-table-column prop="content" label="个人简介" width="1000px" ></el-table-column> 

       <el-table-column
      fixed="right"
      label="操作"
      width="110px">
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
    <WorkDialog  :flag.sync="dialog_info" @click="closeDialog"/>
    <!--编辑弹窗-->
    <WorkEditDialog :flag.sync="dialog_flag_edit" :id="workid" @getWorkList="getWorkList"/>
    </div>
</template>
<script>
import { reactive, ref,onMounted } from '@vue/composition-api';
import WorkDialog from '../dialog/WorkDialog.vue';
import WorkEditDialog from '../dialog/WorkEditDialog.vue'
import {GetWorkList,DeleteWorkInfo} from '@/api/work.js'

//引入全局方法
import { global } from "@/utils/global_V3.0";
export default {
    name:'line',
    components:{
    WorkDialog,
    WorkEditDialog
    },
    //setup
  setup(props,{root}){
          //全局方法定义
        const { str: aaa, confirm } = global();
        //数据的定义
        const deleteInfoId=ref('');
        const dialog_info=ref(false);
        const dialog_flag_edit=ref(false);
        const search_keyWord=ref('');
        const total=ref(0);
        const workid=ref('');
        const loadingData=ref(false);

         const tableData=reactive({
          item:[]
         })

         //页码
          const page=reactive({
            pageIndex:1,
            pageSize:10
          })
           //函数定义
          
          const handleSizeChange=()=>{
                  page.pageSize=value
                  console.log(value) 
            }
          const handleCurrentChange=(value)=>{
          page.pageIndex=value
          getStationList()  
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
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete
            });
        }
          //删除全部
            const deleteAll=()=>{
          //  console.log('----开始执行批量删除操作')
          //  console.log('888888888888888888',deleteInfoId.value.length,'22222222222');
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
            DeleteWorkInfo({_id: deleteInfoId.value}).then(response => {
                deleteInfoId.value = '';
                getWorkList()
            })
        }

         //编辑站点信息
       const editItem=(_id)=>{
          console.log('编辑站点信息',_id)
         dialog_flag_edit.value=true;
         workid.value=_id;

       }
        //查询
          const getWorkList=()=>{
          
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          name:search_keyWord.value,
          full:true,
          isEdit:false
        }
    //    console.log(requestData.name,'关键字')
        //加载状态
        loadingData.value=true
    //    console.log('开始查询')
        GetWorkList(requestData).then(response=>{
     //    console.log('response',response)
          let data=response.data.workList;
           //更新列表
            tableData.item=data
            //数据总数
            total.value=response.data.total
        //  console.log(data,'工作列表',total,'total')
            //加载状态
        loadingData.value=false
        }).catch(err=>{
          loadingData.value = false;
        })
      }
      //生命周期
      onMounted(()=>{
        //获取列表
        getWorkList()
      })
            //数据的返回
            return {
              dialog_info,
              dialog_flag_edit,
              workid,
              tableData,
              loadingData,
              handleSizeChange,
              handleCurrentChange,
              closeDialog,
              deleteItem,
              deleteAll,
              editItem,
              search_keyWord,
              getWorkList,
              page,
              total,
              handleSelectionChange
          
           
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