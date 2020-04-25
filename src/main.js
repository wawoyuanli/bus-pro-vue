import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './router/premit'
import VueQuillEditor from 'vue-quill-editor'
import Vant from 'vant'
//高德地图
import hljs from 'highlight.js'
import 'highlight.js/styles/railscasts.css' 

Vue.directive('hljs', el => {
  let blocks = el.querySelectorAll('pre')
  Array.prototype.forEach.call(blocks, hljs.highlightBlock)
})

//自定义全局组件
import './icons'
//自定义全局方法
import global from "@/utils/global.js"

Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi)
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(Vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
