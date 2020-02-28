import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import * as json from "koa-json";
import { appRoutes } from "./routes";
import { log } from "./middlewares/log_util";
import {initLogPath} from './utils/log_init'
import {url_filter} from './middlewares/response_formatter'
import * as cors  from 'koa2-cors'
import * as path from 'path'
const app = new Koa();
const router = new Router();
let baseUploadPath = path.resolve("./uploadFile");
import * as formidable from 'koa-formidable'
//-------------------初始化log相关目录
initLogPath()
//-------------------中间件
// 跨域
app.use(cors({
  origin: (ctx)=>{
    // console.log(ctx.url,'ctx,url') 输出 /api/user/getUser 接口路径
    return '*'
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
//
app.use(
  bodyParser()
);
// json 格式传输
app.use(json());
// 日志监听
app.use(log());
app.use(formidable({
  uploadDir: path.join(baseUploadPath,'tmp'), // 上传目录
}))
//-------------------路由
app.use(url_filter('^/api'))
app.use(appRoutes.routes());
app.use(appRoutes.allowedMethods());

app.listen(9051);
console.log("server listen on port 9051");
export const App = app;
