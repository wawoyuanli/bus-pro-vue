<template>
    <el-dialog title="编辑线路" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="线路名称："  :label-width="data.formLabelWidth"  prop="line_name">
                 <el-input v-model="data.form.line_name" placeholder="线路名称"></el-input>
            </el-form-item>
            <el-form-item label="始发站：" :label-width="data.formLabelWidth" prop="start_station">
                <el-input v-model="data.form.start_station" placeholder="始发站"></el-input>
            </el-form-item>
            <el-form-item label="中间站：" :label-width="data.formLabelWidth" prop="mid_station">
               <textarea rows="2" cols="70" v-model="data.form.mid_station" placeholder="中间站"/>
            </el-form-item>
             <el-form-item label="终点站：" :label-width="data.formLabelWidth" prop="end_station">
                    <el-input v-model="data.form.end_station" placeholder="终点站"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" :label-width="data.formLabelWidth" prop="start_time">
                    <el-input v-model="data.form.start_time" placeholder="开始时间"></el-input>
            </el-form-item>
              <el-form-item label="结束时间：" :label-width="data.formLabelWidth" prop="end_time">
                    <el-input v-model="data.form.end_time" placeholder="结束时间"></el-input>
            </el-form-item>
              <el-form-item label="间隔时间：" :label-width="data.formLabelWidth" prop="interval">
                    <el-input v-model="data.form.interval" placeholder="间隔时间"></el-input>
            </el-form-item>
              <el-form-item label="距离：" :label-width="data.formLabelWidth" prop="distance">
                    <el-input v-model="data.form.distance" placeholder="距离"></el-input>
            </el-form-item>
             <el-form-item label="票价：" :label-width="data.formLabelWidth" prop="price">
                    <el-input v-model="data.form.price" placeholder="票价"></el-input>
            </el-form-item>
            <el-form-item label="方向：" :label-width="data.formLabelWidth" prop="direction">
                    <el-input v-model="data.form.direction" placeholder="方向"></el-input>
            </el-form-item>
            <el-form-item label="站点总数：" :label-width="data.formLabelWidth" prop="station_num">
                    <el-input v-model="data.form.station_num" placeholder="站点总数"></el-input>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {EditLine,GetLines} from '@/api/line.js'
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
                line_name:'',
                start_station:'',
                mid_station:'',
                end_station:'',
                start_time:'',
                end_time:'',
                interval:'',
                distance:'',
                price:'',
                direction:'',
                station_num:''
            },
            
            // 按钮加载
            submitLoading: false
        });
         const username=computed(()=>root.$store.state.app.username);
         
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
           getLines()
        }
      //查询
         const getLines=()=>{
             let requestData={
              pageIndex:1,
              pageSize:1,
              lineid:props.id,
              full:false,
              isEdit:true
             }
           GetLines(requestData).then(response=>{
               console.log(response.data.lineList[0],'lineList')
               const lineList=response.data.lineList[0];
               data.form={
                line_name:lineList.line_name,
                start_station:lineList.start_station,
                mid_station:lineList.mid_station,
                end_station:lineList.end_station,
                start_time:lineList.start_time,
                end_time:lineList.end_time,
                interval:lineList.interval,
                distance:lineList.distance,
                price:lineList.price,
                direction:lineList.direction,
                station_num:lineList.station_num
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
                start_station:data.form.start_station,
                mid_station:data.form.mid_station,
                end_station:data.form.end_station,
                start_time:data.form.start_time,
                end_time:data.form.end_time,
                interval:data.form.interval,
                distance:data.form.distance,
                price:data.form.price,
                direction:data.form.direction,
                station_num:data.form.station_num,
                lineid:props.id
                        }
            console.log('开始提交线路信息----编辑')
            data.submitLoading = true//解决按钮多次点击问题
            EditLine(requestData).then(response => {
                let responseData = response.data
                  console.log(requestData,'表单信息')
                  root.$message({
                    message: responseData.message,
                    type: 'success'
                })
                data.submitLoading = false
                 emit("getLines")
                // 重置表单
                resetForm()
               
            }).catch(error => {
                data.submitLoading = false
            })   
        }
        return {
            data,
            username,
            close, openDialog, submit,getLines
        }
    }
}
</script>
<style scoped>

</style>