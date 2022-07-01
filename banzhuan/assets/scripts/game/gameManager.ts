import {
  _decorator,
  Component,
  Prefab,
  instantiate,
  director,
  resources,
} from 'cc'
import { AudioManager } from '../framework/audioManager'
import { clientEvent } from '../framework/clientEvent'
import { uiManager } from '../framework/uiManager'
import { cameraManager } from './cameraManager'
import { carManager } from './carManager'
import { Consts } from './consts'
import { localStorageManager } from './localStorageManager'
import { mapManager } from './mapManager'
import { palyerManager } from './palyerManager'

const { ccclass, property } = _decorator
@ccclass('GameManager')
export class GameManager extends Component {
  static instance: GameManager | null = null

  public state: number = Consts.GameState.GS_INIT

  public level: string = '0'

  onLoad() {
    if (GameManager.instance === null) {
      GameManager.instance = this
    } else {
      this.destroy()
      return
    }
    // 音频控制
    this.node.addComponent(AudioManager)

    clientEvent.on(Consts.GameEvent.GS_INIT, this.gameinit, this)
    clientEvent.on(Consts.GameEvent.GS_START, this.gamestart, this)
    clientEvent.on(Consts.GameEvent.GAME_OVER, this.gameover, this)
    clientEvent.on(Consts.GameEvent.GS_END, this.gameEnd, this)

    this.gameinit()
  }

  async gameinit() {
    this.state = Consts.GameState.GS_INIT
    // 获取当前关卡
    this.level = localStorageManager.instance.getLevel()

    // 预加载资源
    uiManager.instance.showDialog('GUI', 'loadingPanel')
    resources.load(
      Consts.Assets[`level${this.level}`],
      null,
      (e, d, c) => {
        // 加载进度
        console.debug('加载', (e / d).toFixed(2))
      },
      async (e) => {
        // 加载完成
        await mapManager.instance.loadMap(this.level)
        await palyerManager.instance.loadPLayer()
        uiManager.instance.showDialog('GUI', 'startPanel')
        cameraManager.instance.changeCameraType(Consts.CAMERA_TYPE_LIST.READY)
        uiManager.instance.hideDialog('GUI', 'loadingPanel', () => {})
        console.error(AudioManager.instance)
        AudioManager.instance.playMusic('background', true)
      }
    )
  }

  gamestart() {
    this.state = Consts.GameState.GS_PLAYING

    // 玩家移动
    palyerManager.instance.playerMove()
    // 摄像头移动
    cameraManager.instance.changeCameraType(Consts.CAMERA_TYPE_LIST.PLAYING)
  }

  gameover() {
    this.state = Consts.GameState.GS_OVER
    // 重新开始界面
    uiManager.instance.showDialog('GUI', 'resetPanel')
    // 玩家停止移动
    palyerManager.instance.playerStop()
  }

  gameEnd() {
    this.state = Consts.GameState.GS_END

    // 玩家踢板
    palyerManager.instance.arrived()
  }
}
