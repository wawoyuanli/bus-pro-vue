
/**
 *param 1 读取指定目录的所有文件
 * param 2 是否遍历子集目录
 * param 3 定义遍历文件规则
 */
import Vue from "vue";
import SvgIcon from "./SvgIcon.vue";
Vue.component("svg-icon", SvgIcon);
const req = require.context('./svg', false, /\.svg$/);
const requireAll = (requireContext) => {
    return requireContext.keys().map(requireContext)
};
requireAll(req);
  