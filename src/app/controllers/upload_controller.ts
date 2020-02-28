import * as uploadUtils from "../utils/upload_util";
import * as multer from "@koa/multer";
import * as path from "path";
let baseUploadPath = path.resolve("./uploadFile");
// 检查文件是否存在
export const checkFile = async ctx => {
  let info = await uploadUtils.getChunkList(
    ctx.query.fileName,
    ctx.query.fileMd5Value
  );
  ctx.body = {
    message: "checkFile",
    info: info
  };
};
// 上传文件
export const upload = async ctx => {
  let params = ctx.request.body;
  let res = await opeFile(
    params.index,
    params.fileMd5Value,
    params.total,
    ctx.request.files.data.path // koa-formidable 临时文件地址
  );
  ctx.body = {
    body: ctx,
    res:res,
    file: ctx.request.files
  };
};
const opeFile = (index, fileMD5Value, total, filePath) => {
  return new Promise((resolve, reject) => {
    // MD5文件夹
    let folder = path.join(baseUploadPath, fileMD5Value);
    // 检测文件夹是否存在 不存则创建文件夹
    uploadUtils.folderIsExit(folder).then(result => {
      let destFile = path.join(folder, index);
      let temporaryFilePath = filePath;
      // 将koa-formidable生成的临时文件转移至 MD5文件夹
      // 如果不配置koa-formidable临时文件地址，跨 磁盘 复制文件会报错
      console.log(temporaryFilePath)
      uploadUtils.copyFile(temporaryFilePath, destFile).then(result => {
        
        if (result) {
          let info = {
            message: "图片已复制",
            state: "success",
            desc:index
          };
          resolve(info);
        } else {
          let info = {
            message: "上传失败",
            state: "fail"
          };
          resolve(info);
        }
      });
    });
  });
};
// 上传文件完毕后 通知服务器合并文件
export const mergeFile = async ctx => {
    let query = ctx.query;
   let info = await uploadUtils.mergeFiles(path.join(baseUploadPath,query.fileMD5Value),query.fileName,query.size,query.fileMD5Value);
  ctx.body = {
    message: "mergeFile",
    info:info
  };
};

//文件上传
//配置

let storage = multer.diskStorage({
  //文件保存路径
  destination: function(req, file, cb) {
    cb(null, baseUploadPath);
  }
  //修改文件名称
  //   filename: function(req, file, cb) {
  //     let fileFormat = file.originalname.split("."); //以点分割成数组，数组的最后一项就是后缀名
  //     cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
  //   }
});

//加载配置
let uploadStorage = multer({ storage: storage });
export const uploadFileLimits = uploadStorage;
