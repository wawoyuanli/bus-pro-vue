<template>
    <el-dialog title="添加线路站点信息" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
           <el-form-item label="线路名称："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.line_name" placehoder="线路名称"></el-input>
            </el-form-item>
            <el-form-item label="站点名称："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.station_name" placehoder="站点点名称："></el-input>
            </el-form-item>
             <el-form-item label="站点顺序："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.index" placehoder="站点顺序"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {AddChangeLine} from '@/api/changeLine'
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
                line_name:'',
                station_name:'',
                index:''
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
        //提交表单数据
             const userid=computed(()=>root.$store.state.app.userid);
        const submit = () => {
            let requestData = {
                   line_name:data.form.line_name,
                    station_name: data.form.station_name,
                    index:data.form.index,
                    userid:userid.value,
            }
           
            data.submitLoading = true
            AddChangeLine(requestData).then(response => {
                let responseData = response.data
                root.$message({
                    message: responseData.message,
                    type: 'success'
                })
                data.submitLoading = false
                // 重置表单
                resetForm()
            }).catch(error => {
                data.submitLoading = false
            })
        }
        return {
            data,userid,
           
            close, openDialog, submit
        }
    }
}
</script>
<style scoped>

</style>