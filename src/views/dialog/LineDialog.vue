<template>
    <el-dialog title="添加线路" :visible.sync="data.dialog_info_flag" @close="close" width="580px" @opened="openDialog">
        <el-form :model="data.form" ref="addInfoForm">
            <el-form-item label="线路名称："  :label-width="data.formLabelWidth" >
                 <el-input v-model="data.form.line_name" placehoder="线路名称"></el-input>
            </el-form-item>
            <el-form-item label="始发站：" :label-width="data.formLabelWidth" prop="title">
                <el-input v-model="data.form.start_station" placehoder="始发站"></el-input>
            </el-form-item>
             <el-form-item label="中间站：" :label-width="data.formLabelWidth" prop="title">
                <el-input v-model="data.form.mid_station" placehoder="中间站"></el-input>
            </el-form-item>
             <el-form-item label="终点站：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.end_station" placehoder="终点站"></el-input>
            </el-form-item>
            <el-form-item label="开始时间：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.start_time" placehoder="开始时间"></el-input>
            </el-form-item>
              <el-form-item label="结束时间：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.end_time" placehoder="结束时间"></el-input>
            </el-form-item>
              <el-form-item label="间隔时间：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.interval" placehoder="间隔时间"></el-input>
            </el-form-item>
              <el-form-item label="距离：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.distance" placehoder="距离"></el-input>
            </el-form-item>
             <el-form-item label="票价：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.price" placehoder="票价"></el-input>
            </el-form-item>
            <el-form-item label="方向：" :label-width="data.formLabelWidth" prop="content">
                    <el-input v-model="data.form.direction" placehoder="方向"></el-input>
            </el-form-item>
            <el-form-item label="站点数：" :label-width="data.formLabelWidth" prop="station_num">
                    <el-input v-model="data.form.station_num" placehoder="方向"></el-input>
            </el-form-item>
           
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="close">取消</el-button>
            <el-button type="danger" :loading="data.submitLoading" @click="submit">确定</el-button>
        </div>
    </el-dialog>
</template>
<script>
import {AddLine} from '@/api/line.js'
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
            
            // 分类下拉
            categoryOption: [],
            // 按钮加载
            submitLoading: false
        });
         const userid=computed(()=>root.$store.state.app.userid);
         console.log('userid',userid.value);
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
                 line_name: data.form.line_name,
                  start_station: data.form.start_station,
                  mid_station:data.form.mid_station,
                   end_station: data.form.end_station,
                    start_time: data.form.start_time,
                    end_time: data.form.end_time,
                     interval: data.form.interval,
                      distance: data.form.distance,
                       price: data.form.price,
                        direction: data.form.direction,
                        station_num:data.form.station_num,
                         userid: userid.value, 
            }
           
            data.submitLoading = true
            AddLine(requestData).then(response => {
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
            userid,
            // methods
            close, openDialog, submit
        }
    }
}
</script>
<style scoped>

</style>