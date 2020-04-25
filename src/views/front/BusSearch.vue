<template>
  <div class="busSearch">
        <MainHeader/>
         <div class="current-position">
            <h4>您当前所在位置：首页>公交动态>公交查询 </h4>
            <hr/>
        </div>
    <div class="img-demo">
        <!--遮罩层-->
<div class="box">
  <div class="bus">
  <el-row :gutter="10" class="el-row">
  <el-col :xs="20" :sm="12" :md="20" :lg="20" :xl="13">
    <div class="grid-content bg-purple">
      <el-input placeholder="站点 例：皓月路市心路口" v-model="station"></el-input>
    </div>
  </el-col>
  <el-col :xs="4" :sm="12" :md="4" :lg="4" :xl="11">
  <div class="grid-content bg-purple-light">
      <el-button type="primary" @click="getLines">查询</el-button>
  </div>
  </el-col>
</el-row>
  <el-row :gutter="10" class="el-row">
  <el-col :xs="20" :sm="12" :md="20" :lg="20" :xl="11">
    <div class="grid-content bg-purple">
      <el-input placeholder="请输入线路 例：402路" v-model="line_name"></el-input>
    </div>
  </el-col>
  <el-col :xs="4" :sm="12" :md="4" :lg="4" :xl="13">
  <div class="grid-content bg-purple-light">
      <el-button type="primary" @click="getStations">查询</el-button>
  </div>
  </el-col>
</el-row>
  <el-row :gutter="10" class="el-row">
  <el-col :xs="18" :sm="12" :md="20" :lg="20" :xl="11">
    <div class="grid-content bg-purple">
      <el-input placeholder="起点站" v-model="start_station"></el-input>
    </div>
  </el-col>
  <el-col :xs="4" :sm="12" :md="4" :lg="4" :xl="13">
  <div class="grid-content bg-purple-light">
      <el-button type="warning">到</el-button>
  </div>
  </el-col>
  <el-col :xs="18" :sm="12" :md="20" :lg="20" :xl="11">
    <div class="grid-content bg-purple">
      <el-input placeholder="终点站" v-model="end_station"></el-input>
    </div>
  </el-col>
    <el-col :xs="4" :sm="12" :md="4" :lg="4" :xl="13">
  <div class="grid-content bg-purple-light">
      <el-button type="primary">查询</el-button>
  </div>
  </el-col>
</el-row>
  </div>
</div>

</div>
<!--地图-->
<div class="map"> 
      <div class="m-part">
        <mapDrag @drag="dragMap" class="mapbox"></mapDrag>
      </div>

    <div class="directionMap">
        <ul class="info">
          <li><span>经度：</span>{{ dragData.lng }}</li>
          <li><span>纬度：</span>{{ dragData.lat }}</li>
          <li><span>地址：</span>{{ dragData.address }}</li>
          <li><span>最近的路口：</span>{{ dragData.nearestJunction }}</li>
          <li><span>最近的路：</span>{{ dragData.nearestRoad }}</li>
          <li><span>最近的POI：</span>{{ dragData.nearestPOI }}</li>
        </ul>
    </div>   
  <!--查询显示数据部分-->
    <div class="data">
        <ul class="info" v-show="show">
          <li  v-for="(item,index) in dataList.item" :key="index">
            <span>线路名称: {{item.line_name}}&nbsp;&nbsp;&nbsp;</span>
            <span>首发站:{{item.start_station}}&nbsp;&nbsp;&nbsp;</span>
            <span>经过站点:{{item.mid_station}}&nbsp;&nbsp;&nbsp;</span>
            <span>终点站:{{item.end_station}}&nbsp;&nbsp;&nbsp;</span>
            <span>开始时间:{{item.start_time}}&nbsp;&nbsp;&nbsp;</span> 
            <span>结束时间:{{item.end_time}}&nbsp;&nbsp;&nbsp;</span>
            <span>间隔时间:{{item.interval}}&nbsp;&nbsp;&nbsp;</span>
            <span>两站距离:{{item.distance}}&nbsp;&nbsp;&nbsp;</span>
            <span>票价:{{item.price}}&nbsp;&nbsp;&nbsp;</span>
            <span>方向:{{item.direction}}&nbsp;&nbsp;&nbsp;</span>
            <span>站点数:{{item.station_num}}&nbsp;&nbsp;&nbsp;</span>
          </li>
        </ul>
      
          <ul class="info" v-show="show">
        <div align="center" margin-bottom="10px">站点{{lineList.list1}}经过线路详情如下：</div>
          <li  v-for="(item,index) in lineList.list2" :key="index">
            <span>线路名称: {{item.line_name}}</span>
            <span>首发站:{{item.start_station}}</span>
            <span>经过站点:{{item.mid_station}}</span>
            <span>终点站:{{item.end_station}}</span>
            <span>开始时间:{{item.start_time}}&nbsp;&nbsp;&nbsp;</span> 
            <span>结束时间:{{item.end_time}}&nbsp;&nbsp;&nbsp;</span>
            <span>间隔时间:{{item.interval}}&nbsp;&nbsp;&nbsp;</span>
            <span>两站距离:{{item.distance}}&nbsp;&nbsp;&nbsp;</span>
            <span>票价:{{item.price}}&nbsp;&nbsp;&nbsp;</span>
            <span>方向:{{item.direction}}&nbsp;&nbsp;&nbsp;</span>
            <span>站点数:{{item.station_num}}&nbsp;&nbsp;&nbsp;</span>
          </li>
        </ul>
    </div>  
