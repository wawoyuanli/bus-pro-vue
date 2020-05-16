<template>
    <div id="wrap-change">
        <div class="main-header">
        <el-row>
      <el-col :span="9">
          您当前所在位置：首页>线路站点维护
      </el-col>
      <el-col :span="8" >
      <el-input  placeholder="请输入站点"  v-model="search_keyWork"></el-input>
      </el-col>
        
      <el-col :span="4">
      <el-button type="primary" @click="getChangeLineList">搜索</el-button>
      </el-col>
       
      <el-col :span="3">
      <el-button type="primary" @click="dialog_info=true" >添加</el-button>
      </el-col>
    </el-row>
    </div>
    <!--表格-->
   <el-table
     border
    :data="tableData.item"
    v-loading="loadingData"
     style="width: 100%">
    <el-table-column
      type="selection"
      fixed
    >
    </el-table-column>
    <el-table-column  prop="line_name" label="线路"   width="500px"></el-table-column>
    <el-table-column prop="station_name" label="站点" width="300px"> </el-table-column>
    <el-table-column prop="index" label="站点顺序" width="200px"> </el-table-column>
    <el-table-column prop="username" label="维护人员" width="200px">胡元丽 </el-table-column>
    <el-table-column prop="createTime" label="创建时间" width="100px"> </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="150px"
     >
      <template slot-scope="scope" >
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
      :page-sizes="[5,10,15,20]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
       </el-col>
    </el-row>
  
  <!--添加弹窗 :父组件往子组件传参  ：绑定属性-->
    <ChangeDialog  :flag.sync="dialog_info" @click="closeDialog"/>
    <ChangeEditDialog  :flag.sync="dialog_info_edit" :id="lineid"  @getChangeLineList="getChangeLineList" />
    </div>
</template>
<script>

import {GetChangeLineList,DeleteLine} from '@/api/changeLine'
import { reactive, ref,onMounted } from '@vue/composition-api';
import ChangeDialog from '../dialog/ChangeDialog.vue';
import ChangeEditDialog from '../dialog/ChangeEditDialog.vue'
//引入全局方法
import { global } from "@/utils/global_V3.0";
export default {
    name:'line',
    components:{
    ChangeDialog,
    ChangeEditDialog
    },
      setup(props,{root}){
         //全局方法定义
        const { str: aaa, confirm } = global();
        //数据的定义
        const deleteInfoId=ref('');
        const dialog_info=ref(false);
        const dialog_info_edit=ref(false);
        const search_keyWork=ref('');
        const loadingData=ref(false);
        const total=ref(0);
        const lineid=ref('');
        const tableData=reactive([
          {
             item:[]
           
          }
        ])
          //页码
          const page=reactive({
            pageIndex:1,
            pageSize:10
          })
      
           //函数定义
          const handleSizeChange=(value)=>{
                  page.pageSize=value
                  console.log(value) 
          }
            const handleCurrentChange=(value)=>{
              page.pageIndex=value
              getChangeLineList()  
            }
          const closeDialog=()=>{
             dialog_info.value=false
            }
            //删除提醒
           const deleteItem = (_id) => {
             console.log('_id changeline',_id)
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
            DeleteLine({_id: deleteInfoId.value}).then(response => {
              console.log(response,'delete888888888888888')
              root.$message({
                message:response.data.message,
                type:'success'
              })
                deleteInfoId.value = '';
                getChangeLineList()
            })
        }

             //编辑站点信息
       const editItem=(_id)=>{
         dialog_info_edit.value=true;
         lineid.value=_id;
        console.log('编辑换乘点信息',_id)
       }
       //线路换乘列表
      const getChangeLineList=()=>{
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          station_name:search_keyWork.value,
          full:true,
          isEdit:false,
          sortName:'line_name'
        }
     //   console.log(requestData.line_name,'关键字')
        //加载状态
        loadingData.value=true
        GetChangeLineList(requestData).then(response=>{
          console.log('response',response)
          let data=response.data.lineList;
           //更新列表
            tableData.item=data
            //数据总数
            total.value=response.data.total
           //加载状态
        loadingData.value=false
        }).catch(err=>{
          loadingData.value = false;
        })
      }
       //生命周期
      onMounted(()=>{
        //获取线路列表
        getChangeLineList()
      })
            //数据的返回
            return {
              dialog_info,
              dialog_info_edit,
              tableData,
              loadingData,
              handleSizeChange,
              closeDialog,
              deleteItem,
              deleteAll,
              editItem,
              getChangeLineList,
               search_keyWork,
               page,
               total,
               handleCurrentChange,
               lineid

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