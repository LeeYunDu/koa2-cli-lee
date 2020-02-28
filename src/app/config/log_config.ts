import * as path from 'path';

//日志根目录
let baseLogPath = path.resolve('./logs')


//错误日志文件夹
let errorPath ='/error';
// 错误日志名称
let errorName = 'error';
// 错误日志输出完整地址
let errorLogPath = baseLogPath + errorPath + '/' + errorName;


//错误日志文件夹
let responsePath ='/response';
// 错误日志名称
let responseName = 'response';
// 错误日志输出完整地址
let responseLogPath = baseLogPath + responsePath + '/' + responseName;


// log4js 配置
export const logConfig = {
    appenders:{
        errorLogger:{
            type:'file',
            filename:errorLogPath,
            pattern:'yyyy-MM-dd.log',
            alwaysIncludePattern:true,
            level:'error',
            compress:false, // 是否压缩,
            path:errorPath
        },
        resLogger:{
            type:'file',
            filename:responseLogPath,
            pattern:'yyyy-MM-dd-hh.log',
            alwaysIncludePattern:true,
            level:'info',
            compress:false,// 是否压缩,
            path:responsePath
        },
        just_errors:{
            type: 'logLevelFilter', appender: 'errorLogger', level: 'error' 
        }
    },
    categories:{
        default: { appenders: ['just_errors', 'resLogger' ], level: 'debug' }
    },
    baseLogPath:baseLogPath
}
