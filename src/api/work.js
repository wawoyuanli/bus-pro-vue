import service from "@/utils/request.js"

//添加工作信息接口
export function AddWorkInfo(data){
   return service.request({
        method:"post",
        url:"/work/addWorkInfo", 
        data:data
    })
}
//搜索工作信息
export function SelectStation(data){
    return service.request({
        method: "get",
        url: "/work/searchWorkInfo", 
        data:data
    }) 
}

//查询工作列表
export function GetWorkList(data){
    return service.request({
        method: "post",
        url: "/work/getWorkList", 
        data:data
    }) 
}
//删除工作信息
export function DeleteWorkInfo(data){
    return service.request({
        method: "post",
        url: "/work/deleteWorkInfo", 
        data:data
    }) 
}
//编辑工作信息
export function EditWorkInfo(data){
    return service.request({
        method: "post",
        url: "/work/editWorkInfo", 
        data:data
    }) 
}
//上传图片
export function UploadImage(data){
    console.log('upload  api');
    return service.request({
        method: "post",
        url: "/work/uploadImage", 
        data:data
    }) 
}
