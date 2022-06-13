import { _decorator, Component, Prefab, instantiate } from 'cc'
import { camareManager } from '../framework/cameraManager'
import { clientEvent } from '../framework/clientEvent'
import { CSV } from '../framework/CSV'
import { ResManager } from '../framework/ResManager'
import { uiManager } from '../framework/uiManager'
import { mapManager } from './mapManager'
import { palyerManager } from './palyerManager'

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

  init() {
    // 显示加载界面
    // end
    // 预加载资源
    const resMgr = {
      map: {
        accessType: Prefab,
        urls: [
          'brick/bricks',
          'brick/bricks1',
          'brick/bricks2',
          'brick/bricks3',
          'road/road',
          'box/box',
        ],
      },
      // 地图
      datas: {
        accessType: null,
        urls: ['maps/map1'],
      },
      // 地图
      model: {
        accessType: Prefab,
        urls: ['man/newMan'],
      },
      GUI: {
        accessType: Prefab,
        urls: ['startPanel'],
      },
    }
    ResManager.instance.preloadResPackage(
      resMgr,
      (now: number, total: number) => {},
      this.Entergame
    )

    // 加载成功，显示开始界面2d
    // end
  }

  private Entergame() {
    // 显示开始UI
    uiManager.instance.showDialog('GUI', 'startPanel')
    // 初始化地图
    clientEvent.dispatchEvent('gameinit')
  }
}
