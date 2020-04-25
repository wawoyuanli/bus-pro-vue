<template>
    <el-dialog title="添加信息" :visible.sync="data.dialog_info_flag" @close="close" width="580px" >
        <el-form :model="data.form" ref="addInfoForm">
         
            <el-form-item label="用户名：" :label-width="data.formLabelWidth" prop="username">
                    <el-input v-model="data.form.username" placehoder="用户名"></el-input>
            </el-form-item>
             
             <el-form-item label="密码：" :label-width="data.formLabelWidth" prop="password">
                    <el-input v-model="data.form.password" placehoder="密码"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {AddUser} from '@/api/user'
import { reactive, ref, watch } from '@vue/composition-api';
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
                username:'',
                password:''
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
       
        const resetForm = () => {
            refs.addInfoForm.resetFields();
        }
        //提交表单数据
        const submit = () => {
            let requestData = {
                     username:data.form.username,
                     password:data.form.password
            }
           
            data.submitLoading = true
            AddUser(requestData).then(response => {
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
            data,
          
            close, submit
        }
    }
}
</script>
<style scoped>

</style>