<template>
    <el-dialog title="添加站点" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="站点名称："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.station_name" placehoder="站点名称"></el-input>
            </el-form-item>
               <el-form-item label="经过线路："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.line_names" placehoder="经过线路"></el-input>
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
import {AddStation} from '@/api/station.js'

import { reactive, ref, watch,computed } from '@vue/composition-api';

export default {
    name: 'dialogInfo',
    props: {
        flag: {
            type: Boolean,
            default: false
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
                station_name:''
            },
            // 分类下拉
            categoryOption: [],
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
            data.categoryOption = props.category
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
                userid:userid.value
                           }
            console.log('开始提交站点信息----添加')
                 data.submitLoading = true//解决按钮多次点击问题
            AddStation(requestData).then(response => {
                let responseData = response.data
                  console.log(requestData,'表单信息')
                  root.$message({
                    message: responseData.message,
                    type: 'success'
                })
                data.submitLoading = false
                // 重置表单
                resetForm()
                // root.$refs['addInfoForm'].resetFields();
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