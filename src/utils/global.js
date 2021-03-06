import {MessageBox} from 'element-ui'
export default{
    install (Vue,options){
        Vue.prototype.confirm=(params)=>{
            MessageBox.confirm(params.content, params.tip||"提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type:params.type||"warning",
                center: true
                }).then(() => {
                    params.fn&&params.fn(params.id)
                }).catch(() => {
                });
        }
    }
}
//vue 插件
//暴漏出一个默认得方法