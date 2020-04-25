<template>
    <el-dialog title="添加公告信息" :visible.sync="data.dialog_info_flag" @close="close" width="580px">
        <el-form :model="data.form" ref="addInfoForm">
           <el-form-item label="标题："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.title" placehoder="标题"></el-input>
            </el-form-item>
            <el-form-item label="内容："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.content" placehoder="内容"></el-input>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {AddNews} from '@/api/news.js'
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
                title:'',
                content:''
            },
            // 按钮加载
            submitLoading: false
        });
           const userid=computed(()=>root.$store.state.app.userid);
            console.log(userid.value,'userid')
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
                   title:data.form.title,
                    content: data.form.content,
                     userid:userid.value
            }
           
            data.submitLoading = true
            AddNews(requestData).then(response => {
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
            // methods
            close, submit
        }
    }
}
</script>
<style scoped>

</style>