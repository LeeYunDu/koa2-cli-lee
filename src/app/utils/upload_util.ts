import * as path from "path";
import * as fs from "fs";
import * as concat from "concat-files";
import * as crypto from "crypto";
let baseUploadPath = path.resolve("./uploadFile");
interface chunkListInfo {
  message: string;
  stat: number;
  file?: string;
  chunkList?: Array<any>;
}

// 获取切块列表
export const getChunkList = async (fileName, fileMD5Value) => {
  fileName = path.join(baseUploadPath, fileName);
  let info: chunkListInfo = {
    message: "",
    stat: 1
  };
  let isFileExist = await isExist(fileName);
  // 整体文件不存在
  if (!isFileExist) {
    fileMD5Value = path.join(baseUploadPath, fileMD5Value);
    let fileMD5List = [];
    let isFileMD5ValueExist = await isExist(fileMD5Value);
    // MD5文件夹存在 获取文件列表
    if (isFileMD5ValueExist) {
      let data = await listDir(fileMD5Value);
      info.chunkList = data as any;
    } else {
      // MD5文件不存在
      info.stat = 2;
      (info.message = "FileMD5Value文件夹不存在"), (info.chunkList = []);
    }
  } else {
    info.file = "文件已存在";
    info.message = "文件已上传";
    info.chunkList = []
  }
  return info;
};
// 检测 文件/文件夹 是否存在
export const isExist = filePath => {
  return new Promise((resolve, reject) => {
    fs.access(filePath, fs.constants.F_OK, err => {
      if (err) {
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
};
// 返回该目录下所有文件
export const listDir = fileDir => {
  return new Promise((resolve, reject) => {
    fs.readdir(fileDir, (err, list) => {
      if (err) {
        throw err;
      } else {
        resolve(list);
      }
    });
  });
};
// 文件夹是否存在, 不存在则创建文件
export const folderIsExit = folder => {
  return new Promise((resolve, reject) => {
    //确定目录是否存在，如果不存在则创建目录
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder);
      resolve(true);
    }else{
      resolve(true)
    }
    
  });
};
// 把文件从一个目录拷贝到别一个目录
export const copyFile = (temporaryFilePath, destFile) => {
  return new Promise((resolve, reject) => {
    //临时文件转移
    try {
      let moveFileResult = fs.renameSync(temporaryFilePath,destFile);
      resolve(true)
    } catch (error) {
      resolve(false)
    }
  });
};
// 检测文件是否完整
export const computedHex = (fileName, md5, size) => {
  return new Promise((resolve,rejct)=>{
    let rs = fs.createReadStream(fileName);
    let hash = crypto.createHash("md5");
    let hex;

    rs.on("data", hash.update.bind(hash));

    rs.on("end", () => {
      hex = hash.digest("hex");
      let complete = hex === md5;
      resolve({
        fileName,
        size,
        complete
      })
      console.log("文件名：" + fileName);
      console.log("文件大小：" + size);
      console.log("文件完整性：" + complete);
    });
  })
  
};
// 合并文件
export const mergeFiles = (folderMD5, fileName, size, md5Value) => {
  return new Promise(async (resolve, reject) => {
    let fileList = await listDir(folderMD5);
    // 文件名 排序
    (fileList as any).sort((x, y) => {
      return x - y;
    });
    for (let i = 0; i < (fileList as Array<string>).length; i++) {
      fileList[i] = folderMD5 + "/" + fileList[i];
    }
    try {
      let exportFileName = path.join(baseUploadPath, fileName);
      concat(fileList, exportFileName, async () => {
        //检测文件完整性
        let computeResuct = await computedHex(exportFileName, md5Value, size);
        if (!(computeResuct as any).complete) {
          // console.log('文件上传失败')
        }
        // 合并文件后 删除文件夹
        deleteFile(fileList,folderMD5)
        resolve(computeResuct)
      });
    } catch (error) {
      reject(error);
    }
  });
};
export const deleteFile = (fileList,fileDir) => {
  // 删除所有文件
  fileList.forEach(element => {
    try {
      fs.unlinkSync(element)
    } catch (error) {
      console.log(`删除文件${element}失败`)
      throw error
    }
  });
  // 删除空文件夹
  try {
    fs.rmdirSync(fileDir)
  } catch (error) {
    console.log(`删除文件夹${fileDir}失败`)
    throw error
    
  }
}