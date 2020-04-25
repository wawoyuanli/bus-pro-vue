import Vue from 'vue';
import Vuex from 'vuex';
 Vue.use(Vuex)


 export default new Vuex.Store({
    state:{
        //sessionStorage  1
        // isCollapse:JSON.parse(sessionStorage.getItem('isCollapse'))||false, 

        //localStorage存储  2
        isCollapse:JSON.parse(localStorage.getItem('isCollapse'))||false, 

        //cookie方式   3
        // isCollapse:localStorage.getItem('isCollapse')||false,


    },
    //computed
    getters:{
        isCollapse:state=>state.isCollapse
    },
    //菜单收缩状态
    mutations:{
        SET_COLLAPSE(state){
            state.isCollapse = !state.isCollapse;
            //html5本地存储
            //sessionStorage存储
            // sessionStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))

            // localStorage存储
            localStorage.setItem('isCollapse',JSON.stringify(state.isCollapse))

            // Cookie.set('isCollapse',JSON.stringify(state.isCollapse));
        }
    },
    //异步
    actions:{
      login(content,requestData){
          console.log(content)
          return new Promise((resolve,reject)=>{
        //接口
        Login(requestData).then(res=>{
            resolve(res)
        }).catch(erro=>{
            reject(erro)
           })
          })
        }
    }
 });