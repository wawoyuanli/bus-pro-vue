<template>
    <el-dialog title="编辑换乘信息" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
           <el-form-item label="线路名称："  :label-width="data.formLabelWidth" prop="line_name">
                 <el-input v-model="data.form.line_name" placehoder="线路名称"></el-input>
            </el-form-item>
            <el-form-item label="站点名称："  :label-width="data.formLabelWidth" prop="station_name">
                 <el-input v-model="data.form.station_name" placehoder="站点名称"></el-input>
            </el-form-item>
             <el-form-item label="站点顺序："  :label-width="data.formLabelWidth" prop="index">
                 <el-input v-model="data.form.index" placehoder="站点顺序"></el-input>
            </el-form-item>
            <el-form-item label="维护人员：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.username" placehoder="用户名"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {EditLine,GetChangeLineList} from "@/api/changeLine.js"
import { reactive, ref, watch,computed } from '@vue/composition-api'
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
                line_name:'',
                station_name:'',
                index:'',
                username:'',
            },
            // 分类下拉
            categoryOption: [],
            // 按钮加载
            submitLoading: false
        });
        const username=ref(root.$store.state.app.username);
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
           getChangeLineList()
        }
      //查询
         const getChangeLineList=()=>{
             let requestData={
              pageIndex:1,
              pageSize:1,
              lineid:props.id,
              full:false,
              isEdit:true
             }
             console.log('lineid',requestData)

           GetChangeLineList(requestData).then(response=>{
               console.log(response,'response')
             //  console.log(response.data.lineList[0],'lineList')
               const lineList=response.data.lineList[0];
               data.form={
                line_name:lineList.line_name,
                station_name:lineList.station_name,
                index:lineList.index,
                username:username
                   }
              console.log(data.form.line_name,'  data.form.station_name')
           });
        }
        const resetForm = () => {
            refs.addInfoForm.resetFields();
        }
        //提交表单数据
        const submit = () => {
            let requestData = {
                   line_name:data.form.line_name,
                    station_name: data.form.station_name,
                    index:data.form.index,
                    username:username,
                    lineid:props.id
            }   
            console.log('submit',requestData)
            data.submitLoading = true
            EditLine(requestData).then(response => {
                let responseData = response.data
                root.$message({
                    message: responseData.message,
                    type: 'success'
                })
                data.submitLoading = false
                emit('getChangeLineList')
                // 重置表单
                resetForm()
            }).catch(error => {
                data.submitLoading = false
            })
        }
        return {
            data,
            // methods
            close, openDialog, submit,getChangeLineList
        }
    }
}
</script>
<style scoped>

</style>