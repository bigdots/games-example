import { _decorator, Component, Prefab, instantiate } from 'cc'
import { clientEvent } from '../framework/clientEvent'
import { CSV } from '../framework/CSV'
import { ResManager } from '../framework/ResManager'
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
          'brick/bricksblue',
          'brick/bricksred',
          'brick/bricksyellow',
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
    }
    ResManager.instance.preloadResPackage(
      resMgr,
      (now: number, total: number) => {},
      () => {
        this.Entergame()
      }
    )

    // 加载成功，显示开始界面2d
    // end
  }

  private Entergame() {
    // 初始化地图
    clientEvent.dispatchEvent('gameinit')
  }
}
