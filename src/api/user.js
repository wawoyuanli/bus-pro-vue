import service from "@/utils/request";
/**
 * 添加用户
 */
export function AddUser(data){
    return service.request({
        method: "post",
        url: "/users/addUser",
        data:data
    })
}
/**
 * 
 * @param {用户列表} data 
 */
export function GetUserList(data){
    return service.request({
        method: "post",
        url: "/users/getUserList",
        data:data
    })
}

export function DeleteUser(data){
    return service.request({
        method: "post",
        url: "/users/deleteUser",
        data:data
    })
}

export function EditUser(data){
    return service.request({
        method: "post",
        url: "/users/editUser",
        data:data
    })
}
