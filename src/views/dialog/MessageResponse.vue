<template>
    <el-dialog title="" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
          
         <el-form-item label="留言回复:">
              <quillEditor v-model="data.form.content" width="500px" height="500px"/>             
        </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
 import {MessageResponse} from '@/api/message.js'
//富文本引入文件
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
import { reactive, ref, watch ,computed} from '@vue/composition-api';
export default {
    name: 'dialogInfo',
    components:{
quillEditor
    },
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
        const username = computed(() =>  root.$store.state.app.username);
        const data = reactive({
            dialog_info_flag: false,  // 弹窗标记
            form: {
                content:''
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
        const submit = () => {
            let requestData = {
              content: data.form.content,
              id:props.id ,
              admin:username.value             
            }
            console.log('提交表单数据---------回复',requestData)
         
            data.submitLoading = true
            MessageResponse(requestData).then(response => {
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
            data,username,
            // methods
            close, openDialog, submit
        }
    }
}
</script>
<style scoped>

</style>