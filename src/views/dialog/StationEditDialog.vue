<template>
    <el-dialog title="修改站点" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="站点名称："  :label-width="data.formLabelWidth" prop="station_name">
                 <el-input v-model="data.form.station_name" placehoder="站点名称"></el-input>
            </el-form-item>
             <el-form-item label="经过线路："  :label-width="data.formLabelWidth" prop="station_name">
                 <el-input v-model="data.form.line_names" placehoder="所经线路"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
//接口引入
import {GetStationList,EditStation} from '@/api/station.js'

import { reactive, ref, watch,computed } from '@vue/composition-api';

export default {
    name: 'dialogInfo',
    props: {
        flag: {
            type: Boolean,
            default: false
        },
        id:{
            type:String,
            default:false
        }
    },
    setup(props, { emit, root, refs }){
        /**
         * 数据
         */
        const data = reactive({
            dialog_info_flag: false,  // 弹窗标记
            formLabelWidth: '100px',
            form: {
                station_name:'',
                line_names:''
            },
            // 按钮加载
            submitLoading: false
        });
        // watch
        watch(() => data.dialog_info_flag = props.flag);
        /**
         * vue2.0 methods
         */
        const close = () => {
            data.dialog_info_flag = false;
            resetForm()
            emit("update:flag", false);
        }
        const openDialog = () => {
            getStationList();
            console.log(props.id)
           
        }
        //查询
         const getStationList=()=>{
             let requestData={
              pageIndex:1,
              pageSize:1,
              stationid:props.id,
              full:false,
              isEdit:true
             }
             console.log('开始查询站点编辑')
           GetStationList(requestData).then(response=>{
               console.log(response,'stationList')
               data.form={
                  station_name:response.data.stationList[0].station_name,
                  line_names:response.data.stationList[0].line_names
                   }
              console.log(data.form.station_name,'  data.form.station_name')
           });
        }

        const resetForm = () => {
            refs.addInfoForm.resetFields();

        }
       const userid=computed(()=>root.$store.state.app.userid);
       console.log(userid.value,'userid')
        //提交表单数据
       
           
        const submit = () => {        
            let requestData = {
            station_name: data.form.station_name,
            line_names:data.form.line_names,
            stationid:props.id
                        }
            console.log('开始提交站点信息----编辑')
            data.submitLoading = true//解决按钮多次点击问题

            EditStation(requestData).then(response => {
                let responseData = response.data
                  console.log(requestData,'表单信息')
                  root.$message({
                    message: responseData.message,
                    type: 'success'
                })
                data.submitLoading = false
                 emit("getListEdit")
                // 重置表单
                resetForm()
               
            }).catch(error => {
                data.submitLoading = false
            })   
        }
         return {
            data,userid,
            // methods
            close, openDialog, submit
        }
    }
}
</script>
<style scoped>

</style>