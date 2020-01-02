import {logUtil} from '../utils/log_util'
export const log =  () => {
    return async (ctx,next) => {
        const start = +new Date();
        let ms ;
        try {
            await next()
            ms = +new Date() - start;
            logUtil.logResponse(ctx,ms)
        } catch (error) {
            ms = +new Date() - start;
            logUtil.logError(ctx,error,ms)
        }
        
    }
    
}