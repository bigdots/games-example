import { _decorator } from 'cc'
import { FSMState } from '../framework/FSM/FSMState'

const { ccclass } = _decorator

enum gameState {
  Game_Ready,
  Game_Palying,
  Game_End,
}

@ccclass('End')
export class End extends FSMState {
  onEnter(): void {
    // 移除屏幕触摸事件
    // 弹出介绍界面
  }

  onUpdate(): void {}
}
