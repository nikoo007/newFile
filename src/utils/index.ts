import * as vscode from 'vscode'
import * as fs from 'fs-extra'
export function logger(type: string, message = '') {
  switch (type) {
    case 'success':
      return vscode.window.showInformationMessage(`Success: ${message}`)
    case 'warning':
      return vscode.window.showWarningMessage(`Warning: ${message}`)
    case 'error':
      return vscode.window.showErrorMessage(`Failed: ${message}`)
  }
}
/* 判断文件是否存在的函数
 *@path_way, 文件路径
 */
export function isFileExisted(path_way: string) {
  return new Promise((resolve, reject) => {
    fs.access(path_way, (err) => {
      if (err) {
        reject(false) //"不存在"
      } else {
        resolve(true) //"存在"
      }
    })
  })
}
