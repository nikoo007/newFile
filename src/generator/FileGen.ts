import { logger, isFileExisted } from '../utils/index'
import * as fs from 'fs-extra'
const path = require('path')
import * as vscode from 'vscode'

import { FileInfo } from '../domain'

export async function createFile(info: FileInfo) {
  const FileName = await vscode.window.showInputBox({
    prompt: info.title,
  })
  if (!FileName) {
    //判断用户是否输入了文件名
    logger('error', `${info.types}文件名称不能为空!`)
    throw new Error(`${info.types}文件名称不能为空!`)
  }
  //拼接路径
  //判断是window还是mac系统
  info.path = info.path.startsWith('/Users') ? info.path : info.path.substring(1)
  let fpath = path.resolve(info.path, `${FileName}${info.types}`)

  //判断当前文件是否存在
  try {
    const isExisted = await isFileExisted(fpath)
    if (isExisted) {
      logger('error', `此位置已存在${FileName}${info.types}文件,请选择其他名称`)
      throw new Error(`此位置已存在${FileName}${info.types}文件,请选择其他名称`)
    }
  } catch (error) {}
  //开始生成文件并导入模板
  await fs.writeFile(fpath, info.template)
  // logger('success', `${FileName}.html文件`)
}
