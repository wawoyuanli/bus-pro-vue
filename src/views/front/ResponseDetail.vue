<template>
<div>
    <MainHeader />
    <div class="b-response-detail">
       <ul>
           <li v-for="item in data.item" :key="item._id">
            <span v-html="item.content"></span>
            <span>回复时间：{{item.createTime}}</span>&nbsp;&nbsp;<span>回复人:{{item.author}}</span>
           </li>
       </ul>      
    </div>
    <MainFooter />
</div>
</template>
<script>
import {GetResponse} from '@/api/message.js'
import { reactive, ref, watch,onMounted,computed } from '@vue/composition-api';
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
export default {
    name:'WorkDetail',
     components:{
     MainHeader,
     MainFooter
    },
      setup(props,{root}){
          const data=reactive({
              item:[]
          })
        const _id=ref('')       
        const getResponseList=()=>{
         let requestData={
         messageid:_id.value
        }
        console.log(requestData,'333')
           GetResponse(requestData).then(response=>{
        //  console.log('response',response)
          var result=response.data.messsageList;
           //更新列表
            data.item=result
             console.log(data.item,'data')
            //数据总数
            // total.value=response.data.total
          // console.log(data,'公告列表列表',total,'total')
           //加载状态
        }).catch(err=>{
          console.log(err)
        })
           }
        onMounted(()=>{
        _id.value=root.$route.query.id
        getResponseList()
          })
          return{
              _id,
              data,
              getResponseList
          }
      }
}
</script>
<style lang="scss" scoped>
.b-response-detail{
    text-align: center;
    ul{
        list-style: none;
        li{
            align-content: center;
            margin-top: 10px;
            padding-top: 20px;
            height: 100px;
             background-color: rgb(238, 228, 228);
             :nth-child(2){
                 font-size: 12px;
                 color: gray;
             }
              :nth-child(3){
                 font-size: 12px;
                 color: gray;
             }
        }
    }

}

</style>