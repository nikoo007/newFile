import { logger, isFileExisted } from '../utils/index'
import * as fs from 'fs-extra'
const path = require('path')

import { FileInfo } from '../domain'

export async function createFile(info: FileInfo) {
  //拼接路径
  const fpath = path.join(info.path, `${info.name}${info.types}`)
  //判断当前文件是否存在
  try {
    const isExisted = await isFileExisted(fpath)
    if (isExisted) {
      logger('error', `此位置已存在${info.name}${info.types}文件,请选择其他名称`)
      throw new Error(`此位置已存在${info.name}${info.types}文件,请选择其他名称`)
    }
  } catch (error) {}
  //开始生成文件并导入模板
  await fs.writeFile(fpath, info.template)
  // logger('success', `${FileName}.html文件`)
}
