import { _decorator, Component, Node } from 'cc'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = bgController
 * DateTime = Thu Apr 14 2022 10:36:33 GMT+0800 (中国标准时间)
 * Author = layayu
 * FileBasename = bgController.ts
 * FileBasenameNoExtension = bgController
 * URL = db://assets/script/bgController.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('bgController')
export class bgController extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  start() {
    // [3]
    console.error('脚本凯斯')
  }
  // 每帧执行
  update(dt: number) {
    const nodes = this.node.children
    console.log(nodes)
    for (let node of nodes) {
    }
    // console.error('脚本')
    // console.debug(dt)
  }
}
