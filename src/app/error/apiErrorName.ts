import { stringify } from "querystring";

const userName_error = 'userNotExist';
const unkonw_error = 'unknowError';

// 报错信息配置
const err_map = new Map();
err_map.set(userName_error,{message:'用户未存在',code:-1});
err_map.set(unkonw_error,{message:'未知错误',code:-1});

interface errorInfo {
    message:string,
    code:number|string
}

// 获取报错信息
function getErrorInfo(error_name){
    let error_info:errorInfo = {
        message:'',
        code:''
    }
    if(error_name){
        error_info = err_map.get(error_name)
    }
    // 没有设置的异常信息
    if(!error_info){
        error_name = 'unkonw_error';
        error_info = err_map.get(error_name)
    }
    return error_info
}
export const apiErrorNames = {
    userName_error,
    unkonw_error,
    getErrorInfo
}