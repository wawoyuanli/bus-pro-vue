import service from "@/utils/request.js"

export function GetMessageList(data){
    return service.request({
         method:"post",
         url:"/message/getMessageList", //查询留言列表
         data:data
     })
 }
 export function DeleteMessage(data){
    return service.request({
         method:"post",
         url:"/message/deleteMessage", // 删除留言
         data:data
     })
 }
 export function ResponseMessage(data){
    return service.request({
         method:"post",
         url:"/message/responseMessage", //回复留言 
         data:data
     })
 }
 export function Addmessage(data){
    return service.request({
         method:"post",
         url:"/message/addMessage", //添加留言
         data:data
     })
 }
 export function MessageResponse(data){
    return service.request({
         method:"post",
         url:"/message/messageResponse", //添加留言
         data:data
     })
 }
 export function GetforumData(data){
    return service.request({
         method:"post",
         url:"/message/getForumData", //论坛列表
         data:data
     })
 }
 