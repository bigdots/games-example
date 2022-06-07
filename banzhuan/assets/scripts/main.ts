import { _decorator, Component, Node } from 'cc'
import { ResManager } from './framework/ResManager'
import { GameManager } from './game/gameManager'
import { mapManager } from './game/mapManager'
import { palyerManager } from './game/palyerManager'
const { ccclass, property } = _decorator

@ccclass('main')
export class main extends Component {
  update(deltaTime: number) {}

  onLoad() {
    console.error(9999)
    // 初始化游戏框架代码：资源管理、事件管理、UI管理、音频管理、网络管理、协议管理
    this.node.addComponent(ResManager)
    // end

    // 游戏逻辑模块入口
    this.node.addComponent(GameManager)

    // end
  }

  start() {
    // 检查资源更新,
    // end
    // 开始游戏
    GameManager.instance.init()
  }
}
