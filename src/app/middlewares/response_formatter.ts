import {apiError} from '../error/apiError';

function response_formatter(ctx){
    if(ctx.body){
        ctx.body = {
            code:0,
            message:'success',
            data:ctx.body
        }
    }
    else{
        ctx.body = {
            code:-1,
            message:'fail',
        }
    }
}
//过滤 接口路径
export const url_filter = function(pattern){
    return async (ctx,next)=>{
        let reg = new RegExp(pattern);
        try {
            await next()
        } catch (error) {
            // 异常捕获
            if(error instanceof apiError && reg.test(ctx.originalUrl)){
                ctx.body = {
                    code:error.error_code,
                    message:error.error_message
                }
                throw error
            }
        }
        if(reg.test(ctx.originalUrl)){
            response_formatter(ctx)
        }else{
            // 访问api 以外的路径 
            ctx.body = {
                message: "server alive",
                time: new Date()
              };
            ctx.status = 200;
        }
    }
}