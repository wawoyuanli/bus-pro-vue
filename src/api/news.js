import service from "@/utils/request";
/**
 * 列表
 */
export function GetNewsList(data){
    return service.request({
        method: "post",
        url: "/news/getNewsList",
        data:data
    })
}

/**
 * 新增信息
 */
export function AddNews(data){
    return service.request({
        method: "post",
        url: "/news/addNews",
        data:data
    })
}
/**
 * 编辑
 */
export function EditNews(data){
    return service.request({
        method: "post",
        url: "/news/editNews/",
        data
    })
}

/**
* 删除
*/
export function DeleteNews(data){
    return service.request({
        method: "post",
        url: "/news/deleteNews/",
        data
    })
}

/**
 * 获取分类
 */
export function GetCategory(data){
    return service.request({
        method: "post",
        url: "/news/getCategory/",
        data
    })
}


/**
 * 删除分类
 */
export function DeleteCategory(data){
    return service.request({
        method: "post",
        url: "/news/deleteCategory/",
        data
    })
}
/**
 * 修改分类
 */
export function EditCategory(data){
    return service.request({
        method: "post",
        url: "/news/editCategory/",
        data
    })
}