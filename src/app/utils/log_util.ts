import * as log4js from 'log4js';
import {logConfig} from '../config/log_config';
log4js.configure(logConfig);



let errorLogger = log4js.getLogger('just_errors');
let resLogger = log4js.getLogger('resLogger');


let logError = (ctx, error, resTime) => {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime))
    }
};
let  logResponse = (ctx, resTime) => {

    if (ctx&&resTime) {
        let text = formatRes (ctx, resTime)
        resLogger.info(text)
    }
};

//格式化响应日志
let formatRes = (ctx,resTime) => {
    let logText = new String();
    //响应日志开始
    logText += "\n" + "*************** response log start ***************" + "\n";

    //添加请求日志
    logText += JSON.stringify(formatReqLog(ctx.request, resTime));

    //响应状态码
    logText += "response status: " + ctx.status + "\n";
    //响应内容
    logText += "response body: " + "\n" + JSON.stringify(ctx.body) + "\n";

    //响应日志结束
    logText += "*************** response log end ***************" + "\n";
    return logText;
}
//格式化错误日志
let formatError = function (ctx, err, resTime) {
    var logText = new String();

    //错误信息开始
    logText += "\n" + "*************** error log start ***************" + "\n";

    //添加请求日志
    logText += JSON.stringify(formatReqLog(ctx.request, resTime));

    //错误名称
    logText += "err name: " + err.name + "\n";
    //错误信息
    logText += "err message: " + err.message + "\n";
    //错误详情
    logText += "err stack: " + err.stack + "\n";

    //错误信息结束
    logText += "*************** error log end ***************" + "\n";

    return logText;
};

let formatReqLog = function (req,resTime) {
    var logText = new String();

    var method = req.method;
    //访问方法
    logText += "request method: " + method + "\n";

    //请求原始地址
    logText += "request originalUrl:  " + req.originalUrl + "\n";

    //客户端ip
    logText += "request client ip:  " + req.ip + "\n";

    //开始时间
    var startTime;
    //请求参数
    if (method === 'GET') {
        logText += "request query:  " + JSON.stringify(req.query) + "\n";
        // startTime = req.query.requestStartTime;
    } else {
        logText += "request body: " + "\n" + JSON.stringify(req.body) + "\n";
        // startTime = req.body.requestStartTime;
    }
    //服务器响应时间
    logText += "response time: " + resTime + "\n";

    return logText;
}

export const logUtil = {
    logError,
    logResponse
}
