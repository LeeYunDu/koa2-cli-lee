import {apiErrorNames} from './apiErrorName'

// 错误信息
export class apiError extends Error {
    error_name;
    error_code;
    error_message;
    constructor(error_name){
        super();
        let error_info = apiErrorNames.getErrorInfo(error_name);
        this.error_name = error_name;
        this.error_code = error_info.code;
        this.error_message = error_info.message
    }
}
