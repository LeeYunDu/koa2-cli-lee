import * as path from 'path';
import {existsSync,mkdirSync} from "fs";
import { logConfig } from '../config/log_config';

//确定目录是否存在，如果不存在则创建目录
let confirmPath = pathStr => {
  if (!existsSync(pathStr)) {
    mkdirSync(pathStr);
  }
};
export const initLogPath = function() {
  //创建log的根目录'logs'
  if (logConfig.baseLogPath) {
    confirmPath(logConfig.baseLogPath);
    //根据不同的logType创建不同的文件目录
    let appenders = logConfig.appenders;
    for (const key in appenders) {
      if (appenders.hasOwnProperty(key)) {
        const element = appenders[key];
        if (element.path) {
          confirmPath(logConfig.baseLogPath + element.path);
        }
      }
    }
  }
};
let baseUploadPath = path.resolve('./uploadFile')
confirmPath(baseUploadPath)