import { _decorator, Component, Node } from 'cc'
import { clientEvent } from './framework/clientEvent'
import { Consts } from './game/consts'
import { GameManager } from './game/gameManager'
const { ccclass, property } = _decorator

@ccclass('main')
export class main extends Component {
  update(deltaTime: number) {}

  onLoad() {
    // 初始化游戏框架代码：资源管理、事件管理、UI管理、音频管理、网络管理、协议管理
    // end
    

  }

  start() {
    // 检查资源更新,
    // end
    clientEvent.dispatchEvent(Consts.GameEvent.GS_INIT)
  }
}
