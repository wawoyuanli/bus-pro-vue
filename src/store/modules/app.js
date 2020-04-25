import { Login } from "@/api/login";
import { setToKen, removeToKen, removeUserName, setUserName, getUserName,setUserid,getUserid } from "@/utils/app";


const state = {
    //没有属性计算取state里面的值
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false,
    token: '',
    username: getUserName() || '',
    userid:getUserid() || '',
   
}

const getters = {
    //有属性计算取getters里面的值
    isCollapse: state => state.isCollapse
}

const mutations = {  // 必须的  同步 没有回调处理事情
    SET_COLLAPSE(state) {
        console.log('app js store')
        state.isCollapse = !state.isCollapse;
        // html5本地储存
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    },
    SET_TOKEN(state, value){
        state.token = value
    },
    SET_USERNAME(state, value){
        state.username = value
    },
    SET_USERID(state,value){
        state.userid = value
    }
}

const actions = {  // 可以回调处理事情 (被回调)
    login({ commit }, repuestData) {
        return new Promise((resolve, reject) => {
            Login(repuestData).then((response) => {
                 let data = response.data
                 console.log(data,'登录存储数据')
                 console.log(data.userid,'userid-----')
                // 普通的
                // content.commit('SET_TOKEN', data.toKen);
                // content.commit('SET_USERNAME', data.username);
            
                // 解构的
              
                 commit('SET_TOKEN', data.token);
                 commit('SET_USERNAME', data.username);
                 commit('SET_USERID', data.userid);
            
                setToKen(data.token);
                setUserName(data.username);     
                setUserid(data.userid); 
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },
    exit({ commit }){
        return new Promise((resolve, reject) => {
            removeToKen();
            removeUserName();
            commit('SET_TOKEN', '');
            commit('SET_USERNAME', '');
            commit('SET_USERID','');
            resolve();
            
        }) 
    }
}


export default {
    namespaced: true, //区分命名空间
    state,
    getters,
    mutations,
    actions
};
