import service from "@/utils/request.js"
//获取验证码的接口

export function AddLine(data){
   return service.request({
        method:"post",
        url:"/line/addLine", //添加线路接口
        data:data
    })
}
export function GetLines(data){
    return service.request({
         method:"post",
         url:"/line/getLines", //查询线路列表
         data:data
     })
 }
 export function DeleteLine(data){
    return service.request({
         method:"post",
         url:"/line/deleteLine", //删除线路
         data:data
     })
 }
 export function EditLine(data){
    return service.request({
         method:"post",
         url:"/line/editLine", //编辑线路
         data:data
     })
 }
//线路模糊查询 （搜索）
 export function FindByLineName(data){
  return service.request({
         method:"post",
         url:"/line/findByLineName", 
         data:data
     })
 }
 //精确查询 
 export function FindByLine(data){
    return service.request({
           method:"post",
           url:"/line/findByLine", 
           data:data
       })
   }
   /**关联查询 */ 
   export function FindByIn(data){
    return service.request({
           method:"post",
           url:"/line/findByIn", 
           data:data
       })
   }
   