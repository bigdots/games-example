import {
  EventMouse,
  find,
  instantiate,
  Prefab,
  resources,
  SystemEventType,
  _decorator,
} from 'cc'
import { FSMState } from '../framework/FSM/FSMState'
import { poolManager } from '../framework/poolManager'
import { uiManager } from '../framework/UI/uiManager'

const { ccclass } = _decorator

enum gameState {
  Game_Ready,
  Game_Palying,
  Game_End,
}

@ccclass('Ready')
export class Ready extends FSMState {
  onEnter(): void {
    // 初始化路面
    const map = find('map')
    resources.load('prefab/road', (err, roadPre: Prefab) => {
      // 先生成5个 节点
      poolManager.instance.prePool(roadPre, 5)

      const node = poolManager.instance.getNode(roadPre, map)
      node.setPosition(0, -0.5, 0)
    })

    // 初始化玩家
    resources.load('prefab/ball', (err, ballPre: Prefab) => {
      const ball = instantiate(ballPre)
      ball.parent = find('map')
      ball.setPosition(0, 1, 0)
    })

    // 弹出开始界面
    // resources.load('UI/StartUI', (err, StartUI: Prefab) => {
    //   const startUI = instantiate(StartUI)
    //   startUI.parent = find('Canvas')
    //   startUI.setPosition(0, 0, 0)
    //   console.log(startUI.getChildByName('Button'))
    //   startUI.getChildByName('Button').on(
    //     'touch-start',
    //     function (e) {
    //       console.log(e)
    //     },
    //     startUI
    //   )
    // })
    const parent = find('Canvas')
    uiManager.instance.showUI(parent, 'startPanel')
  }

  onUpdate(): void {}
}
