import * as errorUtil from "../error";
import * as multer from "@koa/multer";
import * as path from "path";
export const getUser = async (ctx: any) => {
  if (ctx.query.id != 1) {
    // 抛出错误
    throw new errorUtil.apiError(errorUtil.apiErrorNames.userName_error);
  }
  ctx.body = {
    username: "LeeDogEgg",
    age: 15,
    query: ctx.query,
    queryString: ctx.querystring
  };
};
export const registerUser = async (ctx: any) => {
  ctx.body = {
    message: "注册成功",
    params: ctx.request.body,
    file: ctx.file
  };
};
export const uploadFileTest = async ctx => {
  ctx.body = {
    body: ctx.body,
    param: ctx.request.body, // 请求参数
    filename: ctx.file.filename, //返回文件名
    path: ctx.file.path // 文件地址
  };
};
//文件上传
//配置
let baseUploadPath = path.resolve('./uploadFile')

var storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, baseUploadPath);
  },
  //修改文件名称
  filename: function(req, file, cb) {
    var fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
    cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
});

//加载配置
var upload = multer({ storage: storage });
export const uploadFileLimits = upload;

