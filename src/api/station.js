import service from "@/utils/request.js"
//获取验证码的接口

export function AddStation(data){
   return service.request({
        method:"post",
        url:"/station/addStation", //添加站点接口
        data:data
    })
}
//站点查询
export function SelectStation(data){
    return service.request({
        method: "get",
        url: "/station/searchStation", //查询
        data:data
    }) 
}
//获取站点列表
export function GetStationList(data){
    return service.request({
        method: "post",
        url: "/station/getStationList", 
        data:data
    }) 
}
//删除站点
export function DeleteStation(data){
    return service.request({
        method: "post",
        url: "/station/deleteStation", 
        data:data
    }) 
}
//站点
export function EditStation(data){
    return service.request({
        method: "post",
        url: "/station/editStation", 
        data:data
    }) 
}
