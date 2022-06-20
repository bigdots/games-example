import { _decorator, Component, Prefab, instantiate, director } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { ResManager } from '../framework/ResManager'
import { uiManager } from '../framework/uiManager'
import { Consts } from './consts'

const { ccclass, property } = _decorator
@ccclass('GameManager')
export class GameManager extends Component {
  static _instance: GameManager | null = null

  static get instance() {
    if (this._instance === null) {
      this._instance = new GameManager()
    }
    return this._instance
  }

  onLoad() {
    clientEvent.on(Consts.GameEvent.GS_READY, this.init, this.node)
    clientEvent.on(Consts.GameEvent.GAME_OVER, this.gameover, this.node)
    clientEvent.on(Consts.GameEvent.GS_END, this.gameEnd, this.node)
  }

  start() {}

  async init() {
    // 预加载资源
    const res = await ResManager.instance.laodbacth(Consts.Assets.level2)

    uiManager.instance.showDialog('GUI', 'startPanel')
    // 地图、角色初始化
    clientEvent.dispatchEvent(Consts.GameEvent.GS_INIT)
  }

  gameover() {
    director.stopAnimation()
    uiManager.instance.showDialog('GUI', 'resetPanel')
  }

  gameEnd() {}
}