</div>

<MainFooter/>
</div>
</template>
<script>
import { reactive, ref, watch,onMounted } from '@vue/composition-api'
import MainHeader from '@/components/Header.vue'
import MainFooter from '@/components/Footer.vue'
import mapDrag from '@/components/mapDrag'
import { Col, Row } from 'vant'
import { Overlay } from 'vant'
import {FindByLine,FindByIn}  from '@/api/line.js'
export default {
    name:'BusSearch',
    components:{
     MainHeader,
     MainFooter,
     mapDrag,
     [Col.name]:Col,
     [Row.name]:Row,
     [Overlay.name]:Overlay
    },
    setup(props,{root}){
      const show=ref(false);
      const station=ref('');
      const line_name=ref('');
      const start_station=ref('');
      const end_station=ref('')
        //站点关键字
      const stationKey=ref('');
     // const show=ref(true);

      const onSubmit=()=>{
          console.log('stationKey',stationKey.value)
      }
      const dataList=reactive({
        item:[]
      })
      const lineList=reactive({
        list1:[],
        list2:[]
      })
      console.log('datalist',dataList.item)
    const dragData=reactive({
        lng: null,
        lat: null,
        address: null,
        nearestJunction: null,
        nearestRoad: null,
        nearestPOI: null
    })
    //函数
    const dragMap =(data) =>{
        dragData.lng=data.position.lng,
        dragData.lat=data.position.lat,
        dragData.address= data.address,
        dragData.nearestJunction= data.nearestJunction,
        dragData.nearestRoad= data.nearestRoad,
        dragData.nearestPOI= data.nearestPOI   
    }
    /**---------------------------------站点 线路 换乘查询函数----------------------------------------------------- */
        //站点列表
      const getStations=()=>{
          // 单独处理数据
         let requestData={
          line_name:line_name.value,
        }
        console.log(requestData.line_name,'线路关键字')
        //加载状态
        FindByLine(requestData).then(response=>{
          show.value=false
          console.log('response',response)
          let data=response.data.stationList;
          dataList.item=data
        console.log('dataList.item',dataList.item)
        }).catch(err=>{
       console.log(err)
        })
      }
      //线路
              //站点列表
      const getLines=()=>{
          // 单独处理数据
         let requestData={
          station:station.value,
        }
        console.log(requestData.station,'站点关键字')
        //加载状态
        FindByIn(requestData).then(response=>{
          show.value=true
         // console.log('---response---',response)
           let data=response.data.stationList;
        console.log(data,'data')
        lineList.list1=data[0],
        lineList.list2=data[1]
        console.log(' lineList.list1', lineList.list1)
        console.log(' lineList.list2',lineList.list2)
        }).catch(err=>{
       console.log(err)
        })
      }
         //生命周期
      onMounted(()=>{
        getStations(),
        getLines()
      })
      return {
        onSubmit,
        dragData,
        dragMap,
        stationKey,
        show,
        station,
        line_name,
        start_station,
        end_station,
        dataList,
        getStations,
        getLines,
        lineList
    }
    }
}
</script>
<style scoped>
/**背景图 */
.img-demo img{
    width: 100%;
    height:400px;
}
.img-demo {
    background-image: url('../../assets/images/公交查询背景图2.jpg');
    background-size: cover;
    width: 100%;
    height: 500px;
    margin: 0px;
}
.demo-form-inline{
    padding: 100px 0 0px 400px;
}
.demo-form-inline-station{
      padding: 100px 0px 0px 400px;
 
}
/**高德地图样式 */
body{ margin: 0; }
 .map .m-part .mapbox{ width:900px; height:400px;float: left;margin-right: 30px; }
  .map .directionMap{background: rgba(159, 7, 246, 0.4); height: 400px;}
 .map .directionMap .info{list-style: none; color: rgb(7, 5, 5);font-family: '宋体'; font-size: 20px;}
.map .directionMap .info li{
  margin-top: 30px;
}
.m-footer{ background: #eee; line-height: 60px; text-align: center; color: #999; font-size: 12px; }
.m-footer a{ margin:  0 5px; color: #999; text-decoration: none; }
.app .page-nav{
 text-align: center;
 padding: 10px;
}
/**数据显示 */
 .map .data{
    margin-top: 50px;
    height:700px;
    width: 100%;   
    background-color: rgba(71, 74, 255, 0.219);
    font-size: 24px;
    font-family: '宋体'; 
}
 .map .data .info{                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
    list-style: none;
 }
  .map .data .info li{
    text-align:center;
    display:block;
  }
 .map .data .info li span{
   text-align:center;
   display: block;
 }
.box{
  justify-content: center;
  display: flex;
}
  .box .bus{
    margin-top: 100px;
    margin-left: -104px;
  }
  .box .bus .el-row{
    margin-top: 30px;
    justify-content: center;
    display:flex;
    font-size: 28px;
  }
  .box .bus .el-row el-col div el-input p{
    font-size: 10px;

  }
  .grid-content bg-purple .text{
         font-size: 10px;
  }
</style>