import * as vscode from 'vscode'
import { createFile } from './generator/FileGen'
import htmlTpl from './template/htmlTpl'
import vue3Tpl from './template/vue3Tpl'
import vue2Tpl from './template/vue2Tpl'

export function activate(context: vscode.ExtensionContext) {
  let disposable1 = vscode.commands.registerCommand(
    'newfiletemp.html',
    async (uri: any) => {
      createFile({
        title: '请输入HTML文件名称',
        path: uri.path,
        types: '.html',
        template: htmlTpl,
      })
    }
  )
  let disposable2 = vscode.commands.registerCommand(
    'newfiletemp.vue2',
    async (uri: any) => {
      createFile({
        title: `请输入Vue2文件名称`,
        path: uri.path,
        types: '.vue',
        template: vue2Tpl,
      })
    }
  )

  let disposable3 = vscode.commands.registerCommand(
    'newfiletemp.vue3',
    async (uri: any) => {
      createFile({
        title: `请输入Vue3文件名称`,
        path: uri.path,
        types: '.vue',
        template: vue3Tpl,
      })
    }
  )

  context.subscriptions.push(disposable1, disposable2,disposable3)
}

// This method is called when your extension is deactivated
export function deactivate() {}
