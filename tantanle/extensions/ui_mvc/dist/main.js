"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unload = exports.load = exports.methods = void 0;
//@ts-ignore
const package_json_1 = __importDefault(require("../package.json"));
const fs = require('fs');
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
exports.methods = {
    openPanel() {
        Editor.Panel.open(package_json_1.default.name);
    },
    generateUiCtrl(path) {
        console.log(1111);
        const files = fs.readdirSync('/assets/resources/UI/');
        console.log(files);
        files.forEach((file) => {
            console.log(file);
            // file.type
        });
    },
};
/**
 * @en Hooks triggered after extension loading is complete
 * @zh 扩展加载完成后触发的钩子
 */
const load = function () { };
exports.load = load;
/**
 * @en Hooks triggered after extension uninstallation is complete
 * @zh 扩展卸载完成后触发的钩子
 */
const unload = function () { };
exports.unload = unload;
