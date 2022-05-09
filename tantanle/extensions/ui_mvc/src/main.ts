//@ts-ignore
import packageJSON from '../package.json'
const fs = require('fs')
// const path = require('path')
// path.resolve()
// const p = path.resolve('./', './main.ts')
// console.log(p)
// fs.readFile(p, function (error: any, data: Buffer) {
//   if (error) {
//     console.log(error)
//   } else {
//     console.log(data)
//   }
// })
/**
 * @en
 * @zh 为扩展的主进程的注册方法
 */
export const methods: { [key: string]: (...any: any) => any } = {
  openPanel() {
    Editor.Panel.open(packageJSON.name)
  },
  generateUiCtrl(path) {
    console.log(1111)
    const files = fs.readdirSync('/assets/resources/UI/')
    console.log(files)
    files.forEach((file: File) => {
      console.log(file)
      // file.type
    })
  },
}

/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
export const load = function () {}

/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
export const unload = function () {}
