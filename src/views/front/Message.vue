<template>
    <div class="message">
    <MainHeader/>
    <div class="current-position">
    <h4>您当前所在位置：首页>公交动态>公交查询>公交文化>留言板 </h4>
    </div>
  <hr/>
  <!--富文本编辑器-->
        <el-form :model="data.form" ref="addInfoForm">
        <el-form-item label="留言板:" >
            <quillEditor v-model="data.form.content" class="quillEditor"/>             
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
<!--底部-->
<MainFooter/>
    </div>
</template>
<script>
  import {Addmessage} from '@/api/message.js'
  import { reactive, ref, watch,onMounted,computed } from '@vue/composition-api';
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
export default {
    name:'Message',
    components:{
     MainHeader,
     MainFooter,
     quillEditor
    },
    setup(props,{root}){
       const data = reactive({     
            form: {
                name:'', 
                image:'',
                position:'', //工作表彰人姓名
                department:'',
                content:'',     
            },
            // 按钮加载
            submitLoading: false
        });
          const resetForm = () => {
            refs.addInfoForm.resetFields();
        }
        const close = () => {
            data.dialog_info_flag = false;
            resetForm()
            emit("update:flag", false);
        }    
           const username = computed(() =>  root.$store.state.app.username); 
          const submit = () => {
            let requestData = {
                username:username.value,
                content: data.form.content,  
            }  
            data.submitLoading = true
            Addmessage(requestData).then(response => {
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
        return{
            data,
            username,
            resetForm,
            submit,
            close
        }
    }
    
}
</script>
<style lang="scss" scoped >
@import '../../styles/config.scss';
.dialog-footer {
  margin-top: 100px;
margin-left: 600px;
}
.quillEditor{
    height: 300px;
}
</style>