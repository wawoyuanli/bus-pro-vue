import service from "@/utils/request.js"
//获取验证码的接口

export function AddChangeLine(data){
   return service.request({
        method:"post",
        url:"/change/add", //添加换乘接口
        data:data
    })
}
//查询换乘线路列表
export function GetChangeLineList(data){
    return service.request({
         method:"post",
         url:"/change/get",  
         data:data
     })
 }
//删除
 export function DeleteLine(data){
    return service.request({
         method:"post",
         url:"/change/delete",  
         data:data
     })
 }
 //编辑
 export function EditLine(data){
    return service.request({
         method:"post",
         url:"/change/edit",  
         data:data
     })
 }