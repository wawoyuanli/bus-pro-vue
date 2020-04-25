<template>
    <div id="wrap-line">
        <div class="main-header">
        <el-row>
      <el-col :span="8">
          您当前所在位置：首页>公交换乘查询
      </el-col>
      <el-col :span="4" >
      <el-input  placeholder="请输入起点站" v-model="search_keyWork"></el-input>
      </el-col>
       <el-col :span="1" class="dao">
             到
      </el-col>
      <el-col :span="4" >
      <el-input  placeholder="请输入终点站" v-model="search_keyWork"></el-input>
      </el-col>
        
      <el-col :span="7">
      <el-button type="primary" @click="getLines">换乘查询</el-button>
      </el-col>
    </el-row>
    </div>
    <!--表格-->
   <el-table
     border
    :data="tableData.item"
     v-loading="loadingData"
      @selection-change="handleSelectionChange"
      style="width: 100%">
       <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column prop="start_station" label="起点位置" width="200px"></el-table-column>
    <el-table-column prop="end_station" label="终点位置" width="100px"> </el-table-column>
    <el-table-column  prop="line_name" label="线路"   width="500px"></el-table-column>
    <el-table-column prop="index" label="站点顺序" width="200px"> </el-table-column>

       <el-table-column
      fixed="right"
      label="操作"
      width="150">
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
      :page-sizes="[5,10,15,20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
       </el-col>
    </el-row>
  
     <!--添加弹窗 :父组件往子组件传参  ：绑定属性-->
    <LineDialog  :flag.sync="dialog_info" @click="closeDialog"/>
      <!--编辑弹窗-->
    <LineEditDialog  :flag.sync="dialog_info_edit" :id="lineid" @getLines="getLines"/>
    </div>
</template>
<script>
 import {GetLines,DeleteLine,EditLine} from '@/api/line.js'
import { reactive, ref,onMounted } from '@vue/composition-api';
import LineDialog from '../dialog/LineDialog.vue';

import LineEditDialog from '../dialog/LineEditDialog.vue';
//引入全局方法
import { global } from "@/utils/global_V3.0";
export default {
    name:'line',
    components:{
    LineDialog,
    LineEditDialog
    },
      setup(props,{root}){
          const { str: aaa, confirm } = global();
           var total=ref(0);
        //数据的定义
        const dialog_info=ref(false);
        const dialog_info_edit=ref(false);
        const deleteInfoId = ref('');
        const loadingData=ref(false);
        const search_keyWork=ref('');
        const lineid=ref('');

        const tableData=reactive({
          items:[]
        })

        //函数定义
       const handleSizeChange=(value)=>{
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
           //页码
          const page=reactive({
            pageIndex:1,
            pageSize:10
          })
         //删除提醒
           const deleteItem = (_id) => {
             console.log('_id 444444444444444444444456',_id)
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
                getLines()
            })
        }
        //编辑站点信息
       const editItem=(_id)=>{
          console.log('编辑站点信息',_id)
         dialog_info_edit.value=true;
         lineid.value=_id;

       }
   
          
      //站点列表
      const getLines=()=>{
          // 单独处理数据
            //let requestData = formatData();
         let requestData={
          pageIndex:page.pageIndex,
          pageSize:page.pageSize,
          line_name:search_keyWork.value,
          full:true,
          isEdit:false
        }
        console.log(requestData.line_name,'关键字')
        //加载状态
        loadingData.value=true
        GetLines(requestData).then(response=>{
          console.log('response',response)
          let data=response.data.lineList;
           //更新列表
            tableData.item=data
            //数据总数
            total.value=response.data.total
           //console.log(data,'线路列表',total,'total')
           //加载状态
        loadingData.value=false
        }).catch(err=>{
          loadingData.value = false;
        })
      }
       //生命周期
      onMounted(()=>{
        //获取线路列表
        getLines()
      })
            //数据的返回
            return {
              dialog_info,
              dialog_info_edit,
              tableData,
              handleSizeChange,
              handleCurrentChange,
              handleSelectionChange,
              closeDialog,
              deleteItem,
              deleteAll, 
              editItem,
              loadingData,
              getLines,
              search_keyWork,
              page,
              total,
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
.main-header .dao{
  font-size: 22px;
  color: rgb(108, 114, 105);
  text-align: center;

}
</style>