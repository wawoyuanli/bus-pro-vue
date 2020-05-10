<template>
     <div class="index-content">
    <div class="banner">
        <img  v-for="(item,i) in img " :key="i" :src="item" v-show="i==n" alt="banner"/>
        <div class="banner-circle">
            <ul>
                <li  v-for="(item,i) in img " :key="i" :class="i==n ?'selected':''"></li>  
            </ul> 
        </div>
    </div>
</div>
</template>
<script>
export default {
    name:'slideImage',
    data(){
      return{
            img:[
                require('@/assets/slide01.jpg'),
                require('@/assets/slide02.png'),
                require('@/assets/slide03.png'),
                require('@/assets/slide06.png'),
                require('@/assets/slide01.jpg'),
            ],
            n:2
          }      
        },
        methods:{
            fun:function(){
                setInterval(this.play,2000)
            },
            play:function(){
                this.n++;
                if(this.n == this.img.length){
                    this.n = 0;
                }
            }
        },
        mounted:function(){    //生命周期  钩子函数   挂载完成
            this.fun()
        }
  }
</script>
<style scoped>
.index-content{
    width:100%;
}
  .index-content .banner .banner-circle li{
    display:inline-block;
    background: rgba(0,0,0,.3);
    border-radius: 50%;
    padding:5px;
    margin:2px;
}
.index-content .banner .banner-circle ul {
    text-align: center;
}
.index-content .banner .banner-circle .selected {
    background: rgba(0,0,0,.8);
}
.index-content .banner img {
    width: 100%;
    height: 420px;
    margin: 0 auto;
    padding: 0;
    border-radius: 2px;  
} 
</style>