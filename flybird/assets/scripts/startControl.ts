import { _decorator, Component, Node, director } from 'cc'
const { ccclass, property } = _decorator

/**
 * Predefined variables
 * Name = startControl
 * DateTime = Fri Apr 15 2022 14:41:39 GMT+0800 (中国标准时间)
 * Author = layayu
 * FileBasename = startControl.ts
 * FileBasenameNoExtension = startControl
 * URL = db://assets/scripts/startControl.ts
 * ManualUrl = https://docs.cocos.com/creator/3.4/manual/zh/
 *
 */

@ccclass('startControl')
export class startControl extends Component {
  // [1]
  // dummy = '';

  // [2]
  // @property
  // serializableDummy = 0;

  start() {
    // [3]

    this.node.on(Node.EventType.MOUSE_DOWN, (e) => {
      director.loadScene('game')
    })
  }

  // update (deltaTime: number) {
  //     // [4]
  // }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.4/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.4/manual/zh/scripting/decorator.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.4/manual/zh/scripting/life-cycle-callbacks.html
 */
