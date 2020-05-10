<template>
    <div class="main">
       <MainHeader />
       <!--轮播图的实现-->
      <div class="slide">
       <SlideImage />
        </div>    
    <br>  
              <!--网站简介-->
        <div class="introduce">
           <h4> {{introduce}}</h4>
            <hr/>
            <div class="content">
              {{content}}
            </div>
      </div>
      
       <!--底部-->
        <MainFooter/>
        
    </div>
  
</template>
<script>
//导入外部文件
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
import SlideImage from '@/components/SlideImage.vue'
import { reactive, ref, watch } from '@vue/composition-api';
export default {
  name: 'Main',
  components: {
   MainHeader,
   MainFooter,
   SlideImage
  },
  setup(props,{root}){
    //数据定义
    const introduce=ref('网站简介');
   const content=`为改善公共交通的压力，我国在实现全民公交的理念上一直努力奋斗，此网站和大多数公交查询的网站功能一致，
   致力于为广大城市用户服务，希望在公交查询方面可以帮助到各位亲，有不足之处还希望广大用户能够积极留言
   这里会及时为大家更新。`;
   
    
    return{
          introduce,
          content
    }
    }
    }
</script>

<style scoped>
.slide{
  background-image: url('../../assets/images/bg.jpg');
  background-size: cover;
   width:100%;
   height: 420px;
   border-radius: 4px;
   margin-top: -1px;
}
ul>li{
  list-style: none;
  display: inline-block;
}
.introduce h4{
 margin-top: 8%;
 text-align: center;
 font-size: 26px;
 font-family: '宋体';
 color: blueviolet;
}
.introduce .content{
  width: 600px;
  margin: 0 auto;
  font-size: 20px;
  font-family: '黑体';

}
h3{
  text-align: center;
}
p{
  text-align: center;
}


</style>