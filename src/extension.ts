import * as vscode from 'vscode'
import { createFile } from './generator/FileGen'
import { logger } from './utils'
import htmlTpl from './template/htmlTpl'
import vue3Tpl from './template/vue3Tpl'

export function activate(context: vscode.ExtensionContext) {
  let disposable1 = vscode.commands.registerCommand(
    'newfiletemp.html',
    async (uri: any) => {
      const pageText = `输入HTML文件名称,空格分隔字段`
      const FileName = await vscode.window.showInputBox({
        prompt: pageText,
      })
      if (!FileName) {
        //判断用户是否输入了文件名
        logger('error', `HTML文件名称不能为空!`)
        throw new Error(`HTML文件名称不能为空!`)
      }

      createFile({
        name: FileName,
        path: uri.path,
        types: '.html',
        template: htmlTpl,
      })
    }
  )
  let disposable2 = vscode.commands.registerCommand(
    'newfiletemp.vue3',
    async (uri: any) => {
      const pageText = `输入Vue文件名称,空格分隔字段`
      const FileName = await vscode.window.showInputBox({
        prompt: pageText,
      })
      if (!FileName) {
        //判断用户是否输入了文件名
        logger('error', `Vue文件名称不能为空!`)
        throw new Error(`Vue文件名称不能为空!`)
      }
      createFile({
        name: FileName,
        path: uri.path,
        types: '.vue',
        template: vue3Tpl,
      })
    }
  )

  context.subscriptions.push(disposable1, disposable2)
}

// This method is called when your extension is deactivated
export function deactivate() {}
