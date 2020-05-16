<template>
    <el-dialog title="添加工作信息" :visible.sync="data.dialog_info_flag" @close="close" width="1100px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
           <el-form-item label="姓名："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.name" placehoder="姓名"></el-input>
            </el-form-item>
    
      <el-form-item label="上传图片" :label-width="data.formLabelWidth">
          <el-upload
          class="avatar-uploader"
          action="http://localhost:8080/devApi/work/uploadImage"  
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-model="data.form.image"
          ref="upload"
          >
          <img v-if="data.imageUrl" :src="data.imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="承担岗位"  :label-width="data.formLabelWidth" >
            <el-input v-model="data.form.position" placehoder="承担岗位"></el-input>
      </el-form-item>
       <el-form-item label="所属部门"  :label-width="data.formLabelWidth" >
            <el-input v-model="data.form.department" placehoder="所属部门"></el-input>
      </el-form-item>
            <!--富文本编辑器-->     
          <el-form-item label="个人简介:" >
              <quillEditor v-model="data.form.content"/>             
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
//富文本引入文件
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'
  import {quillEditor} from 'vue-quill-editor'
  import { reactive, ref, watch,onMounted } from '@vue/composition-api';
  import {QiniuToKen,loadTableData} from '@/api/common.js'
  import {GetWorkList,EditWorkInfo,AddWorkInfo,UploadImage} from '@/api/work.js'
export default {
    name: 'dialogInfo',
    components:{
    quillEditor
    },
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
            formLabelWidth: '110px',
            imageUrl:'',
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
        // watch
        watch(() => data.dialog_info_flag = props.flag);
    
         
        const close = () => {
            data.dialog_info_flag = false;
            resetForm()
            emit("update:flag", false);
        }
      
        const resetForm = () => {
            refs.addInfoForm.resetFields();
        }
             const openDialog = () => {
                  getWorkList()
           }
           const getWorkList=()=>{
           GetWorkList().then(response=>{
             console.log(response,'get')
            })
           }
        //文件是否上传成功
        const  handleAvatarSuccess=(res, file,response)=> {
            data.imageUrl = URL.createObjectURL(file.raw);
            console.log(data.imageUrl,'--------------imageuRL 后执行 成功上传------------')
          }
   
        const  beforeAvatarUpload=(file)=> {
        console.log(file,'file request ---------先执行  判断上传格式')
        const isJPG = file.type ==='image/jpeg';
        //  const isPNG = file.type ==='image/png';
        // console.log(isJPG,'imag',isPNG)
        
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          root.$message.error('上传头像图片只能是 JPG格式!');
        }
        if (!isLt2M) {
          root.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

      //添加工作展示信息
         //提交表单数据
        const submit = () => {
            let requestData = {
                name:data.form.name,
                imageUrl:data.imageUrl,
                position:data.form.position,
                department:data.form.department,
                content: data.form.content,  
            }  
          console.log(requestData,'submit')
          console.log(requestData,'-requestdata----')
            data.submitLoading = true
            AddWorkInfo(requestData).then(response => {
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

      //生命周期
      onMounted(()=>{
      //   upload()

      })
        return {
            data,
            // methods
            close, submit ,openDialog,handleAvatarSuccess,beforeAvatarUpload
        }
    }
}
</script>
<style lang="scss">


.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>