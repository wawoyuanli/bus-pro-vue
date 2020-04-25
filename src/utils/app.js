import cookie from "cookie_js";

const adminToKen = "admin_toKen";
const usernameKey = "username";
const userid="userid"; //cookie的 k

export function getToKen(){
    console.log('get token')
    return cookie.get(adminToKen);
}

export function setToKen(toKen){
    console.log('set token')
    return cookie.set(adminToKen, toKen);
}

export function removeToKen(adminToKen){
    return cookie.remove(adminToKen);
}

export function setUserName(value){
    console.log(value,'username set')
    return cookie.set(usernameKey, value);
}

export function getUserName(){
    console.log(usernameKey)
    return cookie.get(usernameKey);
}

export function removeUserName(){
    return cookie.remove(usernameKey);
}
export function setUserid(value){
    return cookie.set(userid,value);
}
export function getUserid(){
    return cookie.get(userid);
}